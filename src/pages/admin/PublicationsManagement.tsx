import { useState, useEffect } from "react";
import { usePublications, useCreatePublication, useUpdatePublication, useDeletePublication } from "@/hooks/usePublications";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Download } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PublicationsManagement = () => {
  const { data: publications, isLoading } = usePublications();
  const createPublication = useCreatePublication();
  const updatePublication = useUpdatePublication();
  const deletePublication = useDeletePublication();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPub, setSelectedPub] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    fetchUser();
  }, []);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file_url: "",
    file_type: "PDF",
    category: "",
    author: "",
    published_date: new Date().toISOString().split('T')[0],
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this publication?")) {
      await deletePublication.mutateAsync(id);
      toast({
        title: "Deleted",
        description: "Publication deleted successfully.",
      });
    }
  };

  const handleEdit = (pub: any) => {
    setSelectedPub(pub);
    setFormData({
      title: pub.title,
      description: pub.description || "",
      file_url: pub.file_url,
      file_type: pub.file_type || "PDF",
      category: pub.category || "",
      author: pub.author || "",
      published_date: pub.published_date || new Date().toISOString().split('T')[0],
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title || !formData.file_url) {
      toast({
        title: "Validation Error",
        description: "Please fill in title and file URL.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (selectedPub) {
        await updatePublication.mutateAsync({
          id: selectedPub.id,
          updates: formData
        });
        toast({
          title: "Success",
          description: "Publication updated successfully.",
        });
      } else {
        await createPublication.mutateAsync({
          ...formData,
          created_by: currentUserId
        });
        toast({
          title: "Success",
          description: "Publication created successfully.",
        });
      }
      setDialogOpen(false);
      setSelectedPub(null);
      setFormData({
        title: "",
        description: "",
        file_url: "",
        file_type: "PDF",
        category: "",
        author: "",
        published_date: new Date().toISOString().split('T')[0],
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save publication.",
        variant: "destructive",
      });
    }
  };

  const filteredPublications = publications?.filter((pub) => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || pub.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Publications Management</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedPub(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Publication
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedPub ? "Edit Publication" : "Add New Publication"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label>File URL</Label>
                <Input
                  value={formData.file_url}
                  onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                  placeholder="https://example.com/document.pdf"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>File Type</Label>
                  <Select value={formData.file_type} onValueChange={(value) => setFormData({ ...formData, file_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="DOC">DOC</SelectItem>
                      <SelectItem value="DOCX">DOCX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Guide">Guide</SelectItem>
                      <SelectItem value="Report">Report</SelectItem>
                      <SelectItem value="Policy">Policy</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Author</Label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Published Date</Label>
                  <Input
                    type="date"
                    value={formData.published_date}
                    onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                  />
                </div>
              </div>
              <Button 
                onClick={handleSave} 
                className="w-full"
                disabled={createPublication.isPending || updatePublication.isPending}
              >
                {(createPublication.isPending || updatePublication.isPending) ? "Saving..." : selectedPub ? "Update Publication" : "Create Publication"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Publications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
                <SelectItem value="Guide">Guide</SelectItem>
                <SelectItem value="Report">Report</SelectItem>
                <SelectItem value="Policy">Policy</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Publications List */}
      <Card>
        <CardHeader>
          <CardTitle>Publications</CardTitle>
          <CardDescription>Manage research papers, guides, and reports</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          ) : filteredPublications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No publications found</p>
          ) : (
            <div className="space-y-4">
              {filteredPublications.map((pub) => (
                <div key={pub.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{pub.title}</h3>
                    <p className="text-sm text-muted-foreground">{pub.description}</p>
                    <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
                      <span>{pub.file_type}</span>
                      {pub.category && <span>• {pub.category}</span>}
                      {pub.author && <span>• {pub.author}</span>}
                      <span>• Downloads: {pub.downloads}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={pub.file_url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(pub)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(pub.id)}>
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

export default PublicationsManagement;
