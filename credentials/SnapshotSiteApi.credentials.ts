import type { IAuthenticateGeneric, ICredentialType, Icon, INodeProperties } from 'n8n-workflow';

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
}
