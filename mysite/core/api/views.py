from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from ..models import PersonalInformation, Skill, Experience, Project, Education, ProjectReview
from .serializers import (
    PersonalInformationSerializer,
    SkillSerializer,
    ExperienceSerializer,
    ProjectListSerializer,
    ProjectDetailSerializer,
    EducationSerializer,
    ProjectReviewSerializer,
)


# ─── Personal Information ─────────────────────────────────────────────────────

class PersonalInformationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset           = PersonalInformation.objects.all()
    serializer_class   = PersonalInformationSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'], url_path='me')
    def me(self, request):
        """GET /api/personal/me/ — zwraca pierwszy (jedyny) rekord."""
        obj = PersonalInformation.objects.first()
        if not obj:
            return Response({'detail': 'Not found.'}, status=404)
        return Response(self.get_serializer(obj).data)


# ─── Skill ────────────────────────────────────────────────────────────────────

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset           = Skill.objects.all()
    serializer_class   = SkillSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field       = 'slug'
    filter_backends    = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields   = ['category', 'proficiency']
    search_fields      = ['name']


# ─── Education ────────────────────────────────────────────────────────────────

class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset           = Education.objects.all()
    serializer_class   = EducationSerializer
    permission_classes = [permissions.AllowAny]


# ─── Experience ───────────────────────────────────────────────────────────────

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset           = Experience.objects.prefetch_related('skills_earned').all()
    serializer_class   = ExperienceSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field       = 'slug'


# ─── Project ──────────────────────────────────────────────────────────────────

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    lookup_field       = 'slug'
    filter_backends    = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields      = ['title', 'short_description']
    ordering_fields    = ['created_at', 'order']

    def get_queryset(self):
        qs = Project.objects.prefetch_related('skills_used', 'images')
        # Filtrowanie po skilla: /api/projects/?skill=python
        skill = self.request.query_params.get('skill')
        if skill:
            qs = qs.filter(skills_used__slug=skill)
        return qs

    def get_serializer_class(self):
        # Lista → lekki serializer, detal → pełny z galerią
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer


# ─── Project Review ───────────────────────────────────────────────────────────

class ProjectReviewViewSet(viewsets.ModelViewSet):
    serializer_class   = ProjectReviewSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        # Zwraca tylko zatwierdzone opinie dla danego projektu
        # GET /api/projects/{project_slug}/reviews/
        return ProjectReview.objects.filter(
            is_approved=True,
            project__slug=self.kwargs.get('project_slug'),
        )

    def perform_create(self, serializer):
        # Przy zapisie automatycznie przypisuje projekt po slug z URL
        project = Project.objects.get(slug=self.kwargs.get('project_slug'))
        serializer.save(project=project, is_approved=False)