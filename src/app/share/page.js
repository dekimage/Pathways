"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { PathwayPlayer } from "../dashboard/page";
import { routines } from "@/data/routines";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";

const SharePage = () => {
  const searchParams = useSearchParams();
  const pathwayId = searchParams.get("pathwayId");
  const pathwayToPlay = routines.find((r) => r.premiumId == pathwayId);
  

  if (!pathwayToPlay) {
    return (
      <div>Error Occured, please try again with the original link provided</div>
    );
  }

  return (
    <div className="sm:px-8 px-0 flex justify-center items-center flex-col">
      <Link
        href="/"
        className="flex h-[53px] items-center justify-center pr-[26px]"
      >
        <Image src={logoImg} width={32} height={32} alt="logo" />
        <div className="text-xl font-bold ml-1">PlayRoutines</div>
      </Link>
      <PathwayPlayer pathway={pathwayToPlay} isShare />
    </div>
  );
};
export default SharePage;
