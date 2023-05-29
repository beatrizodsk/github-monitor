import django_filters
from .models import Commit

class CommitFilter(django_filters.FilterSet):
    class Meta:
        model = Commit
        fields = ['repository__id', 'author']