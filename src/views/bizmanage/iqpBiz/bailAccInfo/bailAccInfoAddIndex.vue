<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './bailAccInfoAdd_d1_BillCard.vue';
/**
 * 保证金信息新增页面
 */
let selfPar = {};

export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      selfPar = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片

      // 执行配置的默认值公式
      // this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    // 保存操作
    onSave () {
      let validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      this.d1_BillCard.setItemValue('serno', selfPar.serno);// 流水号

      // 获取当前界面数据，带入修改界面中
      let jsoPar = this.d1_BillCard.getBillCardValue();

      let bailAccInfo = this.$xutils.toUpperCase(jsoPar, true);

      // 保存操作
      let rtnData = '';

      let rtnFlag = true;

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/bailaccinfo/savebailaccinfo',
        data: JSON.stringify(bailAccInfo),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            rtnFlag = false;
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (!rtnFlag || JSON.stringify(rtnData) == '{}' || JSON.stringify(rtnData) == '') {
        return;
      }

      if (rtnData.rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', rtnData.rtnMsg); // 弹出提示
        return;
      }

      this.$xutils.showMsgBox('提示', '新增成功', null, null, () => {
        //     // 刷新父级页面的列表数据
        this.$xutils.getParentPage(
          this,
          'd1_B_A_BillList',
          'queryDataByCondition',
          [{serno: selfPar.serno}]
        );

        this.$dialog.close(this.dialogId);
      });
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
