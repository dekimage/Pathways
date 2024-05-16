"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import { observer } from "mobx-react";
import MobxStore from "@/mobx";

import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";

import { usePathname } from "next/navigation";
import TimerNew from "@/components/TimerNew";

import PathwayBuilder from "../new-pathway/page";
import { HorizontalPathwaysList } from "../today/pathwaycomponents";
import {
  SkipDialog,
  Checkbox1,
  MoodSelector,
  PathwayPlayerHeader,
  ProgressBar,
  ResponseItem,
} from "../player/components";

const backgroundCover = "";

export const PathwayPlayer = observer(({ pathway }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = pathway.steps[currentStep];
  const [timer, setTimer] = useState(step.timer);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(step.autoplay);
  const [userInput, setUserInput] = useState();
  const [userInputCheckbox, setUserInputCheckbox] = useState([]);
  const [responses, setResponses] = useState([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(pathway.autoPlayMusic);
  const [startTime, setStartTime] = useState(Date.now());

  const [timeOver, setTimeOver] = useState(false);

  const { setPathwayPlaying } = MobxStore;

  const audioRef = useRef(null);

  const { isPathwayEditView, setIsPathwayEditView } = MobxStore;

  useEffect(() => {
    let interval = null;
    let totalDurationInterval = null;

    if (!sessionComplete) {
      totalDurationInterval = setInterval(() => {
        setTotalDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    }

    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0 && !timeOver) {
            setTimeOver(true);

            return 0;
          } else if (timeOver) {
            return prevTimer + 1;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    } else if (!isPlaying && timer !== 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      clearInterval(totalDurationInterval);
    };
  }, [isPlaying, timer, timeOver, sessionComplete]);

  const handleNextStep = () => {
    const newResponses = [
      ...responses,
      {
        question: step.question,
        responseType: step.responseType,
        response: userInput || userInputCheckbox || "",
        timeSpent: step.timer - timer,
        skipped: false,
        // idleTime: 0,
      },
    ];
    setResponses(newResponses);

    if (currentStep < pathway.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimer(pathway.steps[currentStep + 1].timer);
      setUserInput("");
    } else {
      setSessionComplete(true);
    }
  };

  const handleSkipStep = () => {
    const newResponses = [
      ...responses,
      {
        question: step.question,
        responseType: step.responseType,
        response: "",
        timeSpent: 0,
        skipped: true,
      },
    ];
    setResponses(newResponses);

    if (currentStep < pathway.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimer(pathway.steps[currentStep + 1].timer);
    } else {
      setSessionComplete(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimer(pathway.steps[currentStep - 1].timer);
    } else {
      setPathwayPlaying(null);
    }
  };

  const restartTimer = () => {
    setTimer(step.timer);
    setTimeOver(false);
  };

  if (isPathwayEditView) {
    return <PathwayBuilder pathwayToEdit={pathway} />;
  }

  if (sessionComplete) {
    return (
      <div className="flex flex-col max-w-lg  p-6 rounded-lg shadow-md mt-8 ml-8 border border-gray">
        <h2 className="text-2xl font-semibold  mb-4">Congratulations!</h2>
        <div className="flex justify-center mb-4">
          {responses.map((res, i) => (
            <div key={i}>
              {!res.skipped && (
                <FaStar key={i} className="text-yellow-400 text-3xl" />
              )}
            </div>
          ))}
        </div>
        <p className="text-gray-700 mb-4">You ve completed the session!</p>
        <p className="text-sm text-gray-600 mb-2">
          Total Duration: {Math.floor(totalDuration / 60)}:
          {totalDuration % 60 < 10
            ? `0${totalDuration % 60}`
            : totalDuration % 60}
        </p>
        <div className="flex flex-col w-full">
          {responses.map((response, index) => (
            <ResponseItem response={response} key={index} index={index} />
          ))}
        </div>
        <Button
          className="w-full mt-2"
          onClick={() => {
            MobxStore.addLog(pathway, {
              pathway: pathway,
              startTime,
              totalDuration,
              timestamp: Date.now(),

              ...(pathway.gold && { goldEarned: pathway.gold }),
              responses,
            });
            setPathwayPlaying(false);
          }}
        >
          Complete
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-lg p-4 sm:mt-8 m-0 sm:rounded-lg sm:shadow-md sm:border border-gray">
      <audio
        ref={audioRef}
        src={`rpg-music-${pathway.musicPack || 2}.mp3`}
        loop
      />

      <PathwayPlayerHeader
        pathway={pathway}
        isMusicPlaying={isMusicPlaying}
        handlePreviousStep={handlePreviousStep}
        setIsMusicPlaying={setIsMusicPlaying}
        setIsPathwayEditView={setIsPathwayEditView}
      />

      <ProgressBar currentStep={currentStep} pathway={pathway} />

      {/* <div
        className="h-24 bg-cover  bg-no-repeat bg-center w-full"
        style={{ backgroundImage: `url(${pathway.background})` }}
      ></div> */}

      <TimerNew
        timer={timer}
        restartTimer={restartTimer}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setTimer={setTimer}
        timeOver={timeOver}
      />

      <h2 className="text-md mb-2">
        <div>Step {currentStep + 1}:</div>
        <div className="text-2xl my-2">{step.question}</div>

        {step.context && <div className="py-2 text-sm">💡 {step.context}</div>}
      </h2>

      {step.responseType === "text" && (
        <textarea
          className="w-full p-3 border  rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4 min-h-[200px]"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Your response..."
        />
      )}

      {step.responseType === "checklist" && (
        <div className="my-4">
          {step.options?.map((option, optionIndex) => (
            <Checkbox1
              key={optionIndex}
              label={option}
              checked={(userInputCheckbox || []).includes(option)}
              onChange={() => {
                setUserInputCheckbox((prevUserInput) =>
                  prevUserInput.includes(option)
                    ? prevUserInput.filter((item) => item !== option)
                    : [...prevUserInput, option]
                );
              }}
            />
          ))}
        </div>
      )}

      {step.responseType === "slider" && (
        <div className="mb-8">
          <Slider
            defaultValue={[userInput || 1]}
            max={step.sliderMax || 10}
            step={step.sliderMin || 1}
            onValueChange={(value) => {
              setUserInput(value);
            }}
            className="mt-4"
          />
          <div className="flex justify-between mt-2">
            <div>{step.sliderMin}</div>
            <div>{step.sliderMax}</div>
          </div>
          <div className="text-2xl w-full flex justify-center">
            {userInput || 1} / {step.sliderMax || 10}
          </div>
        </div>
      )}

      {step.responseType === "mood" && (
        <MoodSelector
          mood={userInput}
          onSelectMood={(mood) => setUserInput(mood)}
        />
      )}

      <div className="flex gap-2">
        <Button className="w-full" onClick={handleNextStep}>
          <Check /> Complete
        </Button>
        <SkipDialog
          handleSkipStep={handleSkipStep}
          handleNextStep={handleNextStep}
          step={step}
        />
      </div>
    </div>
  );
});

const DashboardPage = observer(() => {
  const pathwaysNotOwnedByUser = MobxStore.pathways.filter(
    (pathway) => pathway.creatorId !== MobxStore.user?.uid
  );

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

  return (
    <div className="m-0 sm:ml-8">
      {pathwayPlaying ? (
        <PathwayPlayer pathway={pathwayPlaying} />
      ) : (
        <div className="m-4 sm:mx-0">
          {/* <HorizontalPathwaysList
            pathways={pathways}
            title="Featured"
            description="Get started with these pathways."
          /> */}

          <HorizontalPathwaysList
            pathways={MobxStore.recentPathways}
            title="Recently Played"
            description="Continue where you left off..."
          />

          <HorizontalPathwaysList
            pathways={MobxStore.topPlayedPathways}
            title="Most Played"
            description="Continue with your most played pathways."
          />

          <HorizontalPathwaysList
            pathways={userPathways}
            title="My Pathways"
            description="From Subcollection Users"
          />
        </div>
      )}
    </div>
  );
});

export default DashboardPage;
