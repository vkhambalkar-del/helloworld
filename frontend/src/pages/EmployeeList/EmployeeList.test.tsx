import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmployeeList } from './EmployeeList';

// Capture props passed to DataGrid so we can assert on them
let capturedProps: Record<string, unknown> = {};

vi.mock('../../components/DataGrid', () => ({
  DataGrid: (props: Record<string, unknown>) => {
    capturedProps = props;
    const rows = props.rowData as unknown[];
    const cols = props.columnDefs as unknown[];
    return (
      <div data-testid="data-grid-mock">
        <span data-testid="row-count">{rows.length}</span>
        <span data-testid="col-count">{cols.length}</span>
      </div>
    );
  },
}));

describe('EmployeeList', () => {
  beforeEach(() => {
    capturedProps = {};
  });

  it('renders the page title', () => {
    render(<EmployeeList />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Employees');
  });

  it('renders the DataGrid component', () => {
    render(<EmployeeList />);
    expect(screen.getByTestId('data-grid-mock')).toBeInTheDocument();
  });

  it('passes 12 dummy employees to DataGrid', () => {
    render(<EmployeeList />);
    expect(screen.getByTestId('row-count')).toHaveTextContent('12');
  });

  it('passes 9 column definitions to DataGrid', () => {
    render(<EmployeeList />);
    expect(screen.getByTestId('col-count')).toHaveTextContent('9');
  });

  it('includes expected column headers', () => {
    render(<EmployeeList />);
    const cols = capturedProps.columnDefs as { headerName: string }[];
    const headers = cols.map((c) => c.headerName);
    expect(headers).toEqual([
      'ID',
      'First Name',
      'Last Name',
      'Email',
      'Department',
      'Job Title',
      'Hire Date',
      'Salary',
      'Active',
    ]);
  });

  it('employee data has required fields', () => {
    render(<EmployeeList />);
    const rows = capturedProps.rowData as Record<string, unknown>[];
    for (const row of rows) {
      expect(row).toHaveProperty('id');
      expect(row).toHaveProperty('firstName');
      expect(row).toHaveProperty('lastName');
      expect(row).toHaveProperty('email');
      expect(row).toHaveProperty('department');
      expect(row).toHaveProperty('jobTitle');
      expect(row).toHaveProperty('hireDate');
      expect(row).toHaveProperty('salary');
      expect(row).toHaveProperty('active');
    }
  });

  it('all employees have unique ids', () => {
    render(<EmployeeList />);
    const rows = capturedProps.rowData as { id: number }[];
    const ids = rows.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
