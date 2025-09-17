package com.csu.csu_backend.controller;

import com.csu.csu_backend.service.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Tag(name = "이미지 업로드 API", description = "이미지 업로드 전용 API")
@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final FileStorageService fileStorageService;

    @Operation(summary = "이미지 업로드 API", description = "이미지를 업로드하고 URL을 반환받습니다. type 파라미터로 저장될 폴더를 지정합니다 (예: groups, posts, events)")
    @PostMapping
    public ResponseEntity<Map<String, String>> uploadImage(
            @RequestParam("image") MultipartFile file,
            @RequestParam(defaultValue = "misc") String type) {

        String imageUrl = fileStorageService.saveFile(file, type);
        return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    }
}