package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.bomservico.entities.Anuncio;
import unoeste.fipp.bomservico.entities.Erro;
import unoeste.fipp.bomservico.repositories.AnuncioRepository;

import java.util.Optional;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("public/anuncio")
public class AnuncioRestController {

    @Autowired
    private AnuncioRepository anuncioRepository;

    // GET FILTER
    @GetMapping("get-filter")
    public ResponseEntity<Object> getAll() {
        try {
            return ResponseEntity.ok(anuncioRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao buscar anúncios");
        }
    }

    // GET ONE
    @GetMapping("get-one/{id}")
    public ResponseEntity<Object> getOne(@PathVariable Long id) {
        try {
            Optional<Anuncio> anuncio = anuncioRepository.findById(id);

            if (anuncio.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Anúncio não encontrado");
            }

            return ResponseEntity.ok(anuncio.get());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao buscar anúncio");
        }
    }

    @PostMapping
    public ResponseEntity<Object> inserirAnuncio(@RequestBody Anuncio anuncio)
    {
        if(anuncio!=null){
            try {
                Anuncio novo = anuncioRepository.save(anuncio);
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
                Anuncio novo = anuncioRepository.save(anuncio);
                return ResponseEntity.ok(novo);
            }
            catch (Exception e){
                return ResponseEntity.badRequest().body(new Erro("Erro ao alterar novo anuncio",e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new Erro("Erro ao alterar novo anuncio","anuncio inconsistente"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarAnuncio(@PathVariable Long id) {
        try {
            if (!anuncioRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Anúncio não encontrado");
            }

            anuncioRepository.deleteById(id);

            return ResponseEntity.ok("Anúncio excluído com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao excluir anúncio: " + e.getMessage());
        }
    }
}
