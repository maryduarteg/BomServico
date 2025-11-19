package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.bomservico.entities.Usuario;
import unoeste.fipp.bomservico.repositories.UsuarioRepository;
import unoeste.fipp.bomservico.security.JWTTokenProvider;
import unoeste.fipp.bomservico.services.UsuarioService;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/login")
public class LoginRestController {

    @Autowired
    private UsuarioService usuarioService;
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
            String token = JWTTokenProvider.getToken(usuario.getLogin(), ""+usuario.getNivel());
            System.out.println(token);
            return ResponseEntity.ok(token);

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body("Erro ao processar login");
        }
    }


    /*@PostMapping
    public ResponseEntity<Object> login(@RequestBody Login login){
        //verificar se o login e senha é de um usuario cadastrado
        Usuario usuario=usuarioService.getByLogin(login.getLogin());
        if(usuario.getSenha().equals(login.getSenha())) {
            //caso afirmativoooo
            String token = JWTTokenProvider.getToken(login.getLogin(), "1");
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.badRequest().body("Usuario não cadastrado");
    }*/
}
