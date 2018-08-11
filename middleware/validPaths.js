export default async function ({ route, app }) {
  const checkForCollection = async function (routeName, collection) {
    if (route.name === routeName && Object.keys(route.params).length > 0) {
      const allItems = await app.$content.getCollectionData(collection)
      const validPaths = allItems.map(item => item.path)
      if (!validPaths.includes(route.path)) {
        app.router.app.error({ statusCode: 404, message: 'This page could not be found' })
      }
    }
  }

  await checkForCollection('articles-slug', 'articles')
}
