"use server"

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import dbConnect from "@/database/mongoose";
import { ObjectId } from "mongodb";

export const getCurrentUserEmail = async () => {
  try {
    // Get the current user session
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return { success: false, email: null, message: "User not authenticated" };
    }

    return {
      success: true,
      email: session.user.email,
      message: "Email retrieved successfully",
    };
  } catch (error) {
    console.error("Error retrieving user email:", error);
    return { success: false, email: null, message: "Failed to retrieve email" };
  }
};

export const updateNotificationPreferences = async (preferences: {
  email: boolean;
  expiry: boolean;
}) => {
  try {
    // Get the current user session
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return { success: false, message: "User not authenticated" };
    }

    // Connect to database
    const mongoose = await dbConnect();
    const db = mongoose.connection.db;
    
    if (!db) {
      return { success: false, message: "Database connection failed" };
    }

    // Update user preferences in the users collection
    const result = await db.collection("user").updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          notificationPreferences: {
            emailNotifications: preferences.email,
            expiryReminders: preferences.expiry,
            updatedAt: new Date(),
          },
        },
      }
    );

    if (result.matchedCount === 0) {
      return { success: false, message: "User not found" };
    }

    return { success: true, message: "Preferences updated successfully" };
  } catch (error) {
    console.error("Error updating preferences:", error);
    return { success: false, message: "Failed to update preferences" };
  }
};

export const getNotificationPreferences = async () => {
  try {
    // Get the current user session
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return { success: false, data: null, message: "User not authenticated" };
    }

    // Connect to database
    const mongoose = await dbConnect();
    const db = mongoose.connection.db;
    
    if (!db) {
      return { success: false, data: null, message: "Database connection failed" };
    }

    // Get user preferences
    const user = await db.collection("user").findOne({ _id: new ObjectId(session.user.id) });

    if (!user) {
      return { success: false, data: null, message: "User not found" };
    }

    const preferences = user.notificationPreferences || {
      emailNotifications: true,
      expiryReminders: true,
    };

    return {
      success: true,
      data: {
        email: preferences.emailNotifications,
        expiry: preferences.expiryReminders,
      },
      message: "Preferences retrieved successfully",
    };
  } catch (error) {
    console.error("Error retrieving preferences:", error);
    return { success: false, data: null, message: "Failed to retrieve preferences" };
  }
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  try {
    // Get the current user session
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return { success: false, message: "User not authenticated" };
    }

    // Validate input
    if (!oldPassword || !newPassword) {
      return { success: false, message: "Old password and new password are required" };
    }

    if (newPassword.length < 8) {
      return { success: false, message: "New password must be at least 8 characters long" };
    }

    if (oldPassword === newPassword) {
      return { success: false, message: "New password must be different from old password" };
    }

    // Call better-auth change password endpoint
    const response = await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword: oldPassword,
        newPassword,
      },
    });

    if (response) {
      return { success: true, message: "Password changed successfully" };
    } else {
      return { success: false, message: "Failed to change password" };
    }
  } catch (error) {
    console.error("Error changing password:", error);
    if (error instanceof Error) {
      if (error.message.includes("invalid") || error.message.includes("incorrect")) {
        return { success: false, message: "Current password is incorrect" };
      }
      return { success: false, message: error.message };
    }
    return { success: false, message: "Failed to change password" };
  }
};
