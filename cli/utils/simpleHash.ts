export function simpleHash(str: string): string {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i)
		hash = (hash << 5) - hash + char
	}
	return (hash >>> 0).toString(36).padStart(7, '0')
}
