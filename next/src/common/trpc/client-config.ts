import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "@server/routers/_app";

function getBaseUrl() {
	if (typeof window !== "undefined")
		// browser should use relative path
		return "";
	if (process.env.VERCEL_URL)
		// reference for vercel.com
		return `https://${process.env.VERCEL_URL}`;
	if (process.env.RENDER_INTERNAL_HOSTNAME)
		// reference for render.com
		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3001}`;
}

export const trpcClient = createTRPCNext<AppRouter>({
	config({ ctx }) {
		if (typeof window !== "undefined") {
			// during client requests
			return {
				links: [
					httpBatchLink({
						url: "/api/trpc",
					}),
				],
			};
		}
		return {
			// transformer: superjson,
			links: [
				httpBatchLink({
					// The server needs to know your app's full url
					url: `${getBaseUrl()}/api/trpc`,
					/**
					 * Set custom request headers on every request from tRPC
					 * @link https://trpc.io/docs/v10/header
					 */
					// headers() {
					// 	if (ctx?.req) {
					// 		// To use SSR properly, you need to forward the client's headers to the server
					// 		// This is so you can pass through things like cookies when we're server-side rendering
					// 		// If you're using Node 18, omit the "connection" header
					// 		const { ...headers } = ctx.req.headers;
					// 		return {
					// 			...headers,
					// 			// Optional: inform server that it's an SSR request
					// 			"x-ssr": "1",
					// 		};
					// 	}
					// 	return {};
					// },
				}),
			],
		};
	},
	ssr: true,
	responseMeta({ ctx, clientErrors }) {
		if (clientErrors.length) {
			// propagate http first error from API calls
			return {
				status: clientErrors[0].data?.httpStatus ?? 500,
			};
		}
		// cache request for 1 day + revalidate once every second
		const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
		return {
			headers: {
				"cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
			},
		};
	},
});
