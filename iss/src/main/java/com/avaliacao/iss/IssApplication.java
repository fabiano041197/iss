package com.avaliacao.iss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class IssApplication {

	public static void main(String[] args) {
		SpringApplication.run(IssApplication.class, args);
	}

}
