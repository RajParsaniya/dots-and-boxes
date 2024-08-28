import { useCallback, useEffect, useMemo, useState } from "react";
import { useCore, useDefaultValues, useLocalStorage, useToast, useToastOptions } from ".";
import { EPlayer } from "../enums";
import { Board, BoardValue, BoxId, BoxPathId, Move } from "../type";

interface IAppExports {
	board: Board;
	reload: boolean;
	isLoading: boolean;
	isStarted: boolean;
	isEnded: boolean;
	onClickStart: () => void;
	onClickReplay: () => void;
	onClickPath: (boxId: BoxId, pathId: BoxPathId) => void;
}

export const useApp = (): IAppExports => {
	const { defaultBoard, defaultBoardValue } = useDefaultValues();

	const [board, setBoard] = useState<Board>(defaultBoard());
	const [boardValue, setBoardValue] = useState<BoardValue>(defaultBoardValue());

	const [reload, setReload] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [isFreezed, setIsFreezed] = useState<boolean>(false);
	const [isEnded, setIsEnded] = useState<boolean>(false);

	const { toast, closeAll } = useToast();
	const { setBestScore } = useLocalStorage();
	const { isAllBoxesFilled, getScore, getMove, updateBoard } = useCore();
	const { getNotStartedToastOptions, getLoseToastOptions, getWonToastOptions, getTieToastOptions } = useToastOptions();

	const isFinished = useMemo((): boolean => {
		if (boardValue === undefined) {
			return false;
		} else {
			return isAllBoxesFilled(boardValue);
		}
	}, [boardValue, isAllBoxesFilled]);

	const onResetGame = useCallback((): void => {
		setBoard(defaultBoard());
		setBoardValue(defaultBoardValue());
	}, [defaultBoard, defaultBoardValue]);

	const onFinishGame = useCallback((): void => {
		if (board !== undefined) {
			const mineScore = getScore(board, EPlayer.ME);
			const yourScore = getScore(board, EPlayer.YOU);

			if (mineScore > yourScore) {
				toast(getLoseToastOptions);
			} else if (yourScore > mineScore) {
				toast(getWonToastOptions);
			} else {
				toast(getTieToastOptions);
			}
		}
	}, [board, getLoseToastOptions, getScore, getTieToastOptions, getWonToastOptions, toast]);

	const onUpdateGame = useCallback(
		(boxId: BoxId, pathId: BoxPathId, player: EPlayer): void => {
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

	const onUpdateBestScore = useCallback((): void => {
		if (board !== undefined) {
			setBestScore(getScore(board, EPlayer.YOU));
		}
	}, [board, getScore, setBestScore]);

	const onClickStart = (): void => {
		setIsLoading(true);
		setTimeout((): void => {
			setIsLoading(false);
			setIsStarted(true);
		}, 300);
	};

	const onClickReplay = (): void => {
		setIsStarted(false);
		setIsEnded(false);
		setReload(true);
		onResetGame();
		closeAll();
	};

	const onClickPath = (boxId: BoxId, pathId: BoxPathId): void => {
		if (!isStarted) {
			toast(getNotStartedToastOptions);
		} else if (!isFreezed) {
			onUpdateGame(boxId, pathId, EPlayer.YOU);
			onUpdateBestScore();
		}
	};

	useEffect((): void => {
		if (reload) {
			setTimeout((): void => {
				setReload(false);
			}, 500);
		}
	}, [reload]);

	useEffect((): void => {
		if (boardValue !== undefined && isFreezed && isStarted && !isFinished) {
			setTimeout((): void => {
				const move: Move = getMove(boardValue);
				onUpdateGame(move.boxId, move.boxPathId, EPlayer.ME);
			}, 300);
		}
	}, [boardValue, getMove, isFinished, isFreezed, isStarted, onUpdateGame]);

	useEffect((): void => {
		if (isFinished && !isEnded) {
			setIsEnded(true);
			onFinishGame();
		}
	}, [onFinishGame, isEnded, isFinished]);

	return { board, reload, isLoading, isStarted, isEnded, onClickStart, onClickReplay, onClickPath };
};
