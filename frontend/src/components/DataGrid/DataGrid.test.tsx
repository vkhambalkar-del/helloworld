import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DataGrid } from './DataGrid';

interface TestRow {
  name: string;
  age: number;
}

const columns = [
  { field: 'name' as const, headerName: 'Name' },
  { field: 'age' as const, headerName: 'Age' },
];

const rows: TestRow[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];

// AG Grid requires DOM measurements; mock it to avoid jsdom limitations
vi.mock('ag-grid-react', () => ({
  AgGridReact: (props: Record<string, unknown>) => (
    <div data-testid="ag-grid-mock">
      <span data-testid="ag-grid-row-count">{(props.rowData as unknown[]).length}</span>
      <span data-testid="ag-grid-col-count">
        {(props.columnDefs as unknown[]).length}
      </span>
      {Boolean(props.pagination) && <span data-testid="ag-grid-pagination">true</span>}
      <span data-testid="ag-grid-page-size">{String(props.paginationPageSize)}</span>
    </div>
  ),
}));

describe('DataGrid', () => {
  it('renders the grid container', () => {
    const { container } = render(
      <DataGrid<TestRow> columnDefs={columns} rowData={rows} />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('passes rowData to AgGridReact', () => {
    render(<DataGrid<TestRow> columnDefs={columns} rowData={rows} />);
    expect(screen.getByTestId('ag-grid-row-count')).toHaveTextContent('2');
  });

  it('passes columnDefs to AgGridReact', () => {
    render(<DataGrid<TestRow> columnDefs={columns} rowData={rows} />);
    expect(screen.getByTestId('ag-grid-col-count')).toHaveTextContent('2');
  });

  it('enables pagination by default', () => {
    render(<DataGrid<TestRow> columnDefs={columns} rowData={rows} />);
    expect(screen.getByTestId('ag-grid-pagination')).toBeInTheDocument();
  });

  it('sets default page size to 10', () => {
    render(<DataGrid<TestRow> columnDefs={columns} rowData={rows} />);
    expect(screen.getByTestId('ag-grid-page-size')).toHaveTextContent('10');
  });

  it('forwards extra props to AgGridReact', () => {
    render(
      <DataGrid<TestRow>
        columnDefs={columns}
        rowData={rows}
        paginationPageSize={25}
      />,
    );
    expect(screen.getByTestId('ag-grid-page-size')).toHaveTextContent('25');
  });

  it('renders with empty data', () => {
    render(<DataGrid<TestRow> columnDefs={columns} rowData={[]} />);
    expect(screen.getByTestId('ag-grid-row-count')).toHaveTextContent('0');
  });
});
