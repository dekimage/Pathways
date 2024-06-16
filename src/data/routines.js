const originalRoutines = [
  {
    premiumId: "0z61W4UTnCpWufApKHrF",
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Find today's priority",
    completionLimit: "3",

    emoji: "🏍️",

    steps: [
      {
        context:
          "- It's usual to get lost in the mess of the day. We often do things on auto pilot and react to situations. Asking this question will snap you out and force you think about what is the best use of your abilities and skills. It will clear out things in your mind and remind you of your priorities.",

        autoplay: true,
        question: "What is the best use of my time for the next 60 minutes?",
        timer: 60,
        responseType: "text",
      },
      {
        context:
          "It's easy to get lost in the mess of each day. We have hundrends of obligations, tasks, events and commitments. It's easy to lose track of what matters most. Asking this question will remind you of your highest priority. Schedule a time block when you gona tackle it today. ",
        autoplay: true,
        timer: 120,

        question:
          "What is the one thing that if I do it will make today a win?",
        responseType: "text",
      },
    ],

    description:
      "Stop for few minutes. Find your focus. Get clarity on what is important. ",
    backgroundColor: "#d1f5be",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    premiumId: "86kePxu92pcRwXywGft4",
    triggerId: 3, // Before Work
    categoryId: 3, // Calm
    isPremium: false,

    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],

    original: true,
    trigger: "",
    frequency: "everyday",
    emoji: "🍭",
    completionLimit: 1,
    description:
      "Find what inspires you and makes you creative. Use those as leverage to get into creative zone more often. \n",
    steps: [
      {
        responseType: "text",
        context:
          "Think about past events or situations where something triggered you to feel more creative. Once you identify at least one, try to see how you can fit in more of those triggers into your week. \nPersonal example: i usually get very creative after playing a board game, i am inspired by the mechanics and my mind usually goes into subconscos thinking about a new mechanic or mixing themes with mechanics so i can create something unique and cool to play. I am also the most creative when i am alone and i listen to zangarmarsh -wow music. the feeling of nostalgia and gaming vibe inspires me to create and imagine new worlds. It might also be that usually when i am creative and sit down to imagine stuff i listen to this kind of music so its vice versa. \n",

        timer: 90,
        autoplay: true,
        question: "What makes you feel creative?",
      },
      {
        question: "Double the creative triggers",
        context:
          "Once you discover some hints, write down (task feature) what you can do to make sure you find yourself more often in those situations. This will increase the likleyhood of your creative genius to sparkle more often. ",
        responseType: "text",

        autoplay: true,
        timer: 60,
      },
      {
        context:
          "Schedule time for creative research where you spend time looking proactivley for content that inspires you. Weather that's artowork or designs on pinterest or code samples or creative writing in books. Bookmark everything you find that inspires you to a single collection and activley revisit it to refresh your creative muscles. ",
        question: "Curate a inspiration board",

        responseType: "text",
        autoplay: true,
        timer: 240,
      },
    ],
    backgroundColor: "#907ad6",

    name: "Creativity Booster",
  },
  {
    premiumId: "AtOP0FktcVcoMq6x5SON",
    triggerId: 2, // Night
    categoryId: 2, // Self Knowledge
    isPremium: false,
    steps: [
      {
        timer: "60",
        context: "Write down at least 1 thing.",

        buttonText: "Next",
        autoplay: true,
        currentStep: 1,
        question: "What new thing did you learn today?",
        minText: 20,
        responseType: "text",
      },
      {
        question:
          "Reflect on how you applied yesterday's learning in today's activities.",
        context:
          "Think of something that i have applied today that i learned in a previous session, and try to note what specifically i did and from where i learned it.",
        timer: 150,
        minText: 15,
        responseType: "text",
        currentStep: 2,
        buttonText: "Next",
      },
    ],
    description: "Learn by reflection",
    originalPathwayId: "LiuGGIFtC38QfzZp93MP",

    isCopy: true,
    frequency: "everyday",
    completionLimit: "3",
    backgroundColor: "#0e6ba8",
    name: "Reflect on Learning",
    emoji: "📖",
    time: "Night",

    playCount: 6,
  },
  {
    premiumId: "CfP7u06Bn5gLO59PuH9l",
    premiumId: "CfP7u06Bn5gLO59PuH9l",
    triggerId: 6, // Weekend
    categoryId: 5, // Minimize
    isPremium: false,

    steps: [
      {
        timer: 120,
        context:
          "Set clear goals and prioritize them from most important to least \ntip: this will assure that if you put list of 25 even if you make 10 you still get the most important 10 done",
        autoplay: true,

        question: "What are the most important goals for next week?",
        responseType: "text",
      },
      {
        question: "What events or meetings are coming up?",
        timer: 60,

        context:
          "Review your schedule on sunday night and plan ahead for events/meetings. Fit them in your calendar with your most important goals.",
        responseType: "text",
        autoplay: true,
      },
      {
        responseType: "",
        context:
          "Take some time to come up with a specific to-do list for each day. This will probably change as you go but it's nice to have a big picture view and estimate of how tasks can fit in your week.",
        question: "Craft daily to-do lists",

        timer: 180,
        autoplay: true,
      },
      {
        context:
          "Allocate time for unexpected events or interruptions to have extra buffer. Tip: a 30% extra time will usually be enough for most scenarios and also if you finish early, you'll have more time to strategize or relax.",

        autoplay: true,
        responseType: "text",
        timer: 30,
        question: "Plan for extra free space",
      },
      {
        responseType: "text",
        question: "Plan breaks and downtime",
        context:
          "Plan several small breaks into each day so you can stretch, hydrate and alternate between focused and relaxed mode to keep your brain at peak performance. ",

        autoplay: true,
        timer: 60,
      },
      {
        question: "Eliminate & Delegate",
        responseType: "text",
        timer: 180,
        autoplay: true,
        context:
          "Go over the final plan and list of goals and obligations, and see what you can eliminate. What is truly essential? What is just nice to have? Once you eliminate non-essentials, see if there is anything else left on the list that you can delegate to others? What is left after these 2 questions will be the real work you'll need to do. ",
      },
      {
        responseType: "text",

        question: "Weekly Review",

        autoplay: true,
        timer: 30,
        context:
          "FInally, when the week is done, do a weekly review -> link to routine. This will help you identify what you can improve for next time and what not to do. ",
      },
    ],

    emoji: "📤",
    trigger: "",
    completionLimit: 1,
    backgroundColor: "#D6CE93",
    days: ["Saturday", "Sunday"],

    original: true,

    description:
      "Set your week for success with this powerful routine for setting a weekly plan",
    frequency: "everyweek",

    name: "Create Weekly Plan",
  },
  {
    premiumId: "Jv79Z3PC7gqV7O9RCnAm",
    triggerId: 1, // Morning
    categoryId: 1, // Work
    isPremium: true,
    isCopy: true,

    steps: [
      {
        autoplay: true,
        buttonText: "Next",
        currentStep: 1,
        timer: "60",
        context: "",

        options: [
          "Notifications OFF",
          "People shut down",
          "Phone OFF",
          "Remove all distractions",
          "Close all unrelated tabs",
          "Cleanup work desk",
          "Prepare glass of water",
        ],

        responseType: "checklist",
        question: "Prepare Distraction-Free Environment",
      },
      {
        options: [
          "Write down my task on a paper",
          "Sketch out the final version of that task",
        ],
        responseType: "checklist",
        timer: 10,
        autoplay: true,
        currentStep: 2,
        buttonText: "Next",

        context: "",
        question: "Get your FROG ready.",
      },
      {
        context:
          "Deep focus, concentrate exclusivley on this task! \nDon't try to do other tasks, if something new comes up, write it in a distraction journal.",
        timer: 3600,
        currentStep: 3,
        responseType: "slider",
        question: "Focus Session #1",
        sliderMax: "10",
        sliderMin: "1",
        buttonText: "Next",

        autoplay: true,
      },
      {
        timer: 300,
        currentStep: 3,
        context: "",
        responseType: "checklist",
        question:
          "Small Break, Get up and stretch, drink water and juggle with balls. Get hyped and ready to complete a tough session!",
        options: ["Drink water", "Stretch out ", "Juggle balls"],
        autoplay: true,
        buttonText: "Next",
      },
      {
        currentStep: 3,

        responseType: "mood",
        autoplay: true,
        timer: 3600,
        question: "Focus Session #2",
        context: "At the end of the session rate your productivity",
        buttonText: "Next",
      },
    ],
    name: "Deep Work",
    frequency: "everyday",
    completionLimit: 1,
    originalPathwayId: "LiuGGIFtC38QfzZp93MP",
    playCount: 1,

    backgroundColor: "#d6ce93",
    time: "Morning",
    description:
      "Get 80% of your daily work done in just 90 minutes of laser focused time.",
    emoji: "👜",
  },
  {
    premiumId: "MPqzhxIL8Hm7uWEP3vnX",
    triggerId: 1, // Morning
    categoryId: 2, // Self Knowledge
    isPremium: true,

    name: "Reading Routine",
    backgroundColor: "#2a9d8f",
    playCount: 1,

    original: true,
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Sunday",
      "Saturday",
    ],
    description:
      "Simple reading routine. 1. Choose book/pages -> 2. Read -> 3. Reflect & write insights.",
    emoji: "📚",
    steps: [
      {
        context: "Decide how many pages or chapters you will read.",
        timer: "120",
        responseType: "text",
        question: "What is your reading target for this session?",

        autoplay: true,
      },
      {
        autoplay: true,

        sliderMin: "1",

        responseType: "slider",
        question: "How was your focus?",
        context: "Read for 10 minutes. Focus on reading without distractions. ",
        timer: "600",
        sliderMax: "10",
      },
      {
        timer: "60",
        context:
          "Jot down key takeaways or how the reading might apply to your life.",
        responseType: "text",

        autoplay: true,

        question: "What are two key insights from your reading?",
      },
    ],

    trigger: "",
    frequency: "everyweek",

    completionLimit: "2",
  },
  {
    premiumId: "XKIaO3moL4LPWZmGlw6B",
    triggerId: 4, // After Work
    categoryId: 2, // Self Knowledge
    isPremium: true,

    emoji: "🔪",
    completionLimit: "2",
    name: "Decisions Leo",

    trigger: "when i feel tired",
    description: "big decisions in life, do this once/year at least",

    steps: [
      {
        question:
          "If u follow the default trajectory where will it lead you and ask is that gona be the highest potential somthn u truly satisfy you?",
        autoplay: true,
        timer: "300",
        responseType: "text",
      },
      {
        responseType: "text",
        autoplay: true,

        timer: "200",

        question:
          " What are some bold decisions that can shift thr trajectory towards something meaningful?",
      },
      {
        question:
          "What are the best decisions youve made in your life, make a list, 2nd what are the worst deicsions in life list, 3 what made the best so good what made the worst so bad? Final",
        context: "do these 3 in one",

        autoplay: true,

        responseType: "text",
        timer: "500",
      },
    ],
    frequency: "everyyear",
    days: ["Saturday", "Sunday"],
    backgroundColor: "#d1f5be",
  },
  {
    premiumId: "ZdQ6pKPD8nGjmrH7Ze6X",
    triggerId: 1, // Morning
    categoryId: 1, // Work
    isPremium: true,

    trigger: "",

    original: true,

    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    backgroundColor: "#dabfff",
    name: "Remote Work Setup",

    frequency: "everyday",
    description:
      "The future of work is remote work. The % of remote workers increases everyday and will keep growing. It's effective and flexible but comes with problems. Learn how to optimize it .",
    steps: [
      {
        responseType: "checklist",

        timer: 180,
        question: "Design your workspace",
        options: [
          "Clean it up",
          "Organize everything",
          "Isolate it from other activities",
          "Remove triggers (remote controller, tv, phone, playstation, food)",
        ],
        context:
          "Make sure your home office is cleaned up, organized and primed for maximal productivity. If possible, try to isolate it from your other rooms where you usually sleep/eat/relax and play. And remove all possible triggers for distractions like tv remotes, phones, play stations, books, food...",

        autoplay: true,
      },
      {
        timer: 120,
        autoplay: true,
        context:
          "Create a clear task list for that day or use the weekly planing routine (link) to make one. You should know exactly what you need to accomplish before you start working. ",

        question: "Create a todo list",
        responseType: "text",
      },
      {
        question: "Set a clear boundary",

        responseType: "text",
        timer: 60,

        autoplay: true,
        context:
          "Put an alarm that will ring when your work day is over. It's very easy to get carried over with tasks at home and blur the boundary of personal and proffesional life. Once the timer's up, conclude what you did and close work tabs and apps. ",
      },
      {
        question: "Work in Sprints",
        timer: 30,
        context:
          "Work in sprints 60-10 or 25-5? Use deep work or pomodoro routines for optimized performance and tempo. This allows for focused concentrated effort and small regular breaks to reset your mind and energize your body.",

        autoplay: true,

        options: ["Setup your own tempo and make sure you stick to the timers"],
        responseType: "checklist",
      },
      {
        responseType: "text",
        timer: 60,

        context:
          "What music works best for your producitvity? Try out different tracks and try with no music as well. See what actually makes you tick. Tip: try binural alpha waves music with headphones or relax/jazz music or even lo-fi. Pro tip: Brain.fm affiliate link.",
        autoplay: true,
        question: "Make a music playlist",
      },
      {
        context:
          "Have a ready water bottle next to you to keep yourself hydrated. Also make sure you learn at least 3 high quality stretches that you can do on chair and few for the breaks when you stand up and move. ",
        timer: 180,
        autoplay: true,
        options: ["Water bottle", "Learn stretching techniques (at least 3)"],

        question: "Prepare your tools",
        responseType: "checklist",
      },
      {
        autoplay: true,
        context:
          "Schedule a bigger rest or sport activity after work. This will relax and rejuvenate your mind after the long focused work day!",

        responseType: "checklist",
        timer: 90,
        question: "Plan a big rest",

        options: ["Schedule a big rest or sport activity"],
      },
    ],
    completionLimit: 1,
    emoji: "🏡",
  },
  {
    premiumId: "d6I4vz5wmaK9bbaoSWAg",
    triggerId: 4, // After Work
    categoryId: 1, // Work
    isPremium: true,

    emoji: "🧯",

    description:
      "Concept from Cal Newport's book Deep Work about putting a specific ritual to end the work day and transition to a relaxed personal time.",
    steps: [
      {
        question: "Is there any open loop that will be bogging me?",

        timer: 60,

        context:
          "Make sure to write down every possible thing that might slip in the personal time. Write all todos, notes and wrap up.",
        autoplay: true,
        responseType: "text",
      },
      {
        context: "Close everything work related",
        question: "Cleanup the space",
        timer: 30,

        autoplay: true,
        responseType: "checklist",

        options: ["Close tabs", "Close emails", "Close apps"],
      },
      {
        timer: 30,
        autoplay: true,

        responseType: "checklist",
        context:
          'Say in your mind or out loud: "Shutdown ritual complete".\nEnjoy the rest of your day :)',
        question: "Give a signal to your mind",
        options: ['Say "Shutdown ritual complete"'],
      },
    ],

    original: true,
    name: "Shutdown Ritual",

    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    frequency: "everyday",
    trigger: "i finish my work",
    completionLimit: 1,
    backgroundColor: "#ffb5a7",
  },
  {
    premiumId: "dRwiHxqqEXoQdCyVlHMy",
    triggerId: 4, // After Work
    categoryId: 1, // Work
    isPremium: true,
    backgroundColor: "#6d6875",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    description: "Run these questions to determine priority of a project",
    completionLimit: 1,
    trigger: "",
    steps: [
      {
        autoplay: false,

        context: "20 hours? 1 week? put details",
        timer: 60,

        question: "How much time it will take me to do this full version?",
        responseType: "text",
      },
      {
        context: "how much money $$$?\nhow soon the money will come?",

        autoplay: false,
        question: "What is the potential outcome?",

        timer: 45,
        responseType: "text",
      },
      {
        timer: 45,
        responseType: "text",
        autoplay: true,

        question: "How well is it aligned with my values/desires?",
      },
      {
        timer: 60,
        responseType: "text",
        context:
          "smallest validate feature, mini mvp explain and how long it can take my to do that? hours? days?",
        question: "What is the smallest validate version I can do?",
        autoplay: true,
      },
      {
        context:
          "What can i use to drive traffic from? \nHow viable is it to craft free posts and where should i put them? On which channels?",
        question: "What is the traffic source?",

        responseType: "text",

        autoplay: true,
        timer: 60,
      },
    ],
    emoji: "📐",
    frequency: "everyday",
    name: "Prioritize Project",

    original: true,
  },
  {
    premiumId: "dZlt9YVeTxdOhN0l3rzR",
    triggerId: 2, // Night
    categoryId: 2, // Self Knowledge
    isPremium: true,

    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Sunday",
      "Saturday",
    ],
    steps: [
      {
        autoplay: true,
        question: "What is my highest vision for my self?",
        context:
          "Correlated with the previous one, but this time specifically think about what do you want to become. What kind of person you see yourself as?",
        responseType: "text",

        timer: 300,
      },
      {
        autoplay: true,
        context:
          "Going deeper on your inner calling, your passion and your work... What do you think is the next stage of evolution or step? Do you feel like you need to change careers or everything goes well and you need to take your work/business to the next level? If so, what is that next level? ",
        responseType: "text",
        timer: 300,

        question: "What is the next level for my life purpose/career?",
      },
      {
        context:
          "If you feel that you are on the right track with what you do for a living, what is the next stage of evolution for that? What is the next level you need to take? And if you haven't found it yet -> link to find your life's work routine.",

        autoplay: true,
        responseType: "text",
        question: "What is the next level for my work or business?",
        timer: 300,
      },
    ],

    original: true,

    playCount: 1,

    frequency: "everyyear",
    backgroundColor: "#edff86",

    trigger: "",
    description:
      "Ask big questions to stir your life in the direction you really want to go. Do it once a year to keep it on tr",
    name: "Find your highest life vision",
    completionLimit: 1,
    emoji: "🪐",
  },
  {
    premiumId: "e1GhRdKYAZlkKVfpkgBz",
    triggerId: 1, // Morning
    categoryId: 2, // Self Knowledge
    isPremium: true,

    description: "Create few affirmations and recite them",

    original: true,
    trigger: "",

    completionLimit: "3",

    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    emoji: "🏵️",

    steps: [
      {
        question: "Choose Your Focus",
        autoplay: true,

        context:
          "Select an area of life you want to focus on today (e.g., work, health, relationships).",
        responseType: "text",
        timer: "120",
      },
      {
        timer: "180",
        autoplay: true,
        question: "Write Your Affirmations",
        responseType: "text",

        context:
          ' Write 3 affirmations that reinforce your chosen focus. Prompt: "What qualities do you want to embody today?"',
      },
      {
        responseType: "mood",
        timer: "180",
        question: "Recite Affirmations",
        context:
          "Recite each affirmation out loud three times, focusing on belief and emotion.",
        autoplay: true,
      },
    ],
    frequency: "everyday",
    playCount: 2,
    backgroundColor: "#edff86",
    name: "Affirmations Craft",
  },
  {
    premiumId: "egJZRUh8h7lFBKc1e2ri",
    triggerId: 1, // Morning
    categoryId: 1, // Work
    isPremium: true,
    name: "Plan my Day",
    description: "A simple process to help you focus on what matters most.",
    backgroundColor: "#efebce",
    emoji: "📜",
    isCopy: true,
    originalPathwayId: "aHd3mnf2uw8Ixx7Lp8Ys",

    playCount: 8,
    frequency: "everyday",
    completionLimit: 1,
    time: "Morning",
    steps: [
      {
        timer: 30,
        question: "What is the most important task for today?",
        minText: 5,
        currentStep: 1,
        context: "Write down the absolute must for today, 1 main FROG.",
        buttonText: "Next",

        responseType: "text",
        autoplay: true,
      },
      {
        autoplay: true,
        context: "These are important but not as much as the FROG.",
        responseType: "text",
        buttonText: "Next",
        timer: 45,

        minText: 10,
        currentStep: 2,
        question: "List 2 bonus tasks for today.",
      },
      {
        minText: 10,

        question: "Add 2 more extra tasks that are nice to have.",
        buttonText: "Complete",
        context:
          "These DONT add pressure! They are fun extras if I want to have fun.",
        timer: 30,
        currentStep: 3,
        autoplay: true,
        responseType: "text",
      },
    ],
  },
  {
    premiumId: "nRjUsyL5W97ZyhFrlEsk",
    triggerId: 2, // Night
    categoryId: 3, // Calm
    isPremium: true,
    description:
      "Before going to bed, go over the day and ask yourself powerful questions to make your future better.",
    name: "Night Reflection",
    frequency: "everyday",
    completionLimit: 1,
    backgroundColor: "#907ad6",
    emoji: "🌃",
    steps: [
      {
        responseType: "text",
        timer: "30",
        autoplay: true,

        question:
          "What is 1 thing you learned today that is worth remembering in the future to implement it?",
      },
      {
        context:
          "The top 1% of ideas worth remembering or reflecting upon from entire day.",
        autoplay: true,
        responseType: "text",

        question: "What are the top 3 ideas of today? ",
        timer: "30",
      },
      {
        question:
          "What is 1 thing that you want to do tomorrow based on today's wisdom?",
        timer: 0,

        responseType: "text",
        autoplay: true,
        context:
          "Add at least 1 task that will improve your life based on today's life experience gained.\n",
      },
      {
        question: "What 1 thing can be imporved for tomorrow?",
        responseType: "text",
        timer: "120",
        autoplay: true,

        context:
          "What 1 thing i can change from tomorrow and make it better so i dont have it recurringly happen as a problem?",
      },
    ],

    playCount: 3,
  },
];

const gptRoutines = [
  {
    premiumId: "1a2b3c4d5e6f7g8h9i0j",
    triggerId: 1, // Morning
    categoryId: 5, // Minimize
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Declutter Your Space",
    completionLimit: "1",

    emoji: "🧹",

    steps: [
      {
        context:
          "Decluttering can help you create a more organized and stress-free environment. Start by focusing on a small area to make the task manageable.",

        autoplay: true,
        question:
          "Choose one small area to declutter (e.g., a drawer, a shelf, or a corner of a room). What area will you focus on?",
        timer: 60,
        responseType: "text",
      },
      {
        context:
          "Remove everything from the area you've chosen. Sort items into three categories: keep, donate/sell, and discard.",
        autoplay: true,
        timer: 240,

        question:
          "Sort items into keep, donate/sell, and discard piles. Describe one item you're discarding and why.",
        responseType: "text",
      },
      {
        context:
          "Clean the area before placing the items you're keeping back in an organized manner.",
        autoplay: true,
        timer: 180,

        question:
          "How will you organize the items you're keeping to maintain a clutter-free space?",
        responseType: "text",
      },
    ],

    description: "Simplify your life by decluttering a small area each day.",
    backgroundColor: "#e0f7fa",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    premiumId: "2b3c4d5e6f7g8h9i0j1a",
    triggerId: 6, // Weekend
    categoryId: 3, // Calm
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyweek",

    name: "Digital Detox",
    completionLimit: "1",

    emoji: "📵",

    steps: [
      {
        context:
          "Taking a break from digital devices can help you reconnect with yourself and the present moment. Begin by setting a time frame for your digital detox.",

        autoplay: true,
        question:
          "For how long will you disconnect from your digital devices? (e.g., 1 hour, 3 hours, a full day)",
        timer: 60,
        responseType: "text",
      },
      {
        context:
          "Identify activities you can do without your digital devices to fill the time.",
        autoplay: true,
        timer: 180,

        question:
          "What activities will you do during your digital detox? (e.g., read a book, go for a walk, meditate)",
        responseType: "text",
      },
      {
        context:
          "Reflect on how you feel after spending time away from your devices. Did you notice any changes in your mood or focus?",
        autoplay: true,
        timer: 180,

        question: "How did you feel during and after your digital detox?",
        responseType: "text",
      },
    ],

    description:
      "Unplug and recharge by taking a break from your digital devices.",
    backgroundColor: "#ffccbc",
    days: ["Sunday"],
  },
  {
    premiumId: "3c4d5e6f7g8h9i0j1a2b",
    triggerId: 6, // Weekend
    categoryId: 5, // Minimize
    isPremium: false,
    original: true,
    trigger: "",
    frequency: "everymonth",
    name: "Simplify Your Wardrobe",
    completionLimit: "1",
    emoji: "👗",
    steps: [
      {
        context:
          "A simplified wardrobe can save you time and reduce decision fatigue. Start by identifying clothes you haven't worn in the past year.",

        autoplay: true,
        question:
          "Which clothes have you not worn in the past year? Make a list.",
        timer: 300,
        responseType: "text",
      },
      {
        context:
          "Sort these clothes into three categories: keep, donate/sell, and discard.",
        autoplay: true,
        timer: 300,

        question:
          "Sort your clothes into keep, donate/sell, and discard piles. Describe one item you're donating/selling and why.",
        responseType: "text",
      },
      {
        context:
          "Reorganize your wardrobe to make it more functional and accessible.",
        autoplay: true,
        timer: 300,

        question:
          "How will you reorganize your wardrobe to make it more functional?",
        responseType: "text",
      },
    ],

    description:
      "Reduce wardrobe clutter and make dressing easier by simplifying your wardrobe.",
    backgroundColor: "#f8bbd0",
    days: ["Saturday"],
  },
  {
    premiumId: "4d5e6f7g8h9i0j1a2b3c",
    triggerId: 1, // Morning
    categoryId: 4, // Play
    isPremium: false,
    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Spark Your Creativity",
    completionLimit: "1",

    emoji: "✨",

    steps: [
      {
        context:
          "Creativity often comes from exploring new perspectives and ideas. Start by engaging in a creative warm-up exercise.",

        autoplay: true,
        question:
          "Take 5 minutes to doodle, write a short poem, or brainstorm ideas. What did you create?",
        timer: 300,
        responseType: "text",
      },
      {
        context:
          "Reflect on a recent experience that made you feel inspired. This could be a place you visited, a book you read, or a conversation you had.",
        autoplay: true,
        timer: 180,

        question: "What recent experience made you feel inspired? Describe it.",
        responseType: "text",
      },
      {
        context:
          "Set a creative intention for the day. Decide on one creative task or project you want to focus on.",
        autoplay: true,
        timer: 120,

        question: "What is your creative intention for today?",
        responseType: "text",
      },
    ],

    description:
      "Kickstart your creativity with a daily warm-up and intention setting.",
    backgroundColor: "#ffeb3b",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    premiumId: "5e6f7g8h9i0j1a2b3c4d",
    triggerId: 5, // Afternoon
    categoryId: 2, // Self Knowledge
    isPremium: false,
    original: true,
    trigger: "",
    frequency: "everyweek",

    name: "Find Your Inspiration",
    completionLimit: "2",
    emoji: "🌟",
    steps: [
      {
        context:
          "Inspiration can come from various sources. Start by exploring something new that interests you, such as an article, a video, or a piece of art.",

        autoplay: true,
        question:
          "Spend 5 minutes exploring a new source of inspiration. What did you explore?",
        timer: 300,
        responseType: "text",
      },
      {
        context:
          "Reflect on how this new source of inspiration made you feel and what ideas it sparked.",
        autoplay: true,
        timer: 180,

        question:
          "How did this new source of inspiration make you feel? What ideas did it spark?",
        responseType: "text",
      },
      {
        context:
          "Identify one actionable step you can take to incorporate this new inspiration into your creative projects.",
        autoplay: true,
        timer: 120,

        question:
          "What is one actionable step you can take to incorporate this inspiration into your work?",
        responseType: "text",
      },
    ],

    description:
      "Discover and reflect on new sources of inspiration to fuel your creativity.",
    backgroundColor: "#bbdefb",
    days: ["Tuesday", "Thursday"],
  },
  {
    premiumId: "6f7g8h9i0j1a2b3c4d5e",
    triggerId: 1, // Morning
    categoryId: 4, // Play
    isPremium: false,
    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Prepare for Creative Work",
    completionLimit: "1",
    emoji: "🎨",
    steps: [
      {
        context:
          "Creating a conducive environment is crucial for productive creative work. Start by setting up your workspace.",

        autoplay: true,
        question:
          "Take 5 minutes to organize and clean your workspace. How does it look now?",
        timer: 300,
        responseType: "text",
      },
      {
        context:
          "Gather any materials or resources you'll need for your creative project.",
        autoplay: true,
        timer: 240,

        question:
          "What materials or resources do you need for your project? Gather them now.",
        responseType: "text",
      },
      {
        context:
          "Set a specific goal for your creative session. This will help you stay focused and motivated.",
        autoplay: true,
        timer: 180,

        question: "What is your specific goal for this creative session?",
        responseType: "text",
      },
      {
        context:
          "Begin your creative work with a brief warm-up exercise to get into the flow.",
        autoplay: true,
        timer: 300,

        question:
          "Start with a brief warm-up exercise (e.g., sketching, free writing). What did you do?",
        responseType: "text",
      },
    ],

    description:
      "Prepare your environment and mind for effective creative work.",
    backgroundColor: "#c8e6c9",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    premiumId: "7g8h9i0j1a2b3c4d5e6f",
    triggerId: 1, // Morning
    categoryId: 1, // Work
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Energizing Cold Shower",
    completionLimit: "1",

    emoji: "❄️",

    steps: [
      {
        context:
          "Cold showers can boost your energy levels and improve circulation. Start by preparing yourself mentally.",

        autoplay: true,
        question:
          "Take a deep breath and mentally prepare for a cold shower. How are you feeling right now?",
        timer: 60,
        responseType: "text",
      },
      {
        context:
          "Turn the water to a cold temperature and step into the shower. Focus on your breathing to stay calm.",
        autoplay: true,
        timer: 180,

        question:
          "Describe your experience during the cold shower. How did it make you feel?",
        responseType: "text",
      },
      {
        context:
          "Reflect on the immediate effects of the cold shower on your energy levels and mood.",
        autoplay: true,
        timer: 120,

        question: "How do you feel now compared to before the cold shower?",
        responseType: "text",
      },
    ],

    description:
      "Boost your energy and improve circulation with a refreshing cold shower.",
    backgroundColor: "#b3e5fc",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    premiumId: "8h9i0j1a2b3c4d5e6f7g",
    triggerId: 4, // After Work
    categoryId: 3, // Calm
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Nutritious Meal Preparation",
    completionLimit: "1",

    emoji: "🥗",

    steps: [
      {
        context:
          "Preparing a nutritious meal can significantly impact your energy levels. Start by choosing a healthy recipe.",

        autoplay: true,
        question:
          "Select a healthy recipe for your meal. What recipe did you choose?",
        timer: 180,
        responseType: "text",
      },
      {
        context: "Gather all the ingredients needed for your chosen recipe.",
        autoplay: true,
        timer: 120,

        question: "List the ingredients you have gathered.",
        responseType: "text",
      },
      {
        context:
          "Prepare and cook the meal, focusing on enjoying the process and the flavors.",
        autoplay: true,
        timer: 600,

        question:
          "Describe the process of preparing your meal. How did you feel during the preparation?",
        responseType: "text",
      },
      {
        context:
          "Reflect on the taste and the satisfaction of eating a nutritious meal.",
        autoplay: true,
        timer: 120,

        question: "How did the meal taste? How do you feel after eating it?",
        responseType: "text",
      },
    ],

    description: "Boost your energy with a nutritious meal prepared with care.",
    backgroundColor: "#c8e6c9",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    premiumId: "9i0j1a2b3c4d5e6f7g8h",
    triggerId: 1, // Morning
    categoryId: 1, // Work
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Physical Exercise Routine",
    completionLimit: "1",

    emoji: "🏋️",

    steps: [
      {
        context:
          "Regular physical exercise can boost your energy and improve overall health. Start with a warm-up.",

        autoplay: true,
        question:
          "Begin with a 5-minute warm-up. What exercises did you do for your warm-up?",
        timer: 300,
        responseType: "text",
      },
      {
        context:
          "Perform a series of exercises targeting different muscle groups. Include both cardio and strength training.",
        autoplay: true,
        timer: 1200,

        question:
          "What exercises did you perform during your workout? Describe your routine.",
        responseType: "text",
      },
      {
        context:
          "Cool down with some stretching exercises to relax your muscles and prevent soreness.",
        autoplay: true,
        timer: 300,

        question: "What stretching exercises did you do for your cool-down?",
        responseType: "text",
      },
      {
        context:
          "Reflect on how the exercise routine made you feel both physically and mentally.",
        autoplay: true,
        timer: 180,

        question: "How do you feel after completing your exercise routine?",
        responseType: "text",
      },
    ],

    description:
      "Increase your energy levels and improve your health with regular physical exercise.",
    backgroundColor: "#ffcc80",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    premiumId: "0a1b2c3d4e5f6g7h8i9j",
    triggerId: 6, // Weekend
    categoryId: 6, // Connect
    isPremium: false,
    //

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Strengthen Your Relationships",
    completionLimit: "1",

    emoji: "❤️",

    steps: [
      {
        context:
          "Building strong relationships requires regular effort and attention. Start by reaching out to someone you care about.",

        autoplay: true,
        question:
          "Reach out to a friend or family member. How did you contact them, and what did you talk about?",
        timer: 180,
        responseType: "text",
      },
      {
        context:
          "Reflect on how you can improve your relationship with this person.",
        autoplay: true,
        timer: 120,

        question:
          "What is one thing you can do to strengthen your relationship with this person?",
        responseType: "text",
      },
      {
        context: "Plan a small gesture or activity to show your appreciation.",
        autoplay: true,
        timer: 180,

        question:
          "What small gesture or activity can you plan to show your appreciation?",
        responseType: "text",
      },
    ],

    description:
      "Take daily steps to strengthen your relationships with friends and family.",
    backgroundColor: "#ffccbc",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    premiumId: "1b2c3d4e5f6g7h8i9j0a",
    triggerId: 6, // Weekend
    categoryId: 6, // Connect
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyweek",

    name: "Social Connection Boost",
    completionLimit: "1",

    emoji: "🌐",

    steps: [
      {
        context:
          "Social connections can enhance your well-being. Start by identifying a social activity you enjoy.",

        autoplay: true,
        question: "What social activity do you enjoy? Describe the activity.",
        timer: 120,
        responseType: "text",
      },
      {
        context:
          "Plan a time to engage in this social activity with friends or a group.",
        autoplay: true,
        timer: 180,

        question:
          "When will you engage in this social activity? Who will you invite?",
        responseType: "text",
      },
      {
        context:
          "Reflect on the experience after participating in the social activity.",
        autoplay: true,
        timer: 180,

        question:
          "How did the social activity make you feel? What did you enjoy most about it?",
        responseType: "text",
      },
    ],

    description:
      "Boost your social connections by engaging in enjoyable activities with others.",
    backgroundColor: "#c8e6c9",
    days: ["Tuesday", "Thursday"],
  },
  {
    premiumId: "2c3d4e5f6g7h8i9j0a1b",
    triggerId: 6, // Weekend
    categoryId: 6, // Connect
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyweek",

    name: "Deepen Your Connections",
    completionLimit: "1",

    emoji: "🤝",

    steps: [
      {
        context:
          "Deep connections are built through meaningful conversations. Start by selecting a topic for a deep conversation.",

        autoplay: true,
        question:
          "Choose a topic for a deep conversation. What topic did you choose?",
        timer: 120,
        responseType: "text",
      },
      {
        context:
          "Initiate a conversation with someone you want to connect with on a deeper level.",
        autoplay: true,
        timer: 180,

        question:
          "Who will you have this conversation with? How will you initiate it?",
        responseType: "text",
      },
      {
        context: "Reflect on the conversation and the insights you gained.",
        autoplay: true,
        timer: 240,

        question:
          "What insights did you gain from the conversation? How did it impact your relationship?",
        responseType: "text",
      },
    ],

    description:
      "Deepen your connections by having meaningful conversations with people you care about.",
    backgroundColor: "#ffe082",
    days: ["Sunday"],
  },
  {
    premiumId: "3d4e5f6g7h8i9j0a1b2c",
    triggerId: 1, // Morning
    categoryId: 2, // Self Knowledge
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Discover Your Authentic Self",
    completionLimit: "1",

    emoji: "🌱",

    steps: [
      {
        context:
          "Understanding your authentic self is crucial for living a fulfilling life. Start by reflecting on your core values.",

        autoplay: true,
        question:
          "What are your core values? List at least three values that are most important to you.",
        timer: 180,
        responseType: "text",
      },
      {
        context:
          "Consider your passions and interests. These often align with your authentic self.",
        autoplay: true,
        timer: 180,

        question:
          "What activities or topics make you feel most alive and engaged?",
        responseType: "text",
      },
      {
        context:
          "Reflect on times when you felt truly yourself and aligned with your values and passions.",
        autoplay: true,
        timer: 240,

        question:
          "Describe a moment when you felt truly yourself. What were you doing, and why did it feel authentic?",
        responseType: "text",
      },
    ],

    description:
      "Explore your core values, passions, and authentic moments to discover your true self.",
    backgroundColor: "#ffccbc",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    premiumId: "4e5f6g7h8i9j0a1b2c3d",
    triggerId: 5, // Afternoon
    categoryId: 2, // Self Knowledge
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyweek",

    name: "Find Your Life Purpose",
    completionLimit: "1",

    emoji: "🎯",

    steps: [
      {
        context:
          "Finding your life purpose can guide your career and personal choices. Start by identifying your strengths and talents.",

        autoplay: true,
        question:
          "What are your top strengths and talents? List at least three.",
        timer: 180,
        responseType: "text",
      },
      {
        context:
          "Consider what problems or challenges you feel passionate about solving.",
        autoplay: true,
        timer: 240,

        question:
          "What problems or challenges do you feel passionate about solving?",
        responseType: "text",
      },
      {
        context:
          "Reflect on how you can combine your strengths, talents, and passions to create a meaningful impact.",
        autoplay: true,
        timer: 240,

        question:
          "How can you combine your strengths and passions to create a meaningful impact in your career or life?",
        responseType: "text",
      },
    ],

    description:
      "Identify your strengths, passions, and potential impact to discover your life purpose.",
    backgroundColor: "#bbdefb",
    days: ["Tuesday", "Thursday"],
  },
  {
    premiumId: "5f6g7h8i9j0a1b2c3d4e",
    triggerId: 6, // Weekend
    categoryId: 2, // Self Knowledge
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyweek",

    name: "Discover Your Ideal Country to Live In",
    completionLimit: "1",

    emoji: "🌍",

    steps: [
      {
        context:
          "Living in a country that aligns with your values and lifestyle preferences can enhance your overall happiness. Start by identifying your top priorities for a living environment.",

        autoplay: true,
        question:
          "What are your top priorities for a living environment? (e.g., climate, cost of living, culture, career opportunities)",
        timer: 180,
        responseType: "text",
      },
      {
        context:
          "Research and list potential countries that meet your top priorities.",
        autoplay: true,
        timer: 300,

        question:
          "Which countries meet your top priorities? List at least three and describe why they appeal to you.",
        responseType: "text",
      },
      {
        context:
          "Reflect on how living in each of these countries would impact your daily life and overall happiness.",
        autoplay: true,
        timer: 300,

        question:
          "How would living in each of these countries impact your daily life and overall happiness?",
        responseType: "text",
      },
    ],

    description:
      "Explore your priorities and research potential countries to find your ideal place to live.",
    backgroundColor: "#c8e6c9",
    days: ["Sunday"],
  },
  {
    premiumId: "6g7h8i9j0a1b2c3d4e5f",
    triggerId: 6, // Weekend
    categoryId: 2, // Self Knowledge
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyweek",

    name: "Discover Your Values in Life",
    completionLimit: "1",

    emoji: "🧭",

    steps: [
      {
        context:
          "Understanding your core values helps guide your decisions and actions. Start by reflecting on what is most important to you.",

        autoplay: true,
        question:
          "What are the top five values that are most important to you in life? Why are they important?",
        timer: 240,
        responseType: "text",
      },
      {
        context:
          "Consider situations where you felt conflicted or uneasy. These moments often highlight values that are important to you.",
        autoplay: true,
        timer: 240,

        question:
          "Think of a time when you felt conflicted or uneasy. What values were being challenged?",
        responseType: "text",
      },
      {
        context:
          "Reflect on how you can align your daily actions and decisions with your core values.",
        autoplay: true,
        timer: 240,

        question:
          "How can you align your daily actions and decisions more closely with your core values?",
        responseType: "text",
      },
    ],

    description:
      "Identify and reflect on your core values to guide your decisions and actions in life.",
    backgroundColor: "#ffccbc",
    days: ["Monday", "Wednesday", "Friday"],
  },
  {
    premiumId: "7h8i9j0a1b2c3d4e5f6g",
    triggerId: 5, // Afternoon
    categoryId: 2, // Self Knowledge
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyweek",

    name: "Find Your Strengths and Unique Powers",
    completionLimit: "1",

    emoji: "💪",

    steps: [
      {
        context:
          "Recognizing your strengths and unique abilities helps you leverage them in your personal and professional life. Start by listing your top strengths.",

        autoplay: true,
        question:
          "What are your top five strengths? How have you demonstrated these strengths in your life?",
        timer: 240,
        responseType: "text",
      },
      {
        context:
          "Consider feedback from others. Sometimes, our strengths are more visible to those around us.",
        autoplay: true,
        timer: 240,

        question:
          "What positive feedback have you received from others about your strengths?",
        responseType: "text",
      },
      {
        context:
          "Reflect on how you can utilize your strengths more effectively in your daily life and future goals.",
        autoplay: true,
        timer: 240,

        question:
          "How can you utilize your strengths more effectively in your daily life and future goals?",
        responseType: "text",
      },
    ],

    description:
      "Identify and leverage your strengths and unique abilities to achieve your personal and professional goals.",
    backgroundColor: "#bbdefb",
    days: ["Tuesday", "Thursday"],
  },
  {
    premiumId: "8i9j0a1b2c3d4e5f6g7h",
    triggerId: 6, // Weekend
    categoryId: 2, // Self Knowledge
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyweek",

    name: "Discover What Inspires You",
    completionLimit: "1",

    emoji: "✨",

    steps: [
      {
        context:
          "Understanding what inspires and motivates you can provide insight into your passions and desires. Start by reflecting on activities you enjoy in your spare time.",

        autoplay: true,
        question:
          "What activities do you enjoy doing in your spare time? Why do you enjoy them?",
        timer: 240,
        responseType: "text",
      },
      {
        context:
          "Consider what drives you to pursue these activities. What underlying motivations or desires do they fulfill?",
        autoplay: true,
        timer: 240,

        question:
          "What drives you to pursue these activities? What underlying motivations or desires do they fulfill?",
        responseType: "text",
      },
      {
        context:
          "Reflect on how you can incorporate more of these inspiring and motivating activities into your daily life.",
        autoplay: true,
        timer: 240,

        question:
          "How can you incorporate more of these inspiring and motivating activities into your daily life?",
        responseType: "text",
      },
    ],

    description:
      "Identify what inspires and motivates you to better understand your passions and desires.",
    backgroundColor: "#c8e6c9",
    days: ["Sunday"],
  },
  {
    premiumId: "9j0a1b2c3d4e5f6g7h8i",
    triggerId: 2, // Night
    categoryId: 2, // Self Knowledge
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Reflect on Your Day",
    completionLimit: "1",

    emoji: "📝",

    steps: [
      {
        context:
          "Reflecting on your day helps you recognize successes and areas for improvement. Start by considering what went right today.",

        autoplay: true,
        question:
          "What went right today? List at least three positive events or actions.",
        timer: 180,
        responseType: "text",
      },
      {
        context:
          "Identify areas that did not go as planned and consider what went wrong.",
        autoplay: true,
        timer: 180,

        question: "What went wrong today? What could have been better?",
        responseType: "text",
      },
      {
        context:
          "Reflect on what you can learn from today's events and how you can improve for tomorrow.",
        autoplay: true,
        timer: 240,

        question:
          "What can you learn from today’s events, and how can you improve for tomorrow?",
        responseType: "text",
      },
    ],

    description:
      "Reflect on your day to recognize successes, identify areas for improvement, and learn from your experiences.",
    backgroundColor: "#ffccbc",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    premiumId: "0b1c2d3e4f5g6h7i8j9k",
    triggerId: 1, // Morning
    categoryId: 6, // Connect
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Learn from Social Interactions",
    completionLimit: "1",

    emoji: "🤝",

    steps: [
      {
        context:
          "Reflecting on your social interactions can provide valuable insights. Start by thinking about what you learned from people today.",

        autoplay: true,
        question:
          "What did you learn from people you interacted with today? List at least two things.",
        timer: 180,
        responseType: "text",
      },
      {
        context:
          "Consider how you can apply what you learned to improve your interactions and relationships.",
        autoplay: true,
        timer: 180,

        question:
          "How can you apply what you learned today to improve your interactions and relationships?",
        responseType: "text",
      },
      {
        context:
          "Reflect on the impact of these interactions on your personal and social growth.",
        autoplay: true,
        timer: 180,

        question:
          "How did today's interactions impact your personal and social growth?",
        responseType: "text",
      },
    ],

    description:
      "Reflect on your social interactions to learn from them and improve your relationships and personal growth.",
    backgroundColor: "#bbdefb",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    premiumId: "1c2d3e4f5g6h7i8j9k0l",
    triggerId: 1, // Morning
    categoryId: 1, // Work
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Productivity Tracking",
    completionLimit: "1",

    emoji: "📊",

    steps: [
      {
        context:
          "Tracking your productivity helps you understand your progress and areas for improvement. Start by listing the tasks you wanted to finish today.",

        autoplay: true,
        question: "What tasks did you plan to finish today? List them.",
        timer: 180,
        responseType: "text",
      },
      {
        context: "Reflect on what you accomplished today and what you did not.",
        autoplay: true,
        timer: 180,

        question:
          "What tasks did you complete today? What tasks did you not finish?",
        responseType: "text",
      },
      {
        context:
          "Identify reasons why you did not finish some tasks and consider how you can improve your planning.",
        autoplay: true,
        timer: 240,

        question:
          "Why did you not finish some tasks? How can you improve your planning and execution for tomorrow?",
        responseType: "text",
      },
    ],

    description:
      "Track your daily productivity to understand your progress, identify obstacles, and improve your planning and execution.",
    backgroundColor: "#c8e6c9",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    premiumId: "2d3e4f5g6h7i8j9k0l1m",
    triggerId: 6, // Weekend
    categoryId: 2, // Self Knowledge
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyweek",

    name: "Weekly Reflection: Takeaways",
    completionLimit: "1",

    emoji: "📅",

    steps: [
      {
        context:
          "Reflecting on your week helps you identify key takeaways and insights. Start by considering what you have learned this week.",

        autoplay: true,
        question:
          "What are the most important things you learned this week? List at least three.",
        timer: 240,
        responseType: "text",
      },
      {
        context:
          "Think about how you can apply these lessons to improve your life or work.",
        autoplay: true,
        timer: 240,

        question:
          "How can you apply these lessons to improve your life or work in the coming week?",
        responseType: "text",
      },
      {
        context:
          "Reflect on any challenges you faced and how you overcame them.",
        autoplay: true,
        timer: 240,

        question:
          "What challenges did you face this week and how did you overcome them?",
        responseType: "text",
      },
    ],

    description:
      "Reflect on your week to identify key takeaways, apply lessons, and recognize challenges overcome.",
    backgroundColor: "#ffccbc",
    days: ["Saturday", "Sunday"],
  },
  {
    premiumId: "3e4f5g6h7i8j9k0l1m2n",
    triggerId: 6, // Weekend
    categoryId: 2, // Self Knowledge
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everymonth",

    name: "Monthly Reflection: Wins",
    completionLimit: "1",

    emoji: "🏆",

    steps: [
      {
        context:
          "Reflecting on your monthly wins helps you understand what contributed to your successes. Start by listing your biggest wins this month.",

        autoplay: true,
        question:
          "What were your biggest wins this month? List at least three.",
        timer: 300,
        responseType: "text",
      },
      {
        context: "Analyze what factors contributed to these successes.",
        autoplay: true,
        timer: 300,

        question:
          "What factors contributed to these wins? How did they help you achieve success?",
        responseType: "text",
      },
      {
        context:
          "Reflect on how you can replicate these successes in the future.",
        autoplay: true,
        timer: 300,

        question:
          "How can you replicate these successes in the future? What steps will you take?",
        responseType: "text",
      },
    ],

    description:
      "Reflect on your monthly wins to understand success factors and plan to replicate them in the future.",
    backgroundColor: "#bbdefb",
    days: ["Saturday", "Sunday"],
  },
  {
    premiumId: "4f5g6h7i8j9k0l1m2n3o",
    triggerId: 6, // Weekend
    categoryId: 2, // Self Knowledge
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everymonth",

    name: "Monthly Reflection: Mistakes and Lessons",
    completionLimit: "1",

    emoji: "❌",

    steps: [
      {
        context:
          "Reflecting on your mistakes helps you learn and grow. Start by listing your biggest mistakes this month.",

        autoplay: true,
        question:
          "What were your biggest mistakes this month? List at least three.",
        timer: 300,
        responseType: "text",
      },
      {
        context:
          "Analyze what led to these mistakes and what you can learn from them.",
        autoplay: true,
        timer: 300,

        question:
          "What led to these mistakes? What lessons can you learn from them?",
        responseType: "text",
      },
      {
        context: "Reflect on how you can avoid these mistakes in the future.",
        autoplay: true,
        timer: 300,

        question:
          "How can you avoid these mistakes in the future? What changes will you make?",
        responseType: "text",
      },
    ],

    description:
      "Reflect on your monthly mistakes to understand their causes, learn from them, and plan to avoid them in the future.",
    backgroundColor: "#c8e6c9",
    days: ["Saturday", "Sunday"],
  },
  {
    premiumId: "5g6h7i8j9k0l1m2n3o4p",
    triggerId: 1, // Morning
    categoryId: 3, // Calm
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Gratitude Practice",
    completionLimit: "1",

    emoji: "🙏",

    steps: [
      {
        context:
          "Practicing gratitude can improve your mood and overall well-being. Start by thinking of three things you are grateful for today.",

        autoplay: true,
        question:
          "What are three things you are grateful for today? Describe why they are meaningful to you.",
        timer: 240,
        responseType: "text",
      },
      {
        context:
          "Consider someone who made a positive impact on your life recently.",
        autoplay: true,
        timer: 240,

        question:
          "Who is someone who made a positive impact on your life recently? How did they impact you?",
        responseType: "text",
      },
      {
        context:
          "Reflect on how expressing gratitude can enhance your relationships and mindset.",
        autoplay: true,
        timer: 240,

        question:
          "How can expressing gratitude enhance your relationships and mindset?",
        responseType: "text",
      },
    ],

    description:
      "Enhance your well-being and relationships by practicing daily gratitude.",
    backgroundColor: "#ffe082",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    premiumId: "6h7i8j9k0l1m2n3o4p5q",
    triggerId: 1, // Morning
    categoryId: 1, // Work
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Stretching Between Pomodoro Breaks",
    completionLimit: "1",

    emoji: "⏳",

    steps: [
      {
        context:
          "Taking regular breaks helps maintain productivity and well-being. Start your break with some stretching exercises.",

        autoplay: true,
        question:
          "Perform a series of stretches to relax your muscles. What stretches did you do?",
        timer: 180,
        responseType: "text",
      },
      {
        context: "Stay hydrated to keep your energy levels up.",
        autoplay: true,
        timer: 60,

        question: "Drink a glass of water. How do you feel after hydrating?",
        responseType: "text",
      },
      {
        context:
          "Take a few moments to breathe deeply and relax your mind before returning to work.",
        autoplay: true,
        timer: 120,

        question: "Take a few deep breaths. How do you feel now?",
        responseType: "text",
      },
    ],

    description:
      "Stay productive and energized by stretching, hydrating, and relaxing during your Pomodoro breaks.",
    backgroundColor: "#b3e5fc",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    premiumId: "7i8j9k0l1m2n3o4p5q6r",
    triggerId: 2, // Night
    categoryId: 3, // Calm
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Prepare for Sleep",
    completionLimit: "1",

    emoji: "🌙",

    steps: [
      {
        context:
          "Creating a bedtime routine can improve the quality of your sleep. Start by dimming the lights and reducing screen time.",

        autoplay: true,
        question:
          "Dim the lights and turn off your screens. How do you feel after reducing screen exposure?",
        timer: 120,
        responseType: "text",
      },
      {
        context: "Engage in a relaxing activity to help your mind unwind.",
        autoplay: true,
        timer: 240,

        question:
          "Engage in a relaxing activity (e.g., reading, meditating). What activity did you choose, and how did it make you feel?",
        responseType: "text",
      },
      {
        context:
          "Reflect on your day and set a positive intention for tomorrow.",
        autoplay: true,
        timer: 240,

        question:
          "Reflect on your day and set a positive intention for tomorrow. What is your intention?",
        responseType: "text",
      },
    ],

    description:
      "Prepare for a restful night's sleep with a calming bedtime routine.",
    backgroundColor: "#c8e6c9",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
];

const geminiRoutines = [
  {
    premiumId: "DeclutterPowerHour",
    triggerId: 6, // Weekend
    categoryId: 5, // Minimize
    isPremium: false,

    trigger: "",
    frequency: "everyweek",

    name: "Mindful Declutter Power Hour",
    completionLimit: 1,

    emoji: "🧹",

    steps: [
      {
        context:
          "Start by setting a timer for 10 minutes. Choose one small area to declutter, like a drawer, shelf, or countertop.",

        autoplay: true,
        question: "Which area will you tackle first? Be specific!",
        timer: 60,
        responseType: "text",
      },
      {
        context:
          "Now, set the timer for 50 minutes. Quickly sort items into three piles: keep, donate/sell, trash. Be decisive and don't overthink!",

        autoplay: true,
        question:
          "How many items did you sort into each pile? Keep, Donate/Sell, Trash?",
        timer: 3000,
        responseType: "text",
      },
      {
        context:
          "Immediately take action! Put away the 'keep' items neatly, bag up the 'donate/sell' pile, and throw away the trash.",

        autoplay: true,
        question: "How does the decluttered space feel? What emotions arise?",
        timer: 600,
        responseType: "text",
      },
      {
        context:
          "Reflect on the process. Did you find it easy or difficult? What did you learn about your attachment to things?",

        autoplay: true,
        question: "Share your reflections on the decluttering experience.",
        timer: 300,
        responseType: "text",
      },
    ],

    description: "Clear your space, clear your mind.",
    backgroundColor: "#f2e6d9",
    days: ["Saturday"],
  },
  {
    premiumId: "WardrobeCapsule",
    triggerId: 6, // Weekend
    categoryId: 5, // Minimize
    isPremium: false,

    trigger: "",

    name: "Wardrobe Capsule Creation",
    completionLimit: 1,
    frequency: "everymonth",
    emoji: "👕",

    steps: [
      {
        context:
          "Start by emptying your entire wardrobe onto your bed. This will give you a visual overview of everything you own.",

        autoplay: true,
        question: "Describe how you feel seeing all your clothes laid out.",
        timer: 180,
        responseType: "text",
      },
      {
        context:
          "Now, create three piles: Love It, Maybe, and Donate/Sell. The 'Love It' pile should only contain clothes you wear regularly and that make you feel great. The 'Maybe' pile is for items you're unsure about, and the 'Donate/Sell' pile is for anything you haven't worn in the past 6 months or that no longer fits your style.",

        autoplay: true,
        question: "How many items are in each pile?",
        timer: 1800,
        responseType: "text",
      },
      {
        context:
          "Try on the 'Maybe' items and be honest with yourself. If it doesn't spark joy or fit well, move it to the 'Donate/Sell' pile.",

        autoplay: true,
        question: "Did any 'Maybe' items move to the 'Love It' pile?",
        timer: 900,
        responseType: "text",
      },
      {
        context:
          "Put away the 'Love It' items back in your wardrobe, neatly organized. Bag up the 'Donate/Sell' items and take them out of your room immediately. Enjoy your curated, minimalist wardrobe!",

        autoplay: true,
        question:
          "How many items are now in your 'Love It' pile? How do you feel about your new wardrobe?",
        timer: 300,
        responseType: "text",
      },
    ],

    description: "Simplify your wardrobe and style with a capsule collection.",
    backgroundColor: "#c2e0c6",
    days: [],
  },
  {
    premiumId: "MinimalistHomeReset",
    triggerId: 1, // Morning
    categoryId: 5, // Minimize
    isPremium: false,
    original: true,
    trigger: "",
    frequency: "everyday",

    name: "15-Minute Minimalist Home Reset",
    completionLimit: 1,
    emoji: "🏠",
    steps: [
      {
        context:
          "Start by setting a timer for 15 minutes. Choose one room to focus on.",

        autoplay: true,
        question: "Which room will you reset today?",
        timer: 60,
        responseType: "text",
      },
      {
        context:
          "Quickly put away any items that are out of place. Clear surfaces, fluff pillows, and straighten any clutter.",

        autoplay: true,
        question: "Name 3 things you tidied up.",
        timer: 900,
        responseType: "text",
      },
      {
        context:
          "Do a quick sweep of the floor to remove any dirt or debris. This will instantly make the room feel more refreshed.",

        autoplay: true,
        question: "How does the room look and feel now?",
        timer: 120,
        responseType: "text",
      },
    ],

    description:
      "A quick daily reset to maintain a calm and clutter-free home.",
    backgroundColor: "#b3cde0",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    premiumId: "ReclaimAttention",
    triggerId: 4, // After Work
    categoryId: 3, // Calm
    isPremium: false,

    trigger: "",
    frequency: "everyday",

    name: "Reclaim Your Attention",
    completionLimit: 1,

    emoji: "📵",

    steps: [
      {
        context:
          "Start by putting your phone in Do Not Disturb mode. Turn off all notifications except essential calls.",

        autoplay: true,
        question: "Which apps are you most likely to mindlessly check?",
        timer: 180,
        responseType: "text",
      },
      {
        context:
          "Identify 1-2 activities you'll focus on instead of using your phone. Choose something engaging, like reading, writing, drawing, or spending time in nature.",

        autoplay: true,
        question:
          "What high-quality activities will you replace phone time with?",
        timer: 300,
        responseType: "text",
      },
      {
        context:
          "Now, set a timer for 30 minutes and fully immerse yourself in the chosen activities. Resist the urge to check your phone!",

        autoplay: true,
        question:
          "How did it feel to disconnect for a while? What did you notice about your focus and energy levels?",
        timer: 1800,
        responseType: "text",
      },
      {
        context:
          "Reflect on how you feel after your digital break. Was it easier or harder than you expected? What benefits did you experience?",

        autoplay: true,
        question:
          "Write down 3 positive changes you noticed during or after your digital break.",
        timer: 300,
        responseType: "text",
      },
    ],

    description: "Unplug from digital distractions and reclaim your focus.",
    backgroundColor: "#b3cde0",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    premiumId: "SimplifyCommitments",
    triggerId: 6, // Weekend
    categoryId: 5, // Minimize
    isPremium: false,

    trigger: "",
    frequency: "everyweek",

    name: "Simplify Your Commitments",
    completionLimit: 1,

    emoji: "📝",

    steps: [
      {
        context:
          "Begin by listing all your current commitments (work, social, personal, etc.). Include recurring tasks, appointments, and obligations.",

        autoplay: true,
        question: "What are all your current commitments?",
        timer: 300,
        responseType: "text",
      },
      {
        context:
          "Now, for each commitment, ask yourself: Does this activity bring me joy or significantly contribute to my goals? Is it truly necessary?",

        autoplay: true,
        question: "Which commitments are essential, and which are optional?",
        timer: 600,
        responseType: "text",
      },
      {
        context:
          "Identify 2-3 optional commitments you can eliminate or reduce. Politely decline invitations, delegate tasks, or simplify your schedule.",

        autoplay: true,
        question:
          "Which commitments will you eliminate or reduce? How will you do it?",
        timer: 600,
        responseType: "text",
      },
      {
        context:
          "Reflect on how you feel after decluttering your schedule. Do you have more time and energy for what truly matters?",

        autoplay: true,
        question: "How does your simplified schedule make you feel?",
        timer: 300,
        responseType: "text",
      },
    ],

    description: "Reduce your commitments to focus on what truly matters.",
    backgroundColor: "#f2e6d9",
    days: ["Sunday"],
  },
  {
    premiumId: "MindfulEating",
    triggerId: 5, // Afternoon
    categoryId: 3, // Calm
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Mindful Eating Practice",
    completionLimit: "3",

    emoji: "🍎",

    steps: [
      {
        context:
          "Before you begin eating, take a moment to observe your food. Notice the colors, textures, and aromas.",

        autoplay: true,
        question: "Describe what you see, smell, and feel about your meal.",
        timer: 120,
        responseType: "text",
      },
      {
        context:
          "Take a small bite and chew slowly. Pay attention to the flavors and how the food feels in your mouth.",

        autoplay: true,
        question: "What flavors and textures do you notice?",
        timer: 120,
        responseType: "text",
      },
      {
        context:
          "Continue eating slowly and mindfully. Put your utensils down between bites and savor each mouthful.",

        autoplay: true,
        question: "How does your body feel as you eat? Are you satisfied?",
        timer: 120,
        responseType: "text",
      },
      {
        context:
          "Reflect on your eating experience. Did you feel more present and connected to your food?",

        autoplay: true,
        question:
          "Share any insights or observations about your mindful eating practice.",
        timer: 120,
        responseType: "text",
      },
    ],

    description:
      "Savor each bite and cultivate a deeper connection to your food.",
    backgroundColor: "#c2e0c6",
    days: [],
  },
  {
    premiumId: "PlayfulCommute",
    triggerId: 4, // After Work
    categoryId: 4, // Play
    isPremium: false,
    original: true,
    trigger: "",
    frequency: "everyday",
    name: "Playful Commute Home",
    completionLimit: 1,
    emoji: "🚶",
    steps: [
      {
        context:
          "As you leave work, put on a playlist of your favorite upbeat or nostalgic songs. Let the music set a playful mood.",

        autoplay: true,
        question: "Which song makes you want to dance or sing along?",
        timer: 60,
        responseType: "text",
      },
      {
        context:
          "If possible, take a different route home, even if it's a bit longer. Explore a new street or park. Notice interesting details you might usually miss.",

        autoplay: true,
        question: "What new sights or sounds did you encounter on your route?",
        timer: 300,
        responseType: "text",
      },
      {
        context:
          "Engage your senses! Look for funny signs, interesting cloud formations, or colorful flowers. Listen to birds chirping or children laughing.",

        autoplay: true,
        question: "What made you smile or laugh during your commute?",
        timer: 120,
        responseType: "text",
      },
      {
        context:
          "If you're walking, skip or hop occasionally. If driving, sing along with the music or roll down your windows and feel the wind in your hair.",

        autoplay: true,
        question:
          "How did adding a bit of playfulness to your commute change your mood?",
        timer: 120,
        responseType: "text",
      },
    ],

    time: "After work",
    description:
      "Transform your commute into a playful transition from work to home.",
    backgroundColor: "#f2e6d9",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    premiumId: "PlaytimeRecharge",
    triggerId: 4, // After Work
    categoryId: 4, // Play
    isPremium: false,

    original: true,
    trigger: "",
    frequency: "everyday",

    name: "Evening Playtime Recharge",
    completionLimit: 1,

    emoji: "🎲",

    steps: [
      {
        context:
          "Schedule a dedicated 30-minute block for play after work. Choose an activity that truly brings you joy and helps you relax.",

        autoplay: true,
        question:
          "What playful activity will you choose tonight? (Board games, drawing, building LEGOs, etc.)",
        timer: 120,
        responseType: "text",
      },
      {
        context:
          "Eliminate distractions. Turn off your phone, close your laptop, and create a calm environment conducive to play.",

        autoplay: true,
        question: "What steps will you take to minimize distractions?",
        timer: 120,
        responseType: "text",
      },
      {
        context:
          "Now, immerse yourself in your chosen activity. Let go of worries and responsibilities, and simply enjoy the moment.",

        autoplay: true,
        question:
          "Describe how you feel as you engage in your playful activity. What emotions arise?",
        timer: 1800,
        responseType: "text",
      },
      {
        context:
          "Reflect on your experience. How did this dedicated playtime affect your mood and energy levels? Did it help you de-stress and recharge?",

        autoplay: true,
        question:
          "Share your insights about the benefits of incorporating playtime into your evening routine.",
        timer: 300,
        responseType: "text",
      },
    ],

    time: "Evening",
    description:
      "Unwind after work with a dedicated time for play and relaxation.",
    backgroundColor: "#c2e0c6",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    premiumId: "PlayfulMindBreak",
    triggerId: 3, // Before Work
    categoryId: 4, // Play
    isPremium: false,

    trigger: "",
    frequency: "everyday",

    name: "Playful Mind Break",
    frequency: "everyday",
    completionLimit: "3",

    emoji: "🤸",

    steps: [
      {
        context:
          "Take a short break from work or any task you're focused on. Stand up, stretch, and move your body.",

        autoplay: true,
        question:
          "What quick physical activity will you do to get your blood flowing? (Jumping jacks, stretching, dancing, etc.)",
        timer: 300,
        responseType: "text",
      },
      {
        context:
          "Choose a simple, playful activity that sparks joy. This could be anything from doodling to juggling to listening to a funny song.",

        autoplay: true,
        question: "What fun activity will you do for your mind break?",
        timer: 300,
        responseType: "text",
      },
      {
        context:
          "Set a timer for 5 minutes and fully engage in your playful activity. Let your mind wander and be creative.",

        autoplay: true,
        question:
          "How do you feel after your playful break? More refreshed and energized?",
        timer: 300,
        responseType: "text",
      },
    ],

    description:
      "Inject small doses of play into your day to refresh your mind.",
    backgroundColor: "#b3cde0",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
];

export const routines = [
  ...originalRoutines,
  ...gptRoutines,
  ...geminiRoutines,
];
