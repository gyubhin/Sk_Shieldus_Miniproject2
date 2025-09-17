package com.csu.csu_backend.service;

import com.csu.csu_backend.controller.dto.NoticeDTO;
import com.csu.csu_backend.entity.Notice;
import com.csu.csu_backend.entity.User;
import com.csu.csu_backend.exception.ResourceNotFoundException;
import com.csu.csu_backend.exception.UnauthorizedException;
import com.csu.csu_backend.repository.NoticeRepository;
import com.csu.csu_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;

    /** 공지사항 생성 */
    @Transactional
    public Long createNotice(Long userId, NoticeDTO.CreateNoticeRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));

        Notice notice = new Notice();
        notice.setUser(user);
        notice.update(request.getTitle(), request.getContent());

        return noticeRepository.save(notice).getId();
    }

    /** 공지사항 단건 조회 */
    public NoticeDTO.NoticeResponse getNotice(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new ResourceNotFoundException("공지사항을 찾을 수 없습니다."));
        return new NoticeDTO.NoticeResponse(notice);
    }

    /** 공지사항 전체 조회 */
    public List<NoticeDTO.NoticeResponse> getAllNotices() {
        return noticeRepository.findAll().stream()
                .map(NoticeDTO.NoticeResponse::new)
                .toList();
    }

    /** 공지사항 수정 */
    @Transactional
    public void updateNotice(Long noticeId, Long userId, NoticeDTO.UpdateNoticeRequest request) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new ResourceNotFoundException("공지사항을 찾을 수 없습니다."));

        if (!notice.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("공지사항 수정 권한이 없습니다.");
        }

        notice.update(request.getTitle(), request.getContent());
    }

    /** 공지사항 삭제 */
    @Transactional
    public void deleteNotice(Long noticeId, Long userId) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new ResourceNotFoundException("공지사항을 찾을 수 없습니다."));

        if (!notice.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("공지사항 삭제 권한이 없습니다.");
        }

        noticeRepository.delete(notice);
    }
}
