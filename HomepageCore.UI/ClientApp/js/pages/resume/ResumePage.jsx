import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';

export default function () {
    return (
        <DocumentTitle title="Hai Le | Hire Me">
            <div className="container hire-me">
                <div className="row">
                    <div className="col-md-offset-2 col-md-8">Where I&apos;m currently working:<span style={{ marginLeft: '30px' }}><a href="https://worldvision.com.au">World Vision Australia</a></span></div>
                </div>
                <div className="row" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <div className="col-md-offset-2 col-md-8">
                        Please contact me through my social media links or <Link to="/feedback">here</Link> if there are any opportunities you would like to discuss.
                        But before you do please see <a href="/resume">this</a> to see if I may suit your needs.
                    </div>
                </div>
                <div className="row" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <div className="col-md-offset-2 col-md-8">
                        I also take volunteer work for NGO&apos;s depending on the project and the expected commitment, so please don&apos;t hesitate to get in touch if you would like to discuss this with me.
                    </div>
                </div>
                <div className="row" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <div className="col-md-offset-2 col-md-8">
                        I don&apos;t take short term/commission work at the moment, but if you have design work or want me to draw stuff that would be awesome and I would make the time for that.
                    </div>
                </div>
            </div>
        </DocumentTitle>
    );
}
