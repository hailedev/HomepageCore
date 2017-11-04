var React = require("react");
var ReactDisqusThread = require("./ReactDisqusThread");
var createReactClass = require("create-react-class");

var DisqusThreadContainer = createReactClass({
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