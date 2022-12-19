import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
	render() {
		return (
			<Html>
				<Head>
					<meta name={"robots"} content={"noindex,nofollow"} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default Document;
