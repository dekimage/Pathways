"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import { observer } from "mobx-react";
import MobxStore from "@/mobx";

import { Slider } from "@/components/ui/slider";
import {
  BadgeInfo,
  Check,
  ChevronDown,
  ChevronLeft,
  Lightbulb,
  StepForward,
} from "lucide-react";

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
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const backgroundCover = "";

const StepExpander = ({ currentStep, pathway }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className="p-2 border flex justify-between flex-col"
      onClick={() => setIsExpanded(true)}
    >
      Step {currentStep + 1}:
      <div>
        <ChevronDown />
      </div>
      {isExpanded && (
        <div>
          {pathway.steps.map((step, index) => (
            <div key={index} className="p-2 border">
              {step.question}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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

  const [userInputs, setUserInputs] = useState({});
  const [timeOver, setTimeOver] = useState(false);

  const { setPathwayPlaying } = MobxStore;

  const audioRef = useRef(null);

  const { isPathwayEditView, setIsPathwayEditView } = MobxStore;

  const { toast } = useToast();

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

  const getResponseForCurrentStep = () => {
    return responses.find((response) => response.stepIndex === currentStep);
  };

  const handleNextStep = () => {
    const newResponse = {
      stepIndex: currentStep,
      question: step.question,
      responseType: step.responseType,
      response: userInputs[currentStep] || "",
      timeSpent: step.timer - timer,
      skipped: false,
    };

    const existingResponseIndex = responses.findIndex(
      (response) => response.stepIndex === currentStep
    );

    if (existingResponseIndex !== -1) {
      // Update the existing response
      const updatedResponses = [...responses];
      updatedResponses[existingResponseIndex] = newResponse;
      setResponses(updatedResponses);
    } else {
      // Add a new response
      setResponses([...responses, newResponse]);
    }

    setUserInputs({
      ...userInputs,
      [currentStep]:
        userInputs[currentStep] || userInput || userInputCheckbox || "",
    });

    if (currentStep < pathway.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimer(pathway.steps[currentStep + 1].timer);
    } else {
      setSessionComplete(true);
    }

    setTimeOver(false);
  };

  const handlePreviousStep = () => {
    if (sessionComplete) {
      return setSessionComplete(false);
    }

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimer(pathway.steps[currentStep - 1].timer);
    } else {
      setPathwayPlaying(null);
    }
    setTimeOver(false);
  };

  const handleSkipStep = () => {
    const newResponse = {
      stepIndex: currentStep,
      question: step.question,
      responseType: step.responseType,
      response: "",
      timeSpent: 0,
      skipped: true,
    };

    const existingResponseIndex = responses.findIndex(
      (response) => response.stepIndex === currentStep
    );

    if (existingResponseIndex !== -1) {
      // Update the existing response
      const updatedResponses = [...responses];
      updatedResponses[existingResponseIndex] = newResponse;
      setResponses(updatedResponses);
    } else {
      // Add a new response
      setResponses([...responses, newResponse]);
    }

    if (currentStep < pathway.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimer(pathway.steps[currentStep + 1].timer);
    } else {
      setSessionComplete(true);
    }
    setTimeOver(false);
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
      <div className="flex flex-col max-w-lg  p-4 rounded-lg shadow-md mt-8 ml-8 border border-gray">
        <Button
          onClick={() => handlePreviousStep()}
          className="w-fit mb-2"
          variant="outline"
        >
          <ChevronLeft /> Back
        </Button>
        <h2 className="text-2xl font-semibold  mb-4">Congratulations!</h2>
        {/* <div className="flex justify-center mb-4">
          {responses.map((res, i) => (
            <div key={i}>
              {!res.skipped && (
                <FaStar key={i} className="text-yellow-400 text-3xl" />
              )}
            </div>
          ))}
        </div> */}
        <div className="mb-4">You ve completed the session!</div>
        <div className="text-sm mb-2">
          Total Duration: {Math.floor(totalDuration / 60)}:
          {totalDuration % 60 < 10
            ? `0${totalDuration % 60}`
            : totalDuration % 60}
        </div>
        <div className="flex flex-col w-full">
          {responses.map((response, index) => (
            <ResponseItem response={response} key={index} index={index} />
          ))}
        </div>
        <Button
          className="w-full mt-2"
          onClick={async () => {
            let pathwayPremiumCopy = false;
            // for original pathways 1. check if original 2. check if already added
            if (pathway.original) {
              console.log("path original", pathway.original);
              const isPathwayAlreadyAdded = MobxStore.userPathways.find(
                (userPathway) => userPathway.premiumId == pathway.premiumId
              );
              console.log({ isPathwayAlreadyAdded });
              if (!isPathwayAlreadyAdded) {
                const newId = await MobxStore.addUserPathway(pathway);
                console.log({ newId });
                pathwayPremiumCopy = { ...pathway, id: newId };
              }
            }

            let pathwayForLog = pathwayPremiumCopy || pathway;
            console.log({ pathwayPremiumCopy });

            MobxStore.addLog(pathwayForLog, {
              pathway: pathwayForLog,
              startTime,
              totalDuration,
              timestamp: Date.now(),

              ...(pathway.gem && { gemEarned: pathway.gem }),
              responses,
            });
            toast({
              title: `Routine Completed!`,
              description: (
                <div className="underline text-blue-400">
                  <Link href={`/analytics`}> View Log</Link>
                </div>
              ),
            });
            setPathwayPlaying(false);
          }}
        >
          Complete
        </Button>
      </div>
    );
  }

  const isNotLastStep = currentStep < pathway.steps.length - 1;

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
        setPathwayPlaying={setPathwayPlaying}
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
        setTimeOver={setTimeOver}
      />

      <div className="text-md mb-2">
        <StepExpander currentStep={currentStep} pathway={pathway} />
        <div className="text-2xl my-2">{step.question}</div>

        {step.context && (
          <div className="py-2 text-sm">
            {/* <Lightbulb size={18} /> */}
            {step.context}
          </div>
        )}
      </div>

      {step.responseType === "text" && (
        <textarea
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4 min-h-[200px]"
          value={userInputs[currentStep] || ""}
          onChange={(e) =>
            setUserInputs({ ...userInputs, [currentStep]: e.target.value })
          }
          placeholder="Your response..."
        />
      )}

      {step.responseType === "checklist" && (
        <div className="my-4">
          {step.options?.map((option, optionIndex) => (
            <Checkbox1
              key={optionIndex}
              label={option}
              checked={(userInputs[currentStep] || []).includes(option)}
              onChange={() => {
                const updatedCheckbox = (
                  userInputs[currentStep] || []
                ).includes(option)
                  ? (userInputs[currentStep] || []).filter(
                      (item) => item !== option
                    )
                  : [...(userInputs[currentStep] || []), option];
                setUserInputs({
                  ...userInputs,
                  [currentStep]: updatedCheckbox,
                });
              }}
            />
          ))}
        </div>
      )}

      {step.responseType === "slider" && (
        <div className="mb-8">
          <Slider
            defaultValue={[userInputs[currentStep] || 1]}
            max={step.sliderMax || 10}
            step={step.sliderMin || 1}
            onValueChange={(value) => {
              setUserInputs({ ...userInputs, [currentStep]: value[0] });
            }}
            className="mt-4"
          />
          <div className="flex justify-between mt-2">
            <div>{step.sliderMin}</div>
            <div>{step.sliderMax}</div>
          </div>
          <div className="text-2xl w-full flex justify-center">
            {userInputs[currentStep] || 1} / {step.sliderMax || 10}
          </div>
        </div>
      )}

      {step.responseType === "mood" && (
        <MoodSelector
          mood={userInputs[currentStep]}
          onSelectMood={(mood) =>
            setUserInputs({ ...userInputs, [currentStep]: mood })
          }
        />
      )}

      <div className="flex gap-2">
        <Button className="w-full" onClick={handleNextStep}>
          {isNotLastStep ? <StepForward size={14} /> : <Check size={14} />}{" "}
          <span className="ml-1">{isNotLastStep ? "Next" : "Finish"}</span>
        </Button>
        <Button onClick={() => handleSkipStep()} variant="outline">
          Skip
        </Button>
        {/* <SkipDialog
          handleSkipStep={handleSkipStep}
          handleNextStep={handleNextStep}
          step={step}
        /> */}
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
          <HorizontalPathwaysList
            pathways={MobxStore.recentPathways}
            title="Recently Played"
            description="Continue where you left off..."
          />

          <HorizontalPathwaysList
            pathways={MobxStore.topPlayedPathways}
            title="Most Played"
            description="Continue with your most played routines."
          />

          <HorizontalPathwaysList
            pathways={userPathways}
            title="My Routines"
            description="Routines you created or modified"
          />
        </div>
      )}
    </div>
  );
});

export default DashboardPage;
