package org.example;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.common.ApiResponse;
import org.example.model.ColumnManifest;
import org.example.model.Employee;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@Tag(name = "HelloWorld", description = "HelloWorld greeting endpoints")
public class HelloWorldController {

    private static final List<ColumnManifest> USER_COLUMNS = loadUserColumns();

    private static List<ColumnManifest> loadUserColumns() {
        try (InputStream is = new ClassPathResource("users-columns.json").getInputStream()) {
            return new ObjectMapper().readValue(is, new TypeReference<>() {});
        } catch (IOException e) {
            throw new IllegalStateException("Failed to load users-columns.json", e);
        }
    }

    private static final List<Employee> DUMMY_USERS = List.of(
            Employee.builder().id(1L).firstName("Alice").lastName("Johnson").email("alice.johnson@example.com").department("Engineering").jobTitle("Software Engineer").hireDate(LocalDate.of(2021, 3, 15)).salary(95000.0).active(true).build(),
            Employee.builder().id(2L).firstName("Bob").lastName("Smith").email("bob.smith@example.com").department("Marketing").jobTitle("Marketing Manager").hireDate(LocalDate.of(2019, 7, 22)).salary(88000.0).active(true).build(),
            Employee.builder().id(3L).firstName("Carol").lastName("Williams").email("carol.williams@example.com").department("Engineering").jobTitle("Senior Developer").hireDate(LocalDate.of(2018, 1, 10)).salary(115000.0).active(true).build(),
            Employee.builder().id(4L).firstName("David").lastName("Brown").email("david.brown@example.com").department("HR").jobTitle("HR Specialist").hireDate(LocalDate.of(2022, 5, 3)).salary(72000.0).active(true).build(),
            Employee.builder().id(5L).firstName("Eva").lastName("Davis").email("eva.davis@example.com").department("Finance").jobTitle("Financial Analyst").hireDate(LocalDate.of(2020, 11, 18)).salary(82000.0).active(false).build(),
            Employee.builder().id(6L).firstName("Frank").lastName("Miller").email("frank.miller@example.com").department("Engineering").jobTitle("DevOps Engineer").hireDate(LocalDate.of(2021, 9, 1)).salary(105000.0).active(true).build(),
            Employee.builder().id(7L).firstName("Grace").lastName("Wilson").email("grace.wilson@example.com").department("Design").jobTitle("UX Designer").hireDate(LocalDate.of(2023, 2, 14)).salary(78000.0).active(true).build(),
            Employee.builder().id(8L).firstName("Henry").lastName("Moore").email("henry.moore@example.com").department("Sales").jobTitle("Sales Representative").hireDate(LocalDate.of(2020, 6, 30)).salary(65000.0).active(true).build(),
            Employee.builder().id(9L).firstName("Iris").lastName("Taylor").email("iris.taylor@example.com").department("Engineering").jobTitle("QA Engineer").hireDate(LocalDate.of(2022, 8, 20)).salary(85000.0).active(true).build(),
            Employee.builder().id(10L).firstName("Jack").lastName("Anderson").email("jack.anderson@example.com").department("Finance").jobTitle("Accountant").hireDate(LocalDate.of(2019, 4, 12)).salary(76000.0).active(false).build()
    );

    @GetMapping("/hello")
    @Operation(summary = "Get default greeting", description = "Returns a default Hello World greeting")
    public ApiResponse<HelloWorld> hello() {
        return ApiResponse.success(new HelloWorld());
    }

    @GetMapping("/hello/{message}")
    @Operation(summary = "Get custom greeting", description = "Returns a greeting with a custom message")
    public ApiResponse<HelloWorld> helloCustom(
            @Parameter(description = "Custom message to include in greeting")
            @PathVariable String message) {
        return ApiResponse.success(new HelloWorld(message));
    }

    @GetMapping("/users")
    @Operation(summary = "Get users", description = "Returns dummy users filtered by optional userId and accountId")
    public ApiResponse<List<Employee>> getUsers(
            @Parameter(description = "Filter by user ID")
            @RequestParam(required = false) Long userId,
            @Parameter(description = "Filter by account/department ID")
            @RequestParam(required = false) String accountId) {

        List<Employee> result = DUMMY_USERS;

        if (userId != null) {
            result = result.stream()
                    .filter(e -> e.getId().equals(userId))
                    .collect(Collectors.toList());
        }

        if (accountId != null) {
            result = result.stream()
                    .filter(e -> e.getDepartment().equalsIgnoreCase(accountId))
                    .collect(Collectors.toList());
        }

        return ApiResponse.success(result);
    }

    @GetMapping("/users/manifest")
    @Operation(summary = "Get users column manifest",
            description = "Returns column configuration metadata for rendering the users grid")
    public ApiResponse<List<ColumnManifest>> getUsersManifest() {
        return ApiResponse.success(USER_COLUMNS);
    }
}
