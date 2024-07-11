import { Newline, Text } from "ink";

const logMap = {
	info: "green",
	warn: "yellow",
	error: "red",
	success: "green",
	debug: "blue",
	trace: "magenta"
} as const satisfies Record<string, string>;

const maxLogLevelLength = Object.keys(logMap).reduce((max, type) => Math.max(max, type.length), 0);

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
