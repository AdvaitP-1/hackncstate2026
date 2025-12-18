"use client";

import { useState } from "react";
import { registerUser, signInUser } from "../../../lib/authApi";

export function useAuthForm() {
  const [formMode, setFormMode] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authenticatedUserName, setAuthenticatedUserName] = useState("");

  const isSignedIn = Boolean(authenticatedUserName);

  function handleFormModeChange(nextMode) {
    setFormMode(nextMode);
    setErrorMessage("");
  }

  function handleEmailChange(nextEmail) {
    setEmail(nextEmail);
  }

  function handlePasswordChange(nextPassword) {
    setPassword(nextPassword);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const credentials = { email, password };

      const response =
        formMode === "signUp"
          ? await registerUser(credentials)
          : await signInUser(credentials);

      const baseName = response.email ?? email;
      const displayName = baseName.split("@")[0];
      setAuthenticatedUserName(displayName);
    } catch (error) {
      setErrorMessage(error.message ?? "Unable to complete request");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
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
  };
}
