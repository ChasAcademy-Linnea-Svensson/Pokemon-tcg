import { PokemonCard, Rarity } from "@prisma/client";
import { boolean, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { randomizeCards } from "~/utils/randomizePack";

export const packRouter = createTRPCRouter({
  openPack: protectedProcedure.mutation(async ({ ctx }) => {
    const allCards = await ctx.db.pokemonCard.findMany();

    const pokemonPack: PokemonCard[] = randomizeCards(allCards);

    return ctx.db.$transaction([
      ctx.db.cardOwnedByUser.createMany({
        data: [
          {
            userId: ctx.session.user.id,
            cardId: pokemonPack[0]!.id,
          },
          {
            userId: ctx.session.user.id,
            cardId: pokemonPack[1]!.id,
          },
          {
            userId: ctx.session.user.id,
            cardId: pokemonPack[2]!.id,
          },
          {
            userId: ctx.session.user.id,
            cardId: pokemonPack[3]!.id,
          },
          {
            userId: ctx.session.user.id,
            cardId: pokemonPack[4]!.id,
          },
          {
            userId: ctx.session.user.id,
            cardId: pokemonPack[5]!.id,
          },
          {
            userId: ctx.session.user.id,
            cardId: pokemonPack[6]!.id,
          },
          {
            userId: ctx.session.user.id,
            cardId: pokemonPack[7]!.id,
          },
          {
            userId: ctx.session.user.id,
            cardId: pokemonPack[8]!.id,
          },
          {
            userId: ctx.session.user.id,
            cardId: pokemonPack[9]!.id,
          },
        ],
      }),
      ctx.db.cardOwnedByUser.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          pokemonCard: true,
        },
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      }),
      ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          pokeCoins: { decrement: 20 },
        },
      }),
    ]);
  }),
});
