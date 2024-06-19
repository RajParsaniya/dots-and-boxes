import { useCallback, useEffect, useMemo, useState } from "react";
import { useDefaultValues, useGameUtils, useLocalStorage, useToast, useToastOptions } from ".";
import { Board, BoardValue, BoxId, BoxPathId, Move, Player } from "../type";

interface IAppProps {
	rows: number;
	cols: number;
}

interface IAppExports {
	board: Board | undefined;
	isLoading: boolean;
	isStarted: boolean;
	isEnded: boolean;
	onClickStart: () => void;
	onClickReplay: () => void;
	onClickPath: (boxId: BoxId, pathId: BoxPathId) => void;
}

export const useApp = (props: IAppProps): IAppExports => {
	const { defaultBoard, defaultBoardValue } = useDefaultValues();

	const [board, setBoard] = useState<Board | undefined>(undefined);
	const [boardValue, setBoardValue] = useState<BoardValue | undefined>(undefined);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [isFreezed, setIsFreezed] = useState<boolean>(false);
	const [isEnded, setIsEnded] = useState<boolean>(false);

	const { toast, closeAll } = useToast();
	const { setBestScore } = useLocalStorage();
	const { isAllBoxesFilled, getScore, getMove, updateBoard } = useGameUtils();
	const { notStartedToastOptions, loseToastOptions, wonToastOptions, tieToastOptions } = useToastOptions();

	const isFinished = useMemo((): boolean => {
		if (boardValue === undefined) {
			return false;
		} else {
			return isAllBoxesFilled(boardValue);
		}
	}, [boardValue, isAllBoxesFilled]);

	const resetGame = useCallback((): void => {
		setBoard(undefined);
		setBoardValue(undefined);
	}, []);

	const updateGame = useCallback(
		(boxId: BoxId, pathId: BoxPathId, player: Player): void => {
			if (board != undefined && boardValue !== undefined) {
				const {
					board: updatedBoard,
					boardValue: updatedBoardValue,
					isBoxFilled,
				} = updateBoard({
					board: board,
					boardValue: boardValue,
					boxId: boxId,
					pathId: pathId,
					player: player,
				});
				setBoard(updatedBoard);
				setBoardValue(updatedBoardValue);
				setIsFreezed((isFreezed) => (isBoxFilled ? isFreezed : !isFreezed));
			}
		},
		[board, boardValue, updateBoard]
	);

	const updateBestScore = useCallback((): void => {
		if (board !== undefined) {
			setBestScore(getScore(board, "YOU"));
		}
	}, [board, getScore, setBestScore]);

	const finishGame = useCallback((): void => {
		if (board !== undefined) {
			const mineScore = getScore(board, "ME");
			const yourScore = getScore(board, "YOU");

			if (mineScore > yourScore) {
				toast(loseToastOptions);
			} else if (yourScore > mineScore) {
				toast(wonToastOptions);
			} else {
				toast(tieToastOptions);
			}
		}
	}, [board, getScore, loseToastOptions, tieToastOptions, toast, wonToastOptions]);

	const onClickStart = (): void => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setIsStarted(true);
		}, 300);
	};

	const onClickReplay = (): void => {
		if (isEnded || !isFreezed) {
			setIsStarted(false);
			setIsEnded(false);
			resetGame();
			closeAll();
		}
	};

	const onClickPath = (boxId: BoxId, pathId: BoxPathId): void => {
		if (!isStarted) {
			toast(notStartedToastOptions);
		} else if (!isFreezed) {
			updateGame(boxId, pathId, "YOU");
			updateBestScore();
		}
	};

	useEffect(() => {
		if (board === undefined && boardValue === undefined) {
			setTimeout(() => {
				setBoard(defaultBoard(props.rows, props.cols));
				setBoardValue(defaultBoardValue(props.rows, props.cols));
			}, 500);
		}
	}, [board, boardValue, defaultBoard, defaultBoardValue, props.cols, props.rows]);

	useEffect(() => {
		if (boardValue !== undefined && isFreezed && isStarted && !isFinished) {
			setTimeout(() => {
				const move: Move = getMove(boardValue);
				updateGame(move.boxId, move.boxPathId, "ME");
			}, 300);
		}
	}, [boardValue, getMove, isFinished, isFreezed, isStarted, updateGame]);

	useEffect(() => {
		if (isFinished && !isEnded) {
			setIsEnded(true);
			finishGame();
		}
	}, [finishGame, isEnded, isFinished]);

	return { board, isLoading, isStarted, isEnded, onClickStart, onClickReplay, onClickPath };
};
