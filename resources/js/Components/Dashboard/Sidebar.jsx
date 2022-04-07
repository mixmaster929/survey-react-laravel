import { Link } from '@inertiajs/inertia-react'
import React from 'react'

export default function Sidebar() {
    return (        
        <aside className="sidenav bg-default navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer opacity-5 position-absolute end-0 top-0 d-none d-xl-none opacity-8 text-white" aria-hidden="true" id="iconSidenav" />
                <Link className="navbar-brand m-0" href={route('home')} target="_blank">
                    {/* <img src="/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" /> */}
                    <span className="ms-1 font-weight-bold"> Survey</span>
                </Link>
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className={`${route().current('location.*') && 'active'} nav-link`} href={route('location.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fa fa-map-marker text-primary text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Ubicaciones</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`${route().current('unit.*') && 'active'} nav-link`} href={route('unit.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fa fa-balance-scale-right text-primary text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Unidades</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`${route().current('category.*') && 'active'} nav-link`} href={route('category.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-tv-2 text-primary text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Categorias</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`${route().current('product.*') && 'active'} nav-link`} href={route('product.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-apple-alt text-primary text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Productos</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`${route().current('survey') && 'active'} nav-link`} href={route('survey')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-question text-primary text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Relevamientos</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`${route().current('query') && 'active'} nav-link`} href={route('query')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-poll-h text-primary text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Resultados</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`${route().current('statistics') && 'active'} nav-link`} href={route('statistics')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-chart-area text-primary text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Estadisticas</span>
                        </Link>
                    </li>                    
                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Settings</h6>
                    </li>
                    <li className="nav-item">
                        <Link className={`${route().current('profile') && 'active'} nav-link`} href={route('profile')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-single-02 text-dark text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Profile</span>
                        </Link>
                    </li>
                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Manage</h6>
                    </li>                    
                    <li className="nav-item">
                        <Link className={`${route().current('users.*') && 'active'} nav-link`} href={route('users.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Users</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " as='a' method='post' href={route('logout')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i className="fas fa-sign-out-alt text-danger text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text ms-1">Log out</span>
                        </Link>
                    </li>
                </ul>
            </div>                
        </aside>
    )
}
