import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Settings, User, Lock, Bell, Database, Mail, Phone, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const profileSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Valid email is required"),
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const collegeInfoSchema = z.object({
  collegeName: z.string().min(1, "College name is required"),
  email: z.string().email("Valid email is required"),
  phone1: z.string().min(1, "Phone number is required"),
  phone2: z.string().optional(),
  phone3: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  description: z.string().min(1, "Description is required"),
  paybillNumber: z.string().min(1, "Paybill number is required"),
  accountNumber: z.string().min(1, "Account number is required"),
});

export default function AdminSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newStudentAlerts: true,
    paymentAlerts: true,
    systemUpdates: false,
  });

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || "",
      email: "admin@leadershipjoycep.com",
      fullName: "Joyce Administrator",
      phone: "0727708240",
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const collegeForm = useForm({
    resolver: zodResolver(collegeInfoSchema),
    defaultValues: {
      collegeName: "Leadership JOYCEP Training College",
      email: "leadershipjoycepcentre@gmail.com",
      phone1: "0727708240",
      phone2: "0732522089",
      phone3: "0117403514",
      address: "Kitengela, Kenya",
      description: "Leading health and wellness education institution in Kitengela, Kenya",
      paybillNumber: "544069",
      accountNumber: "831298",
    },
  });

  const handleProfileUpdate = (data: any) => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handlePasswordChange = (data: any) => {
    toast({
      title: "Password Changed",
      description: "Your password has been successfully changed.",
    });
    passwordForm.reset();
  };

  const handleCollegeInfoUpdate = (data: any) => {
    toast({
      title: "College Information Updated",
      description: "College information has been successfully updated.",
    });
  };

  const handleNotificationToggle = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Notification Settings Updated",
      description: `${key} ${value ? "enabled" : "disabled"}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-college-dark">Settings</h2>
          <p className="text-college-gray">Manage system settings and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-college-dark">Settings Menu</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Building className="h-4 w-4 mr-2" />
                College Information
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Database className="h-4 w-4 mr-2" />
                System Settings
              </Button>
            </nav>
          </CardContent>
        </Card>

        {/* Main Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-college-dark flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="bg-college-green text-white hover:bg-green-600">
                    Update Profile
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Password Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-college-dark flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="bg-college-green text-white hover:bg-green-600">
                    Change Password
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-college-dark flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-college-gray">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationToggle("emailNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-college-gray">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => handleNotificationToggle("smsNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newStudentAlerts">New Student Alerts</Label>
                    <p className="text-sm text-college-gray">Get notified when new students register</p>
                  </div>
                  <Switch
                    id="newStudentAlerts"
                    checked={notifications.newStudentAlerts}
                    onCheckedChange={(checked) => handleNotificationToggle("newStudentAlerts", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paymentAlerts">Payment Alerts</Label>
                    <p className="text-sm text-college-gray">Get notified about payment confirmations</p>
                  </div>
                  <Switch
                    id="paymentAlerts"
                    checked={notifications.paymentAlerts}
                    onCheckedChange={(checked) => handleNotificationToggle("paymentAlerts", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemUpdates">System Updates</Label>
                    <p className="text-sm text-college-gray">Get notified about system updates and maintenance</p>
                  </div>
                  <Switch
                    id="systemUpdates"
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => handleNotificationToggle("systemUpdates", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* College Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-college-dark flex items-center">
                <Building className="h-5 w-5 mr-2" />
                College Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...collegeForm}>
                <form onSubmit={collegeForm.handleSubmit(handleCollegeInfoUpdate)} className="space-y-4">
                  <FormField
                    control={collegeForm.control}
                    name="collegeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={collegeForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={collegeForm.control}
                      name="phone1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={collegeForm.control}
                      name="phone2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secondary Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={collegeForm.control}
                      name="phone3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Third Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={collegeForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={collegeForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={collegeForm.control}
                      name="paybillNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MPESA Paybill Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={collegeForm.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="bg-college-green text-white hover:bg-green-600">
                    Update College Information
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}