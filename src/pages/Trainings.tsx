import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrainings } from "@/hooks/useTrainings";
import { Calendar, MapPin, Users } from "lucide-react";

const Trainings = () => {
  const { data: trainings, isLoading } = useTrainings();
  
  const upcomingTrainings = trainings?.filter(t => t.status === 'upcoming') || [];
  const ongoingTrainings = trainings?.filter(t => t.status === 'ongoing') || [];
  const pastTrainings = trainings?.filter(t => t.status === 'completed') || [];

  const oldTrainings = [
  {
    id: 1,
    title: "Advanced Cereal Production",
    organizer: "Ministry of Agriculture",
    date: "May 15-20, 2025",
    location: "Juba",
    type: "In Person",
    capacity: "50 participants",
    status: "Open"
  },
  {
    id: 2,
    title: "Livestock Health Management",
    organizer: "FAO",
    date: "May 25-27, 2025",
    location: "Wau",
    type: "In Person",
    capacity: "30 participants",
    status: "Open"
  },
  {
    id: 3,
    title: "Agricultural Marketing Strategies",
    organizer: "Quantum Consult",
    date: "June 5, 2025",
    location: "Online",
    type: "Virtual",
    capacity: "100 participants",
    status: "Open"
  },
  {
    id: 4,
    title: "Sustainable Farming Practices",
    organizer: "Green South Sudan",
    date: "June 10-12, 2025",
    location: "Yambio",
    type: "In Person",
    capacity: "40 participants",
    status: "Coming Soon"
  }
];

return (
    <div>
      <h1 className="text-3xl font-bold text-agro-blue mb-6">Agricultural Trainings</h1>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isLoading ? (
              [...Array(4)].map((_, i) => <Skeleton key={i} className="h-64" />)
            ) : upcomingTrainings.map((training) => (
              <Card key={training.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{training.title}</CardTitle>
                    <Badge variant={training.status === "upcoming" ? "default" : "outline"}>
                      {training.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div><strong>Date:</strong> {training.start_date ? new Date(training.start_date).toLocaleDateString() : 'TBA'}</div>
                    <div><strong>Location:</strong> {training.location || 'TBA'}</div>
                    <div><strong>Trainer:</strong> {training.trainer || 'TBA'}</div>
                    <div><strong>Capacity:</strong> {training.enrolled || 0}/{training.capacity || 0}</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Details</Button>
                  <Button 
                    disabled={training.status !== "upcoming"}
                    className={training.status === "upcoming" ? "bg-agro-green text-agro-blue hover:bg-agro-green/90" : ""}
                  >
                    Register
                  </Button>
                </CardFooter>
              </Card>
            )) || []}
          </div>
        </TabsContent>
        
        <TabsContent value="ongoing" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-64" />)}
            </div>
          ) : ongoingTrainings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ongoingTrainings.map((training) => (
                <Card key={training.id}>
                  <CardHeader>
                    <CardTitle>{training.title}</CardTitle>
                    <CardDescription>{training.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{training.start_date} - {training.end_date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{training.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{training.enrolled}/{training.capacity} enrolled</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center">No ongoing training sessions at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-64" />)}
            </div>
          ) : pastTrainings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastTrainings.map((training) => (
                <Card key={training.id}>
                  <CardHeader>
                    <CardTitle>{training.title}</CardTitle>
                    <CardDescription>{training.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{training.start_date} - {training.end_date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{training.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{training.enrolled}/{training.capacity} participants</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center">No past training sessions recorded yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="mt-10 bg-agro-blue/10 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Request Custom Training</h2>
        <p className="mb-4">
          Can't find a training that meets your needs? Request a custom training session for your 
          cooperative or community. Our agricultural experts will design a program specifically for you.
        </p>
        <Button className="bg-agro-blue hover:bg-blue-800">Request Training</Button>
      </div>
    </div>
  );
};

export default Trainings;
