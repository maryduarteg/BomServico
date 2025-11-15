package unoeste.fipp.bomservico.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.bomservico.entities.Interesse;
import unoeste.fipp.bomservico.repositories.InteresseRepository;

import java.util.List;

@Service
public class InteresseService {
    @Autowired
    private InteresseRepository interesseRepository;
    public boolean deletar(Long id)
    {
        Interesse interesse;
        interesse=interesseRepository.findById(id).orElse(null);
        if(interesse!=null){
            interesseRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
