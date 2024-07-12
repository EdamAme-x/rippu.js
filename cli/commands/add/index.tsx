import { Text } from 'ink'
import Logger from '../../../components/logger';

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

	return <Text>{componentName} {putPath} {fileType}</Text>
}

export default AddCommand
