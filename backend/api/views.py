from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Profile, Project, Skill
from .serializers import (
    ProfileSerializer,
    ProjectSerializer,
    SkillSerializer,
    ContactMessageSerializer,
)

class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        return Profile.objects.first()
    
class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ContactCreateView(generics.CreateAPIView):
    serializer_class = ContactMessageSerializer
