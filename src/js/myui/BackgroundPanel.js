var classnames = require('classnames');
var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'Range',

    propTypes: {

    },

    getDefaultProps: function () {
        return {
        };
    },

    render: function () {
        var before = <span style={{
                    content: "",
        position: absolute,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundImage: "url(img/reacteurope.png)",
        opacity: 0.6,
        backgroundPosition: "50% 50%",
        //background-size: contain;
        backgroundRepeat: "no-repeat",
        }}/>

        return <div style={{
                            width: "100%",
                            minHeight: "auto",
                            height: "auto",
                            }}>
                {before}

                {this.props.children}
        </div>
    }
});
