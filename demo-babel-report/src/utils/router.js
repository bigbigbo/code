import loadable from '@/utils/loadable'; // eslint-disable-line

// 判断model是否已经被注册
export const modelNotExisted = (app, model) =>
  !app._models.some(({ namespace }) => namespace === model.substring(model.lastIndexOf('/') + 1));

// 按需加载组件
export const dynamic = ({ app, models = {}, component }) => {
  Object.entries(models).forEach(([model, modelModule]) => {
    if (modelNotExisted(app, model)) {
      app.model(modelModule);
    }
  });

  return loadable(component);
};
