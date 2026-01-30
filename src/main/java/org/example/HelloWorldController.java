package org.example;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Tag(name = "HelloWorld", description = "HelloWorld greeting endpoints")
public class HelloWorldController {

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
}
