import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultUserManager from 'DefaultUserManager';
import { setUserInfo } from 'UserActionCreators';
import { getPostSummaries } from 'PostSummaryActionCreators';
import { deletePost} from 'PostActionCreators';
import { getCategories } from 'CategoryActionCreators';
import { Link } from 'react-router-dom';

export default () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const posts = useSelector(state => state.postSummaries);
    const categories = useSelector(state => state.categories);

    useEffect(() => {
        if (!user) {
            dispatch(setUserInfo())
                .then((token) => {
                    if (!token) {
                        DefaultUserManager.signinRedirect({ state: { url: `${REDIRECT_URI}/admin` } });
                    }
                })
                .catch(e => {
                    console.log(e);
                    DefaultUserManager.signinRedirect({ state: { url: `${REDIRECT_URI}/admin` } });
                });
        }

        if (!categories || categories.length === 0) {
            dispatch(getCategories());
        }

        dispatch(getPostSummaries());
    }, []);

    const _deletePost = async (id) => {
        await dispatch(deletePost(id));
        dispatch(getPostSummaries());
    }
    
    if (!user) {
        return <div />;
    }

    const close = (
        <svg style={{ height: '20px', width: '25px', cursor: 'pointer' }}>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
    );

    const edit = (
        <svg style={{ height: '20px', width: '25px' }}>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
    );

    return (
        <div className="container admin">
            <div className="col-sm-2 row"><Link to="/edit"><div className="button" style={{ marginLeft: '20px' }}>Add post</div></Link></div>
            <div className="row" />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Created</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        categories && categories.length > 0 ?
                            posts.map((post) => {
                                const category = categories.find(cat => cat.id === post.categoryId);
                                return (
                                    <tr key={post.id}>
                                        <td>{post.title}</td>
                                        <td>{category ? category.name : ''}</td>
                                        <td>{post.createdOn}</td>
                                        <td><Link to={'/edit/'.concat(post.id)}>{edit}</Link></td>
                                        <td><div onClick={() => _deletePost(post.id)} role="presentation">{close}</div></td>
                                    </tr>
                                );
                            }) : []
                    }
                </tbody>
            </table>
        </div>
    );
}
