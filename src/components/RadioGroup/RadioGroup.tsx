import React, { createContext, useContext } from "react";
import type { Color, Scale } from "../DesignSystemUtils";
import { Radio } from "../Radio/Radio";

interface RadioGroupContextProps {
  scale?: Scale;
  color?: Color;
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextProps | null>(null);

interface RadioGroupProps {
  scale?: Scale;
  color?: Color;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

export function RadioGroup({
  scale,
  color = "blue",
  value,
  onChange,
  children,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ scale, color, value, onChange }}>
      <div className="cs:flex cs:flex-col cs:gap-2">{children}</div>
    </RadioGroupContext.Provider>
  );
}

interface OptionProps {
  label: string;
  value: string;
}

function Option({ label, value }: OptionProps) {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error("RadioGroup.Option must be used within RadioGroup");

  const isSelected = ctx.value === value;

  return (
    <Radio
      label={label}
      scale={ctx.scale}
      color={ctx.color}
      value={value}
      checked={isSelected}
      onChange={() => ctx.onChange?.(value)}
    />
  );
}

RadioGroup.Option = Option;
