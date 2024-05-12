"use client";
import ShowGames from "@/components/show-games";
import YearSelect from "@/components/year-select";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const onYearSelected = (year: string) => {
    console.log("Value changed");
    setSelectedYear(parseInt(year));
  };
  return (
    <div className="flex items-center justify-center min-h-full w-full flex-col gap-2">
      <p className="text-2xl font-semibold text-center">
        See what great games launched in the year you were born!
      </p>
      <YearSelect onYearSelected={onYearSelected} />
      {!!selectedYear && <ShowGames year={selectedYear} />}
    </div>
  );
}
