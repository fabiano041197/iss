package com.avaliacao.iss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.avaliacao.iss.model.PessoaEndereco;

import java.util.List;
import java.util.Optional;

public interface PessoaEnderecoRepository extends JpaRepository<PessoaEndereco, Long>{
	List<PessoaEndereco> findByPessoaId(Long pessoaId);
}
