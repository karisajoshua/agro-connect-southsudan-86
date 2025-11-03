import { useState } from "react";
import { useAllNews, useUpdateNews, useDeleteNews } from "@/hooks/useNews";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateNews } from "@/hooks/useNews";
import { Switch } from "@/components/ui/switch";

const NewsManagement = () => {
  const { data: news, isLoading } = useAllNews();
  const updateNews = useUpdateNews();
  const deleteNews = useDeleteNews();
  const createNews = useCreateNews();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    featured_image: "",
    published: false,
  });

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    await updateNews.mutateAsync({
      id,
      updates: { 
        published: !currentStatus,
        published_at: !currentStatus ? new Date().toISOString() : null
      }
    });
    toast({
      title: "Success",
      description: `Article ${!currentStatus ? "published" : "unpublished"} successfully.`,
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      await deleteNews.mutateAsync(id);
      toast({
        title: "Deleted",
        description: "Article deleted successfully.",
      });
    }
  };

  const handleEdit = (article: any) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || "",
      category: article.category || "",
      featured_image: article.featured_image || "",
      published: article.published,
    });
    setEditDialogOpen(true);
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in title and content.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (selectedArticle) {
        await updateNews.mutateAsync({
          id: selectedArticle.id,
          updates: formData
        });
        toast({
          title: "Success",
          description: "Article updated successfully.",
        });
      } else {
        await createNews.mutateAsync(formData);
        toast({
          title: "Success",
          description: "Article created successfully.",
        });
      }
      setEditDialogOpen(false);
      setSelectedArticle(null);
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        category: "",
        featured_image: "",
        published: false,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save article.",
        variant: "destructive",
      });
    }
  };

  const filteredNews = news?.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = 
      statusFilter === "all" ? true :
      statusFilter === "published" ? article.published :
      !article.published;
    return matchesSearch && matchesStatus;
  }) || [];

  const stats = {
    total: news?.length || 0,
    published: news?.filter(a => a.published).length || 0,
    drafts: news?.filter(a => !a.published).length || 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">News & Articles Management</h1>
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedArticle(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedArticle ? "Edit Article" : "Create New Article"}</DialogTitle>
              <DialogDescription>
                Fill in the details below to {selectedArticle ? "update" : "create"} an article.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Policy">Policy</SelectItem>
                    <SelectItem value="Market">Market</SelectItem>
                    <SelectItem value="Funding">Funding</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Climate">Climate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">Published</Label>
              </div>
              <Button 
                onClick={handleSave} 
                className="w-full"
                disabled={createNews.isPending || updateNews.isPending}
              >
                {(createNews.isPending || updateNews.isPending) ? "Saving..." : selectedArticle ? "Update Article" : "Create Article"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Published</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{stats.published}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">{stats.drafts}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Articles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Articles List */}
      <Card>
        <CardHeader>
          <CardTitle>Articles</CardTitle>
          <CardDescription>Manage your news articles and publications</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          ) : filteredNews.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No articles found</p>
          ) : (
            <div className="space-y-4">
              {filteredNews.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{article.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={article.published ? "default" : "secondary"}>
                        {article.published ? "Published" : "Draft"}
                      </Badge>
                      {article.category && <Badge variant="outline">{article.category}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(article.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublished(article.id, article.published)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      {article.published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <footer className="text-center text-sm text-muted-foreground py-4 border-t">
        Powered by Texcortech Systems
      </footer>
    </div>
  );
};

export default NewsManagement;
