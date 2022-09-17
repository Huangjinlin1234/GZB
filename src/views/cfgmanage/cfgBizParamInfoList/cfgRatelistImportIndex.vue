<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cfgRatelistImport_d1_BillCard.vue";
/**
 *  业务参数配置列表
 */
const par = {};

export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      let par = this.pageParams;

      //    YuXP.createBillCard('yuxpservice', 'd1', 'cfg_rate_list_rs', null, '确定/cfgImport;取消/bycancel');
      this.d1_BillCard = this.$refs.d1_BillCard;

      //this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    // 表单change事件
    fileChangeFn(par, _src, _event) {
      const newData = {
        templetcode: this.pageParams.templetcode
      };

      this.pageParams["data"] = this.pageParams.data || {};
      this.$xutils.extend(this.pageParams.data, newData);
      return true;
    },

    // 上传成功
    //function cfgImport () {
    //    YuXPUtil.AJAX({
    //            async: false, // 同步请求
    //            url: YuXPUtil.getTopWindow().backend.yuxpservice + '/api/yubao/document/excel/import',
    //            type:'POST',
    //            data: {
    //                 'templetcode': 'cfg_rate_list',
    //                 'file': 'D:/doc/利率查看.xlsx'
    //             },
    //             success: function (response, status, xhr) {
    //                 console.log('返回信息打印:' + JSON.stringify(response) + '返回状态:' + status + 'xhr:' + JSON.stringify(xhr));
    //                 if (response.code == '0') {
    //                     YuXP.showMsgBox('提示', '导入成功', 350, 150, function () {
    //                     d1_BillList.queryDataByCondition();
    //                     });
    //                 } else {
    //                     YuXP.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
    //                 }
    //             },
    //             error: function (result, b) {
    //                 console.log(result + '；错误信息：' + b);
    //                 YuXP.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
    //             }
    //        });
    //}
    myUploadSuccess(response) {
      // 关闭当前页
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
