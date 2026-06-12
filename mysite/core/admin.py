from django.contrib import admin
from .models import PersonalInformation, Skill, Experience, Project, Education
# Register your models here.

admin.site.register(PersonalInformation)
admin.site.register(Skill)
admin.site.register(Experience)
admin.site.register(Project)
admin.site.register(Education)