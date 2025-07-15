import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Search, Eye, Trash2, Phone, Mail, Reply, Filter } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryFn, apiRequest } from "@/lib/queryClient";
import { Contact } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function AdminMessages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["/api/contacts"],
    queryFn: getQueryFn<Contact[]>({ on401: "throw" }),
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (contactId: number) => {
      await apiRequest("DELETE", `/api/contacts/${contactId}`);
    },
    onSuccess: () => {
      toast({
        title: "Message Deleted",
        description: "Message has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === "all" || contact.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const uniqueSubjects = [...new Set(contacts.map(c => c.subject))];

  const handleDeleteMessage = (contact: Contact) => {
    if (window.confirm(`Are you sure you want to delete the message from ${contact.name}?`)) {
      deleteMessageMutation.mutate(contact.id);
    }
  };

  const getSubjectBadge = (subject: string) => {
    const colors = {
      "General Inquiry": "bg-blue-50 text-blue-600",
      "Course Information": "bg-green-50 text-green-600",
      "Payment Issue": "bg-red-50 text-red-600",
      "Technical Support": "bg-purple-50 text-purple-600",
      "Admission Question": "bg-yellow-50 text-yellow-600",
      "Other": "bg-gray-50 text-gray-600"
    };
    return colors[subject as keyof typeof colors] || "bg-gray-50 text-gray-600";
  };

  const getSubjectCount = (subject: string) => {
    return contacts.filter(c => c.subject === subject).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-college-dark">Messages Management</h2>
          <p className="text-college-gray">Manage all contact form messages and inquiries</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-college-green text-white hover:bg-green-600">
            <Reply className="h-4 w-4 mr-2" />
            Bulk Reply
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Total Messages</p>
                <p className="text-3xl font-bold text-college-dark">{contacts.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-college-green bg-green-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Course Inquiries</p>
                <p className="text-3xl font-bold text-blue-600">{getSubjectCount("Course Information")}</p>
              </div>
              <Badge className="bg-blue-50 text-blue-600">Courses</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">General Inquiries</p>
                <p className="text-3xl font-bold text-green-600">{getSubjectCount("General Inquiry")}</p>
              </div>
              <Badge className="bg-green-50 text-green-600">General</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Today's Messages</p>
                <p className="text-3xl font-bold text-purple-600">
                  {contacts.filter(c => {
                    const today = new Date();
                    const msgDate = new Date(c.createdAt);
                    return msgDate.toDateString() === today.toDateString();
                  }).length}
                </p>
              </div>
              <Badge className="bg-purple-50 text-purple-600">Today</Badge>
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
                  placeholder="Search messages by name, email, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {uniqueSubjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-college-dark">
            Messages ({filteredContacts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-college-green mx-auto"></div>
              <p className="mt-2 text-college-gray">Loading messages...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-college-dark">{contact.name}</p>
                        <p className="text-sm text-college-gray">{contact.email}</p>
                        <p className="text-sm text-college-gray">{contact.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSubjectBadge(contact.subject)}>
                        {contact.subject}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-college-gray line-clamp-2 max-w-xs">
                        {contact.message}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-college-gray">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-college-gray">
                        {new Date(contact.createdAt).toLocaleTimeString()}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedMessage(contact)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Message Details</DialogTitle>
                            </DialogHeader>
                            {selectedMessage && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-college-dark">Name</label>
                                    <p className="text-college-gray">{selectedMessage.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-college-dark">Email</label>
                                    <p className="text-college-gray">{selectedMessage.email}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-college-dark">Phone</label>
                                    <p className="text-college-gray">{selectedMessage.phone}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-college-dark">Subject</label>
                                    <Badge className={getSubjectBadge(selectedMessage.subject)}>
                                      {selectedMessage.subject}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-college-dark">Message</label>
                                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                                    <p className="text-college-gray whitespace-pre-wrap">{selectedMessage.message}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-college-dark">Received</label>
                                  <p className="text-college-gray">
                                    {new Date(selectedMessage.createdAt).toLocaleDateString()} at {new Date(selectedMessage.createdAt).toLocaleTimeString()}
                                  </p>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t">
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`, "_blank")}
                                    >
                                      <Mail className="h-4 w-4 mr-2" />
                                      Reply via Email
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => window.open(`tel:${selectedMessage.phone}`, "_blank")}
                                    >
                                      <Phone className="h-4 w-4 mr-2" />
                                      Call
                                    </Button>
                                  </div>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteMessage(selectedMessage)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Message
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`, "_blank")}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`tel:${contact.phone}`, "_blank")}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMessage(contact)}
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