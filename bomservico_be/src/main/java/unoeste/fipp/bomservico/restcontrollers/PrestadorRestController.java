package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.bomservico.entities.Anuncio;
import unoeste.fipp.bomservico.entities.Categoria;
import unoeste.fipp.bomservico.entities.Erro;
import unoeste.fipp.bomservico.entities.Interesse;
import unoeste.fipp.bomservico.entities.Usuario;
import unoeste.fipp.bomservico.services.AnuncioService;
import unoeste.fipp.bomservico.services.CategoriaService;
import unoeste.fipp.bomservico.services.InteresseService;
import unoeste.fipp.bomservico.services.UsuarioService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "apis/prestador")
public class PrestadorRestController {

    @Autowired
    private AnuncioService anuncioService;
    @Autowired
    private CategoriaService categoriaService;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private InteresseService interesseService;

    @GetMapping(value = "get-anuncio/{id}")
    public ResponseEntity<Object> getAnuncioById(@PathVariable Long id){
        Anuncio anuncio = anuncioService.getAnuncio(id);
        if(anuncio!=null)
            return ResponseEntity.ok(anuncio);
        else
            return ResponseEntity.badRequest().body(new Erro("Anúncio não encontrado", "Erro"));
    }

    @GetMapping(value = "get-all-cat")
    public ResponseEntity<Object> getAllCat(){
        List<Categoria> categorias = categoriaService.getAll();
        if(categorias!=null)
            return ResponseEntity.ok(categorias);
        else
            return ResponseEntity.badRequest().body(new Erro("Nenhuma categoria encontrada", "Erro"));
    }

    @GetMapping(value = "perfil/{login}")
    public ResponseEntity<Object> getPerfilPrestador(@PathVariable String login){
        Usuario usuario = usuarioService.get(login).orElse(null);

        if (usuario == null || usuario.getNivel() != 1) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Erro("Acesso negado", "Usuário não é um prestador ou não encontrado."));
        }
        return ResponseEntity.ok(usuario);
    }

    @GetMapping(value = "meus-anuncios/{login}")
    public ResponseEntity<Object> getAnunciosDoPrestador(@PathVariable String login){
        Usuario prestador = usuarioService.get(login).orElse(null);
        if (prestador == null || prestador.getNivel() != 1) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Erro("Acesso negado", "Usuário não é prestador."));
        }

        List<Anuncio> anuncios = anuncioService.getAllAnuncios(prestador);
        return ResponseEntity.ok(anuncios);
    }

    @GetMapping(value = "mensagens/{login}")
    public ResponseEntity<Object> getMensagensRecebidas(@PathVariable String login){
        Usuario prestador = usuarioService.get(login).orElse(null);
        if (prestador == null || prestador.getNivel() != 1) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Erro("Acesso negado", "Usuário não é prestador."));
        }

        try {
            List<Interesse> mensagens = interesseService.getMensagensDoPrestador(login);

            return ResponseEntity.ok(Optional.ofNullable(mensagens).orElse(List.of()));


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Erro("Erro ao buscar mensagens", e.getMessage()));
        }
    }

    @PutMapping
    public ResponseEntity<Object> alterarUsuario(@RequestBody Usuario usuario)
    {
        if(usuario!=null){
            // Verifica se o usuário é prestador (Nível 1)
            Usuario existente = usuarioService.get(usuario.getLogin()).orElse(null);
            if (existente == null || existente.getNivel() != 1) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Erro("Acesso negado", "Apenas prestadores podem alterar o perfil."));
            }

            try {
                // Garante que o nível de acesso não seja alterado
                usuario.setNivel(1);
                Usuario novo = usuarioService.alterar(usuario);
                return ResponseEntity.ok(novo);
            }
            catch (Exception e){
                return ResponseEntity.badRequest().body(new Erro("Erro ao alterar usuário",e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new Erro("Erro ao alterar usuário","Usuário inconsistente"));
    }

    @PutMapping(value = "mensagem/marcar-lida/{idMensagem}")
    public ResponseEntity<Object> marcarComoLida(@PathVariable Long idMensagem){
        try {
            Interesse atualizada = interesseService.marcarComoLida(idMensagem);
            return ResponseEntity.ok(atualizada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Erro("Erro ao marcar como lida", e.getMessage()));
        }
    }

    @DeleteMapping(value="/{id}")
    ResponseEntity<Object> deleteAnuncio(@PathVariable Long id)
    {
        if(anuncioService.deleteAnuncio(id))
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.badRequest().body(new Erro("Anuncio não existe",""));
    }

    @DeleteMapping(value="/mensagem/{id}")
    ResponseEntity<Object> deletarMensagemSeLida(@PathVariable Long id)
    {
        try {
            // Executa a regra de negócio: DELETE FÍSICO APENAS SE int_lida = true
            if(interesseService.deletarSeLida(id))
                return ResponseEntity.noContent().build();
            else
                return ResponseEntity.badRequest().body(new Erro("Mensagem não pode ser excluída", "A mensagem não foi encontrada ou ainda não foi marcada como lida."));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Erro("Erro ao tentar excluir mensagem", e.getMessage()));
        }
    }
}