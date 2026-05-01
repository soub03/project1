from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render

def index(request):
    """Serve the React Single Page Application (SPA)."""
    return render(request, 'index.html')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('energy_api.urls')),
    # Catch-all for React Router if needed, or simply the base URL
    path('', index, name='index'),
]
