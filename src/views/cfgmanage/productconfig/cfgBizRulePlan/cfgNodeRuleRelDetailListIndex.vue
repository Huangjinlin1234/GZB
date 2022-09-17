<template>
  <div>
    <div style="display:inline-block;width:45px">
        <div>
    <div style="height:15%">
        <div>
    <div style="display:inline-block;width:30%">
        <d1-a-b-a-billlist ref="d1_A_B_A_BillList"></d1-a-b-a-billlist>
    </div>
    <div style="display:inline-block;width:calc(100% - 30%)">
        <d1-a-b-b-billlist ref="d1_A_B_B_BillList"></d1-a-b-b-billlist>
    </div>
  </div>
    </div>
    <div style="height:calc(100% - 15%)">
        <d1-a-a-billcard ref="d1_A_A_BillCard"></d1-a-a-billcard>
    </div>
  </div>
    </div>
    <div style="display:inline-block;width:calc(100% - 45px)">
    </div>
  </div>
</template>
<script>
import d1AABillcard from './cfgNodeRuleRelDetailList_d1_A_A_BillCard.vue';
import d1ABABilllist from './cfgNodeRuleRelDetailList_d1_A_B_A_BillList.vue';
import d1ABBBilllist from './cfgNodeRuleRelDetailList_d1_A_B_B_BillList.vue';
yufp.lookup.reg('STD_ZB_OPR_TYPE,STD_ZB_YES_NO,STD_ZB_NOTI_TYPE,STD_ZB_SELECT_IND');
export default {
  components: {d1AABillcard, d1ABABilllist, d1ABBBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_A_BillCard: null,
      d1_A_B_A_BillList: null,
      d1_A_B_B_BillList: null
    };
  },
  mounted () {
    // this.$lookup.reg("STD_ZB_OPR_TYPE","STD_ZB_YES_NO","STD_ZB_NOTI_TYPE","STD_ZB_SELECT_IND")
    this.AfterInit();
  },
  methods: {
    /**
       * 业务规则方案关联流程详情页面
       */
    AfterInit () {
      // 获取操作标识
      const opType = this.pageParams.opType;

      // 创建业务规则方案关联流程-选择流程表单
      this.d1_A_A_BillCard = this.$refs.d1_A_A_BillCard;

      // 新增时执行默认值公式
      if (opType == 'add') {
        this.d1_A_A_BillCard.execBillCardDefaultValueFormula();
        this.d1_A_A_BillCard.setItemValue('plan_id', this.pageParams.plan_id);
      } else {
        // 否则加载界面值
        this.d1_A_A_BillCard.setBillCardValue(this.pageParams);
      }

      // 获取流程编号默认查询条件
      const condition = 'flow_id=' + '\'' + this.d1_A_A_BillCard.getBillCardItemValue('wfi_sign_id') + '\'';

      // 创建流程节点列表
      this.d1_A_B_A_BillList = this.$refs.d1_A_B_A_BillList;

      // 增加流程编号默认查询条件
      this.d1_A_B_A_BillList.queryDataByCondition(condition);

      // 新增或修改时将流程编号赋默认值
      this.d1_A_B_A_BillList.isMustFkDefault = true; // 子表设置必须要外键

      const values_d1_A_B_A = {
        'flow_id': this.d1_A_A_BillCard.getBillCardItemValue('wfi_sign_id')
      };

      this.d1_A_B_A_BillList.insertDefaultValues = values_d1_A_B_A;
      this.d1_A_B_B_BillList = this.$refs.d1_A_B_B_BillList;

      // 子表设置必须要外键
      this.d1_A_B_B_BillList.isMustFkDefault = true;

      // 选择流程节点后，动态规则项列表
      this.d1_A_B_A_BillList.addRowClickAction(this.onSelectModEventFunc);

      // 在页面的下方创建按钮
      // var buttonStr = '返回/onCancel';
      // var buttonHtml = YuXP.getByButtonHtml(buttonStr, 'bottom');
      // YuXP.createHtml('d1_B', buttonHtml);

      if (opType == 'view') {
        // 界面只读
        this.d1_A_A_BillCard.setItemEditable('*', false);
      }

      // onchang事件，选择流程后，动态加载流程节点列表
      this.d1_A_A_BillCard.addEditChangeAction(this.wfiSignIdChangeFn);

      // 修改或查看界面初始化时，不加载onchang事件，因此初始化时手动调用加载流程节点列表事件
      if (opType != 'add') {
        this.wfiSignIdChangeFn();
      }

      // 重写可编辑中的  编辑保存方法
      this.d1_A_B_B_BillList.customSave = data => {
        // console.log('***********************customSave-->data:', JSON.stringify(data));
        // 保存业务规则方案流程节点-拦截方案选项
        this.onSaveCfgNodeRuleRel(data);
      };
    },

    // 选择模块刷新功能清单
    onSelectModEventFunc (_rowData) {
      // 获取业务规则方案编号
      const plan_id = this.d1_A_A_BillCard.getBillCardItemValue('plan_id');

      // 获取工作流编号
      // var wfi_sign_id = _rowData.flow_id;
      const wfi_sign_id = this.d1_A_A_BillCard.getBillCardItemValue('wfi_sign_id');

      // 获取节点编号
      const node_id = _rowData.node_id;

      // 增加查询条件
      const cfgNodeRuleRel = {
        'planId': plan_id,
        'wfiSignId': wfi_sign_id,
        'nodeId': node_id
      };

      this.getCfgNodeRuleRelList(cfgNodeRuleRel);
    },

    // 调用后台java逻辑获取业务规则方案关联规则项列表
    getCfgNodeRuleRelList (cfgNodeRuleRel) {
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCfg + '/api/cfgnoderulerel/getNodePlanRuleList',
        type: 'GET',
        data: cfgNodeRuleRel,

        success: (response, status, xhr) => {
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          } else {
            // 将返回的查询结果字段转成下划线形式
            for (let i = 0; i < response.data.length; i++) {
              const temp = response.data[i];
              const changTemp = this.$xutils.toUpperCase(temp, false);
              response.data[i] = changTemp;
            }

            this.d1_A_B_B_BillList.setBillListData(response.data, false);

            // 设置可编辑列表中的【删除】按钮隐藏
            this.$xutils.setEditableBtnVisible('d1_A_B_B', 'del', false);

            if (this.pageParams.opType == 'view') {
              // 设置可编辑列表中的【编辑】按钮禁用
              this.$xutils.setEditableBtnDisabled('d1_A_B_B', 'edit', true);
            }
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    },

    // 选择流程后，动态加载流程节点列表
    wfiSignIdChangeFn () {
      // 获取流程编号查询条件
      const newFlowId = this.d1_A_A_BillCard.getBillCardItemValue('wfi_sign_id');

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.workflowService + '/api/biz/allnode/?flowId=' + newFlowId,
        type: 'GET',

        success: (response, status, xhr) => {
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          } else {
            if (response.data != null && response.data.length > 0) {
              // 驼峰转小写
              for (let i = 0; i < response.data.length; i++) {
                const temp = this.$xutils.toUpperCase(response.data[i], false);
                response.data[i] = temp;
              }

              // 清除“无数据”字样
              this.d1_A_B_A_BillList.setBillListNoDataMessage();

              // 给列表赋值
              this.d1_A_B_A_BillList.setBillListData(response.data);
            }
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 保存节点拦截方案
    onSaveCfgNodeRuleRel (dataRow) {
      let url = '';
      const userInfo = this.$xutils.getLoginUserInfo();

      // 给最后修改人、机构、日期赋值
      dataRow.upd_id = userInfo.loginCode;

      dataRow.upd_br_id = userInfo.orgCode;
      dataRow.upd_date = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());

      // var resp = false;
      const pk_id = dataRow.pk_id;

      // 若节点拦截方案为保存过数据库表，则进行新增保存；否则进行修改保存
      if (pk_id == null || pk_id == '') {
        // 给登记人、机构、日期赋值
        dataRow.input_id = userInfo.loginCode;

        dataRow.input_br_id = userInfo.orgCode;
        dataRow.input_date = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());

        // 新增保存URL
        url = '/api/cfgnoderulerel/insert';

        // 获取pk_id
        dataRow.pk_id = this.$xutils.getUUID();
      } else {
        // 修改保存URL
        url = '/api/cfgnoderulerel/update';
      }

      // 调用后台保存逻辑，若节点拦截方案未保存过数据库表(即PK_ID为空)，则进行新增保存；否则(即PK_ID不为空)进行修改保
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCfg + url,
        data: JSON.stringify(this.$xutils.toUpperCase(dataRow, true)),

        success: (response, status, xhr) => {
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          } else {
            this.$xutils.showMsgBox('提示', '保存成功!');
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
