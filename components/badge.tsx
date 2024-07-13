import { Text } from 'ink'

export function Badge({ text, space = 1, color }: { text: string; space?: number; color: string }) {
	return (
		<Text bold backgroundColor={color}>
			{' '.repeat(space)}
			{text}
			{' '.repeat(space)}
		</Text>
	)
}

// #rippu:Badge:A Badge Component:ink
