<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './accWriteOffList_d1_BillList.vue'
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
    /**
       *核销贷款台账列表页面
       *  @author xuchao
       */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    /**
       * 查看
       */
    onView() {
      const row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '请选择一条记录！');
        return;
      }

      const params = {
        'acc_no': row.acc_no
      };

      params['model_group_no'] = 'CMG548798589859954688';// 贷款台账模块
      params['op'] = 'VIEW';
      params['cus_catalog'] = row.cus_catalog;

      this.$dialog.open(
        '贷款台账',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params
      );
    },

    // 获取借据信息
    findAccInfoFromBackend(billNo) {
      let returnData = {};

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'get',
        url: this.$backend.cmisBiz + '/api/accloan/' + billNo,

        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = this.$xutils.toUpperCase(response.data, false);
          } else {
            returnData = null;
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          returnData = null;
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return returnData;
    }
  }
};
</script>
