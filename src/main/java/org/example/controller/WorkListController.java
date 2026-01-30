package org.example.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.common.ApiResponse;
import org.example.model.Worklist;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/worklist")
@Tag(name = "WorkList", description = "WorkList management endpoints")
public class WorkListController {

    @GetMapping
    @Operation(summary = "Get all worklist items", description = "Returns a list of all worklist items")
    public ApiResponse<List<Worklist>> getWorkList() {
        List<Worklist> workList = List.of(
                Worklist.builder()
                        .id(1L)
                        .accountName("7291-CHASE-Q4")
                        .clientName("Morrison & Partners LLC")
                        .build(),
                Worklist.builder()
                        .id(2L)
                        .accountName("8834-WF-RECON")
                        .clientName("Hendricks Manufacturing")
                        .build(),
                Worklist.builder()
                        .id(3L)
                        .accountName("4520-BOA-ADJ")
                        .clientName("Clearwater Logistics")
                        .build(),
                Worklist.builder()
                        .id(4L)
                        .accountName("6103-USB-REVIEW")
                        .clientName("Tanaka Industries")
                        .build(),
                Worklist.builder()
                        .id(5L)
                        .accountName("9047-CITI-PENDING")
                        .clientName("Westbrook Capital")
                        .build()
        );

        return ApiResponse.success(workList);
    }
}
