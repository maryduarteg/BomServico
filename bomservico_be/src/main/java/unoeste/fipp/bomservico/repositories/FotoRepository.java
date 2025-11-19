package unoeste.fipp.bomservico.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import unoeste.fipp.bomservico.entities.Foto;

public interface FotoRepository extends JpaRepository<Foto, Long> { }