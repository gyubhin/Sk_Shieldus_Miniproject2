export const reactQueryKeys = {
  group: {
    getGroupsList: "get group list",
    getMyJoinedGroup: "get my joined group",
    getGroupsMembers: "get groups members",
  },
  categories: {
    getCategories: "get categories",
  },
  user: {
    getUserMeGroups: "get user me group",
    getUserInfo: "get user info",
  },

  event: {
    getEventsList: "get events list",
    getEventsDetail: "get events detail",
    getEventsAttendees: "get events attendees",
  },

  attendee: {
    getEventAttendee: "get event attendee",
  },

  post: {
    getPostList: "get post list",
    getPostDetail: "get post detail",
  },

  comment: {
    getComments: "get comments",
  },
} as const;
