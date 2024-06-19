"use client";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import MobxStore from "@/mobx";
import { PathwayPlayer } from "../dashboard/page";
import { PathwayCard, TitleDescription } from "../today/pathwaycomponents";
import { routines } from "@/data/routines";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Flower,
  Gamepad2,
  HeartHandshake,
  Minimize2,
  ScanEye,
} from "lucide-react";
import { usePathname } from "next/navigation";

export const CATEGORIES = [
  {
    id: 1,
    name: "Work",
    icon: <Briefcase size={14} />,
  },
  {
    id: 2,
    name: "Self Knowledge",
    icon: <ScanEye size={14} />,
  },
  {
    id: 3,
    name: "Calm",
    icon: <Flower size={14} />,
  },
  {
    id: 4,
    name: "Play",
    icon: <Gamepad2 size={14} />,
  },
  {
    id: 5,
    name: "Minimize",
    icon: <Minimize2 size={14} />,
  },
  {
    id: 6,
    name: "Connect",
    icon: <HeartHandshake size={14} />,
  },
];

export const TRIGGERS = [
  {
    id: 1,
    name: "Morning",
  },
  {
    id: 2,
    name: "Night",
  },
  {
    id: 3,
    name: "Before Work",
  },
  {
    id: 4,
    name: "After Work",
  },
  {
    id: 5,
    name: "Afternoon",
  },
  {
    id: 6,
    name: "Weekend",
  },
];

const DURATIONS = [
  { id: 1, name: "1-5 Mins" },
  { id: 2, name: "5-10 Mins" },
  { id: 3, name: "10-15 Mins" },
  { id: 4, name: "15-30 Mins" },
  { id: 5, name: "30-60 Mins" },
];

export const TriggersCarousel = ({
  tags,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-2 my-2">
        {tags.map((tag) => {
          const isSelected = selectedCategory === tag.id;

          return (
            <div
              key={tag.id}
              className="flex flex-col items-center cursor-pointer"
            >
              <Badge
                variant={isSelected ? "default" : "outline"}
                className="uppercase"
                onClick={() => setSelectedCategory(isSelected ? null : tag.id)}
              >
                <span className="mr-1">{tag.icon}</span> {tag.name}
              </Badge>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export const TagsCarousel = ({
  tags,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-2 my-2">
        {tags.map((tag) => {
          const isSelected = selectedCategory === tag.id;

          return (
            <div
              key={tag.id}
              className="flex flex-col items-center cursor-pointer"
            >
              <Badge
                variant={isSelected ? "default" : "outline"}
                className="uppercase"
                onClick={() => setSelectedCategory(isSelected ? null : tag.id)}
              >
                <span className="mr-1">{tag.icon}</span> {tag.name}
              </Badge>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const calculateDurationId = (steps) => {
  const totalDuration = steps.reduce((acc, step) => acc + step.timer, 0);
  if (totalDuration <= 5 * 60) return 1;
  if (totalDuration <= 10 * 60) return 2;
  if (totalDuration <= 15 * 60) return 3;
  if (totalDuration <= 30 * 60) return 4;
  return 5;
};

const enhancedRoutines = (routines) => {
  return routines.map((routine) => ({
    ...routine,
    durationId: calculateDurationId(routine.steps),
  }));
};

const ExplorePage = observer(() => {
  const {
    pathwayPlaying,
    userPathways,
    setPathwayPlaying,
    setIsPathwayEditView,
  } = MobxStore;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTrigger, setSelectedTrigger] = useState(null);
  const [selectedDurations, setSelectedDurations] = useState(null);

  const premiumUserPathways = userPathways.filter(
    (pathway) => pathway.premiumId
  );

  const mergedRoutines = enhancedRoutines(routines).map((routine) => {
    const userPathway = premiumUserPathways.find(
      (pathway) => pathway.premiumId === routine.premiumId
    );
    if (userPathway) {
      return userPathway;
    } else {
      return routine;
    }
  });

  const filterRoutines = () => {
    return mergedRoutines.filter((routine) => {
      if (selectedCategory && routine.categoryId !== selectedCategory) {
        return false;
      }
      if (selectedTrigger && routine.triggerId !== selectedTrigger) {
        return false;
      }
      if (selectedDurations && routine.durationId !== selectedDurations) {
        return false;
      }
      return true;
    });
  };

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
    <div className="h-full m-2 sm:mx-8">
      <TitleDescription
        title="PlayRoutines Originals &copy;"
        description="Get started with these carefully crafted routines"
      />

      <TagsCarousel
        tags={CATEGORIES}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <TriggersCarousel
        tags={TRIGGERS}
        selectedCategory={selectedTrigger}
        setSelectedCategory={setSelectedTrigger}
      />

      <TriggersCarousel
        tags={DURATIONS}
        selectedCategory={selectedDurations}
        setSelectedCategory={setSelectedDurations}
      />

      <div className="flex flex-wrap sm:gap-8 gap-2 mt-8">
        {filterRoutines().map((routine, i) => (
          <PathwayCard
            key={i}
            pathway={routine}
            fromExplore
            isOriginalPathway={routine.original}
          />
        ))}
      </div>
    </div>
  );
});

export default ExplorePage;
