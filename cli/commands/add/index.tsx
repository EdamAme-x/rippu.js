import { Text } from 'ink'
import Logger from '../../../components/logger';
import { useEffect, useState } from 'react';
import { Loading } from '../../../components/loading';
import { fetchComponent } from '../../utils/fetchComponent';

const fileTypes = {
	"jsx": "jsx",
	"tsx": "tsx"
}

const AddCommand = (props: { command: string; params: string[] }) => {
	if (props.params.length < 1) {
		return <Logger type="error" message={"Not enough arguments"} />
	}
	const componentName = props.params[0].toLowerCase();
	const putPath = props.params[1] ?? `./${componentName}.tsx`;
	let fileType = putPath.split(".").pop() ?? "tsx";

	if (!(fileType in fileTypes)) {
		fileType = "tsx";
	}

	// FIXME
	const [addContainer, setAddContainer] = useState<{
		status: "loading" | "error" | "complete",
		data: any
	}>({
		status: "loading",
		data: null
	})

	useEffect(() => {
		;(async () => {
			const component = await fetchComponent(componentName);

			if (component.ok) {
				
			}
		})()
	}, [])

	return <Text>{
		addContainer.status === "loading" ? <>
			<Text color="red"><Loading variant="point" /> Fetching...</Text>
		</> : <>complete</>
	}</Text>
}

export default AddCommand
