export class StringUtils {
	private constructor() {}

	public static replace(text: string, ...params: string[]): string {
		let message: string = text;
		params.forEach((param, index) => (message = message.replace(new RegExp(`\\{${index}\\}`, "ig"), param)));
		return message;
	}
}
