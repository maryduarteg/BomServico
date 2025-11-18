package unoeste.fipp.bomservico.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unoeste.fipp.bomservico.entities.Anuncio;
import unoeste.fipp.bomservico.entities.Usuario;

import java.util.List;

@Repository
public interface AnuncioRepository extends JpaRepository<Anuncio, Long> {
    List<Anuncio> findAllByUsuario(Usuario usuario);
}

