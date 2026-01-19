package com.SistemaContable;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SistemaContableApplication {

	public static void main(String[] args){
		environmentLoad();
		SpringApplication.run(SistemaContableApplication.class, args);

	}

	public static void environmentLoad() {
		Dotenv dotenv = Dotenv.configure()
				.ignoreIfMissing()
				.load();

		dotenv.entries().forEach(e -> System.setProperty(e.getKey(), e.getValue()));
	}

}
