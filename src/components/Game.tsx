import { Box, HStack, VStack } from "@chakra-ui/react";
import { useGame } from "../hooks";
import { Board, BoxId, BoxPathId } from "../type";

interface IGameProps {
	board: Board;
	onClickPath: (boxId: BoxId, pathId: BoxPathId) => void;
	sx?: object;
}

export const Game = (props: IGameProps): JSX.Element => {
	const {
		calculatedHeight,
		calculatedWidth,
		onClickTopStartToTopEnd,
		onClickTopEndToBottomEnd,
		onClickBottomEndToBottomStart,
		onClickBottomStartToTopStart,
		getClassTopStartToTopEnd,
		getClassTopEndToBottomEnd,
		getClassBottomEndToBottomStart,
		getClassBottomStartToTopStart,
		getClassSvg,
	} = useGame({ board: props.board, onClickPath: props.onClickPath });

	return (
		<Box w="full" h="full" sx={props.sx}>
			<VStack w="full" h="full" spacing={0}>
				{props.board.map((boxes, boxesIndex) => {
					const boxesKey = "boxes-" + boxesIndex;
					return (
						<HStack key={boxesKey} w="full" h={calculatedHeight} spacing={0}>
							{boxes.map((box, boxIndex) => {
								const boxKey = "box-" + boxIndex;
								return (
									<Box key={boxKey} w={calculatedWidth} h="full">
										<svg width="100%" height="100%" className={getClassSvg(box)}>
											{box.path.topStartToTopEnd.isVisible && (
												<line
													x1="0%"
													y1="0%"
													x2="100%"
													y2="0%"
													className={getClassTopStartToTopEnd(box)}
													onClick={() => onClickTopStartToTopEnd(box)}
												/>
											)}
											{box.path.topEndToBottomEnd.isVisible && (
												<line
													x1="100%"
													y1="0%"
													x2="100%"
													y2="100%"
													className={getClassTopEndToBottomEnd(box)}
													onClick={() => onClickTopEndToBottomEnd(box)}
												/>
											)}
											{box.path.bottomEndToBottomStart.isVisible && (
												<line
													x1="100%"
													y1="100%"
													x2="0%"
													y2="100%"
													className={getClassBottomEndToBottomStart(box)}
													onClick={() => onClickBottomEndToBottomStart(box)}
												/>
											)}
											{box.path.bottomStartToTopStart.isVisible && (
												<line
													x1="0%"
													y1="0%"
													x2="0%"
													y2="100%"
													className={getClassBottomStartToTopStart(box)}
													onClick={() => onClickBottomStartToTopStart(box)}
												/>
											)}
											{box.dot.topLeft.isVisible && <rect x="2%" y="0%" width="2%" height="2%" className="dot" />}
											{box.dot.topRight.isVisible && <rect x="98%" y="0%" width="100%" height="2%" className="dot" />}
											{box.dot.bottomLeft.isVisible && <rect x="0%" y="98%" width="2%" height="2%" className="dot" />}
											{box.dot.bottomRight.isVisible && <rect x="98%" y="98%" width="2%" height="2%" className="dot" />}
										</svg>
									</Box>
								);
							})}
						</HStack>
					);
				})}
			</VStack>
		</Box>
	);
};
