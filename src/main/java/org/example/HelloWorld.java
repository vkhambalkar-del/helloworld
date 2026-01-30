package org.example;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Greeting response object containing a message")
public class HelloWorld {

    @Schema(
            description = "The greeting message",
            example = "Hello, World!",
            minLength = 1,
            maxLength = 100,
            requiredMode = Schema.RequiredMode.REQUIRED
    )
    @NotBlank(message = "Message cannot be blank")
    @Size(min = 1, max = 100, message = "Message must be between 1 and 100 characters")
    private String message;

    public HelloWorld() {
        this.message = "Hello, World!";
    }

    public HelloWorld(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void printMessage() {
        System.out.println(message);
    }
}
