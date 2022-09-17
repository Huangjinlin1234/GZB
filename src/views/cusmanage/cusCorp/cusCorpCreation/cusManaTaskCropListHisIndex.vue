<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusManaTaskCropListHis_d1_BillList.vue';
/**
 * 对公客户日常管理
 * @constructor
 */
let data = {};

export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
    },

    // 处理
    doView () {
      // 获取列表选则数据
      const json = this.d1_BillList.getSelectedRowData();

      if (json == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      // 获取业务类型（正式，临时）
      const bizType = json.bizType;

      // 类型区分
      json['flag'] = 'update';

      // json['cusId'] = json.cusId;
      // json['cusName'] = json.cusName;
      // json['certType'] = json.certType;
      // json['certCode'] = json.certCode;

      if (bizType == 'A02') {
        json['model_group_no'] = 'CMG000251';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = bizType;

        this.$dialog.open('公司客户创建（临时）', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, json, () => {});
      } else if (bizType == 'A01') {
        json['model_group_no'] = 'CMG000253';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = bizType;

        this.$dialog.open('公司客户创建（正式）', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, json, () => {});
      } else if (bizType == 'A03') {
        json['model_group_no'] = 'CMG000248';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        json['biz_type'] = bizType;

        this.$dialog.open('公司客户创建（正式）', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, json, () => {});
      }
    },

    // 返回
    doBack () {
      this.$xutils.getParentPage(this, null, 'back');
    },

    // 定义树切换调用方法
    showAction () {}
  }
};
</script>
