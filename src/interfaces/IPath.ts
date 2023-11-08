export interface IPath<T> {
	topStartToTopEnd: T;
	topEndToBottomEnd: T;
	bottomEndToBottomStart: T;
	bottomStartToTopStart: T;
}
