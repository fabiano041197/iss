package com.avaliacao.iss.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.avaliacao.iss.exception.ResourceInternalServerErrorException;
import com.avaliacao.iss.model.Usuario;
import com.avaliacao.iss.repository.UsuarioRepository;

import java.util.List;

@RestController
@RequestMapping("usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List < Usuario > listar() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Usuario usuario) {
    	if(usuario.getSenha().length() < 5) {
    		throw new ResourceInternalServerErrorException("Senha precisa conter no mínimo 5 caracteres!");
    	}
    	
    	if(usuarioRepository.findByLogin(usuario.getLogin()) != null) {
    		throw new ResourceInternalServerErrorException("Usuário já cadastrado!");
    	}
    	
    	if(usuario.getLogin().length() < 5) {
    		throw new ResourceInternalServerErrorException("Usuário precisa conter no mínimo 5 caracteres!");
    	}
    	
    	usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(usuarioRepository.saveAndFlush(usuario));
    }
}