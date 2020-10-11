package com.avaliacao.iss.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

import com.avaliacao.iss.exception.ResourceInternalServerErrorException;
import com.avaliacao.iss.exception.ResourceNotFoundException;
import com.avaliacao.iss.model.Pessoa;
import com.avaliacao.iss.repository.PessoaRepository;

@RestController
public class PessoaController {

	@Autowired
	private PessoaRepository pessoaRepository;
	
	@GetMapping("/pessoas")
	public Page<Pessoa> getPessoas(Pageable pageable) {
		return pessoaRepository.findAll(pageable);
	}
	
	@GetMapping("/pessoas/{pessoaId}")
	public Pessoa getPessoa(@PathVariable Long pessoaId) {
		return pessoaRepository.findById(pessoaId)
				.map(pessoa -> {
					return pessoa; 
				}).orElseThrow(() -> new ResourceNotFoundException("Registro nao encontrado"));
	}
	
	@PostMapping("/pessoas")
	public Pessoa createPessoa(@Valid @RequestBody Pessoa pessoa) {		
		if(pessoaRepository.findByCnpj(pessoa.getCnpj()) != null) {
			throw new ResourceInternalServerErrorException("Já existe uma pessoa cadastrada com esse Cnpj!");
		}
		
		return pessoaRepository.save(pessoa);
	}
	
	@PutMapping("/pessoas/{pessoaId}")
	public Pessoa updatePessoa(@PathVariable Long pessoaId, 
							  @Valid @RequestBody Pessoa pessoaRequest) {
		return pessoaRepository.findById(pessoaId)
				.map(pessoa -> {
					pessoa.setNome(pessoaRequest.getNome());
					pessoa.setSobrenome(pessoaRequest.getSobrenome());
					pessoa.setCnpj(pessoaRequest.getCnpj());
					return pessoaRepository.save(pessoa);
				}).orElseThrow(()-> new ResourceNotFoundException("Pessoa nao encontrada!"));
	}
	
	@DeleteMapping("/pessoas/{pessoaId}")
    public ResponseEntity<?> deletePessoa(@PathVariable Long pessoaId) {
        return pessoaRepository.findById(pessoaId)
                .map(pessoa -> {
                	pessoaRepository.delete(pessoa);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + pessoaId));
    }
}
