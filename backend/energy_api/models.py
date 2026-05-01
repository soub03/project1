from django.db import models

class EnergyRecord(models.Model):
    # 'electricity' or 'fuel'
    energy_type = models.CharField(max_length=50)
    # Date of the record
    date = models.DateField()
    # Price per unit (e.g., $ per kWh or $ per Gallon)
    price = models.FloatField()
    # Demand metric (e.g., millions of units)
    demand = models.FloatField()
    # True if this is a historical record, False if it's a future prediction
    is_historical = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.energy_type.capitalize()} - {self.date}: ${self.price}"

class PredictionInsight(models.Model):
    # 'electricity' or 'fuel'
    energy_type = models.CharField(max_length=50)
    # Short summary of the prediction
    summary = models.CharField(max_length=200)
    # Detailed geopolitical/economic reasons
    geopolitical_reasons = models.TextField()
    # Whether the trend is 'increase', 'decrease', or 'stable'
    trend_direction = models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.energy_type.capitalize()} Insight: {self.trend_direction}"
