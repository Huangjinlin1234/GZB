<template>

<div>
  <d1-billcard  ref="d1_BillCard" v-show="isShowBillCardFlg"></d1-billcard>
  <d1-15-billcard ref="d1_15_BillCard" v-show="isShow15BillCardFlg"></d1-15-billcard>
</div>

</template>
<script>
import d1Billcard from './ctrLoanContDetail_d1_BillCard.vue';
import d115Billcard from './ctrLoanContDetail_d1_15_BillCard.vue';
export default {
  components: {d1Billcard, d115Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null, // 当前页面表单
      isShowBillCardFlg: true,
      isShow15BillCardFlg: false,
      isShowTabs: false
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      var data = {};
      var contNo = '';
      if (this.getFactory().contextData.instanceInfo) {
        data = this.getFactory().contextData.instanceInfo;
        contNo = data.param.contNo;
      } else if (this.$route.meta.params) {
        data = this.$route.meta.params;
        contNo = data.contNo;
      } else if (this.getFactory().contextData) {
        data = this.getFactory().contextData;
        contNo = data.contNo;
      }
      // let contNo = this.getFactory().contextData.contNo;
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/ctrloancont/showdetial',
        data: {contNo: contNo}
      })
        .then(response => {
          // 一般合同和最高额和同类型处理
          let contType = response.data.contType;
          if (contType == '1') {
            // 数据加载
            this.d1_BillCard = this.$refs.d1_BillCard;
            this.isShowBillCardFlg = true;
            this.isShow15BillCardFlg = false;
          } else if (contType == '2') {
            this.d1_BillCard = this.$refs.d1_15_BillCard;
            this.isShowBillCardFlg = false;
            this.isShow15BillCardFlg = true;
          } else {
            // 默认显示一般合同
          }
          // 根据产品控制页签显隐处理
          this.getFactory().triggerAction(response.data);
          // 重置表单数据
          this.d1_BillCard.form.resetFields();
          // 给表单数据赋值
          this.$utils.clone(response.data, this.d1_BillCard.formdata);
          // 担保方式为抵押是，是否在线抵押显示且必填
          var guarWay = this.d1_BillCard.formdata.guarWay;
          if (guarWay == '10') {
            this.d1_BillCard.isOlPldShow = false;
          }
          // 根据产品信息控制字段显隐
          let prdId = this.d1_BillCard.formdata.prdId;
          let bankRole = this.d1_BillCard.formdata.bankRole;
          this.d1_BillCard.isShowByPrdIdFunc(prdId, bankRole);
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
    },

    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    },
    // 对公客户查看
    viewCusDataByCusId () {
      if (this.d1_BillCard.formdata.cusId == null || this.d1_BillCard.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.d1_BillCard.formdata.cusId;
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      let path = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
      // this.$dialog.open(
      //   '',
      //   'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05',
      //   -1,
      //   -1,
      //   json
      // );
      this.$router.addTab({
        name: path,
        key: json.cusId + json.opType,
        title: '对公客户查看',
        data: json
      });
    },
    viewReplyNo () {
      if (this.d1_BillCard.formdata.replyNo == null || this.d1_BillCard.formdata.replyNo == '') {
        this.$xutils.showMsgBox('提示', '批复编号为空!');
        return;
      }
      let params = {};
      params['replySerno'] = this.d1_BillCard.formdata.replyNo;
      this.$dialog.open(
        '',
        'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyDetail',
        -1,
        -1,
        params
      );
    },
    viewCoopCusName () {
      if (this.d1_BillCard.formdata.coopCusName == null || this.d1_BillCard.formdata.coopCusName == '') {
        this.$xutils.showMsgBox('提示', '合作方名称为空!');
        return;
      }
      this.$xutils.showMsgBox('提示', '暂未开发!');
    }
  }
};
</script>
