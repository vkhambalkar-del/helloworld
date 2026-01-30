package org.example.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Field-level validation error details")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ValidationError {

    @Schema(description = "Name of the field that failed validation", example = "email")
    private String field;

    @Schema(description = "The rejected value that failed validation", example = "invalid-email")
    private Object rejectedValue;

    @Schema(description = "Validation error message", example = "must be a valid email address")
    private String message;

    public ValidationError() {
    }

    public ValidationError(String field, String message) {
        this.field = field;
        this.message = message;
    }

    public ValidationError(String field, Object rejectedValue, String message) {
        this.field = field;
        this.rejectedValue = rejectedValue;
        this.message = message;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public Object getRejectedValue() {
        return rejectedValue;
    }

    public void setRejectedValue(Object rejectedValue) {
        this.rejectedValue = rejectedValue;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
