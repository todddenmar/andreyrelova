"use client";

import { PartyPopperIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SuccessPage() {
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
      <h1 className="text-3xl font-semibold text-[#3e5e76] mb-2">
        RSVP Submitted Successfully!
      </h1>

      {/* Message */}
      <p className="text-[#3e5e76] max-w-md mb-6">
        Thank you for confirming your attendance 💖 We’re so happy to celebrate
        this special day with you and your family.
      </p>

      {/* Cute Divider */}
      <div className="flex items-center gap-2 text-[#3e5e76] mb-6">
        <PartyPopperIcon className="w-5 h-5" />
        <span className="text-sm">See you on Baptism Day!</span>
        <PartyPopperIcon className="w-5 h-5" />
      </div>

      {/* Back Home Button */}
      <Link href="/">
        <Button className="rounded-full bg-[#3e5e76] hover:bg-[#3e6375]text-white px-6 py-2">
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
