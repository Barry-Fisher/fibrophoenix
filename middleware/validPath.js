export default async function ({ route, app, redirect }) {
  const articlesData = await app.$getArticles()
  if (route.name === 'articles-slug' && !!route.params.slug && !Object.keys(articlesData).includes(route.params.slug)) {
    redirect('/')
  }
}