import { Button } from "@/components/ui/button";
import {
  CalendarCheck,
  Gamepad2,
  GaugeCircle,
  LayoutDashboard,
  MenuIcon,
  Search,
  X,
  ListMinus,
  Plus,
  Flame,
  Gem,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import MobxStore from "@/mobx";
import { observer } from "mobx-react";
import { VerticalNavbar } from "./VerticalNavbar";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import { ModeToggle } from "@/components/ui/themeButton";
import { Separator } from "@/components/ui/separator";
import { CreateListDialog } from "./ReusableLayout";
import Link from "next/link";
import { UserNav } from "./ReusableProfileMenu";

const MobileHeader = observer(() => {
  const { isMobileOpen, setIsMobileOpen, lists, user, logout } = MobxStore;

  const toggleMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const pathname = usePathname();
  const isRoute = (route) => {
    return pathname.endsWith(route.toLowerCase()) ? "default" : "ghost";
  };

  return (
    <div className="flex justify-between items-center border-b relative h-[52px] z-10000 p-4">
      <Link
        href="/"
        className="flex h-[53px] items-center justify-center pr-[26px]"
      >
        <Image src={logoImg} width={32} height={32} alt="logo" />
        <div className="text-xl font-bold ml-1">PlayRoutines</div>
      </Link>
      <div className="flex items-center gap-2">
        {/* <ModeToggle /> */}
        <Button onClick={toggleMenu} className="p-2">
          {isMobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </Button>
      </div>

      {isMobileOpen && user && (
        <div className="absolute top-[52px] left-0 w-full h-screen flex flex-col items-start px-2 bg-background">
          <div className="flex w-full px-2 justify-between mt-2 mx-4">
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-1">
                {user?.streak || 0}

                <Flame />
              </div>
              <Link href="/gamify" className="flex items-center gap-1">
                {user?.gold}
                <Gem />
              </Link>
            </div>
            <div className="flex gap-2 items-center mr-4 pb-2">
              <ModeToggle />
              <UserNav user={user} logout={logout} />
            </div>
          </div>
          <Separator />
          <VerticalNavbar
            links={[
              {
                title: "Dashboard",
                icon: LayoutDashboard,
                variant: isRoute("/"),
                href: "/",
                callBack: () => setIsMobileOpen(false),
              },
              {
                title: "Today",
                icon: CalendarCheck,
                variant: isRoute("Today"),
                href: "today",
                callBack: () => setIsMobileOpen(false),
              },
              {
                title: "Explore",
                icon: Search,
                variant: isRoute("Explore"),
                href: "explore",
                callBack: () => setIsMobileOpen(false),
              },
              {
                title: "Analytics",
                icon: GaugeCircle,
                variant: isRoute("Analytics"),
                href: "analytics",
                callBack: () => setIsMobileOpen(false),
              },
              {
                title: "Gamify",
                icon: Gamepad2,
                variant: isRoute("Gamify"),
                href: "gamify",
                callBack: () => setIsMobileOpen(false),
              },
            ]}
          />

          <Link
            href="/new-pathway"
            className="w-full mb-3"
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="flex justify-center items-center w-full">
              <Button className="w-full">
                <Plus size={16} className="mr-2" /> Create Routine
              </Button>
            </div>
          </Link>

          <div className="flex justify-center items-center w-full">
            <CreateListDialog />
          </div>

          {lists.length > 0 && (
            <VerticalNavbar
              links={lists.map((list) => ({
                title: list.name,
                icon: ListMinus,
                variant: isRoute(list.id),
                href: `list/${list.id}`,
                callBack: () => setIsMobileOpen(false),
              }))}
            />
          )}
        </div>
      )}

      {isMobileOpen && !user && (
        <div className="absolute top-[52px] left-0 w-full h-screen flex flex-col items-start px-2 bg-background">
          <div className="flex flex-col gap-2 mx-4 mt-8 w-full pr-8">
            <h2 className="text-xl font-semibold">Welcome!</h2>
            <Link href="/signup" className="w-full">
              <Button className="w-full">Create Free Account</Button>
            </Link>
            <Link href="/login" className="w-full">
              <Button className="w-full" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
});

export default MobileHeader;
