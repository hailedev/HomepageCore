import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, ContentState, AtomicBlockUtils, convertFromRaw, convertToRaw, Entity } from 'draft-js';
import CategoryStore from 'CategoryStore';
import UserStore from 'UserStore';
import CategoryActionCreators from 'CategoryActionCreators';
import { stateToHTML } from 'draft-js-export-html';
import PostActionCreators from 'PostActionCreators';
import Model from 'react-modal';
import { Container } from 'flux/utils';
import StyleButton from './StyleButton';

class EditPage extends Component {
    static getStores() {
        return [CategoryStore, UserStore];
    }

    static calculateState() {
        return { categories: CategoryStore.getState(), user: UserStore.getState() };
    }
    constructor(props) {
        super(props);
        this.customRefs = {};
        this.state = { editorState: EditorState.createEmpty(), showURLInput: false, urlType: '', title: '', blurb: '', tags: '', link: '', category: 'c3943998-774b-4ac4-9ccd-8e740e20ab2c' };
    }
    componentWillMount() {
        if (!this.state.categories) {
            CategoryActionCreators.getCategories();
        }
        if (this.props.match.params.id) {
            PostActionCreators.getPost(this.props.match.params.id, true).then((response) => {
                const contentState = response.raw ? convertFromRaw(JSON.parse(response.raw)) : ContentState.createFromText(response.content);
                const editorState = EditorState.createWithContent(contentState);
                this.setState({ id: response.id, title: response.title, blurb: response.blurb, tags: response.tags, editorState, category: response.categoryId }); // eslint-disable-line
            });
        }
        this.blockTypes = [
            { label: 'H1', style: 'header-one' },
            { label: 'H2', style: 'header-two' },
            { label: 'H3', style: 'header-three' },
            { label: 'H4', style: 'header-four' },
            { label: 'H5', style: 'header-five' },
            { label: 'H6', style: 'header-six' },
            { label: 'Blockquote', style: 'blockquote' },
            { label: 'UL', style: 'unordered-list-item' },
            { label: 'OL', style: 'ordered-list-item' },
            { label: 'Code Block', style: 'code-block' }
        ];
        this.inlineStyles = [
            { label: 'Bold', style: 'BOLD' },
            { label: 'Italic', style: 'ITALIC' },
            { label: 'Underline', style: 'UNDERLINE' },
            { label: 'Monospace', style: 'CODE' }
        ];
    }
    onTab(e) {
        this.setState({ editorState: RichUtils.onTab(e, this.state.editorState, 4) });
    }

    onChange(editorState) {
        this.setState({ editorState });
    }

    onSubmit() {
        const options = {
            blockRenderers: {
                atomic: function (block) {
                    const data = this.state.editorState.getCurrentContent().getEntity(block.getEntityAt(0)).getData();
                    return `<div><img style='border:10px solid white;background-color:white;display:block;margin:auto' src='${data.src}'/><div style='font-size:14px;padding-top:10px;text-align:center'>${data.caption}</div></div>`;
                }.bind(this)
            }
        };
        const html = stateToHTML(this.state.editorState.getCurrentContent(), options);
        const post = { title: this.state.title, content: html, tags: this.state.tags, categoryId: this.state.category, id: this.state.id, raw: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())) };
        if (this.state.blurb) {
            post.blurb = this.state.blurb;
        }
        PostActionCreators.addPost(post).then(() => {
            const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
            if (!this.props.match.params.id) {
                this.setState({ editorState, title: '', blurb: '', tags: '', category: 'c3943998-774b-4ac4-9ccd-8e740e20ab2c' });
            }
        });
    }

    onURLChange(e) {
        this.setState({ urlValue: e.target.value });
    }

    onCaptionChange(e) {
        this.setState({ caption: e.target.value });
    }

    onTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    onBlurbChange(e) {
        this.setState({ blurb: e.target.value });
    }
    onTagsChange(e) {
        this.setState({ tags: e.target.value });
    }
    onCategoryChange(e) {
        this.setState({ category: e.target.value });
    }
    onLinkChange(e) {
        this.setState({ link: e.target.value });
    }
    onLogin() {
        window.location.href = `${window.location.origin}/api/account/external-login?returnUrl=${encodeURIComponent(window.location.href)}`;
    }

    getMedia(props) {
        const entity = props.contentState.getEntity(props.block.getEntityAt(0));
        return <img src={entity.getData().src} alt="" />;
    }

    getBlockStyle(block) {
        switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            default: return null;
        }
    }
    addImage() {
        this.promptForMedia('image');
    }
    promptForMedia(type) {
        this.setState({
            showURLInput: true,
            urlValue: '',
            caption: '',
            urlType: type
        });
    }
    focus() {
        this.customRefs.editor.focus();
    }
    toggleLink() {
        const entityKey = Entity.create('LINK', 'MUTABLE', { url: this.state.link });
        this.setState({ editorState: RichUtils.toggleLink(this.state.editorState, this.state.editorState.getSelection(), entityKey) });
    }
    toggleInlineStyle(style) {
        this.setState({ editorState: RichUtils.toggleInlineStyle(this.state.editorState, style) });
    }
    toggleBlockType(type) {
        this.setState({ editorState: RichUtils.toggleBlockType(this.state.editorState, type) });
    }
    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.setState({ editorState: newState });
            return true;
        }
        return false;
    }
    closeModal() {
        this.setState({ showURLInput: false });
    }
    mediaBlockRenderer(block) {
        if (block.getType() === 'atomic') {
            return {
                component: this.getMedia,
                editable: false
            };
        }
        return null;
    }
    confirmMedia(e) {
        e.preventDefault();
        const { editorState, urlValue, urlType, caption } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            urlType,
            'IMMUTABLE',
            { src: urlValue, caption }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity }
        );

        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            ),
            showURLInput: false,
            urlValue: '',
            caption: ''
        });
    }

    render() {
        if (!this.state.user) {
            return <div />;
        }

        let className = 'RichEditor-editor';
        const contentState = this.state.editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        const selection = this.state.editorState.getSelection();
        const blockType = this.state.editorState.getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        const blockStyleControls = [];
        const inlineStyleControls = [];
        let type;

        for (let i = 0; i < this.blockTypes.length; i += 1) {
            type = this.blockTypes[i];
            blockStyleControls.push(<StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={s => this.toggleBlockType(s)}
                style={type.style}
            />);
        }

        const currentStyle = this.state.editorState.getCurrentInlineStyle();
        for (let i = 0; i < this.inlineStyles.length; i += 1) {
            type = this.inlineStyles[i];
            inlineStyleControls.push(<StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={s => this.toggleInlineStyle(s)}
                style={type.style}
            />);
        }
        const categoryOptions = [];
        if (this.state.categories !== null) {
            for (let i = 0; i < this.state.categories.length; i += 1) {
                const category = this.state.categories[i];
                categoryOptions.push(<option key={category.id} value={category.id}>{category.name}</option>);
            }
        }
        return (
            <div className="container admin">
                <div className="row">
                    <div className="col-md-2">Title</div>
                    <div className="col-md-10"><input type="text" value={this.state.title} onChange={this.onTitleChange.bind(this)} /></div>
                </div>
                <div className="row">
                    <div className="col-md-2">Blurb</div>
                    <div className="col-md-10"><input type="text" value={this.state.blurb} onChange={this.onBlurbChange.bind(this)} /></div>
                </div>
                <div className="row">
                    <div className="col-md-2">Tags</div>
                    <div className="col-md-10"><input type="text" value={this.state.tags} onChange={this.onTagsChange.bind(this)} /></div>
                </div>
                <div className="row">
                    <div className="col-md-2">Category</div>
                    <div className="col-md-10">
                        <select name="category" value={this.state.category} onChange={this.onCategoryChange.bind(this)}>
                            {categoryOptions}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 RichEditor-root">
                        <div className="RichEditor-controls">
                            {blockStyleControls}
                        </div>
                        <div className="RichEditor-controls">
                            {inlineStyleControls}
                        </div>
                        <div className="RichEditor-controls">
                            <button onMouseDown={this.toggleLink.bind(this)}>Add Link</button>
                            <input type="text" style={{ margin: '0 10px' }} value={this.state.link} onChange={this.onLinkChange.bind(this)} />
                        </div>
                        <div className="RichEditor-controls">
                            <button onMouseDown={this.addImage.bind(this)}>
                                Add Image
                            </button>
                        </div>
                        <div className={className} onClick={this.focus.bind(this)} role="presentation">
                            <Editor
                                blockRendererFn={this.mediaBlockRenderer.bind(this)}
                                blockStyleFn={this.getBlockStyle.bind(this)}
                                editorState={this.state.editorState}
                                handleKeyCommand={this.handleKeyCommand.bind(this)}
                                onChange={this.onChange.bind(this)}
                                onTab={this.onTab.bind(this)}
                                ref={function (input) { this.customRefs.editor = input; }.bind(this)}
                                spellCheck
                            />
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '10px' }}>
                    <div className="col-md-offset-10 col-md-2">
                        <div className="button" style={{ marginLeft: '50px' }} onClick={this.onSubmit.bind(this)} role="presentation">Submit</div>
                    </div>
                </div>
                <Model
                    isOpen={this.state.showURLInput}
                    contentLabel="Modal"
                    onRequestClose={this.closeModal.bind(this)}
                    style={{ overlay: { backgroundColor: 'inherit' }, content: { position: 'relative', left: 'auto', right: 'auto', bottom: 'auto', top: 'auto', margin: '150px auto', width: '500px', height: '210px' } }}
                >
                    <div>
                        <div>URL</div>
                        <input
                            onChange={this.onURLChange.bind(this)}
                            ref={function (input) { this.customRefs.url = input; }.bind(this)}
                            type="text"
                            value={this.state.urlValue}
                        />
                        <div>Caption</div>
                        <input
                            onChange={this.onCaptionChange.bind(this)}
                            ref={function (input) { this.customRefs.caption = input; }.bind(this)}
                            type="text"
                            value={this.state.caption}
                        />
                        <div className="button" onClick={this.confirmMedia.bind(this)} role="presentation">Confirm</div>
                    </div>
                </Model>
            </div>
        );
    }
}

export default Container.create(EditPage);
