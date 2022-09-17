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
let par = {};

export default {
  components: {d1ABillcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      par = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;// 卡片
      this.d1_B_BillList = this.$refs.d1_B_BillList;// 表单

      this.d1_A_BillCard.queryDataByCondition({serno: par.serno});

      this.d1_B_BillList.queryDataByCondition({serno: par.serno});
    },

    // 成员客户新增申请

    onAdd2 () {
      this.$dialog.open('关联成员新增', 'cusmanage/cusRelevance/dismiss/cusrelappIndex', 800, 600, {}, () => {
        this.d1_B_BillList.queryDataByCondition();
      });
      //  YuXP.openDialog('关联成员新增', '/yuxp/product/pages/cusmanage/cusRelevance/cusrelapp.js', -1, -1, jsoUser,null);
    },

    dozancun () {
      const reqData = this.$xutils.toUpperCase(this.d1_A_BillCard.getBillCardValue(), true);

      if (reqData) {
        this.$xutils.request({
          // 同步请求
          async: false,

          // 新增
          url: this.$backend.cmisCus + '/api/cusrelcusapp/insertCusRelCusApp',

          // data: JSON.stringify(YuXPUtil.toUpperCase(par, true)),
          data: JSON.stringify(reqData),

          success: (response, status, xhr) => {
            if (response.data) {
              this.$dialog.close(this.dialogId);
            } else {
              this.$xutils.showMsgBox('提示', response.message);
            }
          },

          error: (result, b) => {
            this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      } else {
        return;
      }
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
