"use client";

import { useEffect, useState } from "react";

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function detectPlatform() {
  if (typeof window === "undefined") return "other";
  const ua = window.navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua) && !window.MSStream) return "ios";
  if (/android/i.test(ua)) return "android";
  if (/macintosh|windows|linux/i.test(ua)) return "desktop";
  return "other";
}

// Hook compartido para el botón "Instalar": se muestra siempre que la app no
// esté ya instalada. Si Chrome/Edge ofreció su prompt nativo (beforeinstallprompt)
// lo usamos directo; si no (Safari, heurísticas de Chrome no cumplidas, etc.)
// devolvemos el tipo de dispositivo para mostrar instrucciones manuales.
export default function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [standalone, setStandalone] = useState(false);
  const [platform, setPlatform] = useState("other");

  useEffect(() => {
    setStandalone(isStandalone());
    setPlatform(detectPlatform());

    function onBeforeInstallPrompt(e) {
      e.preventDefault();
      setDeferredPrompt(e);
    }
    function onInstalled() {
      setDeferredPrompt(null);
      setStandalone(true);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    return true;
  }

  return {
    canInstall: !standalone,
    hasNativePrompt: !!deferredPrompt,
    platform,
    install,
  };
}
