import { useEffect, useState } from 'react'
import {
	blue,
	brightBlue,
	brightGreen,
	brightMagenta,
	brightRed,
	brightYellow,
	green,
	magenta,
	red,
	yellow,
} from 'enogu'
import { Text } from 'ink'

const colorMap = [
	red,
	brightRed,
	green,
	brightGreen,
	blue,
	brightBlue,
	yellow,
	brightYellow,
	magenta,
	brightMagenta,
] as const

function withoutSpaceLength(text: string) {
	return text.replace(/\s/g, '').length
}

export function Rainbow({ text, interval = 150 }: { text: string; interval?: number }) {
	const splitSpace = Math.floor(
		withoutSpaceLength(text) < colorMap.length ? 1 : withoutSpaceLength(text) / colorMap.length
	)
	const [hev, setHev] = useState(0)

	let spaceStack = 0

	const colorizedText = text
		.split('')
		.map((char, index) => {
			if (char === ' ') {
				spaceStack++
				return char
			}
			index += -spaceStack + hev
			const colorIndex = Math.floor((index / splitSpace) % colorMap.length)
			return colorMap[colorIndex](char)
		})
		.join('')

	useEffect(() => {
		setInterval(() => setHev(prev => prev + 1), interval)
	}, [])

	return <Text>{colorizedText}</Text>
}

// #rippu:Rainbow:A Gradient Text Component:ink,react,enogu
