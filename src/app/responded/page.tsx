"use client";

import { Suspense } from "react";
import { PartyPopperIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function ResponseContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status"); // "confirmed" or "declined"
  const isConfirmed = status === "confirmed";

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-pink-50 p-6 text-center gap-4 ">
      {/* Icon */}
      <div className="w-full relative mx-auto flex justify-center">
        <Image
          src={
            isConfirmed
              ? "/images/happy-portrait.png"
              : "/images/sad-portrait.png"
          }
          alt="response image"
          width={600}
          height={600}
          className="object-center object-cover rounded-lg w-full h-full max-w-sm"
        />
      </div>

      {/* Title */}
      <h1
        className={`text-3xl font-semibold mb-2 ${
          isConfirmed ? "text-[#2d6fca]" : "text-red-600"
        }`}
      >
        {isConfirmed
          ? "RSVP Submitted Successfully!"
          : "RSVP Response Recorded"}
      </h1>

      {/* Message */}
      <p
        className={`max-w-md mb-6 ${
          isConfirmed ? "text-[#2d6fca]" : "text-red-600"
        }`}
      >
        {isConfirmed ? (
          <>
            Thank you for confirming your attendance 💖 We&apos;re so happy to
            celebrate this special day with you.
          </>
        ) : (
          <>
            We&apos;re sorry you can&apos;t make it 💔 Thank you for letting us
            know — we&apos;ll miss celebrating with you, but you&apos;ll be in
            our hearts.
          </>
        )}
      </p>

      {/* Divider */}
      <div
        className={`flex items-center gap-2 mb-6 ${
          isConfirmed ? "text-[#2d6fca]" : "text-red-600"
        }`}
      >
        {isConfirmed ? (
          <>
            <PartyPopperIcon className="w-5 h-5" />
            <span className="text-sm">See you on the big Day!</span>
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
              ? "bg-[#2d6fca] hover:bg-[#3e6375]"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Back to Home
        </Button>
      </Link>

      {/* Footer Note */}
      <p className="text-xs text-[#2d6fca] mt-6">
        💧 “Every good and perfect gift is from above.” – James 1:17
      </p>
    </div>
  );
}

export default function ResponsePage() {
  return (
    <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
      <ResponseContent />
    </Suspense>
  );
}
