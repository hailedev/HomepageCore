var React = require("react");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

var DISQUS_CONFIG = [
    'shortname', 'identifier', 'title', 'url', 'category_id', 'onNewComment'
  ];
var __disqusAdded = false;

function copyProps(context, props, prefix = '') {
    Object.keys(props).forEach((prop) => {
        context[prefix + prop] = props[prop];
    });

    if (typeof props.onNewComment === 'function') {
        context[prefix + 'config'] = function config() {
            this.callbacks.onNewComment = [
                function handleNewComment(comment) {
                    props.onNewComment(comment);
                }
            ];
        };
    }
}

var ReactDisqusThread = createReactClass({
    displayName: 'DisqusThread',
    
    propTypes: {
        id: PropTypes.string,

        /**
         * `shortname` tells the Disqus service your forum's shortname,
         * which is the unique identifier for your website as registered
         * on Disqus. If undefined , the Disqus embed will not load.
         */
        shortname: PropTypes.string.isRequired,

        /**
         * `identifier` tells the Disqus service how to identify the
         * current page. When the Disqus embed is loaded, the identifier
         * is used to look up the correct thread. If disqus_identifier
         * is undefined, the page's URL will be used. The URL can be
         * unreliable, such as when renaming an article slug or changing
         * domains, so we recommend using your own unique way of
         * identifying a thread.
         */
        identifier: PropTypes.string,

        /**
         * `title` tells the Disqus service the title of the current page.
         * This is used when creating the thread on Disqus for the first time.
         * If undefined, Disqus will use the <title> attribute of the page.
         * If that attribute could not be used, Disqus will use the URL of the page.
         */
        title: PropTypes.string,

        /**
         * `url` tells the Disqus service the URL of the current page.
         * If undefined, Disqus will take the window.location.href.
         * This URL is used to look up or create a thread if disqus_identifier
         * is undefined. In addition, this URL is always saved when a thread is
         * being created so that Disqus knows what page a thread belongs to.
         */
        url: PropTypes.string,

        /**
         * `category_id` tells the Disqus service the category to be used for
         * the current page. This is used when creating the thread on Disqus
         * for the first time.
         */
        category_id: PropTypes.string,

        /**
         * `onNewComment` function accepts one parameter `comment` which is a
         * JavaScript object with comment `id` and `text`. This allows you to track
         * user comments and replies and run a script after a comment is posted.
         */
        onNewComment: PropTypes.func
    },

    getDefaultProps: function() {
        return {
            shortname: null,
            identifier: null,
            title: null,
            url: null,
            category_id: null,
            onNewComment: null
        };
    },

    componentDidMount: function() {
        this.loadDisqus();
    },

    componentDidUpdate: function() {
        this.loadDisqus();
    },
    render: function(){
        return (
            <div {...this.props}>
                <div id="disqus_thread"/>
                <noscript>
                    <span>
                        Please enable JavaScript to view the
                        <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a>
                    </span>
                </noscript>
                <a href="http://disqus.com" className="dsq-brlink">Blog comments powered by <span className="logo-disqus">Disqus</span>.
                </a>
            </div>
        );
    },
    addDisqusScript: function() {
        if (__disqusAdded) {
          return;
        }
    
        var child = this.disqus = document.createElement('script');
        var parent = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
    
        child.async = true;
        child.type = 'text/javascript';
        child.src = '//' + this.props.shortname + '.disqus.com/embed.js';
    
        parent.appendChild(child);
        __disqusAdded = true;
    },
    
    loadDisqus: function() {
        var props = {};

        // Extract Disqus props that were supplied to this component
        DISQUS_CONFIG.forEach((prop) => {
            if (!!this.props[prop]) {
                props[prop] = this.props[prop];
            }
        });

        // Always set URL
        if (!props.url || !props.url.length) {
            props.url = window.location.href;
        }

        // If Disqus has already been added, reset it
        if (typeof DISQUS !== 'undefined') {
            DISQUS.reset({
                reload: true,
                config: function config() {
                    copyProps(this.page, props);

                    // Disqus needs hashbang URL, see https://help.disqus.com/customer/portal/articles/472107
                    this.page.url = this.page.url.replace(/#/, '') + '#!newthread';
                }
            });
        } else { // Otherwise add Disqus to the page
            copyProps(window, props, 'disqus_');
            this.addDisqusScript();
        }
    }
});

module.exports = ReactDisqusThread;