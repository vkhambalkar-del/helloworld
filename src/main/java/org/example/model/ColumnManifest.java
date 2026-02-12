package org.example.model;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Column configuration for frontend grid rendering")
public class ColumnManifest {

    @Schema(description = "Field name mapping to the data property", example = "firstName")
    private String field;

    @Schema(description = "Display header text", example = "First Name")
    private String headerName;

    @Schema(description = "Column type hint for frontend formatting", example = "text",
            allowableValues = {"text", "number", "currency", "date", "boolean"})
    private String type;

    @Schema(description = "Fixed width in pixels (null if flexible)", example = "120")
    private Integer width;

    @Schema(description = "Flex grow factor (null if fixed width)", example = "1")
    private Integer flex;

    @Schema(description = "Whether the column is sortable", example = "true")
    private boolean sortable;

    @Schema(description = "Whether the column is filterable", example = "true")
    private boolean filterable;

    @Schema(description = "Whether the column is resizable", example = "true")
    private boolean resizable;

    @Schema(description = "Whether the column is visible by default", example = "true")
    private boolean visible;

    @Schema(description = "Display order (lower numbers appear first)", example = "0")
    private int order;

    public ColumnManifest() {
    }

    private ColumnManifest(Builder builder) {
        this.field = builder.field;
        this.headerName = builder.headerName;
        this.type = builder.type;
        this.width = builder.width;
        this.flex = builder.flex;
        this.sortable = builder.sortable;
        this.filterable = builder.filterable;
        this.resizable = builder.resizable;
        this.visible = builder.visible;
        this.order = builder.order;
    }

    public static Builder builder() {
        return new Builder();
    }

    public String getField() { return field; }
    public void setField(String field) { this.field = field; }

    public String getHeaderName() { return headerName; }
    public void setHeaderName(String headerName) { this.headerName = headerName; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Integer getWidth() { return width; }
    public void setWidth(Integer width) { this.width = width; }

    public Integer getFlex() { return flex; }
    public void setFlex(Integer flex) { this.flex = flex; }

    public boolean isSortable() { return sortable; }
    public void setSortable(boolean sortable) { this.sortable = sortable; }

    public boolean isFilterable() { return filterable; }
    public void setFilterable(boolean filterable) { this.filterable = filterable; }

    public boolean isResizable() { return resizable; }
    public void setResizable(boolean resizable) { this.resizable = resizable; }

    public boolean isVisible() { return visible; }
    public void setVisible(boolean visible) { this.visible = visible; }

    public int getOrder() { return order; }
    public void setOrder(int order) { this.order = order; }

    public static class Builder {
        private String field;
        private String headerName;
        private String type = "text";
        private Integer width;
        private Integer flex;
        private boolean sortable = true;
        private boolean filterable = true;
        private boolean resizable = true;
        private boolean visible = true;
        private int order;

        public Builder field(String field) { this.field = field; return this; }
        public Builder headerName(String headerName) { this.headerName = headerName; return this; }
        public Builder type(String type) { this.type = type; return this; }
        public Builder width(Integer width) { this.width = width; return this; }
        public Builder flex(Integer flex) { this.flex = flex; return this; }
        public Builder sortable(boolean sortable) { this.sortable = sortable; return this; }
        public Builder filterable(boolean filterable) { this.filterable = filterable; return this; }
        public Builder resizable(boolean resizable) { this.resizable = resizable; return this; }
        public Builder visible(boolean visible) { this.visible = visible; return this; }
        public Builder order(int order) { this.order = order; return this; }

        public ColumnManifest build() {
            return new ColumnManifest(this);
        }
    }
}
