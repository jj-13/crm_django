export const selectIsAuthenticated = state => state.auth.isAuthenticated
export const selectUser = state => state.auth.user
export const selectCategories = state => state.category.rows
export const selecAuthorBlogs = state => state.author_blog
export const selecAuthorBlogsDetail = state => state.blogs_detail.rows[0]