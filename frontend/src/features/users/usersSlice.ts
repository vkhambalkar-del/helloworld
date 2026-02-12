import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiResponse, ColumnManifest, Employee } from '../../types/api';

interface UsersState {
  users: Employee[];
  columns: ColumnManifest[];
  loading: boolean;
  columnsLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  columns: [],
  loading: false,
  columnsLoading: false,
  error: null,
};

export interface FetchUsersParams {
  userId?: number;
  accountId?: string;
}

export const fetchUsers = createAsyncThunk<Employee[], FetchUsersParams>(
  'users/fetchUsers',
  async (params, { rejectWithValue }) => {
    const query = new URLSearchParams();
    if (params.userId != null) query.set('userId', String(params.userId));
    if (params.accountId != null) query.set('accountId', params.accountId);

    const url = `/api/users${query.size > 0 ? `?${query}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) {
      return rejectWithValue(`HTTP ${res.status}`);
    }
    const response: ApiResponse<Employee[]> = await res.json();
    return response.data ?? [];
  },
);

export const fetchUsersManifest = createAsyncThunk<ColumnManifest[], void>(
  'users/fetchUsersManifest',
  async (_, { rejectWithValue }) => {
    const res = await fetch('/api/users/manifest');
    if (!res.ok) {
      return rejectWithValue(`HTTP ${res.status}`);
    }
    const response: ApiResponse<ColumnManifest[]> = await res.json();
    return response.data ?? [];
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? 'Unknown error';
      })
      .addCase(fetchUsersManifest.pending, (state) => {
        state.columnsLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersManifest.fulfilled, (state, action) => {
        state.columnsLoading = false;
        state.columns = action.payload;
      })
      .addCase(fetchUsersManifest.rejected, (state, action) => {
        state.columnsLoading = false;
        state.error = (action.payload as string) ?? action.error.message ?? 'Unknown error';
      });
  },
});

export default usersSlice.reducer;
