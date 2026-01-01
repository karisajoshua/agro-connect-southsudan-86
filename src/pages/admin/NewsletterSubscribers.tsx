import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Download, 
  Trash2, 
  Search, 
  Mail, 
  Users, 
  UserCheck, 
  Calendar,
  Copy,
  FileJson,
  FileSpreadsheet,
} from "lucide-react";
import { useNewsletterSubscribers, useDeleteSubscriber, useToggleSubscriberStatus } from "@/hooks/useNewsletter";
import { useToast } from "@/hooks/use-toast";
import { format, subMonths, isAfter } from "date-fns";

const NewsletterSubscribers = () => {
  const { data: subscribers = [], isLoading } = useNewsletterSubscribers();
  const deleteSubscriber = useDeleteSubscriber();
  const toggleStatus = useToggleSubscriberStatus();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) => {
      const matchesSearch = sub.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && sub.is_active) ||
        (statusFilter === "unsubscribed" && !sub.is_active);
      return matchesSearch && matchesStatus;
    });
  }, [subscribers, search, statusFilter]);

  const stats = useMemo(() => {
    const total = subscribers.length;
    const active = subscribers.filter((s) => s.is_active).length;
    const oneMonthAgo = subMonths(new Date(), 1);
    const thisMonth = subscribers.filter((s) =>
      isAfter(new Date(s.subscribed_at), oneMonthAgo)
    ).length;
    return { total, active, thisMonth };
  }, [subscribers]);

  const downloadCSV = () => {
    const headers = "Email,Subscribed At,Status,Source\n";
    const rows = filteredSubscribers
      .map(
        (s) =>
          `${s.email},${format(new Date(s.subscribed_at), "yyyy-MM-dd HH:mm")},${
            s.is_active ? "Active" : "Unsubscribed"
          },${s.source}`
      )
      .join("\n");
    const csv = headers + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded", description: "CSV file downloaded successfully." });
  };

  const downloadJSON = () => {
    const data = JSON.stringify(filteredSubscribers, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${format(new Date(), "yyyy-MM-dd")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded", description: "JSON file downloaded successfully." });
  };

  const copyEmails = () => {
    const emails = filteredSubscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    toast({
      title: "Copied!",
      description: `${filteredSubscribers.length} email(s) copied to clipboard.`,
    });
  };

  const handleDelete = (id: string) => {
    deleteSubscriber.mutate(id);
  };

  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    toggleStatus.mutate({ id, is_active: !currentStatus });
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading subscribers...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Newsletter Subscribers</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.thisMonth}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Export */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={copyEmails}>
                <Copy className="h-4 w-4 mr-1" />
                Copy Emails
              </Button>
              <Button variant="outline" size="sm" onClick={downloadCSV}>
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={downloadJSON}>
                <FileJson className="h-4 w-4 mr-1" />
                JSON
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Subscribed At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No subscribers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {subscriber.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(subscriber.subscribed_at), "MMM d, yyyy HH:mm")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={subscriber.is_active ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleToggleStatus(subscriber.id, subscriber.is_active)}
                      >
                        {subscriber.is_active ? "Active" : "Unsubscribed"}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{subscriber.source}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete subscriber?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete {subscriber.email} from the newsletter list.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(subscriber.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterSubscribers;
