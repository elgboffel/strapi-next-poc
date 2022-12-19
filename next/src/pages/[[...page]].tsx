import { NextPage } from "next";
import React from "react";
import { trpc } from "@common/trpc/util";

const Page: NextPage = () => {
	trpc.hello.useQuery({ text: "prut" });

	return (
		<div>
			<h1>Page</h1>
		</div>
	);
};

export default Page;
