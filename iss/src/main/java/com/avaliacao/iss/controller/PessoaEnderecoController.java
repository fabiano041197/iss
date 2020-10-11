package com.avaliacao.iss.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.avaliacao.iss.exception.ResourceInternalServerErrorException;
import com.avaliacao.iss.exception.ResourceNotFoundException;
import com.avaliacao.iss.model.Pessoa;
import com.avaliacao.iss.model.PessoaEndereco;
import com.avaliacao.iss.repository.PessoaEnderecoRepository;
import com.avaliacao.iss.repository.PessoaRepository;

import ch.qos.logback.core.joran.conditional.ThenOrElseActionBase;

@RestController
public class PessoaEnderecoController {
	@Autowired
	private PessoaRepository pessoaRepository; 
	
	@Autowired
	private PessoaEnderecoRepository pessoaEnderecoRepository;
	
	@GetMapping("/pessoas/{pessoaId}/enderecos")
	public List<PessoaEndereco> getPessoaEnderecoByPessoaId(@PathVariable Long pessoaId){
		return pessoaEnderecoRepository.findByPessoaId(pessoaId);
	}
	
	@PostMapping("/pessoas/{pessoaId}/enderecos")
	public PessoaEndereco addPessoaEndereco(@PathVariable Long pessoaId,
										 	@Valid @RequestBody PessoaEndereco pessoaEndereco) {

		if(pessoaEndereco.getPrincipal() == true) {
			List<PessoaEndereco> aux = new ArrayList<PessoaEndereco>();
			aux = pessoaEnderecoRepository.findByPessoaId(pessoaId);
			
			for(int i = 0; i < aux.size(); i++){
			    if(aux.get(i).getPrincipal() == true) {
			    	throw new ResourceInternalServerErrorException("Ja existe um endereco principal cadastrado para essa pessoa!");
			    };
			}
		}
		
				
		//Caso nao exista cadastro o endereco
		return pessoaRepository.findById(pessoaId)
				.map(pessoa -> {
					pessoaEndereco.setPessoa(pessoa);
					return pessoaEnderecoRepository.save(pessoaEndereco);
				}).orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + pessoaId));
	}
	
	@PutMapping("/pessoas/{pessoaId}/enderecos/{pessoaEnderecoId}")
	public PessoaEndereco  updatePessoaEndereo(@PathVariable Long pessoaId,
											   @PathVariable Long pessoaEnderecoId,
											   @Valid @RequestBody PessoaEndereco pessoaEnderecoRequest) {
		if(!pessoaRepository.existsById(pessoaId)) {
			throw new ResourceNotFoundException("Pessoa Nao Encontrada ");
		}
		
		return pessoaEnderecoRepository.findById(pessoaEnderecoId)
				.map(pessoaEndereco -> {
					pessoaEndereco.setEndereco(pessoaEnderecoRequest.getEndereco());
					pessoaEndereco.setPrincipal(pessoaEnderecoRequest.getPrincipal());
					return pessoaEnderecoRepository.save(pessoaEndereco);
				}).orElseThrow(() -> new ResourceNotFoundException("Endereco nao encontrado!"));
	}
	
	@DeleteMapping("/pessoas/{pessoaId}/enderecos/{pessoaEnderecoId}")
	public ResponseEntity<?> deletePessoaEndereco(@PathVariable Long pessoaEnderecoId,
												  @PathVariable Long pessoaId){
		if(!pessoaRepository.existsById(pessoaId)) {
			throw new ResourceNotFoundException("Pessoa Nao Encontrada ");
		}
		
		return pessoaEnderecoRepository.findById(pessoaEnderecoId)
				.map(pessoaEndereco -> {
					pessoaEnderecoRepository.delete(pessoaEndereco);
					return ResponseEntity.ok().build();
				}).orElseThrow(() -> new ResourceNotFoundException("Endereco nao encontrado!"));
	}
	
}
