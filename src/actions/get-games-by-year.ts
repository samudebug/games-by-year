"use server";

import { Game } from "@/models/game";
import { endOfYear, format, getUnixTime, startOfYear } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export default async function getGamesByYear(year: number): Promise<Game[]> {
  const authUrl = new URL("https://id.twitch.tv/oauth2/token");
  authUrl.searchParams.set("client_id", process.env.IGDB_CLIENT_ID ?? "");
  authUrl.searchParams.set(
    "client_secret",
    process.env.IGDB_CLIENT_SECRET ?? ""
  );
  authUrl.searchParams.set("grant_type", "client_credentials");
  const authResponse = await fetch(authUrl, {
    method: "POST",
  });
  const authToken = (await authResponse.json()).access_token;
  const start = getUnixTime(
    startOfYear(
      fromZonedTime(
        new Date(),
        Intl.DateTimeFormat().resolvedOptions().timeZone
      ).setFullYear(year)
    )
  );
  const end = getUnixTime(
    endOfYear(
      fromZonedTime(
        new Date(),
        Intl.DateTimeFormat().resolvedOptions().timeZone
      ).setFullYear(year)
    )
  );
  const body = `
    where category = (0,4,8,9,10,11) & first_release_date >= ${start} & first_release_date <= ${end} & first_release_date != null;
sort aggregated_rating desc;
limit 20;
fields cover.*,name,release_dates.*,category, first_release_date, aggregated_rating;
    `;
  const gameSearchRes = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    body,
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID ?? "",
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await gameSearchRes.json();
  return data.map((el: any): Game => {
    const releaseDate = format(new Date(el.first_release_date), "dd/MM/yyyy");
    const coverUrl = `https://images.igdb.com/igdb/image/upload/t_1080p/${el.cover.image_id}.jpg`;
    return {
      id: el.id,
      coverUrl,
      releaseDate,
      name: el.name,
      rating: el.aggregated_rating,
    };
  });
}
