import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heart, Plus, Edit, Trash2, Search, Activity, Clock, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  category: z.string().min(1, "Category is required"),
});

type Service = z.infer<typeof serviceSchema> & { id: number };

const mockServices: Service[] = [
  {
    id: 1,
    name: "Psychological Counselling",
    description: "Professional one-on-one counselling sessions for mental health support",
    price: "KES 2,500",
    duration: "60 minutes",
    category: "Mental Health"
  },
  {
    id: 2,
    name: "Group Therapy",
    description: "Therapeutic group sessions for peer support and healing",
    price: "KES 1,500",
    duration: "90 minutes",
    category: "Mental Health"
  },
  {
    id: 3,
    name: "HIV Testing",
    description: "Confidential HIV testing and counselling services",
    price: "KES 500",
    duration: "30 minutes",
    category: "Health Testing"
  },
  {
    id: 4,
    name: "Nutrition Consultation",
    description: "Professional dietary planning and nutrition advice",
    price: "KES 3,000",
    duration: "45 minutes",
    category: "Health"
  },
  {
    id: 5,
    name: "Family Counselling",
    description: "Counselling services for families and couples",
    price: "KES 4,000",
    duration: "75 minutes",
    category: "Mental Health"
  },
  {
    id: 6,
    name: "Health Screening",
    description: "Comprehensive health check-up and screening services",
    price: "KES 1,800",
    duration: "30 minutes",
    category: "Health Testing"
  }
];

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<Service>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "",
    },
  });

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddService = (data: Service) => {
    const newService = { ...data, id: Date.now() };
    setServices([...services, newService]);
    setIsAddDialogOpen(false);
    form.reset();
    toast({
      title: "Service Added",
      description: `${data.name} has been successfully added.`,
    });
  };

  const handleEditService = (data: Service) => {
    setServices(services.map(s => s.id === selectedService?.id ? { ...data, id: selectedService.id } : s));
    setIsEditDialogOpen(false);
    setSelectedService(null);
    form.reset();
    toast({
      title: "Service Updated",
      description: `${data.name} has been successfully updated.`,
    });
  };

  const handleDeleteService = (serviceId: number) => {
    setServices(services.filter(s => s.id !== serviceId));
    toast({
      title: "Service Deleted",
      description: "Service has been successfully deleted.",
    });
  };

  const openEditDialog = (service: Service) => {
    setSelectedService(service);
    form.reset(service);
    setIsEditDialogOpen(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mental Health": return "bg-purple-50 text-purple-600";
      case "Health Testing": return "bg-green-50 text-green-600";
      case "Health": return "bg-blue-50 text-blue-600";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-college-dark">Services Management</h2>
          <p className="text-college-gray">Manage all health and wellness services</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-college-green text-white hover:bg-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddService)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter service name" {...field} />
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
                        <FormControl>
                          <Input placeholder="Enter category" {...field} />
                        </FormControl>
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
                        <Textarea placeholder="Enter service description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., KES 2,500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 60 minutes" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-college-green text-white hover:bg-green-600">
                    Add Service
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
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
                <p className="text-sm font-medium text-college-gray">Mental Health</p>
                <p className="text-3xl font-bold text-purple-600">
                  {services.filter(s => s.category === "Mental Health").length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-600 bg-purple-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Average Duration</p>
                <p className="text-3xl font-bold text-blue-600">58</p>
                <p className="text-sm text-blue-600">minutes</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600 bg-blue-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Monthly Bookings</p>
                <p className="text-3xl font-bold text-green-600">127</p>
              </div>
              <Users className="h-8 w-8 text-green-600 bg-green-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search services by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-college-dark">
            Services ({filteredServices.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-college-dark">{service.name}</p>
                      <p className="text-sm text-college-gray line-clamp-2">{service.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(service.category)}>
                      {service.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-college-dark">{service.price}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-college-gray">{service.duration}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditService)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter service name" {...field} />
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
                      <FormControl>
                        <Input placeholder="Enter category" {...field} />
                      </FormControl>
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
                      <Textarea placeholder="Enter service description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., KES 2,500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 60 minutes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-college-green text-white hover:bg-green-600">
                  Update Service
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}