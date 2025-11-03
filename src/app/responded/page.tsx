"use client";

import { BabyIcon, PartyPopperIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 p-6 text-center">
      {/* Icon */}
      <div className="p-4 bg-blue-200 text-blue-700 rounded-full shadow-sm mb-4 animate-bounce">
        <BabyIcon className="w-10 h-10" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-blue-800 mb-2">
        RSVP Submitted Successfully!
      </h1>

      {/* Message */}
      <p className="text-blue-700 max-w-md mb-6">
        Thank you for confirming your attendance 💖 We’re so happy to celebrate
        this special day with you and your family.
      </p>

      {/* Cute Divider */}
      <div className="flex items-center gap-2 text-blue-500 mb-6">
        <PartyPopperIcon className="w-5 h-5" />
        <span className="text-sm">See you on Baptism Day!</span>
        <PartyPopperIcon className="w-5 h-5" />
      </div>

      {/* Back Home Button */}
      <Link href="/">
        <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2">
          Back to Home
        </Button>
      </Link>

      {/* Footer Note */}
      <p className="text-xs text-blue-600 mt-6">
        💧 “Every good and perfect gift is from above.” – James 1:17
      </p>
    </div>
  );
}
