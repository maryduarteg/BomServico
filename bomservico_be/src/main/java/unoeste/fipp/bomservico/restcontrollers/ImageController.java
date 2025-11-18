package unoeste.fipp.bomservico.restcontrollers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("apis/image")
public class ImageController {
    static private final String UPLOAD_FOLDER = "src/main/resources/static/uploads/";

    @PostMapping(value = "/add-user")
    public ResponseEntity<Object> addUsuario(@RequestParam("foto") MultipartFile file, @RequestParam("nome") String nome) {
        final String UPLOAD_FOLDER = "src/main/resources/static/uploads/";

        try {
            File uploadFolder = new File(UPLOAD_FOLDER);

            if (!uploadFolder.exists())
                uploadFolder.mkdir();
            file.transferTo(new File(uploadFolder.getAbsolutePath() + "\\" + file.getOriginalFilename()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao armazenar o arquivo. " + e.getMessage());
        }

        return ResponseEntity.ok("arquivo recebido com sucesso");
    }

    @GetMapping(value = "/get-colecao")
    public ResponseEntity<Object> getColecao() {
        File files = new File(UPLOAD_FOLDER);

        List<String> imagens=new ArrayList<>();

        for (int i=0; i< files.list().length; i++)
            imagens.add("http://localhost:8080/uploads/" + files.list()[i]);

        return ResponseEntity.ok(imagens);
    }
}