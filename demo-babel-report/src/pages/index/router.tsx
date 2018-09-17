import React, { createElement } from 'react';
import { Switch, Route, routerRedux } from 'dva/router';
import { dynamic } from '@/utils/router';
import ROUTES from './routes';

const ConnectedRouter = routerRedux.ConnectedRouter;

function getRouterConfig({ history, app }: { history: any; app: any }) {
  const routes = ROUTES.map(route => {
    const { models = [], component, ...restProps } = route;
    const modelsCache = models.reduce(
      (memo, model) => ({ ...memo, [model]: require(`./models/${model}`).default }),
      {}
    );

    return { ...restProps, component: dynamic({ app, component, models: modelsCache }) };
  });

  return (
    <ConnectedRouter history={history}>
      <Switch>
        {routes.map((route, index) => {
          const { component, ...restProps } = route;
          const newProps = ROUTES[index];
          const routeComponent = (props: any) => createElement(component, { ...props, ...newProps });

          return <Route key={route.path} {...restProps} component={routeComponent} />;
        })}
      </Switch>
    </ConnectedRouter>
  );
}

export default getRouterConfig;
