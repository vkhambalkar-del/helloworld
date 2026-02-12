import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColDef } from 'ag-grid-community';
import { DataGrid } from '../../components/DataGrid';
import { ColumnManifest, Employee } from '../../types/api';
import { fetchUsers, fetchUsersManifest } from '../../features/users';
import { AppDispatch, RootState } from '../../store';
import styles from './UserList.module.css';

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

export function UserList() {
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

  if (loading || columnsLoading) return <div className={styles.page}>Loading...</div>;
  if (error) return <div className={styles.page}>Error: {error}</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Users</h1>
      <DataGrid<Employee> columnDefs={columnDefs} rowData={users} />
    </div>
  );
}
