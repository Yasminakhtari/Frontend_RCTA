import axios from "axios";

import { base_url } from "../apiConfig";
import { NotificationType } from "./types";


export const saveNotification = async (
    sessionId: number | null, 
    userId: number | null, 
    message: string, 
    fromDate: string, 
    toDate: string
  ) => {
      try {
        const payload: Record<string, any> = { message, fromDate, toDate };

        if (sessionId !== null) payload.sessionId = sessionId;
        if (userId !== null) payload.userId = userId;

        const response = await axios.post(`${base_url}/notifications`, payload, {
            headers: { "Content-Type": "application/json" },
        });

        return response.data;
    } catch (error) {
        console.error("Error saving notification:", error);
        throw error;
    }
  };
  

// Save Notification
// export const saveNotification = async (sessionId: number | null,message: string, fromDate: string, toDate: string) => {
//     const response = await axios.post(`${base_url}/notifications`, null, {
//         params: { sessionId,message,fromDate, toDate }
//     });
//     return response.data;
// };

// Get notifications for a specific user
export const getNotificationsForUser = async (userId: number) => {
    const response = await axios.get(`${base_url}/notifications/user`, {
        params: { userId }
    });
    // return response.data;
    return response.data?.data as NotificationType[];
};

// Mark notification as read
// export const markNotificationAsRead = async (notificationId: number, userId: number) => {
//     await axios.put(`${base_url}/notification/update`, null, {
//         params: { notificationId, userId }
//     });
// };
export const markNotificationAsRead = async (notificationId: number, userId: number) => {
    await axios.put(`${base_url}/notifications/${notificationId}/read`, null, {
        params: { userId }
    });
};