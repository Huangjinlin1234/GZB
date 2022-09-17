<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpWriteOffAppQueryList_d1_BillList.vue'
/**
 * title 核销申请列表页面
 * author 马顺
 * date 2021-01-26
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
      // 根据配置模板创建核销申请列表
      this.d1_BillList = this.$refs.d1_BillList;

      // 赋值查询条件，查询主管人为当前，操作类型新增，审批状态为【'待发起'、'取消'、'追回'、'打回'】
      // 【模板可能存在复用情况，将条件写入调用js中方便复用】
      condition = {oprType:"01", approveStatusList:"111,997,998"};

      // 表单设置查询条件
      this.d1_BillList.setAppendSQLCondition(condition);

      this.d1_BillList.queryDataByCondition();

      // 过滤申请状态，移除【审批中、通过、否决】数据字典
      this.d1_BillList.setSelectOptions('approve_status', 'hidden', '000,990,991,992');
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

    // 刷新页面数据
    refreshBillListData() {
      this.d1_BillList.queryDataByCondition(condition);
    }
  }
};
</script>
