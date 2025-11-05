package unoeste.fipp.bomservico;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import unoeste.fipp.bomservico.entities.Anuncio;
import unoeste.fipp.bomservico.services.AnuncioService;

@SpringBootTest
public class AnuncioServiceTest {
    @Autowired
    AnuncioService anuncioService;

    @Test
    void getAnuncioTeste(){
        Anuncio anuncio = anuncioService.getAnuncioByID(1L);
        System.out.println(anuncio.getDescr());
    }
}
