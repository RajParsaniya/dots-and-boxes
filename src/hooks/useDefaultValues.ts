import { Board, BoardValue, Box, BoxDot, BoxId, BoxPath, BoxPathId, BoxValue, BoxValueId, BoxValuePath, GameValue } from "../type";
import { ArrayUtils } from "../utils";

interface IDefaultValuesExports {
	defaultBoard: (rows: number, cols: number) => Board;
	defaultBoardValue: (rows: number, cols: number) => BoardValue;
	defaultGameValue: GameValue;
}

export const useDefaultValues = (): IDefaultValuesExports => {
	const createDefaultPath = (rows: number, cols: number, rowIndex: number, colIndex: number): BoxPath => {
		const isTopEndToBottomEndPathVisible: boolean = cols === colIndex + 1;
		const isBottomEndToBottomStartPathVisible: boolean = rows === rowIndex + 1;

		return {
			topStartToTopEnd: { id: 1, isVisible: true, filledBy: null },
			topEndToBottomEnd: { id: 2, isVisible: isTopEndToBottomEndPathVisible, filledBy: null },
			bottomEndToBottomStart: { id: 3, isVisible: isBottomEndToBottomStartPathVisible, filledBy: null },
			bottomStartToTopStart: { id: 4, isVisible: true, filledBy: null },
		};
	};

	const createDefaultDot = (rows: number, cols: number, rowIndex: number, colIndex: number): BoxDot => {
		const isTopRightDotVisible: boolean = cols === colIndex + 1;
		const isBottomLeftDotVisible: boolean = rows === rowIndex + 1;
		const isBottomRightDotVisible: boolean = isBottomLeftDotVisible && isTopRightDotVisible;

		return {
			topLeft: { id: 1, isVisible: true },
			topRight: { id: 2, isVisible: isTopRightDotVisible },
			bottomLeft: { id: 3, isVisible: isBottomLeftDotVisible },
			bottomRight: { id: 4, isVisible: isBottomRightDotVisible },
		};
	};

	const createDefaultBox = (rows: number, cols: number, rowIndex: number, colIndex: number): Box => {
		const id: BoxId = rows * rowIndex + (colIndex + 1);
		const path: BoxPath = createDefaultPath(rows, cols, rowIndex, colIndex);
		const dot: BoxDot = createDefaultDot(rows, cols, rowIndex, colIndex);
		return { id: id, path: path, dot: dot, filledBy: null };
	};

	const createDefaultBoard = (rows: number, cols: number): Board => {
		return ArrayUtils.create(rows).map((_, rowIndex) => {
			return ArrayUtils.create(cols).map((_, colIndex) => {
				return createDefaultBox(rows, cols, rowIndex, colIndex);
			});
		});
	};

	const createDefaultValuePath = (rows: number, cols: number, rowIndex: number, colIndex: number): BoxValuePath => {
		const isLastCol: boolean = cols === colIndex + 1;
		const isLastRow: boolean = rows === rowIndex + 1;

		const defaultBoxId: BoxId = rows * rowIndex + (colIndex + 1);
		const topEndToBottomEndBoxId: BoxId = isLastCol ? defaultBoxId : defaultBoxId + 1;
		const bottomEndToBottomStartBoxId: BoxId = isLastRow ? defaultBoxId : defaultBoxId + rows;
		const topEndToBottomEndBoxPathId: BoxPathId = isLastCol ? 2 : 4;
		const bottomEndToBottomStartBoxPathId: BoxPathId = isLastRow ? 3 : 1;

		const path: BoxValuePath = {
			topStartToTopEnd: { boxId: defaultBoxId, boxPathId: 1, isFilled: false },
			topEndToBottomEnd: { boxId: topEndToBottomEndBoxId, boxPathId: topEndToBottomEndBoxPathId, isFilled: false },
			bottomEndToBottomStart: { boxId: bottomEndToBottomStartBoxId, boxPathId: bottomEndToBottomStartBoxPathId, isFilled: false },
			bottomStartToTopStart: { boxId: defaultBoxId, boxPathId: 4, isFilled: false },
		};
		return path;
	};

	const createDefaultBoxValue = (rows: number, cols: number, rowIndex: number, colIndex: number): BoxValue => {
		const id: BoxValueId = rows * rowIndex + (colIndex + 1);
		const path: BoxValuePath = createDefaultValuePath(rows, cols, rowIndex, colIndex);
		return { id: id, path: path, isFilled: false };
	};

	const createDefaultBoardValue = (rows: number, cols: number): BoardValue => {
		return ArrayUtils.create(rows).map((_, rowIndex) => {
			return ArrayUtils.create(cols).map((_, colIndex) => {
				return createDefaultBoxValue(rows, cols, rowIndex, colIndex);
			});
		});
	};

	const defaultBoard = (rows: number, cols: number): Board => createDefaultBoard(rows, cols);
	const defaultBoardValue = (rows: number, cols: number): BoardValue => createDefaultBoardValue(rows, cols);

	const defaultGameValue: GameValue = {
		bestScore: 0,
	};

	return { defaultBoard, defaultBoardValue, defaultGameValue };
};
