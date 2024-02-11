import { navigate } from "astro:transitions/client";
import React, { useEffect } from "react";

interface NavigationProps {
  next?: string;
  prev?: string;
}

export const Navigation = (props: NavigationProps) => {
  const { next, prev } = props;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "arrowleft":
          navigate(prev ?? '/');
          break;
        case "arrowright":
          navigate(next ?? '/');
          break;
      }
    }

    // Add event listener when component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return <></>;
}
