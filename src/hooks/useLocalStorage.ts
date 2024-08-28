import { useCallback } from "react";
import { LOCAL_STORAGE_KEY } from "../constants";
import { LocalStorage } from "../type";
import { JsonUtils } from "../utils";

interface ILocalStorageExports {
	setBestScore: (score: number) => void;
	getBestScore: () => number;
}

export const useLocalStorage = (): ILocalStorageExports => {
	const setLocalStorageValue = useCallback((localStorageValue: LocalStorage): void => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JsonUtils.toString(localStorageValue));
	}, []);

	const getLocalStrorageValue = useCallback((): LocalStorage | undefined => {
		const localStorageValue: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (localStorageValue === null) {
			return undefined;
		} else {
			return JsonUtils.toObject(localStorageValue);
		}
	}, []);

	const setBestScore = (score: number): void => {
		const localStorageValue: LocalStorage | undefined = getLocalStrorageValue();
		if (localStorageValue === undefined) {
			setLocalStorageValue({ bestScore: score });
		} else {
			if (score > localStorageValue.bestScore) {
				setLocalStorageValue({ bestScore: score });
			}
		}
	};

	const getBestScore = (): number => {
		const localStorageValue: LocalStorage | undefined = getLocalStrorageValue();
		return localStorageValue === undefined ? 0 : localStorageValue.bestScore;
	};

	return { setBestScore, getBestScore };
};
