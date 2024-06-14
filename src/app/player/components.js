import { Checkbox } from "@/components/ui/checkbox";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { MdClose, MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md";

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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, ChevronUp, Hourglass } from "lucide-react";
import { FancyTag } from "../analytics/page";
import { formatSecondsToHumanReadable } from "@/utils/date";

export const MoodSelector = ({ mood, onSelectMood, showSingle = false }) => {
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

export const Checkbox1 = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-3 mb-2 cursor-pointer my-2 border p-2 w-full">
      <Checkbox id={label} />
      <label
        htmlFor={label}
        className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};
// const Checkbox = ({ label, checked, onChange }) => {
//   return (
//     <label className="flex items-center space-x-3 cursor-pointer my-2 w-fit">
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={onChange}
//         className={`form-checkbox h-5 w-5 text-black ${
//           checked ? "bg-black" : "bg-white border"
//         }`}
//       />
//       <span className="text-xl">{label}</span>
//     </label>
//   );
// };

export const ResponseItem = ({ response, index }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="flex flex-col  mb-4 p-2 rounded-lg w-full border">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {index + 1}. {response.question}
        </span>
        {/* <span className="text-sm">{response.timeSpent} seconds</span> */}

        <Button
          variant="ghost"
          className="flex gap-2 items-center"
          onClick={() => setIsShowing(!isShowing)}
        >
          {isShowing ? "Hide" : "View"}{" "}
          {isShowing ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      {isShowing && (
        <div className="flex flex-col gap-2">
          <div className="border-t mt-3">
            <div className="mt-3">
              {!response.skipped && (
                <div className="mt-4 text-md bg-muted p-2 rounded">
                  {response.response}
                </div>
              )}

              {response.skipped ? (
                <FancyTag color="red" text="Skipped" />
              ) : (
                <div className="flex gap-2 mt-4 items-center">
                  <FancyTag color="green" text="Completed" />
                  <div className="border border-slate-200 p-1 rounded">
                    <Hourglass size="16px" />
                  </div>
                  <div className="text-sm">
                    {formatSecondsToHumanReadable(response.timeSpent)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* {isShowing && (
        <div className="rounded-lg mt-2 p-4 bg-muted">
          {response.responseType == "checklist" &&
            response.response.map((r) => <div key={r}>{r}</div>)}

          {response.responseType == "text" && <div>{response.response}</div>}

          {response.responseType == "slider" && <div>{response.response}</div>}

          {response.responseType == "mood" && (
            <MoodSelector mood={response.response} showSingle />
          )}
        </div>
      )} */}
    </div>
  );
};

export const PathwayPlayerHeader = ({
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

export const ProgressBar = ({ currentStep, pathway }) => {
  const totalSteps = pathway.steps.length;

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex-1 mr-4">
        <div className="w-full flex rounded-full  h-2.5">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`flex-1 h-2.5 transition-all duration-300 ${
                index < currentStep ? "bg-primary" : "bg-muted"
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

export const SkipDialog = ({ handleSkipStep, handleNextStep, step }) => {
  const [selectedOption, setSelectedOption] = useState("skip");

  const handleSelect = () => {
    if (selectedOption === "skip") {
      handleSkipStep();
    } else if (selectedOption === "change") {
      handleNextStep();
    } else if (selectedOption === "move") {
      handleNextStep();
    }
  };

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
            <DrawerClose asChild>
              <Button onClick={handleSelect}>Select</Button>
            </DrawerClose>

            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
