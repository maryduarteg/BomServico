package unoeste.fipp.bomservico.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="anuncio")
public class Anuncio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "anu_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="usu_login")
    private Usuario usuario;

    @Column(name = "anu_titulo")
    private String titulo;

    @Column(name = "anu_descricao")
    private String descr;

    @Column(name = "anu_diastrabalho")
    private String diasTrab;

    @Column(name = "anu_horarioinicio")
    private String horarioInicioDia;

    @Column(name = "anu_horariofim")
    private String horarioFimDia;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "anu_cat", joinColumns = @JoinColumn(name="anu_id"),
                                                 inverseJoinColumns = @JoinColumn(name="cat_id"))
    private List<Categoria> categoriaList;

    @OneToMany(mappedBy = "anuncio", fetch = FetchType.EAGER)
    private List<Foto> fotoList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public String getDiasTrab() {
        return diasTrab;
    }

    public void setDiasTrab(String diasTrab) {
        this.diasTrab = diasTrab;
    }

    public String getHorarioInicioDia() {
        return horarioInicioDia;
    }

    public void setHorarioInicioDia(String horarioInicioDia) {
        this.horarioInicioDia = horarioInicioDia;
    }

    public String getHorarioFimDia() {
        return horarioFimDia;
    }

    public void setHorarioFimDia(String horarioFimDia) {
        this.horarioFimDia = horarioFimDia;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<Categoria> getCategoriaList() {
        return categoriaList;
    }

    public void setCategoriaList(List<Categoria> categoriaList) {
        this.categoriaList = categoriaList;
    }

    public List<Foto> getFotoList() {
        return fotoList;
    }

    public void setFotoList(List<Foto> fotoList) {
        this.fotoList = fotoList;
    }
}
