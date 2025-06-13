package com.company.enroller.persistence;

import org.hibernate.Session;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PersistenceConfig {

    @Bean
    public Session dbSession(){
        return DatabaseConnector.getInstance().getSession();
    }
}
