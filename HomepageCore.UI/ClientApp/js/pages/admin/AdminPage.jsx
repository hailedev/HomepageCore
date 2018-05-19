import React, { Component } from 'react';
import UserStore from 'UserStore';
import { Container } from 'flux/utils';
import DefaultUserManager from 'DefaultUserManager';
import UserActionCreators from 'UserActionCreators';
import PostSummaryActionCreators from 'PostSummaryActionCreators';
import PostActionCreators from 'PostActionCreators';
import PostSummaryStore from 'PostSummaryStore';
import CategoryStore from 'CategoryStore';
import CategoryActionCreators from 'CategoryActionCreators';
import { Link } from 'react-router-dom';

class AdminPage extends Component {
    static getStores() {
        return [UserStore, PostSummaryStore, CategoryStore];
    }

    static calculateState() {
        return { user: UserStore.getState(), posts: PostSummaryStore.getState(), categories: CategoryStore.getState() };
    }

    componentDidMount() {
        if (!this.state.user) {
            UserActionCreators.setUserInfo()
                .then((token) => {
                    if (!token) {
                        DefaultUserManager.signinRedirect({ state: { url: `${REDIRECT_URI}/admin` } });
                    }
                })
                .catch(() => DefaultUserManager.signinRedirect({ state: { url: `${REDIRECT_URI}/admin` } }));
        }

        if (!this.state.categories || this.state.categories.length === 0) {
            CategoryActionCreators.getCategories();
        }
        PostSummaryActionCreators.getPostSummaries();
    }

    delete(id) {
        PostActionCreators.deletePost(id)
            .then(() => PostSummaryActionCreators.getPostSummaries());
    }

    render() {
        if (!this.state.user) {
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

        const posts = [];
        if (this.state.categories && this.state.categories.length > 0) {
            this.state.posts.map((post) => {
                const category = this.state.categories.find(cat => cat.id === post.categoryId);
                posts.push( // eslint-disable-line
                    <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{category ? category.name : ''}</td>
                        <td>{post.createdOn}</td>
                        <td><Link to={'edit/'.concat(post.id)}>{edit}</Link></td>
                        <td onClick={this.delete.bind(this, post.id)} role="presentation">{close}</td>
                    </tr>);
            });
        }

        return (
            <div className="container admin">
                <div className="col-sm-2 row"><Link to="edit"><div className="button" style={{ marginLeft: '20px' }}>Add post</div></Link></div>
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
                        {posts}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Container.create(AdminPage);
