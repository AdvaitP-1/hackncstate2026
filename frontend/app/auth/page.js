"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthForm } from "./components/useAuthForm";

export default function AuthPage() {
  const {
    formMode,
    email,
    password,
    isSubmitting,
    errorMessage,
    isSignedIn,
    authenticatedUserName,
    handleFormModeChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useAuthForm();

  if (isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-200"
          >
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-semibold text-slate-900 mb-2"
          >
            Welcome back
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 text-lg"
          >
            Hello,{" "}
            <span className="text-orange-600 font-medium">
              {authenticatedUserName}
            </span>
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-100 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative"
      >
        {/* Card */}
        <motion.div
          layout
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-900/20 border border-white/50 overflow-hidden"
        >
          {/* Tab Switcher */}
          <div className="p-2 bg-slate-50/50">
            <div className="relative flex bg-slate-100 rounded-2xl p-1">
              <motion.div
                layoutId="activeTab"
                className="absolute inset-y-1 bg-white rounded-xl shadow-sm"
                style={{
                  width: "calc(50% - 4px)",
                  left: formMode === "signIn" ? "4px" : "calc(50%)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <button
                type="button"
                onClick={() => handleFormModeChange("signIn")}
                className={`flex-1 relative z-10 py-3 text-sm font-medium transition-colors duration-200 rounded-xl ${
                  formMode === "signIn"
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => handleFormModeChange("signUp")}
                className={`flex-1 relative z-10 py-3 text-sm font-medium transition-colors duration-200 rounded-xl ${
                  formMode === "signUp"
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={formMode}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                    {formMode === "signUp"
                      ? "Create your account"
                      : "Welcome back"}
                  </h1>
                  <p className="text-slate-500 text-sm">
                    {formMode === "signUp"
                      ? "Start your journey with us today"
                      : "Enter your credentials to continue"}
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="space-y-5"
                >
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="email"
                      className="text-slate-700 text-sm font-medium"
                    >
                      Email address
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full pl-12 h-14 bg-slate-100 border-slate-300 rounded-2xl text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-orange-400 focus:ring-orange-200 transition-all duration-200"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="password"
                      className="text-slate-700 text-sm font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) =>
                          handlePasswordChange(e.target.value)
                        }
                        placeholder="••••••••"
                        required
                        className="w-full pl-12 h-14 bg-slate-100 border-slate-300 rounded-2xl text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-orange-400 focus:ring-orange-200 transition-all duration-200"
                      />
                    </div>
                  </motion.div>

                  {formMode === "signIn" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-end"
                    >
                      <button
                        type="button"
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                      >
                        Forgot password?
                      </button>
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl"
                      >
                        {errorMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-2xl shadow-lg shadow-slate-900/30 hover:shadow-2xl hover:shadow-slate-900/40 transition-all duration-300 group"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <span className="flex items-center gap-2">
                          {formMode === "signUp"
                            ? "Create account"
                            : "Sign in"}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {formMode === "signUp" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-center text-xs text-slate-500"
                  >
                    By creating an account, you agree to our{" "}
                    <span className="text-orange-600 hover:underline cursor-pointer">
                      Terms
                    </span>{" "}
                    and{" "}
                    <span className="text-orange-600 hover:underline cursor-pointer">
                      Privacy Policy
                    </span>
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

