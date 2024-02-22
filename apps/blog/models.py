from django.conf import settings
from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from apps.category.models import Category

User = settings.AUTH_USER_MODEL

def blog_thumbnail_directory(instance, filename):
    return 'blog/{0}/{1}'.format(instance.title, filename)


class Post(models.Model):
    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    class Meta:
        ordering = ('-published',)

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)
    thumbnail = models.ImageField(upload_to=blog_thumbnail_directory, max_length=500)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    description = models.CharField(max_length=100)
    content = RichTextField()
    status = models.CharField(max_length=10, choices=options, default='draft')
    time_read = models.IntegerField()
    published = models.DateField(default=timezone.now)
    view = models.IntegerField(default=0, blank=True)
    objects = models.Manager()  # default manager
    post_objects = PostObjects()  # custom manager

    def get_view_count(self):
        views = ViewCount.objects.filter(post=self).count()
        return views

    def __str__(self):
        return self.title


class ViewCount(models.Model):
    post = models.ForeignKey(Post, related_name='blogpost_view_count', on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address}"
