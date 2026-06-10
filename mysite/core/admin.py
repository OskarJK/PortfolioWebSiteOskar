from django.contrib import admin
from .models import PersonalInformation, Skills, Experience
# Register your models here.

admin.site.register(PersonalInformation)
admin.site.register(Skills)
admin.site.register(Experience)