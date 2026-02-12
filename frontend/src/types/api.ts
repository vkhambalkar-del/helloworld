// Base API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: string;
  page?: PageMeta;
  resource?: ResourceMeta;
}

// Pagination metadata
export interface PageMeta {
  current: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// Resource metadata for CRUD operations
export interface ResourceMeta {
  id: string;
  location?: string;
  action: 'CREATED' | 'UPDATED' | 'DELETED';
  links?: Record<string, string>;
}

// Error response
export interface ErrorResponse {
  status: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
  errors?: ValidationError[];
  traceId?: string;
}

// Validation error details
export interface ValidationError {
  field: string;
  rejectedValue?: unknown;
  message: string;
}

// HelloWorld model
export interface HelloWorld {
  message: string;
}

// Employee model
export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  jobTitle: string;
  hireDate: string; // ISO date string (YYYY-MM-DD)
  salary: number;
  active?: boolean;
}

// Column manifest for backend-driven grid configuration
export interface ColumnManifest {
  field: string;
  headerName: string;
  type: 'text' | 'number' | 'currency' | 'date' | 'boolean';
  width?: number;
  flex?: number;
  sortable: boolean;
  filterable: boolean;
  resizable: boolean;
  visible: boolean;
  order: number;
}

// Worklist model
export interface Worklist {
  id?: number;
  accountName: string;
  clientName: string;
}
