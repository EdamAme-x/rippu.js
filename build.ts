/*
  MIT License
  Copyright (c) 2024 amex2189
*/

import path from "node:path";
import { build } from "esbuild";

await build({
	entryPoints: ["./cli/index.ts"],
	outfile: path.resolve("./dist/index.js"),
	bundle: true,
	platform: "node",
	target: "esnext",
	minify: true,
	sourcemap: true,
	allowOverwrite: true,
	format: "esm",
	packages: "bundle"
});
