package unoeste.fipp.bomservico.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="interesse")
public class Interesse {
    @Id
    @Column(name = "int_id")
    private String id;
    @Column(name = "int_nome")
    private String nome;
    @Column(name = "int_fone")
    private String fone;
    @Column(name = "int_email")
    private String email;
    @Column(name = "int_mensagem")
    private String mensagem;
    @Column(name = "anu_id")
    private String anuId;

    public Interesse() {}

    public Interesse(String id, String nome, String fone, String email, String mensagem, String anuId) {
        this.id = id;
        this.nome = nome;
        this.fone = fone;
        this.email = email;
        this.mensagem = mensagem;
        this.anuId = anuId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getFone() {
        return fone;
    }

    public void setFone(String fone) {
        this.fone = fone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getAnuId() {
        return anuId;
    }

    public void setAnuId(String anuId) {
        this.anuId = anuId;
    }
}
