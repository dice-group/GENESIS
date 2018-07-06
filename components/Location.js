import React from 'react';
import {view} from 'react-easy-state';
import locationStore, {getLocation} from '../stores/location';
import Spinner from './Spinner';

export default view(
  class Map extends React.Component {
    state = {url: ''};

    constructor(props) {
      super(props);

      // setup leaflet if running in browser
      if (typeof window !== 'undefined') {
        this.L = require('leaflet');
      }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.url === prevState.url) {
        return prevState;
      }
      getLocation(nextProps.url);
      return {url: nextProps.url};
    }

    componentDidUpdate() {
      if (!locationStore.location || !locationStore.location.lat) {
        return;
      }

      // init map if needed
      if (!this.map) {
        this.map = this.L.map('map');
        this.L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
      }

      // set position
      this.map.setView(locationStore.location, 13);
      this.marker = this.L.marker(locationStore.location).addTo(this.map);
    }

    render() {
      if (locationStore.status === 'loading') {
        return (
          <div className="panel panel-default">
            <div className="panel-heading">Location</div>
            <div className="panel-body">
              <Spinner spinnerName="cube-grid" noFadeIn />
            </div>
          </div>
        );
      }

      if (!locationStore.location) {
        return <span />;
      }

      return (
        <div className="card card-default">
          <style jsx>{`
            .card {
              margin-top: 10px;
            }
          `}</style>
          <div className="card-body">
            <h5 className="card-title">Location</h5>
            <div className="card-text" id="map" style={{height: 300}} />
          </div>
        </div>
      );
    }
  }
);
