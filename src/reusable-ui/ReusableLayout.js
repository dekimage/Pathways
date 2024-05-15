"use client";

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { VerticalNavbar } from "./VerticalNavbar";

import {
  CalendarCheck,
  Flame,
  Gamepad2,
  GaugeCircle,
  Gem,
  LayoutDashboard,
  ListMinus,
  Plus,
  Search,
} from "lucide-react";
import MobxStore from "../mobx";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { observer } from "mobx-react";
import { LoadingSpinner } from "./LoadingSpinner";
import { UserNav } from "./ReusableProfileMenu";
import Image from "next/image";
import logoImg from "../assets/logo.png";
import MobileHeader from "./MobileHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ModeToggle } from "@/components/ui/themeButton";

const defaultLayout = [20, 80];

export const CreateListDialog = () => {
  const [listName, setListName] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { addList } = MobxStore;

  return (
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus size={16} className="mr-2" /> Create List
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New List</DialogTitle>
          <DialogDescription>
            Store different routines across custom lists.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">List Name</Label>
              <Input
                id="name"
                placeholder="Morning Routine"
                onChange={(e) => setListName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="mt-2 sm:mt-0"
            onClick={() => setShowDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              setShowDeleteDialog(false);
              addList(listName);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ReusableLayout = observer(({ children }) => {
  const { user, lists, logout } = MobxStore;

  const pathname = usePathname();

  const isRoute = (route) => {
    if (route === "/") {
      return pathname === route ? "default" : "primary";
    }

    return pathname.toLowerCase().includes(route.toLowerCase())
      ? "default"
      : "primary";
  };

  return (
    <div>
      <div className="hidden sm:block">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full max-h-[950px] items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            maxSize={20}
            className="max-w-[200px] min-w-[200px] h-[950px]"
          >
            <Link
              href="/"
              className="flex h-[52px] items-center justify-center px-2"
            >
              <Image src={logoImg} width={32} height={32} alt="logo" />
              <div className="text-xl font-bold ml-1">PlayRoutines</div>
            </Link>
            <Separator />
            <VerticalNavbar
              links={[
                {
                  title: "Dashboard",
                  icon: LayoutDashboard,
                  variant: isRoute("/"),
                  href: "",
                },
                {
                  title: "Today",
                  icon: CalendarCheck,
                  variant: isRoute("Today"),
                  href: "today",
                },
                {
                  title: "Explore",
                  icon: Search,
                  variant: isRoute("Explore"),
                  href: "explore",
                },
                {
                  title: "Analytics",
                  icon: GaugeCircle,
                  variant: isRoute("Analytics"),
                  href: "analytics",
                },
                {
                  title: "Gamify",
                  icon: Gamepad2,
                  variant: isRoute("Gamify"),
                  href: "gamify",
                },
              ]}
            />
            <Separator />
            <div className="flex justify-center items-center w-[185px] m-2">
              <CreateListDialog />
            </div>

            {lists.length > 0 && (
              <VerticalNavbar
                links={lists.map((list) => ({
                  title: list.name,
                  icon: ListMinus,
                  variant: isRoute(list.id),
                  href: `list/${list.id}`,
                }))}
              />
            )}
          </ResizablePanel>
          {/* <ResizableHandle /> */}
          <ResizablePanel
            className="border-l border-gray-[#e5e7eb]"
            defaultSize={defaultLayout[1]}
            minSize={30}
            style={{ overflow: "auto" }}
          >
            <div>
              {/* {MobxStore.loading ? (
              <LoadingSpinner />
            ) : (
              <div>
              {MobxStore.user ? (
                  <p>Logo</p>
                ) : (
                  <div>
                    <Button onClick={handleSignIn}>Sign In Anonymously</Button>
                  </div>
                )}
              </div>
            )} */}

              <div className="w-full h-[53px] flex justify-end items-center p-2 border-b  gap-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-1">
                      {MobxStore.user?.streak || 0}

                      <Flame />
                    </div>
                    <Link href="/gamify" className="flex items-center gap-1">
                      {MobxStore.user?.gold}
                      <Gem />
                    </Link>
                    <Link href="/new-pathway">
                      <Button>
                        <Plus size={16} className="mr-2" /> Create Routine
                      </Button>
                    </Link>
                    <ModeToggle />
                    <UserNav user={user} logout={logout} />
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login">
                      <Button variant="outline">Login</Button>
                    </Link>
                    <Link href="/signup">
                      <Button>Create Free Account</Button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="">{children}</div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="block sm:hidden">
        <MobileHeader />
        {children}
      </div>
    </div>
  );
});

export default ReusableLayout;
