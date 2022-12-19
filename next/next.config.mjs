import { createRequire } from "module";
const require = createRequire(import.meta.url);
const intercept = require("intercept-stdout");

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
	if (text.includes("Duplicate atom key")) {
		return "";
	}
	return text;
}

if (process.env.NODE_ENV === "development") {
	intercept(interceptStdout);
}

/** @type {{headers(): Promise<[{headers: [{value: string, key: string}], source: string}]>, webpack: (function(*, {dev?: *}): *), poweredByHeader: boolean, future: {strictPostcssConfiguration: boolean}, reactStrictMode: boolean, onDemandEntries: {pagesBufferLength: number, maxInactiveAge: number}, experimental: {optimizeFonts: boolean, scrollRestoration: boolean}}} */
let nextConfig = {
	webpack: function (config) {
		// Fix Next.js fighting with SVGR
		const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"));

		fileLoaderRule.exclude = /\.component.svg$/;

		config.module.rules.push({
			test: /\.component.svg$/,
			loader: require.resolve("@svgr/webpack"),
		});

		return config;
	},

	swcMinify: true,

	poweredByHeader: false,

	reactStrictMode: true,

	experimental: {
		scrollRestoration: true,
	},

	future: {
		strictPostcssConfiguration: true,
	},

	// trailingSlash: false,

	eslint: {
		ignoreDuringBuilds: true,
	},

	onDemandEntries: {
		// period (in ms) where the server will keep pages in the buffer
		maxInactiveAge: 25 * 1000,
		// number of pages that should be kept simultaneously without being disposed
		pagesBufferLength: 2,
	},

	// i18n: {
	// 	locales: ["en"],
	// 	defaultLocale: "en",
	// 	localeDetection: false,
	// },
};

const shouldAnalyzeBundles = process.env.ANALYZE;

if (shouldAnalyzeBundles) {
  const withNextBundleAnalyzer = require("@next/bundle-analyzer")();
  nextConfig = withNextBundleAnalyzer(nextConfig);
}

export default nextConfig;
