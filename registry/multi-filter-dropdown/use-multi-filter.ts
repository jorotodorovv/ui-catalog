import * as React from 'react';

export interface UseMultiFilterOptions {
  initialValues?: string[];
  onValuesChange?: (values: string[]) => void;
}

export function useMultiFilter(options: UseMultiFilterOptions = {}) {
  const { initialValues = [], onValuesChange } = options;
  const [selectedValues, setSelectedValues] = React.useState<string[]>(initialValues);

  const toggleValue = React.useCallback(
    (value: string) => {
      setSelectedValues((prev) => {
        const next = prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value];
        onValuesChange?.(next);
        return next;
      });
    },
    [onValuesChange]
  );

  const clearValues = React.useCallback(() => {
    setSelectedValues([]);
    onValuesChange?.([]);
  }, [onValuesChange]);

  const isSelected = React.useCallback(
    (value: string) => selectedValues.includes(value),
    [selectedValues]
  );

  const setValues = React.useCallback(
    (values: string[]) => {
      setSelectedValues(values);
      onValuesChange?.(values);
    },
    [onValuesChange]
  );

  return {
    selectedValues,
    setSelectedValues: setValues,
    toggleValue,
    clearValues,
    isSelected,
  };
}
