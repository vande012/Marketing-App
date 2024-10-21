"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  industry: string;
  websiteDomain: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/');
    } else if (session?.user) {
      fetchProfileData();
    }
  }, [session, status, router]);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else if (response.status === 404) {
        // Profile not found, redirect to create profile
        router.push('/profile/edit');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
    setIsLoading(false);
  };

  if (status === "loading" || isLoading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>No profile data available.</p>
        <Link href="/profile/edit">
          <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Create Profile
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">First Name:</p>
          <p>{profileData.firstName}</p>
        </div>
        <div>
          <p className="font-semibold">Last Name:</p>
          <p>{profileData.lastName}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{profileData.email}</p>
        </div>
        <div>
          <p className="font-semibold">Business Name:</p>
          <p>{profileData.businessName}</p>
        </div>
        <div>
          <p className="font-semibold">Industry:</p>
          <p>{profileData.industry}</p>
        </div>
        <div>
          <p className="font-semibold">Website Domain:</p>
          <p>{profileData.websiteDomain}</p>
        </div>
      </div>
      <Link href="/profile/edit">
        <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit Profile
        </button>
      </Link>
    </div>
  );
}
