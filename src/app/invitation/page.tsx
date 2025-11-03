import CanvaSlideshow from "@/components/invitation/CanvaSlideshow";
import InvitationForm from "@/components/invitation/InvitationForm";
// import Image from "next/image";
import React from "react";

function InvitationPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      <div className="flex order-2 md:order-1 flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-[#dbf2fc]">
        <InvitationForm />
      </div>
      <div className="order-1 md:order-2">
        {/* <Image
          src={"/images/andrey-banner.png"}
          alt="andrey-banner"
          width={1920}
          height={1920}
          className="object-contain h-full w-full"
        /> */}
        <CanvaSlideshow />
      </div>
    </div>
  );
}

export default InvitationPage;
