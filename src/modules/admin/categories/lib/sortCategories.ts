import Category from "../types/Category"

const sortCategories = (categoriesList: Category[]) => {
  categoriesList.sort((a, b) => {
    if (Number(a.ordination) > Number(b.ordination)) {
      return 1
    }

    if (Number(a.ordination) < Number(b.ordination)) {
      return -1
    }

    return 0
  })
  return categoriesList
}

export default sortCategories
