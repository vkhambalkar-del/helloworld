import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeQuartz } from 'ag-grid-community';
import styles from './DataGrid.module.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const theme = themeQuartz;

export interface DataGridProps<TData> extends Omit<AgGridReactProps<TData>, 'theme'> {
  columnDefs: ColDef<TData>[];
  rowData: TData[];
}

export function DataGrid<TData>({ columnDefs, rowData, ...rest }: DataGridProps<TData>) {
  return (
    <div className={styles.container}>
      <AgGridReact<TData>
        theme={theme}
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        {...rest}
      />
    </div>
  );
}
