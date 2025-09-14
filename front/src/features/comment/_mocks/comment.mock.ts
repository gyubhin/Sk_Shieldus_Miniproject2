import { http, HttpResponse } from "msw";
import { mswUtils } from "@/libs/msw";
import dayjs from "dayjs";
import type { CommentItem } from "../_types/base";
import type { PostCommentBody, PutCommentBody } from "../_types/body";

let commentData = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  content: `댓글 내용${i + 1}`,
  createdAt: dayjs().format("YYYY.MM.DD"),
  authorNickname: `댓글 작성자${i + 1}`,
  authorId: i + 1,
  parentId: null,
  parentAuthorNickname: null,

  children: Array.from({ length: 3 }, (_, k) => ({
    id: k + 1,
    content: `답글 내용${k + 1}`,
    createdAt: dayjs().format("YYYY.MM.DD"),
    authorNickname: `답글 작성자${k + 1}`,
    authorId: k + 1,
    parentId: i,
    parentAuthorNickname: `댓글 작성자${i + 1}`,
  })),
})) as CommentItem[];

export const commentHandlers = [
  // 댓글 등록 요청
  http.post(mswUtils.getUrl("/groups/:groupId/posts/:postId/comments"), async ({ request }) => {
    const body = (await request.json()) as PostCommentBody;
    console.log(body);

    const id = commentData.length + 1;
    const tmp = {
      id,
      content: body.content,
      createdAt: dayjs().format("YYYY.MM.DD"),
      authorNickname: `작성자${id}`,
      authorId: id,
      parentId: null,
      parentAuthorNickname: null,
      children: [],
    } as CommentItem;

    commentData.unshift(tmp);

    return HttpResponse.json(
      {
        success: true,
      },
      { status: 201 },
    );
  }),

  // 댓글 수정 요청
  http.put(
    mswUtils.getUrl("/groups/:groupId/posts/:postId/comments/:commentId"),
    async ({ request, params }) => {
      const body = (await request.json()) as PutCommentBody;
      const { commentId } = params;
      const id = Number(commentId);

      const index = commentData.findIndex((comment) => comment.id === id);

      if (index === -1) {
        return HttpResponse.json(
          { success: false, message: "댓글을 찾을 수 없습니다." },
          { status: 404 },
        );
      }

      // 기존 댓글 업데이트
      commentData[index] = {
        ...commentData[index],
        content: body.content,
      };

      return HttpResponse.json({ success: true }, { status: 200 });
    },
  ),

  // 댓글 삭제 요청
  http.delete(
    mswUtils.getUrl("/groups/:groupId/posts/:postId/comments/:commentId"),
    async ({ params }) => {
      const { commentId } = params;
      const id = Number(commentId);

      const index = commentData.findIndex((comment) => comment.id === id);

      if (index === -1) {
        return HttpResponse.json(
          { success: false, message: "댓글을 찾을 수 없습니다." },
          { status: 404 },
        );
      }

      commentData.splice(index, 1);

      return new HttpResponse(null, { status: 204 });
    },
  ),
];
