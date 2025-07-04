"use client";
import { observer } from "mobx-react";
import MobxStore from "@/mobx";

import { shouldShowToday } from "@/utils/date";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PathwayCard, TitleDescription } from "./pathwaycomponents";
import { PathwayPlayer } from "../dashboard/page";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TodayPage = observer(() => {
  const {
    userPathways,
    pathwayPlaying,
    setPathwayPlaying,
    setIsPathwayEditView,
  } = MobxStore;

  const pathname = usePathname();

  useEffect(() => {
    return () => {
      setPathwayPlaying(null);
      setIsPathwayEditView(false);
    };
  }, [pathname, setPathwayPlaying, setIsPathwayEditView]);

  if (pathwayPlaying) {
    return (
      <div className="sm:px-8 px-0">
        <PathwayPlayer pathway={pathwayPlaying} />
      </div>
    );
  }

  return (
    <div className="h-full max-w-[600px] m-4 sm:mx-8">
      <Tabs defaultValue="daily" className="min-w-[320px]">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="anytime">Anytime</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <TitleDescription
            title="Daily"
            description="Start your day with these routines"
          />
          <div className="flex flex-wrap gap-4">
            {userPathways
              ?.filter(
                (p) => shouldShowToday(p.days) && p.frequency == "everyday"
              )
              .map((pathway, i) => (
                <PathwayCard key={i} pathway={pathway} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="weekly">
          <TitleDescription
            title="Weekly"
            description="Make your weekly routine"
          />
          <div className="flex flex-wrap gap-4">
            {userPathways
              ?.filter(
                (p) => shouldShowToday(p.days) && p.frequency == "everyweek"
              )
              .map((pathway, i) => (
                <PathwayCard key={i} pathway={pathway} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="monthly">
          <TitleDescription title="Monthly" description="Once a month stuff" />
          <div className="flex flex-wrap gap-4">
            {userPathways
              ?.filter(
                (p) => shouldShowToday(p.days) && p.frequency == "everymonth"
              )
              .map((pathway, i) => (
                <PathwayCard key={i} pathway={pathway} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="anytime">
          <TitleDescription
            title="Anytime"
            description="Home of flexible routines"
          />
          <div className="flex flex-wrap gap-4">
            {userPathways
              ?.filter(
                (p) =>
                  shouldShowToday(p.days) &&
                  (p.frequency == "unlimited" || p.timeType == "anytime")
              )
              .map((pathway, i) => (
                <PathwayCard key={i} pathway={pathway} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* <TitleDescription title="Yearly" description="" />
      <div className="flex flex-col gap-4">
        {userPathways
          ?.filter((p) => shouldShowToday(p.days))
          .map((pathway, i) => (
            <PathwayCard key={i} pathway={pathway} />
          ))}
      </div> */}
    </div>
  );
});

export default TodayPage;
