import {AxiosError} from "./exceptions";
import uiTexts_ from "./ui-texts.config";
const uiTexts = uiTexts_[`/client`];
import defaultHttpHeaders from "./default-http-headers.config";
import type {Headers} from "./utilities";

import axios from "axios";
import type {
	AxiosRequestConfig,
	AxiosResponse,
	AxiosError as AxiosError_,
} from "axios";
import toughCookie from "tough-cookie";
import neverthrow from "neverthrow";

export const Cookie = toughCookie.Cookie;

const getDefaultRequestHeaders = (): Headers => {
	const numOfUserAgents =
		defaultHttpHeaders.httpHeaderOptions[`User-Agent`].length;
	const randomIndex1 = Math.floor(Math.random() * numOfUserAgents);
	const numOfAcceptLanguages =
		defaultHttpHeaders.httpHeaderOptions[`Accept-Language`].length;
	const randomIndex2 = Math.floor(Math.random() * numOfAcceptLanguages);
	return {
		"User-Agent":
			defaultHttpHeaders.httpHeaderOptions[`User-Agent`][randomIndex1],
		"Accept-Language":
			defaultHttpHeaders.httpHeaderOptions[`Accept-Language`][
				randomIndex2
			],
		Connection: `keep-alive`,
	};
};
export type ClientConfig = AxiosRequestConfig & {url: string};
export class Client {
	public defaultHeaders: Headers = getDefaultRequestHeaders();
	public lastUrls: URL[] = [];
	public setReferer?: (config: ClientConfig, client: Client) => URL;
	public readonly cookies = new toughCookie.CookieJar();

	public constructor({
		userAgent,
		acceptLanguage,
	}: {userAgent?: string; acceptLanguage?: string} = {}) {
		if (userAgent !== undefined) {
			this.defaultHeaders[`User-Agent`] = userAgent;
		}
		if (acceptLanguage !== undefined) {
			this.defaultHeaders[`Accept-Language`] = acceptLanguage;
		}
	}

	public readonly setLanguage = (
		language: keyof typeof defaultHttpHeaders.languageToAcceptLanguageStringMap,
	): void => {
		this.defaultHeaders[`Accept-Language`] =
			defaultHttpHeaders.languageToAcceptLanguageStringMap[language];
	};

	public readonly access = (
		config: ClientConfig,
	): neverthrow.ResultAsync<AxiosResponse, AxiosError> => {
		const url =
			config.baseURL !== undefined
				? new URL(config.url, config.baseURL)
				: new URL(config.url, this.lastUrls[this.lastUrls.length - 1]);
		this.lastUrls.push(url);

		const unmodifiedCookieString = this.cookies.getCookieStringSync(
			url.href,
		);
		const isUndefinedOrEmpty = (
			cookieString: string | undefined,
		): boolean => cookieString === undefined || cookieString === ``;
		const cookieString: string | undefined = isUndefinedOrEmpty(
			unmodifiedCookieString,
		)
			? isUndefinedOrEmpty(config.headers?.Cookie)
				? undefined
				: config.headers?.Cookie
			: isUndefinedOrEmpty(config.headers?.Cookie)
			? unmodifiedCookieString
			: `${config.headers.Cookie}; ${unmodifiedCookieString}`;
		const cookieHeader =
			cookieString === undefined ? {} : {Cookie: cookieString};
		const refererHeader =
			this.setReferer === undefined
				? {}
				: {Referer: this.setReferer(config, this).href};
		const newConfig = {
			validateStatus: (statusCode: number): boolean =>
				statusCode >= 200 && statusCode < 400,
			maxRedirects: 0,
			...config,
			headers: {
				...this.defaultHeaders,
				...refererHeader,
				...config.headers,
				...cookieHeader,
			},
			url: url.href,
		};
		delete newConfig.baseURL;
		const response: Promise<AxiosResponse> = axios(newConfig);
		return neverthrow.ResultAsync.fromPromise(
			response,
			(error) =>
				new AxiosError(
					uiTexts[`axiosRequestError`],
					error as AxiosError_,
				),
		).andThen((response: AxiosResponse) => {
			const setCookies: string[] | undefined =
				response.headers[`set-cookie`];
			if (Array.isArray(setCookies)) {
				setCookies.forEach((cookie) =>
					this.cookies.setCookieSync(cookie, url.href),
				);
			}
			if (response.status === 301 || response.status === 302) {
				const newUrl: string = response.headers[`location`];
				return this.access({...config, url: newUrl});
			} else {
				return neverthrow.ok(response);
			}
		});
	};
}

export default {Cookie, Client};
