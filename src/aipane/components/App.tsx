/*
=========================================================
* © 2024 Ronan LE MEILLAT for SCTG Development
=========================================================
*/
import * as React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { BrainCircuit20Regular } from "@fluentui/react-icons";
import { insertText } from "../aipane";
import HeroApiKey from "./HeroApiKey";
import HeroComboPrompts from "./HeroComboPrompts";
import HeroModels from "./HeroModels";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC<AppProps> = (props: AppProps) => {
  const styles = useStyles();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);

  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const listItems: HeroListItem[] = [
    {
      icon: <BrainCircuit20Regular />,
      primaryText: "Take benefit of the AI",
    },
  ];

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    if (!storedApiKey) {
      setShowApiKeyInput(true);
    } else {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const handlePromptChange = (prompt: string) => {
    setPrompt(prompt);
  };

  const handleApiKeySubmit = () => {
    if (apiKey) {
      localStorage.setItem("apiKey", apiKey);
      setShowApiKeyInput(false);
    }
  };

  const handleModelChange = (newValue: string) => {
    setModel(newValue);
  };

  const handlePromptSubmit = (userText: string) => {
    const apiKey = localStorage.getItem("apiKey");
    insertText(model, apiKey, prompt, `${userText}`);
  };

  return (
    <div className={styles.root}>
      <Header logo="assets/logo-filled.png" title={props.title} message="AI emailer" />
      {showApiKeyInput ? (
        <HeroApiKey apiKey={apiKey} onApiKeyChange={handleApiKeyChange} onApiKeySubmit={handleApiKeySubmit} />
      ) : (
        <>
          <HeroList message="Ask Llama" items={listItems} />
          <HeroModels onChange={handleModelChange} />
          <HeroComboPrompts onChange={handlePromptChange} />
          <TextInsertion insertText={handlePromptSubmit} basePrompt={""} />
        </>
      )}
    </div>
  );
};

export default App;
