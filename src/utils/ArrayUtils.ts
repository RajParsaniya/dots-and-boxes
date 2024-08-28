import { cloneDeep } from "lodash";

export class ArrayUtils {
	private constructor() {}

	public static create<T>(size: number = 0, defaultValue?: T): Array<T> {
		return new Array(size).fill(defaultValue);
	}

	public static clone<T>(list: Array<T>): Array<T> {
		return cloneDeep(list);
	}

	public static random<T>(list: Array<T>): T {
		return list[Math.floor(Math.random() * list.length)];
	}
}
