import { navigate } from "astro:transitions/client";
import React, { useEffect } from "react";

interface NavigationProps {
  next?: string;
  prev?: string;
}

const activateFullScreen = () => {
  document.documentElement.requestFullscreen().catch((err) => {
    console.error(
      `Error attempting to enable full-screen mode: ${err.message}`
    );
  });
};

const exitFullScreen = () => document.exitFullscreen();

export const KeyboardManager = (props: NavigationProps) => {
  const { next, prev } = props;

  const toggleFullScreen = () => {
    (document.fullscreenElement) ? exitFullScreen() : activateFullScreen();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case '.':
        case 'f':
          toggleFullScreen();
          break;
        case "arrowleft":
        case "arrowup":
        case "pageup":
          navigate(prev ?? '/');
          break;
        case "arrowright":
        case "arrowdown":
        case "pagedown":
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
