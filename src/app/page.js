"use client";
import { Button } from "@/components/ui/button";
import {
  AlignVerticalDistributeCenter,
  ArrowDown,
  Briefcase,
  Check,
  CloudRainWind,
  Cross,
  Flower,
  Gamepad2,
  Gift,
  HeartHandshake,
  Minimize2,
  Minus,
  Plus,
  Quote,
  ScanEye,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { HackerNews, ProductHunt, Reddit, TwitterX } from "@/assets/svgs";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";
import logoImage from "@/assets/logo.png";
import heroImg from "@/assets/hero.png";

const avatars = [
  { avatar: "RB" },
  { avatar: "CN" },
  { avatar: "JM" },
  { avatar: "MG" },
];

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };
  return (
    <li>
      <button
        onClick={toggleFAQ}
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10 plausible-event-name=What+do+I+get+exactly?"
      >
        <span className="flex-1 text-gray-400 ">{faq.question}</span>

        {isOpen ? (
          <Minus className="flex-shrink-0 w-4 h-4 ml-auto fill-current" />
        ) : (
          <Plus className="flex-shrink-0 w-4 h-4 ml-auto fill-current" />
        )}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-5 leading-relaxed">
          <div className="space-y-4 leading-relaxed">
            <p>{faq.answer}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "What do I get exactly?",
      answer:
        "1/ Access to 50+ premium routines from famous people and books. 2/ Unlimited custom routines. 3/ Unlimited lists. 4/ Unlimited analytics. 5/ Gamification feature.",
    },
    {
      question: "How does the 7-day free trial work?",
      answer:
        "You get access to all the features in the Premium plan. If you cancel before the end of the trial, you won't be charged.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of the billing cycle.",
    },
  ];
  return (
    <section id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="sm:text-4xl text-3xl font-extrabold text-gray-400 mb-8">
            Frequently Asked Questions
          </p>
          <div className="text-gray-400/80">
            Have another question? Contact me on
            <a
              href="mailto:dejan.gavrilovikk@gmail.com"
              className="text-primary"
            >
              {" "}
              Email
            </a>{" "}
            or
            <a href="https://twitter.com/dekizeki" className="text-primary">
              {" "}
              Twitter
            </a>
          </div>
        </div>
        <ul className="basis-1/2">
          {faqData.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </ul>
      </div>
    </section>
  );
};

function YouTubeEmbed() {
  const embedId = "https://www.youtube.com/watch?v=Gli5allDOa8"; // Replace with actual ID

  return (
    <div className="video-responsive w-full flex justify-center items-center">
      <iframe
        width="380"
        height="280"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

const testemonials = [
  {
    person: "James Morris",
    role: "Developer",
    content:
      "As someone who constantly seeks self-improvement, PlayRoutines is the tool I`ve been waiting for. It takes the overwhelming amount of information from books and breaks it down into simple, guided routines. I`ve finally started seeing the results I`ve been aiming for.",
  },
  {
    person: "Andrew Klisiak",
    role: "Founder",
    content:
      "PlayRoutines has transformed my daily habits. The guided routines are exactly what I needed to stay on track and achieve my goals. It's like having a personal coach guiding me through each step.",
  },
];

const QuoteSingle = ({ quote }) => {
  const { person, role, content } = quote;
  return (
    <div className="space-y-4 max-w-md mx-auto mt-8">
      <Quote />
      <p className="md:text-lg leading-relaxed">{content}</p>
      <div className="flex items-center gap-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src="" />
          <AvatarFallback>JM</AvatarFallback>
        </Avatar>
        <p>{person}</p>
        <Badge className="bg-green-500">{role}</Badge>
      </div>
    </div>
  );
};

const freeFeatures = {
  title: "Starter",
  features: [
    "5 Premium Routines from famous people and books",
    "3 Custom Routines",
    "2 Lists",
    "7 Days Analytics",
  ],
  negativeFeatures: ["No Gamification"],
  isPremium: false,
  price: 0,
};

const premiumFeatures = {
  title: "Premium",
  features: [
    "50 Premium Routines from famous people and books",
    "Unlimited Custom Routines",
    "Unlimited Lists",
    "Unlimited Analytics",
    "Gamification Feature",
  ],
  isPremium: true,
  price: 99,
};

const PricingBox = ({ pricingData }) => {
  const { title, features, isPremium, negativeFeatures, price } = pricingData;
  return (
    <div
      className={`relative w-full bg-muted rounded ${
        isPremium && "border border-primary"
      }`}
    >
      {isPremium && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <span className="badge text-xs text-primary-content font-semibold border-0 bg-primary p-2 rounded">
            POPULAR
          </span>
        </div>
      )}
      {/* <div className="absolute -inset-[1px] rounded-[8px] bg-primary z-10"></div> */}
      <div className="relative flex flex-col gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-lg">
        <div className="flex justify-between items-center gap-4">{title}</div>

        <div className="flex gap-2">
          <div className="flex flex-col justify-end mb-[4px] text-lg">
            <p className="relative opacity-80">
              <span className="absolute bg-base-content h-[1.5px] inset-x-0 top-[48%]"></span>
              {isPremium && <span className="line-through">$199</span>}
            </p>
          </div>

          <p className="text-5xl tracking-tight font-extrabold">${price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs opacity-60 uppercase font-semibold">USD</p>
          </div>
        </div>

        <ul className="space-y-2.5 leading-relaxed text-base flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <span>
                <Check />
              </span>
              <span>{feature}</span>
            </li>
          ))}
          {negativeFeatures?.map((nfeature, i) => (
            <li key={i} className="flex items-center gap-2 ">
              <span>
                <X className="text-gray-400/30" />
              </span>
              <span className="text-gray-400/30">{nfeature}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-2">
          <Button className="w-full">Get Started</Button>
          <p className="flex items-center justify-center gap-2 text-sm text-center text-gray-400/80 font-medium relative">
            {isPremium
              ? "Pay once. Build unlimited routines."
              : "Try for free with limited features."}
          </p>
        </div>
      </div>
    </div>
  );
};

const CheckoutButton = () => {
  return <Button className="">Get PlayRoutines</Button>;
};

const ProblemsSection = () => {
  const problemsData = {
    title: "Transform Your Daily Life with Actionable Routines",
    description:
      "Are you tired of wasting time on content that never leads to real change? With PlayRoutines, turn valuable insights from top self-improvement books into actionable routines you can follow in real time.",
    problems: [
      {
        icon: "📘",
        text: "Excited to improve yourself",
      },
      {
        icon: "arrow",
      },
      {
        icon: "😬",
        text: "Spend hours reading and learning",
      },
      {
        icon: "arrow",
      },
      {
        icon: "🚫",
        text: "End up with 0 action and change",
      },
    ],
  };
  const { title, description, problems } = problemsData;
  return (
    <section id="problems">
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-40 text-center">
        <p className="font-extrabold mb-6 md:mb-8 text-4xl">{title}</p>
        <p className="max-w-xl mx-auto text-lg opacity-80 leading-relaxed mb-12 md:mb-20">
          {description}
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6">
          {problems.map((problem, i) =>
            problem.icon === "arrow" ? (
              <div
                key={i}
                className="shrink-0 w-12 fill-neutral-content opacity-70 max-md:-scale-x-100 md:-rotate-90 flex justify-center"
              >
                <ArrowDown />
              </div>
            ) : (
              <div
                key={i}
                className="w-full md:w-48 flex flex-col gap-2 items-center justify-center"
              >
                <span className="text-4xl">{problem.icon}</span>
                <p className="font-bold">{problem.text}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

const ProblemRedSection = () => {
  const problems = [
    {
      highlight: "100+ hrs",
      text: "reading books",
    },
    {
      highlight: "100+ hrs",
      text: "listening podcasts",
    },
    {
      highlight: "10+ hrs",
      text: "taking notes",
    },
    {
      highlight: "∞ hrs",
      text: "overthinking...",
    },
  ];
  return (
    <div className="relative py-24 px-8">
      <div className="dark:bg-neutral relative bg-yellow-200 text-neutral-content rounded-lg p-8 md:p-16 max-w-lg mx-auto text-center text-lg bg-[#2E1A05]">
        <div className="leading-relaxed space-y-4 md:space-y-6">
          <div className="text-neutral-content/80 space-y-1">
            {problems.map((problem, i) => (
              <p key={i}>
                <span className="text-red-400 font-medium">
                  {problem.highlight}
                </span>{" "}
                {problem.text}
              </p>
            ))}
          </div>
          <div className="text-xl font-semibold flex flex-col md:flex-row items-center justify-center gap-3">
            <p>
              <span className="text-red-400 font-medium"> = 250 hrs</span> of
              headaches
            </p>
            <CloudRainWind />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-16">
        <ArrowDown /> There`s an easier way
      </div>
    </div>
  );
};

const UseCases = () => {
  return (
    <section className="py-24 md:py-32 space-y-24 md:space-y-32 bg-base-100 ">
      <div className="px-8">
        <div className="mb-16 md:mb-24 space-y-8 md:space-y-10">
          <div className=" md:text-center max-w-2xl md:mx-auto text-4xl font-bold">
            Use cases
          </div>
          <p className="max-w-2xl mx-auto text-lg md:text-center text-base-content-secondary leading-relaxed">
            There are millions of ways to agitate a problem and drive action.
            Here are examples of 3 products:
          </p>
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  // return <div>Landing page in progress</div>;
  return (
    <div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
          <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-start">
            Transform Knowledge into Action with PlayRoutines
          </h1>

          <p className="text-lg opacity-80 leading-relaxed">
            The Only Self Improvement Platform that helps you apply knowledge,
            and not accumulate it.
          </p>

          <div className="space-y-4">
            <CheckoutButton />
            <p className="text-sm md:text-base flex justify-center items-center gap-2 md:text-sm">
              <Gift className="text-primary" />
              <span className="text-primary">$100 off </span>for the first 50
              customers (38 left)
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center align-center gap-3">
            <div className="flex flex-row -space-x-5 avatar-group justy-start">
              {avatars.map((avatar, i) => (
                <Avatar key={i} className="avatar w-12 h-12">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
            </div>

            <div className="flex gap-1">
              {avatars.map((_, i) => (
                <div key={i}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5 text-yellow-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              ))}
            </div>

            <div className="text-base text-gray-400/80">
              <span className="font-semibold text-gray-400">12</span> people put
              wisdom into practice
            </div>
          </div>
        </div>
        <Image
          src={heroImg}
          alt="hero"
          width={1000}
          height={1000}
          className="w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] rounded-lg object-center object-cover"
        />
      </div>
      <div className="p-8 md:p-12 flex flex-wrap items-center justify-center gap-4 md:gap-8">
        <span className="text-xs text-[10px] opacity-50"> Featured on</span>
        <Link href="https://www.producthunt.com/posts/playroutines">
          <HackerNews />
        </Link>
        <Link href="https://www.producthunt.com/posts/playroutines">
          <ProductHunt />
        </Link>
        <Link href="https://twitter.com/dekizeki">
          <TwitterX />
        </Link>
        <Link href="https://www.producthunt.com/posts/playroutines">
          <Reddit />
        </Link>
      </div>
      <ProblemsSection />
      <ProblemRedSection />
      <div className="py-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-base-100 max-md:px-8 max-w-3xl">
            <h2 className="font-bold text-3xl lg:text-5xl tracking-tight mb-8">
              Supercharge your app instantly, launch faster, make $
            </h2>
            <div className="text-gray-400/80 leading-relaxed mb-8 lg:text-lg">
              Login users, process payments and send emails at lightspeed. Spend
              your time building your startup, not integrating APIs. ShipFast
              provides you with the boilerplate code you need to launch, FAST.
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 md:flex justify-start gap-4 md:gap-12 max-md:px-8 max-w-3xl mx-auto mb-8">
        <div className="flex flex-col items-center justify-center gap-3 select-none cursor-pointer p-2 duration-100 text-gray-400/50">
          <Briefcase size={20} />
          <span className="font-medium text-sm">Work</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 select-none cursor-pointer p-2 duration-100 text-gray-400/50">
          <ScanEye size={20} />
          <span className="font-medium text-sm">Self-Know</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 select-none cursor-pointer p-2 duration-100 text-gray-400/50">
          <Minimize2 size={20} />
          <span className="font-medium text-sm">Minimize</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 select-none cursor-pointer p-2 duration-100 text-gray-400/50">
          <Flower size={20} />
          <span className="font-medium text-sm">Calm</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 select-none cursor-pointer p-2 duration-100 text-gray-400/50">
          <HeartHandshake size={20} />
          <span className="font-medium text-sm">Connect</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 select-none cursor-pointer p-2 duration-100 text-gray-400/50">
          <Gamepad2 size={20} />
          <span className="font-medium text-sm">Play</span>
        </div>
      </div>
      <div className="bg-muted">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-center md:justify-start md:items-center gap-12">
          <div className="text-gray-400/80 leading-relaxed space-y-4 px-12 md:px-0 py-12 max-w-xl animate-opacity">
            <p className="font-medium text-gray-400 text-lg">Title</p>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <Check /> Send transactional emails
              </li>
              <li className="flex items-center gap-2 text-green-400 font-medium">
                <Check /> Send transactional emails
              </li>
            </ul>
          </div>
        </div>
      </div>

      <UseCases />

      <section className="bg-base-100">
        <div className="py-24 max-md:px-8 max-w-3xl mx-auto">
          <div className="leading-relaxed text-gray-400/80 mb-12 max-w-xl mx-auto">
            <Image
              src="/images/hero.png"
              alt="Dejan Gavrilovic"
              width={200}
              height={200}
              className="w-32 h-32 md:w-52 md:h-52 rounded-lg float-left mr-8 mb-8 object-center object-cover"
            />
            <p className="mb-4 text-gray-400 md:text-lg font-medium">
              Hey, it’s Dejan 👋
            </p>
            <p className="mb-4 text-gray-400 md:text-lg font-medium">
              In my quest for self-improvement, I’ve read over 150 books, but
              after five long years, I had little to show for it.
            </p>
            <p className="mb-4 text-gray-400 md:text-lg font-medium">
              All that changed when I shifted my focus from theory to actionable
              steps—real actions that lead to actual changes in life.
            </p>
            <p className="mb-4 text-gray-400 md:text-lg font-medium">
              At first, I started writing these actionable steps for myself,
              compressing the wisdom of countless books into small, guided
              routines.
            </p>
            <p className="mb-4 text-gray-400 md:text-lg font-medium">
              These step-by-step packages, which I call routines, transformed my
              life by helping me execute and achieve real results in anything I
              pursued.
            </p>
            <ul className="list-inside list-decimal space-y-1.5 ml-5 mb-5">
              <li>
                <span className="text-gray-400 font-medium">Analyse </span>
                and track the routines.
              </li>
              <li>
                <span className="text-gray-400 font-medium">Guided App</span>
                that takes you by the hand and guides me through each step of
                every routine.
              </li>
            </ul>
          </div>

          <YouTubeEmbed />

          <QuoteSingle quote={testemonials[0]} />
        </div>
      </section>

      <section className="bg-base-200 overflow-hidden" id="pricing">
        <div className="py-24 pb-0 px-8 max-w-5xl mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <p className="font-medium text-primary mb-8">Pricing</p>
            <h2 className="font-bold text-3xl lg:text-5xl tracking-tight mb-8 max-w-2xl mx-auto">
              Save Time, Stay Focused, See Actual Change!
            </h2>
            <p className="text-sm md:text-base flex justify-center items-center gap-2 md:text-sm">
              <Gift className="text-primary" />
              <span className="text-primary">$100 off </span>for the first 50
              customers (38 left)
            </p>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-8">
            <PricingBox pricingData={freeFeatures} />
            <PricingBox pricingData={premiumFeatures} />
          </div>
        </div>

        <div className="space-y-4 mx-auto max-w-md mt-24">
          <QuoteSingle quote={testemonials[1]} />
        </div>
      </section>

      <FAQ />

      <section>
        <div className="py-24 px-4 max-w-7xl mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <div className="mb-8">
              <h2 className="sm:text-5xl text-4xl font-extrabold text-gray-400">
                100+ people apply wisdom into practice daily
              </h2>
            </div>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-400/80">
              They optimize each day with PlayRoutines.
            </p>
          </div>

          <ul className="max-w-7xl mx-auto md:columns-2 lg:columns-3 xl:columns-4 space-y-4 md:space-y-6 md:gap-6">
            <li className="break-inside-avoid max-md:flex justify-center">
              <figure className="relative h-full w-full max-w-[550px] p-6 rounded-xl border border-base-content/20 bg-[#2d1e1a] ">
                <blockquote className="relative">
                  <div className="text-base xl:text-sm text-gray-400">
                    Really easy to use. The tutorials are really useful and
                    explains how everything works. Hope to ship my next project
                    really fast!
                  </div>
                </blockquote>
                <figcaption className="relative flex items-center justify-start gap-4 pt-4 mt-4 border-t border-base-content/10">
                  <div className="overflow-hidden rounded-full bg-base-300 shrink-0">
                    <Avatar className="w-12 h-12" src="">
                      <AvatarImage src="" />
                      <AvatarFallback>MG</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="w-full flex items-end justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium text-gray-400">
                        Sergiu Chiriac
                      </div>
                      <div className="mt-0.5 text-sm text-gray-400/60">
                        @sergi
                      </div>
                    </div>

                    <a
                      href="https://www.producthunt.com/posts/shipfast-2?comment=2707228"
                      target="_blank"
                      class="shrink-0 "
                      aria-label="See user review on Product Hunt"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 26.245 26.256"
                        class="w-6 h-6"
                      >
                        <path
                          d="M26.254 13.128c0 7.253-5.875 13.128-13.128 13.128S-.003 20.382-.003 13.128 5.872 0 13.125 0s13.128 5.875 13.128 13.128"
                          fill="#da552f"
                        ></path>
                        <path
                          d="M14.876 13.128h-3.72V9.2h3.72c1.083 0 1.97.886 1.97 1.97s-.886 1.97-1.97 1.97m0-6.564H8.53v13.128h2.626v-3.938h3.72c2.538 0 4.595-2.057 4.595-4.595s-2.057-4.595-4.595-4.595"
                          fill="#fff"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </figcaption>
              </figure>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className="pb-32 pt-16 px-8 max-w-3xl mx-auto flex flex-col items-center gap-8 md:gap-12">
          <div className="text-center">
            <h2 className="relative font-bold text-3xl md:text-5xl tracking-tight mt-4 mb-4 md:mb-8 ">
              Turn notes into actionable routines
            </h2>
            <p className="relative text-lg text-gray-400/80">
              Don`t let the hours spent reading and learning go to waste.
            </p>
          </div>
          <CheckoutButton />
        </div>
      </section>
      <footer className="bg-base-200 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className=" flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
            <div className="w-80 max-w-full flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
              <div className="flex gap-2 justify-center md:justify-start items-center">
                <Image src={logoImage} alt="logo" width={24} height={24} />
                <div className="font-extrabold tracking-tight text-base md:text-lg">
                  PlayRoutines
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-400/80 leading-relaxed">
                Apply your knowledge, don`t accumulate it <br /> Copyright ©
                2024 - All rights reserved
              </p>
              <div className="mt-8 space-y-2 md:hidden">
                <p className="font-medium text-sm">
                  We build together on Discord!
                </p>
                <div className="flex justify-center">
                  <button className="flex p-2 rounded-[10px] text-sm items-center gap-2 btn text-white border-[#7289da] bg-[#7289da] hover:bg-[#596dac] active:bg-[#596dac] hover:border-[#596dac] active:border-[#596dac] btn-sm">
                    <FaDiscord />
                    Join Us
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-grow flex flex-wrap md:pl-24 -mb-10 md:mt-0 mt-10 text-center md:text-left">
              <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                <div className="footer-title font-semibold text-gray-400 tracking-widest text-sm md:text-left mb-3">
                  LINKS
                </div>
                <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                  <a className="link link-hover" href="#pricing">
                    Pricing
                  </a>
                  <a className="link link-hover" href="#faq">
                    FAQ
                  </a>
                  <a
                    href="mailto:dejan.gavrilovikk@gmail.com"
                    target="_blank"
                    class="link link-hover"
                  >
                    Support
                  </a>
                </div>
              </div>
              <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                <div className="footer-title font-semibold text-gray-400 tracking-widest text-sm md:text-left mb-3">
                  LEGAL
                </div>
                <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                  <Link className="link link-hover" target="blank" href="/tos">
                    Terms of services
                  </Link>
                  <Link
                    className="link link-hover"
                    target="blank"
                    href="/privacy-policy"
                  >
                    Privacy policy
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                <div className="footer-title font-semibold text-gray-400 tracking-widest text-sm md:text-left mb-3">
                  MORE
                </div>
                <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                  <Link className="link link-hover" href="/mybooklist">
                    My book list
                  </Link>
                  <Link className="link link-hover" href="/100questions">
                    The 100 Questions
                  </Link>
                  <Link className="link link-hover" href="/routinesgallery">
                    Routines Gallery
                  </Link>
                  <Link className="link link-hover" href="/routinesgallery">
                    Use Cases
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
