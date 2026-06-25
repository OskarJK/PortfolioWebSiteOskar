from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PersonalInformationViewSet,
    SkillViewSet,
    EducationViewSet,
    ExperienceViewSet,
    ProjectViewSet,
    ProjectReviewViewSet,
)

router = DefaultRouter()
router.register(r'personal',   PersonalInformationViewSet, basename='personal')
router.register(r'skills',     SkillViewSet,               basename='skill')
router.register(r'education',  EducationViewSet,           basename='education')
router.register(r'experience', ExperienceViewSet,          basename='experience')
router.register(r'projects',   ProjectViewSet,             basename='project')

urlpatterns = [
    path('', include(router.urls)),

    # Opinie są zagnieżdżone pod projektem:
    # GET  /api/projects/{project_slug}/reviews/   → lista opinii
    # POST /api/projects/{project_slug}/reviews/   → dodaj opinię
    path(
        'projects/<slug:project_slug>/reviews/',
        ProjectReviewViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='project-reviews',
    ),
]

# ─── Wszystkie endpointy ───────────────────────────────────────────────────────
# GET /api/personal/                         lista
# GET /api/personal/me/                      dane osobowe
# GET /api/skills/                           lista skillów
# GET /api/skills/?category=Language         filtrowanie
# GET /api/skills/?search=py                 wyszukiwanie
# GET /api/skills/{slug}/                    szczegóły skilla
# GET /api/education/                        lista edukacji
# GET /api/experience/                       lista doświadczeń
# GET /api/experience/{slug}/                szczegóły doświadczenia
# GET /api/projects/                         lista projektów
# GET /api/projects/?skill=python            filtrowanie po skilla
# GET /api/projects/?search=django           wyszukiwanie
# GET /api/projects/{slug}/                  szczegóły projektu + galeria
# GET /api/projects/{slug}/reviews/          opinie dla projektu
# POST /api/projects/{slug}/reviews/         dodaj opinię