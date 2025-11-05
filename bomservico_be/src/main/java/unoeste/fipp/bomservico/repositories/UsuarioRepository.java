package unoeste.fipp.bomservico.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unoeste.fipp.bomservico.entities.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,String> {
}
