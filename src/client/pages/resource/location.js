import React from 'react';
import L from 'leaflet';

const Map = React.createClass({
    componentDidMount() {
        this.map = L.map('map');
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
    },

    componentWillReceiveProps(newProps) {
        if (!newProps.location || !newProps.location.get('lat')) {
            return;
        }

        this.position = [newProps.location.get('lat'), newProps.location.get('lon')];
        this.map.setView(this.position, 13);
        // marker. do we need it?
        // this.marker = L.marker(this.position).addTo(this.map);
    },

    render() {
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
