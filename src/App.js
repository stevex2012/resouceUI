import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider, observer } from 'mobx-react';
import { asyncLoad, CoustomLoading } from '@components';
import rootStore from '@stores';

// 开启mobx严格模式
configure({
    enforceActions: 'observed',
});

@observer
class App extends Component {
    render() {
        return (
            <Provider {...rootStore}>
                <Router basename={process.env.PUBLIC_URL}>
                    <Switch>
                        <Route path="/" exact component={asyncLoad(import('@pages/Entrance'))} />
                        <Route path="/About" exact component={asyncLoad(import('@pages/About'))} />
                        <CoustomLoading key="loading" />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
