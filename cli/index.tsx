import { Box, render, Text } from "ink";

import AddCommand from "./commands/add";
import HelpCommand from "./commands/help";
import PrefetchCommand from "./commands/prefetch";
import UnknownCommand from "./commands/unknown";

const args = process.argv.slice(2);

const [command, ...params] = args;

switch (command) {
	case "help":
		render(<HelpCommand command={command} params={params} />);
		break;
	case "add":
		render(<AddCommand command={command} params={params} />);
		break;
	case "prefetch":
		render(<PrefetchCommand command={command} params={params} />);
		break;
	default:
		render(<UnknownCommand command={command} params={params} />);
		break;
}
