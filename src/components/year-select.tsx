"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function YearSelect({
  onYearSelected,
}: {
  onYearSelected: (year: string) => void;
}) {
  const getYears = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );
  const years = getYears(1947, new Date().getFullYear(), 1).reverse();
  return (
    <div className="flex flex-row gap-2 items-center">
      <p>Year:</p>
      <Select onValueChange={(value) => onYearSelected(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((val) => (
            <SelectItem key={val} value={val.toString()}>
              {val}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
