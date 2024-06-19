import { useCallback } from "react";
import { useDefaultValues } from ".";
import { LOCAL_STORAGE_KEY } from "../constants";
import { GameValue } from "../type";
import { JsonUtils } from "../utils";

interface ILocalStorageExports {
	setBestScore: (score: number) => void;
	getBestScore: () => number;
}

export const useLocalStorage = (): ILocalStorageExports => {
	const { defaultGameValue } = useDefaultValues();

	const setLocalStorageValue = useCallback((localStorageValue: GameValue) => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JsonUtils.toString(localStorageValue));
	}, []);

	const getLocalStrorageValue = useCallback((): GameValue => {
		const localStorageValue: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (localStorageValue === null) {
			setLocalStorageValue(defaultGameValue);
			return defaultGameValue;
		} else {
			return JsonUtils.toObject(localStorageValue);
		}
	}, [defaultGameValue, setLocalStorageValue]);

	const setBestScore = (score: number): void => {
		const localStorageValue: GameValue = getLocalStrorageValue();
		if (score > localStorageValue.bestScore) {
			localStorageValue.bestScore = score;
			setLocalStorageValue(localStorageValue);
		}
	};

	const getBestScore = (): number => {
		const localStorageValue: GameValue = getLocalStrorageValue();
		return localStorageValue.bestScore;
	};

	return { setBestScore, getBestScore };
};
