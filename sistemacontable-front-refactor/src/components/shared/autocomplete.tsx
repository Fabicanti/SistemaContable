import { useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

type AutocompleteSelectProps<T> = {
  items: T[]
  value: string
  onChange: (item: T) => void
  getLabel: (item: T) => string
  getValue: (item: T) => string
  onInputChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

// Combobox.
export function Autocomplete<T>({
  items,
  getLabel,
  getValue,
  onChange,
  onInputChange,
  value,
  placeholder = "Seleccionar...",
  disabled = false,

}: AutocompleteSelectProps<T>) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const selectedItem = items.find((item) => getValue(item) === value)
  const selectedLabel = selectedItem ? getLabel(selectedItem) : ""

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true} >
      <PopoverTrigger asChild disabled={disabled} >
        <Button
          variant="outline"
          ref={triggerRef}
          role="combobox"
          aria-expanded={open}
          className="w-full flex items-start justify-between gap-2 min-w-0 h-auto"
        >
          <span
            className="whitespace-normal break-words text-left flex-1"
          >
            {selectedLabel || placeholder}
          </span>
          <ChevronsUpDown className="opacity-50 shrink-0 mt-1" />
        </Button>

      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: triggerRef.current?.offsetWidth }} >
        <Command>
          <CommandInput
            placeholder={placeholder}
            className="h-9"
            onValueChange={(input) => {
              onInputChange?.(input);
            }} />
          <CommandList>
            <CommandEmpty className="p-2 text-muted-foreground ">No se encontró nada.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => {
                const itemLabel = getLabel(item)
                const itemValue = itemLabel.toLowerCase()

                return (
                  <CommandItem
                    key={getValue(item)}
                    value={itemValue}
                    className="cursor-pointer"
                    onSelect={() => {
                      onChange(item)
                      setOpen(false)
                    }}
                  >
                    {itemLabel}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        getValue(item) === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}