"use client";

import { api } from "~/trpc/react";
import PokemonCardPreview from "./PokemonCardPreview";

const PokemonCardContainer = () => {
  const cards = api.cards.getAllCards.useQuery().data;
  const userCardCollection =
    api.cards.getUserCardsFromCollection.useQuery().data;
  const checkIfOwned = (id: number) => {
    let owned = false;
    userCardCollection?.cardCollection.forEach((card) => {
      if (card.cardId === id) {
        owned = true;
      }
    });
    return owned;
  };

  return (
    <div className="grid max-h-screen grid-cols-3 gap-4 overflow-y-scroll px-4 pb-16 pt-20 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {cards?.map((card) => (
        <div key={card.id}>
          <PokemonCardPreview
            card={card}
            owned={checkIfOwned(card.id)}
            priority={card.id <= 21}
          />
          <p>{card.name}</p>
        </div>
      ))}
    </div>
  );
};

export default PokemonCardContainer;
