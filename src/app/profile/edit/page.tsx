"use client";

import ProfileForm from "@/components/ProfileForm";

export default function EditProfilePage() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Your Profile</h1>
      <ProfileForm />
    </div>
  );
}
