# Catsy SaaS Platform - Complete Documentation

## Table of Contents
1. [Platform Overview](#platform-overview)
2. [Global Pages](#global-pages)
3. [Client Portal](#client-portal)
4. [Provider Portal](#provider-portal)
5. [Design System](#design-system)
6. [Navigation Structure](#navigation-structure)

---

## Platform Overview

**Catsy** is a managed listing-automation platform that eliminates manual spreadsheet labor for e-commerce brands. The platform serves two primary user types:

- **Clients**: E-commerce brands, catalog managers, and businesses that need automated product listings
- **Providers**: Service providers, agencies, and freelancers who manage listing automation for multiple clients

The platform automates the process of converting product data into marketplace-ready listing files for platforms like Amazon, Flipkart, and other e-commerce marketplaces.

---

## Global Pages

### 1. Landing Page (`/`)
**Purpose**: Marketing homepage and primary entry point for new users

**Key Features**:
- **Sticky Navigation Bar**: Responsive header with logo, navigation links, and CTA buttons
- **Hero Section**: Value proposition with visual before/after comparison
- **Who It's For Section**: Three target personas (Catalog Owner, Account Manager, Solo Operator)
- **How It Works Section**: 3-step process explanation with visual workflow
- **Final CTA Section**: Conversion-focused call-to-action
- **Footer**: Company information, product links, and legal pages

**Design Elements**:
- Indigo/purple color scheme (#4F46E5)
- Card-based layout with subtle shadows
- Responsive grid system
- Mobile-first design with hamburger menu

### 2. Login Page (`/login`)
**Purpose**: User authentication for existing accounts

**Key Features**:
- **Email/Password Authentication**: Standard login form
- **Password Visibility Toggle**: Eye icon to show/hide password
- **Forgot Password Link**: Direct access to password reset
- **Navigation to Landing**: Clickable Catsy logo returns to homepage
- **Sign Up Link**: Easy access for new users
- **Form Validation**: Client-side validation for required fields

**User Experience**:
- Clean, centered card layout
- Consistent branding with logo
- Clear error states and feedback
- Mobile-responsive design

### 3. Sign Up Page (`/signup`)
**Purpose**: New user registration and account creation

**Key Features**:
- **Organization Details**: Company/organization name capture
- **Personal Information**: First name, last name, email
- **Password Creation**: Password and confirmation with visibility toggles
- **Navigation to Landing**: Clickable Catsy logo
- **Login Link**: Easy access for existing users
- **Form Validation**: Real-time validation and error handling

**Data Collected**:
- Organization name (for account setup)
- User's full name (for personalization)
- Email address (primary identifier)
- Secure password (encrypted storage)

### 4. Forgot Password Page (`/forgot-password`)
**Purpose**: Password recovery initiation

**Key Features**:
- **Email Input**: Single field for account email
- **Reset Link Generation**: Sends secure reset link via email
- **Success State**: Confirmation screen with next steps
- **Back to Login**: Easy navigation return
- **Resend Option**: Ability to request new reset link
- **Spam Folder Reminder**: User guidance for email delivery

**User Flow**:
1. User enters email address
2. System sends reset link
3. Confirmation screen displays
4. User checks email and follows link

### 5. Reset Password Page (`/reset-password`)
**Purpose**: Password reset completion with secure token

**Key Features**:
- **Token Validation**: Secure URL parameter verification
- **New Password Input**: Password field with visibility toggle
- **Password Confirmation**: Matching validation
- **Success State**: Confirmation of successful reset
- **Invalid Token Handling**: Error state for expired/invalid links
- **Security Measures**: Token expiration and single-use validation

**Security Features**:
- Time-limited reset tokens
- Secure token generation
- Password strength requirements
- Automatic token invalidation after use

### 6. Pending Approval Page (`/pending-approval`)
**Purpose**: Account status notification for new registrations

**Key Features**:
- **Status Communication**: Clear explanation of approval process
- **Timeline Expectations**: Estimated approval timeframe
- **Contact Information**: Support access for questions
- **Next Steps**: What happens after approval
- **Account Type Indication**: Client vs Provider status

---

## Client Portal

The client portal serves e-commerce brands, catalog managers, and businesses that need automated product listings.

### 1. Client Dashboard (`/app/dashboard`)
**Purpose**: Central hub for client activities and overview

**Key Features**:
- **Metrics Overview**: Key performance indicators and statistics
  - Total workflows created
  - Files generated this month
  - Success rate percentage
  - Active workflows count
- **Quick Actions**: Fast access to common tasks
  - Create new listing workflow
  - Upload product data
  - Download recent files
  - View workflow status
- **Recent Activity Feed**: Timeline of recent actions and updates
- **Workflow Status Cards**: Visual status of active workflows
- **Performance Charts**: Data visualization of usage patterns

**Layout Components**:
- Left sidebar navigation (via ClientLayout)
- Main content area with grid layout
- Quick stats cards at top
- Activity feed and charts below

### 2. Create Listings Page (`/app/create-listings`)
**Purpose**: Workflow execution and listing generation

**Key Features**:
- **Workflow Selection**: Choose from available automation workflows
- **File Upload Interface**: Drag-and-drop product data upload
- **Marketplace Selection**: Choose target platforms (Amazon, Flipkart, etc.)
- **Configuration Options**: Customize workflow parameters
- **Progress Tracking**: Real-time workflow execution status
- **Preview Mode**: Preview generated listings before download
- **Batch Processing**: Handle multiple products simultaneously

**Workflow Process**:
1. Select automation workflow
2. Upload product data (CSV/Excel)
3. Configure marketplace settings
4. Execute workflow
5. Review and download results

### 3. Workflows Page (`/app/workflows`)
**Purpose**: Workflow management and monitoring

**Key Features**:
- **Workflow Library**: List of all available workflows
- **Status Monitoring**: Real-time status of running workflows
- **History Tracking**: Complete audit trail of workflow executions
- **Performance Metrics**: Success rates, execution times, error rates
- **Workflow Templates**: Pre-configured workflow options
- **Custom Workflow Requests**: Request new automation workflows
- **Filtering and Search**: Find specific workflows quickly

**Workflow States**:
- Draft (being configured)
- Active (ready for use)
- Running (currently executing)
- Completed (finished successfully)
- Failed (encountered errors)
- Paused (temporarily stopped)

### 4. Generated Files Page (`/app/files`)
**Purpose**: File management and download center

**Key Features**:
- **File Library**: Organized storage of all generated files
- **Download Management**: Bulk and individual file downloads
- **File Versioning**: Track different versions of generated files
- **Marketplace Organization**: Files organized by target platform
- **Search and Filter**: Find files by date, marketplace, or workflow
- **File Preview**: Preview file contents before download
- **Sharing Options**: Share files with team members

**File Organization**:
- By marketplace (Amazon, Flipkart, etc.)
- By date generated
- By workflow type
- By file status (ready, processing, error)

### 5. Team Management Page (`/app/team`)
**Purpose**: User and access management

**Key Features**:
- **Team Member List**: All users with access to the account
- **Role Management**: Assign and modify user permissions
- **Invitation System**: Invite new team members via email
- **Access Control**: Granular permissions for different features
- **Activity Monitoring**: Track team member actions
- **User Profiles**: Manage individual user information

**User Roles**:
- Owner (full access)
- Admin (management access)
- Editor (workflow creation/execution)
- Viewer (read-only access)

### 6. Account Settings Page (`/app/settings`)
**Purpose**: Account configuration and preferences

**Key Features**:
- **Profile Management**: Update personal and company information
- **Billing Information**: Payment methods and subscription details
- **Notification Preferences**: Email and in-app notification settings
- **API Access**: API keys and integration settings
- **Security Settings**: Password change, 2FA setup
- **Data Export**: Download account data and files
- **Account Deletion**: Self-service account closure

**Settings Categories**:
- General (company info, preferences)
- Billing (subscription, payment)
- Security (password, 2FA)
- Notifications (email, alerts)
- Integrations (API, webhooks)

### 7. New Request Page (`/app/requests/new`)
**Purpose**: Request new workflow automation

**Key Features**:
- **Request Form**: Detailed form for workflow requirements
- **Marketplace Selection**: Choose target platforms
- **Data Mapping**: Specify field mappings and transformations
- **File Upload**: Sample data and template files
- **Priority Selection**: Standard or expedited processing
- **Communication Thread**: Direct messaging with provider team

**Request Process**:
1. Fill out detailed requirements
2. Upload sample data/templates
3. Submit request for review
4. Provider team builds automation
5. Testing and approval
6. Workflow becomes available

---

## Provider Portal

The provider portal serves agencies, freelancers, and service providers who manage listing automation for multiple clients.

### 1. Provider Dashboard (`/provider/dashboard`)
**Purpose**: Business overview and key metrics for service providers

**Key Features**:
- **Business Metrics**: Revenue, client count, workflow performance
- **Client Overview**: Quick stats for all managed clients
- **Revenue Analytics**: Monthly/quarterly revenue tracking
- **Workflow Performance**: Success rates across all clients
- **Recent Activity**: Latest client interactions and workflow executions
- **Quick Actions**: Fast access to common provider tasks

**Key Metrics Displayed**:
- Total active clients
- Monthly recurring revenue
- Workflow success rate
- Files generated this month
- Average turnaround time
- Client satisfaction scores

### 2. Client Management Page (`/provider/clients`)
**Purpose**: Comprehensive client relationship management

**Key Features**:
- **Client Directory**: Complete list of all managed clients
- **Client Profiles**: Detailed information for each client
- **Relationship Status**: Active, pending, churned client tracking
- **Communication History**: All interactions and correspondence
- **Billing Management**: Client-specific billing and invoicing
- **Performance Tracking**: Per-client metrics and analytics
- **Onboarding Pipeline**: New client setup and activation

**Client Information**:
- Company details and contacts
- Subscription and billing status
- Workflow usage patterns
- Support ticket history
- Performance metrics
- Contract and SLA details

### 3. Workflow Management Page (`/provider/workflows`)
**Purpose**: Cross-client workflow administration

**Key Features**:
- **Global Workflow Library**: All workflows across all clients
- **Workflow Development**: Create and modify automation workflows
- **Template Management**: Reusable workflow templates
- **Quality Assurance**: Testing and validation tools
- **Performance Monitoring**: Workflow success rates and optimization
- **Client Assignment**: Assign workflows to specific clients
- **Version Control**: Track workflow changes and updates

**Workflow Categories**:
- Standard templates (reusable across clients)
- Custom workflows (client-specific)
- In development (being built)
- Deprecated (no longer used)

### 4. Analytics Page (`/provider/analytics`)
**Purpose**: Business intelligence and performance analysis

**Key Features**:
- **Revenue Analytics**: Detailed financial performance tracking
- **Client Analytics**: Per-client performance and usage metrics
- **Workflow Analytics**: Automation performance and optimization insights
- **Operational Metrics**: Efficiency and productivity measurements
- **Trend Analysis**: Historical data and forecasting
- **Custom Reports**: Configurable reporting and data export
- **Dashboard Widgets**: Customizable metric displays

**Analytics Categories**:
- Financial (revenue, profitability, growth)
- Operational (efficiency, turnaround times)
- Client (satisfaction, retention, usage)
- Technical (workflow performance, error rates)

### 5. Team Management Page (`/provider/team`)
**Purpose**: Internal team and resource management

**Key Features**:
- **Team Directory**: All internal team members and roles
- **Workload Management**: Task assignment and capacity planning
- **Skill Tracking**: Team member capabilities and specializations
- **Performance Management**: Individual and team performance metrics
- **Training and Development**: Skill development and certification tracking
- **Access Control**: Internal permissions and security management

**Team Roles**:
- Account Managers (client relationships)
- Workflow Developers (automation creation)
- Quality Assurance (testing and validation)
- Support Specialists (client assistance)
- Administrators (system management)

### 6. Provider Settings Page (`/provider/settings`)
**Purpose**: Business configuration and system administration

**Key Features**:
- **Company Profile**: Business information and branding
- **Service Configuration**: Available services and pricing
- **SLA Management**: Service level agreement templates
- **Integration Settings**: Third-party tool connections
- **Billing Configuration**: Payment processing and invoicing
- **Security Administration**: System security and compliance
- **Backup and Recovery**: Data protection and disaster recovery

**Configuration Areas**:
- Business settings (company info, branding)
- Service delivery (SLAs, processes)
- Financial (pricing, billing, payments)
- Technical (integrations, APIs, security)
- Operational (workflows, quality standards)

### 7. Queue Management Page (`/provider/queue`)
**Purpose**: Work queue and task management

**Key Features**:
- **Work Queue**: Prioritized list of pending tasks and requests
- **Task Assignment**: Distribute work among team members
- **Priority Management**: Urgent, standard, and low priority queues
- **Progress Tracking**: Real-time status of all active work
- **SLA Monitoring**: Track adherence to service level agreements
- **Capacity Planning**: Workload distribution and resource allocation

**Queue Categories**:
- New client requests
- Workflow development tasks
- Quality assurance reviews
- Client support tickets
- System maintenance tasks

---

## Design System

### Color Palette
- **Primary**: Indigo (#4F46E5) - Main brand color for buttons, links, and accents
- **Secondary**: Slate (#64748B) - Text and subtle UI elements
- **Success**: Green (#10B981) - Success states and positive actions
- **Warning**: Amber (#F59E0B) - Warnings and caution states
- **Error**: Red (#EF4444) - Error states and destructive actions
- **Background**: White (#FFFFFF) and Light Gray (#F8FAFC)

### Typography
- **Headings**: Inter font family, bold weights (600-700)
- **Body Text**: Inter font family, regular weight (400)
- **UI Elements**: Inter font family, medium weight (500)
- **Code/Data**: Monospace font for technical content

### Component Design Principles
- **Card-based Layout**: Consistent use of cards with subtle shadows
- **Rounded Corners**: 8px border radius for modern appearance
- **Consistent Spacing**: 4px grid system for padding and margins
- **Interactive States**: Hover, focus, and active states for all interactive elements
- **Loading States**: Skeleton screens and progress indicators
- **Error Handling**: Clear error messages and recovery options

### Responsive Design
- **Mobile First**: Designed for mobile devices, enhanced for desktop
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Navigation**: Collapsible sidebar on mobile, persistent on desktop
- **Grid System**: Flexible grid that adapts to screen size

---

## Navigation Structure

### URL Structure

#### Global Pages
- `/` - Landing page
- `/login` - User authentication
- `/signup` - New user registration
- `/forgot-password` - Password recovery
- `/reset-password` - Password reset completion
- `/pending-approval` - Account approval status

#### Client Portal (`/app/*`)
- `/app/dashboard` - Client dashboard and overview
- `/app/create-listings` - Workflow execution and listing generation
- `/app/workflows` - Workflow management and monitoring
- `/app/files` - Generated files and download center
- `/app/team` - Team member and access management
- `/app/settings` - Account configuration and preferences
- `/app/requests/new` - New workflow automation requests

#### Provider Portal (`/provider/*`)
- `/provider/dashboard` - Provider business overview
- `/provider/clients` - Client relationship management
- `/provider/workflows` - Cross-client workflow administration
- `/provider/analytics` - Business intelligence and analytics
- `/provider/team` - Internal team management
- `/provider/settings` - Business configuration and administration
- `/provider/queue` - Work queue and task management

### Navigation Hierarchy

#### Client Navigation (Left Sidebar)
1. **Dashboard** - Overview and quick actions
2. **Create Listings** - Primary workflow execution
3. **Workflows** - Workflow management
4. **Files** - Generated file access
5. **Team** - User management
6. **Settings** - Account configuration

#### Provider Navigation (Left Sidebar)
1. **Dashboard** - Business overview
2. **Clients** - Client management
3. **Workflows** - Workflow administration
4. **Analytics** - Business intelligence
5. **Team** - Internal team management
6. **Settings** - Business configuration
7. **Queue** - Work management

### User Experience Flow

#### New User Journey
1. **Discovery**: Land on homepage, learn about platform
2. **Registration**: Sign up with organization details
3. **Approval**: Wait for account approval (if required)
4. **Onboarding**: Complete profile and initial setup
5. **First Workflow**: Create first automation workflow
6. **Regular Usage**: Ongoing workflow execution and management

#### Existing User Journey
1. **Login**: Authenticate with email/password
2. **Dashboard**: Review overview and recent activity
3. **Task Execution**: Create listings, manage workflows, download files
4. **Administration**: Manage team, configure settings
5. **Monitoring**: Track performance and analytics

This comprehensive documentation provides a complete reference for understanding the Catsy platform's structure, features, and user experience across all user types and scenarios.
