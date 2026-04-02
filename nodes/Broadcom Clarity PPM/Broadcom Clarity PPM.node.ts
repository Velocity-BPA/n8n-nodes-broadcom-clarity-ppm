/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-broadcomclarityppm/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class BroadcomClarityPPM implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Broadcom Clarity PPM',
    name: 'broadcomclarityppm',
    icon: 'file:broadcomclarityppm.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Broadcom Clarity PPM API',
    defaults: {
      name: 'Broadcom Clarity PPM',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'broadcomclarityppmApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Project',
            value: 'project',
          },
          {
            name: 'Task',
            value: 'task',
          },
          {
            name: 'Resource',
            value: 'resource',
          },
          {
            name: 'Timesheet',
            value: 'timesheet',
          },
          {
            name: 'Investment',
            value: 'investment',
          },
          {
            name: 'Portfolio Item',
            value: 'portfolioItem',
          }
        ],
        default: 'project',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['project'] } },
  options: [
    { name: 'Get All Projects', value: 'getAllProjects', description: 'Retrieve all projects with optional filtering', action: 'Get all projects' },
    { name: 'Get Project', value: 'getProject', description: 'Get specific project details', action: 'Get a project' },
    { name: 'Create Project', value: 'createProject', description: 'Create a new project', action: 'Create a project' },
    { name: 'Update Project', value: 'updateProject', description: 'Update existing project', action: 'Update a project' },
    { name: 'Delete Project', value: 'deleteProject', description: 'Delete a project', action: 'Delete a project' },
    { name: 'Start Project', value: 'startProject', description: 'Start a project', action: 'Start a project' },
    { name: 'Complete Project', value: 'completeProject', description: 'Complete a project', action: 'Complete a project' }
  ],
  default: 'getAllProjects',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['task'] } },
  options: [
    { name: 'Get Project Tasks', value: 'getProjectTasks', description: 'Get all tasks for a project', action: 'Get project tasks' },
    { name: 'Get Task', value: 'getTask', description: 'Get specific task details', action: 'Get task' },
    { name: 'Create Task', value: 'createTask', description: 'Create a new task in project', action: 'Create task' },
    { name: 'Update Task', value: 'updateTask', description: 'Update task details', action: 'Update task' },
    { name: 'Delete Task', value: 'deleteTask', description: 'Delete a task', action: 'Delete task' },
    { name: 'Get All Tasks', value: 'getAllTasks', description: 'Get tasks across all projects', action: 'Get all tasks' }
  ],
  default: 'getProjectTasks',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['resource'],
		},
	},
	options: [
		{
			name: 'Get All Resources',
			value: 'getAllResources',
			description: 'Retrieve all resources',
			action: 'Get all resources',
		},
		{
			name: 'Get Resource',
			value: 'getResource',
			description: 'Get specific resource details',
			action: 'Get a resource',
		},
		{
			name: 'Create Resource',
			value: 'createResource',
			description: 'Create a new resource',
			action: 'Create a resource',
		},
		{
			name: 'Update Resource',
			value: 'updateResource',
			description: 'Update resource information',
			action: 'Update a resource',
		},
		{
			name: 'Delete Resource',
			value: 'deleteResource',
			description: 'Delete a resource',
			action: 'Delete a resource',
		},
		{
			name: 'Get Resource Allocations',
			value: 'getResourceAllocations',
			description: 'Get resource allocations',
			action: 'Get resource allocations',
		},
	],
	default: 'getAllResources',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['timesheet'],
		},
	},
	options: [
		{
			name: 'Get All Timesheets',
			value: 'getAllTimesheets',
			description: 'Get timesheets with filtering',
			action: 'Get all timesheets',
		},
		{
			name: 'Get Timesheet',
			value: 'getTimesheet',
			description: 'Get specific timesheet',
			action: 'Get a timesheet',
		},
		{
			name: 'Create Timesheet',
			value: 'createTimesheet',
			description: 'Create timesheet entry',
			action: 'Create a timesheet',
		},
		{
			name: 'Update Timesheet',
			value: 'updateTimesheet',
			description: 'Update timesheet',
			action: 'Update a timesheet',
		},
		{
			name: 'Delete Timesheet',
			value: 'deleteTimesheet',
			description: 'Delete timesheet entry',
			action: 'Delete a timesheet',
		},
		{
			name: 'Submit Timesheet',
			value: 'submitTimesheet',
			description: 'Submit timesheet for approval',
			action: 'Submit a timesheet',
		},
		{
			name: 'Approve Timesheet',
			value: 'approveTimesheet',
			description: 'Approve timesheet',
			action: 'Approve a timesheet',
		},
	],
	default: 'getAllTimesheets',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['investment'],
		},
	},
	options: [
		{
			name: 'Get All Investments',
			value: 'getAllInvestments',
			description: 'Retrieve all investments from the portfolio',
			action: 'Get all investments',
		},
		{
			name: 'Get Investment',
			value: 'getInvestment',
			description: 'Get details of a specific investment',
			action: 'Get an investment',
		},
		{
			name: 'Create Investment',
			value: 'createInvestment',
			description: 'Create a new investment in the portfolio',
			action: 'Create an investment',
		},
		{
			name: 'Update Investment',
			value: 'updateInvestment',
			description: 'Update details of an existing investment',
			action: 'Update an investment',
		},
		{
			name: 'Delete Investment',
			value: 'deleteInvestment',
			description: 'Delete an investment from the portfolio',
			action: 'Delete an investment',
		},
		{
			name: 'Get Investment Hierarchy',
			value: 'getInvestmentHierarchy',
			description: 'Get the hierarchy structure of an investment',
			action: 'Get investment hierarchy',
		},
	],
	default: 'getAllInvestments',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['portfolioItem'],
		},
	},
	options: [
		{
			name: 'Get Portfolio Items',
			value: 'getPortfolioItems',
			description: 'Get items in a portfolio',
			action: 'Get portfolio items',
		},
		{
			name: 'Get Portfolio Item',
			value: 'getPortfolioItem',
			description: 'Get a specific portfolio item',
			action: 'Get portfolio item',
		},
		{
			name: 'Create Portfolio Item',
			value: 'createPortfolioItem',
			description: 'Create a new portfolio item',
			action: 'Create portfolio item',
		},
		{
			name: 'Update Portfolio Item',
			value: 'updatePortfolioItem',
			description: 'Update an existing portfolio item',
			action: 'Update portfolio item',
		},
		{
			name: 'Delete Portfolio Item',
			value: 'deletePortfolioItem',
			description: 'Delete a portfolio item',
			action: 'Delete portfolio item',
		},
		{
			name: 'Get All Portfolios',
			value: 'getAllPortfolios',
			description: 'Get all portfolios',
			action: 'Get all portfolios',
		},
	],
	default: 'getPortfolioItems',
},
{
  displayName: 'Where Clause',
  name: 'whereClause',
  type: 'string',
  default: '',
  placeholder: 'status = "ACTIVE"',
  description: 'Optional filter condition for projects',
  displayOptions: { show: { resource: ['project'], operation: ['getAllProjects'] } },
},
{
  displayName: 'Order By',
  name: 'orderBy',
  type: 'string',
  default: '',
  placeholder: 'name ASC',
  description: 'Sort order for the results',
  displayOptions: { show: { resource: ['project'], operation: ['getAllProjects'] } },
},
{
  displayName: 'Size',
  name: 'size',
  type: 'number',
  default: 50,
  description: 'Number of records to return',
  displayOptions: { show: { resource: ['project'], operation: ['getAllProjects'] } },
},
{
  displayName: 'Project ID',
  name: 'projectId',
  type: 'string',
  required: true,
  default: '',
  description: 'The ID of the project',
  displayOptions: { show: { resource: ['project'], operation: ['getProject', 'updateProject', 'deleteProject', 'startProject', 'completeProject'] } },
},
{
  displayName: 'Project Data',
  name: 'projectData',
  type: 'json',
  required: true,
  default: '{}',
  description: 'The project data as JSON object',
  displayOptions: { show: { resource: ['project'], operation: ['createProject', 'updateProject'] } },
},
{
  displayName: 'Project ID',
  name: 'projectId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['task'], operation: ['getProjectTasks', 'createTask'] } },
  default: '',
  description: 'The ID of the project to get tasks from or create task in',
},
{
  displayName: 'Task ID',
  name: 'taskId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['task'], operation: ['getTask', 'updateTask', 'deleteTask'] } },
  default: '',
  description: 'The ID of the task',
},
{
  displayName: 'Where Clause',
  name: 'whereClause',
  type: 'string',
  displayOptions: { show: { resource: ['task'], operation: ['getProjectTasks', 'getAllTasks'] } },
  default: '',
  description: 'OQL where clause to filter results',
},
{
  displayName: 'Order By',
  name: 'orderBy',
  type: 'string',
  displayOptions: { show: { resource: ['task'], operation: ['getProjectTasks', 'getAllTasks'] } },
  default: '',
  description: 'Field to order results by',
},
{
  displayName: 'Size',
  name: 'size',
  type: 'number',
  displayOptions: { show: { resource: ['task'], operation: ['getAllTasks'] } },
  default: 100,
  description: 'Maximum number of tasks to return',
},
{
  displayName: 'Task Data',
  name: 'taskData',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['task'], operation: ['createTask', 'updateTask'] } },
  default: '{}',
  description: 'Task data in JSON format',
},
{
	displayName: 'Where Clause',
	name: 'whereClause',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['resource'],
			operation: ['getAllResources'],
		},
	},
	default: '',
	description: 'Filter condition for resources',
},
{
	displayName: 'Order By',
	name: 'orderBy',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['resource'],
			operation: ['getAllResources'],
		},
	},
	default: '',
	description: 'Field to sort results by',
},
{
	displayName: 'Size',
	name: 'size',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['resource'],
			operation: ['getAllResources'],
		},
	},
	default: 50,
	description: 'Maximum number of resources to return',
},
{
	displayName: 'Resource ID',
	name: 'resourceId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['resource'],
			operation: ['getResource', 'updateResource', 'deleteResource', 'getResourceAllocations'],
		},
	},
	default: '',
	description: 'The ID of the resource',
},
{
	displayName: 'Resource Data',
	name: 'resourceData',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['resource'],
			operation: ['createResource', 'updateResource'],
		},
	},
	default: '{}',
	description: 'The resource data as JSON object',
},
{
	displayName: 'Start Date',
	name: 'startDate',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['resource'],
			operation: ['getResourceAllocations'],
		},
	},
	default: '',
	description: 'Start date for allocation period (ISO 8601 format)',
},
{
	displayName: 'End Date',
	name: 'endDate',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['resource'],
			operation: ['getResourceAllocations'],
		},
	},
	default: '',
	description: 'End date for allocation period (ISO 8601 format)',
},
{
	displayName: 'Resource ID',
	name: 'resourceId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['timesheet'],
			operation: ['getAllTimesheets'],
		},
	},
	default: '',
	description: 'Filter timesheets by resource ID',
},
{
	displayName: 'Project ID',
	name: 'projectId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['timesheet'],
			operation: ['getAllTimesheets'],
		},
	},
	default: '',
	description: 'Filter timesheets by project ID',
},
{
	displayName: 'Period Start',
	name: 'periodStart',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['timesheet'],
			operation: ['getAllTimesheets'],
		},
	},
	default: '',
	description: 'Start date for timesheet period (ISO 8601 format)',
},
{
	displayName: 'Period End',
	name: 'periodEnd',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['timesheet'],
			operation: ['getAllTimesheets'],
		},
	},
	default: '',
	description: 'End date for timesheet period (ISO 8601 format)',
},
{
	displayName: 'Timesheet ID',
	name: 'timesheetId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['timesheet'],
			operation: ['getTimesheet', 'updateTimesheet', 'deleteTimesheet', 'submitTimesheet', 'approveTimesheet'],
		},
	},
	default: '',
	description: 'The unique identifier of the timesheet',
},
{
	displayName: 'Timesheet Data',
	name: 'timesheetData',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['timesheet'],
			operation: ['createTimesheet', 'updateTimesheet'],
		},
	},
	default: '{}',
	description: 'The timesheet data object containing entry details',
},
{
	displayName: 'Where Clause',
	name: 'whereClause',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['investment'],
			operation: ['getAllInvestments'],
		},
	},
	default: '',
	placeholder: 'name="Project Alpha"',
	description: 'Filter criteria for investments query',
},
{
	displayName: 'Order By',
	name: 'orderBy',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['investment'],
			operation: ['getAllInvestments'],
		},
	},
	default: '',
	placeholder: 'name ASC',
	description: 'Sort order for the results',
},
{
	displayName: 'Size',
	name: 'size',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['investment'],
			operation: ['getAllInvestments'],
		},
	},
	default: 50,
	description: 'Maximum number of investments to return',
},
{
	displayName: 'Investment ID',
	name: 'investmentId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['investment'],
			operation: ['getInvestment', 'updateInvestment', 'deleteInvestment', 'getInvestmentHierarchy'],
		},
	},
	default: '',
	description: 'The unique identifier of the investment',
},
{
	displayName: 'Investment Data',
	name: 'investmentData',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['investment'],
			operation: ['createInvestment', 'updateInvestment'],
		},
	},
	default: '{\n  "name": "Investment Name",\n  "code": "INV001",\n  "description": "Investment description",\n  "manager": "user123",\n  "start": "2024-01-01T00:00:00.000Z",\n  "finish": "2024-12-31T23:59:59.000Z"\n}',
	description: 'Investment data object with properties like name, code, description, manager, start and finish dates',
},
{
	displayName: 'Portfolio ID',
	name: 'portfolioId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['portfolioItem'],
			operation: ['getPortfolioItems', 'createPortfolioItem'],
		},
	},
	default: '',
	description: 'The ID of the portfolio',
},
{
	displayName: 'Item ID',
	name: 'itemId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['portfolioItem'],
			operation: ['getPortfolioItem', 'updatePortfolioItem', 'deletePortfolioItem'],
		},
	},
	default: '',
	description: 'The ID of the portfolio item',
},
{
	displayName: 'Where Clause',
	name: 'whereClause',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['portfolioItem'],
			operation: ['getPortfolioItems', 'getAllPortfolios'],
		},
	},
	default: '',
	description: 'SQL-like where clause to filter results',
},
{
	displayName: 'Order By',
	name: 'orderBy',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['portfolioItem'],
			operation: ['getAllPortfolios'],
		},
	},
	default: '',
	description: 'Field to order results by',
},
{
	displayName: 'Item Data',
	name: 'itemData',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['portfolioItem'],
			operation: ['createPortfolioItem', 'updatePortfolioItem'],
		},
	},
	default: '{}',
	description: 'Portfolio item data as JSON object',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'project':
        return [await executeProjectOperations.call(this, items)];
      case 'task':
        return [await executeTaskOperations.call(this, items)];
      case 'resource':
        return [await executeResourceOperations.call(this, items)];
      case 'timesheet':
        return [await executeTimesheetOperations.call(this, items)];
      case 'investment':
        return [await executeInvestmentOperations.call(this, items)];
      case 'portfolioItem':
        return [await executePortfolioItemOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeProjectOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('broadcomclarityppmApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      
      const baseOptions: any = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(credentials.username + ':' + credentials.password).toString('base64'),
        },
        json: true,
      };

      switch (operation) {
        case 'getAllProjects': {
          const whereClause = this.getNodeParameter('whereClause', i) as string;
          const orderBy = this.getNodeParameter('orderBy', i) as string;
          const size = this.getNodeParameter('size', i) as number;
          
          let url = `${credentials.baseUrl}/projects`;
          const queryParams: string[] = [];
          
          if (whereClause) queryParams.push(`where=${encodeURIComponent(whereClause)}`);
          if (orderBy) queryParams.push(`orderBy=${encodeURIComponent(orderBy)}`);
          if (size) queryParams.push(`size=${size}`);
          
          if (queryParams.length > 0) {
            url += '?' + queryParams.join('&');
          }

          const options: any = {
            ...baseOptions,
            method: 'GET',
            url,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getProject': {
          const projectId = this.getNodeParameter('projectId', i) as string;
          
          const options: any = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/projects/${projectId}`,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'createProject': {
          const projectData = this.getNodeParameter('projectData', i) as object;
          
          const options: any = {
            ...baseOptions,
            method: 'POST',
            url: `${credentials.baseUrl}/projects`,
            body: projectData,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'updateProject': {
          const projectId = this.getNodeParameter('projectId', i) as string;
          const projectData = this.getNodeParameter('projectData', i) as object;
          
          const options: any = {
            ...baseOptions,
            method: 'PUT',
            url: `${credentials.baseUrl}/projects/${projectId}`,
            body: projectData,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'deleteProject': {
          const projectId = this.getNodeParameter('projectId', i) as string;
          
          const options: any = {
            ...baseOptions,
            method: 'DELETE',
            url: `${credentials.baseUrl}/projects/${projectId}`,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'startProject': {
          const projectId = this.getNodeParameter('projectId', i) as string;
          
          const options: any = {
            ...baseOptions,
            method: 'POST',
            url: `${credentials.baseUrl}/projects/${projectId}/start`,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'completeProject': {
          const projectId = this.getNodeParameter('projectId', i) as string;
          
          const options: any = {
            ...baseOptions,
            method: 'POST',
            url: `${credentials.baseUrl}/projects/${projectId}/complete`,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }
      
      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }
  
  return returnData;
}

async function executeTaskOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('broadcomclarityppmApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getProjectTasks': {
          const projectId = this.getNodeParameter('projectId', i) as string;
          const whereClause = this.getNodeParameter('whereClause', i, '') as string;
          const orderBy = this.getNodeParameter('orderBy', i, '') as string;
          
          let url = `${credentials.baseUrl}/projects/${projectId}/tasks`;
          const queryParams: string[] = [];
          if (whereClause) queryParams.push(`where=${encodeURIComponent(whereClause)}`);
          if (orderBy) queryParams.push(`orderBy=${encodeURIComponent(orderBy)}`);
          if (queryParams.length > 0) url += `?${queryParams.join('&')}`;

          const options: any = {
            method: 'GET',
            url: url,
            headers: {
              'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
              'Accept': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getTask': {
          const taskId = this.getNodeParameter('taskId', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/tasks/${taskId}`,
            headers: {
              'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
              'Accept': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createTask': {
          const projectId = this.getNodeParameter('projectId', i) as string;
          const taskData = this.getNodeParameter('taskData', i) as object;
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/projects/${projectId}/tasks`,
            headers: {
              'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: taskData,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateTask': {
          const taskId = this.getNodeParameter('taskId', i) as string;
          const taskData = this.getNodeParameter('taskData', i) as object;
          
          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/tasks/${taskId}`,
            headers: {
              'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: taskData,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deleteTask': {
          const taskId = this.getNodeParameter('taskId', i) as string;
          
          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/tasks/${taskId}`,
            headers: {
              'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
              'Accept': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getAllTasks': {
          const whereClause = this.getNodeParameter('whereClause', i, '') as string;
          const orderBy = this.getNodeParameter('orderBy', i, '') as string;
          const size = this.getNodeParameter('size', i, 100) as number;
          
          let url = `${credentials.baseUrl}/tasks`;
          const queryParams: string[] = [];
          if (whereClause) queryParams.push(`where=${encodeURIComponent(whereClause)}`);
          if (orderBy) queryParams.push(`orderBy=${encodeURIComponent(orderBy)}`);
          if (size) queryParams.push(`size=${size}`);
          if (queryParams.length > 0) url += `?${queryParams.join('&')}`;

          const options: any = {
            method: 'GET',
            url: url,
            headers: {
              'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
              'Accept': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeResourceOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('broadcomclarityppmApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAllResources': {
					const whereClause = this.getNodeParameter('whereClause', i) as string;
					const orderBy = this.getNodeParameter('orderBy', i) as string;
					const size = this.getNodeParameter('size', i) as number;

					const params: string[] = [];
					if (whereClause) params.push(`whereClause=${encodeURIComponent(whereClause)}`);
					if (orderBy) params.push(`orderBy=${encodeURIComponent(orderBy)}`);
					if (size) params.push(`size=${size}`);

					const queryString = params.length > 0 ? `?${params.join('&')}` : '';

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/resources${queryString}`,
						headers: {
							'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getResource': {
					const resourceId = this.getNodeParameter('resourceId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/resources/${resourceId}`,
						headers: {
							'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createResource': {
					const resourceData = this.getNodeParameter('resourceData', i) as object;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/resources`,
						headers: {
							'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
							'Content-Type': 'application/json',
						},
						body: resourceData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateResource': {
					const resourceId = this.getNodeParameter('resourceId', i) as string;
					const resourceData = this.getNodeParameter('resourceData', i) as object;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/resources/${resourceId}`,
						headers: {
							'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
							'Content-Type': 'application/json',
						},
						body: resourceData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteResource': {
					const resourceId = this.getNodeParameter('resourceId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/resources/${resourceId}`,
						headers: {
							'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getResourceAllocations': {
					const resourceId = this.getNodeParameter('resourceId', i) as string;
					const startDate = this.getNodeParameter('startDate', i) as string;
					const endDate = this.getNodeParameter('endDate', i) as string;

					const params: string[] = [];
					if (startDate) params.push(`startDate=${encodeURIComponent(startDate)}`);
					if (endDate) params.push(`endDate=${encodeURIComponent(endDate)}`);

					const queryString = params.length > 0 ? `?${params.join('&')}` : '';

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/resources/${resourceId}/allocations${queryString}`,
						headers: {
							'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeTimesheetOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('broadcomclarityppmApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			const auth = {
				username: credentials.username,
				password: credentials.password,
			};

			switch (operation) {
				case 'getAllTimesheets': {
					const resourceId = this.getNodeParameter('resourceId', i) as string;
					const projectId = this.getNodeParameter('projectId', i) as string;
					const periodStart = this.getNodeParameter('periodStart', i) as string;
					const periodEnd = this.getNodeParameter('periodEnd', i) as string;

					let url = `${credentials.baseUrl}/timesheets`;
					const queryParams: string[] = [];

					if (resourceId) queryParams.push(`resourceId=${encodeURIComponent(resourceId)}`);
					if (projectId) queryParams.push(`projectId=${encodeURIComponent(projectId)}`);
					if (periodStart) queryParams.push(`periodStart=${encodeURIComponent(periodStart)}`);
					if (periodEnd) queryParams.push(`periodEnd=${encodeURIComponent(periodEnd)}`);

					if (queryParams.length > 0) {
						url += `?${queryParams.join('&')}`;
					}

					const options: any = {
						method: 'GET',
						url,
						auth,
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTimesheet': {
					const timesheetId = this.getNodeParameter('timesheetId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/timesheets/${timesheetId}`,
						auth,
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createTimesheet': {
					const timesheetData = this.getNodeParameter('timesheetData', i) as object;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/timesheets`,
						auth,
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
						},
						body: timesheetData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateTimesheet': {
					const timesheetId = this.getNodeParameter('timesheetId', i) as string;
					const timesheetData = this.getNodeParameter('timesheetData', i) as object;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/timesheets/${timesheetId}`,
						auth,
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
						},
						body: timesheetData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteTimesheet': {
					const timesheetId = this.getNodeParameter('timesheetId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/timesheets/${timesheetId}`,
						auth,
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'submitTimesheet': {
					const timesheetId = this.getNodeParameter('timesheetId', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/timesheets/${timesheetId}/submit`,
						auth,
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'approveTimesheet': {
					const timesheetId = this.getNodeParameter('timesheetId', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/timesheets/${timesheetId}/approve`,
						auth,
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeInvestmentOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('broadcomclarityppmApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			const auth = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
			const baseHeaders = {
				'Authorization': `Basic ${auth}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			};

			switch (operation) {
				case 'getAllInvestments': {
					const whereClause = this.getNodeParameter('whereClause', i) as string;
					const orderBy = this.getNodeParameter('orderBy', i) as string;
					const size = this.getNodeParameter('size', i) as number;

					let url = `${credentials.baseUrl}/investments`;
					const params = new URLSearchParams();

					if (whereClause) {
						params.append('where', whereClause);
					}
					if (orderBy) {
						params.append('orderBy', orderBy);
					}
					if (size) {
						params.append('size', size.toString());
					}

					if (params.toString()) {
						url += `?${params.toString()}`;
					}

					const options: any = {
						method: 'GET',
						url,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getInvestment': {
					const investmentId = this.getNodeParameter('investmentId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/investments/${encodeURIComponent(investmentId)}`,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createInvestment': {
					const investmentData = this.getNodeParameter('investmentData', i) as object;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/investments`,
						headers: baseHeaders,
						body: investmentData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateInvestment': {
					const investmentId = this.getNodeParameter('investmentId', i) as string;
					const investmentData = this.getNodeParameter('investmentData', i) as object;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/investments/${encodeURIComponent(investmentId)}`,
						headers: baseHeaders,
						body: investmentData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteInvestment': {
					const investmentId = this.getNodeParameter('investmentId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/investments/${encodeURIComponent(investmentId)}`,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getInvestmentHierarchy': {
					const investmentId = this.getNodeParameter('investmentId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/investments/${encodeURIComponent(investmentId)}/hierarchy`,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Unknown operation: ${operation}`,
						{ itemIndex: i },
					);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executePortfolioItemOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('broadcomclarityppmApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			const authString = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
			const baseHeaders = {
				'Authorization': `Basic ${authString}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			};

			switch (operation) {
				case 'getPortfolioItems': {
					const portfolioId = this.getNodeParameter('portfolioId', i) as string;
					const whereClause = this.getNodeParameter('whereClause', i) as string;

					let url = `${credentials.baseUrl}/portfolios/${portfolioId}/items`;
					if (whereClause) {
						url += `?where=${encodeURIComponent(whereClause)}`;
					}

					const options: any = {
						method: 'GET',
						url,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getPortfolioItem': {
					const itemId = this.getNodeParameter('itemId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/portfolioitems/${itemId}`,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createPortfolioItem': {
					const portfolioId = this.getNodeParameter('portfolioId', i) as string;
					const itemData = this.getNodeParameter('itemData', i) as object;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/portfolios/${portfolioId}/items`,
						headers: baseHeaders,
						body: itemData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updatePortfolioItem': {
					const itemId = this.getNodeParameter('itemId', i) as string;
					const itemData = this.getNodeParameter('itemData', i) as object;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/portfolioitems/${itemId}`,
						headers: baseHeaders,
						body: itemData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deletePortfolioItem': {
					const itemId = this.getNodeParameter('itemId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/portfolioitems/${itemId}`,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAllPortfolios': {
					const whereClause = this.getNodeParameter('whereClause', i) as string;
					const orderBy = this.getNodeParameter('orderBy', i) as string;

					let url = `${credentials.baseUrl}/portfolios`;
					const params: string[] = [];
					
					if (whereClause) {
						params.push(`where=${encodeURIComponent(whereClause)}`);
					}
					if (orderBy) {
						params.push(`orderBy=${encodeURIComponent(orderBy)}`);
					}
					
					if (params.length > 0) {
						url += `?${params.join('&')}`;
					}

					const options: any = {
						method: 'GET',
						url,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}
