import MobxStore from "@/mobx";

const FREE_LIMITS = {
  customPathways: 2,
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
  const { isPremium, pathways, lists, logs, templates } = MobxStore;

  const limits = isPremium ? PREMIUM_LIMITS : FREE_LIMITS;

  return {
    routinesOk: {
      ok: pathways.length < limits.customPathways,
      limit: limits.customPathways,
      current: pathways.length,
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
