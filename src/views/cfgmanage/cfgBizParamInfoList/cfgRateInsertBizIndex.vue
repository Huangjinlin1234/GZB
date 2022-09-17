<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cfgRateInsertBiz_d1_BillCard.vue";
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
    this.$lookup.reg("STD_ZB_OPRD_TYP", "STD_ZB_CUR_TYP", "STD_ZB_BIZ_TYP");
    this.AfterInit();
  },
  methods: {
    // 利率配置-新增
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片
    },

    // 新增页面
    nextStep() {
      // 获取数据
      let jsoPar = this.d1_BillCard.getBillCardValue();

      let validateFlag = this.d1_BillCard.validateBillCardValue(); //表单必输项校验

      if (!validateFlag) {
        return;
      }
      // 插入数据
      let jsoUser = this.$xutils.getLoginUserInfo(); //当前登录用户信息
      // jsoPar.manager_id = jsoUser["loginCode"]; //主办人
      jsoPar.pkId = this.$xutils.getDefaultformulaData("SEQ:LMT_COOP_APP_SERNO"); //业务流水号生成
      // jsoPar.inputDate = this.$xutils.dateFormat("yyyy-MM-dd", new Date()); //登记日期
      // jsoPar.regiDate = this.$xutils.dateFormat("yyyy-MM-dd", new Date()); //截止日期

      // let jsopar1 = {
      //   templetcode: "cfg_rate_list",
      //   ds: "cmis_cfg",
      //   carddata: jsoPar
      // };

      // this.$xutils.doClassMethodCall("yuxpservice", "cn.com.yusys.yusp.yubao.base.service3.YuBaoBillDMO", "insertBillCardData", jsopar1); // 保存数据

      this.$xutils.request({
        // 同步请求
        async: false,
        type: "POST",
        url: this.$backend.cmisCfg + "/api/cfgrate/",
        data: jsoPar,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            this.$xutils.showMsgBox("提示", "保存成功");
            this.$dialog.close(this.dialogId);
          } else {
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox("提示", result + "；错误信息：" + b); // 弹出提示
        }
      });

      // jsoPar["model_group_no"] = "cfg_rate_list"; //利率配置
      // jsoPar["op"] = "EDIT";

      // // 绘制修改页面
      // this.$dialog.open("利率配置(修改)", "cfgmanage/cfgBizParamInfoList/cfgRateListUpdateIndex", -1, -1, jsoPar, null, true, true);
    },

    bycancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
