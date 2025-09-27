import { useEffect } from "react";
import { useRouter } from "expo-router";
import SplashScreen from "./splash";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the SignIn screen after a delay
    const timer = setTimeout(() => {
      router.replace("/signIn"); // Navigate to SignIn screen
    }, 4000); // 4 seconds splash time

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}
