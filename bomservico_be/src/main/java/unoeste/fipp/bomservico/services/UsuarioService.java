package unoeste.fipp.bomservico.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.bomservico.entities.Usuario;
import unoeste.fipp.bomservico.repositories.UsuarioRepository;

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
}
