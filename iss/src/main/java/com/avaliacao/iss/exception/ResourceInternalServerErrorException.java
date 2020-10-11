package com.avaliacao.iss.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class ResourceInternalServerErrorException extends RuntimeException {
    public ResourceInternalServerErrorException(String message) {
        super(message);
    }
}

