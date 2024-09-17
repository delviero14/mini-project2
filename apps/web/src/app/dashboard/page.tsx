"use client"

import Dashboard from "@/components/Dashboard";
import Wrapper from "@/components/wrapper";
import { Suspense } from "react";

export default function DashboardPage() {
  // Now you can use useState or other client-side hooks
  return (
    <Wrapper>
      <Suspense>
        <Dashboard />
      </Suspense>
    </Wrapper>
  );
}