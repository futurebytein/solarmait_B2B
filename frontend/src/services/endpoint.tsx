export const ENDPOINT = {
  // auth
  login: "login",
  register: "register",
  account: "current-user",

  // media
  media: (endpoint: string) =>
    `${process.env.NEXT_PUBLIC_API_MEDIA_URL}/${endpoint}`,

  // community
  openPost: "community/openPosts",
  postBySlug: "community/fetchOnePost",
  postComments: "community/getPostComments",
  likeComment: "community/likeComment",
  likePost: "community/likePost",
  addCommentOnPost: "community/writeCommentOnPost",
};
