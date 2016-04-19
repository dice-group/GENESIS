import React from 'react';
import L from 'leaflet';
import Spinner from 'react-spinkit';

// set lefalet image path
L.Icon.Default.imagePath = 'http://cdn.leafletjs.com/leaflet/v0.7.7/images';

const Map = React.createClass({
    getInitialState() {
        return {
            loading: true,
        };
    },

    componentWillReceiveProps(newProps) {
        this.setState({loading: newProps.location.get('loading') !== 'done'});

        if (!newProps.location || !newProps.location.get('lat')) {
            this.setState({position: undefined, loading: false});
            return;
        }

        const position = [newProps.location.get('lat'), newProps.location.get('lon')];
        this.setState({position});
    },

    componentDidUpdate() {
        if (!this.state.position) {
            return;
        }

        // init map if needed
        if (!this.map) {
            this.map = L.map('map');
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(this.map);
        }

        // set position
        this.map.setView(this.state.position, 13);
        // marker. do we need it?
        this.marker = L.marker(this.state.position).addTo(this.map);
        // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        // .openPopup();
    },

    render() {
        if (this.state.loading) {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Location
                    </div>
                    <div className="panel-body">
                        <Spinner spinnerName="cube-grid" noFadeIn />
                    </div>
                </div>
            );
        }

        if (!this.state.position) {
            return <span />;
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    Location
                </div>
                <div className="panel-body" id="map" style={{height: 300}} />
            </div>
        );
    },
});

export default Map;
