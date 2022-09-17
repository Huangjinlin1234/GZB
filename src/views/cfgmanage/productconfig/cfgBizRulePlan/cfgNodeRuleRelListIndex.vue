<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cfgNodeRuleRelList_d1_BillList.vue';
yufp.lookup.reg('STD_ZB_OPR_TYPE');

export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    //this.$lookup.reg("STD_ZB_OPR_TYPE")
    this.AfterInit()
  },
  methods:{
    /**
       * 业务规则方案关联流程列表页面
       */
    AfterInit() {
      const opType = this.getFactory().contextData.opType;
      this.d1_BillList = this.$refs.d1_BillList;
  
      // 获取业务规则方案编号默认查询条件
      const condition = 'plan_id=' + '\'' + this.getFactory().contextData.plan_id + '\'';
  
      // 增加业务规则方案编号默认查询条件
      this.d1_BillList.queryDataByCondition(condition);
  
      this.d1_BillList.setAppendSQLCondition(condition);
  
      if (opType == 'view') {
        // 若为查看，隐藏列表的新增、修改、删除 按钮
        this.d1_BillList.setBillListButtonVisable('新增', false);
  
        this.d1_BillList.setBillListButtonVisable('修改', false);
        this.d1_BillList.setBillListButtonVisable('删除', false);
      }
    },
  
    // 新增
    addFn() {
      const params = {
        opType: 'add',
        plan_id: this.getFactory().contextData.plan_id
      };
  
      this.$dialog.open('新增', 'undefined', -1, -1, params, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },
  
    // 修改
    editFn() {
      const row = this.d1_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
  
      row.opType = 'edit';
  
      this.$dialog.open('修改', 'undefined', -1, -1, row, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },
  
    // 查看
    viewFn() {
      const row = this.d1_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
  
      row.opType = 'view';
      this.$dialog.open('查看', 'undefined', -1, -1, row, null);
    },
  
    // 逻辑删除
    deleteFn() {
      const row = this.d1_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
  
      this.$xutils.showMsgBox('提示', '你真的想删除选中的记录行? \n请谨慎操作!', 350, 150, _rt => {
        this.ajaxDelete(row);
      });
    },
  
    // 调用后台逻辑进行逻辑删除
    ajaxDelete(row) {
      this.$xutils.request({
        // 同步请求
        async: false,
  
        url: this.$backend.cmisCfg + '/api/cfgnoderulerel/deleteCfgNodeRuleRel',
        data: JSON.stringify(this.$xutils.toUpperCase(row, true)),
  
        success: (response, status, xhr) => {
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          } else {
            this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, () => {
              this.d1_BillList.queryDataByCondition();
            });
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
