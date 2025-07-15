import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BookOpen, Plus, Edit, Trash2, Search, GraduationCap, Clock, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const courseSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  fee: z.string().min(1, "Fee is required"),
  category: z.string().min(1, "Category is required"),
});

type Course = z.infer<typeof courseSchema> & { id: number };

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: 1,
    name: "HIV Testing and Counselling",
    description: "Comprehensive training in HIV counselling techniques and testing procedures",
    duration: "6 months",
    fee: "KES 25,000",
    category: "Health"
  },
  {
    id: 2,
    name: "Early Childhood Development Education (ECDE)",
    description: "Professional development for early childhood educators",
    duration: "8 months",
    fee: "KES 30,000",
    category: "Education"
  },
  {
    id: 3,
    name: "Kenya Sign Language",
    description: "Complete sign language communication training",
    duration: "4 months",
    fee: "KES 18,000",
    category: "Communication"
  },
  {
    id: 4,
    name: "Psychological Counselling",
    description: "Professional counselling and therapy techniques",
    duration: "12 months",
    fee: "KES 45,000",
    category: "Psychology"
  },
  {
    id: 5,
    name: "Community Health",
    description: "Community health promotion and disease prevention",
    duration: "6 months",
    fee: "KES 28,000",
    category: "Health"
  },
  {
    id: 6,
    name: "Nutrition and Dietetics",
    description: "Professional nutrition and dietary planning",
    duration: "10 months",
    fee: "KES 35,000",
    category: "Health"
  }
];

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: "",
      fee: "",
      category: "",
    },
  });

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = (data: Course) => {
    const newCourse = { ...data, id: Date.now() };
    setCourses([...courses, newCourse]);
    setIsAddDialogOpen(false);
    form.reset();
    toast({
      title: "Course Added",
      description: `${data.name} has been successfully added.`,
    });
  };

  const handleEditCourse = (data: Course) => {
    setCourses(courses.map(c => c.id === selectedCourse?.id ? { ...data, id: selectedCourse.id } : c));
    setIsEditDialogOpen(false);
    setSelectedCourse(null);
    form.reset();
    toast({
      title: "Course Updated",
      description: `${data.name} has been successfully updated.`,
    });
  };

  const handleDeleteCourse = (courseId: number) => {
    setCourses(courses.filter(c => c.id !== courseId));
    toast({
      title: "Course Deleted",
      description: "Course has been successfully deleted.",
    });
  };

  const openEditDialog = (course: Course) => {
    setSelectedCourse(course);
    form.reset(course);
    setIsEditDialogOpen(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Health": return "bg-green-50 text-green-600";
      case "Education": return "bg-blue-50 text-blue-600";
      case "Communication": return "bg-purple-50 text-purple-600";
      case "Psychology": return "bg-orange-50 text-orange-600";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-college-dark">Course Management</h2>
          <p className="text-college-gray">Manage all college courses and programs</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-college-green text-white hover:bg-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddCourse)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter course name" {...field} />
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
                        <Textarea placeholder="Enter course description" {...field} />
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
                          <Input placeholder="e.g., 6 months" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fee</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., KES 25,000" {...field} />
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
                    Add Course
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
                <p className="text-sm font-medium text-college-gray">Total Courses</p>
                <p className="text-3xl font-bold text-college-dark">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-college-green bg-green-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Health Courses</p>
                <p className="text-3xl font-bold text-green-600">
                  {courses.filter(c => c.category === "Health").length}
                </p>
              </div>
              <GraduationCap className="h-8 w-8 text-green-600 bg-green-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Average Duration</p>
                <p className="text-3xl font-bold text-blue-600">7.3</p>
                <p className="text-sm text-blue-600">months</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600 bg-blue-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Active Students</p>
                <p className="text-3xl font-bold text-purple-600">234</p>
              </div>
              <Users className="h-8 w-8 text-purple-600 bg-purple-50 p-1 rounded-full" />
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
              placeholder="Search courses by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-college-dark">
            Courses ({filteredCourses.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-college-dark">{course.name}</p>
                      <p className="text-sm text-college-gray line-clamp-2">{course.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(course.category)}>
                      {course.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-college-gray">{course.duration}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-college-dark">{course.fee}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(course)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
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
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditCourse)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course name" {...field} />
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
                      <Textarea placeholder="Enter course description" {...field} />
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
                        <Input placeholder="e.g., 6 months" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fee</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., KES 25,000" {...field} />
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
                  Update Course
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}