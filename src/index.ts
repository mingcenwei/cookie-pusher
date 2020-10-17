export type {ClientConfig, AxiosRequestConfig, AxiosResponse} from "./client";
export {Client, Cookie} from "./client";
export type {Headers} from "./utilities";
export {parseRawHeadersIntoObject} from "./utilities";
export {AxiosError} from "./exceptions";
export type {
	PromiseValueType,
	OkValueType,
	ErrValueType,
	WithNewOkValueType,
	WithNewErrValueType,
	ResultAsyncFromResult,
	ResultFromResultAsync,
} from "./type-helpers";
export {assertTypeExtends} from "./type-helpers";

export {default as neverThrow} from "neverthrow";

import {Client, Cookie} from "./client";
import {parseRawHeadersIntoObject} from "./utilities";
import {AxiosError} from "./exceptions";
import {assertTypeExtends} from "./type-helpers";
import neverThrow from "neverthrow";

export default {
	Client,
	Cookie,
	parseRawHeadersIntoObject,
	assertTypeExtends,
	AxiosError,
	neverThrow
};
