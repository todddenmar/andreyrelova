import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src={"/images/andrey-sit.png"}
        alt="andrey-sitting"
        width={600}
        height={600}
        className="object-center object-cover h-full w-full lg:max-w-6xl"
      />
    </div>
  );
}
