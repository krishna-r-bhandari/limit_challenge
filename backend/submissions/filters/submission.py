import django_filters
from django.db.models import Q

from submissions import models


class SubmissionFilterSet(django_filters.FilterSet):
    """Filter set for the submissions list endpoint."""

    status = django_filters.CharFilter(field_name="status", lookup_expr="iexact")
    brokerId = django_filters.NumberFilter(field_name="broker_id")
    companySearch = django_filters.CharFilter(method="filter_company_search")
    createdFrom = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="gte")
    createdTo = django_filters.DateTimeFilter(field_name="created_at", lookup_expr="lte")
    hasDocuments = django_filters.BooleanFilter(method="filter_has_documents")
    hasNotes = django_filters.BooleanFilter(method="filter_has_notes")

    class Meta:
        model = models.Submission
        fields = [
            "status",
            "brokerId",
            "companySearch",
            "createdFrom",
            "createdTo",
            "hasDocuments",
            "hasNotes",
        ]

    def filter_company_search(self, queryset, name, value):
        if not value:
            return queryset
        return queryset.filter(
            Q(company__legal_name__icontains=value) | Q(summary__icontains=value)
        )

    def filter_has_documents(self, queryset, name, value):
        if value is True:
            return queryset.filter(documents__isnull=False)
        if value is False:
            return queryset.filter(documents__isnull=True)
        return queryset

    def filter_has_notes(self, queryset, name, value):
        if value is True:
            return queryset.filter(notes__isnull=False)
        if value is False:
            return queryset.filter(notes__isnull=True)
        return queryset

