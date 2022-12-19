import Head from "next/head";
import React, { ReactNode } from "react";

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
	return (
		<>
			<Head>
				<title>TRCP Starter</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>{children}</main>
		</>
	);
};
