<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusYndListAppAdd_d1_BillCard.vue';
export default {
  components: { d1Billcard },
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
    /**
     * 刘愿 优农贷名单准入申请新增
     */

    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    // 【下一步】按钮的逻辑
    next () {
      // 校验
      var _this = this;
      const isValidateSucess = _this.d1_BillCard.validateBillCardValue();
      if (!isValidateSucess) {
        return;
      }
      var rqData = {};
      rqData['certType'] = 'A';
      rqData['certCode'] = _this.d1_BillCard.formdata.certCode;
      _this.$xutils.request({
        // 同步请求
        async: true,
        url: _this.$backend.cmisCus + '/api/cusindiv/getCertByCodeAndType',
        data: rqData,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data) {
              // 获取返回的客户号
              let jsoPar = _this.d1_BillCard.formdata;
              jsoPar['cusId'] = response.data.cusId;
              jsoPar['sex'] = response.data.sex;
              jsoPar['edu'] = response.data.indivEdt;
              jsoPar['marStatus'] = response.data.marStatus;
              jsoPar['isHaveChildren'] = response.data.isHaveChildren;
              jsoPar['model_group_no'] = 'CMG000020';
              // jsoPar['op'] = 'VIEW';
              jsoPar['opType'] = 'add';
              _this.$dialog.open(
                '优农贷名单准入',
                'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
                -1,
                -1,
                jsoPar,
                _this.getDialogDataFunc,
                true
              );
            } else {
              let creatData = _this.d1_BillCard.formdata;
              creatData['mrgCertType'] = 'A';
              creatData['mrgName'] = _this.d1_BillCard.formdata.cusName;
              creatData['mrgCertCode'] = _this.d1_BillCard.formdata.certCode;
              _this.$request({
                url: _this.$backend.cmisCus + '/api/cuscorpmgr/sendEcif',
                method: 'post',
                data: creatData
              }).then((response) => {
                if (response.code === '0') {
                  let rtdata = _this.d1_BillCard.formdata;
                  rtdata['cusId'] = response.data.cusId;
                  rtdata['model_group_no'] = 'CMG000020';
                  // rtdata['op'] = 'VIEW';
                  rtdata['opType'] = 'add';
                  _this.$dialog.open(
                    '优农贷名单准入',
                    'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
                    -1,
                    -1,
                    rtdata,
                    _this.getDialogDataFunc,
                    true
                  );
                } else {
                  _this.$xutils.showMsgBox('提示', response.message, 350, 150);
                }
              });
            }
          } else {
            _this.$xutils.showMsgBox('提示', '获取客户号失败：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          //
        }
      });
    },

    // 取消
    bycancel () {
      this.$dialog.close(this.dialogId);
    },

    getDialogDataFunc () {
    }
  }
};
</script>
