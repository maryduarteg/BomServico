package unoeste.fipp.bomservico.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.bomservico.entities.Anuncio;
import unoeste.fipp.bomservico.repositories.AnuncioRepository;

@Service
public class AnuncioService {
    @Autowired
    private AnuncioRepository anuncioRepository;
    public Anuncio getAnuncioByID(Long id){
        Anuncio anuncio=anuncioRepository.findById(id).orElse(null);
        return anuncio;
    }
}
