import React, { useState } from "react";
import "./Stuttering.css";

const Stuttering: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [stutterWords, setStutterWords] = useState<string[]>([]);
  const [stutterType, setStutterType] = useState<string>("repeat-first");
  const [repeatLetters, setRepeatLetters] = useState<string[]>([]);
  const [repeatEverywhere, setRepeatEverywhere] = useState<boolean>(false);
  const [rhythm, setRhythm] = useState<number>(2); // Default rhythm

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);
    setOutputText(stutterText(value));
  };

  const handleStutterWordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const words = e.target.value
      .split(",")
      .map((word) => word.trim().toLowerCase());
    setStutterWords(words);
  };

  const handleStutterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStutterType(e.target.value);
  };

  const handleRepeatLettersChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const letters = e.target.value
      .split(",")
      .map((letter) => letter.trim().toLowerCase());
    setRepeatLetters(letters);
  };

  const handleRepeatEverywhereChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement; // Type assertion
    setRepeatEverywhere(target.checked);
  };

  const handleRhythmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement; // Type assertion
    setRhythm(Number(target.value));
  };

  const isPunctuation = (char: string): boolean => {
    return /[0-9!@#$%^&*(),.?":{}|<>]/.test(char);
  };

  const stutterWord = (word: string, stutterType: string): string => {
    if (word.length > 1) {
      switch (stutterType) {
        case "repeat-first":
          return `${word[0]}-${word}`;
        case "repeat-word":
          return `${word}... ${word}`;
        case "repeat-letter":
          return repeatSpecificLetters(word);
        default:
          return "";
      }
    }
    return word; // No stuttering for words not in the list
  };

  const repeatSpecificLetters = (word: string): string => {
    return word
      .split("")
      .map((char, index) => {
        if (repeatLetters.includes(char.toLowerCase())) {
          return repeatEverywhere || index === 0 ? `${char}-${char}` : char;
        }
        return char;
      })
      .join("");
  };

  const applyRhythmStutter = (words: string[]): string[] => {
    console.log("applyRhythmStutter");
    return words.map((word, index) =>
      (index + 1) % rhythm === 0 ? stutterWord(word, stutterType) : word
    );
  };

  const stutterText = (text: string): string => {
    const words = text.split(" ");
    const processedWords = words.map((word) => {
      let startPunct = "",
        endPunct = "";
      if (isPunctuation(word[0])) {
        startPunct = word[0];
        word = word.slice(1);
      }
      if (isPunctuation(word[word.length - 1])) {
        endPunct = word[word.length - 1];
        word = word.slice(0, -1);
      }

      if (repeatSpecificLetters.length <= 0) {
        word = repeatSpecificLetters(word);
        return `${startPunct}${word}${endPunct}`;
      } else {
        return stutterWord(word, stutterType);
      }
    });

    const stutteredWords = applyRhythmStutter(processedWords);
    return stutteredWords.join(" ");
  };

  return (
    <div className="container">
      <div className="text-area">
        <div className="input-section">
          <h3>Input</h3>
          <textarea
            id="input-text"
            placeholder="Type your text here..."
            value={inputText}
            onChange={handleInputChange}
          />
        </div>

        <div className="output-section">
          <h3>Output</h3>
          <div id="output-text">
            {outputText || "Your transformed text will appear here..."}
          </div>
        </div>
      </div>

      <div className="config-area">
        <div className="options-section">
          <h3>Options</h3>

          <label htmlFor="stutter-words">
            Stutter specific words (comma separated):
          </label>
          <input
            type="text"
            id="stutter-words"
            placeholder="e.g., hello, world"
            onChange={handleStutterWordsChange}
          />

          <label htmlFor="stutter-type">Stutter style:</label>
          <select
            id="stutter-type"
            value={stutterType}
            onChange={handleStutterTypeChange}
          >
            <option value="repeat-first">Repeat first letter</option>
            <option value="repeat-word">Repeat whole word</option>
            <option value="repeat-letter">Repeat specific letters</option>
          </select>

          <label htmlFor="repeat-letters">
            Repeat specific letters (comma separated):
          </label>
          <input
            type="text"
            id="repeat-letters"
            placeholder="e.g., a, e, i"
            onChange={handleRepeatLettersChange}
          />

          <label>
            Repeat letters everywhere:
            <input
              type="checkbox"
              checked={repeatEverywhere}
              onChange={handleRepeatEverywhereChange}
            />
          </label>

          <label htmlFor="rhythm">Rhythm (e.g., every 2nd word):</label>
          <input
            type="number"
            id="rhythm"
            value={rhythm}
            onChange={handleRhythmChange}
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default Stuttering;
