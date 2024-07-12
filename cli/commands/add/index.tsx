import * as fs from 'node:fs/promises'
import { useEffect, useState } from 'react'
import { Box, Text } from 'ink'

import { Loading } from '../../../components/loading'
import Logger from '../../../components/logger'
import { fetchComponent } from '../../utils/fetchComponent'

const fileTypes = {
	jsx: 'jsx',
	tsx: 'tsx',
}

const AddCommand = (props: { command: string; params: string[] }) => {
	if (props.params.length < 1) {
		return <Logger type='error' message={'Not enough arguments'} />
	}
	const componentName = props.params[0].toLowerCase()
	if (/[a-z1-9-_]+/.test(componentName) === false) {
		return <Logger type='error' message='Invalid component name' />
	}
	const putPath = (props.params[1] ?? `./${componentName}.tsx`).replace(/\\/g, '/')
	let fileType = putPath.split('.').pop() ?? 'tsx'

	if (!(fileType in fileTypes)) {
		fileType = 'tsx'
	}

	// FIXME
	const [addContainer, setAddContainer] = useState<{
		status: 'loading' | 'error' | 'complete'
		data: any
	}>({
		status: 'loading',
		data: null,
	})

	useEffect(() => {
		;(async () => {
			const component = await fetchComponent(componentName)

			if (component.ok) {
				try {
					await fs.appendFile(putPath, component.data?.source!)
				} catch (_e) {
					console.error('Already file exist or no dir.')
					process.exit(1)
				}
				setAddContainer({
					status: 'complete',
					data: component.data,
				})
				setTimeout(() => {
					process.exit(1)
				}, 100)
			} else {
				setAddContainer({
					status: 'error',
					data: component.error,
				})
				setTimeout(() => {
					process.exit(1)
				}, 100)
			}
		})()
	}, [])

	return addContainer.status === 'loading' ? (
		<Text color='red'>
			<Loading variant='point' /> Fetching...
		</Text>
	) : addContainer.status === 'complete' ? (
		<Box flexDirection='column'>
			<Text color='green'>
				<Loading variant='point' stop /> Complete fetching.
			</Text>
			<Text> </Text>
			<Logger type='success' message={`Added '${componentName}' component`} />
			<Logger type='success' message={`Created file at ${putPath}`} />
		</Box>
	) : (
		<Box flexDirection='column'>
			<Text color='yellow'>
				<Loading variant='point' stop /> Failed fetching!
			</Text>
			<Logger type='warn' message={'Component name is wrong!'} />
		</Box>
	)
}

export default AddCommand
