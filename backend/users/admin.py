from django.contrib import admin
from .models import User
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username','email')
    list_display_links = ('id', 'username')
    search_fields = ('username',)
    list_per_page = 25

admin.site.register(User, UserAdmin)
