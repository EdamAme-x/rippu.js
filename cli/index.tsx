import { Box, render, Text } from "ink";

import helpCommand from "./commands/help";
import UnknownCommand from "./commands/unknown";
import AddCommand from "./commands/add";

const args = process.argv.slice(2);

const [command, ...params] = args;

switch (command) {
	case "add":
        render(<AddCommand command={command} params={params} />);
		break;
	case "help":
		render(helpCommand({ command, params }));
		break;
	default:
		render(UnknownCommand({ command, params }));
		break;
}

process.exit(0);
