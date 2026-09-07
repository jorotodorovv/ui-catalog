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
import { useFilter } from './use-filter';

export interface FilterOption {
  value: string;
  label: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  emoji?: string | null;
}

export interface FilterDropdownProps {
  title: string;
  options: FilterOption[];
  selectedValue?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  placeholder?: string;
  showSearch?: boolean;
  emptyText?: string;
  className?: string;
  hideTitleWhenSelected?: boolean;
  modal?: boolean;
}

export function FilterDropdown({
  title,
  options,
  selectedValue: controlledValue,
  defaultValue = '',
  onValueChange,
  icon: Icon,
  placeholder = "Search...",
  showSearch = false,
  emptyText = "No options found.",
  className,
  hideTitleWhenSelected = false,
  modal = true,
}: FilterDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const internalFilter = useFilter({
    initialValue: defaultValue,
    onValueChange,
  });

  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalFilter.selectedValue;

  const selectedOption = options.find((opt) => opt.value.toLowerCase() === selectedValue.toLowerCase());

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isControlled) {
      onValueChange?.('');
    } else {
      internalFilter.clearValue();
    }
  };

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
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "relative aspect-square h-auto p-2.5 rounded-2xl transition-all border-border/50 flex flex-col items-center justify-center min-h-[90px] text-center w-full",
            selectedValue
              ? "bg-primary/10 border-primary/30 text-primary shadow-sm hover:bg-primary/15 hover:border-primary/40"
              : "bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-foreground",
            className
          )}
        >
          <div className="flex flex-col items-center justify-center w-full h-full gap-1">
            {selectedOption ? (
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
                        onValueChange?.('');
                      } else {
                        internalFilter.clearValue();
                      }
                    }
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-primary/20 text-primary transition-colors focus:outline-none shrink-0 cursor-pointer"
                  aria-label={`Clear ${title} filter`}
                >
                  <X className="h-3.5 w-3.5" />
                </span>
                {selectedOption.emoji ? (
                  <span className="text-2xl leading-none">{selectedOption.emoji}</span>
                ) : selectedOption.icon ? (
                  <selectedOption.icon className="h-6 w-6 text-primary shrink-0" />
                ) : Icon ? (
                  <Icon className="h-6 w-6 text-primary shrink-0" />
                ) : null}
                {!hideTitleWhenSelected && (
                  <span className="text-xs font-semibold text-foreground truncate max-w-full px-1">{title}</span>
                )}
                <span className="text-[10px] font-medium text-primary truncate max-w-full px-1">{selectedOption.label}</span>
              </>
            ) : (
              <>
                {Icon && <Icon className="h-6 w-6 text-muted-foreground shrink-0" />}
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
        className="w-[var(--radix-popover-trigger-width)] min-w-[140px] p-0 bg-popover/95 backdrop-blur-md border border-border/50 rounded-xl shadow-xl z-[70] pointer-events-auto animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
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
          <CommandList className="max-h-[300px] overflow-y-auto touch-pan-y overscroll-contain" data-vaul-no-drag onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
            <CommandEmpty className="py-3 text-center text-xs text-muted-foreground">{emptyText}</CommandEmpty>
            <CommandGroup className="p-1">
              {filteredOptions.map((option) => {
                const isSelected = option.value.toLowerCase() === selectedValue.toLowerCase();
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      const next = isSelected ? "" : option.value;
                      if (isControlled) {
                        onValueChange?.(next);
                      } else {
                        internalFilter.setSelectedValue(next);
                      }
                      setOpen(false);
                    }}
                    className="flex items-center justify-between px-2.5 py-2 md:py-2.5 rounded-lg cursor-pointer text-xs md:text-sm"
                  >
                    <div className="flex items-center gap-2 md:gap-2.5 truncate">
                      {option.emoji ? (
                        <span className="text-sm md:text-base shrink-0 select-none leading-none">{option.emoji}</span>
                      ) : option.icon ? (
                        <option.icon className={cn("h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground/80", isSelected && "text-primary")} />
                      ) : null}
                      <span className={cn(
                        "truncate",
                        isSelected 
                          ? "font-semibold text-foreground" 
                          : "text-foreground/85 hover:text-foreground transition-colors"
                      )}>
                        {option.label}
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0 ml-2" />
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
