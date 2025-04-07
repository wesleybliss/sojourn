import * as store from '@store'

const baseUrl = process.env.API_BASE_URL
const url = path => `${baseUrl}${path}`
const api = {}

const getOptions = (options = {}) => {
    
    const token = store.user.getValue()?.token
    const headers = {
        'Content-Type': 'application/json',
    }
    
    if (token)
        headers['Authorization'] = `Bearer ${token}`
    
    return {
        ...options,
        headers: {
            ...headers,
            ...headers?.options ?? {},
        },
    }
    
}

const getError = async res => {
    
    let error = 'Unknown error'
    const { status, statusText } = res
    
    try {
        const json = await res.json()
        
        error = json.error || error
    } catch (e) {
        console.warn('getError', e)
    }
    
    return {
        status,
        statusText,
        error,
    }
    
}

const getData = async res => {
    
    const json = await res.json()
    
    return json.data || json
    
}

api.get = async (path, options = {}) => {
    
    const res = await fetch(url(path), getOptions(options))
    
    if (!res.ok) return getError(res)
    
    const result = res.ok
        ? await getData(res)
        : await getError(res)
    
    return result
    
}

api.post = async (path, data = {}, options = {}) => {
    
    const res = await fetch(url(path), getOptions({
        method: 'POST',
        body: typeof data === 'string' ? data : JSON.stringify(data),
        ...options,
    }))
    
    const result = res.ok
        ? await getData(res)
        : await getError(res)
    
    return result
    
}

api.put = async (path, data = {}, options = {}) => {
    
    const res = await fetch(url(path), getOptions({
        method: 'PUT',
        body: typeof data === 'string' ? data : JSON.stringify(data),
        ...options,
    }))
    
    const result = res.ok
        ? await getData(res)
        : await getError(res)
    
    return result
    
}

api.delete = async (path, options = {}) => {
    
    const res = await fetch(url(path), getOptions({
        method: 'DELETE',
        ...options,
    }))
    
    const result = res.ok
        ? await getData(res)
        : await getError(res)
    
    return result
    
}

export default api
