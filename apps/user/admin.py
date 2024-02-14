from django.contrib import admin
from apps.user.models import UserAccount


class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'is_staff', 'is_editor')
    search_fields = ('first_name', 'last_name', 'email', 'is_staff', 'is_editor',)
    list_per_page = 30


admin.site.register(UserAccount, UserAdmin)
