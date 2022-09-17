export const EDGE_PRO = {
  label: {
    name: '路由名称',
    key: 'label',
    type: 'text',
    readOnly: false
  },
  isContinueBeanId: {
    name: '路由条件',
    key: 'isContinueBeanId',
    type: 'select',
    defaultValue: '0',
    readOnly: false
  },
  routeScriptTxt: {
    name: '脚本编辑',
    key: 'routeScriptTxt',
    type: 'yufp-nodescript-editor',
    readOnly: true
  }
};