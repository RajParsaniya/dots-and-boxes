import { Box, Center, Flex, Text } from "@chakra-ui/react";

interface IScoreProps {
	label: string;
	score: number;
	sx?: object;
}

export const Score = (props: IScoreProps): JSX.Element => {
	return (
		<Box w="full" h="full" sx={props.sx}>
			<Flex w="full" h="full" direction="row" borderWidth={1} borderRadius="lg" overflow="hidden">
				<Center w={0} h="full" flex="1 1 auto" backgroundColor="brand.secondary.default">
					<Text w="fit-content" h="fit-content" variant="label">
						{props.label}
					</Text>
				</Center>
				<Center w={10} minW={10} maxW={10} h="full">
					<Text w="fit-content" h="fit-content" variant="score">
						{props.score}
					</Text>
				</Center>
			</Flex>
		</Box>
	);
};
