package com.csu.csu_backend.controller;

import com.csu.csu_backend.controller.dto.EventResponse;
import com.csu.csu_backend.security.UserPrincipal;
import com.csu.csu_backend.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/my")
@RequiredArgsConstructor
public class MyPageController {

    private final EventService eventService;

    /**
     * 내가 참석하는 다가오는 정모 목록을 조회합니다.
     * @param currentUser 현재 인증된 사용자 정보
     * @return 다가오는 정모(이벤트) 목록
     */
    @GetMapping("/upcoming-events")
    public ResponseEntity<List<EventResponse>> getMyUpcomingEvents(@AuthenticationPrincipal UserPrincipal currentUser) {
        List<EventResponse> upcomingEvents = eventService.getUpcomingEventsForUser(currentUser.getId());
        return ResponseEntity.ok(upcomingEvents);
    }
}