import React from "react";

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
}

export default function LoadingScreen({
  message = "Loading your project...",
  subMessage = "Please wait while we fetch your content",
}: LoadingScreenProps) {
  return (
    <div className="flex items-center justify-center h-full min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{message}</h2>
        <p className="text-gray-500">{subMessage}</p>
      </div>
    </div>
  );
}
