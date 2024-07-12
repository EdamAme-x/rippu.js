import { parseRippuContext } from './parseRippuContex'

export async function fetchComponent(componentName: string) {
	const componentUrl = `https://raw.githubusercontent.com/EdamAme-x/rippu.js/main/components/${componentName}.tsx`

	const response = await fetch(componentUrl)

	if (!response.ok) {
		return {
			ok: false,
			error: response.statusText,
			data: null,
		}
	}

	const source = await response.text()

	const { title, description, deps } = parseRippuContext(source)

	return {
		ok: true,
		error: null,
		data: {
			title,
			description,
			deps,
			source,
			componentName,
			componentUrl,
		},
	}
}
