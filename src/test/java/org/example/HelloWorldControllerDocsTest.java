package org.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * REST Docs tests for HelloWorldController.
 * These tests generate documentation snippets that are included in the API documentation.
 */
@WebMvcTest(HelloWorldController.class)
@AutoConfigureRestDocs(outputDir = "target/generated-snippets")
class HelloWorldControllerDocsTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldDocumentGetDefaultGreeting() throws Exception {
        mockMvc.perform(get("/api/hello"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.message").value("Hello, World!"))
                .andDo(document("hello-default",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("success").description("Indicates if the request was successful"),
                                fieldWithPath("data").description("Response payload data"),
                                fieldWithPath("data.message").description("The greeting message. Default value is 'Hello, World!'"),
                                fieldWithPath("timestamp").description("Timestamp of the response")
                        )
                ));
    }

    @Test
    void shouldDocumentGetCustomGreeting() throws Exception {
        mockMvc.perform(get("/api/hello/{message}", "Welcome"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.message").value("Welcome"))
                .andDo(document("hello-custom",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("message")
                                        .description("Custom message to use as the greeting. Must be between 1-100 characters.")
                        ),
                        responseFields(
                                fieldWithPath("success").description("Indicates if the request was successful"),
                                fieldWithPath("data").description("Response payload data"),
                                fieldWithPath("data.message").description("The custom greeting message provided in the path parameter"),
                                fieldWithPath("timestamp").description("Timestamp of the response")
                        )
                ));
    }

    @Test
    void shouldDocumentGetCustomGreetingWithSpecialCharacters() throws Exception {
        mockMvc.perform(get("/api/hello/{message}", "Hello from API!"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.message").value("Hello from API!"))
                .andDo(document("hello-custom-special",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("message")
                                        .description("Custom message that can include special characters and spaces")
                        ),
                        responseFields(
                                fieldWithPath("success").description("Indicates if the request was successful"),
                                fieldWithPath("data").description("Response payload data"),
                                fieldWithPath("data.message").description("The greeting message echoing the input with special characters preserved"),
                                fieldWithPath("timestamp").description("Timestamp of the response")
                        )
                ));
    }
}
