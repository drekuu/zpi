'use client';

import { useEffect, useState } from "react";

interface EditableInputProps {
  value: string | undefined;
  isEditing: boolean;
  name: string;
  placeholder: string;
  defaultValueLabel: string;
  onSave: (newValue: string) => void;
}

const [editableValue, setEditableValue] = useState<string>();
const [displayedValue, setDisplayedValue] = useState<string>();

export default function EditableInput({ value, isEditing, name, placeholder, defaultValueLabel, onSave }: EditableInputProps) {
  useEffect(() => {
    setDisplayedValue(value);
  }, [value])

  useEffect(() => {
    setEditableValue(value);
  }, [displayedValue])

  const handleSave = () => {
    if (displayedValue !== undefined) {
      onSave(displayedValue);
    }
  };

  return isEditing ? (
    <textarea
      name={name}
      value={editableValue}
      onChange={(e) => setDisplayedValue(e.target.value)}
      placeholder={placeholder}
      className="mt-3"
    />
  ) : (
    <p className="mt-3">{value ? value : defaultValueLabel}</p>
  )
}
