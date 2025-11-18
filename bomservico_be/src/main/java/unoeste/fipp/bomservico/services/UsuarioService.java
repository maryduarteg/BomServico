package unoeste.fipp.bomservico.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.bomservico.entities.Categoria;
import unoeste.fipp.bomservico.entities.Usuario;
import unoeste.fipp.bomservico.repositories.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;

    public Usuario alterar(Usuario usuario)
    {
        return usuarioRepository.save(usuario);
    }

    public boolean deletar(String login)
    {
        Usuario usuario;
        usuario=usuarioRepository.findById(login).orElse(null);
        if(usuario!=null){
            usuarioRepository.deleteById(login);
            return true;
        }
        return false;
    }

    public Usuario getByLogin(String login) {
        Usuario usuario;
        usuario=usuarioRepository.findByLogin(login).orElse(null);
        return usuario;
    }

    public List<Usuario> getAll()
    {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> get(String id) {
        return usuarioRepository.findById(id);
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void excluir(String id) {
        usuarioRepository.deleteById(id);
    }
}
