import { Fragment } from "react/jsx-runtime";
import { Box, Text } from "ink";

import Logger from "../../components/logger";

const commandMap = {
	help: {
		message: "Show this help message"
	},
	add: {
		message: "Add a new component",
		options: {
			"component-name": "Component name (required: 'loading' or 'logger' and more)",
			path: "Put the component in this path (default: './')"
		}
	}
} as const satisfies Record<
	string,
	{
		message: string;
		options?: Record<string, string>;
	}
>;

const helpCommand = (_props: { command: string; params: string[] }) => (
	<Box flexDirection="column">
		<Box flexDirection="column" alignItems="flex-start">
			<Logger type="info" message={"Help"} />
			{Object.entries(commandMap).map(([command, props]) => (
				<Fragment key={command}>
					<Box paddingLeft={2}>
						<Text bold color="blue">
							└ {command}
							{"options" in props && props.options && Object.keys(props.options).length > 0
								? " <options>"
								: ""}
						</Text>
						<Text> - {props.message}</Text>
					</Box>
					{"options" in props &&
						props.options &&
						Object.entries(props.options).map(([option, description]) => (
							<Box key={option} paddingLeft={9 + command.length}>
								<Text bold color="yellow">
									└ {"<"}
									{option}
									{">"}
								</Text>
								<Text> - {description}</Text>
							</Box>
						))}
				</Fragment>
			))}
		</Box>
	</Box>
);

export default helpCommand;
