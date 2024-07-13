import { Text } from 'ink'

export function Time({ date, color = 'default' }: { date: Date; color?: string }) {
	return <Text color={color === 'default' ? 'gray' : color}>{date.toLocaleString()}</Text>
}

// #rippu:Time:A Time Component:ink,react
