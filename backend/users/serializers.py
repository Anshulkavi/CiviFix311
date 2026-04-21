from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from .models import User


class UserSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    date_joined = serializers.DateTimeField(read_only=True)

    class Meta:
        model  = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name',
                  'role', 'phone', 'avatar', 'department', 'department_name', 'ward',
                  'is_verified', 'date_joined']
        read_only_fields = ['id', 'is_verified', 'date_joined']


class RegisterSerializer(serializers.ModelSerializer):
    password  = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    role      = serializers.ChoiceField(
        choices=[User.Role.CITIZEN, User.Role.FIELD_OFFICER, User.Role.DEPT_HEAD],
        default=User.Role.CITIZEN
    )

    class Meta:
        model  = User
        fields = ['username', 'email', 'password', 'password2',
                  'first_name', 'last_name', 'phone', 'role', 'department']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Passwords do not match.'})

        role = attrs.get('role', User.Role.CITIZEN)

        # Admin role not allowed via self-registration
        if role == User.Role.ADMIN:
            raise serializers.ValidationError({'role': 'Admin role cannot be self-registered.'})

        # Field Officer and Dept Head must have department
        if role in [User.Role.FIELD_OFFICER, User.Role.DEPT_HEAD]:
            if not attrs.get('department'):
                raise serializers.ValidationError({'department': 'Department is required for Field Officers and Department Heads.'})

        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        role = validated_data.get('role', User.Role.CITIZEN)

        # Set approval_status based on role
        if role == User.Role.CITIZEN:
            validated_data['approval_status'] = User.ApprovalStatus.ACTIVE
            validated_data['is_active'] = True
        else:  # Field Officer or Dept Head
            validated_data['approval_status'] = User.ApprovalStatus.PENDING
            validated_data['is_active'] = False  # Cannot login until approved

        user = User.objects.create_user(**validated_data)
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role']     = user.role
        token['username'] = user.username
        token['email']    = user.email
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        # Check approval status for non-citizens
        if user.role == User.Role.CITIZEN:
            pass  # Citizens can login normally

        elif user.approval_status == User.ApprovalStatus.PENDING:
            raise serializers.ValidationError({
                'error': 'approval_pending',
                'message': 'Aapka account admin approval ke liye pending hai. Thoda wait karo.'
            })

        elif user.approval_status == User.ApprovalStatus.REJECTED:
            raise serializers.ValidationError({
                'error': 'approval_rejected',
                'message': f'Aapka registration reject ho gaya. Reason: {user.rejection_reason or "Contact admin."}'
            })

        elif user.approval_status in [User.ApprovalStatus.APPROVED, User.ApprovalStatus.ACTIVE]:
            pass  # Allow login

        data['user'] = UserSerializer(user).data
        return data


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
