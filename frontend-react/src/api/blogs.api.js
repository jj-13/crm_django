import axios from "axios";

const blogsApi = axios.create({
    //baseURL:"http://ip172-18-0-98-cmgjqaio7r5g00fodlng-8000.direct.labs.play-with-docker.com/api"
    baseURL: "http://127.0.0.1:8000/api"
})

export const getBlogs = async () => {
    const request = await blogsApi.get('/blog/')
    //console.log(request.data)
    const response = request.data['results']
    const blogsObject = {}
    blogsObject.next = request.data['next']
    blogsObject.previous = request.data['previous']
    blogsObject.count = request.data['count']
    const data = []
    response.forEach(category => {
        data.push({
            id: category.id,
            title: category.title,
            slug: category.slug,
            thumbnail: category.thumbnail,
            category: category.category,
            description: category.description,
            content: category.content,
            status: category.status,
            time_read: category.time_read,
            published: category.published,
            view: category.view
        })
    });
    console.log(request.status)
    console.log(response)
    console.log(blogsObject)
    blogsObject.data = data    
    localStorage.setItem('blogs', JSON.stringify(blogsObject))
    //console.log(personaTable)
    return blogsObject
}

export const getBlogsPage = async (page) => {
    const request = await blogsApi.get(`/blog/?p=${page}`)
    //console.log(request.data)
    const response = request.data['results']
    const blogsObject = {}
    blogsObject.next = request.data['next']
    blogsObject.previous = request.data['previous']
    blogsObject.count = request.data['count']
    const data = []
    response.forEach(category => {
        data.push({
            id: category.id,
            title: category.title,
            slug: category.slug,
            thumbnail: category.thumbnail,
            category: category.category,
            description: category.description,
            content: category.content,
            status: category.status,
            time_read: category.time_read,
            published: category.published,
            view: category.view
        })
    });
    console.log(request.status)
    console.log(response)
    blogsObject.data = data    
    localStorage.setItem('blogs_pages', JSON.stringify(blogsObject))
    //console.log(personaTable)
    return blogsObject
}

export const getBlogsByCategory = async (category_slug) => {
    const request = await blogsApi.get(`/list_post_by_categories/?category_slug=${category_slug}`)
    //console.log(request.data)
    const response = request.data['results']
    const blogsObject = {}
    blogsObject.next = request.data['next']
    blogsObject.previous = request.data['previous']
    const data = []
    response.forEach(category => {
        data.push({
            id: category.id,
            title: category.title,
            slug: category.slug,
            thumbnail: category.thumbnail,
            category: category.category,
            description: category.description,
            status: category.status,
            time_read: category.time_read,
            published: category.published,
            view: category.view
        })
    });
    console.log(request.status)
    console.log(response)
    blogsObject.data = data    
    localStorage.setItem('blogs_by_categories', JSON.stringify(blogsObject))
    //console.log(personaTable)
    return blogsObject
}

export const getBlogsByCategoryPage = async (result) => {
    console.log(result.slug)
    console.log(result.page)
    const request = await blogsApi.get(`/list_post_by_categories/?category_slug=${result.slug}&p=${result.page}`)
    //console.log(request.data)
    const response = request.data['results']
    const blogsObject = {}
    blogsObject.next = request.data['next']
    blogsObject.previous = request.data['previous']
    blogsObject.count = request.data['count']
    const data = []
    response.forEach(category => {
        data.push({
            id: category.id,
            title: category.title,
            slug: category.slug,
            thumbnail: category.thumbnail,
            category: category.category,
            description: category.description,
            status: category.status,
            time_read: category.time_read,
            published: category.published,
            view: category.view
        })
    });
    console.log(request.status)
    console.log(response)
    blogsObject.data = data    
    localStorage.setItem('blogs_by_categories_pages', JSON.stringify(blogsObject))
    //console.log(personaTable)
    return blogsObject
}

export const getBlogsDetail = async (slug) => {
    const request = await blogsApi.get(`/blog/${slug}/`)    
    const response = request.data.message
    const blogsObject = {}    
    const data = []
    data.push({
        id: response.id,
        title: response.title,
        slug: response.slug,
        thumbnail: response.thumbnail,
        category: response.category,
        description: response.description,
        content: response.content,
        status: response.status,
        time_read: response.time_read,
        published: response.published,
        view: response.view
    })
    console.log(request.status)
    console.log(response)
    blogsObject.data = data    
    localStorage.setItem('blogs_detail', JSON.stringify(blogsObject))
    //console.log(personaTable)
    return blogsObject
}

export const getBlogsSearchPage = async (search_term) => {
    const request = await blogsApi.get(`/search_blog/?search_term=${search_term}`)
    //console.log(request.data)
    const response = request.data['results']
    const blogsObject = {}
    blogsObject.next = request.data['next']
    blogsObject.previous = request.data['previous']
    const data = []
    response.forEach(category => {
        data.push({
            id: category.id,
            title: category.title,
            slug: category.slug,
            thumbnail: category.thumbnail,
            category: category.category,
            description: category.description,
            content: category.content,
            status: category.status,
            time_read: category.time_read,
            published: category.published,
            view: category.view
        })
    });
    console.log(request.status)
    console.log(response)
    blogsObject.data = data    
    localStorage.setItem('blogs_search_pages', JSON.stringify(blogsObject))
    //console.log(personaTable)
    return blogsObject
}