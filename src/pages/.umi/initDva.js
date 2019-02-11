import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'goods', ...(require('/Users/luffy/开课吧/node/kaikeba/react/react-dva/src/models/goods.js').default) });
app.model({ namespace: 'user', ...(require('/Users/luffy/开课吧/node/kaikeba/react/react-dva/src/models/user.js').default) });
