package unoeste.fipp.bomservico.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="usuario")
public class Usuario {
    @Id
    @Column(name = "usu_login")
    private String login;
    @Column(name = "usu_senha")
    private String senha;
    @Column(name = "usu_nivel")
    private int nivel;
    @Column(name = "usu_nome")
    private String nome;
    @Column(name = "usu_cpf")
    private String cpf;
    @Column(name = "usu_dtnascimento")
    private LocalDate dtNasc;
    @Column(name = "usu_email")
    private String email;
    @Column(name = "usu_telefone")
    private String telefone;
    @Column(name = "usu_endereco")
    private String endereco;

    public Usuario() {
        this("","",0,"","",LocalDate.now(),"","","");
    }

    public Usuario(String login, String senha, int nivel, String nome, String cpf, LocalDate dtNasc, String email, String telefone, String endereco) {
        this.login = login;
        this.senha = senha;
        this.nivel = nivel;
        this.nome = nome;
        this.cpf = cpf;
        this.dtNasc = dtNasc;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public int getNivel() {
        return nivel;
    }

    public void setNivel(int nivel) {
        this.nivel = nivel;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDtNasc() {
        return dtNasc;
    }

    public void setDtNasc(LocalDate dtNasc) {
        this.dtNasc = dtNasc;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
}
