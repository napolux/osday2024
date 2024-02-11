import { navigate } from "astro:transitions/client";
import React, { useEffect } from "react";

interface NavigationProps {
  next?: string;
  prev?: string;
}

export const KeyboardManager = (props: NavigationProps) => {
  const { next, prev } = props;

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'f':
          toggleFullScreen();
          break;
        case "arrowleft":
          navigate(prev ?? '/');
          break;
        case "arrowright":
          navigate(next ?? '/');
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return <></>;
}
