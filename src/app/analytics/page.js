"use client";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import {
  formatSeconds,
  formatSecondsToHumanReadable,
  formatTimeRange,
  getDateTimeDay,
  getRelativeTime,
} from "@/utils/date";
import {
  CalendarCheck,
  CalendarDays,
  CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock4,
  Gem,
  Hourglass,
  RefreshCcw,
  Sigma,
  WalletCards,
  X,
} from "lucide-react";
import MobxStore from "@/mobx";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Card } from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { PodcastEmptyPlaceholder } from "@/reusable-ui/EmptyList";
import Link from "next/link";
import { TitleDescription } from "../today/pathwaycomponents";
import { PremiumLabel } from "@/reusable-ui/ReusableLayout";
import { premiumUtil } from "@/utils/premium";
import { PathwayPlayer } from "../dashboard/page";
import { DeleteDialog } from "@/components/Dialogs/DeleteDialog";

export const FancyTag = ({ color, text }) => {
  let backgroundColor, textColor;

  switch (color) {
    case "green":
      textColor = "#16a34a"; // Green
      backgroundColor = "#bbf7d0"; // Lighter Green
      break;

    case "red":
      textColor = "#EF4444"; // Red
      backgroundColor = "#FED7D7"; // Lighter Red
      break;
    case "amber":
      textColor = "#F59E0B"; // Amber
      backgroundColor = "#FCD34D"; // Lighter Amber
      break;
    case "blue":
      textColor = "#3B82F6"; // Blue
      backgroundColor = "#A5B4FC"; // Lighter Blue
      break;

    default:
      textColor = "#000"; // Default background color
      backgroundColor = "#fff"; // Default text color
  }

  const tagStyle = {
    backgroundColor,
    color: textColor,
    display: "inline-block",
    padding: "0.2rem 0.3rem",
    borderRadius: "0.25rem",
    marginRight: "0.5rem",
    maxWidth: "fit-content",
    height: "fit-content",
  };

  return (
    <div className="text-xs" style={tagStyle}>
      {text}
    </div>
  );
};

const LogDetails = observer(({ log, setIsExpanded }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deleteLog, setPathwayPlaying, findPathwayById } = MobxStore;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const isSpecificPathway = searchParams.get("pathwayId");

  return (
    <div className="mx-2">
      <div className="flex flex-col gap-2 rounded-md my-4 text-sm ">
        <div className="flex flex-row gap-2 items-center">
          <div className="border border-slate-200 p-1 rounded items-center">
            <CalendarDays size="16px" />
          </div>

          {getDateTimeDay(log.timestamp.seconds * 1000)}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="border border-slate-200 p-1 rounded">
            <Clock4 size="16px" />
          </div>
          {formatTimeRange(log.startTime, log.timestamp.seconds * 1000)}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="border border-slate-200 p-1 rounded">
            <Hourglass size="16px" />
          </div>
          {formatSecondsToHumanReadable(log.totalDuration)}
        </div>
      </div>

      <div className="flex gap-2 sm:flex-row flex-wrap">
        <Button
          className="w-full px-2"
          onClick={() => {
            isSpecificPathway
              ? router.replace("/analytics", undefined, {
                  shallow: true,
                })
              : router.push(`/analytics?pathwayId=${log.pathway.id}`);
            setIsExpanded(false);
          }}
        >
          {isSpecificPathway
            ? "Hide all time analysis"
            : "View all time analysis"}
        </Button>
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            className="sm:ml-2 ml-0"
            onClick={() => setPathwayPlaying(findPathwayById(log.pathway.id))}
          >
            Play Again <RefreshCcw size={14} className="ml-1" />
          </Button>

          <DeleteDialog
            onDelete={() => deleteLog(log.id)}
            setShow={setShowDeleteDialog}
            show={showDeleteDialog}
            label="log"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {log.responses.map((step, index) => (
          <div key={index} className="border-t mt-3">
            <div className="mt-3">
              <div className="flex">
                <div className="text-lg font-semibold  rounded  px-2 w-fit h-fit">
                  {index + 1}.
                </div>
                <div className="sm:text-xl text-sm">{step.question}</div>
              </div>

              <div className="mt-4 text-md bg-muted p-2 rounded">
                <ReactMarkdown>{step.response}</ReactMarkdown>
              </div>

              {step.skipped ? (
                <FancyTag color="red" text="Skipped" />
              ) : (
                <div className="flex gap-2 mt-4 items-center">
                  <FancyTag color="green" text="Completed" />
                  <div className="border border-slate-200 p-1 rounded">
                    <Hourglass size="16px" />
                  </div>
                  <div className="text-sm">
                    {formatSecondsToHumanReadable(step.timeSpent)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {log.distractions && (
        <div className="mt-4">
          <div className=""></div>
          <div className="mt-3">
            <div className="flex">
              <div className="text-lg font-semibold  border rounded py-1 px-2 w-fit h-fit">
                Distractions
              </div>
            </div>

            <div className="mt-4 text-sm">
              {log.distractions.map((distraction, index) => (
                <div key={index}>{distraction}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {log.feedback && (
        <div className="mt-4">
          <div className=""></div>
          <div className="mt-3">
            <div className="flex">
              <div className="text-lg font-semibold border  rounded py-1 px-2 w-fit h-fit">
                Feedback
              </div>
            </div>

            <div className="mt-4 text-sm">{log.feedback.comment}</div>

            <div className="text-gray-600">
              <div className=" p-2 w-fit rounded">
                <span className="">Rating:</span>
                <span className="ml-2">{log.feedback.rating}/5</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {log.gemEarned && (
        <div>
          <div className="text-lg font-semibold  border rounded py-1 px-2 w-fit h-fit">
            Loot
          </div>
          {log.gemEarned && <div className="">+{log.gemEarned} 🥮</div>}
        </div>
      )}
    </div>
  );
  ``;
});

export const LogCard = ({ log }) => {
  const { pathway } = log;

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-col  justify-between p-2 border  rounded-md">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="flex items-center">
          <div
            className="text-2xl mr-2 border-gray border p-4 rounded"
            style={{ backgroundColor: pathway.backgroundColor }}
          >
            {pathway.emoji}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-md">{pathway.name}</div>
          <div className="flex gap-2">
            <div className="text-gray-500 text-sm">
              {getRelativeTime(log.timestamp.seconds * 1000)}
            </div>
          </div>
        </div>
        <div className="flex items-center flex-grow justify-end gap-2">
          <div className="mr-4">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
      </div>

      {isExpanded && <LogDetails setIsExpanded={setIsExpanded} log={log} />}
    </div>
  );
};

const LogCardReward = ({ log }) => {
  const { reward } = log;
  const { deleteLog } = MobxStore;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const searchParams = useSearchParams();
  const isSpecificReward = searchParams.get("rewardId");
  const router = useRouter();

  return (
    <div className="flex  justify-between p-2 border rounded-md">
      <div className="flex items-center">
        <div className="flex items-center">
          <div
            className="text-2xl mr-2 border-gray border p-4 rounded"
            style={{ backgroundColor: reward.backgroundColor }}
          >
            {reward.emoji}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-md">{reward.name}</div>
          <div className="flex gap-2">
            <div className="text-gray-500 text-sm">
              {getRelativeTime(log.timestamp.seconds * 1000)}
            </div>
            <div className="text-red-500 text-sm flex items-center gap-1">
              -{reward.cost} <Gem size={14} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Button
          className="w-1/2"
          onClick={() =>
            isSpecificReward
              ? router.replace("/analytics", undefined, {
                  shallow: true,
                })
              : router.push(`/analytics?rewardId=${log.reward.id}`)
          }
        >
          {isSpecificReward ? "Hide All" : "View All"}
        </Button>

        <DeleteDialog
          onDelete={() => deleteLog(log.id)}
          setShow={setShowDeleteDialog}
          show={showDeleteDialog}
          label="log"
        />
      </div>
    </div>
  );
};

const LogsPage = observer(() => {
  const [date, setDate] = useState(new Date());
  const {
    isMobileOpen,
    logs,
    pathwayPlaying,
    setIsPathwayEditView,
    setPathwayPlaying,
  } = MobxStore;

  const searchParams = useSearchParams();
  const router = useRouter();

  const [filterType, setFilterType] = useState("pathways");

  const pathwayId = searchParams.get("pathwayId");
  const rewardId = searchParams.get("rewardId");

  const pathname = usePathname();

  useEffect(() => {
    return () => {
      setPathwayPlaying(null);
      setIsPathwayEditView(false);
    };
  }, [pathname, setPathwayPlaying, setIsPathwayEditView]);

  // const shiftDateBy = (days) => {
  //   console.log(321);
  //   setDate(
  //     (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + days))
  //   );
  // };

  // const isNextDayTomorrow = () => {
  //   console.log(123);
  //   const today = new Date();
  //   const tomorrow = new Date(
  //     today.setDate(today.getDate() + 1)
  //   ).toDateString();
  //   return (
  //     new Date(date.setDate(date.getDate() + 1)).toDateString() === tomorrow
  //   );
  // };

  const filteredLogs = logs
    .filter((log) => {
      const logDate = new Date(log.timestamp.seconds * 1000);
      const isSelectedDate = logDate.toDateString() === date?.toDateString();
      if (pathwayId) {
        return log.pathwayId === pathwayId;
      }
      if (rewardId) {
        return log.reward?.id === rewardId;
      }

      if (filterType === "all") {
        return isSelectedDate;
      } else if (filterType === "pathways") {
        return log.pathway && isSelectedDate;
      } else if (filterType === "rewards") {
        return log.reward && isSelectedDate;
      }
    })
    .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

  const filteredPathwayLogs = filteredLogs.filter((log) => log.pathway);

  const getLogName = (id, type) => {
    if (type === "pathway") {
      const log = logs.find((log) => log.pathway?.id === id);
      return log?.pathway.name;
    }
    if (type === "reward") {
      const log = logs.find((log) => log.reward?.id === id);
      return log?.reward.name;
    }
  };

  const { analyticsOk } = premiumUtil();

  if (pathwayPlaying) {
    return (
      <div className="sm:ml-8">
        <PathwayPlayer pathway={pathwayPlaying} />
      </div>
    );
  }

  return (
    <div className="h-full max-w-[600px] m-4 sm:mx-8">
      <TitleDescription
        title="Analysis"
        description="Analyse past data to improve your journey."
      />

      <div className="flex sm:items-center h-fit gap-4 flex-col sm:flex-row items-start">
        <Tabs defaultValue="pathways">
          <TabsList>
            <TabsTrigger
              onClick={() => {
                setFilterType("pathways");
                router.replace("/analytics", undefined, {
                  shallow: true,
                });
              }}
              value="pathways"
            >
              Routines
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setFilterType("rewards");
                router.replace("/analytics", undefined, {
                  shallow: true,
                });
              }}
              value="rewards"
            >
              Rewards
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {/* 
        <Button variant={"outline"} onClick={() => shiftDateBy(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button> */}

        <div className={`grid gap-2`}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={`w-fit justify-start text-left font-normal ${
                  !date && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  <>{format(date, "LLL dd, y")}</>
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="single"
                defaultMonth={date}
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* <Button
          variant={"outline"}
          onClick={() => shiftDateBy(1)}
          disabled={isNextDayTomorrow()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button> */}
      </div>

      {!analyticsOk.ok && (
        <Link
          href="/premium"
          className="text-xs flex gap-2 items-center p-2 border rounded bg-yellow-100 mt-2 text-black"
        >
          You are currently limited to 7 days of analysis. Upgrade to
          <Badge className="">Premium</Badge>to see all your logs.
        </Link>
      )}

      {(pathwayId || rewardId) && (
        <div className="my-4">
          <Badge
            className="cursor-pointer"
            onClick={() =>
              router.replace("/analytics", undefined, {
                shallow: true,
              })
            }
          >
            {getLogName(
              pathwayId || rewardId,
              pathwayId ? "pathway" : "reward"
            )}
            <div className="ml-2 w-4 h-4 flex items-center justify-center rounded-full border border-transparent  cursor-pointer transition duration-300">
              <X size="14px" />
            </div>
          </Badge>
        </div>
      )}
      {filteredPathwayLogs.length > 0 && (
        <div className="flex gap-4 my-4 flex-col sm:flex-row">
          <Card className="py-2 px-2 sm:w-1/3 w-full">
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-between w-full flex-col">
                <div className="flex justify-between items-between w-full">
                  <div className="">Average</div>
                  <div className="flex justify-center items-center border border-slate-200 p-1 rounded w-8 h-8">
                    <Hourglass size="16px" />
                  </div>
                </div>

                <div className="text-2xl flex items-center">
                  {formatSecondsToHumanReadable(
                    filteredPathwayLogs.reduce(
                      (acc, log) => acc + log.totalDuration,
                      0
                    ) / filteredPathwayLogs.length,
                    false
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="py-2 px-2 sm:w-1/3 w-full">
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-between w-full flex-col">
                <div className="flex justify-between items-between w-full">
                  <div>Total Duration</div>
                  <div className="flex justify-center items-center border border-slate-200 p-1 rounded w-8 h-8">
                    <Sigma size="16px" />
                  </div>
                </div>
                <div className="text-2xl flex items-center">
                  {formatSecondsToHumanReadable(
                    filteredPathwayLogs.reduce(
                      (acc, log) => acc + log.totalDuration,
                      0
                    ),
                    false
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="py-2 px-2 sm:w-1/3 w-full">
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-between w-full flex-col">
                <div className="flex justify-between items-between w-full">
                  <div> Total Sessions</div>
                  <div className="flex justify-center items-center border border-slate-200 p-1 rounded w-8 h-8">
                    <WalletCards size="16px" />
                  </div>
                </div>
                <div className="text-2xl flex items-center">
                  {filteredPathwayLogs.length}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-4">
        {filteredLogs.map((log, index) => {
          if (log.pathway) {
            return <LogCard key={log.id} log={log} />;
          }
          if (log.reward) {
            return <LogCardReward key={log.id} log={log} />;
          }
        })}
        {filteredLogs.length === 0 && (
          <PodcastEmptyPlaceholder
            title="No Logs Today"
            description="Play Routines to add logs."
          >
            <Link href="/dashboard">
              <Button variant="outline">Go to Dashboard</Button>
            </Link>
          </PodcastEmptyPlaceholder>
        )}
      </div>
    </div>
  );
});

export default LogsPage;
