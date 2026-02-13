import { ColDef } from 'ag-grid-community';
import { DataGrid } from '../../components/DataGrid';
import { Employee } from '../../types/api';
import styles from './UserList.module.css';

export interface UserListProps {
  title: string;
  columnDefs: ColDef<Employee>[];
  rowData: Employee[];
  loading: boolean;
  error: string | null;
}

export function UserList({ title, columnDefs, rowData, loading, error }: UserListProps) {
  if (loading) return <div className={styles.page}>Loading...</div>;
  if (error) return <div className={styles.page}>Error: {error}</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <DataGrid<Employee> columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
}
