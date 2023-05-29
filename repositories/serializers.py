from rest_framework import serializers
from .models import Commit, Repository


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = '__all__'


class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = '__all__'
        depth = 1

class GithubCommitSerializer:

    data = ''

    def __init__(self, data):
        self.data = self.serialize(data)

    def serialize(self, data):

        author = data["author"]
        avatar = ''

        if author is not None:
            avatar = author.get("avatar_url")

        serialized_data = Commit(
            sha=data["sha"],
            author=data["commit"]["author"]["name"],
            url=data["url"],
            avatar=avatar,
            date=data["commit"]["author"]["date"],
            message=data["commit"]["message"],
        )

        return serialized_data