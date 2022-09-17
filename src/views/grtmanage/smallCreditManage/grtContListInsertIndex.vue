<template>
  <d1-billcard ref="d1_BillCard" :page-params="pageParams"></d1-billcard>
</template>
<script>
import d1Billcard from './grtContListInsert_d1_BillCard.vue';
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
    // 新增担保合同向导页面
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      var data = this.pageParams;
      // 是否追加担保  0否
      if (data.isAddGuar && data.isAddGuar != '') {
        data['isSuperaddGuar'] = data.isAddGuar;
      } else {
        data['isSuperaddGuar'] = '1';
      }
      if (data.contType == '1') { // 如果为一般合同，那么担保合同类型可修改，
        this.d1_BillCard.disabledFlg = false;
      } else {
        data['guarContType'] = 'B';// 最高额担保合同
      }
      // 如果主合同是低风险质押，则新增默认为质押的担保合同
      if (data.guarWay) {
        if (data.guarWay == '21') {
          data.guarWay = '20';
        }
      }
      if (data.guarMode) {
        if (data.guarMode == '21') {
          data.guarWay = '20';
        }
      }
      if (data.guarWay !== '10' && data.guarWay !== '20' && data.guarWay !== '30') {
        this.$xutils.showMsgBox('提示', '担保合同的担保方式只能为抵押/质押/保证！');
      }
      this.d1_BillCard.setBillCardValue(data);
    },

    // 点击下一步，跳转到抵押担保合同界面  guarContType
    next () {
      // js校验必输
      let saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      let params = this.d1_BillCard.getBillCardValue();
      let guarWay = params.guarWay; // 担保方式

      let guarContType = params.guarContType;// 担保合同类型 A 一般 B 最高
      if (params.isSuperaddGuar == '0') { // 是否追加担保为否时，需校验最高额担保合同的担保方式
        if (guarContType == 'B' && guarWay != this.pageParams.guarWay) {
          if(!this.pageParams.bizType) {
            this.$xutils.showMsgBox('提示', '最高额担保合同,担保方式必须与借款合同的担保方式一致');
            return;
          }
        }
      }
      if(guarWay == '00'){
        this.$xutils.showMsgBox('提示', '担保方式为信用的不能新增担保合同');
            return;
      }

      // 打包变更使用
      params.guarChgAdd = this.pageParams.guarAdd;
      params.guarEdit = this.pageParams.guarEdit;
      params['guarStartDate'] = this.pageParams.guarStartDate;
      params['guarEndDate'] = this.pageParams.guarEndDate;
      params['contNo'] = this.pageParams.contNo;
      params['belgLine'] = this.pageParams.belgLine;
      params['contTerm'] = this.pageParams.contTerm;
      var title = params.guarWay == '30' ? '保证担保合同' : '抵质押担保合同';
      this.$dialog.open(
        title,
        'grtmanage/smallCreditManage/grtPldContIndex',
        1600,
        650,
        params,
        () => {
          this.onCancel();
        },
        true,
        true
      );
    },

    // 返回列表
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
