import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserList } from './UserList';
import { Employee } from '../../types/api';
import { ColDef } from 'ag-grid-community';

// Capture props passed to DataGrid
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

const sampleColumns: ColDef<Employee>[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'First Name' },
  { field: 'email', headerName: 'Email', flex: 1 },
];

const sampleUsers: Employee[] = [
  { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice@test.com', department: 'Eng', jobTitle: 'Dev', hireDate: '2021-01-01', salary: 90000, active: true },
  { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob@test.com', department: 'HR', jobTitle: 'Manager', hireDate: '2020-06-15', salary: 80000, active: false },
];

describe('UserList', () => {
  beforeEach(() => {
    capturedProps = {};
  });

  it('renders loading state when loading is true', () => {
    render(
      <UserList title="Users" columnDefs={sampleColumns} rowData={[]} loading={true} error={null} />,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('data-grid-mock')).not.toBeInTheDocument();
  });

  it('renders error state when error is provided', () => {
    render(
      <UserList title="Users" columnDefs={sampleColumns} rowData={[]} loading={false} error="Something went wrong" />,
    );
    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
    expect(screen.queryByTestId('data-grid-mock')).not.toBeInTheDocument();
  });

  it('shows loading over grid when both loading is true and error is set', () => {
    render(
      <UserList title="Users" columnDefs={sampleColumns} rowData={[]} loading={true} error="fail" />,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('data-grid-mock')).not.toBeInTheDocument();
  });

  it('renders the title from props', () => {
    render(
      <UserList title="My Custom Title" columnDefs={sampleColumns} rowData={sampleUsers} loading={false} error={null} />,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Custom Title');
  });

  it('renders the DataGrid component when loaded', () => {
    render(
      <UserList title="Users" columnDefs={sampleColumns} rowData={sampleUsers} loading={false} error={null} />,
    );
    expect(screen.getByTestId('data-grid-mock')).toBeInTheDocument();
  });

  it('passes rowData to DataGrid', () => {
    render(
      <UserList title="Users" columnDefs={sampleColumns} rowData={sampleUsers} loading={false} error={null} />,
    );
    expect(screen.getByTestId('row-count')).toHaveTextContent('2');
    expect(capturedProps.rowData).toBe(sampleUsers);
  });

  it('passes columnDefs to DataGrid', () => {
    render(
      <UserList title="Users" columnDefs={sampleColumns} rowData={sampleUsers} loading={false} error={null} />,
    );
    expect(screen.getByTestId('col-count')).toHaveTextContent('3');
    expect(capturedProps.columnDefs).toBe(sampleColumns);
  });

  it('renders with empty row data', () => {
    render(
      <UserList title="Users" columnDefs={sampleColumns} rowData={[]} loading={false} error={null} />,
    );
    expect(screen.getByTestId('row-count')).toHaveTextContent('0');
  });

  it('renders with empty column definitions', () => {
    render(
      <UserList title="Users" columnDefs={[]} rowData={sampleUsers} loading={false} error={null} />,
    );
    expect(screen.getByTestId('col-count')).toHaveTextContent('0');
  });
});
