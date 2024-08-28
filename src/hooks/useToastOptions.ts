import { UseToastOptions } from "@chakra-ui/react";
import { LOSE_TOAST, NOT_STARTED_TOAST, TIE_TOAST, WON_TOAST } from "../constants";

interface IToastOptionsExports {
	getNotStartedToastOptions: UseToastOptions;
	getLoseToastOptions: UseToastOptions;
	getWonToastOptions: UseToastOptions;
	getTieToastOptions: UseToastOptions;
}

export const useToastOptions = (): IToastOptionsExports => {
	const getNotStartedToastOptions: UseToastOptions = {
		id: "not-started",
		title: NOT_STARTED_TOAST,
		isClosable: true,
		position: "top-right",
		status: "warning",
		duration: 2500,
	};

	const getLoseToastOptions: UseToastOptions = {
		id: "lose",
		title: LOSE_TOAST,
		isClosable: true,
		position: "top-right",
		status: "error",
		duration: null,
	};

	const getWonToastOptions: UseToastOptions = {
		id: "won",
		title: WON_TOAST,
		isClosable: true,
		position: "top-right",
		status: "success",
		duration: null,
	};

	const getTieToastOptions: UseToastOptions = {
		id: "tie",
		title: TIE_TOAST,
		isClosable: true,
		position: "top-right",
		status: "warning",
		duration: null,
	};

	return { getNotStartedToastOptions, getLoseToastOptions, getWonToastOptions, getTieToastOptions };
};
