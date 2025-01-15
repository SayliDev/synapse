import { useEffect, useState } from "react";

// Hook personnalisé pour l'effet d'écriture
const useTypewriterEffect = (
  content: string,
  isAi: boolean,
  scrollToBottom: () => void
) => {
  const [visibleWords, setVisibleWords] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    setVisibleWords([]);

    if (!isAi) {
      setVisibleWords(content.split(" "));
      requestAnimationFrame(scrollToBottom);
      return;
    }

    const words = content.split(" ");
    let index = 0;

    const animateText = () => {
      if (!mounted || index >= words.length) return;

      setVisibleWords((prev) => [...prev, words[index]]);
      requestAnimationFrame(scrollToBottom);
      index++;

      setTimeout(animateText, 30);
    };

    animateText();

    return () => {
      mounted = false;
    };
  }, [content, isAi, scrollToBottom]);

  return visibleWords.join(" ");
};

export default useTypewriterEffect;
