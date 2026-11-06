
"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Toaster, toast } from "react-hot-toast";
import { Github } from "lucide-react";

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const callbackURL = searchParams.get("callbackURL");

  const safeCallbackURL =
    callbackURL &&
    callbackURL.startsWith("/") &&
    !callbackURL.startsWith("//")
      ? callbackURL
      : "/";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Email এবং Password দিতে হবে।");
      return;
    }

    try {
      setLoading(true);

      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error.message || "Login করা যায়নি।");
        return;
      }

      toast.success("Login successful!");

      router.replace(safeCallbackURL);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      setSocialLoading(provider);

      const result = await signIn.social({
        provider,
        callbackURL: safeCallbackURL,
      });

      if (result?.error) {
        toast.error(result.error.message || "Social login failed!");
        setSocialLoading("");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
      setSocialLoading("");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Toaster position="top-center" />

      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Sign In
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          Welcome back to বাজার দর
        </p>

        {/* Social Login */}
        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={loading || !!socialLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
          >
            <span className="text-xl font-bold text-blue-600">G</span>
            {socialLoading === "google"
              ? "Connecting to Google..."
              : "Continue with Google"}
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            disabled={loading || !!socialLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
          >
            <span className="text-lg font-bold">GH</span>
            {socialLoading === "github"
              ? "Connecting to GitHub..."
              : "Continue with GitHub"}
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">OR CONTINUE WITH EMAIL</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Email Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full rounded-lg bg-emerald-700 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-semibold text-emerald-700">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
};

const SignInPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
};

export default SignInPage;
