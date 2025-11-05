import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center flex-1 p-4 md:max-w-7xl md:mx-auto">
      <div className="w-full relative md:max-w-md">
        <Image
          src={"/images/andrey-poster.jpg"}
          alt="andrey-poster"
          width={1080}
          height={1080}
          className="flex object-center object-cover w-full rounded-xl"
        />
      </div>
      <div className="flex-1">
        <Image
          src={"/images/ball-down-landscape.jpeg"}
          alt="andrey-sitting"
          width={1080}
          height={1080}
          className="object-bottom object-cover h-full w-full rounded-xl"
        />
      </div>
      {/* <Image
                  src={"/images/andrey-poster.jpg"}
                  alt="andrey-sitting"
                  width={600}
                  height={600}
                  className="object-center object-contain w-full"
                /> */}
    </div>
  );
}
