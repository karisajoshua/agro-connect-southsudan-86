import { useContactSubmissions, useUpdateContactSubmission } from "@/hooks/useContactSubmissions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const UserEngagement = () => {
  const { data: submissions, isLoading } = useContactSubmissions();
  const updateSubmission = useUpdateContactSubmission();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleResolve = async (id: string) => {
    await updateSubmission.mutateAsync({
      id,
      status: 'responded',
      responded_by: user?.id
    });
    toast({
      title: "Success",
      description: "Submission marked as responded.",
    });
  };

  const stats = {
    total: submissions?.length || 0,
    new: submissions?.filter(s => s.status === 'new').length || 0,
    inProgress: submissions?.filter(s => s.status === 'in-progress').length || 0,
    responded: submissions?.filter(s => s.status === 'responded').length || 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Engagement</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">{stats.inProgress}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Responded</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{stats.responded}</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Form Submissions</CardTitle>
          <CardDescription>Manage user inquiries and feedback</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          ) : submissions?.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No submissions yet</p>
          ) : (
            <div className="space-y-4">
              {submissions?.map((submission) => (
                <div key={submission.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{submission.name}</h3>
                      <p className="text-sm text-muted-foreground">{submission.email}</p>
                      {submission.phone && (
                        <p className="text-sm text-muted-foreground">{submission.phone}</p>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      <Badge variant={
                        submission.status === 'new' ? 'default' :
                        submission.status === 'in-progress' ? 'secondary' :
                        'outline'
                      }>
                        {submission.status}
                      </Badge>
                      {submission.status !== 'responded' && (
                        <Button size="sm" onClick={() => handleResolve(submission.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark Responded
                        </Button>
                      )}
                    </div>
                  </div>
                  {submission.subject && (
                    <p className="font-medium text-sm mb-1">Subject: {submission.subject}</p>
                  )}
                  <p className="text-sm">{submission.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Submitted: {new Date(submission.created_at).toLocaleString()}
                  </p>
                  {submission.responded_at && (
                    <p className="text-xs text-muted-foreground">
                      Responded: {new Date(submission.responded_at).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEngagement;
