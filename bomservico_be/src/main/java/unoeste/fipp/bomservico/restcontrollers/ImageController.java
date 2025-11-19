package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import unoeste.fipp.bomservico.entities.Anuncio;
import unoeste.fipp.bomservico.entities.Foto;
import unoeste.fipp.bomservico.repositories.AnuncioRepository;
import unoeste.fipp.bomservico.repositories.FotoRepository;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("apis/image")
public class ImageController {

    @Autowired
    private FotoRepository fotoRepository;

    @Autowired
    private AnuncioRepository anuncioRepository;

    private static final String UPLOAD_DIR = "bomservico_be/src/main/resources/static/uploads/";

    @PostMapping("/add-anuncio-foto")
    public ResponseEntity<Object> uploadFotoAnuncio(
            @RequestParam("foto") MultipartFile file,
            @RequestParam("anuncioId") Long anuncioId) {

        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Arquivo vazio");
            }

            Optional<Anuncio> anuncioOpt = anuncioRepository.findById(anuncioId);
            if (anuncioOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Anúncio não encontrado");
            }

            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Gera nome único: timestamp + nome original
            String nomeArquivoOriginal = file.getOriginalFilename();
            String nomeArquivoSalvo = System.currentTimeMillis() + "_" + nomeArquivoOriginal;
            String caminhoCompleto = UPLOAD_DIR + nomeArquivoSalvo;

            byte[] bytes = file.getBytes();
            Path path = Paths.get(caminhoCompleto);
            Files.write(path, bytes);

            Foto novaFoto = new Foto();
            novaFoto.setAnuncio(anuncioOpt.get());
            novaFoto.setNomeArq("uploads/" + nomeArquivoSalvo);

            fotoRepository.save(novaFoto);

            return ResponseEntity.ok("Foto salva com sucesso: " + nomeArquivoSalvo);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar foto: " + e.getMessage());
        }
    }
}