import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EnhancedTable from './../components/Post/index';
import { getPostsRequest, getPostsSuccess, getPostsError } from './../actions/post';
import postApi from '../api/postApi';


function PostContainer(props) {

    const dispatch = useDispatch();
    const { data } = useSelector(state => state.posts);

    useEffect(() => {
        const fetchPosts = () => {
            dispatch(getPostsRequest());
            postApi.getPosts().then(res => {
                dispatch(getPostsSuccess(res.data))
            }).catch(err => {
                dispatch(getPostsError(err))
            })
        };
        fetchPosts();
    }, [dispatch])

    return (
        <React.Fragment>
            <EnhancedTable data={data} />
        </React.Fragment>
    );
}

export default PostContainer;