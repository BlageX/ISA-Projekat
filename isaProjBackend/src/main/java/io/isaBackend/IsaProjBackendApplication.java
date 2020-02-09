package io.isaBackend;

import org.joda.time.Days;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.text.SimpleDateFormat;  
import java.util.Date;  

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class IsaProjBackendApplication {

	public static void main(String[] args) throws ParseException {
		SpringApplication.run(IsaProjBackendApplication.class, args);
		
		
	}
}




