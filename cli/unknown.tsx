import { Box, Newline, Text } from "ink";

import Logger from "../components/logger";

const UnknownBoard = (props: { command: string; params: string[] }) => (
	<Box flexDirection="column">
		<Box flexDirection="column" alignItems="flex-start">
			<Logger type="error" message={<Text>
                Unknown command : <Text bold italic>{props.command}</Text>
            </Text>} />
			<Logger
				type="info"
				message={
					<Text>
						Try{" "}
						<Text italic color={"gray"}>
							'rippu help'
						</Text>
					</Text>
				}
			/>
		</Box>
	</Box>
);

export default UnknownBoard;
