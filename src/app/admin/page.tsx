"use client";

import React, { ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon, UsersIcon, Users2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { DB_COLLECTION } from "@/lib/config";
import { db } from "@/firebase";
import { TGuest } from "@/typings";
import { GuestsTable } from "@/components/admin/responses/GuestsTable";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppStore } from "@/lib/store";
import LoadingCard from "@/components/custom-ui/LoadingCard";
function AdminPage() {
  const { userData } = useAppStore();

  const [copied, setCopied] = useState(false);
  const [guests, setGuests] = useState<TGuest[]>([]);
  console.log({ userData });
  const isAdmin = userData?.email
    ? process.env.NEXT_PUBLIC_ADMIN_EMAIL!.includes(userData?.email)
    : false;
  const totalAdultCompanions = guests.reduce(
    (prev, item) => prev + (item.companions || 0),
    0
  );
  const totalKidCompanions = guests.reduce(
    (prev, item) => prev + (item.kidCompanions || 0),
    0
  );
  const totalResponses = guests.length;
  const confirmedGuests = guests.filter((item) => item.status === "confirmed");
  const declinedGuests = guests.filter((item) => item.status === "declined");

  useEffect(() => {
    const ref = collection(db, DB_COLLECTION.GUESTS);
    const q = query(ref, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const results: TGuest[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as TGuest)
      );
      setGuests(results);
    });

    return () => unsubscribe();
  }, []);

  const handleCopy = async () => {
    const link = `${window.location.origin}/invitation`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Invitation link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isAdmin) {
    return (
      <LoadingCard
        title="Loading..."
        description="Trying to access the admin page."
        linkText="Go back to homepage"
        redirectionLink="/"
      />
    );
  }
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

        <Button
          onClick={handleCopy}
          className="cursor-pointer"
          type="button"
          variant={"secondary"}
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
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center gap-4">
          <OverviewCard
            title="Responses"
            icon={<UsersIcon className="text-muted-foreground" />}
            content={
              <div className="flex justify-between items-center gap-4 font-semibold">
                <div>Total: {totalResponses}</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-green-500">
                    Confirmed: {confirmedGuests.length}
                  </div>
                  <div className="text-red-500">
                    Declined: {declinedGuests.length}
                  </div>
                </div>
              </div>
            }
          />
          <OverviewCard
            title="Total Expected Guests"
            icon={<Users2Icon className="text-muted-foreground" />}
            content={
              totalAdultCompanions + totalKidCompanions + confirmedGuests.length
            }
          />
          <OverviewCard
            title="Companions"
            icon={<Users2Icon className="text-muted-foreground" />}
            content={
              <div className="flex justify-between items-center gap-4 font-semibold">
                <div>Total: {totalAdultCompanions + totalKidCompanions}</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-blue-500">
                    Adults: {totalAdultCompanions}
                  </div>
                  <div className="text-red-500">Kids: {totalKidCompanions}</div>
                </div>
              </div>
            }
          />
        </div>
        <GuestsTable guests={guests} />
      </div>
    </div>
  );
}
type OverviewCardProps = {
  title: string;
  icon: ReactNode;
  content: ReactNode;
};
function OverviewCard({ title, icon, content }: OverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>{icon}</CardAction>
      </CardHeader>
      <CardContent>
        <div>{content}</div>
      </CardContent>
    </Card>
  );
}
export default AdminPage;
