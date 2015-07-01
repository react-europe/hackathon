var React = require('react'),
    classnames = require('classnames');



var IconExternalLink = React.createClass({

    handleClick: function(e) {
        e.preventDefault();
        window.open(this.props.url.replace(/ /g, ''), '_system');
    },

    render: function() {
        var className = classnames(this.props.className, this.props.icon);
            // this link is working entirely correctly because of the link in the outer component
        return (
            <a className={className} href={this.props.url.replace(/ /g, '')}
                onClick={this.handleClick}>
                {this.props.label}
            </a>
            );
    },
});

module.exports = IconExternalLink;
