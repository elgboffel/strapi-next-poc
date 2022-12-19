import { router } from "../trpc";
import { beersRouter } from "@server/routers/beers";
export const appRouter = router({
	beers: beersRouter,
});

export type AppRouter = typeof appRouter;
