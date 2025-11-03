"use client";

import { PartyPopperIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ResponsePage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status"); // "confirmed" or "declined"

  const isConfirmed = status === "confirmed";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 p-6 text-center gap-4">
      {/* Icon */}
      <Image
        src={"/images/andrey-sit.png"}
        alt="andrey-sitting"
        width={600}
        height={600}
        className="object-center object-cover rounded-full aspect-square w-[400px] h-[400px]"
      />

      {/* Title */}
      <h1
        className={`text-3xl font-semibold mb-2 ${
          isConfirmed ? "text-[#3e5e76]" : "text-red-600"
        }`}
      >
        {isConfirmed
          ? "RSVP Submitted Successfully!"
          : "RSVP Response Recorded"}
      </h1>

      {/* Message */}
      <p
        className={`max-w-md mb-6 ${
          isConfirmed ? "text-[#3e5e76]" : "text-red-600"
        }`}
      >
        {isConfirmed ? (
          <>
            Thank you for confirming your attendance 💖 We’re so happy to
            celebrate this special day with you and your family.
          </>
        ) : (
          <>
            We’re sorry you can’t make it 💔 Thank you for letting us know —
            we’ll miss celebrating with you, but you’ll be in our hearts.
          </>
        )}
      </p>

      {/* Divider */}
      <div
        className={`flex items-center gap-2 mb-6 ${
          isConfirmed ? "text-[#3e5e76]" : "text-red-600"
        }`}
      >
        {isConfirmed ? (
          <>
            <PartyPopperIcon className="w-5 h-5" />
            <span className="text-sm">See you on Baptism Day!</span>
            <PartyPopperIcon className="w-5 h-5" />
          </>
        ) : (
          <>
            <XCircleIcon className="w-5 h-5" />
            <span className="text-sm">Maybe next time 💖</span>
            <XCircleIcon className="w-5 h-5" />
          </>
        )}
      </div>

      {/* Back Home Button */}
      <Link href="/">
        <Button
          className={`rounded-full px-6 py-2 text-white ${
            isConfirmed
              ? "bg-[#3e5e76] hover:bg-[#3e6375]"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Back to Home
        </Button>
      </Link>

      {/* Footer Note */}
      <p className="text-xs text-[#3e5e76] mt-6">
        💧 “Every good and perfect gift is from above.” – James 1:17
      </p>
    </div>
  );
}
