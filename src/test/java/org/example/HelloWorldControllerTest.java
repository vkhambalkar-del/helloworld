package org.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HelloWorldController.class)
class HelloWorldControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void helloEndpointReturnsDefaultMessage() throws Exception {
        mockMvc.perform(get("/api/hello"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.message").value("Hello, World!"));
    }

    @Test
    void helloCustomEndpointReturnsCustomMessage() throws Exception {
        mockMvc.perform(get("/api/hello/CustomGreeting"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.message").value("CustomGreeting"));
    }

    @Test
    void getUsersReturnsAllUsers() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(10)));
    }

    @Test
    void getUsersFiltersByUserId() throws Exception {
        mockMvc.perform(get("/api/users").param("userId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].firstName").value("Alice"));
    }

    @Test
    void getUsersFiltersByAccountId() throws Exception {
        mockMvc.perform(get("/api/users").param("accountId", "Engineering"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(4)));
    }

    @Test
    void getUsersFiltersByBothParams() throws Exception {
        mockMvc.perform(get("/api/users")
                        .param("userId", "3")
                        .param("accountId", "Engineering"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].lastName").value("Williams"));
    }

    @Test
    void getUsersReturnsEmptyForNonexistentUserId() throws Exception {
        mockMvc.perform(get("/api/users").param("userId", "999"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(0)));
    }

    @Test
    void getUsersManifestReturnsAllColumns() throws Exception {
        mockMvc.perform(get("/api/users/manifest"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(9)));
    }

    @Test
    void getUsersManifestContainsExpectedFields() throws Exception {
        mockMvc.perform(get("/api/users/manifest"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].field").value("id"))
                .andExpect(jsonPath("$.data[0].headerName").value("ID"))
                .andExpect(jsonPath("$.data[0].type").value("number"))
                .andExpect(jsonPath("$.data[0].width").value(80))
                .andExpect(jsonPath("$.data[0].sortable").value(true))
                .andExpect(jsonPath("$.data[0].filterable").value(false))
                .andExpect(jsonPath("$.data[0].visible").value(true))
                .andExpect(jsonPath("$.data[0].order").value(0));
    }

    @Test
    void getUsersManifestColumnsAreOrdered() throws Exception {
        mockMvc.perform(get("/api/users/manifest"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].field").value("id"))
                .andExpect(jsonPath("$.data[1].field").value("firstName"))
                .andExpect(jsonPath("$.data[2].field").value("lastName"))
                .andExpect(jsonPath("$.data[3].field").value("email"))
                .andExpect(jsonPath("$.data[4].field").value("department"))
                .andExpect(jsonPath("$.data[5].field").value("jobTitle"))
                .andExpect(jsonPath("$.data[6].field").value("hireDate"))
                .andExpect(jsonPath("$.data[7].field").value("salary"))
                .andExpect(jsonPath("$.data[8].field").value("active"));
    }

    @Test
    void getUsersManifestHasCorrectTypes() throws Exception {
        mockMvc.perform(get("/api/users/manifest"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].type").value("number"))
                .andExpect(jsonPath("$.data[3].type").value("text"))
                .andExpect(jsonPath("$.data[6].type").value("date"))
                .andExpect(jsonPath("$.data[7].type").value("currency"))
                .andExpect(jsonPath("$.data[8].type").value("boolean"));
    }

    @Test
    void getUsersManifestEmailHasFlex() throws Exception {
        mockMvc.perform(get("/api/users/manifest"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[3].field").value("email"))
                .andExpect(jsonPath("$.data[3].flex").value(1))
                .andExpect(jsonPath("$.data[3].width").doesNotExist());
    }
}
