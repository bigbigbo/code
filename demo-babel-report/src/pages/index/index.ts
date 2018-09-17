import dva from 'dva';

const models = (require as any).context('../../models', true, /\.(j|t)s$/);

function importAll(r: any, cb: any): void {
  r.keys().forEach((key: any) => cb(r(key).default));
}

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
importAll(models, app.model);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

(<any>window)._store = (<any>app)._store;
(<any>window).dispatch = (<any>app)._store.dispatch;
