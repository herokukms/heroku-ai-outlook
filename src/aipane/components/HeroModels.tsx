/*
=========================================================
* © 2024 Ronan LE MEILLAT for SCTG Development
=========================================================
*/
import * as React from "react";
import { Dropdown, Label, makeStyles, Option, useId } from "@fluentui/react-components";
import { useState, useEffect } from "react";
import config from "../../config.json"; // Assurez-vous que le chemin est correct
import type { AIModel } from "../AIPrompt";

interface HeroModelsProps {
  onChange: (selectedValue: string) => void;
  //readValue: () => string;
}

function getDefaultModel(): AIModel {
   return config.models.filter((model: AIModel) => model.default)[0];
}
const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: "flex",
    flexDirection: "column",
    // Use 2px gap below the label (per the design system)
    gap: "2px",
    margin: "10px",
  },
  combobox: {
    marginTop: "20px",
    marginBottom: "20px",
  },
});

const HeroModels: React.FC<HeroModelsProps> = ({ onChange }) => {
  const styles = useStyles();
  const selectId = useId("select");
  const [selectedValue, setSelectedValue] = useState<string>(getDefaultModel().id);

  const handleChange = (event: React.FormEvent<HTMLButtonElement>, option?: any) => {
    event.preventDefault();
    const newValue = option.nextOption?.value || getDefaultModel().id;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue]);

  return (
    <div className={styles.root}>
      <Label htmlFor={selectId} size="large">
        Model
      </Label>
      <Dropdown
        className={styles.combobox}
        id={selectId}
        defaultSelectedOptions={[getDefaultModel().id]}
        defaultValue={getDefaultModel().name}
        onActiveOptionChange={handleChange}
        onChange={handleChange}
      >
        {config.models.map((option:AIModel) => (
          <Option value={option.id} key={option.id}>
            {option.name}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};

export default HeroModels;
