package tn.ironbyte.ironbyteintern;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class IronByteInternApplication {

    public static void main(String[] args) {
        SpringApplication.run(IronByteInternApplication.class, args);
    }

}