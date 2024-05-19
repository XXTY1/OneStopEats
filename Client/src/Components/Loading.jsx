import React from "react";
import { useLoading } from "../hooks/useLoading";

export default function Loading() {
  const { isLoading } = useLoading();
  if (!isLoading) return;

  return (
    <div className="container mx-auto px-4">
      <div className="flex h-screen items-center justify-center">
        <h1 className="animate-pulse text-xl font-bold">Loading...</h1>
      </div>
    </div>
  );
}
