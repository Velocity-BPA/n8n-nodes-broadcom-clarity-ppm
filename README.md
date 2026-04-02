# n8n-nodes-broadcom-clarity-ppm

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

An n8n community node for integrating with Broadcom Clarity PPM. This node provides 6 resources with full CRUD operations, enabling comprehensive project portfolio management automation including projects, tasks, resources, timesheets, investments, and portfolio items.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![PPM](https://img.shields.io/badge/Broadcom-Clarity%20PPM-orange)
![Portfolio Management](https://img.shields.io/badge/Portfolio-Management-green)
![Project Management](https://img.shields.io/badge/Project-Management-purple)

## Features

- **Complete Project Management** - Create, read, update and delete projects with full metadata support
- **Task Management** - Comprehensive task operations including assignments, dependencies, and status tracking
- **Resource Management** - Manage human and material resources with availability and allocation tracking
- **Timesheet Integration** - Full timesheet functionality for time tracking and project billing
- **Investment Portfolio** - Handle investment requests, approvals, and portfolio analysis
- **Portfolio Items** - Manage strategic portfolio items with governance and reporting capabilities
- **Enterprise Authentication** - Secure API key-based authentication for enterprise environments
- **Error Handling** - Robust error handling with detailed error messages and retry mechanisms

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-broadcom-clarity-ppm`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-broadcom-clarity-ppm
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-broadcom-clarity-ppm.git
cd n8n-nodes-broadcom-clarity-ppm
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-broadcom-clarity-ppm
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Broadcom Clarity PPM API key | ✓ |
| Server URL | Base URL of your Clarity PPM instance (e.g., https://clarity.company.com) | ✓ |
| API Version | API version to use (default: v15.9.3) | ✗ |

## Resources & Operations

### 1. Project

| Operation | Description |
|-----------|-------------|
| Create | Create a new project with specified parameters |
| Get | Retrieve project details by ID or code |
| Get All | List all projects with optional filtering |
| Update | Update existing project properties |
| Delete | Remove a project from the system |

### 2. Task

| Operation | Description |
|-----------|-------------|
| Create | Create a new task within a project |
| Get | Retrieve task details by ID |
| Get All | List all tasks with filtering options |
| Update | Update task properties and assignments |
| Delete | Remove a task from the project |

### 3. Resource

| Operation | Description |
|-----------|-------------|
| Create | Create a new resource (human or material) |
| Get | Retrieve resource details and availability |
| Get All | List all resources with filtering capabilities |
| Update | Update resource information and allocations |
| Delete | Remove a resource from the system |

### 4. Timesheet

| Operation | Description |
|-----------|-------------|
| Create | Create timesheet entries for resources |
| Get | Retrieve timesheet data by ID or period |
| Get All | List timesheets with date and resource filters |
| Update | Update timesheet entries and submit for approval |
| Delete | Remove timesheet entries |

### 5. Investment

| Operation | Description |
|-----------|-------------|
| Create | Create new investment requests |
| Get | Retrieve investment details and status |
| Get All | List investments with portfolio filtering |
| Update | Update investment information and status |
| Delete | Remove investment from portfolio |

### 6. Portfolio Item

| Operation | Description |
|-----------|-------------|
| Create | Create strategic portfolio items |
| Get | Retrieve portfolio item details |
| Get All | List all portfolio items with categorization |
| Update | Update portfolio item properties and status |
| Delete | Remove portfolio item from strategic view |

## Usage Examples

```javascript
// Create a new project
{
  "name": "Digital Transformation Initiative",
  "code": "DTI-2024",
  "manager": "john.doe@company.com",
  "startDate": "2024-01-15",
  "finishDate": "2024-12-31",
  "description": "Company-wide digital transformation project",
  "priority": "High"
}
```

```javascript
// Create a task within a project
{
  "projectCode": "DTI-2024",
  "name": "Requirements Analysis",
  "duration": 40,
  "assignedResource": "jane.smith@company.com",
  "predecessors": [],
  "startDate": "2024-01-15"
}
```

```javascript
// Log timesheet entry
{
  "resourceId": "jane.smith@company.com",
  "projectCode": "DTI-2024",
  "taskId": "REQ-001",
  "date": "2024-01-15",
  "hours": 8,
  "description": "Stakeholder interviews and documentation"
}
```

```javascript
// Create investment request
{
  "name": "AI Implementation Project",
  "requestedAmount": 250000,
  "businessCase": "Improve operational efficiency by 30%",
  "category": "Technology",
  "requestor": "cto@company.com",
  "priority": "High"
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Invalid API Key | Authentication failed with provided credentials | Verify API key is correct and active |
| Resource Not Found | Requested project, task, or resource doesn't exist | Check ID/code exists in Clarity PPM |
| Insufficient Permissions | User lacks rights for requested operation | Contact admin to grant appropriate permissions |
| Validation Error | Required fields missing or invalid data format | Review field requirements and data types |
| Server Timeout | Clarity PPM server didn't respond within timeout | Check server status and network connectivity |
| Rate Limit Exceeded | Too many API requests in time window | Implement delays between requests |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-broadcom-clarity-ppm/issues)
- **Broadcom Clarity PPM Documentation**: [Broadcom Support Portal](https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/ProductDocumentation)
- **Community Forum**: [n8n Community](https://community.n8n.io/)