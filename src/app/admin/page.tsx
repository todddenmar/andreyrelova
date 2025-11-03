"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import AdminUsersList from "@/components/admin/users/AdminUsersList";
import { toast } from "sonner";

function AdminPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const link = `${window.location.origin}/invitation`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Invitation link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

        <Button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon className="w-4 h-4" />
              Copy Invitation Link
            </>
          )}
        </Button>
      </div>

      <AdminUsersList />
    </div>
  );
}

export default AdminPage;
