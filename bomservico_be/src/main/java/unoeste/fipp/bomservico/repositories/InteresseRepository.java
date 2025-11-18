package unoeste.fipp.bomservico.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unoeste.fipp.bomservico.entities.Interesse;

import java.util.List;

@Repository
public interface InteresseRepository extends JpaRepository<Interesse, Long> {

    List<Interesse> findByAnuncioUsuarioLogin(String loginPrestador);
}
