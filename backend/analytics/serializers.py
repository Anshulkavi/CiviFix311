from rest_framework import serializers


class DashboardSummarySerializer(serializers.Serializer):
    """Serializer for overall dashboard statistics."""
    total = serializers.IntegerField()
    pending = serializers.IntegerField()
    in_progress = serializers.IntegerField()
    resolved = serializers.IntegerField()
    closed = serializers.IntegerField()
    escalated = serializers.IntegerField()
    resolution_rate = serializers.FloatField()
    avg_resolution_hours = serializers.FloatField(allow_null=True)


class TrendDataSerializer(serializers.Serializer):
    """Serializer for daily complaint trend data."""
    date = serializers.DateField()
    count = serializers.IntegerField()


class CategoryBreakdownSerializer(serializers.Serializer):
    """Serializer for category breakdown data."""
    category__name = serializers.CharField()
    category__icon = serializers.CharField()
    count = serializers.IntegerField()


class DepartmentBreakdownSerializer(serializers.Serializer):
    """Serializer for department breakdown with resolution rates."""
    department__name = serializers.CharField()
    total = serializers.IntegerField()
    resolved = serializers.IntegerField()
    escalated = serializers.IntegerField()
    resolution_rate = serializers.FloatField()


class WardHeatmapSerializer(serializers.Serializer):
    """Serializer for ward-based complaint heatmap."""
    ward = serializers.CharField()
    count = serializers.IntegerField()


class StatusBreakdownSerializer(serializers.Serializer):
    """Serializer for status breakdown data."""
    status = serializers.CharField()
    count = serializers.IntegerField()
