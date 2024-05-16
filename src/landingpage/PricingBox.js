import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { GiCheckMark } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";
import logo2Img from "@/assets/logo4.png";
import logo3Img from "@/assets/logo3.png";

export const PricingBox = ({ data, isAuthenticated }) => {
  const isPremium = data.title === "Premium";
  return (
    <Card
      className="lg:w-1/3 md:w-1/2"
      style={isPremium ? { border: "1px solid yellow" } : {}}
    >
      <div className="flex justify-start items-center w-full h-[100px] pl-8">
        {isPremium ? (
          <Image src={logo2Img} alt="logo 2" width={75} height={75} />
        ) : (
          <Image src={logo3Img} alt="logo 3" width={75} height={75} />
        )}
      </div>

      <CardHeader className="pt-4">
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <h2 className="scroll-m-20  pb-2 text-3xl font-semibold">
            {data.price}
          </h2>

          <div className="text-md font-semibold h-[20px]">
            {isPremium ? "One Year Access" : ""}
          </div>
        </div>

        <div className="text-sm font-semibold">Features:</div>
        <div>
          {data.features.map((feature, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0"
            >
              {/* <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" /> */}
              <GiCheckMark />
              <div className="space-y-1">
                <p className="text-sm  leading-none">{feature}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <Link href="/signup">
            <Button
              variant={isPremium ? "default" : "outline"}
              className="w-full"
            >
              {data.cta}
            </Button>
          </Link>
        </div>
        {/* {isAuthenticated ? (
          <>
            {isPremium ? (
              <Button className="w-full">Change your life</Button>
            ) : (
              <Button variant="outline" disabled className="w-full">
                Active Plan
              </Button>
            )}
          </>
        ) : (
          <div className="w-full">
            <Link href="/signup">
              <Button className="w-full">{data.cta}</Button>
            </Link>
          </div>
        )} */}
      </CardFooter>
    </Card>
  );
};
