import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAllOrders, useUpdateOrderStatus, Order } from "@/hooks/useOrders";
import { format } from "date-fns";

const formatPrice = (price: number) => new Intl.NumberFormat("en-US").format(price);
const statusColors: Record<string, string> = { pending: "bg-yellow-500", confirmed: "bg-blue-500", processing: "bg-purple-500", shipped: "bg-cyan-500", delivered: "bg-green-500", cancelled: "bg-red-500" };
const statuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const OrdersAdmin = () => {
  const { data: orders = [], isLoading } = useAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.delivery_address?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, status: string) => {
    updateStatus.mutate({ orderId, status });
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => ["confirmed", "processing", "shipped"].includes(o.status)).length,
    completed: orders.filter((o) => o.status === "delivered").length,
    revenue: orders.filter((o) => o.status === "delivered").reduce((sum, o) => sum + o.total_amount, 0),
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders Management</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="pt-6"><p className="text-2xl font-bold">{stats.total}</p><p className="text-sm text-muted-foreground">Total Orders</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-2xl font-bold text-yellow-600">{stats.pending}</p><p className="text-sm text-muted-foreground">Pending</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-2xl font-bold text-blue-600">{stats.processing}</p><p className="text-sm text-muted-foreground">In Progress</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-2xl font-bold text-green-600">SSP {formatPrice(stats.revenue)}</p><p className="text-sm text-muted-foreground">Revenue</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
            <div className="flex gap-2">
              <div className="relative w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? <p>Loading orders...</p> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.order_number}</TableCell>
                    <TableCell>
                      <div>
                        <p>{order.delivery_address?.name}</p>
                        <p className="text-xs text-muted-foreground">{order.delivery_address?.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(order.created_at), "MMM d, yyyy")}</TableCell>
                    <TableCell>{order.items?.length || 0}</TableCell>
                    <TableCell className="font-medium">SSP {formatPrice(order.total_amount)}</TableCell>
                    <TableCell>
                      <Select value={order.status} onValueChange={(v) => handleStatusChange(order.id, v)}>
                        <SelectTrigger className="w-28 h-8">
                          <Badge className={statusColors[order.status]}>{order.status}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}><Eye size={14} /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Order Details - {selectedOrder?.order_number}</DialogTitle></DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-muted-foreground">Customer</p><p className="font-medium">{selectedOrder.delivery_address?.name}</p></div>
                <div><p className="text-muted-foreground">Phone</p><p className="font-medium">{selectedOrder.delivery_address?.phone}</p></div>
                <div><p className="text-muted-foreground">Address</p><p className="font-medium">{selectedOrder.delivery_address?.address}, {selectedOrder.delivery_address?.city}</p></div>
                <div><p className="text-muted-foreground">Payment</p><p className="font-medium capitalize">{selectedOrder.payment_method?.replace("_", " ")}</p></div>
              </div>
              <div className="border-t pt-4">
                <p className="font-medium mb-2">Order Items</p>
                {selectedOrder.items?.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-1">
                    <span>{item.product_name} x {item.quantity}</span>
                    <span>SSP {formatPrice(item.total_price)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 border-t mt-2">
                  <span>Total</span><span>SSP {formatPrice(selectedOrder.total_amount)}</span>
                </div>
              </div>
              {selectedOrder.notes && <div><p className="text-muted-foreground text-sm">Notes</p><p>{selectedOrder.notes}</p></div>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersAdmin;
