import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Heart, Users, Clock, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  price: z.string().min(1, "Price is required"),
  availability: z.string().min(1, "Availability is required"),
  targetAudience: z.string().min(1, "Target audience is required"),
});

type Service = z.infer<typeof serviceSchema> & { id: number };

const initialServices: Service[] = [
  {
    id: 1,
    title: "Psychological Counselling",
    category: "Mental Health",
    description: "Professional psychological support and counselling services for individuals dealing with mental health challenges, stress, and emotional difficulties.",
    duration: "60 minutes per session",
    price: "KSH 2,500",
    availability: "Monday to Friday, 9 AM - 5 PM",
    targetAudience: "Adults, Adolescents, Families",
  },
  {
    id: 2,
    title: "Family & Marriage Therapy",
    category: "Relationship Counselling",
    description: "Specialized therapy services for couples and families to strengthen relationships, improve communication, and resolve conflicts.",
    duration: "90 minutes per session",
    price: "KSH 3,500",
    availability: "Tuesday to Saturday, 10 AM - 6 PM",
    targetAudience: "Couples, Families",
  },
  {
    id: 3,
    title: "HIV Counselling & Testing",
    category: "Health Services",
    description: "Professional HIV counselling and testing services with confidential support and post-test counselling.",
    duration: "45 minutes",
    price: "KSH 1,500",
    availability: "Monday to Friday, 8 AM - 4 PM",
    targetAudience: "Adults, Adolescents",
  },
  {
    id: 4,
    title: "Adolescent Play Therapy",
    category: "Child Psychology",
    description: "Specialized play therapy services designed for adolescents and young people to address behavioral and emotional issues.",
    duration: "60 minutes per session",
    price: "KSH 2,000",
    availability: "Monday to Friday, 2 PM - 6 PM",
    targetAudience: "Children, Adolescents",
  },
  {
    id: 5,
    title: "Grief & Trauma Counselling",
    category: "Trauma Support",
    description: "Professional support for individuals dealing with grief, trauma, loss, and post-traumatic stress.",
    duration: "60 minutes per session",
    price: "KSH 2,500",
    availability: "Monday to Saturday, 9 AM - 5 PM",
    targetAudience: "Adults, Adolescents",
  },
  {
    id: 6,
    title: "Student Counselling",
    category: "Educational Support",
    description: "Academic and personal counselling services for students at all levels, including career guidance and academic support.",
    duration: "45 minutes per session",
    price: "KSH 1,800",
    availability: "Monday to Friday, 9 AM - 5 PM",
    targetAudience: "Students, Young Adults",
  },
];

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<Service>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      duration: "",
      price: "",
      availability: "",
      targetAudience: "",
    },
  });

  const handleAddService = (data: Service) => {
    const newService = {
      ...data,
      id: Math.max(...services.map(s => s.id)) + 1,
    };
    setServices([...services, newService]);
    toast({
      title: "Service Added",
      description: "New service has been successfully added.",
    });
    setIsDialogOpen(false);
    form.reset();
  };

  const handleEditService = (data: Service) => {
    setServices(services.map(s => s.id === editingService?.id ? { ...data, id: editingService.id } : s));
    toast({
      title: "Service Updated",
      description: "Service has been successfully updated.",
    });
    setIsDialogOpen(false);
    setEditingService(null);
    form.reset();
  };

  const handleDeleteService = (serviceId: number) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(s => s.id !== serviceId));
      toast({
        title: "Service Deleted",
        description: "Service has been successfully deleted.",
      });
    }
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    form.reset(service);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingService(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Mental Health": "bg-purple-50 text-purple-600",
      "Relationship Counselling": "bg-pink-50 text-pink-600",
      "Health Services": "bg-green-50 text-green-600",
      "Child Psychology": "bg-blue-50 text-blue-600",
      "Trauma Support": "bg-orange-50 text-orange-600",
      "Educational Support": "bg-indigo-50 text-indigo-600",
    };
    return colors[category as keyof typeof colors] || "bg-gray-50 text-gray-600";
  };

  const categories = [...new Set(services.map(s => s.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-college-dark">Service Management</h2>
          <p className="text-college-gray">Manage all health and wellness services</p>
        </div>
        <Button onClick={openAddDialog} className="bg-college-green text-white hover:bg-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Add New Service
        </Button>
      </div>

      {/* Service Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Total Services</p>
                <p className="text-3xl font-bold text-college-dark">{services.length}</p>
              </div>
              <Heart className="h-8 w-8 text-college-green bg-green-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Categories</p>
                <p className="text-3xl font-bold text-college-dark">{categories.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600 bg-blue-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Avg. Duration</p>
                <p className="text-3xl font-bold text-college-dark">60</p>
                <p className="text-sm text-college-gray">minutes</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600 bg-purple-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Active Services</p>
                <p className="text-3xl font-bold text-college-dark">{services.length}</p>
              </div>
              <Star className="h-8 w-8 text-orange-600 bg-orange-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-college-dark mb-2">{service.title}</h3>
                  <Badge className={getCategoryColor(service.category)}>
                    {service.category}
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(service)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteService(service.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-college-gray mb-4">{service.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-college-gray">Duration:</span>
                  <span className="font-medium text-college-dark">{service.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-college-gray">Price:</span>
                  <span className="font-medium text-college-green">{service.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-college-gray">Target:</span>
                  <span className="font-medium text-college-dark">{service.targetAudience}</span>
                </div>
                <div className="text-sm pt-2 border-t">
                  <span className="text-college-gray">Available:</span>
                  <p className="text-college-dark mt-1">{service.availability}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Service Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(editingService ? handleEditService : handleAddService)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter service title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Mental Health">Mental Health</SelectItem>
                          <SelectItem value="Relationship Counselling">Relationship Counselling</SelectItem>
                          <SelectItem value="Health Services">Health Services</SelectItem>
                          <SelectItem value="Child Psychology">Child Psychology</SelectItem>
                          <SelectItem value="Trauma Support">Trauma Support</SelectItem>
                          <SelectItem value="Educational Support">Educational Support</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter service description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 60 minutes per session" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., KSH 2,500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Monday to Friday, 9 AM - 5 PM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Adults, Adolescents, Families" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-college-green text-white hover:bg-green-600">
                  {editingService ? "Update Service" : "Add Service"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}