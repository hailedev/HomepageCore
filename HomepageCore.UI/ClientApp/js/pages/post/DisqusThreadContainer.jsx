var React = require("react");
var ReactDisqusThread = require("./ReactDisqusThread");

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