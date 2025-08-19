import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  function validate() {
    if (!email) return "Please enter your email";
    // simple email regex
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return "Please enter a valid email";
    if (!password) return "Please enter your password";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage("");
    const v = validate();
    if (v) { setError(v); return; }
  
    try {
      setLoading(true);
  
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // if server sets auth cookie
        body: JSON.stringify({ email, password }),
      });
  
      let data: any = null;
      try {
        data = await res.json();
      } catch {
        const text = await res.text(); // server didn’t return JSON
        throw new Error(`Non-JSON response (${res.status}): ${text}`);
      }
  
      if (!res.ok || data?.success === false) {
        const msg = data?.message || `HTTP ${res.status}`;
        throw new Error(msg);
      }
  
      setMessage("Login successful ✅");
      // example: save token if backend returns it
      if (data.token) localStorage.setItem("token", data.token);
      // navigate to dashboard, etc.
      // window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden"
      >
        <div className="p-6 sm:p-8">
          <header className="mb-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center">
              {/* simple logo */}
              <svg className="h-7 w-7 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 12h18" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3v18" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Sign in to continue to your account</p>
          </header>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <label className="block">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Email</span>
                </div>
                <input
                  type="Email-address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  aria-label="Email"
                />
              </label>
              <label className="block">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Password</span>
                  <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot?</a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  aria-label="Password"
                />
              </label>
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>

                <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">Need help?</a>
              </div>

              {error && (
                <div role="alert" className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                aria-busy={loading}
              >
                {loading ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-20"></circle>
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-80"></path>
                  </svg>
                ) : null}
                <span>{loading ? "Signing in..." : "Sign in"}</span>
              </button>

              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center" aria-hidden>
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  {/* Google */}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M21 12.23c0-.72-.06-1.26-.19-1.81H12v3.42h5.48c-.1.9-.66 2.31-1.99 3.21l.02.13 2.9 2.24.2.02c1.86-1.71 2.95-4.23 2.95-7.21z" fill="#4285F4" />
                    <path d="M12 22c2.7 0 4.96-.9 6.62-2.44l-3.16-2.43c-.88.6-2.02.96-3.46.96-2.65 0-4.89-1.78-5.69-4.18l-.12.01-3.12 2.41-.04.12C4.99 19.97 8.17 22 12 22z" fill="#34A853" />
                    <path d="M6.31 13.91A7.98 7.98 0 016 12c0-.66.1-1.3.31-1.91L3.18 7.69A11.98 11.98 0 001 12c0 1.95.46 3.79 1.28 5.4l4.03-3.49z" fill="#FBBC05" />
                    <path d="M12 6.5c1.46 0 2.78.5 3.82 1.47l2.86-2.86C16.95 3.66 14.7 2.5 12 2.5 8.17 2.5 4.99 4.53 3.18 7.32l3.13 2.41C7.11 8.28 9.35 6.5 12 6.5z" fill="#EA4335" />
                  </svg>
                  Google
                </button>

                <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  {/* GitHub */}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.28 3.44 9.75 8.21 11.32.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.62-4.04-1.62-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1.01.11-.79.42-1.32.76-1.62-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.67 1.65.25 2.87.12 3.17.77.84 1.24 1.92 1.24 3.24 0 4.64-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58C20.56 22.25 24 17.78 24 12.5 24 5.87 18.63.5 12 .5z" />
                  </svg>
                  GitHub
                </button>
              </div>

              <p className="text-center text-sm text-gray-500">
                Don't have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign up</a>
              </p>
            </div>
          </form>
        </div>

        <footer className="border-t border-gray-100 px-6 py-4 text-xs text-gray-500 text-center">
          By continuing you agree to our <a className="text-indigo-600 hover:underline" href="#">Terms</a> and <a className="text-indigo-600 hover:underline" href="#">Privacy</a>.
        </footer>
      </motion.div>
    </div>
  );
}
