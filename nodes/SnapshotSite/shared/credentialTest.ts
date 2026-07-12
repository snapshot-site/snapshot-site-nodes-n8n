import type {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	INodeCredentialTestResult,
} from 'n8n-workflow';

/**
 * Snapshot Site has no free/side-effect-free endpoint to validate an API key
 * against (every authenticated route is billed). Instead this sends a
 * deliberately invalid body (no `url`) to the screenshot endpoint: auth is
 * checked before body validation, so an invalid key still fails with 401
 * before anything is rendered, while a valid key reaches (and fails) body
 * validation instead — which is enough to tell the two cases apart without
 * ever actually capturing a page.
 */
export async function testSnapshotSiteApiCredential(
	this: ICredentialTestFunctions,
	credential: ICredentialsDecrypted,
): Promise<INodeCredentialTestResult> {
	const data = credential.data as { apiKey?: string; baseUrl?: string };
	const baseUrl = (data.baseUrl || 'https://api.prod.ss.snapshot-site.com').replace(/\/+$/, '');

	try {
		// ICredentialTestFunctions only exposes the deprecated `request` helper
		// (no `httpRequest`) — there is no non-deprecated alternative here.
		// eslint-disable-next-line @n8n/community-nodes/no-deprecated-workflow-functions
		await this.helpers.request({
			method: 'POST',
			uri: `${baseUrl}/api/v2/screenshot`,
			headers: {
				'X-SnapshotSiteAPI-Key': data.apiKey,
				'content-type': 'application/json',
			},
			body: {},
			json: true,
		});

		return { status: 'OK', message: 'Connection successful' };
	} catch (error) {
		const statusCode = (error as { statusCode?: number }).statusCode;

		if (statusCode === 401 || statusCode === 403) {
			return { status: 'Error', message: 'Invalid API key' };
		}

		return { status: 'OK', message: 'Connection successful' };
	}
}
