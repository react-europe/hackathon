var React = require('react');
var Tappable = require('react-tappable');
var Navigation = require('touchstonejs').Navigation;
var Link = require('touchstonejs').Link;
var UI = require('touchstonejs').UI;

var MUI = require('../myui');

var Timers = require('react-timers');

module.exports = React.createClass({
    mixins: [Navigation, Timers()],

    getInitialState: function () {
        return {
            popup: {
                visible: false
            }
        };
    },
    showLoadingPopup: function () {
        this.setState({
            popup: {
                visible: true,
                loading: true,
                header: 'Loading',
                iconName: 'ion-load-c',
                iconType: 'default'
            }
        });

        var self = this;

        this.setTimeout(function () {
            self.setState({
                popup: {
                    visible: true,
                    loading: false,
                    header: 'Done!',
                    iconName: 'ion-ios7-checkmark',
                    iconType: 'success'
                }
            });
        }, 2000);

        this.setTimeout(function () {
            self.setState({
                popup: {
                    visible: false
                }
            });
        }, 3000);
    },

    render: function () {

        return (
            <UI.View>
                <UI.Headerbar type="default" label="React Europe 2015" />
                <UI.ViewContent grow scrollable>
                    <div className="panel-header text-caps">Now</div>
                    <div className="panel">
                        <div className="rebg" style={{
                            width: "100%",
                            minHeight: "auto",
                            height: "auto",
                            }} >

                        <Link component="div"
                            viewTransition="show-from-right"
                            className="list-item is-tappable">
                            <div className="item-inner">Getting there</div>
                        </Link>
                        <Link component="div" to="component-headerbar-search"
                            viewTransition="show-from-right"
                            className="list-item is-tappable">
                            <div className="item-inner">What people are saying...</div>
                        </Link>


                        </div>

                    </div>
                    <div className="panel-header text-caps">Next</div>
                    <div className="panel">
                        <Link component="div" to="component-simple-list"
                            viewTransition="show-from-right"
                            className="list-item is-tappable">
                            <div className="item-inner">Simple List</div>
                        </Link>
                        <Link component="div" to="component-complex-list"
                            viewTransition="show-from-right"
                            className="list-item is-tappable">
                            <div className="item-inner">Complex List</div>
                        </Link>
                    </div>
                    <div className="panel-header text-caps">Time Travel!</div>
                    <div className="panel">
                        <MUI.Range startIcon="ion-arrow-left-b"
                            endIcon="ion-arrow-right-b" />
                    </div>
                </UI.ViewContent>

                <UI.Footerbar type="default">
                    <UI.FooterbarButton active label="Now" icon="ion-flash" />
                    <UI.FooterbarButton label="Programme" icon="ion-mic-a" />
                    <UI.FooterbarButton label="Buzz" icon="ion-ios7-pulse-strong" />
                    <UI.FooterbarButton label="Explore" icon="ion-compass" />
                </UI.Footerbar>
            </UI.View>
        );
    }
});
