package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.bomservico.entities.Categoria;
import unoeste.fipp.bomservico.services.AnuncioService;
import unoeste.fipp.bomservico.services.CategoriaService;

import java.util.Optional;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "apis")
public class AdminRestController {
    @Autowired
    private CategoriaService categoriaService;

    @Autowired
    private AnuncioService anuncioService;

    //Rotas Categoria
    @PostMapping(value = "/adm")
    public ResponseEntity<Object> create(@RequestBody Categoria categoria) {
        if (categoria != null) {
            try {
                categoria = categoriaService.salvar(categoria);
                return ResponseEntity.ok(categoria);
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }

        return ResponseEntity.badRequest().build();
    }

    @PutMapping(value = "/adm")
    public ResponseEntity<Object> update(@RequestBody Categoria categoria) {
        if (categoria != null) {
            try {
                categoria = categoriaService.salvar(categoria);
                return ResponseEntity.ok(categoria);
            } catch (Exception ex) {
                return ResponseEntity.badRequest().build();
            }
        }

        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping(value = "/adm/cat/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        if (id != 0) {
            try {
                categoriaService.excluir(id);
                return ResponseEntity.status(HttpStatus.OK).build();
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping(value = "/get-all-cat")
    public ResponseEntity<Object> list() {
        return ResponseEntity.ok(categoriaService.getAll());
    }

    @GetMapping(value = "/get-cat/{id}")
    public ResponseEntity<Object> read(@PathVariable Long id) {
        if (id != 0) {
            try {
                Optional<Categoria> categoria = categoriaService.get(id);
                if (categoria.isPresent()) {
                    return ResponseEntity.ok(categoria);
                } else {
                    return ResponseEntity.badRequest().build();
                }
            } catch (Exception ex) {
                return ResponseEntity.badRequest().build();
            }
        }

        return ResponseEntity.badRequest().build();
    }

    //Rotas Anuncio
    @DeleteMapping(value = "/adm/anuncio/{id}")
    public ResponseEntity<Object> deleteAnuncio(@PathVariable Long id) {
        if (id != 0) {
            try {
                anuncioService.deleteAnuncio(id);
                return ResponseEntity.status(HttpStatus.OK).build();
            } catch (Exception ex) {
                return ResponseEntity.badRequest().build();
            }
        }

        return ResponseEntity.badRequest().build();
    }
}
