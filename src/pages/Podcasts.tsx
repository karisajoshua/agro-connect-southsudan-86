
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface Podcast {
  id: number;
  title: string;
  host: string;
  episodes: number;
  category: string;
  language: string;
  description: string;
  latestEpisode: {
    title: string;
    duration: string;
    date: string;
  };
}

const podcasts: Podcast[] = [
  {
    id: 1,
    title: "Farming Matters",
    host: "John Deng",
    episodes: 25,
    category: "General Agriculture",
    language: "English, Arabic",
    description: "Weekly discussions on various agricultural topics relevant to South Sudan farmers.",
    latestEpisode: {
      title: "Preparing for the Rainy Season",
      duration: "35:20",
      date: "Apr 20, 2025"
    }
  },
  {
    id: 2,
    title: "Market Watch",
    host: "Sarah Nyakong",
    episodes: 18,
    category: "Agricultural Business",
    language: "English, Dinka",
    description: "Updates on agricultural market trends, prices, and business opportunities.",
    latestEpisode: {
      title: "Export Opportunities for South Sudan Produce",
      duration: "42:15",
      date: "Apr 18, 2025"
    }
  },
  {
    id: 3,
    title: "Livestock Talk",
    host: "Dr. James Mading",
    episodes: 32,
    category: "Livestock",
    language: "English, Arabic, Nuer",
    description: "Expert advice on livestock management, health, and breeding practices.",
    latestEpisode: {
      title: "Preventing Common Cattle Diseases",
      duration: "28:45",
      date: "Apr 15, 2025"
    }
  },
  {
    id: 4,
    title: "Women in Agriculture",
    host: "Mary Ayen",
    episodes: 15,
    category: "Gender & Agriculture",
    language: "English, Arabic",
    description: "Stories and advice from successful women farmers across South Sudan.",
    latestEpisode: {
      title: "Breaking Barriers in Agricultural Leadership",
      duration: "40:10",
      date: "Apr 12, 2025"
    }
  }
];

const Podcasts = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  
  const handlePlayEpisode = (podcast: Podcast) => {
    setCurrentPodcast(podcast);
    setIsPlaying(true);
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-agro-blue mb-6">Agricultural Podcasts</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="all">All Podcasts</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="livestock">Livestock</TabsTrigger>
          <TabsTrigger value="gender">Gender</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {podcasts.map((podcast) => (
              <Card key={podcast.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{podcast.title}</CardTitle>
                      <CardDescription>Hosted by: {podcast.host}</CardDescription>
                    </div>
                    <div className="text-sm text-gray-500">
                      {podcast.episodes} episodes
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div><strong>Category:</strong> {podcast.category}</div>
                    <div><strong>Language:</strong> {podcast.language}</div>
                    <p>{podcast.description}</p>
                    
                    <div className="mt-4 bg-gray-100 p-3 rounded-lg">
                      <div className="font-medium">Latest Episode:</div>
                      <div className="text-agro-blue font-medium">{podcast.latestEpisode.title}</div>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <div>{podcast.latestEpisode.duration}</div>
                        <div>{podcast.latestEpisode.date}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View All Episodes</Button>
                  <Button 
                    onClick={() => handlePlayEpisode(podcast)}
                    className="bg-agro-green text-agro-blue hover:bg-agro-green/90"
                  >
                    Play Latest
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="general">
          <p className="p-4 text-center">General agriculture podcasts will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="business">
          <p className="p-4 text-center">Business podcasts will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="livestock">
          <p className="p-4 text-center">Livestock podcasts will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="gender">
          <p className="p-4 text-center">Gender and agriculture podcasts will be displayed here.</p>
        </TabsContent>
      </Tabs>
      
      {/* Audio Player */}
      {currentPodcast && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
          <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-10 w-10 rounded-full bg-agro-blue text-white"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? "⏸" : "▶"}
              </Button>
              
              <div>
                <div className="font-medium">{currentPodcast.latestEpisode.title}</div>
                <div className="text-sm text-gray-500">{currentPodcast.title}</div>
              </div>
            </div>
            
            <div className="flex-grow max-w-md mx-4 flex flex-col gap-1">
              <Slider defaultValue={[33]} max={100} step={1} />
              <div className="flex justify-between text-xs text-gray-500">
                <span>11:45</span>
                <span>{currentPodcast.latestEpisode.duration}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                ⏮
              </Button>
              <Button variant="ghost" size="icon">
                ⏭
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setCurrentPodcast(null)}>
                ✕
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Podcasts;
