from django.contrib import admin
from .models import User, Film, Consiglio

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username','email')
    list_display_links = ('id', 'username')
    search_fields = ('username',)
    list_per_page = 25

class FilmAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    list_per_page = 25

class ConsiglioAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'film_id','voto', 'commento')
    list_display_links = ('user_id', 'film_id')
    list_per_page = 25


admin.site.register(User, UserAdmin)
admin.site.register(Film, FilmAdmin)
admin.site.register(Consiglio, ConsiglioAdmin)