import { Text } from 'ink'

const progressMap = {
	solid: ['', '▏', '▎', '▍', '▌', '▋', '▊', '▉'],
	square: ['', '■'],
	slash: ['', '/'],
	dash: ['', '-'],
	pipe: ['', '|'],
} as const satisfies Record<string, string[]>

/**
 * A function that renders a progress bar based on the input parameters.
 *
 * @param {number} progress - The progress value (default is 0, which means 0% and maximum is 100).
 * @param {number} length - The length of the progress bar (default is 20).
 * @param {keyof typeof progressMap} type - The type of progress bar to render.
 * @param {string} color - The color of the progress bar (default is 'default').
 * @return {JSX.Element} The JSX element representing the rendered progress bar.
 */
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
	const progressPercentage = progress > 100 ? 100 : progress < 0 ? 0 : progress
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
