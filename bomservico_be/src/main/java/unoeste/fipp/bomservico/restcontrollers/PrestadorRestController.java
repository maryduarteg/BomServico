package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import unoeste.fipp.bomservico.entities.Anuncio;
import unoeste.fipp.bomservico.services.AnuncioService;

@RestController
@RequestMapping(value = "apis/prestador")
public class PrestadorRestController {
    @Autowired
    private AnuncioService anuncioService;
    @GetMapping(value = "get-anuncio/{id}")
    public ResponseEntity<Object> getAnuncioById(@PathVariable Long id){
        Anuncio anuncio = anuncioService.getAnuncioByID(id);
        if(anuncio!=null)
            return ResponseEntity.ok(anuncio);
        else
            return ResponseEntity.badRequest().body("Erro");
    }
}
