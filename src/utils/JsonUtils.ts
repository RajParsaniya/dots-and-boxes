export class JsonUtils {
	private constructor() {}

	public static toString<T>(obj: T): string {
		return JSON.stringify(obj);
	}

	public static toObject<T>(str: string): T {
		return JSON.parse(str) as T;
	}
}
