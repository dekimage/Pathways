import MobxStore from "@/mobx";

const FREE_LIMITS = {
  customPathways: 3,
  lists: 2,
  gamification: false,
  logDays: 7,
};

const PREMIUM_LIMITS = {
  customPathways: Infinity,
  lists: Infinity,
  gamification: true,
  logDays: Infinity,
};

export function premiumUtil() {
  const { userPathways, lists, logs, templates, user } = MobxStore;
  const { isPremium } = user;

  const limits = isPremium ? PREMIUM_LIMITS : FREE_LIMITS;

  return {
    routinesOk: {
      ok: userPathways.length < limits.customPathways,
      limit: limits.customPathways,
      current: userPathways.length,
    },
    listsOk: {
      ok: lists.length < limits.lists,
      limit: limits.lists,
      current: lists.length,
    },
    gamifyOk: isPremium,
    analyticsOk: { ok: isPremium, limit: limits.logDays },
  };
}
