"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL, {
        method: "POST", // doPost agar bisa cek secret
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.NEXT_PUBLIC_API_SECRET,
          action: "getLeaderboard"
        }),
      });

      const data = await res.json();
      setPlayers(data);
    }

    loadData();
  }, []);

  const totalPoints = players.reduce((a,b) => a + Number(b.points), 0);
  const totalSurvivals = players.reduce((a,b) => a + Number(b.survivals), 0);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold">Game Leaderboard</h1>
      
      <div className="flex gap-6 my-4">
        <div>👤 Total Players: {players.length}</div>
        <div>⭐ Total Points: {totalPoints}</div>
        <div>🛡️ Total Survivals: {totalSurvivals}</div>
      </div>

      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr>
            <th className="border p-2">Rank</th>
            <th className="border p-2">Player</th>
            <th className="border p-2">Points</th>
            <th className="border p-2">Survivals</th>
            <th className="border p-2">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {players
            .sort((a, b) => b.points - a.points)
            .map((p, i) => (
            <tr key={p.userId}>
              <td className="border p-2">{i+1}</td>
              <td className="border p-2">{p.username}</td>
              <td className="border p-2">{p.points}</td>
              <td className="border p-2">{p.survivals}</td>
              <td className="border p-2">{p.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
