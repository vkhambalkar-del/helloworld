package org.example.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.HashMap;
import java.util.Map;

@Schema(description = "Resource metadata for CRUD operations")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResourceMeta {

    @Schema(description = "Resource ID", example = "123")
    private String id;

    @Schema(description = "URI to fetch/access the resource", example = "/api/users/123")
    private String location;

    @Schema(description = "Operation performed", example = "CREATED")
    private String action;

    @Schema(description = "Additional links (HATEOAS-style)", example = "{\"self\": \"/api/users/123\", \"delete\": \"/api/users/123\"}")
    private Map<String, String> links;

    public ResourceMeta() {
    }

    public ResourceMeta(String id, String location, String action) {
        this.id = id;
        this.location = location;
        this.action = action;
    }

    public ResourceMeta addLink(String rel, String href) {
        if (this.links == null) {
            this.links = new HashMap<>();
        }
        this.links.put(rel, href);
        return this;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Map<String, String> getLinks() {
        return links;
    }

    public void setLinks(Map<String, String> links) {
        this.links = links;
    }
}
