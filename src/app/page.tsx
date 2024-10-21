'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>
      {status === 'authenticated' ? (
        <Link href="/profile">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Go to Profile
          </button>
        </Link>
      ) : (
        <Link href="/auth/signin">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign In / Sign Up
          </button>
        </Link>
      )}
    </div>
  );
}
