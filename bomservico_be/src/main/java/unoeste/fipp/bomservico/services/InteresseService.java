package unoeste.fipp.bomservico.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unoeste.fipp.bomservico.entities.Interesse;
import unoeste.fipp.bomservico.repositories.InteresseRepository;

import java.util.List;
import java.util.Optional;

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

    public List<Interesse> getMensagensDoPrestador(String loginPrestador) {
        return interesseRepository.findByAnuncioUsuarioLogin(loginPrestador);
    }

    public Interesse marcarComoLida(Long idMensagem) throws Exception {
        Optional<Interesse> interesseOpt = interesseRepository.findById(idMensagem);
        if (interesseOpt.isEmpty()) {
            throw new Exception("Mensagem não encontrada.");
        }
        Interesse interesse = interesseOpt.get();
        interesse.setLida(true);
        // Idealmente, verifique se o usuário logado é o dono do anúncio antes de salvar.
        return interesseRepository.save(interesse);
    }

    public boolean deletarSeLida(Long idMensagem) {
        Optional<Interesse> interesseOpt = interesseRepository.findById(idMensagem);

        if (interesseOpt.isPresent()) {
            Interesse interesse = interesseOpt.get();
            // ** REGRA DE NEGÓCIO: SÓ DELETA SE ESTIVER LIDA **
            if (interesse.getLida()) {
                interesseRepository.deleteById(idMensagem); // DELETE FÍSICO
                return true;
            }
        }
        return false; // Não deletou (ou não existe, ou não estava lida)
    }

}
