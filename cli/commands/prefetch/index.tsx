import { useEffect, useState } from "react";
import { Box, Newline, Text } from "ink";

import { Loading } from "../../../components/loading";
import Logger from "../../../components/logger";
import { fetchComponent } from "../../utils/fetchComponent";

const AddCommand = (props: { command: string; params: string[] }) => {
	const componentName = props.params[0];
	if (!componentName) {
		return <Logger type="error" message="Component name is required" />;
	}

	if (/[a-zA-Z1-9-_]+/.test(componentName) === false) {
		return <Logger type="error" message="Invalid component name" />;
	}

	const [isStop, setIsStop] = useState<boolean>(false);
	const [component, setComponent] = useState<Awaited<ReturnType<typeof fetchComponent>>>({
		ok: false,
		error: "Loading",
        data: null
	});

    useEffect(() => {
        (async () => {
            const data = await fetchComponent(componentName);

            setComponent(data);
        })();
    }, []);

    useEffect(() => {
        if (component.ok) {
            setIsStop(true);
        }else {
            if (component.error) {
                if (component.error === "Loading") {
                    setIsStop(false);
                }else {
                    setIsStop(true);
                }
            }
        }
    }, [component]);

	return (
		<Box>
			<Text>
				<Loading variant="pipe" stop={isStop} /> Prefetching...
			</Text>
		</Box>
	);
};

export default AddCommand;
