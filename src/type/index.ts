import { IBox, IBoxDotType, IBoxPathType, IBoxValue, IBoxValuePathType, IDot, IGameValue, IMove, IPath } from "../interfaces";

export type Player = "ME" | "YOU";

export type BoxId = number;
export type BoxPathId = number;
export type BoxDotId = number;
export type BoxValueId = number;

export type BoxPath = IPath<IBoxPathType>;
export type BoxDot = IDot<IBoxDotType>;
export type BoxValuePath = IPath<IBoxValuePathType>;

export type Box = IBox;
export type BoxValue = IBoxValue;
export type GameValue = IGameValue;
export type Move = IMove;

export type Board = Array<Array<Box>>;
export type BoardValue = Array<Array<BoxValue>>;
