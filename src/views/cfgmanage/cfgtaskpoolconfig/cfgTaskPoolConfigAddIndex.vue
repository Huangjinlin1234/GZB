<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cfgTaskPoolConfigAdd_d1_BillCard.vue";
yufp.lookup.reg("STD_ZB_TP_ALLOT_WAY,STD_ZB_TP_ALLOT_MODE,STD_ZB_YES_NO,STD_ZB_OPR_TYPE");
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
      this.d1_BillCard = this.$refs.d1_BillCard;

      //执行默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();

      //添加CHANGE事件
      this.d1_BillCard.addEditChangeAction(this.onChange);
    },

    // 直接关闭
    onClose() {
      this.$dialog.close(this.dialogId, {
        CloseType: "Cancel"
      });
    },

    //保存并关闭
    onSave() {
      //表单必填项的校验
      if (!this.d1_BillCard.validateBillCardValue()) {
        return;
      }

      //插入数据
      this.d1_BillCard.insertBillCardData();

      //YuXP.showMsgBox('提示', '保存成功！');
      this.$xutils.showMsgBox("提示", "保存成功!", 350, 150, _rt => {
        this.$dialog.close(this.dialogId, {
          CloseType: "OK"
        });
      });
      //刷新父级列表页面

      this.$xutils.getParentPage(this, "d1_BillList", "queryDataByCondition", [" opr_type = '01' "]);
    },

    //change事件捕捉
    onChange(thisCard, thisItem, oldValue, newValue) {
      // 当分配方式为系统分配时，无需展示系统分配时间及管理员分配时间
      if (thisItem == "allotWay" && newValue == "00") {
        this.d1_BillCard.setBillCardItemVisible("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;ALLOT_PRIV_DUTY;ALLOT_PRIV_ORG;ALLOT_PRIV;", false);

        this.d1_BillCard.setBillCardItemRequired("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;ALLOT_PRIV_DUTY;ALLOT_PRIV_ORG;ALLOT_PRIV;", false);

        //this.d1_BillCard.setBillCardItemClearValue("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;ALLOT_PRIV_DUTY;ALLOT_PRIV_ORG;ALLOT_PRIV;");

        this.d1_BillCard.setBillCardItemVisible("allotMode;", true);
        this.d1_BillCard.setBillCardItemRequired("allotMode;", true);
      }

      //当分配方式为管理员分配时，无需展示系统分配时间及管理员分配时间
      if (thisItem == "allotWay" && newValue == "01") {
        this.d1_BillCard.setBillCardItemVisible("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;allot_mode;", false);

        this.d1_BillCard.setBillCardItemRequired("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;allot_mode;", false);

        //this.d1_BillCard.setBillCardItemClearValue("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;");

        this.d1_BillCard.setBillCardItemVisible("ALLOT_PRIV_DUTY;ALLOT_PRIV_ORG;ALLOT_PRIV;", true);
      }

      //当分配方式为系统自动分配+管理员分配时，都需展示且必填
      if (thisItem == "allotWay" && newValue == "02") {
        this.d1_BillCard.setBillCardItemVisible("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;allot_mode;ALLOT_PRIV_DUTY;ALLOT_PRIV_ORG;ALLOT_PRIV;", true);

        this.d1_BillCard.setBillCardItemRequired("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;allot_mode;ALLOT_PRIV_DUTY;ALLOT_PRIV_ORG;ALLOT_PRIV;", true);
      }

      //本次合作到期日必须大于本次合作起始日
      if (thisItem == "syatemAllotStartTime" && this.d1_BillCard.getBillCardItemValue("syatemAllotEndTime") != "") {
        if (newValue >= this.d1_BillCard.getItemValue("syatemAllotEndTime")) {
          this.d1_BillCard.setItemValue(thisItem, "");
          this.$xutils.showMsgBox("提示", '系统分配起始时间"不能大于等于"系统分配终止时间');
        }
      }

      if (thisItem == "syatemAllotEndTime" && this.d1_BillCard.getBillCardItemValue("syatemAllotStartTime") != "") {
        if (this.d1_BillCard.getItemValue("syatemAllotStartTime") >= newValue) {
          this.d1_BillCard.setItemValue(thisItem, "");
          this.$xutils.showMsgBox("提示", '系统分配起始时间"不能大于等于"系统分配终止时间');
        }
      }

      //评估资质有效到期日必须大于评估资质有效起始日
      if (thisItem == "manaAllotStartTime" && this.d1_BillCard.getBillCardItemValue("manaAllotEndTime") != "") {
        if (newValue >= this.d1_BillCard.getItemValue("mana_allot_end_time")) {
          this.d1_BillCard.setItemValue(thisItem, "");
          this.$xutils.showMsgBox("提示", '管理员分配起始时间"不能大于等于"管理员分配终止时间"');
        }
      }

      if (thisItem == "manaAllotEndTime" && this.d1_BillCard.getBillCardItemValue("manaAllotStartTime") != "") {
        if (this.d1_BillCard.getItemValue("manaAllotStartTime") >= newValue) {
          this.d1_BillCard.setItemValue(thisItem, "");
          this.$xutils.showMsgBox("提示", '管理员分配起始时间"不能大于等于"管理员分配终止时间"');
        }
      }
    }
  }
};
</script>
