from rest_framework import serializers
from .models import Complaint, Category, Department, Upvote, StatusHistory
from users.serializers import UserSerializer


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Department
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model  = Category
        fields = ['id', 'name', 'department', 'department_name', 'icon', 'description', 'is_active']


class StatusHistorySerializer(serializers.ModelSerializer):
    changed_by = UserSerializer(read_only=True)

    class Meta:
        model  = StatusHistory
        fields = ['id', 'old_status', 'new_status', 'note', 'changed_by', 'changed_at']


class ComplaintListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views."""
    citizen_name    = serializers.CharField(source='citizen.get_full_name', read_only=True)
    category_name   = serializers.CharField(source='category.name',         read_only=True)
    department_name = serializers.CharField(source='department.name',       read_only=True)
    assigned_name   = serializers.CharField(source='assigned_to.get_full_name', read_only=True)
    has_upvoted     = serializers.SerializerMethodField()

    class Meta:
        model  = Complaint
        fields = [
            'id', 'complaint_id', 'title', 'status', 'priority',
            'category_name', 'department_name', 'citizen_name', 'assigned_name',
            'address', 'ward', 'latitude', 'longitude',
            'before_photo', 'upvote_count', 'has_upvoted',
            'is_escalated', 'sla_deadline', 'created_at', 'updated_at',
        ]

    def get_has_upvoted(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.upvotes.filter(citizen=request.user).exists()
        return False


class ComplaintDetailSerializer(serializers.ModelSerializer):
    """Full detail serializer."""
    citizen    = UserSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True)
    category   = CategorySerializer(read_only=True)
    department = DepartmentSerializer(read_only=True)
    history    = StatusHistorySerializer(many=True, read_only=True)
    has_upvoted = serializers.SerializerMethodField()

    # write-only fields for creation
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.filter(is_active=True),
        source='category', write_only=True
    )

    class Meta:
        model  = Complaint
        fields = [
            'id', 'complaint_id', 'title', 'description',
            'category', 'category_id', 'department',
            'status', 'priority',
            'citizen', 'assigned_to',
            'address', 'ward', 'latitude', 'longitude',
            'before_photo', 'after_photo',
            'upvote_count', 'has_upvoted',
            'is_escalated', 'escalated_at', 'sla_deadline',
            'citizen_rating', 'citizen_feedback', 'confirmed_at',
            'history',
            'created_at', 'updated_at', 'resolved_at',
        ]
        read_only_fields = [
            'id', 'complaint_id', 'department', 'citizen', 'assigned_to',
            'upvote_count', 'is_escalated', 'escalated_at',
            'confirmed_at', 'resolved_at', 'history',
        ]

    def get_has_upvoted(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.upvotes.filter(citizen=request.user).exists()
        return False

    def create(self, validated_data):
        validated_data['citizen']    = self.context['request'].user
        validated_data['department'] = validated_data['category'].department
        return super().create(validated_data)


class StatusUpdateSerializer(serializers.Serializer):
    status      = serializers.ChoiceField(choices=Complaint.Status.choices)
    note        = serializers.CharField(required=False, allow_blank=True)
    after_photo = serializers.ImageField(required=False)


class ConfirmResolutionSerializer(serializers.Serializer):
    rating   = serializers.IntegerField(min_value=1, max_value=5)
    feedback = serializers.CharField(required=False, allow_blank=True)
