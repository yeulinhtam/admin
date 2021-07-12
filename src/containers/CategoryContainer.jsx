import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import categoryApi from './../api/categoryApi';
import { getCategoriesRequest, getCategoriesSuccess, getCategoriesError } from './../actions/category';
import CategoriesTable from './../components/Category/index';


function CategoryContainer(props) {

    const { data } = useSelector(state => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCategories = () => {
            dispatch(getCategoriesRequest());
            categoryApi.getCategories().then(res =>{
                dispatch(getCategoriesSuccess(res.data))
            }).catch(err => {
                dispatch(getCategoriesError(err))
            })
        };
        fetchCategories();
    },[dispatch]);

    return (
        <React.Fragment>
            <CategoriesTable data={data}/>
        </React.Fragment>
    );
}

export default CategoryContainer;