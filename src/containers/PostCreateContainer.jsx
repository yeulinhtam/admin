import React, { useEffect } from 'react';
import CreatePost from './../components/Post/CreatePost';
import categoryApi from './../api/categoryApi';
import { getCategoriesRequest, getCategoriesSuccess, getCategoriesError } from './../actions/category';
import { useDispatch, useSelector } from 'react-redux';

function PostCreateContainer(props) {

    const dispatch = useDispatch();
    const { data } = useSelector(state => state.categories);

    useEffect(() => {
        const fetchCategories = () => {
            dispatch(getCategoriesRequest());
            categoryApi.getCategories().then(res => {
                dispatch(getCategoriesSuccess(res.data))
            }).catch(err => {
                dispatch(getCategoriesError(err))
            })
        };
        fetchCategories();
    }, [dispatch]);

    return (
        <React.Fragment>
            <CreatePost categories={data}/>
        </React.Fragment>
    );
}

export default PostCreateContainer;