"use client";
import { Switch } from "@/components/ui/switch";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Combobox } from "@/reusable-ui/ComboBox";
import { Button } from "@/components/ui/button";
import { LuTrash } from "react-icons/lu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  dialogClose,
} from "@/components/ui/dialog";
import MobxStore from "@/mobx";
import { usePathname, useRouter } from "next/navigation";
import EmojiPicker from "emoji-picker-react";
import { ChevronDown, ChevronLeft, ChevronUp, Gem } from "lucide-react";
import Circle from "@uiw/react-color-circle";
import { getRandomColor } from "../gamify/page";
import { Slider } from "@/components/ui/slider";
import { ComboBoxCreate } from "@/reusable-ui/ComboBoxCreate";
import { addValueToObjects, truncateString } from "@/utils/transformers";
import { observer } from "mobx-react";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import { DEFAULT_COLORS } from "@/data";
import { premiumUtil } from "@/utils/premium";
import { PremiumLabel } from "@/reusable-ui/ReusableLayout";
import { PricingBox } from "@/landingpage/PricingBox";
import { proData } from "../premium/page";
import { useToast } from "@/components/ui/use-toast";
import { daysOfWeek } from "@/data/static";
import { generateSingleEmoji } from "@/utils/emojis";

const suggestedTimers = [30, 60, 90, 120, 180, 300, 600];

const placeholders = {
  checklist: [
    "Brush teeth",
    "Prepare meal",
    "Read a book",
    "Exercise",
    "Drink water",
    "Meditate",
    "Call a friend",
    "Plan the day",
    "Listen to music",
    "Clean up space",
  ],
};

const DEFAULT_PATHWAY = {
  name: "",
  description: "",
  emoji: "",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  completionLimit: 1,
  reward: 0,
  trigger: "",
  frequency: "unlimited",
  steps: [],
  // autoPlayMusic: false,
  // background: "",
  // timeType: "time",
};

const DEFAULT_STEP = {
  question: "",
  timer: 0,
  responseType: "text",
  autoplay: true,
  // minText: 0,
  // allowSkip: false,
};

const generatePlaceholder = (type, index) => {
  const placeholder = placeholders[type][index];
  return placeholder || "Add Text...";
};

export const DialogEmojiPicker = ({
  emoji,
  backgroundColor = "transparent",
  handleEmojiChange,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex justify-center items-center border border-slate w-fit p-4 text-4xl cursor-pointer rounded"
          style={{
            backgroundColor,
          }}
        >
          {emoji || "🎲"}
        </div>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <EmojiPicker
          skinTonesDisabled
          suggestedEmojisMode="recent"
          emojiStyle="native"
          lazyLoadEmojis={true}
          onEmojiClick={(emojiResponse) => {
            handleEmojiChange(emojiResponse.emoji);
            dialogClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

const QuestionHelpBox = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-2 h-6 ml-1">
        <Button variant="outline">?</Button>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

const ComboBoxWithHelper = ({
  helperChildren,
  title,
  value,
  setValue,
  searchLabel,
  options,
}) => {
  return (
    <div className="flex items-center justify-between rounded mt-6 gap-2">
      <div className="flex justify-center items-center gap-1">
        <div className="text-md font-medium">{title}</div>
        <QuestionHelpBox>{helperChildren}</QuestionHelpBox>
      </div>
      <Combobox
        value={value}
        setValue={setValue}
        searchLabel={searchLabel}
        options={options}
        select
      />
    </div>
  );
};

const SwitchWithHelper = ({ helperChildren, title, value, callback }) => {
  return (
    <div className="flex items-center justify-between rounded mt-6">
      <div className="flex justify-center items-center gap-1">
        <div className="text-md font-medium">{title}</div>
        <QuestionHelpBox>{helperChildren}</QuestionHelpBox>
      </div>
      <Switch checked={value} onCheckedChange={() => callback()} />
    </div>
  );
};

const CheckboxOptions = ({ stepIndex, options, setOptions }) => {
  const handleAddOption = () => {
    const newOptions = [...options, ""];
    setOptions(stepIndex, newOptions);
  };

  const handleOptionChange = (optionIndex, value) => {
    const newOptions = [...options];
    newOptions[optionIndex] = value;
    setOptions(stepIndex, newOptions);
  };

  const handleDeleteOption = (optionIndex) => {
    const newOptions = options.filter((_, index) => index !== optionIndex);
    setOptions(stepIndex, newOptions);
  };

  return (
    <div className="mt-4">
      {options.map((option, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={option}
            placeholder={generatePlaceholder("checklist", index)}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="p-2 border  rounded w-full"
          />
          <button onClick={() => handleDeleteOption(index)} className="ml-2">
            <LuTrash />
          </button>
        </div>
      ))}
      <Button variant="outline" onClick={handleAddOption} className="mt-2">
        + Add Option
      </Button>
    </div>
  );
};

const DayCircle = ({ day, isSelected, onToggle }) => {
  const selectedClass = isSelected ? "bg-primary text-white" : "bg-background";
  return (
    <button
      className={`h-10 w-10 rounded-full border flex items-center justify-center m-1 ${selectedClass}`}
      onClick={() => onToggle(day)}
    >
      {day.charAt(0)}
    </button>
  );
};

const DaysOptions = ({ options, setOptions }) => {
  const toggleDay = (day) => {
    const index = options.indexOf(day);
    const newOptions = [...options];
    if (index > -1) {
      newOptions.splice(index, 1);
    } else {
      newOptions.push(day);
    }
    setOptions(newOptions);
  };

  return (
    <div className="flex justify-start flex-wrap">
      {daysOfWeek.map((day) => (
        <DayCircle
          key={day}
          day={day}
          isSelected={options.includes(day)}
          onToggle={toggleDay}
        />
      ))}
    </div>
  );
};

const DeleteStepModal = ({ handleDeleteStep }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <LuTrash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Are you sure you want to delete this step?</DialogTitle>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button onClick={handleDeleteStep}>Delete</Button>
      </DialogContent>
    </Dialog>
  );
};

const Step = forwardRef(
  (
    {
      step,
      index,
      isOpen,
      toggleStep,
      handleStepChange,
      handleUpdateStepChange,
      handleDeleteStep,
      handleUpdateStepOptions,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        key={index}
        className="flex flex-col my-4  rounded-lg border border-gray justify-center"
      >
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={toggleStep}
        >
          <div className="flex bg-primary text-black text-2xl px-2 w-[40px] text-center h-full items-center justify-center rounded-tl-md rounded-bl-md mr-2">
            {index + 1}
          </div>
          <div className="flex flex-grow text-lg font-bold items-center py-4">
            {step.question && `${truncateString(step.question, 30)}`}
          </div>
          <div className="flex gap-2 items-center pr-2 p-2">
            <DeleteStepModal handleDeleteStep={handleDeleteStep} />

            <Button variant="outline" onClick={toggleStep}>
              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        </div>
        {isOpen && (
          <div className="flex flex-col p-4 border-t">
            <div className="mt-4 text-md font-medium">Question / Action</div>
            <input
              type="text"
              name="question"
              placeholder={`Step ${index + 1} Question`}
              value={step.question}
              onChange={(e) => handleStepChange(index, e)}
              className="mb-2 p-2 border  rounded w-full"
            />

            <div className="mt-4 text-md font-medium">
              Instructions (optional)
            </div>
            <textarea
              type="text"
              name="context"
              placeholder="Add additional context here..."
              multiline
              value={step.context}
              onChange={(e) => handleStepChange(index, e)}
              className="mb-4 p-2 border  rounded h-24"
            />

            <ComboBoxWithHelper
              title="Response Type"
              value={step.responseType}
              setValue={(value) => {
                handleUpdateStepChange(index, "responseType", value);
              }}
              searchLabel={"Response Type"}
              options={[
                {
                  value: "text",
                  label: "Text Input",
                },
                {
                  value: "checklist",
                  label: "Checklist",
                },
                {
                  value: "slider",
                  label: "Slider",
                },
                {
                  value: "mood",
                  label: "Mood Press",
                },
              ]}
              helperChildren={"hey"}
            />

            {step.responseType === "checklist" && (
              <div className="flex flex-col pl-4 border-l">
                <CheckboxOptions
                  stepIndex={index}
                  options={step.options || [""]}
                  setOptions={handleUpdateStepOptions}
                />
              </div>
            )}

            {step.responseType === "slider" && (
              <div className="flex flex-col pl-4 border-l">
                <Slider
                  defaultValue={[1]}
                  max={step.sliderMax || 10}
                  step={step.sliderMin || 1}
                  className="mt-4"
                />
                <div className="flex justify-between mt-2">
                  <div className="w-[100px]">
                    <div className="mt-4 text-md font-medium">Min</div>
                    <input
                      type="number"
                      name="sliderMin"
                      placeholder="1"
                      value={step.sliderMin}
                      onChange={(e) => handleStepChange(index, e)}
                      className="mb-2 p-2 border  rounded w-full"
                    />
                  </div>
                  <div className="w-[100px]">
                    <div className="mt-4 text-md font-medium">Max</div>
                    <input
                      type="number"
                      name="sliderMax"
                      placeholder="10"
                      value={step.sliderMax}
                      onChange={(e) => handleStepChange(index, e)}
                      className="mb-2 p-2 border  rounded w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 text-md font-medium">Timer (In Seconds)</div>
            <div className="flex flex-wrap gap-2 my-4">
              {suggestedTimers.map((timer, i) => (
                <Button
                  key={i}
                  onClick={() =>
                    handleStepChange(index, {
                      target: { name: "timer", value: timer },
                    })
                  }
                  className={` ${
                    timer === step.timer && "bg-primary text-black"
                  }`}
                  variant="outline"
                >
                  {timer >= 60 ? `${timer / 60} min` : `${timer} sec`}
                </Button>
              ))}
            </div>
            <input
              type="number"
              name="timer"
              placeholder="30"
              value={step.timer}
              onChange={(e) => handleStepChange(index, e)}
              className="mb-2 p-2 border  rounded"
            />

            <div className="flex items-center justify-between rounded mt-6">
              <div className="flex justify-center items-center gap-1">
                <div className="text-md font-medium">Auto-Play Timer</div>
              </div>
              <Switch
                checked={step.autoplay}
                onCheckedChange={() => {
                  handleUpdateStepChange(index, "autoplay", !step.autoplay);
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

const PathwayBuilder = observer(({ pathwayToEdit = false }) => {
  const { toast } = useToast();
  const router = useRouter();
  // const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  // const [openMusic, setOpenMusic] = useState(false);
  // const [musicTrack, setMusicTrack] = useState("");
  const [isGamify, setIsGamify] = useState(false);
  const [pathway, setPathway] = useState(pathwayToEdit || DEFAULT_PATHWAY);
  const [hex, setHex] = useState("#F44E3B");
  const [openStepIndex, setOpenStepIndex] = useState(null);
  const stepRefs = useRef([]);

  const { routinesOk } = premiumUtil();

  const pathname = usePathname();

  const {
    editFromInside,
    setPathwayPlaying,
    setIsPathwayEditView,
    triggeredEvents,
    addTrigger,
    user,
  } = MobxStore;

  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, pathway.steps.length);
  }, [pathway.steps.length]);

  useEffect(() => {
    if (pathwayToEdit) {
      setPathway(pathwayToEdit);
    }
  }, [pathwayToEdit]);

  const toggleStep = (index) => {
    const shouldOpen = openStepIndex !== index;
    setOpenStepIndex(shouldOpen ? index : null);

    if (shouldOpen) {
      setTimeout(() => {
        stepRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };
  const handleInputChange = (name, value) => {
    setPathway({ ...pathway, [name]: value });
  };

  const deleteStep = (index) => {
    const newSteps = [...pathway.steps];
    newSteps.splice(index, 1);
    setPathway({ ...pathway, steps: newSteps });
  };

  const addStep = () => {
    setPathway({
      ...pathway,
      steps: [...pathway.steps, DEFAULT_STEP],
    });
    setOpenStepIndex(pathway.steps.length);
  };

  const handleUpdateStepChange = (stepIndex, name, value) => {
    const newSteps = [...pathway.steps];
    newSteps[stepIndex] = { ...newSteps[stepIndex], [name]: value };
    setPathway({ ...pathway, steps: newSteps });
  };

  const handleStepChange = (stepIndex, e) => {
    const newSteps = [...pathway.steps];
    newSteps[stepIndex] = {
      ...newSteps[stepIndex],
      [e.target.name]: e.target.value,
    };
    setPathway({ ...pathway, steps: newSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pathwayToEdit) {
      // If we Update

      await MobxStore.updateUserPathway(pathwayToEdit.id, pathway);

      if (editFromInside) {
        setIsPathwayEditView(false);
      } else {
        setPathwayPlaying(false);
        setIsPathwayEditView(false);
      }
      toast({
        title: "✔️ Routine Saved",
      });
      return;
    }

    if (!pathwayToEdit) {
      // Create
      await MobxStore.addUserPathway(pathway);
      setPathway(DEFAULT_PATHWAY);
      router.push("/dashboard");
    }
  };

  const handleUpdateStepOptions = (stepIndex, newOptions) => {
    const newSteps = [...pathway.steps];
    newSteps[stepIndex].options = newOptions;
    setPathway({ ...pathway, steps: newSteps });
  };

  if (!routinesOk.ok && !pathwayToEdit) {
    return (
      <div className="m-4 sm:m-8 flex">
        <div className="flex flex-col rounded-lg max-w-[480px] w-full">
          <div className="text-2xl font-bold mb-4">Create New Routine</div>
          <PremiumLabel label="routines" />
          <div className="my-2"></div>
          <PricingBox data={proData} />
        </div>
      </div>
    );
  }

  return (
    <div className="m-4 sm:m-8 flex">
      <div className="flex flex-col rounded-lg max-w-[480px] w-full">
        <div className="text-2xl font-bold">
          {pathwayToEdit ? "Edit" : "Create New"} Routine
        </div>
        <div className="mt-4 text-md font-medium">Icon</div>
        <div className="flex gap-4 items-center">
          <DialogEmojiPicker
            emoji={pathway.emoji}
            backgroundColor={pathway.backgroundColor}
            handleEmojiChange={(value) => handleInputChange("emoji", value)}
          />
          <Button
            variant="outline"
            onClick={() => {
              setPathway({
                ...pathway,
                emoji: generateSingleEmoji(),
                backgroundColor: getRandomColor(),
              });
              setHex(getRandomColor());
            }}
          >
            🎲 Random
          </Button>
        </div>

        <div className="mt-4 mb-2 text-md font-medium">Background</div>
        <Circle
          style={{ position: "relative", zIndex: "100 !important" }}
          colors={DEFAULT_COLORS}
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
            handleInputChange("backgroundColor", color.hex);
          }}
        />

        <div className="mt-4 text-md font-medium">Name</div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={pathway.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="mb-4 p-2 border  rounded"
        />
        <div className="mt-4 text-md font-medium">Description</div>
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          value={pathway.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="mb-4 p-2 border  rounded h-24"
        />

        <div className="flex flex-col">
          <ComboBoxWithHelper
            title="Frequency"
            value={pathway.frequency || "unlimited"}
            setValue={(value) => {
              handleInputChange("frequency", value);
            }}
            searchLabel={"Frequency"}
            options={[
              {
                value: "unlimited",
                label: "Unlimited",
              },
              {
                value: "everyday",
                label: "Every Day",
              },
              {
                value: "everyweek",
                label: "Every Week",
              },
              {
                value: "everymonth",
                label: "Every Month",
              },
              {
                value: "everyyear",
                label: "Every Year",
              },
            ]}
            helperChildren={"When will you do this pathway?"}
          />

          {pathway.frequency !== "unlimited" && (
            <div className="flex flex-col pl-4 border-l ">
              <div className="mt-4 text-md font-medium"></div>
              <div>
                <input
                  type="number"
                  name="completionLimit"
                  placeholder="3"
                  value={`${pathway.completionLimit}`}
                  onChange={(e) =>
                    handleInputChange("completionLimit", e.target.value)
                  }
                  className="mb-2 p-2 border  rounded w-[70px] mr-2"
                />
                per{" "}
                {pathway.frequency?.replace("every", "").toLowerCase() || "day"}
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex items-center justify-between  rounded mt-6">
              <div className="flex justify-center items-center gap-1">
                <div className="text-md font-medium">Trigger</div>
                <QuestionHelpBox>help</QuestionHelpBox>
              </div>

              <ComboBoxCreate
                title="Create New Trigger"
                description="This trigger will be saved for future routines."
                value={pathway.trigger}
                searchLabel={"Trigger"}
                options={addValueToObjects(triggeredEvents)}
                setValue={(value) => {
                  handleInputChange("trigger", value);
                }}
                onSave={(value) => {
                  addTrigger(value);
                  handleInputChange("trigger", value.toLowerCase());
                }}
              />
            </div>
          </div>

          {/* FEATURE DISABLED: Show days */}
          {/* <div className="mt-4 text-md font-medium ">Show on Days:</div>
          <div className="flex justify-between items-center">
            <DaysOptions
              options={
                pathway.days || [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ]
              }
              setOptions={(value) => handleInputChange("days", value)}
            />
          </div> */}
        </div>

        <SwitchWithHelper
          title="Gamify Rewards"
          value={isGamify}
          callback={() => setIsGamify(!isGamify)}
          helperChildren={"Gamify is..."}
        />
        {isGamify && (
          <div className="flex flex-col pl-4 border-l">
            <div className="mt-4 text-md font-medium">
              Reward For Completion
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                name="reward"
                placeholder="50"
                value={`${pathway.reward}`}
                onChange={(e) => handleInputChange("reward", e.target.value)}
                className="mb-2 p-2 border  rounded w-[70px] mr-2 text-end"
              />
              <Gem />
            </div>
          </div>
        )}
        <div className="text-2xl font-bold mt-8 flex">
          Steps ({pathway.steps?.length})
        </div>
        {pathway.steps?.map((step, index) => {
          return (
            <Step
              key={index}
              step={step}
              index={index}
              toggleStep={() => toggleStep(index)}
              ref={(el) => (stepRefs.current[index] = el)} // Assign ref
              isOpen={openStepIndex === index}
              handleStepChange={handleStepChange}
              handleUpdateStepChange={handleUpdateStepChange}
              handleDeleteStep={deleteStep}
              handleUpdateStepOptions={handleUpdateStepOptions}
            />
          );
        })}
        <Button
          variant="outline"
          className="mt-4 border-dashed"
          onClick={addStep}
        >
          + Add Step
        </Button>
        <Button className="mt-4 border-dashed" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
      <div class="fixed h-[53px] top-0 left-0 w-full bg-background border b-top flex justify-between items-center">
        <div className="h-[53px] items-center justify-center px-2 mr-4 border-r pr-[26px] hidden sm:flex">
          <Image src={logoImg} width={32} height={32} alt="logo" />
          <div className="text-xl font-bold ml-1">PlayRoutines</div>
        </div>
        <div className="flex flex-grow gap-2 pr-4 sm:pl-0 pl-4 justify-between">
          <Button
            className="w-fit"
            variant="outline"
            onClick={() => {
              if (pathname == "/new-pathway") {
                setPathwayPlaying(false);
                setIsPathwayEditView(false);
                router.push("/dashboard");
              }
              if (editFromInside) {
                setIsPathwayEditView(false);
              } else {
                setPathwayPlaying(false);
                setIsPathwayEditView(false);
              }
            }}
          >
            <ChevronLeft size={20} />
            Back
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
});

export default PathwayBuilder;
