var React = require("react");
var Editor = require("draft-js").Editor;
var EditorState = require("draft-js").EditorState;
var RichUtils = require("draft-js").RichUtils;
var ContentState = require("draft-js").ContentState;
var AtomicBlockUtils = require("draft-js").AtomicBlockUtils;
var CategoryStore = require("CategoryStore");
var CategoryActionCreators = require("CategoryActionCreators");
var stateToHTML = require("draft-js-export-html").stateToHTML;
var PostActionCreators = require("PostActionCreators");
var Model = require("react-modal");
var convertToRaw = require("draft-js").convertToRaw;
var convertFromRaw = require("draft-js").convertFromRaw;
var UserInfoApi = require("../../api/UserInfoApi");
var createReactClass = require("create-react-class");

var StyleButton = createReactClass({
    render: function(){
        var className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    },
    onToggle: function(e){
        e.preventDefault();
        this.props.onToggle(this.props.style);
    }
});

var AdminPage = createReactClass({
    customRefs:{ },
    componentWillMount: function(){
        UserInfoApi.getUserInfo().then(function(info){
            if(this.state.categories === null) {
                CategoryActionCreators.getCategories();
            }
            if(this.props.match.params.id){
                PostActionCreators.getPost(this.props.match.params.id,true).then(function(response){
                    var contentState = convertFromRaw(JSON.parse(response.raw));
                    var editorState = EditorState.createWithContent(contentState);
                    this.setState({id:response.id,title:response.title,blurb:response.blurb,tags:response.tags,editorState:editorState,category:response.categoryId,loggedIn:true});
                }.bind(this));
            } else {
                this.setState({loggedIn:true});
            }
        }.bind(this));
        
        this.blockTypes = [
            {label: 'H1', style: 'header-one'},
            {label: 'H2', style: 'header-two'},
            {label: 'H3', style: 'header-three'},
            {label: 'H4', style: 'header-four'},
            {label: 'H5', style: 'header-five'},
            {label: 'H6', style: 'header-six'},
            {label: 'Blockquote', style: 'blockquote'},
            {label: 'UL', style: 'unordered-list-item'},
            {label: 'OL', style: 'ordered-list-item'},
            {label: 'Code Block', style: 'code-block'}
        ];
        this.inlineStyles = [
            {label: 'Bold', style: 'BOLD'},
            {label: 'Italic', style: 'ITALIC'},
            {label: 'Underline', style: 'UNDERLINE'},
            {label: 'Monospace', style: 'CODE'}
        ];
    },
    getInitialState: function(){
        return {editorState: EditorState.createEmpty(),showURLInput:false,url:"",urlType:"",title:"",blurb:"",tags:"",category:"c3943998-774b-4ac4-9ccd-8e740e20ab2c"};
    },
    render: function(){
        if(!this.state.loggedIn){
            return (
                <div className="admin">
                    <div className="row">
                        <div className="button" style={{marginLeft:"50px",width:"100px"}} onClick={this.onLogin}>Log in</div>
                    </div>
                </div>
            );
        }
        var className = "RichEditor-editor";
        var contentState = this.state.editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== "unstyled") {
                className += " RichEditor-hidePlaceholder";
            }
        }

        var selection = this.state.editorState.getSelection();
        var blockType = this.state.editorState.getCurrentContent()
                                              .getBlockForKey(selection.getStartKey())
                                              .getType();

        var blockStyleControls = [], inlineStyleControls = [], i, type;
        for(i = 0; i<this.blockTypes.length; i++){
            type = this.blockTypes[i];
            blockStyleControls.push(
                <StyleButton key={type.label}
                             active={type.style === blockType}
                             label={type.label}
                             onToggle={this.toggleBlockType}
                             style={type.style}/>
            );
        }

        var currentStyle = this.state.editorState.getCurrentInlineStyle();
        for(i = 0; i<this.inlineStyles.length; i++){
            type = this.inlineStyles[i];
            inlineStyleControls.push(
                <StyleButton key={type.label}
                             active={currentStyle.has(type.style)}
                             label={type.label}
                             onToggle={this.toggleInlineStyle}
                             style={type.style}/>
            );
        }
        var categoryOptions = [];
        if(this.state.categories !== null){
            for(i=0; i<this.state.categories.length; i++){
                var category = this.state.categories[i];
                categoryOptions.push(<option key={category.id} value={category.id}>{category.name}</option>);
            }
        }
        return (
            <div className="container admin">
                <div className="row">
                    <div className="col-md-2">Title</div>
                    <div className="col-md-10"><input type="text" value={this.state.title} onChange={this.onTitleChange}/></div>
                </div>
                <div className="row">
                    <div className="col-md-2">Blurb</div>
                    <div className="col-md-10"><input type="text" value={this.state.blurb} onChange={this.onBlurbChange}/></div>
                </div>
                <div className="row">
                    <div className="col-md-2">Tags</div>
                    <div className="col-md-10"><input type="text" value={this.state.tags} onChange={this.onTagsChange}/></div>
                </div>
                <div className="row">
                    <div className="col-md-2">Category</div>
                    <div className="col-md-10">
                        <select name="category" value={this.state.category} onChange={this.onCategoryChange}>
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
                            <button onMouseDown={this.addImage}>
                                Add Image
                            </button>
                        </div>
                        <div className={className} onClick={this.focus}>
                            <Editor blockRendererFn={this.mediaBlockRenderer}
                                    blockStyleFn={this.getBlockStyle}
                                    editorState={this.state.editorState}
                                    handleKeyCommand={this.handleKeyCommand}
                                    onChange={this.onChange}
                                    onTab={this.onTab}
                                    ref={function(input){ this.customRefs.editor = input }.bind(this)}
                                    spellCheck={true}/>
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginTop:"10px"}}>
                    <div className="col-md-offset-10 col-md-2">
                        <div className="button" style={{marginLeft:"50px"}} onClick={this.onSubmit}>Submit</div>
                    </div>
                </div>
                <Model isOpen={this.state.showURLInput}
                       contentLabel="Modal"
                       onRequestClose={this.closeModal}
                       style={{overlay:{backgroundColor:"inherit"},content:{position:"relative",left:"auto",right:"auto",bottom:"auto",top:"auto",margin:"150px auto",width:"500px",height:"210px"}}}>
                    <div>
                        <div>URL</div>
                        <input onChange={this.onURLChange}
                               ref={function(input){ this.customRefs.url}.bind(this)}
                               type="text"
                               value={this.state.urlValue}/>
                        <div>Caption</div>
                        <input onChange={this.onCaptionChange}
                               ref={function(input){ this.customRefs.caption}.bind(this)}
                               type="text"
                               value={this.state.caption}/>
                        <div className="button" onClick={this.confirmMedia}>Confirm</div>
                    </div>
                </Model>
            </div>
        );
    },
    handleKeyCommand: function(command){
        var newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.setState({editorState: newState});
            return true;
        }
        return false;
    },
    onTab: function(e){
        this.setState({editorState: RichUtils.onTab(e, this.state.editorState, 4)});
    },
    toggleBlockType: function(type){
        this.setState({editorState: RichUtils.toggleBlockType(this.state.editorState, type)});
    },
    toggleInlineStyle: function(style){
        this.setState({editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)});
    },
    getBlockStyle: function(block){
        switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            default: return null;
        }
    },
    onChange:function(editorState){
        this.setState({editorState:editorState});
    },
    focus: function(){
        this.customRefs.editor.focus();
    },
    onSubmit: function(){
        var options = {
            blockRenderers: {
                atomic: function(block) {
                    var data = this.state.editorState.getCurrentContent().getEntity(block.getEntityAt(0)).getData();
                    var src = data.src;
                    var caption = data.caption;
                    return "<div><img style='border:10px solid white;background-color:white;display:block;margin:auto' src='" + src + "'/><div style='font-size:14px;padding-top:10px;text-align:center'>" + caption + "</div></div>";
                }.bind(this)
            }
        };
        var html = stateToHTML(this.state.editorState.getCurrentContent(),options);
        var post = {title:this.state.title,content:html,tags:this.state.tags,categoryId:this.state.category,id:this.state.id,raw:JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))};
        if(this.state.blurb){
            post.blurb = this.state.blurb;
        }
        PostActionCreators.addPost(post).then(function(){
            var editorState = EditorState.push(this.state.editorState, ContentState.createFromText(""));
            this.setState({editorState:editorState,title:"",blurb:"",tags:"",category:"c3943998-774b-4ac4-9ccd-8e740e20ab2c"});
        }.bind(this));
    },
    promptForMedia: function(type){
        this.setState({
            showURLInput: true,
            urlValue: "",
            caption:"",
            urlType: type
        });
    },
    addImage: function(){
        this.promptForMedia("image");
    },
    onURLChange: function(e){
        this.setState({urlValue: e.target.value});
    },
    onCaptionChange: function(e){
        this.setState({caption: e.target.value});
    },
    confirmMedia: function(e){
        e.preventDefault();
        var editorState = this.state.editorState, urlValue = this.state.urlValue, urlType = this.state.urlType, caption = this.state.caption;
        var contentState = editorState.getCurrentContent();
        var contentStateWithEntity = contentState.createEntity(
            urlType,
            "IMMUTABLE",
            {src: urlValue, caption:caption}
        );
        var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        var newEditorState = EditorState.set(
            editorState,
            {currentContent: contentStateWithEntity}
        );

        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                " "
            ),
            showURLInput: false,
            urlValue: "",
            caption:""
        });
    },
    mediaBlockRenderer: function(block){
        if (block.getType() === "atomic") {
            return {
                component: this.getMedia,
                editable: false
            };
        }
        return null;
    },
    getMedia: function(props){
        var entity = props.contentState.getEntity(
            props.block.getEntityAt(0)
        );
        var src = entity.getData().src;
        return <img src={src}/>;
    },
    closeModal: function(){
        this.setState({showURLInput: false})
    },
    onTitleChange: function(e){
        this.setState({title: e.target.value});
    },
    onBlurbChange: function(e){
        this.setState({blurb: e.target.value});
    },
    onTagsChange: function(e){
        this.setState({tags: e.target.value});
    },
    onCategoryChange: function(e){
        this.setState({category:e.target.value});
    },
    onLogin: function(){
        window.location.href = window.location.origin + "/api/account/external-login?returnUrl=" + encodeURIComponent(window.location.href);
    }
});

AdminPage.getStores = function(){
    return [CategoryStore];
};

AdminPage.calculateState = function(prevState){
    return {categories: CategoryStore.getState()};
};

var AdminPageContainer = require("flux/utils").Container.create(AdminPage);
module.exports = AdminPageContainer;