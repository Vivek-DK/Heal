import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import DoctorSidebar from "@/components/doctor/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const DoctorSettings = () => {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  if (!user || user.role !== "doctor") {
    return <Navigate to="/doctor/login" replace />;
  }

  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "(555) 123-4567",
    specialization: "Family Medicine",
    qualifications: "MD, Family Medicine, Board Certified",
    bio: "I am a board-certified family physician with over 10 years of experience in providing comprehensive healthcare to patients of all ages.",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    marketingEmails: false,
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key, checked) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: checked }));
  };

  const handleSavePersonalInfo = () => {
    setLoading(true);
    setTimeout(() => {
      updateUserProfile({ name: personalInfo.name });
      setLoading(false);
      toast.success("Profile information saved successfully");
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Notification settings saved successfully");
    }, 1000);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    updateUserProfile({ avatar: imageUrl });
    toast.success("Profile photo updated");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DoctorSidebar />

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <Avatar className="h-32 w-32">
                        {user?.avatar ? (
                          <AvatarImage src={user.avatar} alt={user.name} />
                        ) : (
                          <AvatarFallback className="bg-primary text-white text-2xl">
                            {user ? getInitials(user.name) : "?"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoChange}
                      />
                      <Button variant="outline" className="mt-4" onClick={handlePhotoClick}>
                        Change Photo
                      </Button>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={personalInfo.name}
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            value={personalInfo.email}
                            onChange={handlePersonalInfoChange}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Input
                            id="specialization"
                            name="specialization"
                            value={personalInfo.specialization}
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="qualifications">Qualifications</Label>
                        <Input
                          id="qualifications"
                          name="qualifications"
                          value={personalInfo.qualifications}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Professional Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={personalInfo.bio}
                          onChange={handlePersonalInfoChange}
                          className="min-h-[100px]"
                        />
                      </div>

                      <Button onClick={handleSavePersonalInfo} disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("emailNotifications", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium">SMS Notifications</h3>
                        <p className="text-sm text-gray-500">Receive notifications via text message</p>
                      </div>
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("smsNotifications", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium">Appointment Reminders</h3>
                        <p className="text-sm text-gray-500">Receive reminders about upcoming appointments</p>
                      </div>
                      <Switch
                        checked={notificationSettings.appointmentReminders}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("appointmentReminders", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium">Marketing Emails</h3>
                        <p className="text-sm text-gray-500">Receive emails about new features and services</p>
                      </div>
                      <Switch
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("marketingEmails", checked)
                        }
                      />
                    </div>

                    <Button onClick={handleSaveNotifications} disabled={loading}>
                      {loading ? "Saving..." : "Save Preferences"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-md font-medium">Change Password</h3>
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      <Button className="mt-2" variant="outline">Change Password</Button>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="text-md font-medium text-red-600">Danger Zone</h3>
                      <p className="text-sm text-gray-500 mt-1 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default DoctorSettings;
