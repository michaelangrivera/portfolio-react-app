
import ReactDOM from "react-dom";
import { HashRouter, BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
// Stylesheet
import "./index.scss";

import React, { useEffect } from "react";
import {Redirect, useRouteMatch } from "react-router-dom";
import { Fragment } from 'react';

// Sections
import Blog from "./blog";
import About from "./about";
import Intro from "./intro";
import Header from "./header";
import Resume from "./resume";
import Endurance from "./endurance";
import Percussion from "./percussion";
import Contact from "./contact";
import Portfolio from "./portfolio";
import Testimonial from "./testimonial";
import BlogSinglePost from "./blogsinglepost";


//Posts

import Leadville_Half from "./components/Posts_Endurance/leadville_half";


// Components
import Helmet from "./components/common/helmet";
import PageSwitch from "./components/common/pageswitch";
import RedirectAs404 from "./components/common/redirectas404";
import Error404 from "./components/common/error404";


import Amplify from '@aws-amplify/core';
import Analytics from '@aws-amplify/analytics';
import Auth from '@aws-amplify/auth';
import awsconfig from './aws-exports';
import { Logger } from 'aws-amplify';


// Amplify.configure(awsconfig);
// Analytics.record({ name: 'albumVisit' });

const routes = [
    {
        path: "intro",
        component: <Intro />,
    },
    {
        path: "about",
        component: <About />,
    },
    {
        path: "resume",
        component: <Resume />,
    },
    {
        path: "endurance",
        component: <Endurance />
    },
    {
        path: "percussion",
        component: <Percussion />,
    },
    {
        path: "portfolio",
        component: <Portfolio />,
    },
    {
        path: "blog",
        component: <Blog />,
    },
    {
        path: "blog/single-post",
        component: <BlogSinglePost />,
    },
    {
        path: "testimonial",
        component: <Testimonial />,
    },
    {
        path: "contact",
        component: <Contact />,
    },

//Edurance Posts

    {
        path: "endurance/leadville_half",
        component: <Leadville_Half />
    }


];

function Root() {
    let { path } = useRouteMatch();

    useEffect(() => {
        // Analytics.record('Home Page Visit');
        Amplify.configure({
            aws_cognito_region: "us-east-1", // (required) - Region where Amazon Cognito project was created   
            // aws_user_pools_id:  "us-east-1_6AfQ6", // (optional) -  Amazon Cognito User Pool ID   
            // aws_user_pools_web_client_id: "5t3le8878kgc72", // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
            aws_cognito_identity_pool_id: "us-east-1:b733755d-5d66-43d2-9c27-5d6ee2e47e56", // (optional) - Amazon Cognito Identity Pool ID   
            aws_mandatory_sign_in: "false", // (optional) - Users are not allowed to get the aws credentials unless they are signed in   
                aws_mobile_analytics_app_region: "us-east-1", // (required) Amazon Pinpoint Project region
                aws_mobile_analytics_app_id: "490cb977451f4fc5828adab97f0d18f4" // (required) Amazon Pinpoint Project ID
         
        })
        // Amplify.configure({
            
        //     // To get the AWS Credentials, you need to configure 
        //     // the Auth module with your Cognito Federated Identity Pool
        //     Auth: {
        //         identityPoolId: 'us-east-1:b733755d-5d66-43d2-9c27-5d6ee2e47e56',
        //         region: 'us-east-1',
        //         mandatorySignIn: false,

        //     },
        //     Analytics: {
        //         // OPTIONAL - disable Analytics if true
        //         disabled: false,
        //         // OPTIONAL - Allow recording session events. Default is true.
        //         autoSessionRecord: true,
        
        //         AWSPinpoint: {
        //             // OPTIONAL -  Amazon Pinpoint App Client ID
        //             appId: '490cb977451f4fc5828adab97f0d18f4',
        //             // OPTIONAL -  Amazon service region
        //             region: 'us-east-1',
        //             // OPTIONAL -  Customized endpoint
        //             // endpointId: 'XXXXXXXXXXXX',
        //             // OPTIONAL - Default Endpoint Information
           
        //             },
        
        //             // Buffer settings used for reporting analytics events.
        //             // OPTIONAL - The buffer size for events in number of items.
        //             bufferSize: 1000,
        
        //             // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
        //             flushInterval: 5000, // 5s 
        
        //             // OPTIONAL - The number of events to be deleted from the buffer when flushed.
        //             flushSize: 100,
        
        //             // OPTIONAL - The limit for failed recording retries.
        //             resendLimit: 5
        //         }
            
        //     });
            Analytics.autoTrack('event', {
                // REQUIRED, turn on/off the auto tracking
                enable: true,
                // OPTIONAL, events you want to track, by default is 'click'
                events: ['click'],
                // OPTIONAL, the prefix of the selectors, by default is 'data-amplify-analytics-'
                // in order to avoid collision with the user agent, according to https://www.w3schools.com/tags/att_global_data.asp
                // always put 'data' as the first prefix
                selectorPrefix: 'data-amplify-analytics-',
                // OPTIONAL, the service provider, by default is the Amazon Pinpoint
                provider: 'AWSPinpoint',
                // OPTIONAL, the default attributes of the event, you can either pass an object or a function 
                // which allows you to define dynamic attributes
                attributes: {
                    attr: 'attr'
                }
                // when using function
                // attributes: () => {
                //    const attr = somewhere();
                //    return {
                //        myAttr: attr
                //    }
                // }
            });    
        

        // Auth.configure({ mandatorySignIn: false});
        Analytics.record({ name: 'Front Page' });

        document.documentElement.className = "home-3 skin-3";
        return () => {
            document.documentElement.className = "";
        };
        
    });

    return (
        <div>
            <Helmet title="Michael Angelo Rivera" />
            
            <Header />
            <PageSwitch>
         
                <Route path={path} exact>
                    <Redirect
                        to={{
                            pathname: `${path}intro`.replace(/([^:])(\/\/+)/g, "$1/"),
                        }}
                    />
                </Route>
                {routes.map((item, index) => (
                    <Route key={index} path={`${path}${item.path}`} exact>
                        {item.component}
                    </Route>
                ))}
                <Route component={RedirectAs404} />

            </PageSwitch>
        
        </div>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route render={({ location }) => (location.state && location.state.is404 ? <Error404 /> : <Root />)} />
        </div>
    </BrowserRouter>,
    document.getElementById("root")
);
serviceWorker.unregister();



