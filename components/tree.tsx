import * as enogu from 'enogu'
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
	color?: string | string[]
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
					color={Array.isArray(color) ? color : [color]}
					space={space}
					length={length}
					isLast={index === tree.length - 1}
					between={between + 1}
				/>
			))}
		</>
	)
}

function Branch({
	tree,
	bold,
	color,
	space,
	length,
	between,
	depth = 0,
	isLast,
	parentsIsLast = [],
}: {
	tree: Tree
	bold: boolean
	color: string[]
	space: number
	length: number
	between: number
	depth?: number
	isLast: boolean
	parentsIsLast?: boolean[]
}) {
	const colorIndex = depth > color.length - 1 ? color.length - 1 : depth

	const isNeedPipe = (index: number) => {
		return !parentsIsLast[index]
	}

	return (
		<>
			<Text>
				{Array.from({ length: between }).map((_, indexDepth) => (
					<Text key={indexDepth}>
						{Array.from({ length: depth }).map((_, index) => {
							const key = color[index]
							const paint = enogu[key as keyof typeof enogu] ?? enogu.reset

							return paint(
								(isNeedPipe(index) ? getPipe('vertical', bold) : ' ') + ' '.repeat(length)
							)
						})}
					</Text>
				))}
				<Text color={color[colorIndex] === 'default' ? undefined : color[colorIndex]}>
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
							space={space}
							length={length}
							between={between}
							depth={depth + 1}
							key={index}
							isLast={tree.children ? index === tree.children.length - 1 : false}
							parentsIsLast={parentsIsLast.concat(isLast)}
						/>
					))
				: null}
		</>
	)
}

// #rippu:Tree:A Tree Component:ink,enogu
