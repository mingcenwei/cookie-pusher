import type neverthrow from "neverthrow";

export type PromiseValueType<P> = P extends Promise<infer T> ? T : never;
export type OkValueType<R> = R extends neverthrow.Result<infer T1, unknown>
	? T1
	: R extends neverthrow.ResultAsync<infer T2, unknown>
	? T2
	: never;
export type ErrValueType<R> = R extends neverthrow.Result<unknown, infer E1>
	? E1
	: R extends neverthrow.ResultAsync<unknown, infer E2>
	? E2
	: never;
export type WithNewOkValueType<R, T> = R extends neverthrow.Result<
	unknown,
	infer E1
>
	? neverthrow.Result<T, E1>
	: R extends neverthrow.ResultAsync<unknown, infer E2>
	? neverthrow.ResultAsync<T, E2>
	: never;
export type WithNewErrValueType<R, E> = R extends neverthrow.Result<
	infer T1,
	unknown
>
	? neverthrow.Result<T1, E>
	: R extends neverthrow.ResultAsync<infer T2, unknown>
	? neverthrow.ResultAsync<T2, E>
	: never;
export type ResultAsyncFromResult<R> = R extends neverthrow.Result<
	infer T,
	infer E
>
	? neverthrow.ResultAsync<T, E>
	: never;
export type ResultFromResultAsync<R> = R extends neverthrow.ResultAsync<
	infer T,
	infer E
>
	? neverthrow.Result<T, E>
	: never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const assertTypeExtends = <T>() => <U extends T>(_value: U): undefined =>
	undefined;

export default {assertTypeExtends};
