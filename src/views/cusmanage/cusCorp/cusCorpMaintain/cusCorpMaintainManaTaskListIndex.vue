<template>
  <d1-billlist ref="d1_BillList" :pageParams="data"></d1-billlist>
</template>
<script>
import d1Billlist from './cusCorpMaintainManaTaskList_d1_BillList.vue';

export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      data: {},
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.data = this.$route.params;
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 处理
    applySubmit () {
      // 获取列表选则数据
      const json = this.d1_BillList.getSelectedRowData();
      if (json == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      // 获取业务类型（正式，临时）
      const bizType = json.bizType;
      json['op'] = 'VIEW';
      json['op_type'] = 'view';
      json['bizType'] = bizType;
      // 类型区分
      json['flag'] = 'update';
      // json['cusId'] = json.cusId;
      // json['cusName'] = json.cusName;
      // json['certType'] = json.certType;
      // json['certCode'] = json.certCode;

      if (bizType == '0') {
        json['model_group_no'] = 'CMG000275';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = '0';

        this.$dialog.open('公司客户维护（临时）', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, json, () => {});
      } else if (bizType == '1') {
        json['model_group_no'] = 'CMG000296';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = '0';

        this.$dialog.open('公司正式客户主观信息维护', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, json, () => {});
      } else if (bizType == '2') {
        this.$dialog.open('公司正式客户客观信息维护（集中作业）', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, json, () => {});
      } else if (bizType == '3') {
        this.$dialog.open('公司客户财务报表新增（集中作业）', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, json, () => {});
      } else if (bizType == '4') {
        this.$dialog.open('公司客户财务报表修改（集中作业）', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, json, () => {});
      } else if (bizType == '5') {
        json['model_group_no'] = 'CMG000281';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = '0';

        this.$dialog.open('公司正式客户信息维护', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, json, () => {});
      } else if (bizType == '6') {
        this.$dialog.open('公司客户财务报表新增', 'cusmanage/fncconf/fncStatBase/fncStatBaseList02Index', -1, -1, json, () => {});
      } else if (bizType == '7') {
        this.$dialog.open('公司客户财务报表修改', 'cusmanage/fncconf/fncStatBase/fncStatBaseList02Index', -1, -1, json, () => {});
      }
    },

    // 返回
    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
