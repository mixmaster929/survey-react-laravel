import { useForm } from '@inertiajs/inertia-react'
import React, {useState} from 'react'
import Select from 'react-select'

export default function CreateSurvey({close, categories, locations}) {
    

    const {data, setData, post, errors} = useForm({location_id: '', category_id: '', product_id: ''});

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('survey.store'), {
            data,
            onSuccess: () => {
                setSelectedProducts([]),
                _setSelectedLocations([]),
                _setSelectedCategories([]),
                close()
            }, 
        });
    }
    const _locations = [];
    const _categories = [];
    
    const  location_option =  locations.map((location) => {
        _locations.push({value: location.id, label: location.name})
    })
    const category_option = categories.map((category) => {
        _categories.push({value: category.id, label: category.name})
    })

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [_selectedCategories, _setSelectedCategories] = useState([]);

    const [selectedLocations, setSelectedLocations] = useState([]);
    const [_selectedLocations, _setSelectedLocations] = useState([]);

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [_selectedProducts, _setSelectedProducts] = useState([]);
    const [selected_Products, setSelected_Products] = useState([]);

    const handleChangeLocation = (options) => {
        const sel_locations = [];
        const sel_location_options = [];
        const operation = options.map((option) => {
            sel_locations.push(option.value);
            sel_location_options.push({value: option.value, label: option.label});
        })
        setSelectedLocations(sel_locations);
        _setSelectedLocations(sel_location_options);
        setData({ ...data, location_id: sel_locations.toString() })
    };

    const handleChangeCategory = (options) => {
        const sel_categories = [];
        const sel_categorie_options = [];
        const sel_products = [];
        const sel_product_options = [];
        const operation = options.map((option) => {
            sel_categories.push(option.value);
            sel_categorie_options.push({value: option.value, label: option.label});

            categories.map((category) => {
                    category.id === option.value? category.products?
                        category.products.map((product) => {
                            sel_product_options.push({value: category.id + "-" + product.id, label: product.main_name});
                            sel_products.push(category.id + "-" + product.id);
                        }) : null : null
                });
        })
        
        setSelectedCategories(sel_categories);
        _setSelectedCategories(sel_categorie_options);

        setSelectedProducts(sel_product_options);
        _setSelectedProducts(sel_product_options);
        setData({ ...data, category_id: sel_categories.toString(), product_id: sel_products.toString() })
    };

    const handleChangeProduct = (options) => {
        setSelectedProducts(options);

        const sel_products = [];
        const operation = options.map((option) => {
            sel_products.push(option.value);
        })
        setSelected_Products(sel_products);
        setData({ ...data, product_id: sel_products.toString() })
    };

    
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="location_id" className="col-form-label">Ubicacion:</label>
                        <Select value={ _selectedLocations } options={ _locations } isMulti onChange={ handleChangeLocation } />
                        {errors && <div className='text-danger mt-1'>{errors.location_id}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="category_id" className="col-form-label">Categoria:</label>
                        <Select value={ _selectedCategories } options={ _categories } isMulti onChange={ handleChangeCategory } />
                        {errors && <div className='text-danger mt-1'>{errors.category_id}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_id" className="col-form-label">Productos:</label>
                        <Select value={ selectedProducts } options={ _selectedProducts } isMulti onChange={ handleChangeProduct } />
                        {errors && <div className='text-danger mt-1'>{errors.product_id}</div>}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-gradient-primary">Save</button>
                </div>
            </form>
        </>

    )
}
