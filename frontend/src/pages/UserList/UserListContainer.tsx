import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColDef } from 'ag-grid-community';
import { ColumnManifest, Employee } from '../../types/api';
import { fetchUsers, fetchUsersManifest } from '../../features/users';
import { AppDispatch, RootState } from '../../store';
import { UserList } from './UserList';

export function buildColDefs(columns: ColumnManifest[]): ColDef<Employee>[] {
  return columns
    .filter((col) => col.visible)
    .sort((a, b) => a.order - b.order)
    .map((col) => {
      const def: ColDef<Employee> = {
        field: col.field as keyof Employee,
        headerName: col.headerName,
        sortable: col.sortable,
        filter: col.filterable,
        resizable: col.resizable,
      };

      if (col.width != null) def.width = col.width;
      if (col.flex != null) def.flex = col.flex;

      if (col.type === 'currency') {
        def.valueFormatter = (params) =>
          params.value != null ? `$${params.value.toLocaleString()}` : '';
      }

      if (col.type === 'boolean') {
        def.cellRenderer = (params: { value: boolean }) =>
          params.value ? 'Yes' : 'No';
      }

      return def;
    });
}

export function UserListContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, columns, loading, columnsLoading, error } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsersManifest());
  }, [dispatch]);

  useEffect(() => {
    if (columns.length > 0) {
      dispatch(fetchUsers({ userId: 1, accountId: 'Engineering' }));
    }
  }, [dispatch, columns]);

  const columnDefs = useMemo(() => buildColDefs(columns), [columns]);

  return (
    <UserList
      title="Users"
      columnDefs={columnDefs}
      rowData={users}
      loading={loading || columnsLoading}
      error={error}
    />
  );
}
