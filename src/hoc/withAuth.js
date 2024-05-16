"use client";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobxStore from "@/mobx";

const withAuth = (WrappedComponent) => {
  const AuthWrapper = observer((props) => {
    const { user, authLoading } = MobxStore;
    const router = useRouter();

    useEffect(() => {
      if (!authLoading && !user) {
        router.push("/login");
      }
    }, [user, authLoading, router]);

    // if (authLoading) {
    //   return <div>authLoading...</div>;
    // }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  });

  return AuthWrapper;
};

export default withAuth;
