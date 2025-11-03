import { useState } from "react";
import { useTrainings, useCreateTraining, useUpdateTraining, useDeleteTraining } from "@/hooks/useTrainings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TrainingsManagement = () => {
  const { data: trainings, isLoading } = useTrainings();
  const createTraining = useCreateTraining();
  const updateTraining = useUpdateTraining();
  const deleteTraining = useDeleteTraining();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    start_date: "",
    end_date: "",
    capacity: 0,
    trainer: "",
    contact_info: "",
    status: "upcoming",
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this training program?")) {
      await deleteTraining.mutateAsync(id);
      toast({
        title: "Deleted",
        description: "Training program deleted successfully.",
      });
    }
  };

  const handleEdit = (training: any) => {
    setSelectedTraining(training);
    setFormData({
      title: training.title,
      description: training.description || "",
      location: training.location || "",
      start_date: training.start_date || "",
      end_date: training.end_date || "",
      capacity: training.capacity || 0,
      trainer: training.trainer || "",
      contact_info: training.contact_info || "",
      status: training.status,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in title and description.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (selectedTraining) {
        await updateTraining.mutateAsync({
          id: selectedTraining.id,
          updates: formData
        });
        toast({
          title: "Success",
          description: "Training program updated successfully.",
        });
      } else {
        await createTraining.mutateAsync(formData);
        toast({
          title: "Success",
          description: "Training program created successfully.",
        });
      }
      setDialogOpen(false);
      setSelectedTraining(null);
      setFormData({
        title: "",
        description: "",
        location: "",
        start_date: "",
        end_date: "",
        capacity: 0,
        trainer: "",
        contact_info: "",
        status: "upcoming",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save training program.",
        variant: "destructive",
      });
    }
  };

  const filteredTrainings = trainings?.filter((training) => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || training.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const stats = {
    total: trainings?.length || 0,
    upcoming: trainings?.filter(t => t.status === 'upcoming').length || 0,
    ongoing: trainings?.filter(t => t.status === 'ongoing').length || 0,
    completed: trainings?.filter(t => t.status === 'completed').length || 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Training Programs Management</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedTraining(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Training
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedTraining ? "Edit Training" : "Add New Training"}</DialogTitle>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Capacity</Label>
                  <Input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Trainer</Label>
                <Input
                  value={formData.trainer}
                  onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                />
              </div>
              <div>
                <Label>Contact Info</Label>
                <Input
                  value={formData.contact_info}
                  onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleSave} 
                className="w-full"
                disabled={createTraining.isPending || updateTraining.isPending}
              >
                {(createTraining.isPending || updateTraining.isPending) ? "Saving..." : selectedTraining ? "Update Training" : "Create Training"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats.upcoming}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ongoing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{stats.ongoing}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-600">{stats.completed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Trainings</CardTitle>
        </CardHeader>
        <CardContent>
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
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trainings List */}
      <Card>
        <CardHeader>
          <CardTitle>Training Programs</CardTitle>
          <CardDescription>Manage training schedules and enrollment</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          ) : filteredTrainings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No training programs found</p>
          ) : (
            <div className="space-y-4">
              {filteredTrainings.map((training) => (
                <div key={training.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{training.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={
                        training.status === 'upcoming' ? 'default' :
                        training.status === 'ongoing' ? 'secondary' :
                        'outline'
                      }>
                        {training.status}
                      </Badge>
                      {training.location && <Badge variant="outline">{training.location}</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {training.start_date && `${new Date(training.start_date).toLocaleDateString()}`}
                      {training.end_date && ` - ${new Date(training.end_date).toLocaleDateString()}`}
                      <span className="ml-2">• Enrolled: {training.enrolled || 0}/{training.capacity}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(training)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(training.id)}>
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

export default TrainingsManagement;
