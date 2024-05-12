"use client";

import getGamesByYear from "@/actions/get-games-by-year";
import { Game } from "@/models/game";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShowGames({ year }: { year: number }) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getGames = async () => {
      setLoading(true);
      const result = await getGamesByYear(year);
      setGames(result);
      setLoading(false);
    };
    getGames();
  }, [year]);
  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {loading && (
        <Loader2 className="my-28 h-16 w-16 text-primary/60 animate-spin" />
      )}
      {!loading &&
        games.map((el) => (
          <div key={el.id} className="flex flex-col justify-center w-48">
            <Image
              src={el.coverUrl}
              style={{ objectFit: "contain" }}
              alt={`Cover for ${el.name}`}
              width={200}
              height={200}
            />
            <span className="text-lg">{el.name}</span>
          </div>
        ))}
    </div>
  );
}
