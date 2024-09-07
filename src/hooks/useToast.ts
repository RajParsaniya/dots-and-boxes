import { CreateToastFnReturn, ToastId, UseToastOptions, useToast as useChakraToast } from "@chakra-ui/react";

interface IToastExports {
	isActiveToast: (id: ToastId) => boolean;
	closeToast: (id: ToastId) => void;
	closeAllToast: () => void;
	toast: (toastOptions: UseToastOptions) => void;
}

export const useToast = (): IToastExports => {
	const customToast: CreateToastFnReturn = useChakraToast();

	const isActiveToast = (id: ToastId): boolean => {
		return customToast.isActive(id);
	};

	const closeToast = (id: ToastId): void => {
		customToast.close(id);
	};

	const closeAllToast = (): void => {
		customToast.closeAll();
	};

	const toast = (toastOptions: UseToastOptions): void => {
		if (toastOptions.id !== undefined && !isActiveToast(toastOptions.id)) {
			customToast(toastOptions);
		}
	};

	return { isActiveToast, closeToast, closeAllToast, toast };
};
