"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import MobxStore from "@/mobx";
import { TitleDescription } from "@/reusable-ui/TitleDescription";
import { formatSecondsToHumanReadable } from "@/utils/date";
import { getAvatarShortcut } from "@/utils/transformers";
import { Hourglass, Play, PlayCircle, Plus, PlusCircle } from "lucide-react";
import { observer } from "mobx-react";
import { GiAnvil } from "react-icons/gi";

const ProfilePage = observer(() => {
  const { user } = MobxStore;
  if (!user) return <div>Loading...</div>;
  return (
    <div className="h-full max-w-[800px] m-4 sm:mx-8">
      <TitleDescription
        title="Profile"
        description="Your profile information"
      />
      <Avatar className="h-16 w-16 mb-4">
        <AvatarFallback>
          {user ? getAvatarShortcut(user.username) : "AA"}
        </AvatarFallback>
      </Avatar>

      <div className="p-2 rounded">
        {user.email}{" "}
        <Badge variant="outline" className="ml-1">
          {user.isPremium ? "Free Tier" : "Premium Tier"}
        </Badge>
      </div>
      <div className="text-2xl font-bold my-4">Stats</div>
      <div className="flex flex-wrap gap-4">
        <Card className="py-2 px-2 sm:w-1/3 w-full">
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-between w-full flex-col">
              <div className="flex justify-between items-between w-full">
                <div className="">Created Routines</div>
                <div className="flex justify-center items-center border border-slate-200 p-1 rounded w-8 h-8">
                  <Plus size="16px" />
                </div>
              </div>

              <div className="text-2xl flex items-center">
                {user.totalCreated || 0}
              </div>
            </div>
          </div>
        </Card>
        <Card className="py-2 px-2 sm:w-1/3 w-full">
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-between w-full flex-col">
              <div className="flex justify-between items-between w-full">
                <div className="">Completed Routines</div>
                <div className="flex justify-center items-center border border-slate-200 p-1 rounded w-8 h-8">
                  <Play size="16px" />
                </div>
              </div>

              <div className="text-2xl flex items-center">
                {user.totalDone || 0}
              </div>
            </div>
          </div>
        </Card>
        <Card className="py-2 px-2 sm:w-1/3 w-full">
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-between w-full flex-col">
              <div className="flex justify-between items-between w-full">
                <div className="">Total Time Playing Routines</div>
                <div className="flex justify-center items-center border border-slate-200 p-1 rounded w-8 h-8">
                  <Hourglass size="16px" />
                </div>
              </div>

              <div className="text-2xl flex items-center">
                {formatSecondsToHumanReadable(user.totalDuration || 0) || 0}
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-8">Need Help?</div>
      <a
        href="mailto:dejan.gavrilovikk@gmail.com"
        target="_blank"
        class="link link-hover underline"
      >
        Contact Me
      </a>
    </div>
  );
});
export default ProfilePage;
