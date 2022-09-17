<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cfgBizRulePlanList_d1_BillList.vue';
yufp.lookup.reg('STD_ZB_PLAN_TYPE,STD_ZB_NOTI_TYPE,STD_ZB_YES_NO,STD_ZB_OPR_TYPE');
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
    //this.$lookup.reg("STD_ZB_PLAN_TYPE","STD_ZB_NOTI_TYPE","STD_ZB_YES_NO","STD_ZB_OPR_TYPE")
    this.AfterInit()
  },
  methods:{
    /**
       * 业务规则方案列表页面
       */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },
  
    // 新增
    addFn() {
      this.$dialog.open(
        '新增',
        'cfgmanage/productconfig/cfgBizRulePlan/cfgBizRulePlanAddIndex',
        900,
        650,
        null,
        null
      );
    },
  
    // 修改
    editFn() {
      const row = this.d1_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
  
      row.opType = 'edit';
      row.op = 'EDIT';
      this.goToDetailFn(row);
    },
  
    // 查看
    viewFn() {
      const row = this.d1_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
  
      row.opType = 'view';
      row.op = 'VIEW';
      this.goToDetailFn(row);
    },
  
    // 调用模板工厂配置的详情界面
    goToDetailFn(row) {
      row.model_group_no = 'CMG000002';
  
      this.$dialog.open(
        '业务规则方案详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        row,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },
  
    // 逻辑删除，删除前先校验该业务规则方案是否被产品配置引用，若已被引用，则不能删除
    deleteFn() {
      const row = this.d1_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
  
      this.$xutils.showMsgBox('提示', '你真的想删除选中的记录行? \n请谨慎操作!', 350, 150, _rt => {
        this.ajaxDelete(row);
      });
    },
  
    // 调用后台进行逻辑删除
    ajaxDelete(row) {
      // 获取业务规则方案编号查询条件
      const planId = row.plan_id;
  
      this.$xutils.request({
        // 同步请求
        async: false,
  
        url: this.$backend.cmisCfg + '/api/cfgbizruleplan/deleteCfgBizRulePlanAndChild/' + planId,
  
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
