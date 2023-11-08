import { Board, BoardValue, Box, BoxId, BoxPath, BoxPathId, BoxValue, BoxValuePath, Move, Player } from "../type";
import { ArrayUtils } from "../utils";

interface IBoxValuePathAngle {
	boxId: BoxId;
	boxPathId: BoxPathId;
	isFilled: boolean;
}

interface ICalculateDimensionsExports {
	calculatedWidth: number;
	calculatedHeight: number;
}

interface IUpdateBoardProps {
	board: Board;
	boardValue: BoardValue;
	boxId: BoxId;
	pathId: BoxPathId;
	player: Player;
}

interface IUpdateBoardExports {
	board: Board;
	boardValue: BoardValue;
	isBoxFilled: boolean;
}

interface IGameUtilsExports {
	isAllBoxesFilled: (boardValue: BoardValue) => boolean;
	calculateDimensions: (board: Board) => ICalculateDimensionsExports;
	getClassName: (classes: Array<string>) => string;
	getScore: (board: Board, player: Player) => number;
	getMove: (boardValue: BoardValue) => Move;
	updateBoard: (props: IUpdateBoardProps) => IUpdateBoardExports;
}

export const useGameUtils = (): IGameUtilsExports => {
	const isBoxPathMatched = (path: BoxPath, pathId: BoxPathId): boolean => {
		return (
			path.topStartToTopEnd.id === pathId ||
			path.topEndToBottomEnd.id === pathId ||
			path.bottomEndToBottomStart.id === pathId ||
			path.bottomStartToTopStart.id === pathId
		);
	};

	const isBoxValuePathMatched = (boxValuePath: BoxValuePath, boxId: BoxId, pathId: BoxPathId): boolean => {
		return (
			(boxValuePath.topStartToTopEnd.boxId === boxId && boxValuePath.topStartToTopEnd.boxPathId === pathId) ||
			(boxValuePath.topEndToBottomEnd.boxId === boxId && boxValuePath.topEndToBottomEnd.boxPathId === pathId) ||
			(boxValuePath.bottomEndToBottomStart.boxId === boxId && boxValuePath.bottomEndToBottomStart.boxPathId === pathId) ||
			(boxValuePath.bottomStartToTopStart.boxId === boxId && boxValuePath.bottomStartToTopStart.boxPathId === pathId)
		);
	};

	const isBoxValuePathFilled = (boxValuePath: BoxValuePath): boolean => {
		return (
			boxValuePath.topStartToTopEnd.isFilled &&
			boxValuePath.topEndToBottomEnd.isFilled &&
			boxValuePath.bottomEndToBottomStart.isFilled &&
			boxValuePath.bottomStartToTopStart.isFilled
		);
	};

	const isAllBoxesFilled = (boardValue: BoardValue): boolean => {
		return boardValue.every((value) => value.every((v) => v.isFilled));
	};

	const calculateDimensions = (board: Board): ICalculateDimensionsExports => {
		const baseDimension: number = 100;
		if (board.length > 0) {
			return { calculatedHeight: baseDimension / board.length, calculatedWidth: baseDimension / board[0].length };
		} else {
			return { calculatedHeight: baseDimension, calculatedWidth: baseDimension };
		}
	};

	const getClassName = (classes: Array<string>): string => {
		return classes.join(" ");
	};

	const getScore = (board: Board, player: Player): number => {
		return board.reduce((previous: Array<Box>, current: Array<Box>): Array<Box> => {
			return previous.filter((box: Box) => box.filledBy === player).concat(current.filter((box: Box) => box.filledBy === player));
		}, []).length;
	};

	const getMove = (boardValue: BoardValue): Move => {
		const bestMoves: Array<Move> = [];
		const normalMoves: Array<Move> = [];

		boardValue.forEach((boxValues: Array<BoxValue>) => {
			return boxValues.forEach((boxValue: BoxValue) => {
				if (!boxValue.isFilled) {
					const boxValuePathAngles: Array<IBoxValuePathAngle> = getBoxValuePathAngles(boxValue.path);
					if (boxValuePathAngles.filter((angle) => angle.isFilled).length === 3) {
						bestMoves.push(findMove(boxValuePathAngles));
					} else {
						normalMoves.push(findMove(boxValuePathAngles));
					}
				}
			});
		});

		return bestMoves.length > 0 ? ArrayUtils.random(bestMoves) : ArrayUtils.random(normalMoves);
	};

	const getBoxValuePathAngles = (boxValuePath: BoxValuePath): Array<IBoxValuePathAngle> => {
		return [
			{
				boxId: boxValuePath.topStartToTopEnd.boxId,
				boxPathId: boxValuePath.topStartToTopEnd.boxPathId,
				isFilled: boxValuePath.topStartToTopEnd.isFilled,
			},
			{
				boxId: boxValuePath.topEndToBottomEnd.boxId,
				boxPathId: boxValuePath.topEndToBottomEnd.boxPathId,
				isFilled: boxValuePath.topEndToBottomEnd.isFilled,
			},
			{
				boxId: boxValuePath.bottomEndToBottomStart.boxId,
				boxPathId: boxValuePath.bottomEndToBottomStart.boxPathId,
				isFilled: boxValuePath.bottomEndToBottomStart.isFilled,
			},
			{
				boxId: boxValuePath.bottomStartToTopStart.boxId,
				boxPathId: boxValuePath.bottomStartToTopStart.boxPathId,
				isFilled: boxValuePath.bottomStartToTopStart.isFilled,
			},
		];
	};

	const findMove = (boxValuePathAngles: Array<IBoxValuePathAngle>): Move => {
		const angle: IBoxValuePathAngle = ArrayUtils.random(boxValuePathAngles.filter((angle) => !angle.isFilled));
		return {
			boxId: angle.boxId,
			boxPathId: angle.boxPathId,
		};
	};

	const updateBoard = (props: IUpdateBoardProps): IUpdateBoardExports => {
		const board: Board = ArrayUtils.clone(props.board);
		const boardValue: BoardValue = ArrayUtils.clone(props.boardValue);
		let isBoxFilled: boolean = false;

		board.filter((boxes: Array<Box>) =>
			boxes
				.filter((box: Box) => box.id === props.boxId && isBoxPathMatched(box.path, props.pathId))
				.forEach((box: Box) => {
					if (box.path.topStartToTopEnd.id === props.pathId) {
						box.path.topStartToTopEnd.filledBy = props.player;
					} else if (box.path.topEndToBottomEnd.id === props.pathId) {
						box.path.topEndToBottomEnd.filledBy = props.player;
					} else if (box.path.bottomEndToBottomStart.id === props.pathId) {
						box.path.bottomEndToBottomStart.filledBy = props.player;
					} else if (box.path.bottomStartToTopStart.id === props.pathId) {
						box.path.bottomStartToTopStart.filledBy = props.player;
					}
				})
		);

		boardValue.filter((boxValues: Array<BoxValue>) =>
			boxValues
				.filter((boxValue: BoxValue) => isBoxValuePathMatched(boxValue.path, props.boxId, props.pathId))
				.forEach((boxValue: BoxValue) => {
					if (boxValue.path.topStartToTopEnd.boxId === props.boxId && boxValue.path.topStartToTopEnd.boxPathId === props.pathId) {
						boxValue.path.topStartToTopEnd.isFilled = true;
					} else if (boxValue.path.topEndToBottomEnd.boxId === props.boxId && boxValue.path.topEndToBottomEnd.boxPathId === props.pathId) {
						boxValue.path.topEndToBottomEnd.isFilled = true;
					} else if (boxValue.path.bottomEndToBottomStart.boxId === props.boxId && boxValue.path.bottomEndToBottomStart.boxPathId === props.pathId) {
						boxValue.path.bottomEndToBottomStart.isFilled = true;
					} else if (boxValue.path.bottomStartToTopStart.boxId === props.boxId && boxValue.path.bottomStartToTopStart.boxPathId === props.pathId) {
						boxValue.path.bottomStartToTopStart.isFilled = true;
					}
				})
		);

		boardValue.forEach((boxValues: Array<BoxValue>, boxValuesIndex: number) => {
			boxValues.forEach((boxValue: BoxValue, boxValueIndex: number) => {
				if (!boxValue.isFilled && isBoxValuePathFilled(boxValue.path)) {
					isBoxFilled = true;
					boxValue.isFilled = true;
					board[boxValuesIndex][boxValueIndex].filledBy = props.player;
				}
			});
		});
		return { board, boardValue, isBoxFilled };
	};

	return { isAllBoxesFilled, calculateDimensions, getClassName, getScore, getMove, updateBoard };
};
