import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { SocialIcon } from 'react-social-icons';

export default class ProjectPage extends Component { // eslint-disable-line
    render() {
        return (
            <DocumentTitle title="Hai Le | Projects">
                <div className="container projects">
                    <div className="row">
                        <div id="devsketch" className="col-md-offset-1 col-md-5" style={{ height: '250px', padding: '0', overflow: 'hidden' }}>
                            <img src="/images/screenshot.jpg" alt="screenshot" />
                        </div>
                        <div className="col-md-5 col-xs-12" style={{ height: '250px', backgroundColor: '#F5F5F5', padding: '20px 30px', display: 'flex', alignItems: 'center' }}>
                            <div>
                                <div className="projects-title"><a href="https://devsketch.io">DevSketch</a></div>
                                <div className="blurb">
                                    This is an online tool I created that allows you to design UML class diagrams.  It works in a somewhat similar fasion to Microsoft Visio but allows you to capture the interactions in your model using UML specific tools.  You can also save your diagrams online and share them.
                                </div>
                                <div className="source" />
                            </div>
                        </div>
                    </div>
                    <div className="row divider" />
                    <div className="row">
                        <div id="homepage" className="col-md-offset-1 col-md-5 col-xs-12" style={{ height: '250px', backgroundColor: '#F5F5F5', padding: '20px 30px', display: 'flex', alignItems: 'center' }}>
                            <div>
                                <div className="projects-title"><a href="http://haile.info/resume">Interactive resume</a></div>
                                <div className="blurb">
                                    This is something I created while experimenting with HTML canvas animations using the CreateJS suite.  It kind of started with a simple running sprite animation, then added user controls and collision detection.  Not knowing where to go next I turned it into my interactive resume.
                                </div>
                                <div className="source"><SocialIcon url="https://github.com/hailedev/InteractiveResume" style={{ height: 32, width: 32 }} network="github" /></div>
                            </div>
                        </div>
                        <div className="col-md-5" style={{ height: '250px', padding: '0', overflow: 'hidden' }}>
                            <img src="/images/game_scr.png" alt="game screen" />
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}
