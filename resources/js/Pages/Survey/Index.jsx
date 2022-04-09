import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base'
import useDialog from '../../Hooks/useDialog';
import CreatSurvey from '../../Components/Dashboard/Survey/CreateSurvey';
import EditSurvey from '../../Components/Dashboard/Survey/EditSurvey';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {

    const {data: survey, links, meta} = props.survey; 
    const { categories, locations, products } = props;
    const [state, setState] = useState([])
    const [addDialogHandler, addCloseTrigger,addTrigger] = useDialog()
    const [UpdateDialogHandler, UpdateCloseTrigger,UpdateTrigger] = useDialog()
    const [destroyDialogHandler, destroyCloseTrigger,destroyTrigger] = useDialog()
    const openUpdateDialog = (user) => {
        setState(user);
        UpdateDialogHandler()
    }

    const openDestroyDialog = (user) => {
        setState(user);
        destroyDialogHandler()        
    };

    const destroyUser = () => {
        Inertia.delete(
            route('survey.destroy', state.id), 
            { onSuccess: () => destroyCloseTrigger() });
    }

    const showLocations = (data) => {
        const _locations = data.split(",");
        
        let name = '';
        if(_locations.length === 1){
            locations.map((location) => {
               if(location.id === parseInt(data, 10))
               name = location.name;
            })
        }
        else {
            _locations.map((_location) => {
                locations.map((location) => {
                    if(location.id === parseInt(_location, 10))
                    name += location.name + ", "
                })
            })
        }
        return name
    }

    const showCategories = (data) => {
        const _categories = data.split(",");
        
        let name = '';
        if(_categories.length === 1){
            categories.map((category) => {
               if(category.id === parseInt(data, 10))
               name = category.name;
            })
        }
        else {
            _categories.map((_category) => {
                categories.map((category) => {
                    if(category.id === parseInt(_category, 10))
                    name += category.name + ", "
                })
            })
        }
        return name
    }

    const showProducts = (data) => {
        const _products = data.split(",");
        
        let name = '';
        _products.map((_product) => {
            const data = _product.split("-");
            products.map((product) => {
                if(product.id === parseInt(data[1], 10))
                name += product.main_name + ", "
            })
        })
        return name
    }

    return (
        <>
            <div className="container-fluid py-4">
                <Dialog trigger={addTrigger} title="Crear Nuevo Relevamiento"> 
                    <CreatSurvey close={addCloseTrigger} categories={categories} locations={locations} />
                </Dialog>

                <Dialog trigger={UpdateTrigger} title={`Update Survey: ${state.name}`}> 
                    <EditSurvey model={state} close={UpdateCloseTrigger} categories={categories} locations={locations} products={products} />
                </Dialog>

                <Dialog trigger={destroyTrigger} title={`Delete Survey: ${state.name}`}>
                    <p>Are you sure to delete this Survey ?</p>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" onClick={destroyUser} className="btn bg-gradient-danger">Delete</button>
                    </div>
                </Dialog>

                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">
                            <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Unidades</h6>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                    <button onClick={addDialogHandler} type="button" className="btn bg-gradient-success btn-block mb-3" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                        Create New Survey
                                    </button>
                                </div>
                            </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive-xxl p-0">
                                <table className="table align-items-center justify-content-center mb-0" style={{tableLayout: "fixed" }}>
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-centter">#</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Ubicacion</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Categorias</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Productos</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {survey.map((user, index) => (
                                            <tr key={user.id}>
                                                <td className='text-left'>{meta.from + index}</td>
                                                <td className='text-left'>
                                                    <div className="d-flex px-2">
                                                        <div className="my-auto" style={{whiteSpace: 'normal'}}>
                                                            <h6 className="mb-0 text-sm">{showLocations(user.location_id)}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-left'>
                                                    <div className="d-flex px-2">
                                                        <div className="my-auto" style={{whiteSpace: 'normal'}}>
                                                            <h6 className="mb-0 text-sm">{showCategories(user.category_id)}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-left'>
                                                    <div className="d-flex px-2">
                                                        <div className="my-auto" style={{whiteSpace: 'normal'}}>
                                                            <h6 className="mb-0 text-sm">{ showProducts(user.product_id)}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle text-center" width="10%">
                                                    <div>
                                                        <button type="button" onClick={() => openUpdateDialog(user)} className="btn btn-vimeo btn-icon-only mx-2">
                                                            <span className="btn-inner--icon"><i className="fas fa-pencil-alt"></i></span>
                                                        </button>
                                                        <button type="button" onClick={() => openDestroyDialog(user)} className="btn btn-youtube btn-icon-only">
                                                            <span className="btn-inner--icon"><i className="fas fa-trash"></i></span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        { meta.links.map((link, k) => (
                            <li key={k} className="page-item">
                                <Link disabled={link.url == null ? true : false} as="button" className={`${link.active && 'bg-info'} ${link.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={link.url || ''} dangerouslySetInnerHTML={{ __html: link.label }}/>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

Index.layout = (page) => <Base key={page} children={page} title={"Manage Units"}/>
