import { ColDef } from 'ag-grid-community';
import { DataGrid } from '../../components/DataGrid';
import { Employee } from '../../types/api';
import styles from './EmployeeList.module.css';

const columnDefs: ColDef<Employee>[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'First Name' },
  { field: 'lastName', headerName: 'Last Name' },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'department', headerName: 'Department' },
  { field: 'jobTitle', headerName: 'Job Title' },
  { field: 'hireDate', headerName: 'Hire Date', width: 120 },
  {
    field: 'salary',
    headerName: 'Salary',
    width: 120,
    valueFormatter: (params) => params.value != null ? `$${params.value.toLocaleString()}` : '',
  },
  {
    field: 'active',
    headerName: 'Active',
    width: 100,
    cellRenderer: (params: { value: boolean }) => (params.value ? 'Yes' : 'No'),
  },
];

const dummyEmployees: Employee[] = [
  { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', department: 'Engineering', jobTitle: 'Software Engineer', hireDate: '2021-03-15', salary: 95000, active: true },
  { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com', department: 'Marketing', jobTitle: 'Marketing Manager', hireDate: '2019-07-22', salary: 88000, active: true },
  { id: 3, firstName: 'Carol', lastName: 'Williams', email: 'carol.williams@example.com', department: 'Engineering', jobTitle: 'Senior Developer', hireDate: '2018-01-10', salary: 115000, active: true },
  { id: 4, firstName: 'David', lastName: 'Brown', email: 'david.brown@example.com', department: 'HR', jobTitle: 'HR Specialist', hireDate: '2022-05-03', salary: 72000, active: true },
  { id: 5, firstName: 'Eva', lastName: 'Davis', email: 'eva.davis@example.com', department: 'Finance', jobTitle: 'Financial Analyst', hireDate: '2020-11-18', salary: 82000, active: false },
  { id: 6, firstName: 'Frank', lastName: 'Miller', email: 'frank.miller@example.com', department: 'Engineering', jobTitle: 'DevOps Engineer', hireDate: '2021-09-01', salary: 105000, active: true },
  { id: 7, firstName: 'Grace', lastName: 'Wilson', email: 'grace.wilson@example.com', department: 'Design', jobTitle: 'UX Designer', hireDate: '2023-02-14', salary: 78000, active: true },
  { id: 8, firstName: 'Henry', lastName: 'Moore', email: 'henry.moore@example.com', department: 'Sales', jobTitle: 'Sales Representative', hireDate: '2020-06-30', salary: 65000, active: true },
  { id: 9, firstName: 'Iris', lastName: 'Taylor', email: 'iris.taylor@example.com', department: 'Engineering', jobTitle: 'QA Engineer', hireDate: '2022-08-20', salary: 85000, active: true },
  { id: 10, firstName: 'Jack', lastName: 'Anderson', email: 'jack.anderson@example.com', department: 'Finance', jobTitle: 'Accountant', hireDate: '2019-04-12', salary: 76000, active: false },
  { id: 11, firstName: 'Karen', lastName: 'Thomas', email: 'karen.thomas@example.com', department: 'Marketing', jobTitle: 'Content Strategist', hireDate: '2023-01-09', salary: 71000, active: true },
  { id: 12, firstName: 'Leo', lastName: 'Jackson', email: 'leo.jackson@example.com', department: 'Engineering', jobTitle: 'Frontend Developer', hireDate: '2021-12-01', salary: 92000, active: true },
];

export function EmployeeList() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Employees</h1>
      <DataGrid<Employee> columnDefs={columnDefs} rowData={dummyEmployees} />
    </div>
  );
}
