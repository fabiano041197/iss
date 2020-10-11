package com.avaliacao.iss.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.avaliacao.iss.exception.ResourceNotFoundException;
import com.avaliacao.iss.model.PessoaTelefone;
import com.avaliacao.iss.repository.PessoaRepository;
import com.avaliacao.iss.repository.PessoaTelefoneRepository;

@RestController
public class PessoaTelefoneController {
	
	@Autowired
	private PessoaTelefoneRepository pessoaTelefoneRepository;
	
	@Autowired
	private PessoaRepository pessoaRepository;
	
	@GetMapping("/pessoas/{pessoaId}/telefones")
	public List<PessoaTelefone> getPessoasTelefonesByPessoaId(@PathVariable Long pessoaId){
		return pessoaTelefoneRepository.findByPessoaId(pessoaId);
	}
	
	@PostMapping("/pessoas/{pessoaId}/telefones")
	public PessoaTelefone addPessoaTelefone(@PathVariable Long pessoaId,
											@Valid @RequestBody PessoaTelefone pessoaTelefone) {
		return pessoaRepository.findById(pessoaId)
                .map(pessoa -> {
                    pessoaTelefone.setPessoa(pessoa);
                    return  pessoaTelefoneRepository.save(pessoaTelefone);
                }).orElseThrow(() -> new ResourceNotFoundException("Pessoa nao encontrada com esse ID"));
	}
	
	@PutMapping("/pessoas/{pessoaId}/telefones/{pessoaTelefoneId}")
	public PessoaTelefone updatePessoaTelefone(@PathVariable Long pessoaId,
											   @PathVariable Long pessoaTelefoneId,
											   @Valid @RequestBody PessoaTelefone pessoaTelefoneRequest) {
		if(!pessoaRepository.existsById(pessoaId)) {
			throw new ResourceNotFoundException("Pessoa nao encontrada!");
		}
		
		return pessoaTelefoneRepository.findById(pessoaId)
				.map(pessoaTelefone -> {
					pessoaTelefone.setPrincipal(pessoaTelefoneRequest.isPrincipal());
					pessoaTelefone.setTelefone(pessoaTelefoneRequest.getTelefone());
					return pessoaTelefoneRepository.save(pessoaTelefone);
				}).orElseThrow(() -> new ResourceNotFoundException("Telefone nao encontrado!"));
	}
	
	@DeleteMapping("/pessoas/{pessoaId}/telefones/{pessoaTelefoneId}")
	public ResponseEntity<?> deletePessoaTelefone(@PathVariable Long pessoaId,
												  @PathVariable Long pessoaTelefoneId) {
		if(!pessoaRepository.existsById(pessoaId)) {
			throw new ResourceNotFoundException("Pessoa nao encontrada!");
		}
		
		return pessoaTelefoneRepository.findById(pessoaTelefoneId)
				.map(pessoaTelefone -> {
					pessoaTelefoneRepository.delete(pessoaTelefone);
					return ResponseEntity.ok().build();
				}).orElseThrow(() -> new ResourceNotFoundException("Telefone nao Encontrado!"));
	}
					
	
}
