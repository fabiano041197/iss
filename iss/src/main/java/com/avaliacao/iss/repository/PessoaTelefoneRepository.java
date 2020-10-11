package com.avaliacao.iss.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.avaliacao.iss.model.PessoaTelefone;

public interface PessoaTelefoneRepository extends JpaRepository<PessoaTelefone, Long> {
	List<PessoaTelefone> findByPessoaId(Long pessoaId);
}
