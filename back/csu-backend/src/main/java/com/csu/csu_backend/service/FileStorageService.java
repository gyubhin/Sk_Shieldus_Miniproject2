package com.csu.csu_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    private final String uploadDir = "uploads"; // 프로젝트 루트에 uploads 폴더

    public String saveFile(MultipartFile file, String subDir) {
        try {
            String folderPath = uploadDir + File.separator + subDir;
            Path dirPath = Paths.get(folderPath);
            if (!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = dirPath.resolve(filename);
            file.transferTo(filePath.toFile());

            return "/" + folderPath + "/" + filename; // DB에 저장될 경로
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 실패: " + e.getMessage());
        }
    }

    public void deleteFile(String filePath) {
        if (filePath == null) return;
        File file = new File(filePath);
        if (file.exists()) {
            file.delete();
        }
    }
}
