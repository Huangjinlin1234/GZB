<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpWriteOffDetailsList_d1_BillList.vue'
/**
 * title 呆账核销明细列表界面
 * author 马顺
 * date 2021-01-20
 * */

let condition = '';

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
    this.AfterInit()
  },
  methods:{
    // 初始化页面
    AfterInit() {
      // 根据配置模板创建核销明细申请列表
      this.d1_BillList = this.$refs.d1_BillList;

      // 【模板可能存在复用情况，将条件写入调用js中方便复用】
      condition = {oprType:"01", iqpSerno:this.getFactory().contextData.iqpSerno};

      this.initBillCard();

      // 表单设置查询条件
      this.d1_BillList.setAppendSQLCondition(condition);

      this.d1_BillList.queryDataByCondition();
    },

    // 初始化触发
    initBillCard() {
      // 针对查看以及流程进入页面，不允许编辑操作
      if (window.parent.this.getFactory().contextData.op == 'VIEW') {
        this.d1_BillList.setBillListButtonVisable('新增', false);
        this.d1_BillList.setBillListButtonVisable('修改', false);
        this.d1_BillList.setBillListButtonVisable('删除', false);
      }
    },

    // 呆账核销明细申请
    doInsert() {
      let params = {};
      params['model_group_no'] = 'CMG000062';// 呆账核销明细信息模板组
      params['op'] = 'ADD';
      params['cus_id'] = this.getFactory().contextData.cus_id;
      params['iqp_serno'] = this.getFactory().contextData.iqp_serno;

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        null,
        true,
        true
      );
    },

    // 更新方法
    doUpdate() {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      params['model_group_no'] = 'CMG000062';// 呆账核销明细信息模板组
      params['op'] = 'EDIT';
      // params['pk_id'] = params['pk_id'];

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        null,
        true,
        true
      );
    },

    // 查看方法
    doView() {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      params['model_group_no'] = 'CMG000062';// 呆账核销明细信息模板组
      params['op'] = 'VIEW';
      // params['pk_id'] = params['pk_id'];

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        null,
        true,
        true
      );
    },

    // 删除
    onDelete() {
      let rtnData = {};
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          this.$xutils.request({
            // 同步请求
            async: false,

            type: 'GET',
            url: this.$backend.cmisBiz + '/api/iqpwriteoffdetl/deleteIqpWriteOffDetailLogic/' + jsoPar.pk_id,

            success: (response, status, xhr) => {
              if (response.code == '0') {
                rtnData = response.data;
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
              }
            },

            error: (result, b) => {
              this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
            }
          });

          // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
          if (JSON.stringify(rtnData) == '{}') {
            return;
          }

          if (rtnData.rtnCode != '000000') {
            this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + '；错误信息：' + rtnData.rtnMsg); // 弹出提示
            return;
          }

          this.refreshBillListData();
        }
      });
    },

    // 刷新页面数据
    refreshBillListData() {
      this.d1_BillList.queryDataByCondition(condition);
    }
  }
};
</script>
