// import CanvaSlideshow from "@/components/invitation/CanvaSlideshow";
import InvitationForm from "@/components/invitation/InvitationForm";
import { Metadata } from "next";
import Image from "next/image";
// import Image from "next/image";
import React from "react";
export const metadata: Metadata = {
  title: "Andrey Amaris Relova",
  description: "Andrey's first birthday and dedication.",
  manifest: "/manifest.webmanifest",
  openGraph: {
    images:
      "https://andreyrelova.vercel.app/_next/image?url=%2Fimages%2Fball-down-landscape.jpeg&w=1080&q=75",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};
function InvitationPage() {
  return (
    <div className="flex flex-col items-center relative justify-center w-full p-4">
      <Image
        src={"/images/ball-down-landscape.jpeg"}
        alt="andrey-sitting"
        width={1080}
        height={1080}
        className="object-center object-cover h-full w-full absolute blur-sm z-0 inset-0"
      />
      <div className="relative z-10">
        <InvitationForm />
      </div>
    </div>
  );
}

export default InvitationPage;
