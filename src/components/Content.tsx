import { Box, Button, Center, HStack, Spacer, Spinner, VStack } from "@chakra-ui/react";
import { Game, Score } from ".";
import { ALL_TIME_BEST_SCORE_LABEL, REPLAY_BUTTON, START_BUTTON } from "../constants";
import { EPlayer } from "../enums";
import { useCore, useLocalStorage } from "../hooks";
import { Board, BoxId, BoxPathId } from "../type";

interface IContentProps {
	board: Board;
	reload: boolean;
	isLoading: boolean;
	isStarted: boolean;
	isEnded: boolean;
	onClickStart: () => void;
	onClickReplay: () => void;
	onClickPath: (boxId: BoxId, pathId: BoxPathId) => void;
	sx?: object;
}

export const Content = (props: IContentProps): JSX.Element => {
	const { getScore } = useCore();
	const { getBestScore } = useLocalStorage();

	return (
		<VStack w="full" h="full" spacing={0} sx={props.sx}>
			<Spacer />
			<Box w="full" h="full">
				{props.reload ? (
					<Center w="full" h="full">
						<Spinner size="md" color="brand.secondary.default" />
					</Center>
				) : (
					<VStack w="full" h="full" spacing={0}>
						<Spacer />
						<Game board={props.board} onClickPath={props.onClickPath} sx={{ w: "full", h: 72 }} />
						<Spacer />
						<Box w="full" h={8} px={0.5}>
							{props.isStarted ? (
								<HStack w="full" h="full" spacing={0}>
									<Score label={EPlayer.ME} score={getScore(props.board, EPlayer.ME)} sx={{ w: "30%", h: "full" }} />
									<Spacer />
									<Score label={EPlayer.YOU} score={getScore(props.board, EPlayer.YOU)} sx={{ w: "30%", h: "full" }} />
									<Spacer />
									<Box w="30%" h="full">
										<Button w="full" h="full" variant="primary" _hover={{ opacity: 0.7 }} onClick={props.onClickReplay}>
											{REPLAY_BUTTON}
										</Button>
									</Box>
								</HStack>
							) : (
								<HStack w="full" h="full" spacing={0}>
									<Score label={ALL_TIME_BEST_SCORE_LABEL} score={getBestScore()} sx={{ w: "65%", h: "full" }} />
									<Spacer />
									<Box w="30%" h="full">
										<Button
											w="full"
											h="full"
											variant="primary"
											_hover={{ opacity: 0.7 }}
											_loading={{ opacity: 0.7 }}
											isLoading={props.isLoading}
											onClick={props.onClickStart}
										>
											{START_BUTTON}
										</Button>
									</Box>
								</HStack>
							)}
						</Box>
						<Spacer />
					</VStack>
				)}
			</Box>
			<Spacer />
		</VStack>
	);
};
