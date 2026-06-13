from rest_framework import serializers
from ..models import PersonalInformation, ProjectReview, Skill, Experience, Project, ProjectImage, Education


# ─── Skill ────────────────────────────────────────────────────────────────────

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'slug', 'category', 'proficiency', 'icon', 'description']
        lookup_field = 'slug'


# ─── Personal Information ─────────────────────────────────────────────────────

class PersonalInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInformation
        fields = [
            'id', 'name', 'email', 'phone_number', 'address',
            'photo', 'description', 'github_link', 'linkedin_link',
        ]


# ─── Education ────────────────────────────────────────────────────────────────

class EducationSerializer(serializers.ModelSerializer):
    # Wyliczone pole: "Oct 2020 – Jun 2024" lub "Oct 2020 – Present"
    duration = serializers.SerializerMethodField()

    class Meta:
        model = Education
        fields = [
            'id', 'school', 'degree', 'field_of_study',
            'start_date', 'end_date', 'duration', 'description',
        ]

    def get_duration(self, obj):
        start = obj.start_date.strftime('%b %Y')
        end   = obj.end_date.strftime('%b %Y') if obj.end_date else 'Present'
        return f"{start} – {end}"


# ─── Experience ───────────────────────────────────────────────────────────────

class ExperienceSerializer(serializers.ModelSerializer):
    skills_earned = SkillSerializer(many=True, read_only=True)
    duration      = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = [
            'id', 'title', 'slug', 'company',
            'start_date', 'end_date', 'duration',
            'skills_earned', 'description',
        ]
        lookup_field = 'slug'

    def get_duration(self, obj):
        start = obj.start_date.strftime('%b %Y')
        end   = obj.end_date.strftime('%b %Y') if obj.end_date else 'Present'
        return f"{start} – {end}"


# ─── Project ──────────────────────────────────────────────────────────────────

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order']


class ProjectListSerializer(serializers.ModelSerializer):
    """Lekki serializer dla listy projektów — bez pełnego opisu i galerii."""
    skills_used = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'main_image', 'short_description',
            'skills_used', 'github_link', 'live_preview_link',
            'created_at', 'end_date', 'order',
        ]
        lookup_field = 'slug'


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Pełny serializer dla widoku szczegółowego — zawiera opis i galerię."""
    skills_used = SkillSerializer(many=True, read_only=True)
    images      = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'main_image', 'images',
            'short_description', 'description', 'skills_used',
            'github_link', 'live_preview_link',
            'created_at', 'end_date', 'order',
        ]
        lookup_field = 'slug'
        
# ─── Project Review ───────────────────────────────────────────────────────────

class ProjectReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectReview
        fields = ['id', 'project', 'name', 'email', 'message', 'created_at']