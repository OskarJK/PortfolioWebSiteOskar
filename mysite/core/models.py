from django.db import models
from django.utils.text import slugify

# Create your models here.
class PersonalInformation(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    photo = models.ImageField(upload_to='photos/', help_text="A professional photo of yourself")
    description = models.TextField(help_text="A brief description of yourself")
    github_link = models.URLField(blank=True, null=True)
    linkedin_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Personal Information"
        verbose_name_plural = "Personal Information"
    
class Skill(models.Model):
    class ProficiencyLevel(models.TextChoices):
        BEGINNER = 'Beginner', 'Beginner'
        INTERMEDIATE = 'Intermediate', 'Intermediate'
        ADVANCED = 'Advanced', 'Advanced'
        EXPERT = 'Expert', 'Expert'
        
    class Category(models.TextChoices):
        LANGUAGE  = 'Language',  'Language'
        FRAMEWORK = 'Framework', 'Framework'
        TOOL      = 'Tool',      'Tool'
        OTHER     = 'Other',     'Other'

    category = models.CharField(max_length=50, choices=Category.choices, default=Category.OTHER)
    name = models.CharField(max_length=100, help_text="The name of the skill (e.g., Python, Django, Git)")
    slug = models.SlugField(unique=True, blank=True, max_length=250)
    proficiency = models.CharField(max_length=50, choices=ProficiencyLevel.choices)
    description = models.TextField(help_text="A brief description of the skill and your experience with it")
    
    # Automatically generate slug from name if not provided
    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name)
            slug = base
            n = 1
            while Skill.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{n}"
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Skill"
        verbose_name_plural = "Skills"
            
class Experience(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, max_length=250)
    company = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    skills_earned = models.ManyToManyField(Skill, related_name='experiences')
    description = models.TextField()
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)
            slug = base
            n = 1
            while Experience.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{n}"
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} at {self.company}"
    
    class Meta:
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"
        ordering = ['-start_date']
    
class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, max_length=250)
    main_image = models.ImageField(upload_to='project_images/', help_text="The main image representing the project")
    short_description = models.CharField(max_length=255, help_text="A brief summary of the project (max 255 characters)")
    description = models.TextField(help_text="A detailed description of the project")
    skills_used = models.ManyToManyField(Skill, related_name='projects')
    github_link = models.URLField(blank=True, null=True)
    live_preview_link = models.URLField(blank=True, null=True)
    created_at = models.DateField()
    order = models.PositiveIntegerField(default=0, help_text="Niższy = wyżej na liście")

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)
            slug = base
            n = 1
            while Project.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{n}"
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        ordering = ['order', '-created_at']

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='project_images/')
    caption = models.CharField(max_length=255, blank=True, help_text="Optional caption for the image")

    def __str__(self):
        return f"Image for {self.project.title}"
    
    class Meta:
        verbose_name = "Project Image"
        verbose_name_plural = "Project Images"
        
class Education(models.Model):
    school = models.CharField(max_length=200, help_text="The name of the educational institution")
    degree = models.CharField(max_length=200, help_text="The degree or certification you earned")
    field_of_study = models.CharField(max_length=200, help_text="The field of study or major")
    start_date = models.DateField(help_text="The date you started this education")
    end_date = models.DateField(null=True, blank=True, help_text="The date you completed this education (leave blank if still ongoing)")
    description = models.TextField(blank=True, help_text="Additional details about your education (optional)")
    
    def __str__(self):
        return f"{self.degree} in {self.field_of_study} at {self.school}"

    class Meta:
        ordering = ['-start_date']