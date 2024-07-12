/**
 * // #rippu:Loading:A Loader Animation Text Component
 */
export function parseRippuContext(source: string): {
	title: string
	description: string
} {
	for (const line of source.split('\n')) {
		if (line.startsWith('// #rippu:') || line.startsWith('//#rippu:')) {
			const [_, title, ...description] = line.split(':')

			return {
				title: title.trim(),
				description: description.join(':').trim(),
			}
		}
	}

	return {
		title: 'Unknown',
		description: 'Not includes #rippu context',
	}
}
