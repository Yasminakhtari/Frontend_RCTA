export interface NotificationType {
    notificationId: number;
    message: string;
    status: string;
    createdOn: string;
    sessionId:number;
    users: NotificationUser[];
}

export interface NotificationUser {
    id: number;
    userId: number;
    status: 'unread' | 'read';
    createdOn: string;
}