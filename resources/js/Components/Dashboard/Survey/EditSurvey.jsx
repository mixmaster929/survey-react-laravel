import { useForm } from '@inertiajs/inertia-react'
import { each } from 'lodash';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function EditSurvey({close, model, locations, products, categories}) {

    const {data, setData, put, errors} = useForm({location_id: model.location_id, category_id: model.category_id, product_id: model.category_id});

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('survey.update', model.id), {
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

    const _category_ = model.category_id;
    const _location_ = model.location_id;
    const _product_ = model.product_id;
    useEffect(() => {
        if(typeof _location_ == "undefined")
            console.log("Undefined location");
        else{
            console.log("Defined location");
            const opt_locations = [];
            const lot_split = _location_.split(",");
            
            lot_split.map((each) => {
                locations.map((location) => {
                    if(location.id === parseInt(each, 10))
                    opt_locations.push({value: location.id, label: location.name})
                })
            })
            _setSelectedLocations(opt_locations);
        }
        if(typeof _category_ == "undefined")
            console.log("Undefined category");
        else{
            console.log("Defined category");
            const opt_categories = [];
            const cat_split = _category_.split(",");
            console.log("cat_split=>", cat_split);
            cat_split.map((each) => {
                categories.map((category) => {
                    if(category.id === parseInt(each, 10))
                    opt_categories.push({value: category.id, label: category.name})
                })
            })
            _setSelectedCategories(opt_categories);
        }
        if(typeof _product_ == "undefined")
            console.log("Undefined product");
        else{
            console.log("Defined product");
            const opt_products = [];
            const opt_products_split = [];
            const prod_split = _product_.split(",");
            const operation = prod_split.map((each) => {
                const data = each.split("-");
                opt_products_split.push(data[1]);
            })
            
            opt_products_split.map((each) => {
                products.map((product) => {
                    if(product.id === parseInt(each, 10))
                    opt_products.push({value: product.id, label: product.main_name})
                })
            })
            setSelectedProducts(opt_products);
        }

    }, [model]);
    
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
                    <button type="submit" className="btn bg-gradient-primary">Update</button>
                </div>
            </form>
        </>

    )
}
