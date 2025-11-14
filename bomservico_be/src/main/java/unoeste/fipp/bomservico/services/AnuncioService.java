package unoeste.fipp.bomservico.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.bomservico.entities.Anuncio;
import unoeste.fipp.bomservico.repositories.AnuncioRepository;

import java.util.List;


@Service
public class AnuncioService {
    @Autowired
    private AnuncioRepository anuncioRepository;
    public Anuncio getAnuncioByID(Long id){
        Anuncio anuncio=anuncioRepository.findById(id).orElse(null);
        return anuncio;
    }
    public Anuncio inserirAtualizarAnuncio(Anuncio anuncio)
    {
        anuncio = anuncioRepository.save(anuncio);
        return anuncio;
    }

    public boolean deleteAnuncio(Long id){
        Anuncio anuncio;
        anuncio=anuncioRepository.findById(id).orElse(null);
        if(anuncio!=null){
            anuncioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Anuncio> getAllAnuncios(String login)
    {
        return anuncioRepository.findAllByUsuLogin(login);
    }
    
    public Anuncio getAnuncio(Long id)
    {
        return anuncioRepository.findById(id).orElse(null);
    }



}
