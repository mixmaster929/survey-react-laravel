import { useForm } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

export default function EditProduct({close, model, categories, units}) {

    const {data, setData, put, reset, errors} = useForm({ main_name: model.main_name, alter_name: model.alter_name, amount: model.amount, category_id: model.category_id, unit_id: model.unit_id, });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('product.update', model.id), {
            data, 
            onSuccess: () => {
                reset(),
                close()
            }, 
        });
    }

    useEffect(() => {
        setData({...data,
            main_name: model.main_name, alter_name: model.alter_name, amount: model.amount, category_id: model.category_id, unit_id: model.unit_id
        });
    }, [model]);

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="category_id" className="col-form-label">Category:</label>
                            <select className="form-control" name='category_id' value={data.category_id} onChange={onChange} id="category_id">
                                <option></option>
                                {categories.map((category, index) => (
                                    <option value={ category.id } key={ category.id }>{ category.name }</option>
                                ))}
                            </select>
                            {errors && <div className='text-danger mt-1'>{errors.category_id}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="main_name" className="col-form-label">Main Name:</label>
                            <input type="text" className="form-control" name='main_name' value={data.main_name} onChange={onChange} id="main_name"/>
                            {errors && <div className='text-danger mt-1'>{errors.main_name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="alter_name" className="col-form-label">Alter Name:</label>
                            <input type="text" className="form-control" name='alter_name' value={data.alter_name} onChange={onChange} id="alter_name"/>
                            {errors && <div className='text-danger mt-1'>{errors.alter_name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount" className="col-form-label">Amount:</label>
                            <input type="number" className="form-control" name='amount' value={data.amount} onChange={onChange} id="amount"/>
                            {errors && <div className='text-danger mt-1'>{errors.amount}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="unit_id" className="col-form-label">Unit:</label>
                            <select className="form-control" name='unit_id' value={data.unit_id} onChange={onChange} id="unit_id">
                                <option></option>
                                {units.map((unit, index) => (
                                    <option value={ unit.id } key={ unit.id }>{ unit.name }</option>
                                ))}
                            </select>
                            {/* <input type="unit_id" className="form-control" name='unit_id' value={data.unit_id} onChange={onChange} id="unit_id"/> */}
                            {errors && <div className='text-danger mt-1'>{errors.unit_id}</div>}
                        </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-gradient-primary">Update</button>
                </div>
            </form>
        </>

    )
}
