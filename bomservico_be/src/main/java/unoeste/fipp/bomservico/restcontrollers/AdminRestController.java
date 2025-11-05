package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import unoeste.fipp.bomservico.entities.Categoria;

@RestController
@RequestMapping(value = "apis/adm")
public class AdminRestController {
    @PostMapping
    ResponseEntity<Object> addCategoria(@RequestBody Categoria categoria)
    {
        return null;
    }
}
