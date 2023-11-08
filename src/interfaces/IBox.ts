import { BoxDot, BoxDotId, BoxId, BoxPath, BoxPathId, Player } from "../type";

export interface IBoxPathType {
	id: BoxPathId;
	isVisible: boolean;
	filledBy: Player | null;
}

export interface IBoxDotType {
	id: BoxDotId;
	isVisible: boolean;
}

export interface IBox {
	id: BoxId;
	path: BoxPath;
	dot: BoxDot;
	filledBy: Player | null;
}
