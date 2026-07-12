import type { INodePropertyOptions } from 'n8n-workflow';
import { SnapshotSite } from '../../../../nodes/SnapshotSite/SnapshotSite.node';

describe('SnapshotSite node', () => {
	const node = new SnapshotSite();
	const { description } = node;

	it('identifies itself with the expected display name and name', () => {
		expect(description.displayName).toBe('Snapshot Site');
		expect(description.name).toBe('snapshotSite');
		expect(description.usableAsTool).toBe(true);
	});

	it('requires the snapshotSiteApi credential and wires up its test method', () => {
		expect(description.credentials).toEqual([
			{ name: 'snapshotSiteApi', required: true, testedBy: 'snapshotSiteApiTest' },
		]);
		expect(node.methods?.credentialTest?.snapshotSiteApiTest).toBeInstanceOf(Function);
	});

	it('resolves the base URL from the credential', () => {
		expect(description.requestDefaults?.baseURL).toBe('={{$credentials.baseUrl}}');
	});

	function getOperationOptions(): INodePropertyOptions[] {
		const operationProperty = description.properties.find((property) => property.name === 'operation');
		return (operationProperty?.options ?? []) as INodePropertyOptions[];
	}

	it('exposes exactly the analyze, compare, and screenshot operations', () => {
		const values = getOperationOptions().map((option) => option.value);
		expect(values).toEqual(['analyze', 'compare', 'screenshot']);
	});

	it('defaults to the screenshot operation', () => {
		const operationProperty = description.properties.find((property) => property.name === 'operation');
		expect(operationProperty?.default).toBe('screenshot');
	});

	it.each([
		['screenshot', '/api/v2/screenshot'],
		['analyze', '/api/v3/analyze'],
		['compare', '/api/v3/compare'],
	])('routes the %s operation to POST %s', (value, url) => {
		const option = getOperationOptions().find((candidate) => candidate.value === value);

		expect(option?.routing?.request).toEqual({ method: 'POST', url });
	});

	it('assembles the compare request body with a custom preSend instead of per-field routing', () => {
		const option = getOperationOptions().find((candidate) => candidate.value === 'compare');

		expect(option?.routing?.send?.preSend).toHaveLength(1);
	});

	it('maps the screenshot URL field straight onto the request body', () => {
		const urlField = description.properties.find(
			(property) => property.name === 'url' && property.displayOptions?.show?.operation?.includes('screenshot'),
		);

		expect(urlField?.routing?.send).toEqual({ type: 'body', property: 'url' });
	});
});
