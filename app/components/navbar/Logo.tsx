"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      src={"/images/logo.png"}
      alt="logo"
      width={100}
      height={100}
      className="hidden md:block w-auto h-auto cursor-pointer"
      priority
    />
  );
};

export default Logo;
