import { Center, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { Content } from ".";
import { FOOTER_TEXT, GITHUB_URL, TITLE_TEXT } from "../constants";
import { useApp } from "../hooks";

export const App = () => {
	const rows: number = 8;
	const cols: number = 8;

	const { board, isLoading, isStarted, isEnded, onClickStart, onClickReplay, onClickPath } = useApp({ rows: rows, cols: cols });

	return (
		<Center w="full" minW="100vw" h="full" minH="100vh">
			<VStack w="fit-content" h="fit-content" backgroundColor="brand.primary.default" borderRadius="3xl" py={7}>
				<Text w="fit-content" h="fit-content" variant="title">
					{TITLE_TEXT}
				</Text>
				<HStack w="400px" minW="400px" maxW="400px" h="400px" minH="400px" maxH="400px" px={10}>
					<Content
						board={board}
						isLoading={isLoading}
						isStarted={isStarted}
						isEnded={isEnded}
						onClickStart={onClickStart}
						onClickReplay={onClickReplay}
						onClickPath={onClickPath}
						sx={{ w: "full", h: "full" }}
					/>
				</HStack>
				<Link w="fit-content" h="fit-content" variant="footer" target="_blank" href={GITHUB_URL}>
					{FOOTER_TEXT}
				</Link>
			</VStack>
		</Center>
	);
};
