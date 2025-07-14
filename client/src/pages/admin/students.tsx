import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Filter, Download, Phone, Mail, Eye, Trash2, UserPlus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryFn, apiRequest } from "@/lib/queryClient";
import { Student } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: students = [], isLoading } = useQuery({
    queryKey: ["/api/students"],
    queryFn: getQueryFn<Student[]>({ on401: "throw" }),
  });

  const deleteStudentMutation = useMutation({
    mutationFn: async (studentId: number) => {
      await apiRequest("DELETE", `/api/students/${studentId}`);
    },
    onSuccess: () => {
      toast({
        title: "Student Deleted",
        description: "Student has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete student. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Filter students based on search term and course
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm);
    const matchesCourse = courseFilter === "all" || student.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  // Get unique courses for filter
  const uniqueCourses = [...new Set(students.map(s => s.course))];

  const handleDeleteStudent = (student: Student) => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      deleteStudentMutation.mutate(student.id);
    }
  };

  const exportStudents = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Course", "Registration Date"],
      ...filteredStudents.map(student => [
        student.name,
        student.email,
        student.phone,
        student.course,
        new Date(student.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-college-dark">Student Management</h2>
          <p className="text-college-gray">Manage all registered students</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={exportStudents} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-college-green text-white hover:bg-green-600">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Total Students</p>
                <p className="text-3xl font-bold text-college-dark">{students.length}</p>
              </div>
              <Users className="h-8 w-8 text-college-green bg-green-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">This Month</p>
                <p className="text-3xl font-bold text-blue-600">
                  {students.filter(s => {
                    const date = new Date(s.createdAt);
                    const now = new Date();
                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <UserPlus className="h-8 w-8 text-blue-600 bg-blue-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Active Courses</p>
                <p className="text-3xl font-bold text-purple-600">{uniqueCourses.length}</p>
              </div>
              <Badge className="bg-purple-50 text-purple-600">Courses</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Completion Rate</p>
                <p className="text-3xl font-bold text-green-600">89%</p>
              </div>
              <Badge className="bg-green-50 text-green-600">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {uniqueCourses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-college-dark">
            Students ({filteredStudents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-college-green mx-auto"></div>
              <p className="mt-2 text-college-gray">Loading students...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-college-dark">{student.name}</p>
                        <p className="text-sm text-college-gray">{student.email}</p>
                        <p className="text-sm text-college-gray">{student.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {student.course}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-college-gray">
                        {new Date(student.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-college-gray">
                        {new Date(student.createdAt).toLocaleTimeString()}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-50 text-green-600">
                        Registered
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Student Details</DialogTitle>
                            </DialogHeader>
                            {selectedStudent && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-college-dark">Full Name</label>
                                    <p className="text-college-gray">{selectedStudent.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-college-dark">Email</label>
                                    <p className="text-college-gray">{selectedStudent.email}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-college-dark">Phone</label>
                                    <p className="text-college-gray">{selectedStudent.phone}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-college-dark">Course</label>
                                    <Badge variant="outline">{selectedStudent.course}</Badge>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-college-dark">Registration Date</label>
                                  <p className="text-college-gray">
                                    {new Date(selectedStudent.createdAt).toLocaleDateString()} at {new Date(selectedStudent.createdAt).toLocaleTimeString()}
                                  </p>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t">
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      onClick={() => window.open(`mailto:${selectedStudent.email}`, "_blank")}
                                    >
                                      <Mail className="h-4 w-4 mr-2" />
                                      Email
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => window.open(`tel:${selectedStudent.phone}`, "_blank")}
                                    >
                                      <Phone className="h-4 w-4 mr-2" />
                                      Call
                                    </Button>
                                  </div>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteStudent(selectedStudent)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Student
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`mailto:${student.email}`, "_blank")}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`tel:${student.phone}`, "_blank")}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStudent(student)}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}