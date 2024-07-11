import { Box, render, Text } from "ink";

import helpCommand from "./commands/help";
import UnknownCommand from "./commands/unknown";

const args = process.argv.slice(2);

const [command, ...params] = args;

switch (command) {
	case "add":
		break;
	case "help":
		render(helpCommand({ command, params }));
		break;
	default:
		render(UnknownCommand({ command, params }));
		break;
}

process.exit(0);
