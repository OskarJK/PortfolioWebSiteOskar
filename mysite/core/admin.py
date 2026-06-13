from django.contrib import admin

#Register your models here.
from .models import (
    PersonalInformation,
    ProjectReview,
    Skill,
    Experience,
    Project,
    ProjectImage,
    Education,
)


# ─── Personal Information ─────────────────────────────────────────────────────

@admin.register(PersonalInformation)
class PersonalInformationAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone_number']


# ─── Skill ────────────────────────────────────────────────────────────────────

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display  = ['name', 'category', 'proficiency', 'icon', 'slug']
    list_filter   = ['category', 'proficiency']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}


# ─── Experience ───────────────────────────────────────────────────────────────

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display  = ['title', 'company', 'start_date', 'end_date']
    list_filter   = ['start_date']
    search_fields = ['title', 'company', 'description']
    prepopulated_fields = {'slug': ('title', 'company')}
    filter_horizontal = ['skills_earned']   # widget do M2M


# ─── Project ──────────────────────────────────────────────────────────────────

class ProjectImageInline(admin.TabularInline):
    """Edycja zdjęć galerii bezpośrednio w formularzu projektu."""
    model   = ProjectImage
    extra   = 1
    fields  = ['image', 'caption', 'order']
    ordering = ['order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ['title', 'order', 'created_at', 'end_date', 'github_link']
    list_filter   = ['created_at']
    list_editable = ['order']          # zmiana kolejności wprost z listy
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['skills_used']
    inlines = [ProjectImageInline]


# ─── Education ────────────────────────────────────────────────────────────────

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display  = ['school', 'degree', 'field_of_study', 'start_date', 'end_date']
    search_fields = ['school', 'degree', 'field_of_study']
    
@admin.register(ProjectReview)
class ProjectReviewAdmin(admin.ModelAdmin):
    list_display  = ['name', 'project', 'created_at', 'is_approved']
    list_filter   = ['is_approved', 'created_at']
    list_editable = ['is_approved']
    search_fields = ['name', 'email', 'message']