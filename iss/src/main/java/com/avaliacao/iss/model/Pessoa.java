package com.avaliacao.iss.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "pessoas")
public class Pessoa extends Auditoria{
	@Id
	@GeneratedValue(generator = "pessoa_generator")
	@SequenceGenerator(
			name = "pessoa_generator",
			sequenceName = "pessoa_generator",
			initialValue = 1000
	)
	private Long id;
	
	@NotBlank
	@Size(min = 3, max = 100)
	private String nome;
	
	@Column(columnDefinition = "text")
	private String sobrenome;
	
	@Column(columnDefinition = "text")
	private String cnpj;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}
	
}
