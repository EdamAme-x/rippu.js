import { Text } from "ink";

const logMap = {
	info: "blue",
	warn: "yellow",
	error: "red",
	success: "green",
	debug: "cyan",
	trace: "magenta"
} as const satisfies Record<string, string>;

const maxLogLevelLength = Object.keys(logMap).reduce((max, type) => Math.max(max, type.length), 0);

/**
 * Renders a log message with specified type, message, color, and newline settings.
 *
 * @param {keyof typeof logMap} type - The type of the log message.
 * @param {string | JSX.Element} message - The content of the log message.
 * @param {string} [color="default"] - The color of the log message.
 * @param {boolean} [newline=false] - Whether to add a newline after the log message.
 * @return {JSX.Element} The formatted log message JSX element.
 */
export default function Logger({
	type,
	message,
	color = "default",
	newline = false
}: {
	type: keyof typeof logMap;
	message: string | JSX.Element;
	color?: string;
	newline?: boolean;
}) {
	return (
		<>
			<Text color={color !== "default" ? logMap[type] : undefined}>
				<Text bold backgroundColor={logMap[type]}>
					{" "}
					{type.toLowerCase()}{" "}
				</Text>
				{typeof message === "string" ? (
					" ".repeat(Math.max(maxLogLevelLength - type.length, 1)) + message
				) : (
					<>
						{" ".repeat(Math.max(maxLogLevelLength - type.length, 1))}
						{message}
					</>
				)}
			</Text>
			{newline && <Text> </Text>}
		</>
	);
}

// #rippu:Logger:A Log Message Component
