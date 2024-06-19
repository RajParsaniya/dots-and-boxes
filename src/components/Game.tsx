import { Box as ChakraBox, HStack, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { useGameUtils } from "../hooks";
import { Board, Box, BoxId, BoxPathId } from "../type";
import { StringUtils } from "../utils";

interface IGameProps {
	board: Board;
	onClickPath: (boxId: BoxId, pathId: BoxPathId) => void;
	sx?: object;
}

export const Game = (props: IGameProps) => {
	const { calculateDimensions, getClassName } = useGameUtils();

	const calculatedHeight = useMemo((): string => {
		const height: number = calculateDimensions(props.board).calculatedHeight;
		return StringUtils.replace("{0}%", height.toString());
	}, [calculateDimensions, props.board]);

	const calculatedWidth = useMemo((): string => {
		const width: number = calculateDimensions(props.board).calculatedWidth;
		return StringUtils.replace("{0}%", width.toString());
	}, [calculateDimensions, props.board]);

	const onClickTopStartToTopEnd = (box: Box): void => {
		if (box.path.topStartToTopEnd.filledBy === null) {
			props.onClickPath(box.id, box.path.topStartToTopEnd.id);
		}
	};

	const onClickTopEndToBottomEnd = (box: Box): void => {
		if (box.path.topEndToBottomEnd.filledBy === null) {
			props.onClickPath(box.id, box.path.topEndToBottomEnd.id);
		}
	};

	const onClickBottomEndToBottomStart = (box: Box): void => {
		if (box.path.bottomEndToBottomStart.filledBy === null) {
			props.onClickPath(box.id, box.path.bottomEndToBottomStart.id);
		}
	};

	const onClickBottomStartToTopStart = (box: Box): void => {
		if (box.path.bottomStartToTopStart.filledBy === null) {
			props.onClickPath(box.id, box.path.bottomStartToTopStart.id);
		}
	};

	const getClassTopStartToTopEnd = (box: Box): string => {
		const classes: Array<string> = ["line"];
		if (box.path.topStartToTopEnd.filledBy === "ME") {
			classes.push("line-player-me");
		} else if (box.path.topStartToTopEnd.filledBy === "YOU") {
			classes.push("line-player-you");
		}
		return getClassName(classes);
	};

	const getClassTopEndToBottomEnd = (box: Box): string => {
		const classes: Array<string> = ["line"];
		if (box.path.topEndToBottomEnd.filledBy === "ME") {
			classes.push("line-player-me");
		} else if (box.path.topEndToBottomEnd.filledBy === "YOU") {
			classes.push("line-player-you");
		}
		return getClassName(classes);
	};

	const getClassBottomEndToBottomStart = (box: Box): string => {
		const classes: Array<string> = ["line"];
		if (box.path.bottomEndToBottomStart.filledBy === "ME") {
			classes.push("line-player-me");
		} else if (box.path.bottomEndToBottomStart.filledBy === "YOU") {
			classes.push("line-player-you");
		}
		return getClassName(classes);
	};

	const getClassBottomStartToTopStart = (box: Box): string => {
		const classes: Array<string> = ["line"];
		if (box.path.bottomStartToTopStart.filledBy === "ME") {
			classes.push("line-player-me");
		} else if (box.path.bottomStartToTopStart.filledBy === "YOU") {
			classes.push("line-player-you");
		}
		return getClassName(classes);
	};

	const getClassSvg = (box: Box): string => {
		const classes: Array<string> = ["svg"];
		if (box.filledBy === "ME") {
			classes.push("svg-player-me");
		} else if (box.filledBy === "YOU") {
			classes.push("svg-player-you");
		}
		return getClassName(classes);
	};

	return (
		<ChakraBox w="full" h="full" sx={props.sx}>
			<VStack w="full" h="full" spacing={0}>
				{props.board.map((boxes, boxesIndex) => {
					const boxesKey = "boxes-" + boxesIndex;
					return (
						<HStack key={boxesKey} w="full" h={calculatedHeight} spacing={0}>
							{boxes.map((box, boxIndex) => {
								const boxKey = "box-" + boxIndex;
								return (
									<ChakraBox key={boxKey} w={calculatedWidth} h="full">
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
									</ChakraBox>
								);
							})}
						</HStack>
					);
				})}
			</VStack>
		</ChakraBox>
	);
};
