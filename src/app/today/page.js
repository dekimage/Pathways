"use client";
import { observer } from "mobx-react";
import MobxStore from "@/mobx";
import {
  HorizontalPathwaysList,
  PathwayCard,
  PathwayPlayer,
  TitleDescription,
} from "../page";
import { shouldShowToday } from "@/utils/date";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TodayPage = observer(() => {
  const { userPathways, pathwayPlaying, loading } = MobxStore;

  if (pathwayPlaying) {
    return <PathwayPlayer pathway={pathwayPlaying} />;
  }

  return (
    <div className="h-[90vh] max-w-[600px] m-4 sm:mx-8">
      <Tabs defaultValue="daily" className="w-[400px]">
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
          <div className="flex flex-col gap-4">
            {userPathways
              ?.filter((p) => shouldShowToday(p.days))
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
          <div className="flex flex-col gap-4">
            {userPathways
              ?.filter((p) => shouldShowToday(p.days))
              .map((pathway, i) => (
                <PathwayCard key={i} pathway={pathway} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="monthly">
          <TitleDescription title="Monthly" description="Once a month stuff" />
          <div className="flex flex-col gap-4">
            {userPathways
              ?.filter((p) => shouldShowToday(p.days))
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
          <div className="flex flex-col gap-4">
            {userPathways
              ?.filter((p) => shouldShowToday(p.days))
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
