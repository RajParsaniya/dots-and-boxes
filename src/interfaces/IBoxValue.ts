import { BoxId, BoxPathId, BoxValueId, BoxValuePath } from "../type";

export interface IBoxValuePathType {
	boxId: BoxId;
	boxPathId: BoxPathId;
	isFilled: boolean;
}

export interface IBoxValue {
	id: BoxValueId;
	path: BoxValuePath;
	isFilled: boolean;
}
