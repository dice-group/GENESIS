import React from 'react';

import Title from './title';
import Description from './description';
import Summary from './summary';
import Location from './location';
import Images from './images';
import Videos from './videos';
import Related from './related';

export default function render() {
    return (
        <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
                <Title {...this.state} />
                <Description {...this.state} />
                <Summary {...this.state} />
                <Location {...this.state} />

            <div className="row">
                    <div className="col-xs-6">
                        <Related {...this.state} />
                    </div>
                    <div className="col-xs-6">
                        <Related {...this.state} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-6">
                        <Images {...this.state} />
                    </div>
                    <div className="col-xs-6">
                        <Videos {...this.state} />
                    </div>
                </div>
            </div>
        </div>
    );
}
