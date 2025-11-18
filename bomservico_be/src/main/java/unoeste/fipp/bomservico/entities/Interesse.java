package unoeste.fipp.bomservico.entities;

import jakarta.persistence.*;

@Entity
@Table(name="interesse")
public class Interesse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "int_id")
    private Integer id;

    @Column(name = "int_nome")
    private String nome;

    @Column(name = "int_fone")
    private String fone;

    @Column(name = "int_email")
    private String email;

    @Column(name = "int_mensagem")
    private String mensagem;

    @Transient
    @Column(name = "anu_id")
    private Integer anuId;

    @ManyToOne
    @JoinColumn(name = "anu_id")
    private Anuncio anuncio;

    @Column(name = "int_lida")
    private Boolean lida = false;

    public Interesse() {}

    public Interesse(Integer id, String nome, String fone, String email, String mensagem, Integer anuId) {
        this.id = id;
        this.nome = nome;
        this.fone = fone;
        this.email = email;
        this.mensagem = mensagem;
        this.anuId = anuId;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getFone() { return fone; }
    public void setFone(String fone) { this.fone = fone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }

    public Integer getAnuId() { return anuId; }
    public void setAnuId(Integer anuId) { this.anuId = anuId; }

    public Anuncio getAnuncio() { return anuncio; }
    public void setAnuncio(Anuncio anuncio) { this.anuncio = anuncio; }

    public Boolean getLida() { return lida; }
    public void setLida(Boolean lida) { this.lida = lida; }
}
