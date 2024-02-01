from django.contrib import admin
from apps.blog.models import Post


class BlogAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    list_display_links = ('title',)
    list_per_page = 30


admin.site.register(Post, BlogAdmin)
