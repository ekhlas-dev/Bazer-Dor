
"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);

      const result = await signOut();

      if (result.error) {
        toast.error(result.error.message || "Sign out failed!");
        return;
      }

      toast.success("Signed out successfully!");

      router.replace("/signin");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Please Sign In
          </h1>
          <p className="mt-2 text-gray-500">
            You need to sign in to view your profile.
          </p>
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-[70vh] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Your account information
        </p>

        <div className="mt-8 flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="mt-1 font-medium text-gray-900">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="mt-1 font-medium text-gray-900">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Verified</p>
            <p className="mt-1 font-medium text-gray-900">
              {user.emailVerified ? "Verified" : "Not verified"}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          disabled={loading}
          className="mt-8 w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing Out..." : "Sign Out"}
        </button>
      </div>
    </main>
  );
};

export default ProfilePage;
