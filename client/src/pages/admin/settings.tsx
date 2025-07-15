import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Building, 
  CreditCard, 
  Bell, 
  Shield, 
  Save, 
  Database, 
  Users, 
  Mail,
  Phone,
  Clock,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const [collegeName, setCollegeName] = useState("Leadership JOYCEP Training College");
  const [collegeEmail, setCollegeEmail] = useState("info@joyceptraining.co.ke");
  const [collegePhone, setCollegePhone] = useState("+254 712 345 678");
  const [collegeAddress, setCollegeAddress] = useState("Kitengela, Kajiado County, Kenya");
  const [collegeDescription, setCollegeDescription] = useState("Premier health and wellness training college offering comprehensive programs in HIV counselling, ECDE, Kenya Sign Language, and psychological counselling.");
  
  const [mpesaPaybill, setMpesaPaybill] = useState("544069");
  const [mpesaAccount, setMpesaAccount] = useState("831298");
  const [bankName, setBankName] = useState("Equity Bank");
  const [accountNumber, setAccountNumber] = useState("0123456789");
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [newRegistrations, setNewRegistrations] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  
  const [backupEnabled, setBackupEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(true);
  
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Here you would normally save to backend
    toast({
      title: "Settings Saved",
      description: "All settings have been saved successfully.",
    });
  };

  const handleBackupDatabase = () => {
    toast({
      title: "Database Backup Started",
      description: "Database backup has been initiated. You'll receive a notification when complete.",
    });
  };

  const handleClearCache = () => {
    toast({
      title: "Cache Cleared",
      description: "System cache has been cleared successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-college-dark">System Settings</h2>
          <p className="text-college-gray">Manage college settings and system configuration</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-college-green text-white hover:bg-green-600">
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                College Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="collegeName">College Name</Label>
                  <Input
                    id="collegeName"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="College name"
                  />
                </div>
                <div>
                  <Label htmlFor="collegeEmail">Primary Email</Label>
                  <Input
                    id="collegeEmail"
                    type="email"
                    value={collegeEmail}
                    onChange={(e) => setCollegeEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <Label htmlFor="collegePhone">Phone Number</Label>
                  <Input
                    id="collegePhone"
                    value={collegePhone}
                    onChange={(e) => setCollegePhone(e.target.value)}
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="collegeAddress">Address</Label>
                  <Input
                    id="collegeAddress"
                    value={collegeAddress}
                    onChange={(e) => setCollegeAddress(e.target.value)}
                    placeholder="Physical address"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="collegeDescription">Description</Label>
                <Textarea
                  id="collegeDescription"
                  value={collegeDescription}
                  onChange={(e) => setCollegeDescription(e.target.value)}
                  placeholder="College description"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-college-green" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <p className="text-college-gray">{collegeEmail}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-college-green" />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <p className="text-college-gray">{collegePhone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                MPESA Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mpesaPaybill">MPESA Paybill Number</Label>
                  <Input
                    id="mpesaPaybill"
                    value={mpesaPaybill}
                    onChange={(e) => setMpesaPaybill(e.target.value)}
                    placeholder="Paybill number"
                  />
                </div>
                <div>
                  <Label htmlFor="mpesaAccount">Account Number</Label>
                  <Input
                    id="mpesaAccount"
                    value={mpesaAccount}
                    onChange={(e) => setMpesaAccount(e.target.value)}
                    placeholder="Account number"
                  />
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Current MPESA Settings</h4>
                <div className="space-y-1">
                  <p className="text-sm text-green-700">Paybill: <span className="font-mono">{mpesaPaybill}</span></p>
                  <p className="text-sm text-green-700">Account: <span className="font-mono">{mpesaAccount}</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bank Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Bank name"
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Account number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-college-gray">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
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
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newRegistrations">New Registration Alerts</Label>
                    <p className="text-sm text-college-gray">Get notified when new students register</p>
                  </div>
                  <Switch
                    id="newRegistrations"
                    checked={newRegistrations}
                    onCheckedChange={setNewRegistrations}
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
                    checked={paymentAlerts}
                    onCheckedChange={setPaymentAlerts}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="registrationOpen">Student Registration</Label>
                    <p className="text-sm text-college-gray">Allow new student registrations</p>
                  </div>
                  <Switch
                    id="registrationOpen"
                    checked={registrationOpen}
                    onCheckedChange={setRegistrationOpen}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-college-gray">Enable maintenance mode for system updates</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm font-medium">Database Status</span>
                  </div>
                  <Badge className="bg-green-50 text-green-600">Connected</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm font-medium">System Status</span>
                  </div>
                  <Badge className="bg-green-50 text-green-600">Online</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Database Backup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="backupEnabled">Automatic Backup</Label>
                  <p className="text-sm text-college-gray">Enable automatic daily backups</p>
                </div>
                <Switch
                  id="backupEnabled"
                  checked={backupEnabled}
                  onCheckedChange={setBackupEnabled}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Manual Backup</h4>
                    <p className="text-sm text-college-gray">Create an immediate backup of the database</p>
                  </div>
                  <Button onClick={handleBackupDatabase} variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Backup Now
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Clear Cache</h4>
                    <p className="text-sm text-college-gray">Clear system cache and temporary files</p>
                  </div>
                  <Button onClick={handleClearCache} variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backup History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Daily Backup - Today</p>
                    <p className="text-sm text-college-gray">Completed at 2:00 AM</p>
                  </div>
                  <Badge className="bg-green-50 text-green-600">Success</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Daily Backup - Yesterday</p>
                    <p className="text-sm text-college-gray">Completed at 2:00 AM</p>
                  </div>
                  <Badge className="bg-green-50 text-green-600">Success</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Manual Backup</p>
                    <p className="text-sm text-college-gray">Created 3 days ago</p>
                  </div>
                  <Badge className="bg-green-50 text-green-600">Success</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}