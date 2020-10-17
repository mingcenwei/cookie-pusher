import type {
	AxiosError as AxiosError_,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";

export class AxiosError extends Error implements AxiosError_ {
	public readonly name: string = `AxiosError`;
	public readonly originalMessage: string;

	public config: AxiosRequestConfig;
	public code?: string;
	public request?: unknown;
	public response?: AxiosResponse<unknown>;
	public isAxiosError: boolean;
	// eslint-disable-next-line @typescript-eslint/ban-types
	public toJSON: () => object;

	public constructor(message: string, error: AxiosError_) {
		super(message);
		this.originalMessage = error.message;
		this.config = error.config;
		this.code = error.code;
		this.request = error.request;
		this.isAxiosError = error.isAxiosError;
		this.toJSON = error.toJSON;
	}
}

export default {AxiosError};
