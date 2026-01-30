package org.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class HelloWorldTest {

    @Test
    void defaultConstructorSetsDefaultMessage() {
        HelloWorld hw = new HelloWorld();
        assertEquals("Hello, World!", hw.getMessage());
    }

    @Test
    void customConstructorSetsCustomMessage() {
        HelloWorld hw = new HelloWorld("Custom message");
        assertEquals("Custom message", hw.getMessage());
    }

    @Test
    void setMessageUpdatesMessage() {
        HelloWorld hw = new HelloWorld();
        hw.setMessage("Updated message");
        assertEquals("Updated message", hw.getMessage());
    }

    @Test
    void getMessageReturnsCurrentMessage() {
        HelloWorld hw = new HelloWorld("Test");
        assertEquals("Test", hw.getMessage());
    }
}
