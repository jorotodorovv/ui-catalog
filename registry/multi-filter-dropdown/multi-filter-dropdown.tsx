import * as React from 'react';
import { Check, X, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useMultiFilter } from './use-multi-filter';

export interface MultiFilterOption {
  value: string;
  label: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  emoji?: string | null;
}

export interface MultiFilterDropdownProps {
  title: string;
  options: MultiFilterOption[];
  selectedValues?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  placeholder?: string;
  showSearch?: boolean;
  emptyText?: string;
  className?: string;
}

export function MultiFilterDropdown({
  title,
  options,
  selectedValues: controlledValues,
  defaultValues = [],
  onValuesChange,
  icon: Icon,
  placeholder = "Search...",
  showSearch = false,
  emptyText = "No options found.",
  className,
}: MultiFilterDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const internalFilter = useMultiFilter({
    initialValues: defaultValues,
    onValuesChange,
  });

  const isControlled = controlledValues !== undefined;
  const selectedValues = isControlled ? controlledValues : internalFilter.selectedValues;

  const handleToggle = (value: string) => {
    if (isControlled) {
      if (selectedValues.includes(value)) {
        onValuesChange?.(selectedValues.filter((v) => v !== value));
      } else {
        onValuesChange?.([...selectedValues, value]);
      }
    } else {
      internalFilter.toggleValue(value);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isControlled) {
      onValuesChange?.([]);
    } else {
      internalFilter.clearValues();
    }
  };

  const hasSelection = selectedValues.length > 0;

  // Selected option details for stacking
  const selectedOptionDetails = React.useMemo(() => {
    return selectedValues.map((val) => {
      const match = options.find((opt) => opt.value === val);
      return {
        value: val,
        label: match ? match.label : val,
        emoji: match?.emoji,
        OptIcon: match?.icon,
      };
    });
  }, [selectedValues, options]);

  const firstThreeSelected = selectedOptionDetails.slice(0, 3);
  const overflowCount = selectedValues.length > 3 ? selectedValues.length - 3 : 0;

  const filteredOptions = React.useMemo(() => {
    if (!showSearch || !searchQuery.trim()) return options;
    const query = searchQuery.toLowerCase().trim();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.value.toLowerCase().includes(query)
    );
  }, [options, showSearch, searchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "relative aspect-square h-auto p-2 rounded-2xl transition-all border-border/50 flex flex-col items-center justify-center min-h-[90px] text-center w-full overflow-hidden",
            hasSelection
              ? "bg-primary/10 border-primary/30 text-primary shadow-sm hover:bg-primary/15 hover:border-primary/40"
              : "bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-foreground",
            className
          )}
        >
          <div className="flex flex-col items-center justify-center w-full h-full gap-0.5">
            {hasSelection ? (
              <>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={handleClear}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation();
                      e.preventDefault();
                      if (isControlled) {
                        onValuesChange?.([]);
                      } else {
                        internalFilter.clearValues();
                      }
                    }
                  }}
                  className="absolute top-1.5 right-1.5 p-0.5 rounded-full hover:bg-primary/20 text-primary transition-colors focus:outline-none shrink-0 cursor-pointer z-10"
                  aria-label={`Clear selected ${title}`}
                >
                  <X className="h-3.5 w-3.5" />
                </span>

                <span className="text-xs font-bold text-foreground truncate max-w-[calc(100%-1.5rem)] px-1 mb-0.5">
                  {title}
                </span>

                <div className="flex flex-col items-center justify-center w-full gap-0.5 px-0.5 min-w-0">
                  {firstThreeSelected.map((opt) => (
                    <div
                      key={opt.value}
                      className="flex items-center justify-center gap-1 text-[10px] font-semibold text-primary truncate max-w-full leading-tight"
                    >
                      {opt.emoji ? (
                        <span className="text-xs shrink-0 leading-none">{opt.emoji}</span>
                      ) : opt.OptIcon ? (
                        <opt.OptIcon className="h-3 w-3 shrink-0 text-primary" />
                      ) : null}
                      <span className="truncate">{opt.label}</span>
                    </div>
                  ))}
                  {overflowCount > 0 && (
                    <span className="text-[10px] font-extrabold text-primary shrink-0 leading-none mt-0.5">
                      +{overflowCount}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                {Icon && <Icon className="h-6 w-6 text-muted-foreground shrink-0 mb-0.5" />}
                <span className="text-xs font-semibold text-muted-foreground truncate max-w-full px-1">{title}</span>
              </>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={6}
        data-vaul-no-drag
        className="w-[var(--radix-popover-trigger-width)] min-w-[160px] p-0 bg-popover/95 backdrop-blur-md border border-border/50 rounded-xl shadow-xl z-[70] pointer-events-auto animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <Command className="bg-transparent" shouldFilter={false}>
          {showSearch && (
            <CommandInput
              placeholder={placeholder}
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-9"
            />
          )}
          <CommandList
            className="max-h-[300px] overflow-y-auto touch-pan-y overscroll-contain"
            data-vaul-no-drag
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup className="p-1">
              {filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      handleToggle(option.value);
                    }}
                    className="flex items-center justify-between px-2.5 py-2 md:py-2.5 rounded-lg cursor-pointer text-xs md:text-sm"
                  >
                    <div className="flex items-center gap-2 md:gap-2.5">
                      {option.emoji ? (
                        <span className="text-sm md:text-base shrink-0 select-none">{option.emoji}</span>
                      ) : option.icon ? (
                        <option.icon
                          className={cn("h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground/80", isSelected && "text-primary")}
                        />
                      ) : null}
                      <span
                        className={cn(
                          isSelected
                            ? "font-semibold text-foreground"
                            : "text-foreground/85 hover:text-foreground transition-colors"
                        )}
                      >
                        {option.label}
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
