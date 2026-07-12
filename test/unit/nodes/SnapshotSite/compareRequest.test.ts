import type { IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { buildComparePreSend } from '../../../../nodes/SnapshotSite/shared/compareRequest';

function mockContext(parameters: Record<string, unknown>): IExecuteSingleFunctions {
	return {
		getNodeParameter: (name: string, fallback?: unknown) => {
			return name in parameters ? parameters[name] : fallback;
		},
	} as unknown as IExecuteSingleFunctions;
}

describe('buildComparePreSend', () => {
	it('nests the flat before/after parameters into the body the compare API expects', async () => {
		const context = mockContext({
			beforeUrl: 'https://example.com/pricing',
			afterUrl: 'https://staging.example.com/pricing',
			beforeOptions: { width: 1440, fullSize: true },
			afterOptions: { width: 1440, fullSize: true },
			threshold: 0.2,
		});

		const requestOptions = { url: '', method: 'POST' } as IHttpRequestOptions;
		const result = await buildComparePreSend.call(context, requestOptions);

		expect(result.body).toEqual({
			before: { url: 'https://example.com/pricing', width: 1440, fullSize: true },
			after: { url: 'https://staging.example.com/pricing', width: 1440, fullSize: true },
			threshold: 0.2,
		});
	});

	it('omits empty/undefined optional fields instead of sending them as blanks', async () => {
		const context = mockContext({
			beforeUrl: 'https://example.com',
			afterUrl: 'https://example.com/v2',
			beforeOptions: { width: 1024, hide: '', javascriptCode: undefined },
			afterOptions: {},
			threshold: 0.1,
		});

		const requestOptions = { url: '', method: 'POST' } as IHttpRequestOptions;
		const result = await buildComparePreSend.call(context, requestOptions);

		expect(result.body).toEqual({
			before: { url: 'https://example.com', width: 1024 },
			after: { url: 'https://example.com/v2' },
			threshold: 0.1,
		});
	});
});
