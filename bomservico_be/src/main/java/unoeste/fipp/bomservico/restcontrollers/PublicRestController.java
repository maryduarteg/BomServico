package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.bomservico.entities.Categoria;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "apis/public")
public class PublicRestController
{
    @GetMapping(value="get-filter")
    ResponseEntity<Object> getByFilter(@PathVariable String filtro)
    {
        return null;
    }
}
