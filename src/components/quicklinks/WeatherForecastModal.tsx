
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "lucide-react";

interface WeatherForecastModalProps {
  open: boolean;
  onClose: () => void;
}

const weatherData = [
  {
    region: "Central Equatoria",
    forecast: [
      { day: "Today", temp: "32°C", condition: "Partly Cloudy", rainfall: "10%", humidity: "65%" },
      { day: "Tomorrow", temp: "30°C", condition: "Sunny", rainfall: "5%", humidity: "60%" },
      { day: "Wednesday", temp: "31°C", condition: "Scattered Showers", rainfall: "40%", humidity: "70%" },
      { day: "Thursday", temp: "29°C", condition: "Thunderstorms", rainfall: "60%", humidity: "75%" },
      { day: "Friday", temp: "30°C", condition: "Partly Cloudy", rainfall: "20%", humidity: "65%" },
    ]
  },
  {
    region: "Western Bahr el Ghazal",
    forecast: [
      { day: "Today", temp: "33°C", condition: "Sunny", rainfall: "5%", humidity: "55%" },
      { day: "Tomorrow", temp: "34°C", condition: "Clear", rainfall: "0%", humidity: "50%" },
      { day: "Wednesday", temp: "33°C", condition: "Partly Cloudy", rainfall: "10%", humidity: "60%" },
      { day: "Thursday", temp: "32°C", condition: "Partly Cloudy", rainfall: "20%", humidity: "65%" },
      { day: "Friday", temp: "31°C", condition: "Scattered Showers", rainfall: "30%", humidity: "70%" },
    ]
  },
  {
    region: "Upper Nile",
    forecast: [
      { day: "Today", temp: "35°C", condition: "Sunny", rainfall: "0%", humidity: "45%" },
      { day: "Tomorrow", temp: "36°C", condition: "Clear", rainfall: "0%", humidity: "40%" },
      { day: "Wednesday", temp: "35°C", condition: "Clear", rainfall: "5%", humidity: "45%" },
      { day: "Thursday", temp: "34°C", condition: "Partly Cloudy", rainfall: "10%", humidity: "50%" },
      { day: "Friday", temp: "33°C", condition: "Partly Cloudy", rainfall: "15%", humidity: "55%" },
    ]
  }
];

const WeatherForecastModal = ({ open, onClose }: WeatherForecastModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-agro-blue flex items-center gap-2">
            <Navigation size={20} /> Weather Forecast
          </DialogTitle>
          <DialogDescription>
            5-day forecast for key agricultural regions in South Sudan. Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="Central Equatoria">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="Central Equatoria">Central Equatoria</TabsTrigger>
            <TabsTrigger value="Western Bahr el Ghazal">Western Bahr el Ghazal</TabsTrigger>
            <TabsTrigger value="Upper Nile">Upper Nile</TabsTrigger>
          </TabsList>
          
          {weatherData.map((region) => (
            <TabsContent key={region.region} value={region.region}>
              <div className="grid grid-cols-5 gap-2 mt-4">
                {region.forecast.map((day, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border text-center">
                    <p className="font-semibold">{day.day}</p>
                    <p className="text-2xl font-bold my-2">{day.temp}</p>
                    <p>{day.condition}</p>
                    <div className="text-sm mt-2">
                      <p>Rain: {day.rainfall}</p>
                      <p>Humidity: {day.humidity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="text-sm text-gray-500 mt-4">
          <p>* Weather data provided by South Sudan Meteorological Department</p>
          <p>* Forecasts are subject to change</p>
        </div>
        
        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button className="bg-agro-blue hover:bg-blue-800">View Seasonal Forecast</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WeatherForecastModal;
