import type { IDataObject, IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';

function omitEmpty(source: IDataObject): IDataObject {
	const result: IDataObject = {};
	for (const [key, value] of Object.entries(source)) {
		if (value === undefined || value === null || value === '') continue;
		result[key] = value;
	}
	return result;
}

/**
 * Assembles the nested `{ before, after, threshold }` body expected by
 * POST /api/v3/compare from the flat beforeUrl/beforeOptions/afterUrl/
 * afterOptions/threshold parameters. This is the only hand-written
 * request-building logic in the node — every other operation maps
 * parameters straight to the body via declarative `routing.send`.
 */
export async function buildComparePreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const beforeUrl = this.getNodeParameter('beforeUrl') as string;
	const afterUrl = this.getNodeParameter('afterUrl') as string;
	const beforeOptions = this.getNodeParameter('beforeOptions', {}) as IDataObject;
	const afterOptions = this.getNodeParameter('afterOptions', {}) as IDataObject;
	const threshold = this.getNodeParameter('threshold') as number;

	requestOptions.body = {
		before: omitEmpty({ url: beforeUrl, ...beforeOptions }),
		after: omitEmpty({ url: afterUrl, ...afterOptions }),
		threshold,
	};

	return requestOptions;
}
