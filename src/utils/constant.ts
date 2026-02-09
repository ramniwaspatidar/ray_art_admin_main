



export const capitalizeWord = (word: string): string => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return LABELS.NOT_AVAILABLE;
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getDateFormat = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const API_ENDPOINTS = {
  // Authentication
  ADMIN_LOGIN: 'admin-auth/login',
  CREATE_ADMIN: '/admin-auth/super/create-admin',
  FORGOT_PASSWORD: 'admin-auth/password/forgot',
  RESET_PASSWORD: 'admin-auth/password/reset',
  CHANGE_PASSWORD: 'admin-auth/password/change',

  // User Management
  GET_USERS: '/admin-auth/admin/users',
  DELETE_ADMIN: '/admin-auth/admin/delete/',
  UPDATE_USER_ROLE: '/admin-auth/admin/update-role/',

  // Dashboard & Analytics
  ADMIN_DASHBOARD_ANALYTICS: '/admin/dashboard/analytics',
  ADMIN_DASHBOARD_QUESTION_SEARCH:
    '/admin/dashboard/questions-searching?questionType=',
  ADMIN_DASHBOARD_SEND_GROUP_EMAIL: '/admin/dashboard/send-mail-group',
  ADMIN_DASHBOARD_FUNNEL_ANALYTICS: '/admin/dashboard/funnel-analytics',

  // Applications
  ADMIN_APPLICATION_RE_ALLOW: '/admin/application/allow-refill',
  ADMIN_APPLICATION_DELETE: '/admin/application/delete-application',

  // Interview Tasks
  ADMIN_INTERVIEW_TASK: '/admin/interview-tasks',
  ADMIN_INTERVIEW_DOWNLOAD_TASKS: '/admin/download-interview-tasks',
  ADMIN_ACCEPT_REJECT_TASK: '/admin/accept-reject-tasks',
  ADMIN_REALLOW_TASK_SUBMISSION: '/admin/reallow-task-submission',
  ADMIN_TASK_BULK_UPLOAD: '/admin/bulk-accept-reject-tasks',
  ADMIN_UPLOAD_FILE: '/upload/file',

  // Interview Retake
  CANCEL_REINTERVIEW_REQUEST: 'admin/reject-retake-interview',
  ACCEPT_REINTERVIEW_REQUEST: 'admin/accept-retake-interview',

  // Human Panel
  ADMIN_HUMAN_PANEL_AVAILABILITY: '/human-panel/availability',
  ADMIN_HUMAN_PANEL_INTERVIEWERS: '/human-panel/interviewers',
  ADMIN_HUMAN_PANEL_AVAILABILITY_ALL: '/human-panel/admin/availability/all',
  ADMIN_HUMAN_PANEL_GENERATE_SLOTS: '/human-panel/slots/generate',
  ADMIN_HUMAN_PANEL_INTERVIEWER_SLOTS: '/human-panel/slots/interviewer',
  ADMIN_PANEL_DELETE_SLOTS: '/human-panel/admin/slots/delete',
  ADMIN_PANEL_UPDATE_SLOTS: '/human-panel/slots/update',
  ADMIN_PANEL_ALL_SLOTS: '/human-panel/admin/slots/all',
  ADMIN_PANEL_EMPTY_SLOTS: '/human-panel/slots/empty',
  ADMIN_PANEL_CREATE_PANEL: '/human-panel/admin/panel/create',
  ADMIN_PANEL_CREATE_SLOT: '/human-panel/slots/create',
  ADMIN_PANEL_DELETE_SLOT_PERMANENT: '/human-panel/slots/delete-permanent',
  ADMIN_SUPPORT_LIST: '/application/zoho/tickets',
  ADMIN_SUPPORT_STATUS: '/application/tickets/',
  ADMIN_EVALUATION: '/human-panel/interviewer/evaluation',

  // Interview Details
  ADMIN_USER_INTERVIEW_PROFILE_DETAILS: '/admin/dashboard/interview-details',
};

export const BUTTONS = {
  // Primary Actions
  ADD: 'Add',
  UPDATE: 'Update',
  DELETE: 'Delete',
  EDIT: 'Edit',
  SAVE: 'Save',
  SUBMIT: 'Submit',
  CANCEL: 'Cancel',
  CLOSE: 'Close',
  VIEW_DETAILS: 'View Details',

  // Secondary Actions
  VIEW: 'View',
  REFRESH: 'Refresh',
  RETRY: 'Retry',
  UPLOAD: 'Upload',
  DOWNLOAD: 'Download',

  // Specific Actions
  ACCEPT: 'Accept',
  REJECT: 'Reject',
  RETAKE: 'Retake',
  ENABLE_RETAKE: 'Enable Retake',
  ALLOW_RE_SUBMISSION: 'Allow Re-submission',

  // File Operations
  CHOOSE_EXCEL: 'Choose Excel',
  UPLOAD_EXCEL: 'Upload Excel',
  DOWNLOAD_EXCEL: 'Download Excel',

  // Modal Actions
  OPEN_NEW_TAB: 'Open in new tab',
  ADD_REMARKS: 'Add Remarks',
  VIEW_SLOTS: 'View Slots',
  VIEW_TASKS: 'View Tasks',

  // Loading States
  PROCESSING: 'Processing...',
  LOADING: 'Loading...',
  DELETING: 'Deleting...',
  UPDATING: 'Updating...',
  SAVING: 'Saving...',
  SAVE_REMARK: 'Save Remarks',
  SUBMITTING: 'Submitting...',

  // User Management
  ADD_USER: 'Add User',
  UPDATE_ROLE: 'Update Role',
  DELETE_USER: 'Delete User',
  SAVE_PERMISSIONS: 'Save Permissions',
  SELECT_ALL: 'Select All',
  CLEAR_ALL: 'Clear All',

  ADD_AVAILABILITY_MOBILE: 'Add Availability',
  ADD_INTERVIEWER_AVAILABILITY: 'Add Interviewer Availability',
  PREVIOUS : 'Previous',
  NEXT : 'Next',
  VIEW_INTERVIEWERS  : 'View Interviewers',
   CREATE_PANEL : ' Create Panel',
   WAITLISTED : 'Waitlist'
};

export const TOAST_MESSAGES = {
  SUCCESS: {
    LOGIN: 'Loggedin successfully Now fill you application',
    OTP_SENT: 'Login code sent to your email!',
    OTP_RESENT: 'OTP resent successfully!',
    OTP_SENT_EMAIL: 'Otp has been send your entered email',
    EMAIL_VERIFIED: 'Email verified successfully!',
    WHATSAPP_VERIFIED: 'WhatsApp number verified successfully!',
    APPLICATION_SUBMITTED: 'Application submitted successfully!',
    FILE_DOWNLOAD: 'File download successfully',
    BULK_UPLOAD: 'Bulk upload successful!',
    REMARKS_SAVED: 'Remarks saved successfully',
    SLOT_UPDATED: 'Slot status updated successfully!',
    SLOT_DELETED: 'Slot deleted successfully!',
  },
  ERROR: {
    FAILED_LOGIN_CODE: 'Failed to send login code. Please try again.',
    INVALID_LOGIN_CODE: 'Invalid login code. Please try again.',
    FAILED_RESEND_CODE: 'Failed to resend code. Please try again.',
    FAILED_CREATE_ACCOUNT: 'Failed to create account. Please try again.',
    ISSUE_SAVING_DATA:
      'There was an issue saving your progress. Please try again.',
    APPLICATION_NOT_FOUND:
      'No application record found. Please start from the beginning.',
    ISSUE_SUBMITTING_APPLICATION:
      'There was an issue submitting your application',
    AUTH_TOKEN_NOT_FOUND: 'Authentication token not found',
    FAILED_TO_LOAD_INTERVIEWERS:
      'Failed to load interviewers. Please try again.',
    FAILED_TO_FETCH_SLOTS: 'Failed to fetch slots',
    FAILED_TO_UPDATE_SLOT: 'Failed to update slot status',
    FAILED_TO_UPDATE_SLOT_RETRY:
      'Failed to update slot status. Please try again.',
    FAILED_TO_DELETE_SLOT: 'Failed to delete slot',
    FAILED_TO_DELETE_SLOT_RETRY: 'Failed to delete slot. Please try again.',
    FAILED_TO_ENABLE_RETAKE: 'Failed to enable task retake',
    USER_ID_INCORRECT: 'UserId Incorrect',
    PANELIST_DATA: 'Failed to fetch panelist data',
  },
  LOADING: {
    UPDATING_SLOT_STATUS: 'Updating slot status...',
    DELETING_SLOT: 'Deleting slot...',
    LOADING_GENERAL: 'Loading...',
  },
  VALIDATION: {
    NO_TASKS_ADDED: 'No tasks added',
    CHOOSE_EXCEL_FIRST: 'Please choose an Excel file first!',
    SELECT_ACTION_REQUIRED: 'Please select an action',
    REJECTION_REASON_REQUIRED: 'Please provide a reason for rejection',
    INTERVIEWER_REQUIRED: 'Interviewer is required',
    DATE_REQUIRED: 'Date is required',
    START_TIME_REQUIRED: 'Start Time is required',
    END_TIME_REQUIRED: 'End Time is required',
  },
  DYNAMIC: {
    SELECTED_FILE: (fileName: string) => `Selected: ${fileName}`,
    TASK_ACCEPTED: (userId: string) =>
      `Task accepted for user ${userId} successfully`,
    TASK_REJECTED: (userId: string) =>
      `Task rejected for user ${userId} successfully`,
    TASK_RETAKE_ENABLED: (userName: string) =>
      `Task retake enabled for ${userName}`,
    FAILED_TO_PROCESS_TASK: (action: string) => `Failed to ${action} task`,
  },
};

export const TABLE_HEADERS = {
  // User Related
  ID: 'ID',
  USER_ID: 'Applicant ID',
  USER_NAME: 'User Name',
  NAME: 'Name',
  EMAIL: 'Email',
  MOBILE: 'Mobile',
  CONTACT: 'Contact',

  // Time Related
  DATE: 'Date',
  TIME: 'Time',
  TIME_SLOT: 'Time Slot',
  START_TIME: 'Start Time',
  END_TIME: 'End Time',
  CREATED: 'Created',

  // Status & Actions
  STATUS: 'Status',
  ACTIONS: 'Actions',
  MESSAGE: 'Message',

  // Specific to Different Modules
  SLOT_ID: 'Slot ID',
  INTERVIEWERS: 'Interviewers',
  CANDIDATE: 'Candidate',
  TASK: 'Task',
  FEEDBACK_REMARKS: 'Feedback/Remarks',
  WAITLIST: 'Waitlist',
  TASKSTATUS: 'Task Status',
  VIEW_DETAILS: 'View Details',
  DOWNLOAD_DETAILS: 'Download Details',
};

export const LABELS = {
  // User Info
  CANDIDATE: 'Candidate:',
  APPLICANT: 'Applicant:',
  USER_ID: 'User ID:',
  APPLICATION_ID: 'Application ID:',
  EMAIL: 'Email:',

  // Form Labels
  SELECT_INTERVIEWER: 'Select Interviewer',
  DATE: 'Date',
  START_TIME: 'Start Time',
  END_TIME: 'End Time',

  // Question Details
  QUESTIONS: 'Questions:',
  DURATION: 'Duration:',
  STATUS: 'Status:',
  RATIONALE: 'Rationale:',
  NOTE: 'Note:',

  // Status Labels
  ACCEPTED: '✓ Accepted',
  REJECTED: '✗ Rejected',
  AVAILABLE: 'Available',
  PANEL_CREATED: 'Panel',
  PANEL_CREATED_FULL: 'Panel-created',

  // Misc
  REQUIRED_FIELD: '*',
  UNKNOWN_CANDIDATE: 'Unknown Candidate',
  UNKNOWN_STATUS: 'Unknown',
  NOT_AVAILABLE: 'N/A',
};

export const PLACEHOLDERS = {
  SELECT_DATE: 'Select date',
  START_TIME: 'e.g., 10:00 AM',
  END_TIME: 'e.g., 05:00 PM',
  LOADING_INTERVIEWERS: 'Loading interviewers...',
  SELECT_INTERVIEWER: 'Select an interviewer',
  UPDATE_STATUS: 'Update Status',
  REJECTION_REASON:
    'Please provide a detailed reason for rejecting the retake request...',
};

export const STATUS_OPTIONS = {
  COMPLETED: 'Completed',
  AVAILABLE: 'Available',
  CANCELLED: 'Cancelled',
  SCHEDULED: 'Scheduled',
  BOOKED: 'Booked',
  BLOCKED: 'Blocked',
};

export const STATUS_COLORS = {
  available: 'bg-green-100 text-green-800 border-green-200',
  booked: 'bg-orange-100 text-orange-800 border-orange-200',
  blocked: 'bg-red-100 text-red-800 border-red-200',
  // scheduled: 'bg-gray-100 text-gray-800 border-gray-200',
  completed: 'bg-purple-100 text-purple-800 border-purple-200',
  // cancelled: 'bg-gray-100 text-gray-800 border-gray-200',

  // completed: 'bg-green-100 text-green-800',
  success: 'bg-green-100 text-green-800',
  finished: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  scheduled: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
  error: 'bg-red-100 text-red-800',
  cancelled: 'bg-red-100 text-red-800',
  'in-progress': 'bg-gray-100 text-gray-800',
  ongoing: 'bg-gray-100 text-gray-800',

  // Application specific statuses
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-gray-100 text-gray-800',
  'under review': 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',

  // Funnel Stage Modal Card Colors (lighter backgrounds for cards)
  blue: 'bg-gray-50 text-gray-600',
  green: 'bg-green-50 text-green-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  purple: 'bg-purple-50 text-purple-600',
  red: 'bg-red-50 text-red-600',

  default: 'bg-gray-50 text-gray-600',
};

export const getStatusColor = (status?: string): string => {
  if (!status) return STATUS_COLORS.default;
  const normalizedStatus = status.toLowerCase();
  return (
    STATUS_COLORS[normalizedStatus as keyof typeof STATUS_COLORS] ||
    STATUS_COLORS.default
  );
};


export const USERS_PAGE = {
  TITLE: 'Applicants',
  DESCRIPTION: 'Manage users and view details',
  NO_USERS_TITLE: 'No users found',
  NO_USERS_MESSAGE: 'Applicants will appear here once registered',

  // Table Headers
  FULL_NAME: 'Full Name',
  CONTACT: 'Contact',

  // Button Labels
  VIEW_PROFILE: 'View Profile',

  // Default Values
  NO_PHONE: 'No phone',

  // Toast Messages
  NO_USERS_ADDED: 'No users added',
};

export const CONTACT_US_PAGE = {
  TITLE: 'Contact Us',
  DESCRIPTION: 'Manage and view all contact us inquiries',
  NO_CONTACTS_TITLE: 'No contact inquiries found',
  NO_CONTACTS_MESSAGE: 'Contact inquiries will appear here once submitted',

  // Table Headers
  CONTACT_ID: 'Contact ID',
  NAME: 'Name',
  EMAIL: 'Email',
  SUBJECT: 'Subject',
  MESSAGE: 'Message',
  CREATED_AT: 'Created At',

  // Button Labels
  VIEW_DETAILS: 'View Details',

  // Toast Messages
  NO_CONTACTS_ADDED: 'No contact inquiries added',
};

export const PRODUCTS_PAGE = {
  TITLE: 'Products',
  DESCRIPTION: 'Manage and view all products',
  NO_PRODUCTS_TITLE: 'No products found',
  NO_PRODUCTS_MESSAGE: 'Products will appear here once added',

  // Table Headers
  PRODUCT_ID: 'Product ID',
  NAME: 'Product Name',
  CATEGORY: 'Category',
  PRICE: 'Price',
  STOCK: 'Stock',
  STATUS: 'Status',

  // Toast Messages
  FETCH_FAILED: 'Failed to fetch products. Please try again.',
};

export const PRODUCT_CATEGORIES = [
  { value: 'Mandala', label: 'Mandala' },
  { value: 'Resin', label: 'Resin' },
  { value: 'Lippan', label: 'Lippan' },
];

export const PRODUCT_SUB_CATEGORIES = {
  Mandala: [
    { value: 'Wall Mandala', label: 'Wall Mandala' },
    { value: 'Table Mandala', label: 'Table Mandala' },
    { value: 'Hanging Mandala', label: 'Hanging Mandala' },
    { value: 'Mandala Coasters', label: 'Mandala Coasters' },
    { value: 'Custom Mandala', label: 'Custom Mandala' },
  ],
  Resin: [
    { value: 'Standard Resin', label: 'Standard Resin' },
  ],
  Lippan: [
    { value: 'Standard Lippan', label: 'Standard Lippan' },
  ],
};



export const USER_MANAGEMENT_PAGE = {
  TITLE: 'User Management',
  DESCRIPTION: 'Manage users and their role-based access permissions',
  MANAGE_ROLES: 'Manage Roles',
  ADD_USER: 'Add User',
  SET_PERMISSIONS: 'Set Permissions',
  REFRESHING: 'Refreshing...',

  // Table Headers
  USER: 'User',
  ROLE: 'Role',
  STATUS: 'Status',
  PERMISSIONS: 'Permissions',

  // Toast Messages
  PERMISSIONS_UPDATED_SUCCESS: 'Permissions updated successfully!',
  PERMISSIONS_UPDATE_FAILED: 'Failed to update permissions. Please try again.',
  ADMIN_DELETED_SUCCESS: 'Admin deleted successfully!',
  AUTH_REQUIRED: 'Authentication required. Please login again.',
  DELETE_ADMIN_FAILED: 'Failed to delete admin. Please try again.',
};

export const CHANGE_PASSWORD_PAGE = {
  TITLE: 'Change Password',
  DESCRIPTION: 'Update your account password',

  // Form Labels
  CURRENT_PASSWORD_LABEL: 'Current Password',
  NEW_PASSWORD_LABEL: 'New Password',
  CONFIRM_PASSWORD_LABEL: 'Confirm New Password',

  // Placeholders
  CURRENT_PASSWORD_PLACEHOLDER: 'Enter your current password',
  NEW_PASSWORD_PLACEHOLDER: 'Enter your new password',
  CONFIRM_PASSWORD_PLACEHOLDER: 'Confirm your new password',

  // Validation Messages
  CURRENT_PASSWORD_REQUIRED: 'Current password is required',
  NEW_PASSWORD_REQUIRED: 'New password is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
  PASSWORD_COMPLEXITY:
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
  NEW_PASSWORD_DIFFERENT:
    'New password must be different from current password',

  // Button Labels
  CHANGING: 'Changing...',
  CHANGE_PASSWORD_BUTTON: 'Change Password',

  // Toast Messages
  AUTH_REQUIRED: 'Authentication required. Please login again.',
  PASSWORD_CHANGED_SUCCESS: 'Password changed successfully!',
  CHANGE_PASSWORD_FAILED: 'Failed to change password. Please try again.',
};


export const ACTIONS_DROPDOWN = {
  // Descriptions for actions
  SUBMIT_EVALUATION_DESCRIPTION: 'Submit your evaluation',
  FINAL_EVALUATION_DESCRIPTION: 'Make final decision',
  CANCEL_SLOT_DESCRIPTION: 'Cancel this slot',

  // Role constants
  INTERVIEWER_ROLE: 'INTERVIEWER',

  // UI Text
  TAKE_ACTION: 'Take Action',
  RESCHEDULE_SLOT_DESCRIPTION: 'Reschedule this slot',
};





export const DELETE_MODAL = {
  TITLE: 'Confirm Delete',
  CONFIRMATION_MESSAGE: (name: string) =>
    `Are you sure you want to delete ${name}? This will permanently remove their account and all associated data.`,
  ERROR_DELETING_USER: 'Error deleting user:',
};



export const SEND_OTP = TOAST_MESSAGES.SUCCESS.OTP_SENT;
export const RESEND_OTP = TOAST_MESSAGES.SUCCESS.OTP_RESENT;
export const OTP_SEND_ENTERED_EMAIL = TOAST_MESSAGES.SUCCESS.OTP_SENT_EMAIL;
export const VERIFY_EMAIL = TOAST_MESSAGES.SUCCESS.EMAIL_VERIFIED;
export const VERIFY_WHATSAPP_NUMBER = TOAST_MESSAGES.SUCCESS.WHATSAPP_VERIFIED;
export const APPLICATION_SUBMITTED =
  TOAST_MESSAGES.SUCCESS.APPLICATION_SUBMITTED;
export const FAILED_TO_SEND_LOGIN_CODE = TOAST_MESSAGES.ERROR.FAILED_LOGIN_CODE;
export const ENVALID_LOGIN_CODE = TOAST_MESSAGES.ERROR.INVALID_LOGIN_CODE;
export const FAILED_TO_RESEND_CODE = TOAST_MESSAGES.ERROR.FAILED_RESEND_CODE;
export const FAILED_TO_CREATE_ACCOUNT =
  TOAST_MESSAGES.ERROR.FAILED_CREATE_ACCOUNT;
export const ISSUE_SAVING_DATA = TOAST_MESSAGES.ERROR.ISSUE_SAVING_DATA;
export const APPLICATION_RECARD_NOT_FOUND =
  TOAST_MESSAGES.ERROR.APPLICATION_NOT_FOUND;
export const ISSUE_SUBMITTING_APPLICATION =
  TOAST_MESSAGES.ERROR.ISSUE_SUBMITTING_APPLICATION;
export const LOGIN_SUCCESSFULL = TOAST_MESSAGES.SUCCESS.LOGIN;
export const LoadingMsg = BUTTONS.LOADING;




export const LOGIN_FORM = {
  // Page Title and Description
  TITLE: 'Admin Login',
  DESCRIPTION: 'Enter your credentials to access the admin panel',

  // Form Labels
  EMAIL_LABEL: 'Email',
  PASSWORD_LABEL: 'Password',

  // Placeholders
  EMAIL_PLACEHOLDER: 'Enter your email',
  PASSWORD_PLACEHOLDER: 'Enter your password',

  // Button Labels
  SIGN_IN: 'Sign In',
  SIGNING_IN: 'Signing In...',
  FORGOT_PASSWORD: 'Forgot your password?',

  // Validation Messages
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please enter a valid email',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',

  // Success Messages
  LOGIN_SUCCESS: 'Login successful!',

  // Error Messages
  LOGIN_FAILED: 'Login failed',
  NO_TOKEN_RECEIVED: 'No token received from server',
  LOGIN_FAILED_RETRY: 'Login failed. Please try again.',

  // Console Messages
  TOKEN_NOT_FOUND_LOG: 'Token not found in response:',
  LOGIN_ERROR_LOG: 'Login error:',
};

export const DISABLED_STYLES = {
  // Consistent disabled styling for buttons
  BUTTON:
    'opacity-60 cursor-not-allowed bg-neutral-200 text-neutral-400 border-neutral-300',

  // Consistent disabled styling for select elements
  SELECT:
    'opacity-60 cursor-not-allowed bg-neutral-100 text-neutral-400 border-neutral-200',

  // Consistent disabled styling for input elements
  INPUT:
    'opacity-60 cursor-not-allowed bg-neutral-100 text-neutral-400 border-neutral-200',

  // Base disabled class that can be combined with other styles
  BASE: 'opacity-60 cursor-not-allowed',
};
export const DATE_FORMAT = "MM/dd/yyyy";
