package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.bomservico.entities.Interesse;
import unoeste.fipp.bomservico.repositories.InteresseRepository;
@CrossOrigin(origins = "*")

@RestController
@RequestMapping("public/mensagem")
public class InteresseRestController {

    @Autowired
    private InteresseRepository interesseRepository;

    @PostMapping("{idAnuncio}")
    public ResponseEntity<Object> enviarMensagem(
            @PathVariable Integer idAnuncio,
            @RequestBody Interesse interesse
    ) {
        try {
            interesse.setAnuId(idAnuncio);
            Interesse salvo = interesseRepository.save(interesse);
            return ResponseEntity.ok(salvo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao enviar interesse");
        }
    }
}
