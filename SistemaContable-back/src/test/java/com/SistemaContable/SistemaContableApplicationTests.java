package com.SistemaContable;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
		"spring.security.oauth2.client.registration.github.client-id=test",
		"spring.security.oauth2.client.registration.github.client-secret=test",
		"spring.security.oauth2.client.registration.google.client-id=test",
		"spring.security.oauth2.client.registration.google.client-secret=test"
})
class SistemaContableApplicationTests {

	@Test
	void contextLoads() {
	}

}
