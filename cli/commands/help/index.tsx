import { Fragment } from "react/jsx-runtime";
import { Box, Text } from "ink";

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
	},
	prefetch: {
		message: "Prefetch a components",
		options: {
			"component-name": "Component name (required: 'loading' or 'logger' and more)"
		}
	}
} as const satisfies Record<
	string,
	{
		message: string;
		options?: Record<string, string>;
	}
>;

const maxCommandLength = Object.keys(commandMap).reduce((max, command) => Math.max(max, command.length), 0);

const HelpCommand = (_props: { command: string; params: string[] }) => (
	<Box flexDirection="column">
		<Box flexDirection="column" alignItems="flex-start">
			<Text bold color="blue">
				{" "}
				{"<"}command{">"}
			</Text>
			{Object.entries(commandMap).map(([command, props]) => (
				<Fragment key={command}>
					<Box paddingLeft={5}>
						<Text bold color="blue">
							└ {command}
							{"options" in props && props.options && Object.keys(props.options).length > 0 ? (
								<Text bold color="yellow">
									{" "}
									{"<"}options{">"}
								</Text>
							) : (
								""
							)}
						</Text>
						<Text> - {props.message}</Text>
					</Box>
					{"options" in props &&
						props.options &&
						Object.entries(props.options).map(([option, description]) => (
							<Box key={option} paddingLeft={5}>
								<Text bold color="yellow">
									<Text color="blue">│</Text>
									{" ".repeat(6 + command.length)}└ {"<"}
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

export default HelpCommand;
