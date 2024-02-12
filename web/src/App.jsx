import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import injectContext, { Context } from './store/AppContext'
import { ToastContainer } from 'react-toastify';

const Home = () => {
    const { store, actions } = useContext(Context)
    return <h1>Home, {store?.user?.name || 'Anonimous' }</h1>
}

const Login = () => {
    const { store, actions } = useContext(Context)

    if (!!store.user) return <Navigate to="/" replace />

    return (
        <>
        <form onSubmit={actions.handleSubmitLogin} className='w-50 mx-auto py-5 my-5'>
            <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input className='form-control' type="email" name="email" id="email" placeholder='Insert Email' value={store.email} onChange={actions.handleChange} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input className='form-control' type="password" name="password" id="password" placeholder='Insert password' value={store.password} onChange={actions.handleChange} />
            </div>
            <button className="btn btn-primary btn-sm w-100">Login</button>
        </form>
        </>
    )
}

const Register = () => {
    const { store, actions } = useContext(Context)

    if (!!store.user) return <Navigate to="/" replace />
    
    return (
        <>
        <form onSubmit={actions.handleSubmitRegister} className='w-50 mx-auto py-5 my-5'>
            <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input className='form-control' type="text" name="name" id="name" placeholder='Insert name' value={store.name} onChange={actions.handleChange} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input className='form-control' type="email" name="email" id="email" placeholder='Insert Email' value={store.email} onChange={actions.handleChange} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input className='form-control' type="password" name="password" id="password" placeholder='Insert password' value={store.password} onChange={actions.handleChange} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password_confirm" className="form-label">Confirm Password</label>
                <input className='form-control' type="password" name="password_confirm" id="password_confirm" placeholder='Insert password' value={store.password_confirm} onChange={actions.handleChange} />
            </div>
            <button className="btn btn-primary btn-sm w-100">Register</button>
        </form>
        </>
    )
}

const Me = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        if(store?.access_token !== null) actions.me()
    }, [])
    return (
        <h1>About me</h1>
    )
}

const Menu = () => {
    const { store, actions } = useContext(Context)
    return (
        <nav className='nav'>
            <Link to="/" className="nav-link">Home</Link>
            {
                !!store.user ? (
                    <>
                    <Link to="/me" className="nav-link">About me</Link>
                    <button className="nav-link" onClick={actions.logout}>Logout</button>
                    <span className='nav-link'>{store?.user?.name || 'Anonimous'}</span>
                    </>
                ):(
                    <>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Register</Link>
                    </>
                )
            }
        </nav>
    )
}

const App = () => {
    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path='/me' element={<Me />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Home />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    )
}

export default injectContext(App)