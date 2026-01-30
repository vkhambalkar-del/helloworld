package org.example.model;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Worklist item")
public class Worklist {

    @Schema(description = "Unique identifier", example = "2847")
    private Long id;

    @Schema(description = "Account name", example = "7291-CHASE-Q4")
    private String accountName;

    @Schema(description = "Client name", example = "Morrison & Partners LLC")
    private String clientName;

    public Worklist() {
    }

    public Worklist(Long id, String accountName, String clientName) {
        this.id = id;
        this.accountName = accountName;
        this.clientName = clientName;
    }

    public static WorklistBuilder builder() {
        return new WorklistBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAccountName() { return accountName; }
    public void setAccountName(String accountName) { this.accountName = accountName; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public static class WorklistBuilder {
        private Long id;
        private String accountName;
        private String clientName;

        public WorklistBuilder id(Long id) { this.id = id; return this; }
        public WorklistBuilder accountName(String accountName) { this.accountName = accountName; return this; }
        public WorklistBuilder clientName(String clientName) { this.clientName = clientName; return this; }

        public Worklist build() {
            return new Worklist(id, accountName, clientName);
        }
    }
}
