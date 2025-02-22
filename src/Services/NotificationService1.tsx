import axios from "axios";

import { base_url } from "../apiConfig";

// Save Notification
export const saveNotification = async (sessionId: number, fromDate: string, toDate: string) => {
    const response = await axios.post(`${base_url}/notification`, null, {
        params: { sessionId, fromDate, toDate }
    });
    return response.data;
};

// Get notifications for a specific user
export const getNotificationsForUser = async (userId: number) => {
    const response = await axios.get(`${base_url}/notification/user`, {
        params: { userId }
    });
    return response.data;
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: number, userId: number) => {
    await axios.put(`${base_url}/notification/update`, null, {
        params: { notificationId, userId }
    });
};
