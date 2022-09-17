<template>
  <div>
    <div>
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="cancel">返回</yu-button>
      </yu-form-buttons>
    </div>
    <div>
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './cusGuideAppView_d1_A_BillCard.vue';
import d1BBilllist from './cusGuideAppView_d1_B_BillList.vue';
/**
  档案延期选取界面
*/
// let par = {};

export default {
  components: {d1ABillcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      par: {},
      d1_A_BillCard: null,
      d1_B_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.par = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;// 卡片
      this.d1_B_BillList = this.$refs.d1_B_BillList;// 表单
      this.getInfo();
      // this.d1_A_BillCard.queryDataByCondition({correNo: par.correNo});
      this.d1_B_BillList.queryDataByCondition({correNo: this.par.correNo});
    },
    getInfo () {
      if (!this.par.correNo) {
        return;
      }
      this.$request({
        url: this.$backend.cmisCus + '/api/cusrelcus/query',
        method: 'post',
        data: {condition: JSON.stringify({correNo: this.par.correNo})}
      }).then((res) => {
        if (res.code == '0') {
          this.$utils.clone(res.data[0], this.d1_A_BillCard.formdata);
        }
      });
    },
    // 保存成功后回调
    // function doReturnFn(){
    //    jsoPar['model_group_no'] = 'IQP_ACCT_CHG_CONT';//合同帐号变更申请-修改模板组
    //    jsoPar['op'] = 'EDIT';
    //    // 绘制修改页面
    //    YuXP.openDialogAndCloseMe('合同帐号变更申请-修改', '/yuxp/product/pages/cfgmanage/productconfig/templetfactory/tempetfactorypreview.js', '1200', '800', jsoPar, close, true, true);
    // }
    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
