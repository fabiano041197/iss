package com.avaliacao.iss.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(
        value = {"criadoEm", "atualizadoEm"},
        allowGetters = true
)

public abstract class Auditoria implements Serializable{
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "criado_em", nullable = false, updatable = false)
	@CreatedDate
	private Date criadoEm;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="atualizado_em", nullable = false)
	@LastModifiedDate 
	private Date atualizadoEm;

	public Date getCriadoEm() {
		return criadoEm;
	}

	public void setCriadoEm(Date criadoEm) {
		this.criadoEm = criadoEm;
	}

	public Date getAtualizadoEm() {
		return atualizadoEm;
	}

	public void setAtualizadoEm(Date atualizadoEm) {
		this.atualizadoEm = atualizadoEm;
	}
}
