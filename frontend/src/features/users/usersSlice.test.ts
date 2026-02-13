import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer, { fetchUsers, fetchUsersManifest } from './usersSlice';

// ── helpers ────────────────────────────────────────────────────────────

function createStore() {
  return configureStore({ reducer: { users: usersReducer } });
}

type AppStore = ReturnType<typeof createStore>;

const mockEmployees = [
  { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice@test.com', department: 'Engineering', jobTitle: 'Dev', hireDate: '2021-01-01', salary: 90000, active: true },
  { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob@test.com', department: 'HR', jobTitle: 'Manager', hireDate: '2020-06-15', salary: 80000, active: false },
];

const mockManifest = [
  { field: 'id', headerName: 'ID', type: 'number', width: 80, sortable: true, filterable: false, resizable: false, visible: true, order: 0 },
  { field: 'firstName', headerName: 'First Name', type: 'text', sortable: true, filterable: true, resizable: true, visible: true, order: 1 },
];

// ── setup / teardown ───────────────────────────────────────────────────

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ── initial state ──────────────────────────────────────────────────────

describe('usersSlice initial state', () => {
  it('has correct initial values', () => {
    const store = createStore();
    const state = store.getState().users;
    expect(state.users).toEqual([]);
    expect(state.columns).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.columnsLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});

// ── fetchUsers thunk ───────────────────────────────────────────────────

describe('fetchUsers', () => {
  let store: AppStore;

  beforeEach(() => {
    store = createStore();
  });

  it('sets loading to true while pending', () => {
    // fetch never resolves → stays pending
    vi.mocked(fetch).mockReturnValue(new Promise(() => {}));
    store.dispatch(fetchUsers({ userId: 1 }));
    expect(store.getState().users.loading).toBe(true);
    expect(store.getState().users.error).toBeNull();
  });

  it('populates users on success', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockEmployees, timestamp: '' }),
    } as Response);

    await store.dispatch(fetchUsers({}));
    const state = store.getState().users;
    expect(state.loading).toBe(false);
    expect(state.users).toEqual(mockEmployees);
    expect(state.error).toBeNull();
  });

  it('defaults to empty array when data is null', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: null, timestamp: '' }),
    } as Response);

    await store.dispatch(fetchUsers({}));
    expect(store.getState().users.users).toEqual([]);
  });

  it('sets error on HTTP failure', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await store.dispatch(fetchUsers({}));
    const state = store.getState().users;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('HTTP 500');
  });

  it('sets error on network failure', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    await store.dispatch(fetchUsers({}));
    const state = store.getState().users;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Network error');
  });

  it('builds query string with userId', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: [], timestamp: '' }),
    } as Response);

    await store.dispatch(fetchUsers({ userId: 5 }));
    expect(fetch).toHaveBeenCalledWith('/api/users?userId=5');
  });

  it('builds query string with accountId', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: [], timestamp: '' }),
    } as Response);

    await store.dispatch(fetchUsers({ accountId: 'Engineering' }));
    expect(fetch).toHaveBeenCalledWith('/api/users?accountId=Engineering');
  });

  it('builds query string with both params', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: [], timestamp: '' }),
    } as Response);

    await store.dispatch(fetchUsers({ userId: 1, accountId: 'Engineering' }));
    expect(fetch).toHaveBeenCalledWith('/api/users?userId=1&accountId=Engineering');
  });

  it('calls /api/users with no query string when params are empty', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: [], timestamp: '' }),
    } as Response);

    await store.dispatch(fetchUsers({}));
    expect(fetch).toHaveBeenCalledWith('/api/users');
  });
});

// ── fetchUsersManifest thunk ───────────────────────────────────────────

describe('fetchUsersManifest', () => {
  let store: AppStore;

  beforeEach(() => {
    store = createStore();
  });

  it('sets columnsLoading to true while pending', () => {
    vi.mocked(fetch).mockReturnValue(new Promise(() => {}));
    store.dispatch(fetchUsersManifest());
    expect(store.getState().users.columnsLoading).toBe(true);
    expect(store.getState().users.error).toBeNull();
  });

  it('populates columns on success', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockManifest, timestamp: '' }),
    } as Response);

    await store.dispatch(fetchUsersManifest());
    const state = store.getState().users;
    expect(state.columnsLoading).toBe(false);
    expect(state.columns).toEqual(mockManifest);
    expect(state.error).toBeNull();
  });

  it('defaults to empty array when data is null', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: null, timestamp: '' }),
    } as Response);

    await store.dispatch(fetchUsersManifest());
    expect(store.getState().users.columns).toEqual([]);
  });

  it('sets error on HTTP failure', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await store.dispatch(fetchUsersManifest());
    const state = store.getState().users;
    expect(state.columnsLoading).toBe(false);
    expect(state.error).toBe('HTTP 404');
  });

  it('sets error on network failure', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Timeout'));

    await store.dispatch(fetchUsersManifest());
    const state = store.getState().users;
    expect(state.columnsLoading).toBe(false);
    expect(state.error).toBe('Timeout');
  });

  it('calls /api/users/manifest', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: [], timestamp: '' }),
    } as Response);

    await store.dispatch(fetchUsersManifest());
    expect(fetch).toHaveBeenCalledWith('/api/users/manifest');
  });
});
