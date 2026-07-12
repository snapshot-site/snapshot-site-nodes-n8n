import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class SnapshotSiteApi implements ICredentialType {
	name = 'snapshotSiteApi';

	displayName = 'Snapshot Site API';

	documentationUrl = 'https://snapshot-site.com/api-docs';

	icon: Icon = { light: 'file:../icons/snapshotSite.svg', dark: 'file:../icons/snapshotSite.dark.svg' };

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'API key generated in the Snapshot Site Console (console.snapshot-site.com)',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.prod.ss.snapshot-site.com',
			required: true,
			description: 'Root URL of the Snapshot Site API. Only change this for a self-hosted or staging environment.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-SnapshotSiteAPI-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	// screenshot-api has no free/side-effect-free endpoint, so this fires the
	// smallest possible real screenshot to confirm the key is accepted.
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/v2/screenshot',
			method: 'POST',
			body: {
				url: 'https://example.com',
			},
		},
	};
}
