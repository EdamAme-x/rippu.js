import { Text } from 'ink'

const progressMap = {
	solid: ['', '▏', '▎', '▍', '▌', '▋', '▊', '▉'],
	square: ['', '■'],
	slash: ['', '/'],
	dash: ['', '-'],
	pipe: ['', '|'],
} as const satisfies Record<string, string[]>

export function Progress({
	progress = 0,
	length = 20,
	type = 'solid',
	color = 'default',
}: {
	progress?: number
	length?: number
	type?: keyof typeof progressMap
	color?: string
}) {
	const progressPercentage = progress > 100 ? 100 : progress
	const progressLengthFloat = (progressPercentage / 100) * length
	const progressLength = Math.floor(progressLengthFloat)
	const progressRemaining = Math.round(
		(progressLengthFloat - progressLength) * progressMap[type].length
	)

	const progressStack = [
		...progressMap[type][progressMap[type].length - 1].repeat(progressLength),
		progressMap[type][progressRemaining],
	]

	return <Text color={color === 'default' ? undefined : color}>{progressStack}</Text>
}

// #rippu:Progress:A Progress Bar Component:ink
