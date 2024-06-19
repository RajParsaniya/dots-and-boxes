import { CreateToastFnReturn, ToastId, UseToastOptions, useToast as useChakraToast } from "@chakra-ui/react";

interface IToastExports {
	isActive: (id: ToastId) => boolean;
	close: (id: ToastId) => void;
	closeAll: () => void;
	toast: (toastOptions: UseToastOptions) => void;
}

export const useToast = (): IToastExports => {
	const customToast: CreateToastFnReturn = useChakraToast();

	const isActive = (id: ToastId): boolean => {
		return customToast.isActive(id);
	};

	const close = (id: ToastId): void => {
		customToast.close(id);
	};

	const closeAll = (): void => {
		customToast.closeAll();
	};

	const toast = (toastOptions: UseToastOptions): void => {
		if (toastOptions.id !== undefined && isActive(toastOptions.id)) {
			close(toastOptions.id);
		}
		setTimeout(() => {
			customToast(toastOptions);
		}, 10);
	};

	return { isActive, close, closeAll, toast };
};
