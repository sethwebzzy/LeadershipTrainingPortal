import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, DollarSign, TrendingUp, Search, Download, Check, X, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Student } from "@shared/schema";

// Mock payment data - in real app this would come from payment processor
interface Payment {
  id: number;
  studentId: number;
  studentName: string;
  course: string;
  amount: number;
  mpesaCode: string;
  paymentDate: string;
  status: "confirmed" | "pending" | "failed";
  phoneNumber: string;
}

const mockPayments: Payment[] = [
  {
    id: 1,
    studentId: 1,
    studentName: "John Doe",
    course: "HIV (VCT) Counselling",
    amount: 15000,
    mpesaCode: "QGH7YT8X9Z",
    paymentDate: "2024-01-15",
    status: "confirmed",
    phoneNumber: "0722123456"
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Jane Smith",
    course: "Diploma in Counselling",
    amount: 45000,
    mpesaCode: "RFJ8KL2M3N",
    paymentDate: "2024-01-14",
    status: "confirmed",
    phoneNumber: "0733987654"
  },
  {
    id: 3,
    studentId: 3,
    studentName: "Peter Wilson",
    course: "ECDE Certificate",
    amount: 25000,
    mpesaCode: "STU9VW4X5Y",
    paymentDate: "2024-01-13",
    status: "pending",
    phoneNumber: "0711456789"
  }
];

export default function AdminPayments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "pending" | "failed">("all");
  const [payments] = useState<Payment[]>(mockPayments);

  const { data: students = [] } = useQuery({
    queryKey: ["/api/students"],
    queryFn: getQueryFn<Student[]>({ on401: "throw" }),
  });

  // Filter payments based on search term and status
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.mpesaCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalRevenue = payments.filter(p => p.status === "confirmed").reduce((sum, p) => sum + p.amount, 0);
  const confirmedPayments = payments.filter(p => p.status === "confirmed").length;
  const pendingPayments = payments.filter(p => p.status === "pending").length;
  const thisMonthRevenue = payments.filter(p => {
    const date = new Date(p.paymentDate);
    const now = new Date();
    return p.status === "confirmed" && 
           date.getMonth() === now.getMonth() && 
           date.getFullYear() === now.getFullYear();
  }).reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status: "confirmed" | "pending" | "failed") => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-50 text-green-600"><Check className="h-3 w-3 mr-1" />Confirmed</Badge>;
      case "pending":
        return <Badge variant="secondary" className="text-yellow-600 bg-yellow-50"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "failed":
        return <Badge variant="destructive" className="text-red-600 bg-red-50"><X className="h-3 w-3 mr-1" />Failed</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const exportPayments = () => {
    const csvContent = [
      ["Student Name", "Course", "Amount", "MPESA Code", "Payment Date", "Status", "Phone Number"],
      ...filteredPayments.map(payment => [
        payment.studentName,
        payment.course,
        payment.amount.toString(),
        payment.mpesaCode,
        payment.paymentDate,
        payment.status,
        payment.phoneNumber
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payments.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-college-dark">Payments Overview</h2>
          <p className="text-college-gray">Track and manage student payments</p>
        </div>
        <Button onClick={exportPayments} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Payments
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Total Revenue</p>
                <p className="text-2xl font-bold text-college-dark">{formatCurrency(totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600 bg-green-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">This Month</p>
                <p className="text-2xl font-bold text-college-dark">{formatCurrency(thisMonthRevenue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600 bg-blue-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{confirmedPayments}</p>
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
                <p className="text-2xl font-bold text-yellow-600">{pendingPayments}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600 bg-yellow-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Instructions Card */}
      <Card className="bg-college-green text-white">
        <CardHeader>
          <CardTitle className="text-white">MPESA Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Payment Instructions</h4>
              <div className="space-y-2 text-white text-opacity-90">
                <p>1. Go to MPESA Menu</p>
                <p>2. Select "Lipa na M-Pesa"</p>
                <p>3. Select "Pay Bill"</p>
                <p>4. Enter Business Number: <span className="font-bold">544069</span></p>
                <p>5. Enter Account Number: <span className="font-bold">831298</span></p>
                <p>6. Enter Amount and PIN</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Payment Verification</h4>
              <div className="space-y-2 text-white text-opacity-90">
                <p>• Payment confirmations are automatically tracked</p>
                <p>• Students receive SMS confirmations</p>
                <p>• Manual verification available for issues</p>
                <p>• Contact Joyce for payment disputes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payments by student, course, or MPESA code..."
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
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-college-dark">
            Payment Records ({filteredPayments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>MPESA Code</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-college-dark">{payment.studentName}</p>
                      <p className="text-sm text-college-gray">ID: {payment.studentId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {payment.course}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-college-dark">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {payment.mpesaCode}
                  </TableCell>
                  <TableCell>
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(payment.status)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {payment.phoneNumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}