export interface UiTexts {
	readonly [path: string]: {
		readonly [identifier: string]: string;
	};
}
const uiTexts = {
	"/client": {
		axiosRequestError: `Request connection error`,
	}
} as const;
const assertSchemaCompliance: UiTexts = uiTexts;
assertSchemaCompliance;

export default uiTexts;
