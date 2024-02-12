import { toast } from "react-toastify"

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null,
            access_token: null,
            apiURL: 'http://127.0.0.1:5000',
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            active: true,
        },
        actions: {
            checkCurrentUser: () => {
                if (sessionStorage.getItem('access_token')) {
                    setStore({
                        access_token: sessionStorage.getItem('access_token'),
                        user: JSON.parse(sessionStorage.getItem('user'))
                    })
                }
            },
            me: () => {
                const { apiURL, access_token } = getStore()
                const url = `${apiURL}/api/me`
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    }
                }
                fetch(url, options)
                    .then(response => {
                        return response.json()
                    })
                    .then(datos => {
                        if (datos.msg) toast.error(datos.msg)
                        else {
                            console.log(datos)
                            setStore({
                                user: datos
                            })
                        }
                    })
            },
            handleSubmitRegister: e => {
                e.preventDefault()
                const { name, email, password, password_confirm, active, apiURL } = getStore()
                const { getFetch } = getActions()

                // creo la url a acceder
                const url = `${apiURL}/api/register`

                // Transformo los datos en string
                const raw = JSON.stringify({
                    name, email, password, active
                })

                // creo las opciones de la peticion (request)
                const options = {
                    method: 'POST',
                    body: raw,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const request = getFetch(url, options)
                request.then((response) => response.json()).then((datos) => {
                    console.log(datos)
                    toast.success(datos.success)
                    setStore({
                        name: '',
                        email: '',
                        password: '',
                        password_confirm: '',
                        active: true,
                    })
                }).catch(error => console.log(error))

            },
            handleSubmitLogin: e => {
                e.preventDefault()
                const { email, password, apiURL } = getStore()
                const { getFetch } = getActions()

                // creo la url a acceder
                const url = `${apiURL}/api/login`

                // Transformo los datos en string
                const raw = JSON.stringify({
                    email, password
                })

                // creo las opciones de la peticion (request)
                const options = {
                    method: 'POST',
                    body: raw,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const request = getFetch(url, options)
                request.then((response) => response.json()).then((datos) => {
                    console.log(datos)

                    if (datos.msg) {
                        toast.error(datos.msg)
                    } else {
                        toast.success(datos.success)
                        setStore({
                            email: '',
                            password: '',
                            access_token: datos.access_token,
                            user: datos.user
                        })
                        sessionStorage.setItem('access_token', datos.access_token)
                        sessionStorage.setItem('user', JSON.stringify(datos.user))
                    }
                }).catch(error => console.log(error))

            },
            handleChange: e => {
                const { name, value } = e.target
                setStore({
                    [name]: value
                })
            },
            logout: () => {
                setStore({
                    user: null,
                    access_token: null
                })

                sessionStorage.removeItem('user')
                sessionStorage.removeItem('access_token')
            },
            getFetch: (url, options) => {
                return fetch(url, options)
            }
        }
    }
}

export default getState