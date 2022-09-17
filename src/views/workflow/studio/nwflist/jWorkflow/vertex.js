export const VERTEX_PRO = {
  label: {
    name: '节点名称',
    key: 'label',
    type: 'text',
    readOnly: false,
    dist: 'base'
  },
  nodeUser: {
    name: '处理人员',
    key: 'nodeUser',
    type: 'yufp-user-select-dialog',
    readOnly: false,
    dist: 'base'
  },
  opUsersType: {
    name: '人员指定',
    key: 'opUsersType',
    type: 'select',
    value: {'0': '人员列表选择', '2': '系统指定'},
    defaultValue: '0',
    readOnly: false,
    dist: 'base'
  },
  computeType: {
    name: '人员计算',
    key: 'computeType',
    type: 'select',
    value: {'0': '并集', '1': '交集', '2': '原始配置'},
    defaultValue: '0',
    readOnly: false,
    dist: 'base'
  },
  handleType: {
    name: '办理类型',
    key: 'handleType',
    type: 'select',
    value: {'0': '单人签收办理', '1': '单人竞争办理', '2': '多人顺序办理', '3': '多人并行办理', '4': '多人并行按条件转移', '5': '多人顺序可结束', '6': '多人并行可结束'},
    readOnly: false,
    defaultValue: '0',
    dist: 'base'
  },
  noticeType: {
    name: '待办通知',
    key: 'noticeType',
    type: 'select',
    value: {'0': '不通知', '1': '消息通知', '2': '邮件通知', '3': '短信通知', '4': '所有方式通知'},
    readOnly: false,
    defaultValue: '0',
    dist: 'base'
  },
  nodeType: {
    name: '节点类型',
    key: 'nodeType',
    type: 'select',
    value: {'0': '普通节点', '1': '单选节点', '2': '多选节点', '3': '条件单选节点', '4': '条件多选节点', '5': '自动运行节点', C: '汇总节点', S: '开始节点', E: '结束节点'},
    readOnly: true
  },
  bizBeanId: {
    name: '业务处理',
    key: 'bizBeanId',
    type: 'select',
    defaultValue: '0',
    readOnly: false
  },
  asynDo: {
    name: '同步/异步',
    key: 'asynDo',
    type: 'select',
    value: {'0': '同步', '1': '异步'},
    defaultValue: '0',
    readOnly: false
  },
  beforeSubmit: {
    name: '提交条件',
    key: 'beforeSubmit',
    type: 'select',
    defaultValue: '0',
    readOnly: false
  },
  strategyBeanId: {
    name: '分配策略',
    key: 'strategyBeanId',
    type: 'select',
    defaultValue: '0',
    readOnly: false
  },
  copyUsers: {
    name: '抄送人员',
    key: 'copyUsers',
    type: 'yufp-copyuser-selector',
    readOnly: false
  },
  nodeLevel: {
    name: '节点级别',
    key: 'nodeLevel',
    type: 'num',
    readOnly: false
  },
  reDoUserSelect: {
    name: '重办人员',
    key: 'reDoUserSelect',
    type: 'select',
    defaultValue: '0',
    value: {'0': '重新发送', '1': '上次办理人'},
    readOnly: false
  },
  conditionSelect: {
    name: '转移条件',
    key: 'conditionSelect',
    type: 'select',
    defaultValue: '0',
    readOnly: false
  },
  nodeSign: {
    name: '节点标识',
    key: 'nodeSign',
    type: 'text',
    readOnly: false
  },
  subFlow: {
    name: '子流程',
    key: 'subFlow',
    type: 'select',
    value: {'0': '手动同步流程', '1': '手动异步流程', '2': '自动同步流程', '3': '自动异步流程'},
    readOnly: false
  },
  subFlowId: {
    name: '子流程ID',
    key: 'subFlowId',
    type: 'yufp-subid-selector',
    readOnly: true
  },
  gather: {
    name: '会办',
    key: 'gather',
    type: 'select',
    defaultValue: '0',
    readOnly: false
  },
  nodeScript: {
    name: '节点脚本',
    key: 'nodeScript',
    type: 'select',
    defaultValue: '0',
    readOnly: false
  },
  nodeScriptTxt: {
    name: '脚本编辑',
    key: 'nodeScriptTxt',
    type: 'yufp-nodescript-editor',
    readOnly: true
  },
  returnBack: {
    name: '退回',
    key: 'returnBack',
    type: 'select',
    value: {'0': '不允许', '1': '允许'},
    defaultValue: '0',
    readOnly: false,
    dist: 'oper'
  },
  callBack: {
    name: '打回',
    key: 'callBack',
    type: 'select',
    value: {'0': '不允许', '1': '允许'},
    defaultValue: '0',
    readOnly: false,
    dist: 'oper'
  },
  change: {
    name: '转办',
    key: 'change',
    type: 'select',
    value: {'0': '不允许', '1': '允许'},
    defaultValue: '0',
    readOnly: false,
    dist: 'oper'
  },
  assist: {
    name: '协办',
    key: 'assist',
    type: 'select',
    value: {'0': '不允许', '1': '允许'},
    defaultValue: '0',
    readOnly: false,
    dist: 'oper'
  },
  jump: {
    name: '跳转',
    key: 'jump',
    type: 'select',
    value: {'0': '不允许', '1': '允许'},
    defaultValue: '0',
    readOnly: false,
    dist: 'oper'
  },
  urged: {
    name: '催办',
    key: 'urged',
    type: 'select',
    value: {'0': '不允许', '1': '允许'},
    defaultValue: '0',
    readOnly: false,
    dist: 'oper'
  },
  refuse: {
    name: '否决',
    key: 'refuse',
    type: 'select',
    value: {'0': '不允许', '1': '允许'},
    defaultValue: '0',
    readOnly: false,
    dist: 'oper'
  },
  reStart: {
    name: '再议',
    key: 'reStart',
    type: 'select',
    value: {'0': '不允许', '1': '允许'},
    defaultValue: '0',
    readOnly: false,
    dist: 'oper'
  },
  tackBack: {
    name: '拿回',
    key: 'tackBack',
    type: 'select',
    value: {'0': '不允许', '1': '允许'},
    readOnly: false,
    defaultValue: '0',
    dist: 'oper'
  }
};