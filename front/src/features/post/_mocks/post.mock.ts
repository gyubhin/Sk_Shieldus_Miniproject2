import { http, HttpResponse } from "msw";
import { mswUtils } from "@/libs/msw";
import dayjs from "dayjs";
import type { PostItem } from "../_types/base";
import type { CreatePostBody, PutPostBody } from "../_types/body";

let postData = Array.from({ length: 124 }, (_, i) => ({
  id: i + 1,
  title: `게시글${i + 1}`,
  content: `내용${i + 1}`,
  createdAt: dayjs().format("YYYY.MM.DD"),
  authorNickname: `작성자${i + 1}`,
  authorId: i + 1,

  // 댓글
  comments: Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    content: `댓글 내용${i + 1}`,
    createdAt: dayjs().format("YYYY.MM.DD"),
    authorNickname: `댓글 작성자${i + 1}`,
    authorId: i + 1,

    children: Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      content: `답글 내용${i + 1}`,
      createdAt: dayjs().format("YYYY.MM.DD"),
      authorNickname: `답글 작성자${i + 1}`,
      authorId: i + 1,
    })),
  })),
})) as PostItem[];

export const postHandlers = [
  // 게시글 목록 조회
  http.get(mswUtils.getUrl("/groups/:groupId/posts"), ({ request }) => {
    const page = Number(mswUtils.getParams(request, "page") ?? 0); // 기본값 0
    const size = Number(mswUtils.getParams(request, "size") ?? 10); // 기본값 10

    // 1. 페이징 처리
    const start = page * size;
    const end = start + size;
    const items = postData.slice(start, end);

    // 2. 응답
    return HttpResponse.json(
      {
        content: items,
        page,
        size,
        totalElements: postData.length,
        totalPages: Math.ceil(postData.length / size),
        last: end >= postData.length,
      },
      { status: 200 },
    );
  }),

  // 게시글 상세 조회
  http.get(mswUtils.getUrl("/groups/:groupId/posts/:postId"), ({ params }) => {
    const { groupId, postId } = params;
    console.log(groupId, postId);

    // 2. 응답
    return HttpResponse.json(postData[Number(postId)], { status: 200 });
  }),

  // 게시글 등록 요청
  http.post(mswUtils.getUrl("/groups/:groupId/posts"), async ({ request }) => {
    const body = (await request.json()) as CreatePostBody;
    console.log(body);

    const id = postData.length + 1;
    const tmp = {
      id,
      title: body.title,
      content: body.content,
      createdAt: dayjs().format("YYYY.MM.DD"),
      authorNickname: `작성자${id}`,
      authorId: id,
    };

    postData.unshift(tmp);

    return HttpResponse.json(
      {
        success: true,
      },
      { status: 201 },
    );
  }),

  // 게시글 수정 요청
  http.put(mswUtils.getUrl("/groups/:groupId/posts/:postId"), async ({ request, params }) => {
    const body = (await request.json()) as PutPostBody;
    const { postId } = params;

    const id = Number(postId);
    const index = postData.findIndex((post) => post.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { success: false, message: "게시글을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    // 기존 데이터 업데이트
    postData[index] = {
      ...postData[index],
      title: body.title,
      content: body.content,
    };

    return HttpResponse.json({ success: true }, { status: 200 });
  }),

  // 게시글 삭제 요청
  http.delete(mswUtils.getUrl("/groups/:groupId/posts/:postId"), async ({ params }) => {
    const { postId } = params;
    const id = Number(postId);

    const index = postData.findIndex((post) => post.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { success: false, message: "게시글을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    // 배열에서 해당 게시글 삭제
    postData.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),
];
