import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import AdvertSpace from "@/components/AdvertSpace";
import { useNews } from "@/hooks/useNews";

const News = () => {
  const { data: news, isLoading } = useNews();
  const [categoryFilter, setCategoryFilter] = useState("all");
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-agro-blue mb-6">Agricultural News</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {isLoading ? (
                [...Array(3)].map((_, i) => <Skeleton key={i} className="h-64" />)
              ) : news?.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    {item.featured_image && (
                      <img 
                        src={item.featured_image} 
                        alt={item.title} 
                        className="w-full h-40 object-cover rounded mb-4"
                      />
                    )}
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>
                      {new Date(item.published_at || item.created_at).toLocaleDateString()} | {item.category || 'News'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{item.excerpt || item.content?.substring(0, 150) + '...'}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Read More</Button>
                  </CardFooter>
                </Card>
              )) || []}
            </div>
            
            <div className="space-y-6">
              <AdvertSpace className="h-64" />
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-3">Subscribe to Newsletter</h3>
                <p className="text-sm mb-3">
                  Get the latest agricultural news and market updates delivered to your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 border border-gray-300 rounded-l px-3 py-2"
                  />
                  <Button>Subscribe</Button>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-3">Popular Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Policy</Button>
                  <Button variant="outline" size="sm">Market</Button>
                  <Button variant="outline" size="sm">Funding</Button>
                  <Button variant="outline" size="sm">Technology</Button>
                  <Button variant="outline" size="sm">Climate</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="policy">
          <p className="p-4 text-center">Policy news content will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="market">
          <p className="p-4 text-center">Market news content will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="funding">
          <p className="p-4 text-center">Funding news content will be displayed here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default News;
