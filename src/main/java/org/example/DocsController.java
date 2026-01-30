package org.example;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DocsController {

    @GetMapping("/docs")
    public String redirectToRedoc() {
        return "redirect:/redoc.html";
    }

    @GetMapping("/")
    public String home() {
        return "redirect:/redoc.html";
    }
}
