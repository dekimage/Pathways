"use client";
import { observer } from "mobx-react";
import { useState } from "react";
import MobxStore from "@/mobx";
import { PathwayPlayer } from "../dashboard/page";
import { PathwayCard, TitleDescription } from "../today/pathwaycomponents";
import { routines } from "@/data/routines";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Flower,
  Gamepad2,
  HeartHandshake,
  Minimize2,
  ScanEye,
} from "lucide-react";

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
    <ScrollArea>
      <div className="flex flex-wrap gap-2 items-center my-2">
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
    </ScrollArea>
  );
};

export const TagsCarousel = ({
  tags,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <ScrollArea>
      <div className="flex flex-wrap gap-2 items-center my-4">
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
    </ScrollArea>
  );
};

const ExplorePage = observer(() => {
  const { pathwayPlaying, userPathways } = MobxStore;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTrigger, setSelectedTrigger] = useState(null);
  const [selectedDurations, setSelectedDurations] = useState(null);

  const premiumUserPathways = userPathways.filter(
    (pathway) => pathway.premiumId
  );

  const mergedRoutines = routines.map((routine) => {
    const userPathway = premiumUserPathways.find(
      (pathway) => pathway.premiumId === routine.premiumId
    );
    if (userPathway) {
      return userPathway;
    } else {
      return routine;
    }
  });

  if (pathwayPlaying) {
    return <PathwayPlayer pathway={pathwayPlaying} />;
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

      <div className="flex flex-wrap gap-8 mt-8">
        {mergedRoutines.map((routine, i) => (
          <PathwayCard key={i} pathway={routine} />
        ))}
      </div>
    </div>
  );
});

export default ExplorePage;
