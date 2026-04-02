/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { BroadcomClarityPPM } from '../nodes/Broadcom Clarity PPM/Broadcom Clarity PPM.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('BroadcomClarityPPM Node', () => {
  let node: BroadcomClarityPPM;

  beforeAll(() => {
    node = new BroadcomClarityPPM();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Broadcom Clarity PPM');
      expect(node.description.name).toBe('broadcomclarityppm');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 6 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(6);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(6);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Project Resource', () => {
  let mockExecuteFunctions: any;
  
  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        username: 'test-user',
        password: 'test-pass',
        baseUrl: 'https://clarity.company.com/ppm/rest/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
    };
  });

  it('should get all projects successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAllProjects');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('status = "ACTIVE"');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('name ASC');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(10);
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce([{ id: '1', name: 'Test Project' }]);

    const result = await executeProjectOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual([{ id: '1', name: 'Test Project' }]);
  });

  it('should get a specific project successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getProject');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('proj123');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce({ id: 'proj123', name: 'Specific Project' });

    const result = await executeProjectOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ id: 'proj123', name: 'Specific Project' });
  });

  it('should create a project successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('createProject');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce({ name: 'New Project', description: 'Test project' });
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce({ id: 'proj456', name: 'New Project' });

    const result = await executeProjectOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ id: 'proj456', name: 'New Project' });
  });

  it('should update a project successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('updateProject');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('proj123');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce({ name: 'Updated Project' });
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce({ id: 'proj123', name: 'Updated Project' });

    const result = await executeProjectOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ id: 'proj123', name: 'Updated Project' });
  });

  it('should delete a project successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('deleteProject');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('proj123');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce({ success: true });

    const result = await executeProjectOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ success: true });
  });

  it('should start a project successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('startProject');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('proj123');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce({ id: 'proj123', status: 'ACTIVE' });

    const result = await executeProjectOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ id: 'proj123', status: 'ACTIVE' });
  });

  it('should complete a project successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('completeProject');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('proj123');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce({ id: 'proj123', status: 'COMPLETE' });

    const result = await executeProjectOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ id: 'proj123', status: 'COMPLETE' });
  });

  it('should handle errors gracefully when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getProject');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('invalid-id');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValueOnce(new Error('Project not found'));
    mockExecuteFunctions.continueOnFail.mockReturnValueOnce(true);

    const result = await executeProjectOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('Project not found');
  });

  it('should throw error when continueOnFail is false', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getProject');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('invalid-id');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValueOnce(new Error('Project not found'));
    mockExecuteFunctions.continueOnFail.mockReturnValueOnce(false);

    await expect(executeProjectOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('Project not found');
  });
});

describe('Task Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        baseUrl: 'https://clarity.company.com/ppm/rest/v1',
        username: 'test-user',
        password: 'test-pass'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
    };
  });

  it('should get project tasks successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getProjectTasks')
      .mockReturnValueOnce('project123')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue([
      { id: 'task1', name: 'Test Task 1' },
      { id: 'task2', name: 'Test Task 2' }
    ]);

    const result = await executeTaskOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual([
      { id: 'task1', name: 'Test Task 1' },
      { id: 'task2', name: 'Test Task 2' }
    ]);
  });

  it('should handle errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getTask')
      .mockReturnValueOnce('invalid-task-id');
    
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Task not found'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeTaskOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('Task not found');
  });

  it('should create task successfully', async () => {
    const taskData = { name: 'New Task', duration: 5 };
    
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('createTask')
      .mockReturnValueOnce('project123')
      .mockReturnValueOnce(taskData);
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'task123',
      name: 'New Task',
      duration: 5
    });

    const result = await executeTaskOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.id).toBe('task123');
    expect(result[0].json.name).toBe('New Task');
  });

  it('should update task successfully', async () => {
    const taskData = { name: 'Updated Task', duration: 10 };
    
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('updateTask')
      .mockReturnValueOnce('task123')
      .mockReturnValueOnce(taskData);
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'task123',
      name: 'Updated Task',
      duration: 10
    });

    const result = await executeTaskOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.name).toBe('Updated Task');
    expect(result[0].json.duration).toBe(10);
  });

  it('should delete task successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('deleteTask')
      .mockReturnValueOnce('task123');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

    const result = await executeTaskOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.success).toBe(true);
  });

  it('should get all tasks with parameters', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAllTasks')
      .mockReturnValueOnce('status="active"')
      .mockReturnValueOnce('name')
      .mockReturnValueOnce(50);
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      tasks: [{ id: 'task1', name: 'Active Task' }],
      total: 1
    });

    const result = await executeTaskOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.tasks).toHaveLength(1);
    expect(result[0].json.total).toBe(1);
  });
});

describe('Resource Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				username: 'testuser',
				password: 'testpass',
				baseUrl: 'https://clarity.company.com/ppm/rest/v1'
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	test('should get all resources successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAllResources');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('active = true');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('name');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(10);
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue([{ id: 'res1', name: 'Resource 1' }]);

		const result = await executeResourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{
			json: [{ id: 'res1', name: 'Resource 1' }],
			pairedItem: { item: 0 },
		}]);
	});

	test('should get specific resource successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getResource');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('res123');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: 'res123', name: 'Test Resource' });

		const result = await executeResourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{
			json: { id: 'res123', name: 'Test Resource' },
			pairedItem: { item: 0 },
		}]);
	});

	test('should create resource successfully', async () => {
		const resourceData = { name: 'New Resource', type: 'HUMAN' };
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('createResource');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(resourceData);
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: 'res456', ...resourceData });

		const result = await executeResourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{
			json: { id: 'res456', ...resourceData },
			pairedItem: { item: 0 },
		}]);
	});

	test('should update resource successfully', async () => {
		const resourceData = { name: 'Updated Resource' };
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('updateResource');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('res123');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(resourceData);
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: 'res123', ...resourceData });

		const result = await executeResourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{
			json: { id: 'res123', ...resourceData },
			pairedItem: { item: 0 },
		}]);
	});

	test('should delete resource successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('deleteResource');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('res123');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

		const result = await executeResourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{
			json: { success: true },
			pairedItem: { item: 0 },
		}]);
	});

	test('should get resource allocations successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getResourceAllocations');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('res123');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('2024-01-01T00:00:00Z');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('2024-12-31T23:59:59Z');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue([{ projectId: 'proj1', allocation: 0.8 }]);

		const result = await executeResourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{
			json: [{ projectId: 'proj1', allocation: 0.8 }],
			pairedItem: { item: 0 },
		}]);
	});

	test('should handle errors when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getResource');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('invalid-id');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Resource not found'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executeResourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{
			json: { error: 'Resource not found' },
			pairedItem: { item: 0 },
		}]);
	});

	test('should throw error when continueOnFail is false', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getResource');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('invalid-id');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Resource not found'));

		await expect(executeResourceOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('Resource not found');
	});
});

describe('Timesheet Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				username: 'test-user',
				password: 'test-pass',
				baseUrl: 'https://clarity.company.com/ppm/rest/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	it('should get all timesheets successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAllTimesheets')
			.mockReturnValueOnce('resource123')
			.mockReturnValueOnce('project456')
			.mockReturnValueOnce('2024-01-01T00:00:00Z')
			.mockReturnValueOnce('2024-01-31T23:59:59Z');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			timesheets: [{ id: 'timesheet1', resourceId: 'resource123' }],
		});

		const result = await executeTimesheetOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://clarity.company.com/ppm/rest/v1/timesheets?resourceId=resource123&projectId=project456&periodStart=2024-01-01T00%3A00%3A00Z&periodEnd=2024-01-31T23%3A59%3A59Z',
			auth: { username: 'test-user', password: 'test-pass' },
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			json: true,
		});
		expect(result).toHaveLength(1);
	});

	it('should get specific timesheet successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getTimesheet')
			.mockReturnValueOnce('timesheet123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'timesheet123',
			resourceId: 'resource456',
		});

		const result = await executeTimesheetOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://clarity.company.com/ppm/rest/v1/timesheets/timesheet123',
			auth: { username: 'test-user', password: 'test-pass' },
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			json: true,
		});
		expect(result).toHaveLength(1);
	});

	it('should create timesheet successfully', async () => {
		const timesheetData = { resourceId: 'resource123', projectId: 'project456', hours: 8 };
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('createTimesheet')
			.mockReturnValueOnce(timesheetData);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'timesheet789',
			...timesheetData,
		});

		const result = await executeTimesheetOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://clarity.company.com/ppm/rest/v1/timesheets',
			auth: { username: 'test-user', password: 'test-pass' },
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			body: timesheetData,
			json: true,
		});
		expect(result).toHaveLength(1);
	});

	it('should submit timesheet successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('submitTimesheet')
			.mockReturnValueOnce('timesheet123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'timesheet123',
			status: 'submitted',
		});

		const result = await executeTimesheetOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://clarity.company.com/ppm/rest/v1/timesheets/timesheet123/submit',
			auth: { username: 'test-user', password: 'test-pass' },
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			json: true,
		});
		expect(result).toHaveLength(1);
	});

	it('should handle errors gracefully when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getTimesheet').mockReturnValueOnce('invalid');
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Timesheet not found'));

		const result = await executeTimesheetOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.error).toBe('Timesheet not found');
	});
});

describe('Investment Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				username: 'test-user',
				password: 'test-pass',
				baseUrl: 'https://clarity.company.com/ppm/rest/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	test('getAllInvestments - success', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			switch (param) {
				case 'operation': return 'getAllInvestments';
				case 'whereClause': return 'name="Project Alpha"';
				case 'orderBy': return 'name ASC';
				case 'size': return 50;
				default: return '';
			}
		});

		const mockResponse = { investments: [{ id: '1', name: 'Investment 1' }] };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const items = [{ json: {} }];
		const result = await executeInvestmentOperations.call(mockExecuteFunctions, items);

		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://clarity.company.com/ppm/rest/v1/investments?where=name%3D%22Project+Alpha%22&orderBy=name+ASC&size=50',
			headers: expect.objectContaining({
				'Authorization': expect.stringContaining('Basic'),
				'Content-Type': 'application/json',
			}),
			json: true,
		});
	});

	test('getInvestment - success', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			switch (param) {
				case 'operation': return 'getInvestment';
				case 'investmentId': return 'INV123';
				default: return '';
			}
		});

		const mockResponse = { id: 'INV123', name: 'Test Investment' };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const items = [{ json: {} }];
		const result = await executeInvestmentOperations.call(mockExecuteFunctions, items);

		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
	});

	test('createInvestment - success', async () => {
		const investmentData = { name: 'New Investment', code: 'INV001' };
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			switch (param) {
				case 'operation': return 'createInvestment';
				case 'investmentData': return investmentData;
				default: return '';
			}
		});

		const mockResponse = { id: 'INV124', ...investmentData };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const items = [{ json: {} }];
		const result = await executeInvestmentOperations.call(mockExecuteFunctions, items);

		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://clarity.company.com/ppm/rest/v1/investments',
			headers: expect.objectContaining({
				'Authorization': expect.stringContaining('Basic'),
			}),
			body: investmentData,
			json: true,
		});
	});

	test('error handling with continueOnFail', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('getAllInvestments');
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		const items = [{ json: {} }];
		const result = await executeInvestmentOperations.call(mockExecuteFunctions, items);

		expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
	});
});

describe('Portfolio Item Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				username: 'test-user',
				password: 'test-password',
				baseUrl: 'https://clarity.company.com/ppm/rest/v1'
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	it('should get portfolio items successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getPortfolioItems')
			.mockReturnValueOnce('portfolio123')
			.mockReturnValueOnce('status="active"');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue([
			{ id: 'item1', name: 'Project A' },
			{ id: 'item2', name: 'Project B' }
		]);

		const result = await executePortfolioItemOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual([
			{ id: 'item1', name: 'Project A' },
			{ id: 'item2', name: 'Project B' }
		]);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://clarity.company.com/ppm/rest/v1/portfolios/portfolio123/items?where=status%3D%22active%22',
			headers: expect.objectContaining({
				'Authorization': expect.stringContaining('Basic'),
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			}),
			json: true,
		});
	});

	it('should get a specific portfolio item successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getPortfolioItem')
			.mockReturnValueOnce('item123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'item123',
			name: 'Test Project'
		});

		const result = await executePortfolioItemOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ id: 'item123', name: 'Test Project' });
	});

	it('should create portfolio item successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('createPortfolioItem')
			.mockReturnValueOnce('portfolio123')
			.mockReturnValueOnce({ name: 'New Project', description: 'Test project' });

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'new-item-id',
			name: 'New Project'
		});

		const result = await executePortfolioItemOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ id: 'new-item-id', name: 'New Project' });
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://clarity.company.com/ppm/rest/v1/portfolios/portfolio123/items',
			headers: expect.objectContaining({
				'Authorization': expect.stringContaining('Basic'),
			}),
			body: { name: 'New Project', description: 'Test project' },
			json: true,
		});
	});

	it('should update portfolio item successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('updatePortfolioItem')
			.mockReturnValueOnce('item123')
			.mockReturnValueOnce({ name: 'Updated Project' });

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'item123',
			name: 'Updated Project'
		});

		const result = await executePortfolioItemOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ id: 'item123', name: 'Updated Project' });
	});

	it('should delete portfolio item successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('deletePortfolioItem')
			.mockReturnValueOnce('item123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

		const result = await executePortfolioItemOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ success: true });
	});

	it('should get all portfolios successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAllPortfolios')
			.mockReturnValueOnce('active=true')
			.mockReturnValueOnce('name ASC');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue([
			{ id: 'port1', name: 'Portfolio A' },
			{ id: 'port2', name: 'Portfolio B' }
		]);

		const result = await executePortfolioItemOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual([
			{ id: 'port1', name: 'Portfolio A' },
			{ id: 'port2', name: 'Portfolio B' }
		]);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://clarity.company.com/ppm/rest/v1/portfolios?where=active%3Dtrue&orderBy=name%20ASC',
			headers: expect.objectContaining({
				'Authorization': expect.stringContaining('Basic'),
			}),
			json: true,
		});
	});

	it('should handle API errors when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getPortfolioItem');
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		const result = await executePortfolioItemOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ error: 'API Error' });
	});

	it('should throw error when continueOnFail is false', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getPortfolioItem');
		mockExecuteFunctions.continueOnFail.mockReturnValue(false);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		await expect(executePortfolioItemOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('API Error');
	});
});
});
