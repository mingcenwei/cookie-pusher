export interface Headers {
	[headerName: string]: string;
}
export const parseRawHeadersIntoObject = (rawHeaders: string): Headers =>
	rawHeaders
		.split(`\n`)
		.filter((line) => !/^(?:\s*$|[A-Z]+\ )/.test(line))
		.map((line) => {
			const colonIndex = line.indexOf(`:`);
			const key = line.substring(0, colonIndex).trim();
			const value = line.substring(colonIndex + 1).trim();
			return {key, value};
		})
		.reduce(
			(headers, header) => ({...headers, [header.key]: header.value}),
			{},
		);

export const changeErrorMessage = <E extends Error>(
	error: E,
	message: string,
): E => {
	error.message = message;
	return error;
};

export default {parseRawHeadersIntoObject, changeErrorMessage};
