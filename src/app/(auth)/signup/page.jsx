
"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Toaster, toast } from "react-hot-toast";

const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("সবগুলো তথ্য পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("Password কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    try {
      setLoading(true);

      const result = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (result.error) {
        toast.error(result.error.message || "Account তৈরি করা যায়নি।");
        return;
      }

      toast.success("Account created successfully!");

      const callbackURL = searchParams.get("callbackURL");

      const safeCallbackURL =
        callbackURL &&
        callbackURL.startsWith("/") &&
        !callbackURL.startsWith("//")
          ? callbackURL
          : "/";

      router.replace(safeCallbackURL);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Toaster position="top-center" />

      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          Join বাজার দর today
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              required
              minLength={8}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-700 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-emerald-700"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

const SignUpPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
};

export default SignUpPage;
