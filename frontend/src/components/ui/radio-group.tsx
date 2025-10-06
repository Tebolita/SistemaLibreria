"use client";

import * as React from "react";

interface RadioGroupProps {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface RadioGroupItemProps {
  id: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

export function RadioGroup({
  defaultValue,
  onValueChange,
  children,
  className,
}: RadioGroupProps) {
  const [selected, setSelected] = React.useState(defaultValue || "");

  const handleChange = (value: string) => {
    setSelected(value);
    onValueChange?.(value);
  };

  // Clonamos los hijos y les pasamos las props necesarias
  const clonedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child as React.ReactElement<any>, {
      selected,
      onSelect: handleChange,
    });
  });

  return <div className={className}>{clonedChildren}</div>;
}

export function RadioGroupItem({
  id,
  value,
  selected,
  onSelect,
}: RadioGroupItemProps & {
  selected?: string;
  onSelect?: (value: string) => void;
}) {
  return (
    <input
      type="radio"
      id={id}
      name="radio-group"
      value={value}
      checked={selected === value}
      onChange={() => onSelect?.(value)}
      className="h-4 w-4 accent-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
    />
  );
}
