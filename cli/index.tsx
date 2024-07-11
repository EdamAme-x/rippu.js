import { Box, render, Text } from "ink";

import helpBoard from "./help";
import UnknownBoard from "./unknown";

const args = process.argv.slice(2);

const [command, ...params] = args;

switch (command) {
	case "build":
		break;
	case "help":
		render(helpBoard({ command, params }));
		break;
	default:
		render(UnknownBoard({ command, params }));
		break;
}

process.exit(0);
