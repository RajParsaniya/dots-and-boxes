import { useMemo } from "react";
import { useCore } from ".";
import { EPlayer } from "../enums";
import { Board, Box, BoxId, BoxPathId } from "../type";
import { StringUtils } from "../utils";

interface IGameProps {
	board: Board;
	onClickPath: (boxId: BoxId, pathId: BoxPathId) => void;
}

interface IGameExports {
	calculatedHeight: string;
	calculatedWidth: string;
	onClickTopStartToTopEnd: (box: Box) => void;
	onClickTopEndToBottomEnd: (box: Box) => void;
	onClickBottomEndToBottomStart: (box: Box) => void;
	onClickBottomStartToTopStart: (box: Box) => void;
	getClassTopStartToTopEnd: (box: Box) => string;
	getClassTopEndToBottomEnd: (box: Box) => string;
	getClassBottomEndToBottomStart: (box: Box) => string;
	getClassBottomStartToTopStart: (box: Box) => string;
	getClassSvg: (box: Box) => string;
}

export const useGame = (props: IGameProps): IGameExports => {
	const { calculateDimensions, getClassName } = useCore();

	const calculatedHeight = useMemo((): string => {
		const height: number = calculateDimensions(props.board).calculatedHeight;
		return StringUtils.replace("{0}%", height.toString());
	}, [calculateDimensions, props]);

	const calculatedWidth = useMemo((): string => {
		const width: number = calculateDimensions(props.board).calculatedWidth;
		return StringUtils.replace("{0}%", width.toString());
	}, [calculateDimensions, props]);

	const onClickTopStartToTopEnd = (box: Box): void => {
		if (box.path.topStartToTopEnd.filledBy === undefined) {
			props.onClickPath(box.id, box.path.topStartToTopEnd.id);
		}
	};

	const onClickTopEndToBottomEnd = (box: Box): void => {
		if (box.path.topEndToBottomEnd.filledBy === undefined) {
			props.onClickPath(box.id, box.path.topEndToBottomEnd.id);
		}
	};

	const onClickBottomEndToBottomStart = (box: Box): void => {
		if (box.path.bottomEndToBottomStart.filledBy === undefined) {
			props.onClickPath(box.id, box.path.bottomEndToBottomStart.id);
		}
	};

	const onClickBottomStartToTopStart = (box: Box): void => {
		if (box.path.bottomStartToTopStart.filledBy === undefined) {
			props.onClickPath(box.id, box.path.bottomStartToTopStart.id);
		}
	};

	const getClassTopStartToTopEnd = (box: Box): string => {
		const classes: Array<string> = ["line"];
		if (box.path.topStartToTopEnd.filledBy === EPlayer.ME) {
			classes.push("line-player-me");
		} else if (box.path.topStartToTopEnd.filledBy === EPlayer.YOU) {
			classes.push("line-player-you");
		}
		return getClassName(classes);
	};

	const getClassTopEndToBottomEnd = (box: Box): string => {
		const classes: Array<string> = ["line"];
		if (box.path.topEndToBottomEnd.filledBy === EPlayer.ME) {
			classes.push("line-player-me");
		} else if (box.path.topEndToBottomEnd.filledBy === EPlayer.YOU) {
			classes.push("line-player-you");
		}
		return getClassName(classes);
	};

	const getClassBottomEndToBottomStart = (box: Box): string => {
		const classes: Array<string> = ["line"];
		if (box.path.bottomEndToBottomStart.filledBy === EPlayer.ME) {
			classes.push("line-player-me");
		} else if (box.path.bottomEndToBottomStart.filledBy === EPlayer.YOU) {
			classes.push("line-player-you");
		}
		return getClassName(classes);
	};

	const getClassBottomStartToTopStart = (box: Box): string => {
		const classes: Array<string> = ["line"];
		if (box.path.bottomStartToTopStart.filledBy === EPlayer.ME) {
			classes.push("line-player-me");
		} else if (box.path.bottomStartToTopStart.filledBy === EPlayer.YOU) {
			classes.push("line-player-you");
		}
		return getClassName(classes);
	};

	const getClassSvg = (box: Box): string => {
		const classes: Array<string> = ["svg"];
		if (box.filledBy === EPlayer.ME) {
			classes.push("svg-player-me");
		} else if (box.filledBy === EPlayer.YOU) {
			classes.push("svg-player-you");
		}
		return getClassName(classes);
	};

	return {
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
	};
};
