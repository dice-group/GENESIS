import Router, {withRouter} from 'next/router';
import React from 'react';
import Description from '../components/Description';
import Images from '../components/Images';
import Layout from '../components/Layout';
import Location from '../components/Location';
import Related from '../components/Related';
import Similar from '../components/Similar';
import Summary from '../components/Summary';
import Title from '../components/Title';
import Videos from '../components/Videos';
import clearAll from '../stores/util/clearAll';

export default withRouter(
  class ResourcePage extends React.Component {
    componentDidMount() {
      Router.router.events.on('routeChangeStart', () => {
        clearAll();
      });
    }

    render() {
      const {
        router: {
          query: {resource, title},
        },
      } = this.props;
      return (
        <Layout>
          <div className="row">
            <style jsx>{`
              .row {
                padding-top: 20px;
              }
            `}</style>
            <div className="col-sm-8 offset-sm-2">
              <Title url={resource} title={title} />
              <Description url={resource} title={title} />
              <Summary url={resource} title={title} />
              <Location url={resource} title={title} />
              <div className="row">
                <div className="col-sm-6">
                  <Images url={resource} title={title} />
                </div>
                <div className="col-sm-6">
                  <Videos url={resource} title={title} />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <Related url={resource} title={title} />
                </div>
                <div className="col-sm-6">
                  <Similar url={resource} title={title} />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    }
  }
);
