package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.bomservico.entities.Anuncio;
import unoeste.fipp.bomservico.entities.Categoria;
import unoeste.fipp.bomservico.entities.Erro;
import unoeste.fipp.bomservico.entities.Usuario;
import unoeste.fipp.bomservico.services.AnuncioService;
import unoeste.fipp.bomservico.services.CategoriaService;
import unoeste.fipp.bomservico.services.InteresseService;
import unoeste.fipp.bomservico.services.UsuarioService;

import java.util.List;

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
            return ResponseEntity.badRequest().body("Erro");
    }

    @GetMapping(value = "get-anuncios/{login}")
    public ResponseEntity<Object> getAnuncioByLogin(@PathVariable String login){
        List<Anuncio> anuncio = anuncioService.getAllAnuncios(login);
        if(anuncio!=null)
            return ResponseEntity.ok(anuncio);
        else
            return ResponseEntity.badRequest().body("Erro");
    }

    @GetMapping(value = "get-all-cat")
    public ResponseEntity<Object> getAllCat(){
        List<Categoria> categorias = categoriaService.getAll();
        if(categorias!=null)
            return ResponseEntity.ok(categorias);
        else
            return ResponseEntity.badRequest().body("Erro");
    }

    @PostMapping
    public ResponseEntity<Object> inserirAnuncio(@RequestBody Anuncio anuncio)
    {
        if(anuncio!=null){
            try {
                Anuncio novo = anuncioService.inserirAtualizarAnuncio(anuncio);
                return ResponseEntity.ok(novo);
            }
            catch (Exception e){
                return ResponseEntity.badRequest().body(new Erro("Erro ao inserir novo anuncio",e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new Erro("Erro ao inserir novo anuncio","anuncio inconsistente"));
    }

    @PutMapping
    public ResponseEntity<Object> alterarAnuncio(@RequestBody Anuncio anuncio)
    {
        if(anuncio!=null){
            try {
                Anuncio novo = anuncioService.inserirAtualizarAnuncio(anuncio);
                return ResponseEntity.ok(novo);
            }
            catch (Exception e){
                return ResponseEntity.badRequest().body(new Erro("Erro ao alterar novo anuncio",e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new Erro("Erro ao alterar novo anuncio","anuncio inconsistente"));
    }

    @PutMapping
    public ResponseEntity<Object> alterarUsuario(@RequestBody Usuario usuario)
    {
        if(usuario!=null){
            try {
                Usuario novo = usuarioService.alterar(usuario);
                return ResponseEntity.ok(novo);
            }
            catch (Exception e){
                return ResponseEntity.badRequest().body(new Erro("Erro ao alterar novo anuncio",e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new Erro("Erro ao alterar novo anuncio","anuncio inconsistente"));
    }

    @DeleteMapping(value="/{id}")
    ResponseEntity<Object> deleteUser(@PathVariable Long id)
    {
        if(anuncioService.deleteAnuncio(id))
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.badRequest().body(new Erro("Anuncio não existe",""));
    }

    @DeleteMapping(value="/menagem/{id}")
    ResponseEntity<Object> deleteMensagem(@PathVariable Long id)
    {
        if(interesseService.deletar(id))
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.badRequest().body(new Erro("Interesse não existe",""));
    }



}
