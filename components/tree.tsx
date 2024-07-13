import { Text } from 'ink'

type Tree = {
	text: string | JSX.Element
	children?: Tree[]
}

type TreeRoot = Tree[]

const TreePipes = {
	vertical: {
		regular: '│',
		bold: '┃',
	},
	verticalAndHorizontal: {
		regular: '├',
		bold: '┣',
	},
	halfVerticalAndHorizontal: {
		regular: '└',
		bold: '┗',
	},
	horizontal: {
		regular: '─',
		bold: '━',
	},
	horizontalAndVertical: {
		regular: '┬',
		bold: '┳',
	},
} as const satisfies Record<string, Record<'regular' | 'bold', string>>

function getPipe(
	type:
		| 'vertical'
		| 'verticalAndHorizontal'
		| 'halfVerticalAndHorizontal'
		| 'horizontal'
		| 'horizontalAndVertical',
	bold: boolean
) {
	return TreePipes[type][bold ? 'bold' : 'regular']
}

/**
 * Renders a tree structure recursively.
 *
 * @param {TreeRoot} tree - The root tree node.
 * @param {boolean} [bold=false] - Flag to determine if text should be bold.
 * @param {string} [color='default'] - The color of the text.
 * @param {number} [space=1] - The space between tree branches.
 * @param {number} [length=1] - The length of each branch.
 * @param {number} [between=0] - The space between branches.
 */
export function Tree({
	tree,
	bold = false,
	color = 'default',
	space = 1,
	length = 1,
	between = 0,
}: {
	tree: TreeRoot
	bold?: boolean
	color?: string
	space?: number
	length?: number
	between?: number
}) {
	return (
		<>
			{tree.map((branch, index) => (
				<Branch
					key={index}
					tree={branch}
					bold={bold}
					color={color}
					space={space}
					length={length}
					isLast={index === tree.length - 1}
					between={between}
				/>
			))}
		</>
	)
}

function Branch({
	tree,
	bold = false,
	color = 'white',
	space,
	length,
	between,
	depth = 0,
	isLast,
}: {
	tree: Tree
	bold: boolean
	color: string
	space: number
	length: number
	between: number
	depth?: number
	isLast: boolean
}) {
	return (
		<>
			{Array.from({ length: between }).map((_, i) => (
				<Text key={i}>{(getPipe('vertical', bold) + ' '.repeat(length)).repeat(depth + 1)}</Text>
			))}
			<Text>
				<Text color={color}>{(getPipe('vertical', bold) + ' '.repeat(length)).repeat(depth)}</Text>
				<Text color={color}>
					{isLast
						? getPipe('halfVerticalAndHorizontal', bold)
						: getPipe('verticalAndHorizontal', bold)}
					{getPipe('horizontal', bold).repeat(length)}
					{tree.children ? getPipe('horizontalAndVertical', bold) : getPipe('horizontal', bold)}
					{getPipe('horizontal', bold)}
				</Text>
				{' '.repeat(space) + tree.text}
			</Text>
			{tree.children
				? tree.children.map((branch, index) => (
						<Branch
							tree={branch}
							bold={bold}
							color={color}
							space={space + 1}
							length={length}
							between={between}
							depth={depth + 1}
							key={index}
							isLast={tree.children ? index === tree.children.length - 1 : false}
						/>
					))
				: null}
		</>
	)
}

// #rippu:Tree:A Tree Component:ink
