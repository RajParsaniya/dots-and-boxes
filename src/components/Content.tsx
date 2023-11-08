import { Button, Center, Box as ChakraBox, HStack, Spacer, Spinner, VStack } from "@chakra-ui/react";
import { Game, Score } from ".";
import { ALL_TIME_BEST_SCORE_LABEL, MINE_SCORE_LABEL, REPLAY_BUTTON_TEXT, START_BUTTON_TEXT, YOUR_SCORE_LABEL } from "../constants";
import { useGameUtils, useLocalStorage } from "../hooks";
import { Board, BoxId, BoxPathId } from "../type";

interface IContentProps {
	board: Board | undefined;
	isLoading: boolean;
	isStarted: boolean;
	isEnded: boolean;
	onClickStart: () => void;
	onClickReplay: () => void;
	onClickPath: (boxId: BoxId, pathId: BoxPathId) => void;
	sx?: object;
}

export const Content = (props: IContentProps) => {
	const { getScore } = useGameUtils();
	const { getBestScore } = useLocalStorage();

	return (
		<VStack w="full" h="full" spacing={0} sx={props.sx}>
			<Spacer />
			<ChakraBox w="full" h="full">
				{props.board === undefined ? (
					<Center w="full" h="full">
						<Spinner size="md" color="brand.secondary.default" />
					</Center>
				) : (
					<VStack w="full" h="full" spacing={0}>
						<Spacer />
						<Game board={props.board} onClickPath={props.onClickPath} sx={{ w: "full", h: 72 }} />
						<Spacer />
						<ChakraBox w="full" h={8} px={0.5}>
							{props.isStarted ? (
								<HStack w="full" h="full" spacing={0}>
									<Score label={MINE_SCORE_LABEL} score={getScore(props.board, "ME")} sx={{ w: "30%", h: "full" }} />
									<Spacer />
									<Score label={YOUR_SCORE_LABEL} score={getScore(props.board, "YOU")} sx={{ w: "30%", h: "full" }} />
									<Spacer />
									<ChakraBox w="30%" h="full">
										<Button w="full" h="full" variant="primary" onClick={props.onClickReplay}>
											{REPLAY_BUTTON_TEXT}
										</Button>
									</ChakraBox>
								</HStack>
							) : (
								<HStack w="full" h="full" spacing={0}>
									<Score label={ALL_TIME_BEST_SCORE_LABEL} score={getBestScore()} sx={{ w: "65%", h: "full" }} />
									<Spacer />
									<ChakraBox w="30%" h="full">
										<Button
											w="full"
											h="full"
											variant="primary"
											_hover={{ opacity: 0.7 }}
											_loading={{ opacity: 0.7 }}
											isLoading={props.isLoading}
											onClick={props.onClickStart}
										>
											{START_BUTTON_TEXT}
										</Button>
									</ChakraBox>
								</HStack>
							)}
						</ChakraBox>
						<Spacer />
					</VStack>
				)}
			</ChakraBox>
			<Spacer />
		</VStack>
	);
};
