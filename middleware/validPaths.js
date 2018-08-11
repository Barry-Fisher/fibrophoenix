export default async function ({ route, app, redirect }) {
  if (route.name === 'articles-slug' && !!route.params.slug) {
    const allArticles = await app.$content.getCollectionData('articles')
    const validPaths = allArticles.map(article => article.path)
    if (!validPaths.includes(route.path)) {
      redirect('/')
    }
  }
}
