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

    // 절대경로: 프로젝트 실행 디렉토리/uploads
    private final String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";

    public String saveFile(MultipartFile file, String subDir) {
        try {
            Path dirPath = Paths.get(uploadDir, subDir);
            if (!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }

            String originalFilename = file.getOriginalFilename();
            String ext = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                ext = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String filename = UUID.randomUUID().toString() + ext;
            Path filePath = dirPath.resolve(filename);

            file.transferTo(filePath.toFile());

            // 프론트 접근용 URL 반환
            return "/uploads/" + subDir + "/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 실패: " + e.getMessage(), e);
        }
    }

    public void deleteFile(String fileUrl) {
        if (fileUrl == null) return;

        String relativePath = fileUrl.replaceFirst("/uploads/", "");
        Path filePath = Paths.get(uploadDir, relativePath);

        File file = filePath.toFile();
        if (file.exists()) {
            file.delete();
        }
    }
}
