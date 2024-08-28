import { IBox, IBoxDot, IBoxPath, IBoxValue, IBoxValuePath, IDot, ILocalStorage, IMove, IPath } from "../interfaces";

export type BoxId = number;
export type BoxDotId = number;
export type BoxPathId = number;
export type BoxValueId = number;

export type Box = IBox;
export type BoxValue = IBoxValue;
export type Move = IMove;
export type Dot<T> = IDot<T>;
export type Path<T> = IPath<T>;
export type LocalStorage = ILocalStorage;

export type BoxDot = Dot<IBoxDot>;
export type BoxPath = Path<IBoxPath>;
export type BoxValuePath = Path<IBoxValuePath>;

export type Board = Array<Array<Box>>;
export type BoardValue = Array<Array<BoxValue>>;
