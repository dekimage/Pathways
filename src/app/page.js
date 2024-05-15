"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaRedo, FaStar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { MdClose } from "react-icons/md";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md";
import PathwayBuilder from "./new-pathway/page";
import logoImg from "@/assets/logo.png";
import { observer } from "mobx-react";
import MobxStore from "@/mobx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { LoadingSpinner } from "@/reusable-ui/LoadingSpinner";
import { Slider } from "@/components/ui/slider";
import { Check, CheckCircle2, MoreVertical, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatTimeFromSteps } from "@/utils/transformers";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import TimerNew from "@/components/TimerNew";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

//move to static
const frequencyLookup = {
  everyday: "today",
  everyweek: "week",
  everymonth: "month",
  everyyear: "year",
};

// to reusable UI
const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer my-2 w-fit">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`form-checkbox h-5 w-5 text-black ${
          checked ? "bg-black" : "bg-white border"
        }`}
      />
      <span className="text-xl">{label}</span>
    </label>
  );
};

const backgroundCover = "";

const MoodSelector = ({ mood, onSelectMood, showSingle = false }) => {
  const moodEmojis = [
    { mood: "Happy", emoji: "😊" },
    { mood: "Sad", emoji: "😔" },
    { mood: "Angry", emoji: "😠" },
    { mood: "Surprised", emoji: "😲" },
    { mood: "Calm", emoji: "😌" },
  ];

  const [selectedMood, setSelectedMood] = useState(mood || "");

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    onSelectMood(mood);
  };

  if (showSingle) {
    const { mood, emoji } = moodEmojis.find((m) => m.mood === selectedMood) || {
      mood: "",
      emoji: "",
    };
    return (
      <div
        key={mood}
        className={`text-4xl ${
          selectedMood === mood ? "opacity-100" : "opacity-60"
        } focus:outline-none`}
      >
        {emoji}
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-2 mb-8">
      {moodEmojis.map(({ mood, emoji }) => (
        <button
          key={mood}
          className={`text-4xl ${
            selectedMood === mood ? "opacity-100" : "opacity-60"
          } focus:outline-none`}
          onClick={() => handleMoodClick(mood)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

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

{
  /* <Carousel
opts={{
  align: "start",
}}
className="w-full"
>
<CarouselContent>
  {pathways.map((pathway, i) => (
    <CarouselItem key={i} className="lg:basis-1/4 w-[270px]">
      <PathwayCard key={i} pathway={pathway} />
    </CarouselItem>
  ))}
</CarouselContent>
<CarouselPrevious />
<CarouselNext />
</Carousel> */
}

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

const ResponseItem = ({ response, index }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="flex flex-col bg-gray-100 mb-2 p-2 rounded-lg w-full">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Step {index + 1}:
        </span>
        <span className="text-sm text-gray-500">
          {response.timeSpent} seconds
        </span>

        {response.skipped ? (
          <div className="w-[60px]"></div>
        ) : (
          <button
            className="py-2 px-4 text-white rounded text-sm"
            onClick={() => setIsShowing(!isShowing)}
          >
            {isShowing ? "Hide" : "View"}
          </button>
        )}
      </div>
      {isShowing && (
        <div className="rounded-lg mt-2 p-4">
          {response.responseType == "checklist" &&
            response.response.map((r) => <div key={r}>{r}</div>)}

          {response.responseType == "text" && <div>{response.response}</div>}

          {response.responseType == "slider" && <div>{response.response}</div>}

          {response.responseType == "mood" && (
            <MoodSelector mood={response.response} showSingle />
          )}
        </div>
      )}
    </div>
  );
};

const PathwayPlayerHeader = ({
  pathway,
  isMusicPlaying,
  handlePreviousStep,
  setIsMusicPlaying,
  setIsPathwayEditView,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        className=" rounded-full hover:bg-gray-100"
        onClick={handlePreviousStep}
      >
        <IoIosArrowBack size={20} className="text-slate-600" />
      </button>
      <div className="flex items-center">
        <div
          className="w-fit mr-1 p-1 rounded"
          style={{ background: pathway.backgroundColor }}
        >
          {pathway.emoji}
        </div>
        <div className="text-xl font-bold">{pathway.name}</div>
      </div>

      <div>
        <button
          className="mr-2 rounded-full hover:bg-gray-100"
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        >
          {isMusicPlaying ? (
            <MdOutlineMusicOff size={20} className="text-slate-600" />
          ) : (
            <MdOutlineMusicNote size={20} className="text-slate-600" />
          )}
        </button>

        <button
          className="mr-2 rounded-full hover:bg-gray-100"
          onClick={() => setIsPathwayEditView(true)}
        >
          <HiOutlineCog6Tooth size={20} className="text-slate-600" />
        </button>
        <button
          className="rounded-full hover:bg-gray-100"
          onClick={() => setPathwayPlaying(null)}
        >
          <MdClose size={20} className="text-slate-600" />
        </button>
      </div>
    </div>
  );
};

const ProgressBar = ({ currentStep, pathway }) => {
  const totalSteps = pathway.steps.length;

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex-1 mr-4">
        <div className="w-full flex rounded-full  h-2.5">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`flex-1 h-2.5 transition-all duration-300 ${
                index < currentStep ? "bg-primary" : "bg-gray-300"
              } ${index !== totalSteps - 1 ? "mr-0.5" : ""} rounded-full`}
            ></div>
          ))}
        </div>
      </div>
      <span className="text-sm font-medium text-gray-700">
        {currentStep}/{totalSteps}
      </span>
    </div>
  );
};

// const SkipDialog = ({ handleNextStep, step }) => {
//   return (
//     <Dialog isOpen={true} onClose={() => {}}>
//       <DialogTrigger>
//         <Button variant="outline" className="w-full">
//           Skip
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <div className="flex flex-col items-center justify-center">
//           <Button onClick={handleNextStep}>Next</Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

const SkipDialog = ({ handleNextStep, step }) => {
  const [selectedOption, setSelectedOption] = useState("skip");

  const isSkip = selectedOption === "skip";
  const isChange = selectedOption === "change";
  const isMove = selectedOption === "move";
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Skip</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Do you want to skip?</DrawerTitle>
            <DrawerDescription>
              Select the option you like best
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex flex-col items-center justify-center gap-2">
              <div
                className={`px-6 py-2 rounded border flex items-center w-[350px] cursor-pointer ${
                  isSkip && "border border-2 border-primary"
                }`}
                onClick={() => setSelectedOption("skip")}
              >
                {isSkip && (
                  <div className="bg-primary w-4 h-4 rounded-full mr-2"></div>
                )}
                Skip today
              </div>
              <div
                className={`px-6 py-2 rounded border flex items-center  w-[350px] cursor-pointer ${
                  isChange && "border border-2 border-primary"
                }`}
                onClick={() => setSelectedOption("change")}
              >
                {isChange && (
                  <div className="bg-primary w-4 h-4 rounded-full mr-2"></div>
                )}
                Change the order
              </div>
              <div
                className={`px-6 py-2 rounded border flex items-center  w-[350px] cursor-pointer ${
                  isMove && "border border-2 border-primary"
                }`}
                onClick={() => setSelectedOption("move")}
              >
                {isMove && (
                  <div className="bg-primary w-4 h-4 rounded-full mr-2"></div>
                )}
                Move step to end
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Select</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
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

  const [distractions, setDistractions] = useState(null);
  const [feedback, setFeedback] = useState(null);
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
        // variable response type based on the responseType
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

  const canProceed = true;
  // timer === 0 && userInput.length >= step.minText;

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
              ...(distractions && {
                distractions: distractions,
              }),
              ...(feedback && { feedback }),
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
            <Checkbox
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
          {/* {step.buttonText || "Complete"} */}
          <Check /> Complete
        </Button>
        <SkipDialog handleNextStep={handleNextStep} step={step} />
      </div>

      {/* {step.allowSkip && (
        <Button variant="outline" className="mt-2" onClick={handleSkipStep}>
          Skip
        </Button>
      )} */}
    </div>
  );
});

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
            {/* <div className="w-32 h-16 bg-yellow-500 rounded-full blur-md"></div>
            <div className="w-32 h-16 bg-orange-500 rounded-lg blur-md"></div>
             */}
            <div
              className="w-28 h-20  rounded-xl blur-lg"
              style={{ backgroundColor: backgroundColor }}
            ></div>
          </div>
          {/* <div className="absolute inset-0 flex justify-center items-center space-x-4 top-[260px] left-[150px] z-[-100]">
            <div className="w-20 h-12 bg-yellow-500 rounded-xl blur-md"></div>
          </div> */}

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

const QuestsBuilder = observer(() => {
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
    <div className="m-0 sm:mx-8">
      {/* <HeroSection bgImg={backgroundCover} logo={questsLogo} /> */}

      {pathwayPlaying ? (
        <PathwayPlayer pathway={pathwayPlaying} />
      ) : (
        <div className="m-4 sm:mx-8">
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

export default QuestsBuilder;
