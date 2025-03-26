"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";


type Pet = {
  name: string;
  emoji: string;
};

const pets: Pet[] = [
  { name: "Cat", emoji: "🐱" },
  { name: "Dog", emoji: "🐶" },
  { name: "Dragon", emoji: "🐉" },
];

const VirtualPet: React.FC = () => {
  const [pet, setPet] = useState<Pet | null>(null); 
  const [hunger, setHunger] = useState(100);
  const [happiness, setHappiness] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger((prev) => Math.max(0, prev - 5));
      setHappiness((prev) => Math.max(0, prev - 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const feedPet = () => setHunger((prev) => Math.min(100, prev + 20));
  const playWithPet = () => setHappiness((prev) => Math.min(100, prev + 20));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {!pet ? (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Choose Your Pet</h2>
          <div className="flex gap-4">
            {pets.map((p) => (
              <button
                key={p.name}
                className="text-4xl hover:scale-110 transition"
                onClick={() => setPet(p)} 
              >
                {p.emoji}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-6xl"
          >
            {pet.emoji} {}
          </motion.div>
          <h2 className="text-xl font-semibold mt-2">{pet.name}</h2>

          <div className="mt-4">
            <p>Hunger</p>
            <Progress value={hunger} className="mb-2" />
            <p>Happiness</p>
            <Progress value={happiness} />
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={feedPet} className="bg-green-500 hover:bg-green-600">🍖 Feed</Button>
            <Button onClick={playWithPet} className="bg-blue-500 hover:bg-blue-600">🎾 Play</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualPet;
