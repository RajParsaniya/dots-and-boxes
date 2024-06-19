import { UseToastOptions } from "@chakra-ui/react";
import { LOSE_TOAST_LABEL, NOT_STARTED_TOAST_LABEL, TIE_TOAST_LABEL, WON_TOAST_LABEL } from "../constants";

interface IToastOptionsExports {
	notStartedToastOptions: UseToastOptions;
	loseToastOptions: UseToastOptions;
	wonToastOptions: UseToastOptions;
	tieToastOptions: UseToastOptions;
}

export const useToastOptions = (): IToastOptionsExports => {
	const notStartedToastOptions: UseToastOptions = {
		id: "not-started",
		title: NOT_STARTED_TOAST_LABEL,
		isClosable: true,
		position: "top-right",
		status: "warning",
		duration: 2500,
	};

	const loseToastOptions: UseToastOptions = {
		id: "lose",
		title: LOSE_TOAST_LABEL,
		isClosable: true,
		position: "top-right",
		status: "error",
		duration: null,
	};

	const wonToastOptions: UseToastOptions = {
		id: "won",
		title: WON_TOAST_LABEL,
		isClosable: true,
		position: "top-right",
		status: "success",
		duration: null,
	};

	const tieToastOptions: UseToastOptions = {
		id: "tie",
		title: TIE_TOAST_LABEL,
		isClosable: true,
		position: "top-right",
		status: "warning",
		duration: null,
	};

	return { notStartedToastOptions, loseToastOptions, wonToastOptions, tieToastOptions };
};
