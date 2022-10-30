import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { NextApiRequest } from "next";

interface CreateContextOptions {}
/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export const createContextInner = async (opts: CreateContextOptions) => {
  return {};
};

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  // for API-response caching see https://trpc.io/docs/caching
  return await createContextInner({});
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
