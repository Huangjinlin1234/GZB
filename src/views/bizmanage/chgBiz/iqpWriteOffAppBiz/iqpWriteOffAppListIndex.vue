<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpWriteOffAppList_d1_BillList.vue'
/**
 * title 核销申请列表页面
 * author 马顺
 * date 2021-01-19
 * */
let condition = '';
let rtnData

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
      // 根据配置模板创建核销申请列表
      this.d1_BillList = this.$refs.d1_BillList;

      // 赋值查询条件，查询主管人为当前，操作类型新增，审批状态为【'待发起'、'取消'、'追回'、'打回'】
      // 【模板可能存在复用情况，将条件写入调用js中方便复用】
      condition = {oprType:"01", approveStatusList:"000,990,991,992"};

      // 表单设置查询条件
      this.d1_BillList.setAppendSQLCondition(condition);

      this.d1_BillList.queryDataByCondition();

      // 过滤申请状态，移除【审批中、通过、否决】数据字典
      this.d1_BillList.setSelectOptions('approve_status', 'hidden', '111,997,998');
    },

    // 呆账核销申请
    doInsert() {
      this.$dialog.open(
        '呆账核销申请',
        'bizmanage/chgBiz/iqpWriteOffAppBiz/iqpWriteOffAppAddIndex',
        '900',
        '600',
        {},
        null
      );
    },

    // 更新方法
    doUpdate() {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      params['model_group_no'] = 'CMG000058';// 呆账核销信息模板组
      params['op'] = 'EDIT';
      // params['iqp_serno'] = params.iqp_serno;
      // params['cus_id'] = params.cus_id;

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

      params['model_group_no'] = 'CMG000058';// 呆账核销信息模板组
      params['op'] = 'VIEW';
      // params['iqp_serno'] = params.iqp_serno;
      // params['cus_id'] = params.cus_id;

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
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      if (jsoPar.approve_status != '000') {
        this.$xutils.showMsgBox('提示', '只有"待发起"状态的申请记录才能进行删除操作！', 350, 150);
        return;
      }

      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          const row = this.d1_BillList.getSelectedRowData();

          if (row == null) {
            this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
            return;
          }

          this.$xutils.request({
            // 同步请求
            async: false,

            type: 'GET',
            url: this.$backend.cmisBiz + '/api/iqpwriteoffapp/deleteIqpWriteOffAppLogic/' + jsoPar.iqp_serno,

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
