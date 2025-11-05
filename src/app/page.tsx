import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 sm:p-4">
      <Image
        src={"/images/ball-down-landscape.jpeg"}
        alt="andrey-sitting"
        width={1080}
        height={1080}
        className="hidden sm:block object-bottom object-cover h-[700px] full w-full max-w-7xl sm:rounded-xl"
      />
      <Image
        src={"/images/happy-portrait.jpeg"}
        alt="andrey-happy"
        width={1080}
        height={1080}
        className="block sm:hidden object-center object-cover h-full w-full"
      />
    </div>
  );
}
