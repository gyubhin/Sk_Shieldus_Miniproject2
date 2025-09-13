export const reactQueryKeys = {
  group: {
    getGroupsList: "get group list",
    getMyJoinedGroup: "get my joined group",
    getGroupsMembers: "get groups members",
  },
  categories: {
    getCategories: "get categories",
    getCategoriesWithGroupsApi: "get categories with groups",
  },
  user: {
    getUserMeGroups: "get user me group",
    getUserInfo: "get user info",
    getUserPosts: "get user posts",
    getUserComments: "get user comments",
    getMyLikedGroups: "get my liked groups",
  },

  event: {
    getEventsList: "get events list",
    getEventsDetail: "get events detail",
    getEventsAttendees: "get events attendees",
    getMyUpcomingEvents: "get myupcoming events",
  },

  attendee: {
    getEventAttendee: "get event attendee",
  },

  post: {
    getPostList: "get post list",
    getPostDetail: "get post detail",
    getPostsCursor: "get posts cursor",
  },

  comment: {
    getComments: "get comments",
  },

  notice: {
    getNotices: "get notices",
  },
} as const;
