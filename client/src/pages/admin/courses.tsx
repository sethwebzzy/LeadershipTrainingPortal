import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, BookOpen, Clock, Award } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Type is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  certification: z.string().min(1, "Certification is required"),
  prerequisites: z.string().optional(),
  fee: z.string().min(1, "Fee is required"),
});

type Course = z.infer<typeof courseSchema> & { id: number };

const initialCourses: Course[] = [
  {
    id: 1,
    title: "HIV (VCT) Counselling and Testing",
    type: "Short Course",
    description: "Professional training in HIV counselling and testing procedures, following national guidelines and best practices.",
    duration: "3 months",
    certification: "Certificate",
    prerequisites: "Basic healthcare knowledge",
    fee: "KSH 15,000",
  },
  {
    id: 2,
    title: "Adherence Counselling",
    type: "Certificate Course",
    description: "Specialized training in adherence counselling techniques for chronic disease management.",
    duration: "2 months",
    certification: "Certificate",
    prerequisites: "Healthcare background preferred",
    fee: "KSH 12,000",
  },
  {
    id: 3,
    title: "Diploma in Counselling",
    type: "Diploma Program",
    description: "Comprehensive counselling program covering theory, practice, and ethics in professional counselling.",
    duration: "12 months",
    certification: "Diploma",
    prerequisites: "High school certificate",
    fee: "KSH 45,000",
  },
  {
    id: 4,
    title: "Primary Guidance",
    type: "Certificate Course",
    description: "Training in primary school guidance and counselling techniques for educational settings.",
    duration: "4 months",
    certification: "Certificate",
    prerequisites: "Teaching experience preferred",
    fee: "KSH 18,000",
  },
  {
    id: 5,
    title: "Kenya Sign Language",
    type: "Certificate Course",
    description: "Professional training in Kenya Sign Language for inclusive communication and accessibility.",
    duration: "6 months",
    certification: "Certificate",
    prerequisites: "None",
    fee: "KSH 20,000",
  },
  {
    id: 6,
    title: "ECDE",
    type: "Certificate & Diploma",
    description: "Early Childhood Development and Education program for aspiring early childhood educators.",
    duration: "Certificate: 6 months, Diploma: 18 months",
    certification: "Certificate/Diploma",
    prerequisites: "High school certificate",
    fee: "Certificate: KSH 25,000, Diploma: KSH 60,000",
  },
];

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      type: "",
      description: "",
      duration: "",
      certification: "",
      prerequisites: "",
      fee: "",
    },
  });

  const handleAddCourse = (data: Course) => {
    const newCourse = {
      ...data,
      id: Math.max(...courses.map(c => c.id)) + 1,
    };
    setCourses([...courses, newCourse]);
    toast({
      title: "Course Added",
      description: "New course has been successfully added.",
    });
    setIsDialogOpen(false);
    form.reset();
  };

  const handleEditCourse = (data: Course) => {
    setCourses(courses.map(c => c.id === editingCourse?.id ? { ...data, id: editingCourse.id } : c));
    toast({
      title: "Course Updated",
      description: "Course has been successfully updated.",
    });
    setIsDialogOpen(false);
    setEditingCourse(null);
    form.reset();
  };

  const handleDeleteCourse = (courseId: number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== courseId));
      toast({
        title: "Course Deleted",
        description: "Course has been successfully deleted.",
      });
    }
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    form.reset(course);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingCourse(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Short Course":
        return "bg-blue-50 text-blue-600";
      case "Certificate Course":
        return "bg-green-50 text-green-600";
      case "Diploma Program":
        return "bg-purple-50 text-purple-600";
      case "Certificate & Diploma":
        return "bg-orange-50 text-orange-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-college-dark">Course Management</h2>
          <p className="text-college-gray">Manage all courses and programs</p>
        </div>
        <Button onClick={openAddDialog} className="bg-college-green text-white hover:bg-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Add New Course
        </Button>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <p className="text-sm font-medium text-college-gray">Certificate Programs</p>
                <p className="text-3xl font-bold text-college-dark">
                  {courses.filter(c => c.certification.includes("Certificate")).length}
                </p>
              </div>
              <Award className="h-8 w-8 text-blue-600 bg-blue-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Diploma Programs</p>
                <p className="text-3xl font-bold text-college-dark">
                  {courses.filter(c => c.certification.includes("Diploma")).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600 bg-purple-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-college-dark mb-2">{course.title}</h3>
                  <Badge className={getTypeColor(course.type)}>
                    {course.type}
                  </Badge>
                </div>
                <div className="flex space-x-1">
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
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-college-gray mb-4">{course.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-college-gray">Duration:</span>
                  <span className="font-medium text-college-dark">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-college-gray">Certification:</span>
                  <span className="font-medium text-college-dark">{course.certification}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-college-gray">Fee:</span>
                  <span className="font-medium text-college-green">{course.fee}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Course Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingCourse ? "Edit Course" : "Add New Course"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(editingCourse ? handleEditCourse : handleAddCourse)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Short Course">Short Course</SelectItem>
                          <SelectItem value="Certificate Course">Certificate Course</SelectItem>
                          <SelectItem value="Diploma Program">Diploma Program</SelectItem>
                          <SelectItem value="Certificate & Diploma">Certificate & Diploma</SelectItem>
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
                        placeholder="Enter course description"
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
                        <Input placeholder="e.g., 3 months" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="certification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certification</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select certification" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Certificate">Certificate</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="Certificate/Diploma">Certificate/Diploma</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="prerequisites"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prerequisites</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., High school certificate" {...field} />
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
                      <FormLabel>Course Fee</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., KSH 15,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-college-green text-white hover:bg-green-600">
                  {editingCourse ? "Update Course" : "Add Course"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}