import type { ICredentialsDecrypted, ICredentialTestFunctions } from 'n8n-workflow';
import { testSnapshotSiteApiCredential } from '../../../../nodes/SnapshotSite/shared/credentialTest';

function mockContext(requestImpl: (options: unknown) => Promise<unknown>): ICredentialTestFunctions {
	return {
		helpers: { request: requestImpl },
	} as unknown as ICredentialTestFunctions;
}

const credential: ICredentialsDecrypted = {
	id: '1',
	name: 'snapshotSiteApi',
	type: 'snapshotSiteApi',
	data: { apiKey: 'ss_live_xxx', baseUrl: 'https://api.prod.ss.snapshot-site.com' },
};

describe('testSnapshotSiteApiCredential', () => {
	it('reports an error when the key is rejected with 401', async () => {
		const context = mockContext(() => Promise.reject(Object.assign(new Error('Unauthorized'), { statusCode: 401 })));

		const result = await testSnapshotSiteApiCredential.call(context, credential);

		expect(result).toEqual({ status: 'Error', message: 'Invalid API key' });
	});

	it('reports success when the key is accepted but the deliberately invalid body is rejected', async () => {
		const context = mockContext(() =>
			Promise.reject(Object.assign(new Error('Bad Request'), { statusCode: 400 })),
		);

		const result = await testSnapshotSiteApiCredential.call(context, credential);

		expect(result.status).toBe('OK');
	});

	it('reports success on an unexpected 2xx response too', async () => {
		const context = mockContext(() => Promise.resolve({ status: 'success' }));

		const result = await testSnapshotSiteApiCredential.call(context, credential);

		expect(result.status).toBe('OK');
	});
});
