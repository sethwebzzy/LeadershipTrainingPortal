import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Mail, Phone, Search, Eye, Reply, Trash2, Send } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryFn, apiRequest } from "@/lib/queryClient";
import { Contact } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function AdminMessages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);
  const [replyText, setReplyText] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["/api/contacts"],
    queryFn: getQueryFn<Contact[]>({ on401: "throw" }),
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId: number) => {
      await apiRequest("DELETE", `/api/contacts/${messageId}`);
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

  const sendReplyMutation = useMutation({
    mutationFn: async ({ contactId, reply }: { contactId: number; reply: string }) => {
      await apiRequest("POST", `/api/contacts/${contactId}/reply`, { reply });
    },
    onSuccess: () => {
      toast({
        title: "Reply Sent",
        description: "Your reply has been sent successfully.",
      });
      setReplyText("");
      setSelectedMessage(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Filter contacts based on search term and subject
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === "all" || contact.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  // Get unique subjects for filter
  const uniqueSubjects = [...new Set(contacts.map(c => c.subject))];

  const handleDeleteMessage = (contact: Contact) => {
    if (window.confirm(`Are you sure you want to delete this message from ${contact.name}?`)) {
      deleteMessageMutation.mutate(contact.id);
    }
  };

  const handleSendReply = () => {
    if (selectedMessage && replyText.trim()) {
      sendReplyMutation.mutate({
        contactId: selectedMessage.id,
        reply: replyText,
      });
    }
  };

  const getSubjectBadge = (subject: string) => {
    const colors = {
      "course-inquiry": "bg-blue-50 text-blue-600",
      "service-inquiry": "bg-green-50 text-green-600",
      "admissions": "bg-purple-50 text-purple-600",
      "general": "bg-gray-50 text-gray-600",
    };
    return colors[subject as keyof typeof colors] || "bg-gray-50 text-gray-600";
  };

  const getSubjectLabel = (subject: string) => {
    const labels = {
      "course-inquiry": "Course Inquiry",
      "service-inquiry": "Service Inquiry",
      "admissions": "Admissions",
      "general": "General Information",
    };
    return labels[subject as keyof typeof labels] || subject;
  };

  const recentMessages = contacts.filter(contact => {
    const date = new Date(contact.createdAt);
    const now = new Date();
    return (now.getTime() - date.getTime()) < 24 * 60 * 60 * 1000; // Last 24 hours
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-college-dark">Messages & Communications</h2>
          <p className="text-college-gray">Manage contact form messages and communications</p>
        </div>
        <Button className="bg-college-green text-white hover:bg-green-600">
          <Send className="h-4 w-4 mr-2" />
          Send Bulk Message
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Total Messages</p>
                <p className="text-3xl font-bold text-college-dark">{contacts.length}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-college-green bg-green-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">New Today</p>
                <p className="text-3xl font-bold text-blue-600">{recentMessages}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600 bg-blue-50 p-1 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-college-gray">Course Inquiries</p>
                <p className="text-3xl font-bold text-purple-600">
                  {contacts.filter(c => c.subject === "course-inquiry").length}
                </p>
              </div>
              <Phone className="h-8 w-8 text-purple-600 bg-purple-50 p-1 rounded-full" />
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
                    <SelectItem key={subject} value={subject}>
                      {getSubjectLabel(subject)}
                    </SelectItem>
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
                  <TableHead>Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message Preview</TableHead>
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
                        {getSubjectLabel(contact.subject)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-college-gray line-clamp-2">
                        {contact.message.substring(0, 100)}...
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
                                    <label className="text-sm font-medium text-college-dark">Sender</label>
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
                                      {getSubjectLabel(selectedMessage.subject)}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-college-dark">Message</label>
                                  <p className="text-college-gray mt-2 p-4 bg-gray-50 rounded-lg">
                                    {selectedMessage.message}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-college-dark">Reply</label>
                                  <Textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Type your reply here..."
                                    className="mt-2"
                                    rows={4}
                                  />
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t">
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      onClick={() => window.open(`mailto:${selectedMessage.email}`, "_blank")}
                                    >
                                      <Mail className="h-4 w-4 mr-2" />
                                      Email
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
                                    onClick={handleSendReply}
                                    className="bg-college-green text-white hover:bg-green-600"
                                    disabled={!replyText.trim() || sendReplyMutation.isPending}
                                  >
                                    <Reply className="h-4 w-4 mr-2" />
                                    {sendReplyMutation.isPending ? "Sending..." : "Send Reply"}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`mailto:${contact.email}`, "_blank")}
                        >
                          <Reply className="h-4 w-4" />
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