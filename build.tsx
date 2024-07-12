/*
  MIT License
  Copyright (c) 2024 amex2189
*/

import path from 'node:path'
import { useEffect, useState } from 'react'
import { build } from 'esbuild'
import { render, Text } from 'ink'

import { Loading } from './components/loading'
import Logger from './components/logger'

render(<Build />)

function Build() {
	const [isSuccess, setIsSuccess] = useState(false)

	useEffect(() => {
		;(async () => {
			await build({
				legalComments: 'none',
				entryPoints: ['./cli/index.tsx'],
				outfile: path.resolve('./dist/index.js'),
				loader: {
					'.js': 'jsx',
					'.ts': 'ts',
					'.tsx': 'tsx',
					'.json': 'json',
				},
				bundle: true,
				platform: 'node',
				target: 'esnext',
				minify: true,
				sourcemap: true,
				allowOverwrite: true,
				format: 'esm',
				alias: {
					'react-devtools-core': 'react-devtools-core',
				},
			})
			setTimeout(() => {
				process.exit()
			}, 1000)
			setIsSuccess(true)
		})()
	}, [])

	return (
		<>
			<Logger
				type='info'
				message={
					<Text>
						<Loading variant='pipe' stop={isSuccess} />
						<Text> Building... 🏗</Text>
					</Text>
				}
			/>
			{isSuccess && <Logger type='success' message={'Completed build ✨'} />}
		</>
	)
}
