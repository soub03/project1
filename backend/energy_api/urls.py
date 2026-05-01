from django.urls import path
from . import views

urlpatterns = [
    path('predictions/', views.get_predictions, name='get_predictions'),
    path('calculate/', views.calculate_cost, name='calculate_cost'),
    path('energy-mix/', views.get_energy_mix, name='get_energy_mix'),
    path('energy-poverty/', views.get_energy_poverty, name='get_energy_poverty'),
]
