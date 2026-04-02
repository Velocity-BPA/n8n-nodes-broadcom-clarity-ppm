import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BroadcomClarityPPMApi implements ICredentialType {
	name = 'broadcomClarityPPMApi';
	displayName = 'Broadcom Clarity PPM API';
	documentationUrl = 'https://docs.velocity-bpa.com/integrations/broadcom-clarity-ppm';
	properties: INodeProperties[] = [
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://clarity.company.com/ppm/rest/v1',
			required: true,
			description: 'The base URL for your Broadcom Clarity PPM instance',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
			description: 'Username for Clarity PPM with API access permissions',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Password for the Clarity PPM user account',
		},
	];
}