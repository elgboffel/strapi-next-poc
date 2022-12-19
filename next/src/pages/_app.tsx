import type { NextPage } from "next";
import type { AppType, AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { trpc } from "@common/trpc/util";
import { DefaultLayout } from "@modules/Layouts/DefaultLayout";

export type NextPageWithLayout<TProps = Record<string, unknown>, TInitialProps = TProps> = NextPage<
	TProps,
	TInitialProps
> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const App = (({ Component, pageProps }: AppPropsWithLayout) => {
	const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

	return getLayout(<Component {...pageProps} />);
}) as AppType;

export default trpc.withTRPC(App);
