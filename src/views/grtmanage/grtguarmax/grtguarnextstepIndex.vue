<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './grtguarnextstep_d1_BillCard.vue';
// 最高额担保引导界面
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
      this.d1_BillCard = this.$refs.d1_BillCard;// 创建卡片
      this.d1_BillCard.execBillCardDefaultValueFormula();// 取模板设定的默认值
      // 设置担保合同类型默认最高额担保合同
      // this.d1_BillCard.setBillCardValue({guar_cont_type: '01'});
      this.d1_BillCard.formdata.guarContType = '01';
      // this.d1_BillCard.formdata.borrowerId = '1000000007';
      // this.d1_BillCard.formdata.borrowerName = '集团测试马顺公司七';
      // 过滤担保方式状态，隐藏【信用】等数据字典
      this.d1_BillCard.setSelectOptions('guar_way', 'hidden', '400');

      // //加载工具js方法
      // this.$xutils.importJsOrderBy(
      //   ['/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js'],
      //   0,
      //   null
      // );
    },

    // 下一步
    nextStep () {
      let guarContType = this.d1_BillCard.getBillCardItemValue('guar_cont_type');
      let guarWay = this.d1_BillCard.getBillCardItemValue('guar_way');
      this.d1_BillCard.setItemValue('guar_cont_state', '00');
      this.d1_BillCard.setItemValue('cont_print_num', '0');
      this.d1_BillCard.setItemValue('opr_type', '01');
      this.d1_BillCard.setItemValue('cur_type', 'CNY');

      // 调用公用方法的流水号获取方法 getGuarSepByParam('DB', guarContType, guarWay)
      this.d1_BillCard.setItemValue('guar_pk_id', 'DB' + Date.now());
      // getGuarSepByParam('HT', guarContType, guarWay)
      this.d1_BillCard.setItemValue('guar_cont_no', 'HT' + Date.now());

      // 默认担保合同状态为登记
      let params = this.d1_BillCard.getBillCardValue();

      if (!this.d1_BillCard.validateBillCardValue()) {
        return;
      }

      // let dealResult = this.d1_BillCard.saveBillCardData();
      this.$request({
        url: this.d1_BillCard.addUrl,
        method: 'post',
        data: this.d1_BillCard.formdata
        // async: false
      }).then((response) => {
        if (response.code == '0') {
          this.$message('新增成功!');
          this.onCancel();
          this.$xutils.getParentPage(this, null, 'getDialogDataFunc');
          params['model_group_no'] = 'GRT_GUAR_CONT_ADD';
          params['op'] = 'ADD';

          this.$dialog.open(
            '',
            'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
            -1,
            -1,
            params,
            true,
            true
          );
        }
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '新增失败', type: 'error' });
      });
    },

    // 返回列表
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
