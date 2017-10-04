var React = require("react");
var ReactDisqusThread = require("react-disqus-thread");

var DisqusThreadContainer = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState){
        return false;
    },
    render: function(){
        return (
            <ReactDisqusThread {...this.props}/>
        );
    }
});

module.exports = DisqusThreadContainer;