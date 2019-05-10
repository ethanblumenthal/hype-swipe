export const CREATE_FAVORITE = 'CREATE_FAVORITE'
export const DELETE_FAVORITES = 'DELETE_FAVORITES'

export const createFavorite = favorite => ({
  type: CREATE_FAVORITE,
  favorite
})

export const deleteFavorites = () => ({
  type: DELETE_FAVORITES
})
