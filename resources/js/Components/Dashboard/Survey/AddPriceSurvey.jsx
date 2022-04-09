import { useForm } from '@inertiajs/inertia-react'
import React, { useEffect, useState } from 'react'
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./style.css";

export default function AddPriceSurvey({close, model, locations, products, categories}) {

    const {data, setData, post, reset, errors} = useForm({ survey_id: '', main_price: '', alter_price: '', location_id: model.location_id, category_id: model.category_id, product_id: model.category_id});
    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('query.store'), {
            data, 
            onSuccess: () => {
                // setSelectedProducts([]),
                // _setSelectedLocations([]),
                // _setSelectedCategories([]),
                reset(),
                close()
            }, 
        });
    }

    // const _locations = [];
    // const _categories = [];
    
    // const  location_option =  locations.map((location) => {
    //     _locations.push({value: location.id, label: location.name})
    // })
    // const category_option = categories.map((category) => {
    //     _categories.push({value: category.id, label: category.name})
    // })

    // const [selectedCategories, setSelectedCategories] = useState([]);
    const [_selectedCategories, _setSelectedCategories] = useState([]);

    // const [selectedLocations, setSelectedLocations] = useState([]);
    const [_selectedLocations, _setSelectedLocations] = useState([]);

    const [selectedProducts, setSelectedProducts] = useState([]);
    // const [_selectedProducts, _setSelectedProducts] = useState([]);
    // const [selected_Products, setSelected_Products] = useState([]);

    const _category_ = model.category_id;
    const _location_ = model.location_id;
    const _product_ = model.product_id;
    useEffect(() => {
        let lot_split = [];
        let cat_split = [];
        let init_prod = [];
        if(typeof _location_ == "undefined")
            console.log("Undefined location");
        else{
            const opt_locations = [];
            lot_split = _location_.split(",");
            // setData({ ...data, location_id: lot_split[0] })
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
            const opt_categories = [];
            cat_split = _category_.split(",");
            // setData({ ...data, category_id: cat_split[0] })
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
            const opt_products = [];
            const opt_products_split = [];
            const prod_split = _product_.split(",");
            init_prod = prod_split[0].split("-");
            setData({ ...data, survey_id: model.id, product_id: init_prod[1], category_id: cat_split[0], location_id: lot_split[0] })
            // console.log("price data=>", data)
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
    // useEffect(() => {
    //     setData({ ...data, location_id: _selectedLocations[0].value })
    // }, [_selectedLocations]);
    
    // console.log("slider=>", _selectedLocations[0].label)
    const onLocationSlideChange = (e) => {
        setData({ ...data, location_id: _selectedLocations[e.slideIndex].value })
    }
    const onCategorySlideChange = (e) => {
        setData({ ...data, category_id: _selectedCategories[e.slideIndex].value })
    }
    const onProductSlideChange = (e) => {
        setData({ ...data, product_id: selectedProducts[e.slideIndex].value })
        // console.log("slider=>", selectedProducts[e.slideIndex].label)
    }
    // const handleChangeLocation = (options) => {
    //     const sel_locations = [];
    //     const sel_location_options = [];
    //     const operation = options.map((option) => {
    //         sel_locations.push(option.value);
    //         sel_location_options.push({value: option.value, label: option.label});
    //     })
    //     setSelectedLocations(sel_locations);
    //     _setSelectedLocations(sel_location_options);
    //     setData({ ...data, location_id: sel_locations.toString() })
    // };

    // const handleChangeCategory = (options) => {
    //     const sel_categories = [];
    //     const sel_categorie_options = [];
    //     const sel_products = [];
    //     const sel_product_options = [];
    //     const operation = options.map((option) => {
    //         sel_categories.push(option.value);
    //         sel_categorie_options.push({value: option.value, label: option.label});

    //         categories.map((category) => {
    //                 category.id === option.value? category.products?
    //                     category.products.map((product) => {
    //                         sel_product_options.push({value: category.id + "-" + product.id, label: product.main_name});
    //                         sel_products.push(category.id + "-" + product.id);
    //                     }) : null : null
    //             });
    //     })
        
    //     setSelectedCategories(sel_categories);
    //     _setSelectedCategories(sel_categorie_options);

    //     setSelectedProducts(sel_product_options);
    //     _setSelectedProducts(sel_product_options);
    //     setData({ ...data, category_id: sel_categories.toString(), product_id: sel_products.toString() })
    // };

    // const handleChangeProduct = (options) => {
    //     setSelectedProducts(options);

    //     const sel_products = [];
    //     const operation = options.map((option) => {
    //         sel_products.push(option.value);
    //     })
    //     setSelected_Products(sel_products);
    //     setData({ ...data, product_id: sel_products.toString() })
    // };

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="location_id" className="col-form-label">Seleccionar Ubicacion:</label>
                        <Slider className="slider-wrapper" onSlideChange={onLocationSlideChange}>
                            {_selectedLocations.map((item) => (
                                <div key={item.value} style={{ "textAlign": "center" }}>
                                {item.label}
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category_id" className="col-form-label">Seleccionar Categoria:</label>
                        <Slider className="slider-wrapper" onSlideChange={onCategorySlideChange}>
                            {_selectedCategories.map((item) => (
                                <div key={item.value} style={{ "textAlign": "center" }}>
                                {item.label}
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_id" className="col-form-label">Seleccionar Producto:</label>
                        <Slider className="slider-wrapper" onSlideChange={onProductSlideChange}>
                            {selectedProducts.map((item) => (
                                <div key={item.value} style={{ "textAlign": "center" }}>
                                {item.label}
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="form-group">
                        <label htmlFor="main_price" className="col-form-label">Producto Principal Precio:</label>
                        <input type="number" className="form-control" name='main_price' value={data.main_price} onChange={onChange} id="main_price"/>
                        {errors && <div className='text-danger mt-1'>{errors.main_price}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="alter_price" className="col-form-label">Producto Alternativo Precio:</label>
                        <input type="number" className="form-control" name='alter_price' value={data.alter_price} onChange={onChange} id="alter_price"/>
                        {errors && <div className='text-danger mt-1'>{errors.alter_price}</div>}
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