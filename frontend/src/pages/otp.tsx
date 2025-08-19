import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtpPage() {
    const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { userId } = location.state || {};

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/api/auth/verify-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "OTP verification failed");
      }

      alert("✅ Account verified successfully!");
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Try again.");
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
              <svg
                className="h-7 w-7 text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                  stroke="currentColor"
                  strokeWidth={1.5}
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
              Verify your account
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Enter the 6-digit OTP we sent to your email
            </p>
          </header>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">OTP</span>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  required
                  maxLength={6}
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-center tracking-widest text-lg font-mono shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                />
              </label>

              {error && (
                <div
                  role="alert"
                  className="text-sm text-red-600 bg-red-50 p-2 rounded"
                >
                  {error}
                </div>
              )}
              {success && (
                <div
                  role="status"
                  className="text-sm text-green-600 bg-green-50 p-2 rounded"
                >
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                aria-busy={loading}
              >
                {loading ? (
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="opacity-20"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="opacity-80"
                    />
                  </svg>
                ) : null}
                <span>{loading ? "Verifying..." : "Verify"}</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
