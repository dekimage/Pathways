import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { FaPause, FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const AdjustTimeDrawer = ({ addTime, reduceTime, timerOver, handleReset }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">+/- {timerOver && "Add Time"}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Adjust Time</DrawerTitle>
            <DrawerDescription>
              Add or reduce time to the timer
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex gap-2 justify-center">
            <Button variant="outline" className="gap-1" onClick={handleReset}>
              <RotateCcw size={14} />
              <span className="ml-1">Reset</span>
            </Button>
            <Button
              variant="outline"
              disabled={timerOver}
              onClick={() => reduceTime(1)}
            >
              -1 min
            </Button>
            <Button variant="outline" onClick={() => addTime(1)}>
              +1 min
            </Button>
            <Button variant="outline" onClick={() => addTime(10)}>
              +10 min
            </Button>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const TimerNew = ({
  timer,
  restartTimer,
  isPlaying,
  setIsPlaying,
  setTimer,
  timeOver,
  setTimeOver,
}) => {
  const handleStart = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    restartTimer();
  };

  const addTime = (amount) => {
    if (timeOver) {
      setTimer(amount * 60);
      setTimeOver(false);
    } else {
      setTimer((prev) => prev + amount * 60);
    }
  };
  const reduceTime = (amount) => {
    if (timeOver) {
      return;
    } else {
      setTimer((prev) => prev - amount * 60);
    }
  };

  const formatTime = (seconds) => {
    const sign = timeOver ? "+" : "";
    const minutes = Math.abs(Math.floor(seconds / 60));
    const remainingSeconds = Math.abs(seconds % 60);
    return `${sign}${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const backgroundClass = timeOver ? "bg-red-100" : "bg-background";
  const textClass = timeOver ? "text-red-600" : "text-text";

  return (
    <div
      className={`flex justify-center flex-col items-center mb-4 px-4 py-2 w-full ${backgroundClass}`}
    >
      <div className="w-fit text-center">
        <div className={`text-[62px] font-bold ${textClass}`}>
          {formatTime(timer)}
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <Button variant="outline" className="gap-1" onClick={handleReset}>
          <RotateCcw size={14} />
        </Button>

        {isPlaying ? (
          <Button className="gap-1 w-24" onClick={handlePause}>
            <FaPause size={14} />
          </Button>
        ) : (
          <Button className="gap-1 w-24" onClick={handleStart}>
            <FaPlay size={14} />
          </Button>
        )}

        <AdjustTimeDrawer
          addTime={addTime}
          reduceTime={reduceTime}
          timerOver={timeOver}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};
export default TimerNew;
