import { useCallback } from "react";
import { useDefaultValues } from ".";
import { LOCAL_STORAGE_KEY } from "../constants";
import { IGameValue } from "../interfaces";
import { JsonUtils } from "../utils";

interface ILocalStorageExports {
	setBestScore: (score: number) => void;
	getBestScore: () => number;
}

export const useLocalStorage = (): ILocalStorageExports => {
	const { defaultGameValue } = useDefaultValues();

	const setLocalStorageValue = useCallback((localStorageValue: IGameValue) => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JsonUtils.toString(localStorageValue));
	}, []);

	const getLocalStrorageValue = useCallback((): IGameValue => {
		const localStorageValue: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (localStorageValue === null) {
			setLocalStorageValue(defaultGameValue);
			return defaultGameValue;
		} else {
			return JsonUtils.toObject(localStorageValue);
		}
	}, [defaultGameValue, setLocalStorageValue]);

	const setBestScore = (score: number): void => {
		const localStorageValue: IGameValue = getLocalStrorageValue();
		if (score > localStorageValue.bestScore) {
			localStorageValue.bestScore = score;
			setLocalStorageValue(localStorageValue);
		}
	};

	const getBestScore = (): number => {
		const localStorageValue: IGameValue = getLocalStrorageValue();
		return localStorageValue.bestScore;
	};

	return { setBestScore, getBestScore };
};
