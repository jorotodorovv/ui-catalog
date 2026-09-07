import * as React from 'react';

export interface UseFilterOptions {
  initialValue?: string;
  onValueChange?: (value: string) => void;
}

export function useFilter(options: UseFilterOptions = {}) {
  const { initialValue = '', onValueChange } = options;
  const [selectedValue, setSelectedValue] = React.useState<string>(initialValue);

  const setValue = React.useCallback(
    (value: string) => {
      setSelectedValue(value);
      onValueChange?.(value);
    },
    [onValueChange]
  );

  const clearValue = React.useCallback(() => {
    setSelectedValue('');
    onValueChange?.('');
  }, [onValueChange]);

  const isSelected = React.useCallback(
    (value: string) => selectedValue.toLowerCase() === value.toLowerCase(),
    [selectedValue]
  );

  return {
    selectedValue,
    setSelectedValue: setValue,
    clearValue,
    isSelected,
  };
}
