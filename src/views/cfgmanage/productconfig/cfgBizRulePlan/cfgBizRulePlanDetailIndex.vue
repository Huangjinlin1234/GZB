<template>
  <div>
    <div style="height:40%">
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 40%)">
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './cfgBizRulePlanDetail_d1_A_BillCard.vue';
import d1BBilllist from './cfgBizRulePlanDetail_d1_B_BillList.vue';
yufp.lookup.reg('STD_ZB_PLAN_TYPE,STD_ZB_NOTI_TYPE,STD_ZB_YES_NO,STD_ZB_OPR_TYPE');
export default {
  components: {d1ABillcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null
    };
  },
  mounted () {
    // this.$lookup.reg("STD_ZB_PLAN_TYPE","STD_ZB_NOTI_TYPE","STD_ZB_YES_NO","STD_ZB_OPR_TYPE")
    this.AfterInit();
  },
  methods: {
    /**
       * 业务规则方案详情页面
       */
    AfterInit () {
      // 操作类型
      const opType = this.getFactory().contextData.opType;

      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_A_BillCard.setBillCardValue(this.getFactory().contextData);

      // 获取业务规则方案编号默认查询条件
      const condition = 'plan_id=' + '\'' + this.d1_A_BillCard.getBillCardItemValue('plan_id') + '\'';

      this.d1_B_BillList = this.$refs.d1_B_BillList;

      // 增加业务规则方案编号默认查询条件
      this.d1_B_BillList.queryDataByCondition(condition);

      this.d1_B_BillList.setAppendSQLCondition(condition);

      // 新增或修改时将业务规则方案编号赋默认值
      this.d1_B_BillList.isMustFkDefault = true;

      const values_d1_B = {
        'plan_id': this.d1_A_BillCard.getBillCardItemValue('plan_id')
      };

      this.d1_B_BillList.insertDefaultValues = values_d1_B;

      // 设置CHANGE事件
      this.d1_A_BillCard.addEditChangeAction(this.usedFlowChange);

      // 查看方法
      if (opType == 'view') {
        this.doView();
      }

      // 模板工厂主页面数据加载成功事件
      this.getFactory().triggerAction(this.d1_A_BillCard.getBillCardValue());

      // 隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable('tempSave', false);
    },

    // 是否适用流程 =是时，展示“业务规则方案场景信息”页签；否则隐藏；
    usedFlowChange (thisCard, _itemkey, _oldValue, _newValue) {
      if (_itemkey == 'used_flow') {
        this.getFactory().triggerAction({
          'used_flow': _newValue
        });
      }
    },

    // 查看
    doView () {
      // 界面只读
      this.d1_A_BillCard.setItemEditable('*', false);

      // 隐藏列表的新增、删除 按钮
      this.d1_B_BillList.setBillListButtonVisable('$insert', false);

      this.d1_B_BillList.setBillListButtonVisable('删除', false);
    },

    // 保存
    save () {
      const userInfo = this.$xutils.getLoginUserInfo();
      this.d1_A_BillCard.setItemValue('upd_id', userInfo.loginCode);
      this.d1_A_BillCard.setItemValue('upd_br_id', userInfo.orgCode);
      this.d1_A_BillCard.setItemValue('upd_date', this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()));
      const resp = this.d1_A_BillCard.updateBillCardData();

      if (resp && resp && resp.code == 'ok') {
        this.$xutils.showMsgBox('提示', '保存成功!');
      }
    },

    // 重新点击时重新加载页面
    showAction () {
      // 隐藏暂存按钮，此功能不需要暂存
      this.getFactory().setButtonVisiable('tempSave', false);
    },

    // 逻辑删除，业务规则方案关联规则项列表【删除】时，需联动删除已配置的 业务规则方案流程节点-拦截方案选项
    logicDeleteRuleRelFn () {
      const row = this.d1_B_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      this.$xutils.showMsgBox('提示', '你真的想删除选中的记录行? \n请谨慎操作!', 350, 150, _rt => {
        this.ajaxLogicDeleteRule(row);
      });
    },

    // 调用后台进行逻辑删除
    ajaxLogicDeleteRule (row) {
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCfg + '/api/cfgplanrulerel/deleteCfgPlanRuleRel',
        data: JSON.stringify(this.$xutils.toUpperCase(row, true)),

        success: (response, status, xhr) => {
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          } else {
            this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, () => {
              this.d1_B_BillList.queryDataByCondition();
            });
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 返回方法
    back () {
      this.$xutils.getParentPage(this, null, 'back');
    }
  }
};
</script>
