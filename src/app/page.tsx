"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MainMovie from "./modules/movie/main";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      // Avoid flicker by setting null first
      setIsLoggedIn(false);
      // Redirect after state update
      router.replace("/login"); // replace avoids back button issues
    }
  }, [router]);

  // Show loader while checking auth
  if (isLoggedIn === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (isLoggedIn) return <MainMovie />;

  return null; // never render anything if redirecting
}
