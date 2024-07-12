import type { Result } from '../types'
import { parseRippuContext } from './parseRippuContex'

export async function fetchComponent(componentName: string): Promise<
	Result<
		{
			title: string
			description: string
			deps: string
			source: string
			componentName: string
			componentUrl: string
		},
		string
	>
> {
	const componentUrl = `https://raw.githubusercontent.com/EdamAme-x/rippu.js/main/components/${componentName}.tsx`

	const response = await fetch(componentUrl, {
		headers: {
			'User-Agent': 'Rippu.js (https://github.com/EdamAme-x/rippu.js)',
			'Cache-Control': 'no-store',
		},
		method: 'GET',
	})

	if (!response.ok) {
		return [false, null, response.statusText]
	}

	const source = await response.text()

	const { title, description, deps } = parseRippuContext(source)

	return [
		true,
		{
			title,
			description,
			deps,
			source,
			componentName,
			componentUrl,
		},
		null,
	]
}
