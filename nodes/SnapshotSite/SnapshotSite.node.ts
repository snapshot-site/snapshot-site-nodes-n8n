import { NodeConnectionTypes, type Icon, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { analyzeDescription } from './descriptions/analyze.description';
import { compareDescription } from './descriptions/compare.description';
import { screenshotDescription } from './descriptions/screenshot.description';
import { buildComparePreSend } from './shared/compareRequest';
import { testSnapshotSiteApiCredential } from './shared/credentialTest';

export class SnapshotSite implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Snapshot Site',
		name: 'snapshotSite',
		icon: { light: 'file:../../icons/snapshotSite.svg', dark: 'file:../../icons/snapshotSite.dark.svg' } as Icon,
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Capture website screenshots, run AI page analysis, and compare pages visually with Snapshot Site',
		defaults: {
			name: 'Snapshot Site',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'snapshotSiteApi',
				required: true,
				testedBy: 'snapshotSiteApiTest',
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Analyze',
						value: 'analyze',
						action: 'Run AI analysis on a page',
						description: 'Capture a page and run AI-powered content, quality, and SEO analysis on it',
						routing: {
							request: {
								method: 'POST',
								url: '/api/v3/analyze',
							},
						},
					},
					{
						name: 'Compare',
						value: 'compare',
						action: 'Visually compare two pages',
						description: 'Capture two pages (or an existing image) and return a visual diff',
						routing: {
							request: {
								method: 'POST',
								url: '/api/v3/compare',
							},
							send: {
								preSend: [buildComparePreSend],
							},
						},
					},
					{
						name: 'Screenshot',
						value: 'screenshot',
						action: 'Capture a screenshot of a page',
						description: 'Capture a screenshot of a webpage',
						routing: {
							request: {
								method: 'POST',
								url: '/api/v2/screenshot',
							},
						},
					},
				],
				default: 'screenshot',
			},
			...screenshotDescription,
			...analyzeDescription,
			...compareDescription,
		],
	};

	methods = {
		credentialTest: {
			snapshotSiteApiTest: testSnapshotSiteApiCredential,
		},
	};
}
