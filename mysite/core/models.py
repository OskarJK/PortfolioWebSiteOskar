from django.db import models

# Create your models here.
class PersonalInformation(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=250)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    photo = models.ImageField(upload_to='photos/')
    description = models.TextField()

    def __str__(self):
        return self.name
    
class Skills(models.Model):
    class ProficiencyLevel(models.TextChoices):
        BEGINNER = 'Beginner', 'Beginner'
        INTERMEDIATE = 'Intermediate', 'Intermediate'
        ADVANCED = 'Advanced', 'Advanced'
        EXPERT = 'Expert', 'Expert'
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=250)
    proficiency = models.CharField(max_length=50, choices=ProficiencyLevel.choices)
    description = models.TextField()

    def __str__(self):
        return self.name
    
class Experience(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=250)
    company = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    skills_earned = models.ManyToManyField(Skills, related_name='experiences')
    description = models.TextField()

    def __str__(self):
        return f"{self.title} at {self.company}"