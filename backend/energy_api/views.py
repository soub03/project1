from rest_framework.decorators import api_view
from rest_framework.response import Response
from .ml_service import get_real_predictions, calculate_district_cost
import csv
import json
import os
from django.conf import settings

@api_view(['GET'])
def get_predictions(request):
    """
    Returns historical data, predicted data, and geopolitical insights.
    Query param: ?type=electricity or ?type=fuel
    """
    energy_type = request.GET.get('type', 'electricity').lower()
    if energy_type not in ['electricity', 'fuel']:
        return Response({"error": "Invalid energy type. Choose 'electricity' or 'fuel'."}, status=400)
        
    data = get_real_predictions(energy_type)
    return Response(data)

@api_view(['POST'])
def calculate_cost(request):
    """
    Calculates future cost based on district and optional custom cost input.
    """
    district = request.data.get('district', '')
    input_cost = request.data.get('input_cost', None)
    
    if not district:
        return Response({"error": "District is required."}, status=400)
        
    if input_cost is not None and input_cost != '':
        try:
            input_cost = float(input_cost)
        except ValueError:
            return Response({"error": "Invalid cost value."}, status=400)
    else:
        input_cost = None
        
    cost_data = calculate_district_cost(district, input_cost)
    
    if not cost_data:
        return Response({"error": "District not found."}, status=404)
    
    return Response(cost_data)

@api_view(['GET'])
def get_energy_mix(request):
    country_filter = request.GET.get('country', 'India')
    file_path = os.path.join(settings.BASE_DIR, 'data', 'energy_mix.csv')
    
    data_by_year = {}
    
    if os.path.exists(file_path):
        with open(file_path, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row['country'].lower() == country_filter.lower():
                    year = row['year']
                    source = row['source']
                    generation = float(row['generation_gwh'])
                    
                    if year not in data_by_year:
                        data_by_year[year] = {"year": year}
                    
                    data_by_year[year][source] = generation
                    
    # Convert dict to sorted list
    result = [data_by_year[y] for y in sorted(data_by_year.keys())]
    return Response(result)

@api_view(['GET'])
def get_energy_poverty(request):
    file_path = os.path.join(settings.BASE_DIR, 'data', 'energy_poverty.json')
    result = []
    
    if os.path.exists(file_path):
        with open(file_path, mode='r', encoding='utf-8') as f:
            data = json.load(f)
            for item in data:
                income = item.get('avg_household_income_inr', 1)
                expense = item.get('monthly_energy_expenditure_inr', 0)
                # Calculate energy burden %
                item['energy_burden_pct'] = round((expense / income) * 100, 2)
                result.append(item)
                
    # Sort by burden (highest first)
    result.sort(key=lambda x: x.get('energy_burden_pct', 0), reverse=True)
    return Response(result)
