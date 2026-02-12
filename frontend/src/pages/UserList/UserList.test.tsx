import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ColumnManifest } from '../../types/api';
import { buildColDefs, UserList } from './UserList';

// ── buildColDefs unit tests ────────────────────────────────────────────

const sampleManifest: ColumnManifest[] = [
  { field: 'id', headerName: 'ID', type: 'number', width: 80, sortable: true, filterable: false, resizable: false, visible: true, order: 0 },
  { field: 'firstName', headerName: 'First Name', type: 'text', sortable: true, filterable: true, resizable: true, visible: true, order: 1 },
  { field: 'email', headerName: 'Email', type: 'text', flex: 1, sortable: true, filterable: true, resizable: true, visible: true, order: 3 },
  { field: 'salary', headerName: 'Salary', type: 'currency', width: 120, sortable: true, filterable: true, resizable: true, visible: true, order: 7 },
  { field: 'active', headerName: 'Active', type: 'boolean', width: 100, sortable: true, filterable: true, resizable: false, visible: true, order: 8 },
  { field: 'secret', headerName: 'Secret', type: 'text', sortable: false, filterable: false, resizable: false, visible: false, order: 99 },
];

describe('buildColDefs', () => {
  it('filters out non-visible columns', () => {
    const cols = buildColDefs(sampleManifest);
    const fields = cols.map((c) => c.field);
    expect(fields).not.toContain('secret');
  });

  it('sorts columns by order', () => {
    const cols = buildColDefs(sampleManifest);
    const fields = cols.map((c) => c.field);
    expect(fields).toEqual(['id', 'firstName', 'email', 'salary', 'active']);
  });

  it('maps headerName correctly', () => {
    const cols = buildColDefs(sampleManifest);
    expect(cols[0].headerName).toBe('ID');
    expect(cols[1].headerName).toBe('First Name');
  });

  it('sets width when provided', () => {
    const cols = buildColDefs(sampleManifest);
    const idCol = cols.find((c) => c.field === 'id')!;
    expect(idCol.width).toBe(80);
  });

  it('sets flex when provided', () => {
    const cols = buildColDefs(sampleManifest);
    const emailCol = cols.find((c) => c.field === 'email')!;
    expect(emailCol.flex).toBe(1);
    expect(emailCol.width).toBeUndefined();
  });

  it('applies currency valueFormatter for currency type', () => {
    const cols = buildColDefs(sampleManifest);
    const salaryCol = cols.find((c) => c.field === 'salary')!;
    expect(salaryCol.valueFormatter).toBeDefined();
  });

  it('applies cellRenderer for boolean type', () => {
    const cols = buildColDefs(sampleManifest);
    const activeCol = cols.find((c) => c.field === 'active')!;
    expect(activeCol.cellRenderer).toBeDefined();
  });

  it('maps sortable, filter, and resizable flags', () => {
    const cols = buildColDefs(sampleManifest);
    const idCol = cols.find((c) => c.field === 'id')!;
    expect(idCol.sortable).toBe(true);
    expect(idCol.filter).toBe(false);
    expect(idCol.resizable).toBe(false);
  });

  it('returns empty array for empty manifest', () => {
    expect(buildColDefs([])).toEqual([]);
  });
});

// ── UserList component tests ───────────────────────────────────────────

vi.mock('../../components/DataGrid', () => ({
  DataGrid: (props: Record<string, unknown>) => {
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

// Track dispatch calls to verify ordering
const dispatchedTypes: string[] = [];

vi.mock('../../features/users', () => ({
  fetchUsers: () => {
    dispatchedTypes.push('fetchUsers');
    return { type: 'users/fetchUsers/noop' };
  },
  fetchUsersManifest: () => {
    dispatchedTypes.push('fetchUsersManifest');
    return { type: 'users/fetchUsersManifest/noop' };
  },
}));

function createTestStore(overrides: Record<string, unknown> = {}) {
  return configureStore({
    reducer: {
      users: () => ({
        users: [],
        columns: [],
        loading: false,
        columnsLoading: false,
        error: null,
        ...overrides,
      }),
    },
  });
}

describe('UserList', () => {
  beforeEach(() => {
    dispatchedTypes.length = 0;
    vi.restoreAllMocks();
  });

  it('renders loading state when data is loading', () => {
    const store = createTestStore({ loading: true });
    render(
      <Provider store={store}>
        <UserList />
      </Provider>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders loading state when columns are loading', () => {
    const store = createTestStore({ columnsLoading: true });
    render(
      <Provider store={store}>
        <UserList />
      </Provider>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const store = createTestStore({ error: 'Something went wrong' });
    render(
      <Provider store={store}>
        <UserList />
      </Provider>,
    );
    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
  });

  it('renders page title and DataGrid when loaded', () => {
    const store = createTestStore({
      columns: [
        { field: 'id', headerName: 'ID', type: 'number', width: 80, sortable: true, filterable: false, resizable: false, visible: true, order: 0 },
      ],
      users: [{ id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice@test.com', department: 'Eng', jobTitle: 'Dev', hireDate: '2021-01-01', salary: 90000, active: true }],
    });
    render(
      <Provider store={store}>
        <UserList />
      </Provider>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Users');
    expect(screen.getByTestId('data-grid-mock')).toBeInTheDocument();
    expect(screen.getByTestId('row-count')).toHaveTextContent('1');
    expect(screen.getByTestId('col-count')).toHaveTextContent('1');
  });

  it('builds columns from manifest in the store', () => {
    const store = createTestStore({
      columns: sampleManifest,
      users: [],
    });
    render(
      <Provider store={store}>
        <UserList />
      </Provider>,
    );
    // 5 visible columns (secret is hidden)
    expect(screen.getByTestId('col-count')).toHaveTextContent('5');
  });

  it('fetches manifest first and users only after columns are available', () => {
    const store = createTestStore({
      columns: sampleManifest,
      users: [],
    });
    render(
      <Provider store={store}>
        <UserList />
      </Provider>,
    );
    expect(dispatchedTypes[0]).toBe('fetchUsersManifest');
    expect(dispatchedTypes).toContain('fetchUsers');
  });

  it('does not fetch users when columns are empty', () => {
    const store = createTestStore({ columns: [], users: [] });
    render(
      <Provider store={store}>
        <UserList />
      </Provider>,
    );
    expect(dispatchedTypes).toContain('fetchUsersManifest');
    expect(dispatchedTypes).not.toContain('fetchUsers');
  });
});
