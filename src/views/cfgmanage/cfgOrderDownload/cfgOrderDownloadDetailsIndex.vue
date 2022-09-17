<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cfgOrderDownloadDetails_d1_BillCard.vue";
export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String,
  },
  data() {
    return {
      d1_BillCard: null,
    };
  },
  mounted() {
    this.$lookup.reg(
      "STD_ORDER_TYPE,STD_ORDER_SOURCE,STD_ORDER_STATUS,STD_ORDER_WATER"
    );
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;

      if (this.pageParams.opType != "add") {
        let par = this.pageParams;
        let opType = par.opType;
        // if (opType == 'view') {
        // YuXP.createBillCard('yuxpservice', 'd1', 'cfg_order_download_list', null, '返回/cancelFn;');
        //   d1_BillCard.setItemEditable('*', false);
        // } else if (opType == 'edit') {
        // YuXP.createBillCard('yuxpservice', 'd1', 'cfg_order_download_list', null, '保存/saveFn;返回/cancelFn;');
        // }
        this.d1_BillCard.setBillCardValue(par);

        // this.$xutils.request({
        //   // 同步请求
        //   async: false,

        //   type: "POST",
        //   url:
        //     this.$backend.cmisCfg +
        //     "/api/cfgflexqry/getshowlist/" +
        //     par.download_action,

        //   success: (response, status, xhr) => {
        //     this.d1_BillCard.setSelectOptions(
        //       "row_cfg_id",
        //       "replaceAll",
        //       response
        //     );
        //   },
        // });

        if (this.pageParams.opType == "view") {
          this.d1_BillCard.setItemEditable("*", false);
        }
      } else {
        // YuXP.createBillCard('yuxpservice', 'd1', 'cfg_order_download_list', null, '保存/addFn;返回/cancelFn;');
        let orderSeq = this.$xutils.getSEQWithParamFromServer(
          "ORDER_SERNO",
          {}
        );

        this.d1_BillCard.setBillCardItemValue("pkId", orderSeq);
        this.d1_BillCard.setBillCardItemValue("exportSourType", "1");
      }

      // setBillCardItemRules('cron_time', [{
      //   required: true,
      //   message: '请输入Cron表达式',
      //   trigger: 'blur'
      // }, {
      //   pattern: '^\\s*($|#|\\w+\\s*=|(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\,)(?:[01]?\\d|2[0-3]))?(?:,(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\,)(?:[01]?\\d|2[0-3]))?)*)\\s+(\\?|\\*|(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?(?:,(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?)*)\\s+(\\?|\\*|(?:[1-9]|1[012])(?:(?:-|\\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\\?|\\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\\s+(\\?|\\*|(?:[0-6])(?:(?:-|\\/|\\,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\\/|\\,|#)(?:[0-6]))?(?:L)?)*|\\?|\\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\\s)+(\\?|\\*|(?:|\\d{4})(?:(?:-|\\/|\\,)(?:|\\d{4}))?(?:,(?:|\\d{4})(?:(?:-|\\/|\\,)(?:|\\d{4}))?)*))$',
      //   message: '请输入正确的Cron表达式'
      // }]);

      this.d1_BillCard.addEditChangeAction(this.onChange);
    },

    onChange(thisCard, itemkey, oldValue, newValue) {
      if (itemkey == "download_action" && newValue != "") {
        this.$xutils.request({
          // 同步请求
          async: false,

          type: "POST",
          url:
            this.$backend.cmisCfg + "/api/cfgflexqry/getshowlist/" + newValue,

          success: (response, status, xhr) => {
            this.d1_BillCard.setSelectOptions(
              "row_cfg_id",
              "replaceAll",
              response
            );
          },
        });
      }
    },

    cancelFn() {
      this.$dialog.close(this.dialogId);
    },

    addFn() {
      let _this = this;
      let valid = this.d1_BillCard.validateBillCardValue();

      if (!valid) {
        return;
      }

      var userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue("status", "2");
      this.d1_BillCard.setItemValue("input_id", userInfo.loginCode);
      this.d1_BillCard.setItemValue("input_br_id", userInfo.orgCode);
      this.d1_BillCard.setItemValue(
        "input_date",
        this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date())
      );
      // let result = this.dealCheckBox(this.d1_BillCard.formdata.waterContent);
      // this.d1_BillCard.formdata.waterContent = result;
      let resp = this.d1_BillCard.insertBillCardData();

      if (resp) {
        var userInfo = this.$xutils.getLoginUserInfo();

        // this.$xutils.showMsgBox("提示", "新增成功!", 350, 150, () => {
        this.cancelFn();
        // });
      }
    },

    saveFn() {
      let valid = this.d1_BillCard.validateBillCardValue();

      if (!valid) {
        return;
      }
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue("upd_id", userInfo.loginCode);
      this.d1_BillCard.setItemValue("upd_br_id", userInfo.orgCode);
      this.d1_BillCard.setItemValue(
        "upd_date",
        this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date())
      );
      // let result = this.dealCheckBox(this.d1_BillCard.formdata.waterContent);
      // this.d1_BillCard.formdata.waterContent = result;
      let resp = this.d1_BillCard.updateBillCardData();

      if (resp) {
        // this.$xutils.showMsgBox("提示", "保存成功!", 350, 150, () => {
        this.cancelFn();
        // });
      }
    },
    // dealCheckBox(waterContent) {
    //   let result = "";
    //   if (waterContent == null || waterContent == "") {
    //     return;
    //   }
    //   // for(let i = 0; i < waterContent.length; i++){
    //   //   result += (waterContent[i] + (i == waterContent.length - 1) ? "" : ";");
    //   // }
    //   result = waterContent.join(";");
    //   return result;
    // },
  },
};
</script>