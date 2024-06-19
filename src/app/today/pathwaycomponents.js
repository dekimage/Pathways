import { Card, CardDescription } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, Infinity, Lock, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FaPlay } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { formatTimeFromSteps } from "@/utils/transformers";
import { observer } from "mobx-react";
import MobxStore from "@/mobx";
import { frequencyLookup } from "@/data";
import { DeleteDialog } from "@/components/Dialogs/DeleteDialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const TitleDescription = ({ title, description, button }) => {
  return (
    <div className="flex sm:items-center justify-between mb-4 sm:flex-row flex-col items-start">
      <div className="space-y-1 mr-4">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <div className="text-sm text-muted-foreground">{description}</div>
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

export const PathwayCard = observer(
  ({ pathway, listId, isOriginalPathway = false, fromExplore = false }) => {
    const {
      name,
      description,
      emoji,
      time,
      duration,
      steps,
      backgroundColor,
      isPremium,
    } = pathway;

    const {
      setIsPathwayEditView,
      setPathwayPlaying,
      isMobileOpen,
      deletePathway,
      removeFromList,
      user,
    } = MobxStore;

    const pathname = usePathname();
    const { toast } = useToast();

    const isInList = pathname.includes("list") && listId;

    const totalDurationCalced = formatTimeFromSteps(steps);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return (
      !isMobileOpen && (
        <Card className=" sm:w-64 w-40 sm:h-[340px] h-[320px] flex flex-col justify-between backdrop-blur-md relative">
          <div className="relative h-full">
            <div className="absolute  flex justify-center items-center space-x-4 top-[10px] left-[10px] z-[-100]">
              <div
                className="sm:w-28 w-14 sm:h-20 h-10  rounded-xl blur-lg"
                style={{ backgroundColor: backgroundColor }}
              ></div>
            </div>

            <div className="relative w-full h-full sm:p-4 p-2 backdrop-blur-lg bg-background/30 rounded-lg  shadow-xl flex flex-col items-between z-100">
              <div className="flex flex-grow flex-col">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute sm:top-[16px] sm:right-[16px] top-[8px] right-[8px] p-2"
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
                    {!isOriginalPathway && (
                      <Link
                        href={`/analytics/?pathwayId=${pathway.id}`}
                        passHref
                      >
                        <DropdownMenuItem>View Stats</DropdownMenuItem>
                      </Link>
                    )}
                    {!isOriginalPathway &&
                      (isInList ? (
                        <DropdownMenuItem
                          onClick={() => {
                            removeFromList(listId, pathway.id);
                            toast({ title: "✔️ Routine Removed" });
                          }}
                        >
                          Remove From List
                        </DropdownMenuItem>
                      ) : (
                        <DeleteDialog
                          isResetDefault={fromExplore}
                          trigger={
                            <div className="w-full hover:bg-accent cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                              {fromExplore ? "Restore Default" : "Delete"}
                            </div>
                          }
                          onDelete={() => {
                            deletePathway(pathway.id);
                          }}
                          setShow={setShowDeleteDialog}
                          show={showDeleteDialog}
                          label="routine"
                        />
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div
                  className="flex justify-center items-center  w-fit sm:p-4 px-3 py-2 sm:text-4xl text-xl rounded-lg"
                  style={{ backgroundColor: backgroundColor }}
                >
                  {emoji}
                </div>
                <div className="my-2">
                  <div className="sm:text-xl text-md font-bold sm:mb-2 mb-1">
                    {name}
                  </div>
                  <CardDescription className="text-foreground sm:text-md text-xs">
                    {description.length > 100
                      ? description.slice(0, 100) + "..."
                      : description}
                  </CardDescription>
                </div>
                <div className="mb-2">
                  <Badge
                    variant="screen"
                    className="sm:mr-2 mr-1 sm:text-md text-xs"
                  >
                    {totalDurationCalced}
                  </Badge>
                  <Badge
                    variant="screen"
                    className="sm:mr-2 mr-1 sm:text-md text-xs"
                  >
                    {steps?.length} Steps
                  </Badge>
                </div>
              </div>
              {pathway.frequency !== "unlimited" && (
                <div className="sm:text-sm text-xs px-3  text-center w-fit border rounded-md p-1 flex gap-1 items-center">
                  {pathway.progress || 0} / {pathway.completionLimit}{" "}
                  {frequencyLookup[pathway.frequency]}
                  {(pathway.progress || 0) >= pathway.completionLimit && (
                    <Check size={16} />
                  )}
                </div>
              )}
              {pathway.frequency == "unlimited" && (
                <div className="text-sm  text-center w-fit border rounded-md p-1">
                  <Infinity size={16} />
                </div>
              )}
              {isPremium && !user.isPremium ? (
                <Button className="mt-2">
                  <Lock size="14" className="mr-1" /> Upgrade Premium
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full mt-2 sm:text-md text-xs"
                  onClick={() => MobxStore.setPathwayPlaying(pathway)}
                >
                  <FaPlay className="mr-2 sm:h-3 sm:w-3 h-2 w-2" />
                  Play
                </Button>
              )}
            </div>
          </div>
        </Card>
      )
    );
  }
);
