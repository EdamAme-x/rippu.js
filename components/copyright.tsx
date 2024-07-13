import * as enogu from 'enogu'
import { Box, Text } from 'ink'

const snsMap = [
	{
		name: 'Twitter',
		baseUrl: 'https://twitter.com/',
		color: 'cyan',
	},
	{
		name: 'GitHub',
		baseUrl: 'https://github.com/',
		color: 'gray',
	},
	{
		name: 'LinkedIn',
		baseUrl: 'https://www.linkedin.com/in/',
		color: 'blue',
	},
	{
		name: 'Dev.to',
		baseUrl: 'https://dev.to/',
		color: 'magenta',
	},
	{
		name: 'CodePen',
		baseUrl: 'https://codepen.io/',
		color: 'green',
	},
	{
		name: 'CodeSandbox',
		baseUrl: 'https://codesandbox.io/',
		color: 'yellow',
	},
	{
		name: 'StackOverflow',
		baseUrl: 'https://stackoverflow.com/users/',
		color: 'red',
	},
	{
		name: 'Kaggle',
		baseUrl: 'https://kaggle.com/',
		color: 'magenta',
	},
	{
		name: 'Medium',
		baseUrl: 'https://medium.com/',
		color: 'blue',
	},
	{
		name: 'YouTube',
		baseUrl: 'https://youtube.com/',
		color: 'yellow',
	},
	{
		name: 'Reddit',
		baseUrl: 'https://www.reddit.com/user/',
		color: 'red',
	},
	{
		name: 'Quora',
		baseUrl: 'https://www.quora.com/profile/',
		color: 'green',
	},
	// Your SNS
] as const satisfies Readonly<{ name: string; baseUrl: string; color?: string }[]>

export function Copyright({
	text,
	color = 'default',
	sns,
}: {
	text: string | JSX.Element
	color?: string
	sns?: {
		[name in (typeof snsMap)[number]['name']]?: string
	}
}) {
	return (
		<Box flexDirection='column' borderStyle={'round'} paddingX={1}>
			<Text color={color === 'default' ? undefined : color}>{text}</Text>
			{sns && (
				<Box flexDirection='column' paddingTop={1}>
					{Object.entries(sns).map(([key, value]) => {
						const snsBase = snsMap.find(sns => sns.name === key)
						return (
							<Text key={key}>
								{snsBase && snsBase.color in enogu && enogu[snsBase.color](key)}:{' '}
								{snsBase && snsBase.baseUrl + value}
							</Text>
						)
					})}
				</Box>
			)}
		</Box>
	)
}

// #rippu:Copyright:A Copyright Component:ink,enogu
