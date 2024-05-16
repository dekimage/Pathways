"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogEmojiPicker } from "../new-pathway/page";
import { useEffect, useState } from "react";
import { Combobox } from "@/reusable-ui/ComboBox";

import Circle from "@uiw/react-color-circle";
import MobxStore from "@/mobx";
import { observer } from "mobx-react";
import { ChevronLeft, Gem } from "lucide-react";
import { TitleDescription } from "../today/pathwaycomponents";
import { DEFAULT_COLORS } from "@/data";
import { SkeletonDemo } from "@/reusable-ui/Skeleton";
import Link from "next/link";
import { premiumUtil } from "@/utils/premium";

export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * DEFAULT_COLORS.length);
  return DEFAULT_COLORS[randomIndex];
}

const STATIC_MAX_PURCHASE_LIMITS = [
  { value: "unlimited", label: "Unlimited" },
  { value: "single", label: "Single" },
  { value: "every day", label: "Every day" },
  { value: "every week", label: "Every week" },
  { value: "every month", label: "Every month" },
  { value: "every year", label: "Every year" },
  { value: "custom", label: "Custom" },
];

const defaultReward = {
  cost: null,
  name: "",
  emoji: "🎁",
  timesPurchased: 0,
  maxPurchaseLimit: "unlimited",
  backgroundColor: "transparent",
};

const RewardBuilder = ({
  setIsCreate,
  rewardState,
  setRewardState,
  gamifyOk,
}) => {
  const [hex, setHex] = useState("#F44E3B");
  console.log(rewardState);
  const [reward, setReward] = useState(
    rewardState ? rewardState : defaultReward
  );

  useEffect(() => {
    if (!rewardState) return;

    setReward(rewardState);
  }, [rewardState]);

  const saveReward = (reward) => {
    if (rewardState) {
      MobxStore.updateReward(reward);
    } else {
      MobxStore.addReward(reward);
    }
    setIsCreate(false);
    setRewardState(null);
  };

  const handleInputChange = (name, value) => {
    setReward({ ...reward, [name]: value });
  };

  return (
    <div>
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => setIsCreate(false)}
      >
        <ChevronLeft size="16" /> Back
      </Button>
      <TitleDescription
        title={rewardState ? "Edit Reward" : "Create New Reward"}
        description="Buy rewards using coins you earn by completing pathways"
      />
      <div className="flex flex-col">
        <label className="mt-4 text-md font-medium">Icon</label>
        <DialogEmojiPicker
          emoji={reward.emoji}
          backgroundColor={reward.backgroundColor}
          handleEmojiChange={(value) => handleInputChange("emoji", value)}
        />

        <label className="mt-4 mb-2 text-md font-medium">Background</label>
        <Circle
          colors={DEFAULT_COLORS}
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
            handleInputChange("backgroundColor", color.hex);
          }}
        />
        <label className="mt-4 text-md font-medium">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Watch 20 minutes of Netflix"
          value={reward.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="p-2 border rounded"
        />
        <label className="mt-4 text-md font-medium">Cost</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            name="cost"
            placeholder={100}
            value={reward.cost}
            onChange={(e) => handleInputChange("cost", e.target.value)}
            className="p-2 border rounded max-w-[80px]"
          />
          <div className="text-2xl">
            <Gem />
          </div>
        </div>
        <label className="mt-4 text-md font-medium">Max Purchase Limit</label>
        <Combobox
          value={reward.maxPurchaseLimit}
          setValue={(value) => handleInputChange("maxPurchaseLimit", value)}
          options={STATIC_MAX_PURCHASE_LIMITS}
          select
        />
        {reward.maxPurchaseLimit === "custom" && (
          <div className="flex items-center gap-2 mt-4 ml-4">
            <input
              type="number"
              name="cost"
              placeholder={3}
              value={reward.customTimes}
              onChange={(e) => handleInputChange("customTimes", e.target.value)}
              className="p-2 border rounded max-w-[80px]"
            />
            <div>times in</div>
            <input
              type="number"
              name="cost"
              placeholder={1}
              value={reward.customDays}
              onChange={(e) => handleInputChange("customDays", e.target.value)}
              className="p-2 border rounded max-w-[80px]"
            />
            <div>{reward.customDays > 1 ? "days" : "day"}</div>
          </div>
        )}
        {gamifyOk ? (
          <Button className="mt-4" onClick={() => saveReward(reward)}>
            Save
          </Button>
        ) : (
          <Link href="/premium" className="mt-4 w-full">
            <Button className="mt-4 w-full">Upgrade to Premium</Button>
          </Link>
        )}

        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            setIsCreate(false);
            setRewardState(null);
          }}
        >
          Cancel
        </Button>
        {rewardState && (
          <Button
            variant="destructive"
            className="mt-4"
            onClick={() => {
              MobxStore.deleteReward(reward);
              setIsCreate(false);
              setRewardState(null);
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

const Reward = ({
  reward,
  setIsCreate,
  isCreate,
  rewardState,
  setRewardState,
}) => {
  const {
    cost,
    name,
    emoji,
    timesPurchased,
    maxPurchaseLimit,
    isPathway, // if its pathway - play pathway, disable only after completed!
  } = reward;
  return (
    <div className="flex items-center justify-between  p-2 border rounded-md">
      <div className="flex items-center">
        <div
          className="text-2xl mr-2 border-gray border p-4 rounded"
          style={{ backgroundColor: reward.backgroundColor }}
        >
          {emoji}
        </div>
      </div>
      <div className="flex flex-col gap-1 flex-grow">
        <div className="text-md">{name}</div>
        <div className="flex gap-2">
          <div className="flex justify-center items-center gap-1">
            {cost} <Gem size={16} />
          </div>
          <Badge variant="outline" className="">
            {maxPurchaseLimit}
          </Badge>
        </div>
      </div>
      <div className="flex items-center flex-grow justify-end gap-2 sm:flex-row flex-col">
        <Button
          variant="outline"
          onClick={() => {
            setRewardState(reward);
            setIsCreate(true);
          }}
        >
          Edit
        </Button>
        <Button onClick={() => MobxStore.buyReward(reward)}>Buy</Button>

        {/* <div className="text-lg ml-2">{timesPurchased}</div> */}
      </div>
    </div>
  );
};

const GamifyPage = observer(() => {
  const [isCreate, setIsCreate] = useState(false);
  const [rewardState, setRewardState] = useState(null);
  const { gamifyOk } = premiumUtil();
  return (
    <div className="h-full max-w-[600px] m-4 sm:mx-8">
      {isCreate ? (
        <RewardBuilder
          setIsCreate={setIsCreate}
          rewardState={rewardState}
          setRewardState={setRewardState}
        />
      ) : (
        <>
          <TitleDescription
            title="Rewards"
            description="Spend gems to buy custom rewards."
            button={
              <Button
                className="mt-2 sm:mt-0"
                onClick={() => {
                  setRewardState(null);
                  setIsCreate(true);
                }}
              >
                + Create Reward
              </Button>
            }
          />

          {!gamifyOk && (
            <Link
              href="/premium"
              className="text-xs flex gap-2 items-center p-2 border rounded bg-yellow-100 my-2 text-black"
            >
              Gamification is a premium feature. Upgrade to
              <Badge>Premium</Badge> for unlimited rewards.
            </Link>
          )}

          <div className="flex flex-col gap-4 mb-4">
            {MobxStore.rewards.map((reward, index) => (
              <Reward
                key={index}
                reward={reward}
                setIsCreate={setIsCreate}
                isCreate={isCreate}
                rewardState={rewardState}
                setRewardState={setRewardState}
              />
            ))}

            {MobxStore.rewards.length === 0 &&
              Array.from({ length: 6 }).map((_, i) => <SkeletonDemo key={i} />)}
          </div>
        </>
      )}
    </div>
  );
});

export default GamifyPage;
