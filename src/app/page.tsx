"use client";
import { useEffect, useState } from "react";
import PwaModal from "./components/pwaModal";

export default function Home() {
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setPrompt(event);
      console.log("beforeinstallprompt fired");
      // Mostrar el modal de instalación solo si la aplicación no está instalada ya
      const isNotInstalled =
        "standalone" in window.navigator
          ? !window.navigator.standalone
          : !window.matchMedia("(display-mode: standalone)").matches;
      if (isNotInstalled) {
        setShowInstallModal(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setPrompt(null);
        setShowInstallModal(false);
      });
    }
  };

  const handleOnCloseModal = () => {
    setPrompt(null);
    setShowInstallModal(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Puedes remover el JSON.stringify(prompt) después de que hayas terminado de depurar */}
      {JSON.stringify(prompt)}
      <PwaModal
        show={showInstallModal}
        onClose={handleOnCloseModal}
        onInstall={handleInstallClick}
      />
    </main>
  );
}
