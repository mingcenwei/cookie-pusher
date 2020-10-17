export type {ClientConfig} from "./client";
export {Client, Cookie} from "./client";
export {parseRawHeadersIntoObject} from "./utilities";
export {AxiosError} from "./exceptions";

import {Client, Cookie} from "./client";
import {parseRawHeadersIntoObject} from "./utilities";
import {AxiosError} from "./exceptions";

export default {Client, Cookie, parseRawHeadersIntoObject, AxiosError};
