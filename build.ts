/*
  MIT License
  Copyright (c) 2024 amex2189
*/

import path from "node:path";
import { build } from "esbuild";

await build({
	legalComments: "none",
	entryPoints: ["./cli/index.tsx"],
	outfile: path.resolve("./dist/index.js"),
	loader: {
		".js": "jsx",
		".ts": "ts",
		".tsx": "tsx",
		".json": "json"
	},
	bundle: true,
	platform: "node",
	target: "esnext",
	minify: true,
	sourcemap: true,
	allowOverwrite: true,
	format: "esm",
	alias: {
		"react-devtools-core": "react-devtools-core"
	}
});
