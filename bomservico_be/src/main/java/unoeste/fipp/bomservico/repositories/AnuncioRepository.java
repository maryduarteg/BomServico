package unoeste.fipp.bomservico.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unoeste.fipp.bomservico.entities.Anuncio;

@Repository
public interface AnuncioRepository extends JpaRepository<Anuncio,Long> {
}
