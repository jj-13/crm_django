import axios from "axios";

const categoriesApi = axios.create({
    //baseURL:"http://ip172-18-0-98-cmgjqaio7r5g00fodlng-8000.direct.labs.play-with-docker.com/api"
    //baseURL:"http://127.0.0.1:8000/api"
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
})

export const getCategories = async () => {
    const request = await categoriesApi.get('/categories/')
    const response = request.data
    const categoriesObject = {}
    //categoriesObject.columns = ['Id', 'Nombre', 'Apellidos', 'Tipo documento', 'Documento', 'Hobbie']
    const data = []
    response.forEach(category => {
        data.push({
            id: category.id,
            name: category.name,
            slug: category.slug,
            view: category.view
        })
    });
    console.log(request.status)
    console.log(response)
    categoriesObject.data = data    
    localStorage.setItem('categories', JSON.stringify(categoriesObject))
    //console.log(personaTable)
    return categoriesObject
}