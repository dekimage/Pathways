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
import { usePathname, useRouter } from "next/navigation";
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
import { SkeletonDemo } from "./Skeleton";
import withAuth from "@/hoc/withAuth";
import { premiumUtil } from "@/utils/premium";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const defaultLayout = [20, 80];

export const PremiumLabel = ({ label }) => {
  const router = useRouter();
  const { listsOk, routinesOk } = premiumUtil();
  let checker;
  if (label === "lists") {
    checker = listsOk;
  }
  if (label == "routines") {
    checker = routinesOk;
  }
  return (
    <div
      className="text-xs flex gap-2 items-center p-2 border rounded bg-yellow-100 text-black"
      onClick={() => {
        if (!checker.ok) {
          router.push("/premium");
        }
      }}
    >
      {checker.current} / {checker.limit}
      {checker.ok ? (
        <Badge className="">Free</Badge>
      ) : (
        <div>
          Limit Reached. Upgrade to <Badge className="">Premium</Badge> for{" "}
          {label == "lists" ? "unlimited lists." : "unlimited routines."}
        </div>
      )}
    </div>
  );
};

export const CreateListDialog = () => {
  const [listName, setListName] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { addList, user } = MobxStore;
  const { listsOk } = premiumUtil();
  const { toast } = useToast();

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
            Organize your routines with custom lists.
          </DialogDescription>
          {!user.isPremium && <PremiumLabel label="lists" />}
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
          {listsOk.ok ? (
            <Button
              type="submit"
              onClick={() => {
                setShowDeleteDialog(false);
                addList(listName);
                toast({ title: "✔️ List Added" });
              }}
            >
              Save
            </Button>
          ) : (
            <Link href="/premium">
              <Button
                type="submit"
                onClick={() => {
                  setShowDeleteDialog(false);
                }}
              >
                Upgrade
              </Button>
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ReusableLayout = observer(({ children }) => {
  const { user, lists, logout } = MobxStore;

  const pathname = usePathname();

  const isRoute = (route) => {
    // if (route === "/") {
    //   return pathname === route ? "default" : "primary";
    // }

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
                  variant: isRoute("/dashboard"),
                  href: "dashboard",
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
            <div className="flex justify-center items-center w-[185px] m-2">
              {!user.isPremium && (
                <Link href="/premium" className="w-full">
                  <Button className="w-full">Upgrade Premium</Button>
                </Link>
              )}
            </div>
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
                      {MobxStore.user?.gem}
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
              {user ? (
                <div className="">{children}</div>
              ) : (
                <div className="flex flex-col gap-2 p-4">
                  <SkeletonDemo />
                  <SkeletonDemo />
                  <SkeletonDemo />
                  <SkeletonDemo />
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="block sm:hidden">
        <MobileHeader />
        {user ? (
          <div>{children}</div>
        ) : (
          <div className="flex flex-col gap-2 p-4">
            <SkeletonDemo />
            <SkeletonDemo />
            <SkeletonDemo />
            <SkeletonDemo />
          </div>
        )}
      </div>
    </div>
  );
});

export default withAuth(ReusableLayout);
