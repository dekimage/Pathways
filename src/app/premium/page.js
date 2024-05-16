"use client";

import { PricingBox } from "@/landingpage/PricingBox";
import MobxStore from "@/mobx";
import { LoadingSpinner } from "@/reusable-ui/LoadingSpinner";

const freeData = {
  title: "Free",
  description: "Try the app with limited features",
  price: "$0",
  features: [
    "5 Premium Routines from famous people and books",
    "3 Custom Routines",
    "2 Lists",
    "7 Days Analytics",
  ],
  cta: "Start for Free",
};

const proData = {
  title: "Premium",
  description: "One time payment for one year",
  price: "$99",
  features: [
    "50 Premium Routines from famous people and books",
    "Unlimited Custom Routines",
    "Unlimited Lists",
    "Unlimited Analytics",
    "Gamification Feature",
  ],
  cta: "Change your life",
};

const Pricing = () => {
  const { user, authLoading } = MobxStore;

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex justify-center p-8 gap-8 flex-col md:flex-row lg:flex-row">
      <PricingBox data={proData} isAuthenticated={!!user} />
      <PricingBox data={freeData} isAuthenticated={!!user} />
    </div>
  );
};
export default Pricing;
