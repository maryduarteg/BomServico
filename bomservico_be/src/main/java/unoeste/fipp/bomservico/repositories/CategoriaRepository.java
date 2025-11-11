package unoeste.fipp.bomservico.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unoeste.fipp.bomservico.entities.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> { }