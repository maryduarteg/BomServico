package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.bomservico.entities.Usuario;
import unoeste.fipp.bomservico.repositories.UsuarioRepository;
@CrossOrigin(origins = "*")

@RestController
@RequestMapping("public/login")
public class LoginRestController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<Object> login(
            @RequestParam String login,
            @RequestParam String senha
    ) {
        try {
            Usuario usuario = usuarioRepository.findById(login).orElse(null);

            if (usuario == null || !usuario.getSenha().equals(senha)) {
                return ResponseEntity.badRequest().body("Login ou senha incorretos");
            }

            // Token bem simples para cumprir o trabalho
            String token = "TOKEN_" + usuario.getLogin() + "_OK";

            return ResponseEntity.ok(token);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao processar login");
        }
    }
}
