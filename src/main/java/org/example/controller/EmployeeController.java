package org.example.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.common.ApiResponse;
import org.example.model.Employee;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/employees")
@Tag(name = "Employee", description = "Employee management endpoints")
public class EmployeeController {

    private final ConcurrentHashMap<Long, Employee> employees = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public EmployeeController() {
        Employee emp1 = Employee.builder()
                .id(idGenerator.getAndIncrement())
                .firstName("Sarah")
                .lastName("Mitchell")
                .email("s.mitchell@company.org")
                .department("Finance")
                .jobTitle("Senior Analyst")
                .hireDate(LocalDate.of(2019, 8, 12))
                .salary(82500.00)
                .active(true)
                .build();
        employees.put(emp1.getId(), emp1);

        Employee emp2 = Employee.builder()
                .id(idGenerator.getAndIncrement())
                .firstName("Marcus")
                .lastName("Chen")
                .email("m.chen@company.org")
                .department("Operations")
                .jobTitle("Project Coordinator")
                .hireDate(LocalDate.of(2021, 3, 1))
                .salary(67000.00)
                .active(true)
                .build();
        employees.put(emp2.getId(), emp2);

        Employee emp3 = Employee.builder()
                .id(idGenerator.getAndIncrement())
                .firstName("Rachel")
                .lastName("Patel")
                .email("r.patel@company.org")
                .department("IT")
                .jobTitle("Systems Administrator")
                .hireDate(LocalDate.of(2020, 11, 15))
                .salary(78000.00)
                .active(true)
                .build();
        employees.put(emp3.getId(), emp3);
    }

    @GetMapping
    @Operation(summary = "Get all employees", description = "Returns a list of all employees")
    public ApiResponse<List<Employee>> getAllEmployees() {
        return ApiResponse.success(new ArrayList<>(employees.values()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get employee by ID", description = "Returns a single employee by ID")
    public ApiResponse<Employee> getEmployeeById(
            @Parameter(description = "Employee ID") @PathVariable Long id) {
        Employee employee = employees.get(id);
        if (employee == null) {
            return ApiResponse.error("Employee not found with id: " + id);
        }
        return ApiResponse.success(employee);
    }

    @PostMapping
    @Operation(summary = "Create employee", description = "Creates a new employee")
    public ApiResponse<Employee> createEmployee(@RequestBody Employee employee) {
        employee.setId(idGenerator.getAndIncrement());
        employees.put(employee.getId(), employee);
        return ApiResponse.created(employee, employee.getId().toString(), "/api/employees/" + employee.getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update employee", description = "Updates an existing employee")
    public ApiResponse<Employee> updateEmployee(
            @Parameter(description = "Employee ID") @PathVariable Long id,
            @RequestBody Employee employee) {
        if (!employees.containsKey(id)) {
            return ApiResponse.error("Employee not found with id: " + id);
        }
        employee.setId(id);
        employees.put(id, employee);
        return ApiResponse.updated(employee, id.toString(), "/api/employees/" + id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete employee", description = "Deletes an employee by ID")
    public ApiResponse<Void> deleteEmployee(
            @Parameter(description = "Employee ID") @PathVariable Long id) {
        if (!employees.containsKey(id)) {
            return ApiResponse.error("Employee not found with id: " + id);
        }
        employees.remove(id);
        return ApiResponse.deleted(id.toString());
    }
}
