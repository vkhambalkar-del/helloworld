package org.example.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;

@Schema(description = "Standard API response wrapper")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    @Schema(description = "Indicates if the request was successful", example = "true")
    private boolean success;

    @Schema(description = "Response payload data")
    private T data;

    @Schema(description = "Human-readable message", example = "Operation completed successfully")
    private String message;

    @Schema(description = "Timestamp of the response", example = "2024-01-15T10:30:00Z")
    private Instant timestamp;

    @Schema(description = "Pagination metadata (only present for paginated responses)")
    private PageMeta page;

    @Schema(description = "Resource metadata (for CRUD operations)")
    private ResourceMeta resource;

    public ApiResponse() {
        this.timestamp = Instant.now();
    }

    public ApiResponse(boolean success, T data, String message) {
        this.success = success;
        this.data = data;
        this.message = message;
        this.timestamp = Instant.now();
    }

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null);
    }

    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, data, message);
    }

    public static <T> ApiResponse<T> successPaged(T data, int page, int size, long totalElements) {
        ApiResponse<T> response = new ApiResponse<>(true, data, null);
        response.setPage(new PageMeta(page, size, totalElements));
        return response;
    }

    public static <T> ApiResponse<T> created(T data, String id, String location) {
        ApiResponse<T> response = new ApiResponse<>(true, data, null);
        response.setResource(new ResourceMeta(id, location, "CREATED"));
        return response;
    }

    public static <T> ApiResponse<T> updated(T data, String id, String location) {
        ApiResponse<T> response = new ApiResponse<>(true, data, null);
        response.setResource(new ResourceMeta(id, location, "UPDATED"));
        return response;
    }

    public static <T> ApiResponse<T> deleted(String id) {
        ApiResponse<T> response = new ApiResponse<>(true, null, null);
        response.setResource(new ResourceMeta(id, null, "DELETED"));
        return response;
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, null, message);
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public PageMeta getPage() {
        return page;
    }

    public void setPage(PageMeta page) {
        this.page = page;
    }

    public ResourceMeta getResource() {
        return resource;
    }

    public void setResource(ResourceMeta resource) {
        this.resource = resource;
    }
}
