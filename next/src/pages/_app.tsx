import type { NextPage } from "next";
import type { AppType, AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { DefaultLayout } from "@components/modules/Layouts/DefaultLayout";
import { trpcClient } from "@common/trpc/client-config";

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

export default trpcClient.withTRPC(App);
