import React, { useState, useRef, useEffect } from 'react';
import { Editor, EditorState, RichUtils, ContentState, AtomicBlockUtils, convertFromRaw, convertToRaw, Entity } from 'draft-js';
import { useParams } from 'react-router-dom';
import { getCategories } from 'CategoryActionCreators';
import { getPost } from 'PostActionCreators';
import { stateToHTML } from 'draft-js-export-html';
import Model from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import StyleButton from './StyleButton';

export default () => {
    const isMounted = useRef(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const categories = useSelector(state => state.categories);
    const posts = useSelector(state => state.posts);
    const params = useParams();

    const [state, setState] = useState({
        editorState: EditorState.createEmpty(),
        showUrlInput: false,
        urlType: '',
        title: '',
        blurb: '',
        tags: '',
        list: '',
        category: 'c3943998-774b-4ac4-9ccd-8e740e20ab2c'
    });

    const _customRefs = {};
    const _blockTypes = [
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
    const _inlineStyles = [
        { label: 'Bold', style: 'BOLD' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' },
        { label: 'Monospace', style: 'CODE' }
    ];

    if (!isMounted.current) {
        if (!categories) {
            dispatch(getCategories());
        }
    
        if (params.id) {
            dispatch(getPost(params.id, true));
        }
        isMounted.current = true;
    }

    useEffect(() => {
        const post = posts[params.id];
        if (post) {
            const contentState = post.raw ? convertFromRaw(JSON.parse(post.raw)) : ContentState.createFromText(post.content);
            const editorState = EditorState.createWithContent(contentState);
            setState({ ...state, id: post.id, title: post.title, blurb: post.blurb, tags: post.tags, editorState, category: post.categoryId });
        }
    }, [posts]);

    const onTab = (e) => {
        setState({ ...state, editorState: RichUtils.onTab(e, state.editorState, 4) });
    }

    const onChange = (editorState) => {
        setState({ ...state, editorState });
    }

    const onSubmit = async () => {
        const options = {
            blockRenderers: {
                atomic: (block) => {
                    const data = state.editorState.getCurrentContent().getEntity(block.getEntityAt(0)).getData();
                    return `<div><img style='border:10px solid white;background-color:white;display:block;margin:auto' src='${data.src}'/><div style='font-size:14px;padding-top:10px;text-align:center'>${data.caption}</div></div>`;
                }
            }
        };
        const html = stateToHTML(state.editorState.getCurrentContent(), options);
        const post = { title: state.title, content: html, tags: state.tags, categoryId: state.category, id: state.id, raw: JSON.stringify(convertToRaw(state.editorState.getCurrentContent())) };
        if (state.blurb) {
            post.blurb = state.blurb;
        }
        await PostActionCreators.addPost(post);
        const editorState = EditorState.push(state.editorState, ContentState.createFromText(''));
        if (!params.id) {
            setState({ ...state, editorState, title: '', blurb: '', tags: '', category: 'c3943998-774b-4ac4-9ccd-8e740e20ab2c' });
        }
    }

    const onURLChange = (e) => {
        setState({ ...state, urlValue: e.target.value });
    }

    const onCaptionChange = (e) => {
        setState({ ...state, caption: e.target.value });
    }

    const onTitleChange = (e) => {
        setState({ ...state, title: e.target.value });
    }

    const onBlurbChange = (e) => {
        setState({ ...state, blurb: e.target.value });
    }

    const onTagsChange = (e) => {
        setState({ ...state, tags: e.target.value });
    }

    const onCategoryChange = (e) => {
        setState({ ...state, category: e.target.value });
    }

    const onLinkChange = (e) => {
        setState({ ...state, link: e.target.value });
    }

    const getMedia = ({ contentState, block }) => {
        const entity = contentState.getEntity(block.getEntityAt(0));
        return <img src={entity.getData().src} alt="" />;
    }

    const getBlockStyle = (block) => {
        switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            default: return null;
        }
    }

    const addImage = () => {
        promptForMedia('image');
    }

    const promptForMedia = (type) => {
        setState({
            ...state,
            showURLInput: true,
            urlValue: '',
            caption: '',
            urlType: type
        });
    }

    const focus = () => {
        _customRefs.editor.focus();
    }

    const toggleLink = () => {
        const entityKey = Entity.create('LINK', 'MUTABLE', { url: state.link });
        setState({ ...state, editorState: RichUtils.toggleLink(state.editorState, state.editorState.getSelection(), entityKey) });
    }

    const toggleInlineStyle = (style) => {
        setState({ ...state, editorState: RichUtils.toggleInlineStyle(state.editorState, style) });
    }

    const toggleBlockType = (type) => {
        setState({ ...state, editorState: RichUtils.toggleBlockType(state.editorState, type) });
    }

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(state.editorState, command);
        if (newState) {
            setState({ ...state, editorState: newState });
            return true;
        }
        return false;
    }

    const closeModal = () => {
        setState({ ...state, showURLInput: false });
    }

    const mediaBlockRenderer = (block) => {
        if (block.getType() === 'atomic') {
            return {
                component: getMedia,
                editable: false
            };
        }
        return null;
    }

    const confirmMedia = (e) => {
        e.preventDefault();
        const { editorState, urlValue, urlType, caption } = state;
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

        setState({
            ...state,
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

    if (!user) {
        return <div />;
    }

    let className = 'RichEditor-editor';
    const contentState = state.editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    const selection = state.editorState.getSelection();
    const blockType = state.editorState.getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    const blockStyleControls = [];
    const inlineStyleControls = [];
    let type;

    for (let i = 0; i < _blockTypes.length; i += 1) {
        type = _blockTypes[i];
        blockStyleControls.push(<StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={s => toggleBlockType(s)}
            style={type.style}
        />);
    }

    const currentStyle = state.editorState.getCurrentInlineStyle();
    for (let i = 0; i < _inlineStyles.length; i += 1) {
        type = _inlineStyles[i];
        inlineStyleControls.push(<StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={s => toggleInlineStyle(s)}
            style={type.style}
        />);
    }
    const categoryOptions = [];
    if (categories !== null) {
        for (let i = 0; i < categories.length; i += 1) {
            const category = categories[i];
            categoryOptions.push(<option key={category.id} value={category.id}>{category.name}</option>);
        }
    }

    return (
        <div className="container admin">
            <div className="row">
                <div className="col-md-2">Title</div>
                <div className="col-md-10"><input type="text" value={state.title} onChange={onTitleChange} /></div>
            </div>
            <div className="row">
                <div className="col-md-2">Blurb</div>
                <div className="col-md-10"><input type="text" value={state.blurb} onChange={onBlurbChange} /></div>
            </div>
            <div className="row">
                <div className="col-md-2">Tags</div>
                <div className="col-md-10"><input type="text" value={state.tags} onChange={onTagsChange} /></div>
            </div>
            <div className="row">
                <div className="col-md-2">Category</div>
                <div className="col-md-10">
                    <select name="category" value={state.category} onChange={onCategoryChange}>
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
                        <button onMouseDown={() => toggleLink}>Add Link</button>
                        <input type="text" style={{ margin: '0 10px' }} value={state.link} onChange={onLinkChange} />
                    </div>
                    <div className="RichEditor-controls">
                        <button onMouseDown={addImage}>
                            Add Image
                        </button>
                    </div>
                    <div className={className} onClick={focus} role="presentation">
                        <Editor
                            blockRendererFn={mediaBlockRenderer}
                            blockStyleFn={getBlockStyle}
                            editorState={state.editorState}
                            handleKeyCommand={handleKeyCommand}
                            onChange={onChange}
                            onTab={onTab}
                            ref={function (input) { _customRefs.editor = input; }}
                            spellCheck
                        />
                    </div>
                </div>
            </div>
            <div className="row" style={{ marginTop: '10px' }}>
                <div className="col-md-offset-10 col-md-2">
                    <div className="button" style={{ marginLeft: '50px' }} onClick={onSubmit} role="presentation">Submit</div>
                </div>
            </div>
            <Model
                isOpen={state.showUrlInput}
                contentLabel="Modal"
                onRequestClose={closeModal}
                style={{ overlay: { backgroundColor: 'inherit' }, content: { position: 'relative', left: 'auto', right: 'auto', bottom: 'auto', top: 'auto', margin: '150px auto', width: '500px', height: '210px' } }}
            >
                <div>
                    <div>URL</div>
                    <input
                        onChange={onURLChange}
                        ref={function (input) { _customRefs.url = input; }}
                        type="text"
                        value={state.urlValue}
                    />
                    <div>Caption</div>
                    <input
                        onChange={onCaptionChange}
                        ref={function (input) { _customRefs.caption = input; }}
                        type="text"
                        value={state.caption}
                    />
                    <div className="button" onClick={confirmMedia} role="presentation">Confirm</div>
                </div>
            </Model>
        </div>
    );
}
