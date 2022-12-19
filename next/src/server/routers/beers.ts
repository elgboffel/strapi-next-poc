import { router, publicProcedure } from "../trpc";

const baseURL = "https://api.sampleapis.com/beers/ale";

type Beer = {
	price: string;
	name: string;
	rating: {
		average: number;
		reviews: number;
	};
	image: string;
	id: number;
};

export const beersRouter = router({
	all: publicProcedure.query(async () => {
		const data: Promise<Beer[]> | null = (await fetch(baseURL))?.json();

		if (!data) return null;

		return data;
	}),
});
