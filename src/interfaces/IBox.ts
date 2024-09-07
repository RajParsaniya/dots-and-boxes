import { EPlayer } from "../enums";
import { BoxDot, BoxDotId, BoxId, BoxPath, BoxPathId } from "../type";

export interface IBoxPath {
	id: BoxPathId;
	isVisible: boolean;
	filledBy?: EPlayer;
}

export interface IBoxDot {
	id: BoxDotId;
	isVisible: boolean;
}

export interface IBox {
	id: BoxId;
	path: BoxPath;
	dot: BoxDot;
	filledBy?: EPlayer;
}
