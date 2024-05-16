import { Card, CardDescription } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FaPlay } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { formatTimeFromSteps } from "@/utils/transformers";
import { observer } from "mobx-react";
import MobxStore from "@/mobx";
import { frequencyLookup } from "@/data";

export const TitleDescription = ({ title, description, button }) => {
  return (
    <div className="flex sm:items-center justify-between mb-4 sm:flex-row flex-col items-start">
      <div className="space-y-1 mr-4">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {button && button}
    </div>
  );
};

export const HorizontalPathwaysList = ({ pathways, title, description }) => {
  return (
    <div className="mb-8">
      <TitleDescription title={title} description={description} />
      <ScrollArea>
        <div className="flex gap-4 h-full">
          {pathways.map((pathway, i) => (
            <PathwayCard key={i} pathway={pathway} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export const PathwayCard = observer(({ pathway, listId }) => {
  const { name, description, emoji, time, duration, steps, backgroundColor } =
    pathway;

  const {
    setIsPathwayEditView,
    setPathwayPlaying,
    isMobileOpen,
    deletePathway,
    removeFromList,
  } = MobxStore;

  const pathname = usePathname();

  const isInList = pathname.includes("list") && listId;

  const totalDurationCalced = formatTimeFromSteps(steps);

  return (
    !isMobileOpen && (
      <Card className=" w-64 h-[350px] flex flex-col justify-between backdrop-blur-md relative">
        <div className="relative h-full">
          <div className="absolute  flex justify-center items-center space-x-4 top-[10px] left-[10px] z-[-100]">
            <div
              className="w-28 h-20  rounded-xl blur-lg"
              style={{ backgroundColor: backgroundColor }}
            ></div>
          </div>

          <div className="relative w-full h-full p-4 backdrop-blur-lg bg-white/30 rounded-lg  shadow-xl flex flex-col items-between z-100">
            <div className="flex flex-grow flex-col">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-[16px] right-[16px] p-2"
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More</span>
                    {/* <HiOutlineCog6Tooth size={20} className="text-slate-600" /> */}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setPathwayPlaying(pathway);
                      setIsPathwayEditView(false);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <Link href={`/analytics/?pathwayId=${pathway.id}`} passHref>
                    <DropdownMenuItem>View Stats</DropdownMenuItem>
                  </Link>
                  {isInList ? (
                    <DropdownMenuItem
                      onClick={() => removeFromList(listId, pathway.id)}
                    >
                      Remove From List
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => deletePathway(pathway.id)}>
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <div
                className="flex justify-center items-center  w-fit p-4 text-4xl rounded-lg"
                style={{ backgroundColor: backgroundColor }}
              >
                {emoji}
              </div>
              <div className="my-2">
                <div className="text-xl bold mb-2">{name}</div>
                <CardDescription className="text-foreground">
                  {description}
                </CardDescription>
              </div>
              <div className="my-2">
                <Badge variant="screen" className="mr-2">
                  {totalDurationCalced}
                </Badge>
                <Badge variant="screen" className="mr-2">
                  {steps?.length} Steps
                </Badge>
              </div>
            </div>
            {pathway.timeType == "time" && (
              <div className="text-sm  text-center w-fit">
                {pathway.progress || 0} / {pathway.completionLimit}{" "}
                {frequencyLookup[pathway.frequency]}
              </div>
            )}

            <Button
              className="w-full mt-2"
              onClick={() => MobxStore.setPathwayPlaying(pathway)}
            >
              <FaPlay className="mr-2 h-3 w-3" />
              Play
            </Button>
          </div>
        </div>
      </Card>
    )
  );
});
