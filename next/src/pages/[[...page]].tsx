import { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import React from "react";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "@server/routers/_app";
import { trpcClient } from "@common/trpc/client-config";

const Page: NextPage = (props) => {
	// console.log("__PROPPS__", props);
	const test = trpcClient.beers.all.useQuery();
	// console.log("___DATA___", test.data);
	return (
		<div>
			<h1>Page</h1>
			{test.data && test.data.map(({ name, id }) => <p key={`beer-id-${id}`}>beer: {name}</p>)}
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [{ params: { page: undefined } }],
		fallback: "blocking",
	};
};

export async function getStaticProps(context: GetStaticPropsContext) {
	const ssg = await createProxySSGHelpers({
		router: appRouter,
		ctx: {},
	});

	await ssg.beers.all.prefetch();

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 1,
	};
}

export default Page;
