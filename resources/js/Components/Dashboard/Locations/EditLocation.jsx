import { useForm } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

export default function EditLocation({close, model}) {

    const {data, setData, put, reset, errors} = useForm({ name: model.name });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('location.update', model.id), {
            data, 
            onSuccess: () => {
                reset(),
                close()
            }, 
        });
    }

    useEffect(() => {
        setData({...data,
            name: model.name
        });
    }, [model]);

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="name" className="col-form-label">Nombre:</label>
                            <input type="text" className="form-control" name='name' value={data.name} onChange={onChange} id="name"/>
                            {errors && <div className='text-danger mt-1'>{errors.name}</div>}
                        </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" className="btn bg-gradient-primary">Guardar</button>
                </div>
            </form>
        </>

    )
}
