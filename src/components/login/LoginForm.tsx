"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import {
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

export const LoginForm = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const isDark = theme === "dark";

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
    };

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      await login({ email, password });
      // Remove the router.push - login function handles navigation now
    } catch (err) {
      const error = err as Error;
      console.error("Login error:", error.message);
      setError(error.message);
    }
  };

  const isFormValid = () => {
    return email.match(/\S+@\S+\.\S+/) && password.length > 0;
  };

  return (
    <>
      <AnimatePresence>
        {error && (
          <motion.div
            className={`rounded-md ${
              isDark ? "bg-red-900/30" : "bg-red-50"
            } p-4`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex">
              <div className="shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3
                  className={`text-sm font-medium ${
                    isDark ? "text-red-200" : "text-red-800"
                  }`}
                >
                  {error}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        className="mt-8 space-y-6"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="rounded-md shadow-sm p-4 space-y-3">
          <div className="relative">
            <div className="flex gap-2 items-center mb-3">
              <Mail
                className={`h-5 w-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <label htmlFor="email-address" className="text-sm">
                Email address
              </label>
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={`appearance-none rounded-none relative block w-full pl-10 px-3 py-3 border ${
                isDark
                  ? "border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                  : "border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
              } ${
                validationErrors.email ? "border-red-500" : ""
              } rounded-t-md focus:outline-none focus:z-10 transition-colors`}
              placeholder="Email address"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>
          <div className="relative">
            <div className="flex gap-2 items-center mb-3">
              <Lock
                className={`h-5 w-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidationErrors((prev) => ({ ...prev, password: "" }));
              }}
              className={`appearance-none rounded-none relative block w-full pl-10 px-3 py-3 border ${
                isDark
                  ? "border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
                  : "border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-[#0ea5e9] focus:border-[#0ea5e9]"
              } ${
                validationErrors.password ? "border-red-500" : ""
              } rounded-b-md focus:outline-none focus:z-10 transition-colors`}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-[70%] -translate-y-1/2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              } hover:text-gray-700 dark:hover:text-gray-300`}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {validationErrors.password && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.password}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <div className="text-sm">
            <Link
              href="/forgot-password"
              className={`font-medium ${
                isDark
                  ? "text-[#38bdf8] hover:text-[#7dd3fc]"
                  : "text-[#0284c7] hover:text-[#0ea5e9]"
              } transition-colors`}
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: isLoggingIn || !isFormValid() ? 1 : 1.02 }}
          whileTap={{ scale: isLoggingIn || !isFormValid() ? 1 : 0.98 }}
        >
          <button
            type="submit"
            disabled={isLoggingIn || !isFormValid()}
            className={`
              group relative w-full flex justify-center py-3 px-4 
              border border-transparent text-sm font-medium rounded-md 
              text-white bg-[#0284c7] hover:bg-[#0369a1]
              dark:bg-[#0ea5e9] dark:hover:bg-[#0284c7]
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-[#0ea5e9] dark:focus:ring-[#38bdf8] 
              transition-colors cursor-pointer
              ${
                isLoggingIn || !isFormValid()
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }
            `}
          >
            {isLoggingIn ? (
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
            ) : (
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-[#7dd3fc] group-hover:text-[#bae6fd]" />
              </span>
            )}
            {isLoggingIn ? "Signing in..." : "Sign in"}
          </button>
        </motion.div>
      </motion.form>
    </>
  );
};
