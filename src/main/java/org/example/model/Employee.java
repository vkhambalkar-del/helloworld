package org.example.model;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

@Schema(description = "Employee entity")
public class Employee {

    @Schema(description = "Unique identifier", example = "1042")
    private Long id;

    @Schema(description = "First name", example = "Sarah")
    private String firstName;

    @Schema(description = "Last name", example = "Mitchell")
    private String lastName;

    @Schema(description = "Email address", example = "s.mitchell@company.org")
    private String email;

    @Schema(description = "Department", example = "Finance")
    private String department;

    @Schema(description = "Job title", example = "Senior Analyst")
    private String jobTitle;

    @Schema(description = "Hire date", example = "2019-08-12")
    private LocalDate hireDate;

    @Schema(description = "Salary", example = "82500.00")
    private Double salary;

    @Schema(description = "Active status", example = "true")
    private Boolean active;

    public Employee() {
    }

    public Employee(Long id, String firstName, String lastName, String email,
                    String department, String jobTitle, LocalDate hireDate,
                    Double salary, Boolean active) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.department = department;
        this.jobTitle = jobTitle;
        this.hireDate = hireDate;
        this.salary = salary;
        this.active = active;
    }

    public static EmployeeBuilder builder() {
        return new EmployeeBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public LocalDate getHireDate() { return hireDate; }
    public void setHireDate(LocalDate hireDate) { this.hireDate = hireDate; }

    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public static class EmployeeBuilder {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String department;
        private String jobTitle;
        private LocalDate hireDate;
        private Double salary;
        private Boolean active;

        public EmployeeBuilder id(Long id) { this.id = id; return this; }
        public EmployeeBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public EmployeeBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public EmployeeBuilder email(String email) { this.email = email; return this; }
        public EmployeeBuilder department(String department) { this.department = department; return this; }
        public EmployeeBuilder jobTitle(String jobTitle) { this.jobTitle = jobTitle; return this; }
        public EmployeeBuilder hireDate(LocalDate hireDate) { this.hireDate = hireDate; return this; }
        public EmployeeBuilder salary(Double salary) { this.salary = salary; return this; }
        public EmployeeBuilder active(Boolean active) { this.active = active; return this; }

        public Employee build() {
            return new Employee(id, firstName, lastName, email, department, jobTitle, hireDate, salary, active);
        }
    }
}
