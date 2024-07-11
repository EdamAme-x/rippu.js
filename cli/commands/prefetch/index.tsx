import { useEffect, useState } from "react";
import { gray } from "enogu";
import { Box, Newline, Text } from "ink";

import { Loading } from "../../../components/loading";
import Logger from "../../../components/logger";
import { fetchComponent } from "../../utils/fetchComponent";
import { simpleHash } from "../../utils/simpleHash";

const PrefetchCommand = (props: { command: string; params: string[] }) => {
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
		setTimeout(() => {
            process.exit(0);
		}, 5000);
	}, []);

	useEffect(() => {
		if (component.ok) {
			setIsStop(true);
		} else {
			if (component.error) {
				if (component.error === "Loading") {
					setIsStop(false);
				} else {
					setIsStop(true);
				}
			}
		}
	}, [component]);

	return (
		<Box flexDirection="column">
			{component.ok ? (
				<Box flexDirection="column">
					<Text bold color="green">
						<Loading variant="point" stop={isStop} /> Prefetched "{componentName}"
					</Text>
					{component.data ? (
						Object.entries(component.data).map(([key, value]) => {
							const keys = key as keyof typeof component.data;
							switch (keys) {
								case "componentName":
									return <Text key={key}>Component Name: {value}</Text>;
								case "componentUrl":
									return <Text key={key}>Component Raw URL: {value}</Text>;
								case "title":
									return <Text key={key}>Title: {value}</Text>;
								case "description":
									return <Text key={key}>Description: {value}</Text>;
								case "source":
									return <Text key={key}>Hash: {simpleHash(value)}</Text>;
							}
						})
					) : (
						<Logger type="error" message="Unknown error" />
					)}
				</Box>
			) : component.error === "Loading" ? (
				<Text bold color="red">
					<Loading variant="point" stop={isStop} /> Prefetching...
				</Text>
			) : (
				<Logger type="error" message={component.error ?? "Unknown error"} />
			)}
            <Text>{" "}</Text>
			<Text color={"blue"} bold>
				Press {gray("Ctrl+C")} key to exit
			</Text>
		</Box>
	);
};

export default PrefetchCommand;
