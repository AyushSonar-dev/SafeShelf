"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Eye, EyeOff } from "lucide-react";
import {
  updateNotificationPreferences,
  getNotificationPreferences,
  changePassword,
  getCurrentUserEmail,
} from "@/lib/actions/settings.actions";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    expiry: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [email, setEmail] = useState<string | null>(null);

  // Load preferences and email on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const preferencesResult = await getNotificationPreferences();
        if (preferencesResult.success && preferencesResult.data) {
          setNotifications(preferencesResult.data);
        }

        const emailResult = await getCurrentUserEmail();
        if (emailResult.success && emailResult.email) {
          setEmail(emailResult.email);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleNotificationChange = async (
    key: "email" | "expiry",
    checked: boolean
  ) => {
    const updatedNotifications = { ...notifications, [key]: checked };
    setNotifications(updatedNotifications);

    // Save to server
    setIsSaving(true);
    try {
      const result = await updateNotificationPreferences(updatedNotifications);
      if (result.success) {
        toast.success("Preferences updated successfully");
      } else {
        toast.error(result.message || "Failed to update preferences");
        // Revert the change if save failed
        setNotifications(notifications);
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save preferences");
      // Revert the change if save failed
      setNotifications(notifications);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-foreground">Loading settings...</div>;
  }

  const handleChangePassword = async () => {
    // Validation
    if (!passwordForm.oldPassword) {
      toast.error("Please enter your current password");
      return;
    }

    if (!passwordForm.newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsChangingPassword(true);
    try {
      const result = await changePassword(
        passwordForm.oldPassword,
        passwordForm.newPassword
      );
      if (result.success) {
        toast.success(result.message);
        setIsPasswordDialogOpen(false);
        setPasswordForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div>
      <div className="space-y-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>

        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Profile</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email || ""}
                disabled
                className="bg-muted text-muted-foreground"
              />
            </div>

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsPasswordDialogOpen(true)}
            >
              Change Password
            </Button>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100/50 rounded-lg">
              <Bell className="h-6 w-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Notifications
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">
                  Email Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  handleNotificationChange("email", checked)
                }
                disabled={isSaving}
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">Expiry Reminders</p>
                <p className="text-sm text-muted-foreground">
                  Get notified before warranties expire
                </p>
              </div>
              <Switch
                checked={notifications.expiry}
                onCheckedChange={(checked) =>
                  handleNotificationChange("expiry", checked)
                }
                disabled={isSaving}
              />
            </div>
          </div>
        </Card>
      </div>

      <AlertDialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
      >
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Change Password</AlertDialogTitle>
            <AlertDialogDescription>
              Enter your current password and your new password to change it.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="oldPassword" className="text-foreground">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type={showPasswords.oldPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={passwordForm.oldPassword}
                  onChange={handlePasswordFormChange}
                  disabled={isChangingPassword}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("oldPassword")}
                  disabled={isChangingPassword}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  {showPasswords.oldPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-foreground">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showPasswords.newPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordFormChange}
                  disabled={isChangingPassword}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  disabled={isChangingPassword}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  {showPasswords.newPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordFormChange}
                  disabled={isChangingPassword}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  disabled={isChangingPassword}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  {showPasswords.confirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <AlertDialogCancel disabled={isChangingPassword}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleChangePassword}
              disabled={isChangingPassword}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isChangingPassword ? "Changing..." : "Change Password"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
