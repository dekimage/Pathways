import { makeAutoObservable, runInAction } from "mobx";
import { auth, db } from "./firebase";
import {
  onAuthStateChanged,
  signInAnonymously,
  getAuth,
  EmailAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  query,
  onSnapshot,
  updateDoc,
  getDocs,
  where,
  orderBy,
  limit,
  increment,
} from "firebase/firestore";

import Logger from "@/utils/logger";
import { shouldResetProgress } from "@/utils/date";

const DEFAULT_USER = {
  gem: 0,
  level: 1,
  streak: 0,
  xp: 0,
};

const logger = new Logger({ debugEnabled: false }); // switch to true to see console logs from firebase
const MAX_LOGS_PER_DAY = 5; // change this to user controlled per pathway - pathway.maxLogsPerDay
const ONE_DAY = 24 * 60 * 60 * 1000;

class Store {
  // App Data
  authLoading = true;
  logs = [];
  user = null;
  rewards = [];
  pathways = [];
  recentPathways = [];
  topPlayedPathways = [];
  userPathways = [];
  //new
  triggeredEvents = [];
  lists = [];

  // App States
  isMobileOpen = false;
  loading = false;
  pathwayPlaying = false;
  isPathwayEditView = false;
  editFromInside = true;

  constructor() {
    makeAutoObservable(this);
    this.initializeAuth();
    this.setPathwayPlaying = this.setPathwayPlaying.bind(this);
    this.setIsPathwayEditView = this.setIsPathwayEditView.bind(this);
    this.setIsMobileOpen = this.setIsMobileOpen.bind(this);
    this.addTrigger = this.addTrigger.bind(this);
    this.addReward = this.addReward.bind(this);
    this.updateReward = this.updateReward.bind(this);
    this.deleteReward = this.deleteReward.bind(this);
    this.addUserPathway = this.addUserPathway.bind(this);
    this.publishPathway = this.publishPathway.bind(this);
    this.updatePathway = this.updatePathway.bind(this);
    this.updateUserPathway = this.updateUserPathway.bind(this);
    this.createPathwayCopy = this.createPathwayCopy.bind(this);
    this.getOrCreateUserPathwayCopy =
      this.getOrCreateUserPathwayCopy.bind(this);
    this.addLog = this.addLog.bind(this);
    this.buyReward = this.buyReward.bind(this);
    this.fetchUserRewards = this.fetchUserRewards.bind(this);
    this.fetchUserPathways = this.fetchUserPathways.bind(this);
    this.fetchLogs = this.fetchLogs.bind(this);
    this.fetchTopPlayedPathways = this.fetchTopPlayedPathways.bind(this);
    this.fetchRecentPathways = this.fetchRecentPathways.bind(this);
    this.fetchTriggers = this.fetchTriggers.bind(this);
    this.deleteTrigger = this.deleteTrigger.bind(this);
    this.addList = this.addList.bind(this);
    this.fetchLists = this.fetchLists.bind(this);
    this.findPathwaysByListId = this.findPathwaysByListId.bind(this);
    this.addPathwayToList = this.addPathwayToList.bind(this);
    this.upgradeAccount = this.upgradeAccount.bind(this);
    this.loginWithEmail = this.loginWithEmail.bind(this);
    this.signupWithEmail = this.signupWithEmail.bind(this);
    this.deletePathway = this.deletePathway.bind(this);
    this.removePathwayFromLists = this.removePathwayFromLists.bind(this);
    this.updatePathwayInState = this.updatePathwayInState.bind(this);
    this.updatePathwayData = this.updatePathwayData.bind(this);
    this.deleteLog = this.deleteLog.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.editListName = this.editListName.bind(this);
    this.findPathwayById = this.findPathwayById.bind(this);
    this.updateStreak = this.updateStreak.bind(this);
    this.checkAndResetStreak = this.checkAndResetStreak.bind(this);
    this.checkAndResetProgress = this.checkAndResetProgress.bind(this);
    this.updateUserStats = this.updateUserStats.bind(this);
  }
  async updateUserStats(updates) {
    try {
      if (!this.user) {
        throw new Error("User not authenticated.");
      }

      const userDocRef = doc(db, "users", this.user.uid);
      const currentUserData = { ...this.user };
      const updatesObject = {};

      updates.forEach(({ key, value }) => {
        const currentValue = currentUserData[key] || 0;
        const newValue = currentValue + value;
        updatesObject[key] = newValue;
      });

      // Update the Firestore document with the new values
      await updateDoc(userDocRef, updatesObject);

      // Update the MobX store with the new values
      runInAction(() => {
        updates.forEach(({ key, value }) => {
          this.user[key] = (this.user[key] || 0) + value;
        });
      });

      // console.log("User stats updated:", updatesObject);
    } catch (error) {
      console.error("Error updating user stats:", error);
    }
  }
  // async initializeAuth() {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       try {
  //         const userDocRef = doc(db, "users", user.uid);
  //         const userDoc = await getDoc(userDocRef);

  //         runInAction(() => {
  //           if (!userDoc.exists()) {
  //             const newUser = {
  //               ...DEFAULT_USER,
  //               uid: user.uid,
  //               provider: "anonymous",
  //               username: "Guest",
  //               createdAt: new Date(),
  //             };
  //             setDoc(userDocRef, newUser).then(() => {
  //               this.user = newUser;
  //             });
  //           } else {
  //             this.user = { uid: user.uid, ...userDoc.data() };
  //           }

  //           this.fetchUserData(); // Fetch all user-related data
  //           this.checkAndResetStreak();
  //         });
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //         runInAction(() => {
  //           this.user = null;
  //         });
  //       }
  //     } else {
  //       runInAction(() => {
  //         this.user = null;
  //       });
  //     }
  //     runInAction(() => {
  //       this.authLoading = false;
  //     });
  //   });
  // }

  async initializeAuth() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          runInAction(() => {
            if (!userDoc.exists()) {
              const newUser = {
                ...DEFAULT_USER,
                uid: user.uid,
                provider: "anonymous",
                username: "Guest",
                createdAt: new Date(),
              };
              setDoc(userDocRef, newUser).then(() => {
                this.user = newUser;
              });
            } else {
              this.user = { uid: user.uid, ...userDoc.data() };
            }
          });

          await this.fetchUserData(); // Fetch all user-related data
          await this.checkAndResetStreak();
          await this.checkAndResetProgress(); // Ensure this runs after fetching data
        } catch (error) {
          console.error("Error fetching user data:", error);
          runInAction(() => {
            this.user = null;
          });
        }
      } else {
        runInAction(() => {
          this.user = null;
        });
      }
      runInAction(() => {
        this.authLoading = false;
      });
    });
  }

  async fetchUserData() {
    try {
      await Promise.all([
        this.fetchPathways(),
        this.fetchUserPathways(),
        this.fetchUserRewards(),
        this.fetchLogs(),
        this.fetchTopPlayedPathways(),
        this.fetchRecentPathways(),
        this.fetchTriggers(),
        this.fetchLists(),
      ]);
    } catch (error) {
      console.error("Error fetching user-related data:", error);
    }
  }
  async checkAndResetProgress(overrideDate = null) {
    try {
      const today =
        overrideDate ||
        new Date(
          new Date().toLocaleString("en-US", {
            timeZone: this.user.timezone || "UTC",
          })
        );
      today.setHours(0, 0, 0, 0); // Normalize to start of the day

      const lastDailyReset = this.user.lastDailyReset
        ? this.user.lastDailyReset.toDate()
        : null;
      const lastWeeklyReset = this.user.lastWeeklyReset
        ? this.user.lastWeeklyReset.toDate()
        : null;
      const lastMonthlyReset = this.user.lastMonthlyReset
        ? this.user.lastMonthlyReset.toDate()
        : null;
      const lastYearlyReset = this.user.lastYearlyReset
        ? this.user.lastYearlyReset.toDate()
        : null;

      const dailyResetRequired =
        !lastDailyReset ||
        today.getTime() - lastDailyReset.getTime() >= ONE_DAY;
      const weeklyResetRequired =
        !lastWeeklyReset ||
        today.getTime() - lastWeeklyReset.getTime() >= 7 * ONE_DAY;
      const monthlyResetRequired =
        !lastMonthlyReset ||
        today.getMonth() !== lastMonthlyReset.getMonth() ||
        today.getFullYear() !== lastMonthlyReset.getFullYear();
      const yearlyResetRequired =
        !lastYearlyReset ||
        today.getFullYear() !== lastYearlyReset.getFullYear();

      // console.log("dailyResetRequired:", dailyResetRequired);
      // console.log("weeklyResetRequired:", weeklyResetRequired);
      // console.log("monthlyResetRequired:", monthlyResetRequired);
      // console.log("yearlyResetRequired:", yearlyResetRequired);

      const updates = [];
      const updatedPathways = [];

      this.userPathways.forEach((pathway) => {
        let resetRequired = false;

        switch (pathway.frequency) {
          case "everyday":
            resetRequired = dailyResetRequired;
            break;
          case "everyweek":
            resetRequired = weeklyResetRequired;
            break;
          case "everymonth":
            resetRequired = monthlyResetRequired;
            break;
          case "everyyear":
            resetRequired = yearlyResetRequired;
            break;
          default:
            console.error("Unknown frequency:", pathway.frequency);
        }

        if (resetRequired && pathway.progress !== 0) {
          const pathwayRef = doc(
            db,
            `users/${this.user.uid}/myPathways`,
            pathway.id
          );
          updates.push(updateDoc(pathwayRef, { progress: 0 }));
          updatedPathways.push({ ...pathway, progress: 0 });
          console.log(`Resetting progress for pathway: ${pathway.id}`);
        } else {
          updatedPathways.push(pathway);
        }
      });

      await Promise.all(updates);

      const userUpdates = {};
      if (dailyResetRequired) {
        userUpdates.lastDailyReset = today;
      }
      if (weeklyResetRequired) {
        userUpdates.lastWeeklyReset = today;
      }
      if (monthlyResetRequired) {
        userUpdates.lastMonthlyReset = today;
      }
      if (yearlyResetRequired) {
        userUpdates.lastYearlyReset = today;
      }

      if (Object.keys(userUpdates).length > 0) {
        await updateDoc(doc(db, "users", this.user.uid), userUpdates);
      }

      runInAction(() => {
        this.userPathways = updatedPathways;
      });

      console.log("Progress has been reset where necessary");
    } catch (error) {
      console.error("Error checking and resetting progress:", error);
    }
  }

  async forceResetProgress() {
    try {
      const today = new Date(
        new Date().toLocaleString("en-US", {
          timeZone: this.user.timezone || "UTC",
        })
      );
      today.setHours(0, 0, 0, 0); // Normalize to start of the day

      console.log("Force resetting progress for all pathways");

      const updates = [];
      const updatedPathways = [];

      this.userPathways.forEach((pathway) => {
        if (pathway.progress !== 0) {
          const pathwayRef = doc(
            db,
            `users/${this.user.uid}/myPathways`,
            pathway.id
          );
          updates.push(updateDoc(pathwayRef, { progress: 0 }));
          updatedPathways.push({ ...pathway, progress: 0 });
          console.log(`Force resetting progress for pathway: ${pathway.id}`);
        } else {
          updatedPathways.push(pathway);
        }
      });

      await Promise.all(updates);

      // Update the last reset dates to today
      const userUpdates = {
        lastDailyReset: today,
        lastWeeklyReset: today,
        lastMonthlyReset: today,
        lastYearlyReset: today,
      };
      await updateDoc(doc(db, "users", this.user.uid), userUpdates);

      runInAction(() => {
        this.userPathways = updatedPathways;
      });

      console.log("Force reset progress completed successfully");
    } catch (error) {
      console.error("Error force resetting progress:", error);
    }
  }

  //
  //
  //
  //
  //
  // LISTS
  async fetchLists() {
    try {
      const userListsRef = collection(db, `users/${this.user.uid}/myLists`);
      const querySnapshot = await getDocs(userListsRef);

      runInAction(() => {
        this.lists = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });

      logger.debug("Lists fetched successfully");
    } catch (error) {
      logger.debug("Error fetching lists:", error);
    }
  }

  async addPathwayToList(listId, pathwayId) {
    try {
      // Reference to the specific user's list document in Firebase
      const listRef = doc(db, `users/${this.user.uid}/myLists`, listId);

      // Get the current list document
      const listDoc = await getDoc(listRef);
      if (!listDoc.exists()) {
        throw new Error("List not found");
      }

      const listData = listDoc.data();
      const updatedPathways = listData.pathways
        ? [...listData.pathways, pathwayId]
        : [pathwayId];

      // Update the list in Firebase
      await updateDoc(listRef, {
        pathways: updatedPathways,
      });

      // Update MobX store
      runInAction(() => {
        const list = this.lists.find((l) => l.id === listId);
        if (list) {
          list.pathways = updatedPathways;
        } else {
          // Handle the case where the list is not found in the store
        }
      });
    } catch (error) {
      console.error("Error adding pathway to list:", error);
      // Handle any errors appropriately
    }
  }

  async removeFromList(listId, pathwayId) {
    try {
      // Reference to the specific user's list document in Firebase
      const listRef = doc(db, `users/${this.user.uid}/myLists`, listId);

      // Get the current list document
      const listDoc = await getDoc(listRef);
      if (!listDoc.exists()) {
        throw new Error("List not found");
      }

      const listData = listDoc.data();
      const updatedPathways = listData.pathways.filter(
        (id) => id !== pathwayId
      );

      // Update the list in Firebase
      await updateDoc(listRef, {
        pathways: updatedPathways,
      });

      // Update MobX store
      runInAction(() => {
        const list = this.lists.find((l) => l.id === listId);
        if (list) {
          list.pathways = updatedPathways;
        } else {
          // Handle the case where the list is not found in the store
        }
      });
    } catch (error) {
      console.error("Error removing pathway from list:", error);
      // Handle any errors appropriately
    }
  }

  async addList(listName) {
    if (!this.user.isPremium && this.lists.length >= 2) {
      alert("You need a premium plan to create more than 2 lists");
      return;
    }
    try {
      const userListsRef = collection(db, `users/${this.user.uid}/myLists`);

      const docRef = await addDoc(userListsRef, { name: listName });

      runInAction(() => {
        this.lists.push({
          id: docRef.id,

          name: listName,
        });
      });
    } catch (error) {
      console.error("Error adding list:", error);
      // Handle any errors appropriately
    }
  }

  async deleteList(listId) {
    try {
      const listRef = doc(db, `users/${this.user.uid}/myLists`, listId);
      await deleteDoc(listRef);

      runInAction(() => {
        this.lists = this.lists.filter((list) => list.id !== listId);
      });
    } catch (error) {
      console.error("Error deleting list:", error);
      // Handle any errors appropriately
    }
  }

  async editListName(listId, newName) {
    try {
      const listRef = doc(db, `users/${this.user.uid}/myLists`, listId);
      await updateDoc(listRef, { name: newName });

      runInAction(() => {
        const list = this.lists.find((l) => l.id === listId);
        if (list) {
          list.name = newName;
        } else {
          // Handle the case where the list is not found in the store
        }
      });
    } catch (error) {
      console.error("Error editing list name:", error);
      // Handle any errors appropriately
    }
  }

  //
  //
  //
  //
  //
  // ANALYTICS - LOGS

  async fetchLogs() {
    try {
      const logRef = collection(db, `users/${this.user.uid}/activityLogs`);

      let querySnapshot;
      if (!this.user.isPremium) {
        // Fetch only logs from the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        querySnapshot = await getDocs(
          query(logRef, where("timestamp", ">=", sevenDaysAgo))
        );
      } else {
        // Fetch all logs
        querySnapshot = await getDocs(logRef);
      }

      // const querySnapshot = await getDocs(logRef);

      runInAction(() => {
        this.logs = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          // const consistentTimestamp = toUnixTimestamp(data.timestamp);
          return {
            id: doc.id,
            ...data,
            // timestamp: consistentTimestamp,
          };
        });
      });

      logger.debug("Logs fetched successfully");
    } catch (error) {
      logger.error("Error fetching logs:", error);
    }
  }

  async addLog(pathway, logData) {
    console.log({ logData });
    const canSave = await this.canSaveLog(pathway.id);
    if (!canSave) {
      logger.error("Log limit reached for the day");
      return;
    }

    // UPDATE PLAY COUNT on the myPathways's subcollection (for top 5 most played)
    const userPathwayRef = doc(
      db,
      `users/${this.user.uid}/myPathways`,
      pathway.id
    );
    const userPathwayDoc = await getDoc(userPathwayRef);
    if (userPathwayDoc.exists()) {
      const currentPlayCount = userPathwayDoc.data().playCount || 0;

      // Increment play count manually
      await updateDoc(userPathwayRef, {
        playCount: currentPlayCount + 1,
      });

      await this.updateUserStats([
        { key: "totalDone", value: 1 },
        { key: "totalDuration", value: logData.totalDuration },
      ]);
    } else {
      logger.error("Pathway not found");
      return;
    }

    await this.updateStreak();

    try {
      const logRef = collection(db, `users/${this.user.uid}/activityLogs`);
      const docRef = await addDoc(logRef, {
        pathwayId: pathway.id,
        ...logData,
        timestamp: new Date(),
      });
      const docSnap = await getDoc(docRef);
      const newLogData = docSnap.data();

      runInAction(() => {
        this.logs.push(newLogData);
      });

      //if time tracking - Update Progress +1
      if (pathway.progress || 0 < pathway.completionLimit) {
        const updatedPathwayRef = doc(
          db,
          `users/${this.user.uid}/myPathways`,
          pathway.id
        );
        const updatedPathwayDoc = await getDoc(updatedPathwayRef);

        if (updatedPathwayDoc.exists()) {
          const currentProgress = updatedPathwayDoc.data().progress || 0;
          const newProgress = currentProgress + 1;
          const lastCompleted = new Date(); // Current date as lastCompleted

          await updateDoc(updatedPathwayRef, {
            progress: newProgress,
            lastCompleted: lastCompleted,
          });

          runInAction(() => {
            this.updatePathwayInState(pathway.id, {
              progress: newProgress,
              lastCompleted: lastCompleted,
            });
          });
        } else {
          logger.error("Pathway not found for updating progress");
        }
      }

      logger.debug("Session log saved successfully");
    } catch (error) {
      logger.error("Error saving session log:", error);
    }
  }

  async checkAndResetStreak() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize to start of the day

      const lastPlayedTimestamp = this.user.lastPlayed;

      if (!lastPlayedTimestamp) {
        console.error("Last played date not found in user document");
        return;
      }

      const lastPlayed = lastPlayedTimestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
      lastPlayed.setHours(0, 0, 0, 0); // Normalize to start of the day

      if (today.getTime() - lastPlayed.getTime() > ONE_DAY) {
        this.user.streak = 0;

        // Update the user's streak in Firestore
        const userRef = doc(db, "users", this.user.uid);
        await updateDoc(userRef, {
          streak: this.user.streak,
        });

        console.log("Streak has been reset");
      } else {
        console.log("Streak is up to date");
      }
    } catch (error) {
      console.error("Error checking and resetting streak:", error);
    }
  }

  updateStreak = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize to start of the day

      const lastPlayed = new Date(this.user.lastPlayed.toDate());
      lastPlayed.setHours(0, 0, 0, 0); // Normalize to start of the day

      if (today.getTime() - lastPlayed.getTime() === ONE_DAY) {
        this.user.streak++;
      } else if (today.getTime() - lastPlayed.getTime() > ONE_DAY) {
        this.user.streak = 1;
      }

      this.user.lastPlayed = today;

      // Update the user's streak in Firestore
      const userRef = doc(db, "users", this.user.uid);
      await updateDoc(userRef, {
        streak: this.user.streak,
        lastPlayed: today,
      });
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  };

  async deleteLog(logId) {
    try {
      const logRef = doc(db, `users/${this.user.uid}/activityLogs`, logId);
      await deleteDoc(logRef);

      runInAction(() => {
        this.logs = this.logs.filter((log) => log.id !== logId);
      });

      logger.debug("Log deleted successfully with ID:", logId);
    } catch (error) {
      logger.error("Error deleting log:", error);
    }
  }

  //
  //
  //
  //
  //
  // PATHWAYS
  async fetchTopPlayedPathways() {
    // Fetch Top 5 Most Played Pathways
    try {
      const userPathwayRef = collection(
        db,
        `users/${this.user.uid}/myPathways`
      );
      const topPlayedQuery = query(
        userPathwayRef,
        orderBy("playCount", "desc"),
        limit(5)
      );
      const querySnapshot = await getDocs(topPlayedQuery);

      runInAction(() => {
        // Store top played pathways in MobX store
        this.topPlayedPathways = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    } catch (error) {
      logger.error("Error fetching top played pathways:", error);
    }
  }

  async fetchRecentPathways() {
    // Fetch Top 5 Most Recent Pathways

    try {
      const userPathwayRef = collection(
        db,
        `users/${this.user.uid}/myPathways`
      );

      const recentQuery = query(
        userPathwayRef,
        orderBy("lastCompleted", "desc"),
        limit(5)
      );

      const querySnapshot = await getDocs(recentQuery);

      runInAction(() => {
        // Store recent pathways in MobX store
        this.recentPathways = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    } catch (error) {
      logger.error("Error fetching recent pathways:", error);
    }
  }

  async fetchPathways() {
    const q = query(collection(db, "pathways"));
    onSnapshot(q, (querySnapshot) => {
      runInAction(() => {
        this.pathways = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    });
  }

  async fetchUserPathways() {
    try {
      const userPathwayRef = collection(
        db,
        `users/${this.user.uid}/myPathways`
      );
      const querySnapshot = await getDocs(userPathwayRef);

      const updates = [];

      runInAction(() => {
        this.userPathways = querySnapshot.docs.map((doc) => {
          const pathway = {
            id: doc.id,
            creatorId: this.user.uid,
            ...doc.data(),
          };

          if (
            pathway.timeType == "time" &&
            shouldResetProgress(pathway.frequency, pathway.lastCompleted)
          ) {
            // Reset progress and prepare for Firebase update
            updates.push(updateDoc(doc.ref, { progress: 0 }));

            return { ...pathway, progress: 0 };
          }

          return pathway;
        });
      });

      // Execute all updates in Firebase
      await Promise.all(updates);
    } catch (error) {
      logger.debug("Error fetching user pathways:", error);
    }
  }

  addUserPathway = async (pathway, isCopy) => {
    console.log({ pathway });
    if (!this.user) {
      logger.debug("Error: User not authenticated.");
      return;
    }

    try {
      const userPathwayRef = collection(
        db,
        `users/${this.user.uid}/myPathways`
      );
      const docRef = await addDoc(userPathwayRef, pathway);
      console.log({ pathway });
      console.log({ id: docRef.id });

      runInAction(() => {
        this.userPathways.push({
          id: docRef.id,
          ...pathway,
        });
      });

      if (!isCopy) {
        this.updateUserStats([{ key: "totalCreated", value: 1 }]);
      }

      logger.debug("User pathway created with ID: ", docRef.id);
      return docRef.id; // Return the ID for further use
    } catch (error) {
      logger.debug("Error adding user pathway: ", error);
    }
  };

  publishPathway = async (pathwayId) => {
    if (!this.user) {
      logger.debug("Error: User not authenticated.");
      return;
    }

    try {
      const userPathwayRef = doc(
        db,
        `users/${this.user.uid}/myPathways`,
        pathwayId
      );
      const userPathwayDoc = await getDoc(userPathwayRef);

      if (!userPathwayDoc.exists()) {
        logger.debug("Error: Pathway not found.");
        return;
      }

      const publicPathway = {
        ...userPathwayDoc.data(),
        creatorId: this.user.uid,
        published: true,
      };
      const docRef = await addDoc(collection(db, "pathways"), publicPathway);
      logger.debug("Pathway published with ID: ", docRef.id);
    } catch (error) {
      logger.debug("Error publishing pathway: ", error);
    }
  };

  updatePathwayInState(userPathwayId, pathwayData) {
    const updatePathwayInArray = (array) => {
      const newArray = array.slice();
      const index = newArray.findIndex((p) => p.id === userPathwayId);
      if (index !== -1) {
        newArray[index] = { ...newArray[index], ...pathwayData };
      }
      return newArray;
    };

    this.pathways = updatePathwayInArray(this.pathways);

    this.recentPathways = updatePathwayInArray(this.recentPathways);
    this.topPlayedPathways = updatePathwayInArray(this.topPlayedPathways);
    this.userPathways = updatePathwayInArray(this.userPathways);
  }

  async updatePathway(pathwayId, pathwayData) {
    // TEMPLATE USAGE
    logger.debug(
      "Attempting to update pathway with ID:",
      pathwayId,
      "Data:",
      pathwayData
    );
    try {
      const docRef = doc(db, "pathways", pathwayId);
      await updateDoc(docRef, pathwayData);
      logger.debug("Pathway updated successfully with ID:", pathwayId);
    } catch (error) {
      logger.debug("Error updating pathway:", error);
    }
  }

  async updateUserPathway(userPathwayId, pathwayData) {
    try {
      const userPathwayRef = doc(
        db,
        `users/${this.user.uid}/myPathways`,
        userPathwayId
      );
      await updateDoc(userPathwayRef, pathwayData);

      this.updatePathwayInState(userPathwayId, pathwayData);
    } catch (error) {
      logger.debug("Error updating user pathway: ", error);
    }
  }

  async deletePathway(pathwayId) {
    try {
      // Step 1: Delete the pathway from user's subcollection
      const pathwayRef = doc(
        db,
        `users/${this.user.uid}/myPathways`,
        pathwayId
      );

      await deleteDoc(pathwayRef);

      // Step 2: Remove pathway from all lists
      await this.removePathwayFromLists(pathwayId);

      // Step 3: Update MobX store
      runInAction(() => {
        this.userPathways = this.userPathways.filter((p) => p.id !== pathwayId);
        // Remove from lists in the store (implementation below)
        this.removePathwayFromListsInStore(pathwayId);
      });
      // this.updateUserStats("totalRoutines", -1); - i dont wanna reduce in case i go negative because of copies
    } catch (error) {
      console.error("Error deleting pathway:", error);
    }
  }

  async createPathwayCopy(originalPathwayId) {
    // Function to create a copy of the original pathway in the user's subcollection
    logger.debug(
      "Attempting to create pathway copy with ID:",
      originalPathwayId
    );
    if (!this.user) {
      logger.debug("User not authenticated");
      return;
    }

    try {
      // Retrieve the original pathway
      const originalPathwayRef = doc(db, "pathways", originalPathwayId);
      const originalPathwayDoc = await getDoc(originalPathwayRef);

      if (!originalPathwayDoc.exists()) {
        logger.debug("Original pathway not found");
        return;
      }

      const originalPathwayData = originalPathwayDoc.data();
      // const pathwayDataClone = { ...originalPathwayData };

      // delete pathwayDataClone.id;

      const { id, ...pathwayDataWithoutId } = originalPathwayData;

      logger.debug("Original pathway data:", pathwayDataWithoutId);

      // Create a copy in the user's subcollection
      const userPathwayRef = collection(
        db,
        `users/${this.user.uid}/myPathways`
      );

      const docRef = await addDoc(userPathwayRef, {
        ...pathwayDataWithoutId,
        originalPathwayId: originalPathwayId,
        isCopy: true,
        modifiedAt: new Date(),
      });

      logger.debug("Pathway copy created successfully");
      return docRef.id;
    } catch (error) {
      logger.debug("Error creating pathway copy:", error);
    }
  }

  // addPathway = async (pathway) => {
  //   if (!this.user) {
  //     logger.debug("Error: User not authenticated.");
  //     return;
  //   }

  //   try {
  //     const pathwayWithCreator = { ...pathway, creatorId: this.user.uid };
  //     const docRef = await addDoc(
  //       collection(db, "pathways"),
  //       pathwayWithCreator
  //     );
  //     logger.debug("Pathway created with ID: ", docRef.id);
  //   } catch (error) {
  //     logger.debug("Error adding pathway: ", error);
  //   }
  // };

  async getOrCreateUserPathwayCopy(originalPathwayId) {
    if (!this.user) {
      logger.debug("User not authenticated");
      return null;
    }

    try {
      // Check if the user already has a copy of the pathway
      const userPathwayQuery = query(
        collection(db, `users/${this.user.uid}/myPathways`),
        where("originalPathwayId", "==", originalPathwayId)
      );

      const querySnapshot = await getDocs(userPathwayQuery);

      if (!querySnapshot.empty) {
        // User already has a copy, return its ID
        return querySnapshot.docs[0].id;
      } else {
        // User doesn't have a copy, create a new one
        return this.createPathwayCopy(originalPathwayId);
      }
    } catch (error) {
      logger.debug("Error in getOrCreateUserPathwayCopy:", error);
      return null;
    }
  }

  //
  //
  //
  //
  //
  // REWARDS
  async fetchUserRewards() {
    try {
      const userRewardsRef = collection(db, `users/${this.user.uid}/rewards`);
      const querySnapshot = await getDocs(userRewardsRef);

      runInAction(() => {
        this.rewards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });

      logger.debug("User rewards fetched successfully");
    } catch (error) {
      logger.debug("Error fetching user rewards:", error);
    }
  }

  async addReward(reward) {
    if (!this.user.isPremium) {
      alert("You need a premium plan to add rewards");
      return;
    }
    try {
      const userRewardsRef = collection(db, `users/${this.user.uid}/rewards`);

      const docRef = await addDoc(userRewardsRef, reward);

      logger.debug("Reward added with ID: ", docRef.id);
      runInAction(() => {
        this.rewards.push({
          id: docRef.id,
          ...reward,
        });
      });
      return docRef.id; // Return the ID for further use
    } catch (error) {
      logger.debug("Error adding reward: ", error);
    }
  }

  async updateReward(reward) {
    try {
      const userRewardRef = doc(
        db,
        `users/${this.user.uid}/rewards`,
        reward.id
      );
      await setDoc(userRewardRef, reward);

      logger.debug("Reward updated successfully with ID:", reward.id);
      runInAction(() => {
        const index = this.rewards.findIndex((r) => r.id === reward.id);
        if (index !== -1) {
          this.rewards[index] = { id: reward.id, ...reward };
        }
      });
    } catch (error) {
      logger.debug("Error updating reward:", error);
    }
  }

  async deleteReward(reward) {
    try {
      const userRewardRef = doc(
        db,
        `users/${this.user.uid}/rewards`,
        reward.id
      );
      await deleteDoc(userRewardRef);

      logger.debug("Reward deleted successfully with ID:", reward.id);

      // Update Mobx variable
      runInAction(() => {
        this.rewards = this.rewards.filter((r) => r.id !== reward.id);
      });
    } catch (error) {
      logger.debug("Error deleting reward:", error);
    }
  }

  async buyReward(reward) {
    if (reward.cost > this.user.gem) {
      return { error: "Not enough gems" };
    }

    const newgemAmount = this.user.gem - reward.cost;

    // Update user's gem in Firebase
    const userDocRef = doc(db, "users", this.user.uid);
    await updateDoc(userDocRef, { gem: newgemAmount });

    // Add log entry for the reward purchase
    const rewardPurchaseLog = {
      reward: reward,
      balanceBefore: this.user.gem,
      balanceAfter: newgemAmount,
      timestamp: new Date(),
    };

    const logRef = collection(db, `users/${this.user.uid}/activityLogs`);
    const logDocRef = await addDoc(logRef, rewardPurchaseLog);

    const docSnap = await getDoc(logDocRef);
    const newLogData = docSnap.data();

    runInAction(() => {
      this.user.gem = newgemAmount;
      this.logs.push(newLogData);
    });

    logger.debug("Reward purchased successfully");
    return { toast: "Reward purchased successfully" };
  }

  //
  //
  //
  //
  //
  // TRIGGERS
  async addTrigger(trigger) {
    try {
      const userTriggerRef = collection(
        db,
        `users/${this.user.uid}/myTriggers`
      );
      const docRef = await addDoc(userTriggerRef, { label: trigger });
      runInAction(() => {
        this.triggeredEvents.push({
          id: docRef.id,
          label: trigger,
        });
      });
      return docRef.id;
    } catch (error) {
      logger.debug("Error adding trigger: ", error);
    }
  }

  async fetchTriggers() {
    try {
      const userTriggerRef = collection(
        db,
        `users/${this.user.uid}/myTriggers`
      );
      const querySnapshot = await getDocs(userTriggerRef);

      const triggers = [];
      querySnapshot.forEach((doc) => {
        triggers.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      runInAction(() => {
        this.triggeredEvents = triggers;
      });

      logger.debug("Fetched all triggers successfully.");
    } catch (error) {
      logger.debug("Error fetching triggers:", error);
    }
  }

  async deleteTrigger(triggerId) {
    try {
      const triggerRef = doc(
        db,
        `users/${this.user.uid}/myTriggers`,
        triggerId
      );
      await deleteDoc(triggerRef);

      runInAction(() => {
        this.triggeredEvents = this.triggeredEvents.filter(
          (trigger) => trigger.id !== triggerId
        );
      });

      logger.debug("Trigger deleted successfully with ID:", triggerId);
    } catch (error) {
      logger.debug("Error deleting trigger:", error);
    }
  }

  //
  //
  //
  //
  //
  // GLOBAL MOBX STATE
  setIsMobileOpen(isMobileOpen) {
    runInAction(() => {
      this.isMobileOpen = isMobileOpen;
    });
  }

  setPathwayPlaying(pathway) {
    runInAction(() => {
      if (pathway) {
        this.pathwayPlaying = pathway;
      } else {
        this.pathwayPlaying = false;
      }
    });
  }

  findPathwayById(pathwayId) {
    const result = this.userPathways.find(
      (pathway) => pathway.id === pathwayId
    );
    return result;
  }

  setIsPathwayEditView(editFromInside = true) {
    runInAction(() => {
      this.isPathwayEditView = !this.isPathwayEditView;
      this.editFromInside = editFromInside;
    });
  }

  removePathwayFromListsInStore(pathwayId) {
    this.lists.forEach((list) => {
      const index = list.pathways.indexOf(pathwayId);
      if (index > -1) {
        list.pathways.splice(index, 1);
      }
    });
  }

  async removePathwayFromLists(pathwayId) {
    const listsRef = collection(db, `users/${this.user.uid}/myLists`);
    const q = query(listsRef, where("pathways", "array-contains", pathwayId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const listRef = doc.ref;
      await updateDoc(listRef, {
        pathways: firebase.firestore.FieldValue.arrayRemove(pathwayId),
      });
    });
    runInAction(() => {
      this.pathways = this.pathways.filter((p) => p.id !== pathwayId);
      this.recentPathways = this.recentPathways.filter(
        (p) => p.id !== pathwayId
      );
      this.topPlayedPathways = this.topPlayedPathways.filter(
        (p) => p.id !== pathwayId
      );
      this.userPathways = this.userPathways.filter((p) => p.id !== pathwayId);

      this.lists.forEach((list) => {
        list.pathways = list.pathways.filter((id) => id !== pathwayId);
      });
    });
  }

  async canSaveLog(pathwayId) {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      // Using logs from MobX state instead of querying Firebase
      const todaysLogs = this.logs.filter(
        (log) =>
          log.pathwayId === pathwayId &&
          new Date(log.timestamp) >= startOfDay &&
          new Date(log.timestamp) <= endOfDay
      );

      logger.debug({ todaysLogs });
      return todaysLogs.length < MAX_LOGS_PER_DAY;
    } catch (error) {
      logger.debug("Error checking log availability:", error);
      return false;
    }
  }

  updatePathwayData(pathwayId, newData) {
    const pathwayIndex = this.userPathways.findIndex((p) => p.id === pathwayId);
    if (pathwayIndex !== -1) {
      this.userPathways[pathwayIndex] = {
        ...this.userPathways[pathwayIndex],
        ...newData,
      };
    } else {
      console.error("Pathway not found for updating");
    }
  }

  findPathwaysByListId(listId) {
    const foundList = this.lists.find((list) => list.id === listId);
    if (foundList) {
      const pathwayIds = foundList.pathways || [];
      return this.userPathways.filter((pathway) =>
        pathwayIds.includes(pathway.id)
      );
    }
    return []; // Return an empty array if the list is not found or no pathways are matched
  }

  //
  //
  //
  //
  //
  // AUTH FUNCTIONS
  async upgradeAccount(email, password, username) {
    try {
      const credential = EmailAuthProvider.credential(email, password);
      const userCredential = await linkWithCredential(
        auth.currentUser,
        credential
      );

      const userDocRef = doc(db, "users", userCredential.user.uid);
      await updateDoc(userDocRef, {
        username,
      });

      runInAction(() => {
        this.user = {
          ...userCredential.user,
          username,
        };
      });
    } catch (error) {
      console.error("Error upgrading account:", error);
    }
  }

  signInAnonymously = async () => {
    await signInAnonymously(auth);
    logger.debug("Signed in anonymously");
  };

  async loginWithEmail({ email, password }) {
    try {
      this.loading = true;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      runInAction(() => {
        this.user = userCredential.user;
        this.loading = false;
      });
    } catch (error) {
      console.error("Error logging in:", error);
      runInAction(() => {
        this.loading = false;
      });
      throw error;
    }
  }

  async signupWithEmail(email, password, username) {
    try {
      this.loading = true;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Additional user properties
      const newUserProfile = {
        ...DEFAULT_USER,
        createdAt: new Date(),
        username: username,
        email: email,
        uid: userCredential.user.uid,
      };

      // Create a user profile in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), newUserProfile);

      runInAction(() => {
        this.user = newUserProfile;
        this.loading = false;
      });
    } catch (error) {
      console.error("Error signing up:", error);
      runInAction(() => {
        this.loading = false;
      });
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(auth); // Sign out from Firebase Authentication
      runInAction(() => {
        this.user = null; // Reset the user in the store
      });
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle any errors that occur during logout
    }
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        const newUserProfile = {
          ...DEFAULT_USER,
          createdAt: new Date(),
          username: user.displayName || "New User",
          email: user.email,
          uid: user.uid,
        };

        await setDoc(userDocRef, newUserProfile);

        runInAction(() => {
          this.user = newUserProfile;
        });
      } else {
        runInAction(() => {
          this.user = { uid: user.uid, ...userDoc.data() };
        });
      }
    } catch (error) {
      console.error("Error with Google sign-in:", error);
    }
  }

  async sendPasswordReset(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      // Handle success, such as showing a message to the user
    } catch (error) {
      console.error("Error sending password reset email:", error);
      // Handle errors, such as invalid email, etc.
    }
  }

  get isUserAnonymous() {
    return this.user && this.user.provider == "anonymous";
  }
}

const MobxStore = new Store();
export default MobxStore;
