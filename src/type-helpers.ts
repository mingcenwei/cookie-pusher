import type neverThrow from "neverthrow";

export type PromiseValueType<P> = P extends Promise<infer T> ? T : never;
export type OkValueType<R> = R extends neverThrow.Result<infer T1, unknown>
	? T1
	: R extends neverThrow.ResultAsync<infer T2, unknown>
	? T2
	: never;
export type ErrValueType<R> = R extends neverThrow.Result<unknown, infer E1>
	? E1
	: R extends neverThrow.ResultAsync<unknown, infer E2>
	? E2
	: never;
export type WithNewOkValueType<R, T> = R extends neverThrow.Result<
	unknown,
	infer E1
>
	? neverThrow.Result<T, E1>
	: R extends neverThrow.ResultAsync<unknown, infer E2>
	? neverThrow.ResultAsync<T, E2>
	: never;
export type WithNewErrValueType<R, E> = R extends neverThrow.Result<
	infer T1,
	unknown
>
	? neverThrow.Result<T1, E>
	: R extends neverThrow.ResultAsync<infer T2, unknown>
	? neverThrow.ResultAsync<T2, E>
	: never;
export type ResultAsyncFromResult<R> = R extends neverThrow.Result<
	infer T,
	infer E
>
	? neverThrow.ResultAsync<T, E>
	: never;
export type ResultFromResultAsync<R> = R extends neverThrow.ResultAsync<
	infer T,
	infer E
>
	? neverThrow.Result<T, E>
	: never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const assertTypeExtends = <T>() => <U extends T>(_value: U): undefined =>
	undefined;

export default {assertTypeExtends};
