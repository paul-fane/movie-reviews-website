from django.contrib import admin
from .models import Review
# Register your models here.


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'film','vote', 'comment')
    list_display_links = ('user', 'film')
    list_per_page = 25


admin.site.register(Review, ReviewAdmin)