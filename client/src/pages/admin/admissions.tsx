import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, Search, Check, X, Clock, Eye, Phone, Mail, FileText } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryFn, apiRequest } from "@/lib/queryClient";
import { Student } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

type AdmissionStatus = "pending" | "approved" | "rejected";

export default function AdminAdmissions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | AdmissionStatus>("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: students = [], isLoading } = useQuery({
    queryKey: ["/api/students"],
    queryFn: getQueryFn<Student[]>({ on401: "throw" }),
  });

  const updateAdmissionMutation = useMutation({
    mutationFn: async ({ studentId, status }: { studentId: number; status: AdmissionStatus }) => {
      await apiRequest("PATCH", `/api/students/${studentId}/admission`, { status });
    },
    onSuccess: () => {
      toast({
        title: "Status Updated",
        description: "Admission status has been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update admission status. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Filter students based on search term and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase());
    const currentStatus = getAdmissionStatus(student);
    const matchesStatus = statusFilter === "all" || currentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getAdmissionStatus = (student: Student): AdmissionStatus => {
    // For demo purposes, we'll simulate admission status based on registration date
    const registrationDate = new Date(student.createdAt);
    const now = new Date();
    const daysSinceRegistration = Math.floor((now.getTime() - registrationDate.getTime()) / (1000 * 3600 * 24));
    
    if (daysSinceRegistration < 2) return "pending";
    if (daysSinceRegistration < 7) return "approved";
    return "approved"; // Most students get approved
  };

  const handleStatusUpdate = (studentId: number, status: AdmissionStatus) => {
    updateAdmissionMutation.mutate({ studentId, status });
  };

  const getStatusBadge = (status: AdmissionStatus) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-50 text-green-600"><Check className="h-3 w-3 mr-1" />Approved</Badge>;
      case "pending":
        return <Badge variant="secondary" className="text-yellow-600 bg-yellow-50"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="text-red-600 bg-red-50"><X className="h-3 w-3 mr-1" />Rejected</Badge>;
    }
  };

  const getStatusCount = (status: AdmissionStatus) => {
    return filteredStudents.filter(student => getAdmissionStatus(student) === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-college-dark">Admissions Management</h2>
          <p className="text-college-gray">Review and manage student admission applications</p>
        </div>
        <Button className="bg-college-green text-white hover:bg-green-600">
          <FileText className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Total Applications</p>
                <p className="text-3xl font-bold text-college-dark">{students.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-college-green bg-green-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Approved</p>
                <p className="text-3xl font-bold text-green-600">{getStatusCount("approved")}</p>
              </div>
              <Check className="h-8 w-8 text-green-600 bg-green-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{getStatusCount("pending")}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600 bg-yellow-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{getStatusCount("rejected")}</p>
              </div>
              <X className="h-8 w-8 text-red-600 bg-red-50 p-1 rounded-full" />
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
                  placeholder="Search applications by name, email, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admissions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-college-dark">
            Applications ({filteredStudents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-college-green mx-auto"></div>
              <p className="mt-2 text-college-gray">Loading applications...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Application Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  const status = getAdmissionStatus(student);
                  return (
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
                        {getStatusBadge(status)}
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
                                <DialogTitle>Application Review</DialogTitle>
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
                                    <label className="text-sm font-medium text-college-dark">Application Date</label>
                                    <p className="text-college-gray">
                                      {new Date(selectedStudent.createdAt).toLocaleDateString()} at {new Date(selectedStudent.createdAt).toLocaleTimeString()}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-college-dark">Current Status</label>
                                    <div className="mt-2">
                                      {getStatusBadge(getAdmissionStatus(selectedStudent))}
                                    </div>
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
                                    <div className="flex space-x-2">
                                      <Button
                                        variant="outline"
                                        className="text-red-600 hover:text-red-700"
                                        onClick={() => handleStatusUpdate(selectedStudent.id, "rejected")}
                                        disabled={updateAdmissionMutation.isPending}
                                      >
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                      <Button
                                        className="bg-green-600 text-white hover:bg-green-700"
                                        onClick={() => handleStatusUpdate(selectedStudent.id, "approved")}
                                        disabled={updateAdmissionMutation.isPending}
                                      >
                                        <Check className="h-4 w-4 mr-2" />
                                        Approve
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          {status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                                onClick={() => handleStatusUpdate(student.id, "approved")}
                                disabled={updateAdmissionMutation.isPending}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleStatusUpdate(student.id, "rejected")}
                                disabled={updateAdmissionMutation.isPending}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}