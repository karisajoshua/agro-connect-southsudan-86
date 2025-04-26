import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  date: string;
  category: string;
  description: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Modern Maize Cultivation Techniques",
    thumbnail: "/placeholder.svg",
    duration: "18:45",
    views: 1245,
    date: "2025-03-15",
    category: "Crop Farming",
    description: "Learn advanced techniques for maize cultivation suited for South Sudan's climate conditions."
  },
  {
    id: 2,
    title: "Efficient Irrigation Systems for Small Farms",
    thumbnail: "/placeholder.svg",
    duration: "12:30",
    views: 987,
    date: "2025-03-10",
    category: "Technology",
    description: "Discover affordable irrigation solutions that can help small-scale farmers improve their yields."
  },
  {
    id: 3,
    title: "Livestock Health Management",
    thumbnail: "/placeholder.svg",
    duration: "22:15",
    views: 856,
    date: "2025-03-05",
    category: "Livestock",
    description: "Essential practices for maintaining livestock health and preventing common diseases."
  },
  {
    id: 4,
    title: "Sustainable Fishing Practices",
    thumbnail: "/placeholder.svg",
    duration: "15:20",
    views: 678,
    date: "2025-02-28",
    category: "Aquaculture",
    description: "Environmentally friendly fishing methods that preserve fish stocks for future generations."
  },
  {
    id: 5,
    title: "Value Addition for Agricultural Products",
    thumbnail: "/placeholder.svg",
    duration: "20:05",
    views: 1089,
    date: "2025-02-20",
    category: "Business",
    description: "Learn how to add value to your agricultural products to increase income and access better markets."
  },
  {
    id: 6,
    title: "Organic Farming Basics",
    thumbnail: "/placeholder.svg",
    duration: "17:30",
    views: 942,
    date: "2025-02-15",
    category: "Crop Farming",
    description: "Introduction to organic farming principles and practices applicable in South Sudan."
  }
];

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-agro-blue mb-6">Agricultural Videos</h1>
      
      {selectedVideo ? (
        <div className="mb-8">
          <div className="aspect-video bg-gray-900 flex items-center justify-center mb-4 rounded-lg">
            {/* Video player would be implemented here */}
            <div className="text-white text-center">
              <div className="text-6xl mb-4">▶</div>
              <div>{selectedVideo.title}</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
            <Button 
              variant="outline" 
              onClick={() => setSelectedVideo(null)}
            >
              Back to List
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div><strong>Category:</strong> {selectedVideo.category}</div>
            <div><strong>Duration:</strong> {selectedVideo.duration}</div>
            <div><strong>Views:</strong> {selectedVideo.views}</div>
          </div>
          
          <p className="mb-6">{selectedVideo.description}</p>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Related Videos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {videos
                .filter(v => v.id !== selectedVideo.id && v.category === selectedVideo.category)
                .slice(0, 4)
                .map(video => (
                  <div 
                    key={video.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-24 object-cover rounded"
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="text-sm mt-1 line-clamp-2">{video.title}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="crop">Crop Farming</TabsTrigger>
              <TabsTrigger value="livestock">Livestock</TabsTrigger>
              <TabsTrigger value="aqua">Aquaculture</TabsTrigger>
              <TabsTrigger value="tech">Technology</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card 
                    key={video.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                          <div className="text-4xl ml-1">▶</div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                      <CardDescription>{video.views} views • {new Date(video.date).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-2">{video.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between text-sm">
                      <span className="text-agro-blue">{video.category}</span>
                      <Button variant="ghost" size="sm">Watch Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Other tab contents would be similar but filtered by category */}
            <TabsContent value="crop">
              <p className="p-4 text-center">Crop farming videos will be displayed here.</p>
            </TabsContent>
            
            <TabsContent value="livestock">
              <p className="p-4 text-center">Livestock videos will be displayed here.</p>
            </TabsContent>
            
            <TabsContent value="aqua">
              <p className="p-4 text-center">Aquaculture videos will be displayed here.</p>
            </TabsContent>
            
            <TabsContent value="tech">
              <p className="p-4 text-center">Technology videos will be displayed here.</p>
            </TabsContent>
            
            <TabsContent value="business">
              <p className="p-4 text-center">Business videos will be displayed here.</p>
            </TabsContent>
          </Tabs>
          
          <div className="mt-10 bg-agro-blue/10 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Subscribe to Our YouTube Channel</h2>
            <p className="mb-4">
              Get access to all our videos on agricultural techniques, market information, and success stories.
            </p>
            <Button className="bg-red-600 hover:bg-red-700">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M23 7.42C22.9 7 22.7 6.6 22.5 6.42C22.1 6.04 21.5 5.89 21 5.82C18.1 5.3 12 5.3 12 5.3C12 5.3 5.9 5.3 3 5.8C2.5 5.89 1.9 6.01 1.5 6.4C1.3 6.6 1.1 7 1 7.4C0.8 8.2 0.7 9.5 0.7 10.8C0.7 12.1 0.8 13.4 1 14.1C1.1 14.5 1.3 14.9 1.5 15.1C1.9 15.5 2.5 15.6 3 15.7C5.9 16.2 12 16.2 12 16.2C12 16.2 18.1 16.2 21 15.7C21.5 15.61 22.1 15.49 22.5 15.1C22.7 14.9 22.9 14.5 23 14.1C23.2 13.3 23.3 12 23.3 10.7C23.3 9.4 23.2 8.1 23 7.42Z" fill="white"/>
                <path d="M9.5 13.3L15.5 10.7L9.5 8.1V13.3Z" fill="#F00"/>
              </svg>
              Subscribe
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Videos;
