import { eco2MixRouter } from "./routers/eco2mix";
import { exampleRouter } from "./routers/example";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  eco2mix: eco2MixRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
