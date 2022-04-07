import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base'
import useDialog from '../../Hooks/useDialog';
import CreateProduct from '../../Components/Dashboard/Products/CreateProduct';
import EditProduct from '../../Components/Dashboard/Products/EditProduct';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {

    const {data: products, links, meta} = props.products; 
    const { categories, units } = props;
    
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
            route('product.destroy', state.id), 
            { onSuccess: () => destroyCloseTrigger() });
    }

    return (
        <>
            <div className="container-fluid py-4">
                <Dialog trigger={addTrigger} title="Create New Product"> 
                    <CreateProduct close={addCloseTrigger} categories={categories} units={units} />
                </Dialog>

                <Dialog trigger={UpdateTrigger} title={`Update Product: ${state.main_name}`}> 
                    <EditProduct model={state} close={UpdateCloseTrigger} categories={categories} units={units} />
                </Dialog>

                <Dialog trigger={destroyTrigger} title={`Delete Product: ${state.main_name}`}>
                    <p>Are you sure to delete this product ?</p>
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
                                        <h6>Products table</h6>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                        <button onClick={addDialogHandler} type="button" className="btn bg-gradient-success btn-block mb-3" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                            Create New Product
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive-xxl p-0" width="100%">
                                    <table className="table align-items-center justify-content-center mb-0" width="100%">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-centter">#</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Main Name</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Alter Name</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Category</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Unit/Grams</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">CAE</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((user, index) => (
                                                <tr key={user.id}>
                                                    <td className='text-center'>{meta.from + index}</td>
                                                    <td className='text-left'>
                                                        <div className="d-flex px-2">
                                                            {/* <div>
                                                                <img src="/img/team-2.jpg" className="avatar avatar-sm  me-3 " />
                                                            </div> */}
                                                            <div className="my-auto">
                                                                <h6 className="mb-0 text-sm">{user.main_name}</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-left'>
                                                        <p className="text-sm font-weight-bold mb-0">{user.alter_name}</p>
                                                    </td>
                                                    <td className='text-left'>
                                                        {categories.map((category, index) => (
                                                            <span className="text-xs font-weight-bold" key={index}>{user.category_id === category.id? category.name : null}</span>
                                                        ))}
                                                    </td>
                                                    <td className="align-middle text-left">
                                                        <div className="d-flex align-items-center text-left">
                                                            {units.map((unit, index) => (
                                                                <span className="text-xs font-weight-bold mb-0" key={index}>{user.unit_id  === unit.id? unit.name : null}</span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className='text-left'>
                                                        <span className="text-xs font-weight-bold">{user.amount}</span>
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

Index.layout = (page) => <Base key={page} children={page} title={"Manage Products"}/>
