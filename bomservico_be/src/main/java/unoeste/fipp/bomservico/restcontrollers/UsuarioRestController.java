package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.bomservico.entities.Usuario;
import unoeste.fipp.bomservico.repositories.UsuarioRepository;

import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping(value = "apis/usuario")
public class UsuarioRestController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    //Rotas usuario
    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Usuario usuario) {
        if (usuario != null) {
            try {
                usuario = usuarioRepository.save(usuario);
                return ResponseEntity.ok(usuario);
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }

        return ResponseEntity.badRequest().build();
    }

    @PutMapping
    public ResponseEntity<Object> update(@RequestBody Usuario usuario) {
        if (usuario == null || usuario.getLogin() == null || usuario.getLogin().isEmpty()) {
            return ResponseEntity.badRequest().body("ID inválido");
        }

        Optional<Usuario> existente = usuarioRepository.findById(usuario.getLogin());
        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        try {
            Usuario atualizado = usuarioRepository.save(usuario);
            return ResponseEntity.ok(atualizado);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar");
        }
    }

    @DeleteMapping(value = "/{str}")
    public ResponseEntity<Object> delete(@PathVariable String str) {
        if (!Objects.equals(str, "")) {
            try {
                usuarioRepository.deleteById(str);
                return ResponseEntity.status(HttpStatus.OK).build();
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping(value = "get-all")
    public ResponseEntity<Object> list() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @GetMapping(value = "/{str}")
    public ResponseEntity<Object> read(@PathVariable String str) {
        if (!Objects.equals(str, "")) {
            try {
                Optional<Usuario> usuario = usuarioRepository.findById(str);
                if (usuario.isPresent()) {
                    return ResponseEntity.ok(usuario);
                } else {
                    return ResponseEntity.badRequest().build();
                }
            } catch (Exception ex) {
                return ResponseEntity.badRequest().build();
            }
        }

        return ResponseEntity.badRequest().build();
    }
}
