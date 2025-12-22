import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAllEcommerceProducts, useCreateEcommerceProduct, useUpdateEcommerceProduct, useDeleteEcommerceProduct, EcommerceProduct } from "@/hooks/useEcommerceProducts";
import { useToast } from "@/hooks/use-toast";

const formatPrice = (price: number) => new Intl.NumberFormat("en-US").format(price);

const categories = ["Cereals", "Vegetables", "Legumes", "Fruits", "Cash Crops", "Fish & Honey", "Livestock", "Poultry", "Oil Crops"];

const EcommerceProductsAdmin = () => {
  const { toast } = useToast();
  const { data: products = [], isLoading } = useAllEcommerceProducts();
  const createProduct = useCreateEcommerceProduct();
  const updateProduct = useUpdateEcommerceProduct();
  const deleteProduct = useDeleteEcommerceProduct();

  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<EcommerceProduct | null>(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", unit: "kg", stock_quantity: "100",
    min_order_quantity: "1", category: "", subcategory: "", image_url: "", is_available: true,
  });

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddDialog = () => {
    setEditingProduct(null);
    setForm({ name: "", description: "", price: "", unit: "kg", stock_quantity: "100", min_order_quantity: "1", category: "", subcategory: "", image_url: "", is_available: true });
    setDialogOpen(true);
  };

  const openEditDialog = (product: EcommerceProduct) => {
    setEditingProduct(product);
    setForm({
      name: product.name, description: product.description || "", price: String(product.price),
      unit: product.unit, stock_quantity: String(product.stock_quantity), min_order_quantity: String(product.min_order_quantity),
      category: product.category, subcategory: product.subcategory || "", image_url: product.image_url || "", is_available: product.is_available,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    const data = {
      name: form.name, description: form.description || null, price: parseFloat(form.price),
      unit: form.unit, stock_quantity: parseInt(form.stock_quantity), min_order_quantity: parseInt(form.min_order_quantity),
      category: form.category, subcategory: form.subcategory || null, image_url: form.image_url || null, is_available: form.is_available,
      product_id: null, seller_id: null,
    };

    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({ id: editingProduct.id, ...data });
        toast({ title: "Product updated successfully" });
      } else {
        await createProduct.mutateAsync(data);
        toast({ title: "Product created successfully" });
      }
      setDialogOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast({ title: "Product deleted" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-Commerce Products</h1>
        <Button onClick={openAddDialog} className="bg-agro-green hover:bg-agro-green/90">
          <Plus className="mr-2" size={18} /> Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={product.image_url || "https://via.placeholder.com/40"} alt={product.name} className="w-10 h-10 rounded object-cover" />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.seller?.business_name || "Admin"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>SSP {formatPrice(product.price)}/{product.unit}</TableCell>
                    <TableCell>{product.stock_quantity}</TableCell>
                    <TableCell>
                      <Badge variant={product.is_available ? "default" : "secondary"}>
                        {product.is_available ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(product)}><Pencil size={14} /></Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}><Trash2 size={14} /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Product Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Price (SSP) *</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
              <div><Label>Unit *</Label>
                <Select value={form.unit} onValueChange={(v) => setForm({ ...form, unit: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="100kgs">100kgs</SelectItem>
                    <SelectItem value="ltr">ltr</SelectItem>
                    <SelectItem value="piece">piece</SelectItem>
                    <SelectItem value="bundle">bundle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Stock Quantity</Label><Input type="number" value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} /></div>
              <div><Label>Min Order Qty</Label><Input type="number" value={form.min_order_quantity} onChange={(e) => setForm({ ...form, min_order_quantity: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Category *</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Subcategory</Label><Input value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} /></div>
            </div>
            <div><Label>Image URL</Label><Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></div>
            <div className="flex items-center gap-2">
              <Switch checked={form.is_available} onCheckedChange={(c) => setForm({ ...form, is_available: c })} />
              <Label>Available for sale</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!form.name || !form.price || !form.category} className="bg-agro-green hover:bg-agro-green/90">
              {editingProduct ? "Update" : "Create"} Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EcommerceProductsAdmin;
