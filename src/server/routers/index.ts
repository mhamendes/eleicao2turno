import { t } from "../trpc";

import { ResponseTSE } from "./types";

export const appRouter = t.router({
  tse: t.procedure.query(async ({ input }) => {
    const response = await fetch(
      "https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json",
      {
        method: "GET",
      }
    );
    return (await response.json()) as ResponseTSE;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
