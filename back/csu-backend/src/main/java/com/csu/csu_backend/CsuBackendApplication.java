package com.csu.csu_backend;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Data
@EqualsAndHashCode
@ToString
@SpringBootApplication
public class CsuBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CsuBackendApplication.class, args);
	}

}
