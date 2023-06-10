"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      src={"/images/logo.png"}
      alt="logo"
      width={100}
      height={100}
      className="hidden md:block w-auto h-auto"
      priority
    />
  );
};

export default Logo;
