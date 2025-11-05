package unoeste.fipp.bomservico.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "foto")
public class Foto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fot_id")
    private Long id;

    @Column(name = "fot_file")
    private String nomeArq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="anu_id")
    private Anuncio anuncio;

    public Foto(Long id, String nomeArq) {
        this.id = id;
        this.nomeArq = nomeArq;
    }

    public Foto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeArq() {
        return nomeArq;
    }

    public void setNomeArq(String nomeArq) {
        this.nomeArq = nomeArq;
    }
}
