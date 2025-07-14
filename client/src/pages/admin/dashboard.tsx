import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  GraduationCap, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  DollarSign,
  UserCheck,
  Heart,
  ArrowRight,
  Phone,
  Mail
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Student, Contact } from "@shared/schema";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { data: students = [] } = useQuery({
    queryKey: ["/api/students"],
    queryFn: getQueryFn<Student[]>({ on401: "throw" }),
  });

  const { data: contacts = [] } = useQuery({
    queryKey: ["/api/contacts"],
    queryFn: getQueryFn<Contact[]>({ on401: "throw" }),
  });

  // Calculate statistics
  const totalStudents = students.length;
  const recentMessages = contacts.filter(contact => {
    const date = new Date(contact.createdAt);
    const now = new Date();
    return (now.getTime() - date.getTime()) < 24 * 60 * 60 * 1000; // Last 24 hours
  }).length;

  const thisMonthStudents = students.filter(student => {
    const date = new Date(student.createdAt);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;

  // Recent activity
  const recentStudents = students.slice(-5).reverse();
  const recentContacts = contacts.slice(-5).reverse();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-college-dark">Dashboard</h2>
          <p className="text-college-gray">Welcome back! Here's what's happening at the college.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button className="bg-college-green text-white hover:bg-green-600" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Total Students</p>
                <p className="text-3xl font-bold text-college-dark">{totalStudents}</p>
                <p className="text-sm text-green-600">+{thisMonthStudents} this month</p>
              </div>
              <Users className="h-8 w-8 text-college-green bg-green-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Active Courses</p>
                <p className="text-3xl font-bold text-college-dark">6</p>
                <p className="text-sm text-blue-600">HIV, ECDE, Counselling</p>
              </div>
              <GraduationCap className="h-8 w-8 text-blue-600 bg-blue-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">New Messages</p>
                <p className="text-3xl font-bold text-college-dark">{recentMessages}</p>
                <p className="text-sm text-purple-600">Last 24 hours</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-600 bg-purple-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Total Services</p>
                <p className="text-3xl font-bold text-college-dark">6</p>
                <p className="text-sm text-orange-600">Psychology, Therapy</p>
              </div>
              <Heart className="h-8 w-8 text-orange-600 bg-orange-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/students">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-5 w-5 text-college-green" />
                  <span className="font-medium text-college-dark">Manage Students</span>
                </div>
                <ArrowRight className="h-4 w-4 text-college-gray" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/admissions">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-college-dark">Admissions</span>
                </div>
                <ArrowRight className="h-4 w-4 text-college-gray" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/payments">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-college-dark">Payments</span>
                </div>
                <ArrowRight className="h-4 w-4 text-college-gray" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/messages">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-college-dark">Messages</span>
                </div>
                <ArrowRight className="h-4 w-4 text-college-gray" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-college-dark">Recent Students</CardTitle>
            <Link href="/admin/students">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentStudents.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-college-dark">{student.name}</p>
                          <p className="text-sm text-college-gray">{student.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.course}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-50 text-green-600">
                          Registered
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-college-gray py-8">No students yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-college-dark">Recent Messages</CardTitle>
            <Link href="/admin/messages">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentContacts.length > 0 ? (
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div key={contact.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-college-green rounded-full flex items-center justify-center">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-college-dark">{contact.name}</p>
                        <p className="text-xs text-college-gray">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-college-gray">{contact.subject}</p>
                      <p className="text-sm text-college-gray line-clamp-2">
                        {contact.message.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-college-gray py-8">No messages yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* College Contact Information */}
      <Card className="bg-gradient-to-r from-college-green to-green-600 text-white">
        <CardHeader>
          <CardTitle className="text-white">College Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Primary Contact</h4>
              <div className="space-y-2 text-white text-opacity-90">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>0727708240</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>leadershipjoycepcentre@gmail.com</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Alternative Contacts</h4>
              <div className="space-y-2 text-white text-opacity-90">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>0732522089</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>0117403514</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">MPESA Payment</h4>
              <div className="space-y-2 text-white text-opacity-90">
                <p>Paybill: <span className="font-bold">544069</span></p>
                <p>Account: <span className="font-bold">831298</span></p>
                <p>Location: Kitengela, Kenya</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}