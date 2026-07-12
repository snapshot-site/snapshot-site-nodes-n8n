import { SnapshotSiteApi } from '../../../credentials/SnapshotSiteApi.credentials';

describe('SnapshotSiteApi credentials', () => {
	const credential = new SnapshotSiteApi();

	it('identifies itself with the expected name and display name', () => {
		expect(credential.name).toBe('snapshotSiteApi');
		expect(credential.displayName).toBe('Snapshot Site API');
	});

	it('marks the API key field as a password so it is masked and encrypted', () => {
		const apiKeyField = credential.properties.find((property) => property.name === 'apiKey');

		expect(apiKeyField).toBeDefined();
		expect(apiKeyField?.type).toBe('string');
		expect(apiKeyField?.typeOptions?.password).toBe(true);
		expect(apiKeyField?.required).toBe(true);
	});

	it('defaults the base URL to the production API and lets it be overridden', () => {
		const baseUrlField = credential.properties.find((property) => property.name === 'baseUrl');

		expect(baseUrlField?.default).toBe('https://api.prod.ss.snapshot-site.com');
		expect(baseUrlField?.required).toBe(true);
	});

	it('authenticates by sending the API key in the X-SnapshotSiteAPI-Key header', () => {
		expect(credential.authenticate).toEqual({
			type: 'generic',
			properties: {
				headers: {
					'X-SnapshotSiteAPI-Key': '={{$credentials.apiKey}}',
				},
			},
		});
	});

	it('defines an icon for both themes', () => {
		expect(credential.icon).toEqual({
			light: 'file:../icons/snapshotSite.svg',
			dark: 'file:../icons/snapshotSite.dark.svg',
		});
	});

	it('delegates credential testing to the node instead of a declarative test block, since the API exposes no side-effect-free endpoint', () => {
		expect((credential as unknown as { test?: unknown }).test).toBeUndefined();
	});
});
