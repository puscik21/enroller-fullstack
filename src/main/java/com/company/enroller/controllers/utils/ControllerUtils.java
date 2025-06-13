package com.company.enroller.controllers.utils;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

public class ControllerUtils {
    public static URI getLocation(String path, Object uriValue) {
        return ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path(path)
                .buildAndExpand(uriValue)
                .toUri();
    }
}
