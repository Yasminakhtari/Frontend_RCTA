import React, { useState } from 'react';
import { ActionIcon, Overlay, Avatar } from '@mantine/core';
import { IconEdit, IconLoader } from '@tabler/icons-react';
import { errorNotification, successNotification } from '../../Services/NotificationService';

interface ProfileImageUploadProps {
  currentImage: string;
  onUploadSuccess: (url: string) => Promise<void>;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ currentImage, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      errorNotification("Error", "File size should be less than 5MB");
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      errorNotification("Error", "Only JPEG, PNG, and GIF images are allowed");
      return;
    }

    try {
      setUploading(true);
      
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'tennis');
      formData.append('cloud_name', 'dqboora0r');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dqboora0r/image/upload`,
        { method: 'POST', body: formData }
      );

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();

      await onUploadSuccess(data.secure_url);
      successNotification("Success", "Profile image updated!");
    } catch (error) {
      errorNotification("Error", "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <label 
      className="relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={uploading}
      />

      <Avatar
        className="rounded-full !h-24 !w-24 md:!h-48 md:!w-48 mb-10 border-mine-shaft-950 border-8"
        src={currentImage}
        alt="Profile"
      />
      
      {hovered && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full">
          <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75} />
          <ActionIcon
            size="xl"
            variant="transparent"
            className="!w-16 !h-16 text-white z-10"
            loading={uploading}
          >
            {uploading ? (
              <IconLoader className="animate-spin" />
            ) : (
              <IconEdit className="!w-12 !h-12" />
            )}
          </ActionIcon>
        </div>
      )}
    </label>
  );
};

export default ProfileImageUpload;