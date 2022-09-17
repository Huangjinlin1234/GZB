export const WORKFLOW_PRO = {
  flowId: {
    name: '流程ID',
    key: 'flowId',
    type: 'text',
    readOnly: true
  },
  flowName: {
    name: '流程名称',
    key: 'flowName',
    type: 'text',
    readOnly: true
  },
  startCondition: {
    name: '启动条件',
    key: 'startCondition',
    type: 'select',
    defaultValue: '0',
    readOnly: false
  },
  hangUp: {
    name: '挂起/唤醒',
    key: 'hungUp',
    type: 'select',
    value: {'0': '关闭', '1': '打开'},
    defaultValue: '0',
    readOnly: false
  }
};