"use client";

// import { api } from "~/trpc/server";

import { api } from "~/trpc/react";

const CardAmount = ({
  cardId,
  size,
}: {
  cardId: number;
  size: "small" | "large";
}) => {
  const cardArray = api.cards.getCardInfo.useQuery({
    cardId: cardId,
  }).data;
  return (
    <p
      className={`absolute  left-[50%] flex ${
        size === "small" ? "bottom-0 h-8 w-8" : "-bottom-4 h-16 w-16"
      } -translate-x-[50%] items-center justify-center rounded-full border-2 border-black bg-neutral-100 text-xl`}
    >
      {cardArray?.length}
    </p>
  );
};

export default CardAmount;
