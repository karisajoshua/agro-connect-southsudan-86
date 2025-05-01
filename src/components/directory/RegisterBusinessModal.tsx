
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Building, Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface RegisterBusinessModalProps {
  open: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters" }),
  businessType: z.string({ required_error: "Please select a business type" }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email" }).optional().or(z.literal("")),
  location: z.object({
    boma: z.string().optional(),
    payam: z.string().optional(),
    county: z.string(),
    state: z.string()
  }),
  cropsSpecialized: z.string().min(1, { message: "Please specify your products/services" }),
  hasBankAccount: z.boolean().default(false),
  hasInternetAccess: z.boolean().default(false),
  businessDescription: z.string().min(10, { message: "Please provide a brief description of your business" }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  })
});

type FormValues = z.infer<typeof formSchema>;

const RegisterBusinessModal = ({ open, onClose }: RegisterBusinessModalProps) => {
  const { toast } = useToast();
  const [documentUploaded, setDocumentUploaded] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessType: "",
      contactName: "",
      phone: "",
      email: "",
      location: {
        boma: "",
        payam: "",
        county: "",
        state: ""
      },
      cropsSpecialized: "",
      hasBankAccount: false,
      hasInternetAccess: false,
      businessDescription: "",
      agreeToTerms: false
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentUploaded(true);
      toast({
        title: "Document uploaded",
        description: `File "${e.target.files[0].name}" has been uploaded successfully.`,
      });
    }
  };

  const onSubmit = (data: FormValues) => {
    if (!documentUploaded) {
      toast({
        title: "Missing document",
        description: "Please upload your registration documents.",
        variant: "destructive"
      });
      return;
    }

    console.log("Form submitted:", data);
    
    toast({
      title: "Business Registration Submitted!",
      description: "Your business has been registered successfully. It will appear in the directory after review.",
    });
    
    form.reset();
    setDocumentUploaded(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-agro-blue flex items-center gap-2">
            <Building size={20} /> Register Your Business
          </DialogTitle>
          <DialogDescription>
            Add your agricultural business to our directory to reach more customers and partners.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Your business name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cooperative">Cooperative</SelectItem>
                        <SelectItem value="supplier">Supplier</SelectItem>
                        <SelectItem value="processor">Processor</SelectItem>
                        <SelectItem value="transporter">Transporter</SelectItem>
                        <SelectItem value="consultant">Consultant</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Name of contact person" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. +211 91 234 5678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="business.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Business Location <span className="text-red-500">*</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location.boma"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Boma</FormLabel>
                      <FormControl>
                        <Input placeholder="Boma" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location.payam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payam</FormLabel>
                      <FormControl>
                        <Input placeholder="Payam" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location.county"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>County <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="County" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="cropsSpecialized"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Products/Services Specialized In <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List the agricultural products or services your business offers" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hasBankAccount"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Business has a bank account
                      </FormLabel>
                      <FormDescription>
                        For potential financial transactions
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hasInternetAccess"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Business has access to internet
                      </FormLabel>
                      <FormDescription>
                        For digital communication and updates
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <Label htmlFor="documentUpload">Business Registration Documents <span className="text-red-500">*</span></Label>
              <div className="mt-1 flex items-center">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload size={36} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Upload business registration documents</p>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG or DOCX up to 10MB</p>
                  </div>
                  <input 
                    id="documentUpload" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".pdf,.png,.jpg,.jpeg,.docx"
                  />
                </label>
              </div>
              {documentUploaded && (
                <p className="text-sm text-green-600 mt-1">Document uploaded successfully</p>
              )}
              {!documentUploaded && form.formState.isSubmitted && (
                <p className="text-sm text-red-500 mt-1">Please upload your business registration documents</p>
              )}
            </div>

            <FormField
              control={form.control}
              name="businessDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Description <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide a brief description of your business, including history, scale, and key offerings"
                      className="h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the terms and conditions <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      By submitting this form, I consent to the processing and publication of this business information
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" className="bg-agro-blue hover:bg-blue-800">
                Register Business
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterBusinessModal;
