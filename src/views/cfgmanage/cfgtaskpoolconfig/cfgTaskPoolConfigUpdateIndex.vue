<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cfgTaskPoolConfigUpdate_d1_BillCard.vue";
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

      let allotWay = this.d1_BillCard.getBillCardItemValue("allotWay");
      this.visible(allotWay);

      //执行默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();

      //加载列表选中行带过来的数据
      this.d1_BillCard.setBillCardValue(this.pageParams);

      //添加CHANGE事件
      this.d1_BillCard.addEditChangeAction(this.onChange);

      //设置有权人POP框多选后，点击修改、查看时的返显值
      this.setAllotPriv();
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
      this.d1_BillCard.updateBillCardData();

      //YuXP.showMsgBox('提示', '保存成功！');
      this.$xutils.showMsgBox("提示", "保存成功!", 350, 150, _rt => {
        this.$dialog.close(this.dialogId, {
          CloseType: "OK"
        });
      });

      //刷新父级列表页面
      this.$xutils.getParentPage(this, "d1_BillList", "queryDataByCondition", [" opr_type = '01' "]);
    },

    //系统分配时间及管理员分配时间字段展示控制
    visible(allotWay) {
      if (allotWay == "00") {
        // 当分配方式为系统分配时，无需展示系统分配时间及管理员分配时间
        this.d1_BillCard.setBillCardItemVisible("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;ALLOT_PRIV_DUTY;ALLOT_PRIV_ORG;ALLOT_PRIV;", false);
        this.d1_BillCard.setBillCardItemRequired("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;ALLOT_PRIV_DUTY;ALLOT_PRIV_ORG;ALLOT_PRIV;", false);
        //this.d1_BillCard.setBillCardItemClearValue("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;ALLOT_PRIV_DUTY;ALLOT_PRIV_ORG;ALLOT_PRIV;");
        this.d1_BillCard.setBillCardItemVisible("allot_mode;", true);
        this.d1_BillCard.setBillCardItemRequired("allot_mode;", true);
      } else if (allotWay == "01") {
        //当分配方式为管理员分配时，无需展示系统分配时间及管理员分配时间
        this.d1_BillCard.setBillCardItemVisible("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;allot_mode;", false);
        this.d1_BillCard.setBillCardItemRequired("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;allot_mode;", false);
        //this.d1_BillCard.setBillCardItemClearValue("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;");
        this.d1_BillCard.setBillCardItemVisible("ALLOT_PRIV_DUTY;ALLOT_PRIV_ORG;ALLOT_PRIV;", true);
      } else if (allotWay == "02") {
        //当分配方式为系统自动分配+管理员分配时，都需展示且必填
        this.d1_BillCard.setBillCardItemVisible("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;allot_mode;ALLOT_PRIV_DUTY;ALLOT_PRIV_ORG;ALLOT_PRIV;", true);
        this.d1_BillCard.setBillCardItemRequired("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;allot_mode;ALLOT_PRIV_DUTY;ALLOT_PRIV_ORG;ALLOT_PRIV;", true);
      } else {
      }
    },

    //change事件捕捉
    onChange(thisCard, thisItem, oldValue, newValue) {
      if (thisItem == "allotWay") {
        this.visible(newValue);
      }

      //本次合作到期日必须大于本次合作起始日
      if (thisItem == "syatemAllotStartTime" && this.d1_BillCard.getBillCardItemValue("syatemAllotEndTime") != "") {
        if (newValue >= this.d1_BillCard.getItemValue("syatemAllotEndTime")) {
          this.d1_BillCard.setItemValue(thisItem, "");
          this.$xutils.showMsgBox("提示", '"系统分配起始时间"不能大于等于"系统分配终止时间"');
        }
      }

      if (thisItem == "syatemAllotEndTime" && this.d1_BillCard.getBillCardItemValue("syatemAllotStartTime") != "") {
        if (this.d1_BillCard.getItemValue("syatemAllotStartTime") >= newValue) {
          this.d1_BillCard.setItemValue(thisItem, "");
          this.$xutils.showMsgBox("提示", '"系统分配起始时间"不能大于等于"系统分配终止时间"');
        }
      }

      //评估资质有效到期日必须大于评估资质有效起始日
      if (thisItem == "manaAllotStartTime" && this.d1_BillCard.getBillCardItemValue("manaAllotEndTime") != "") {
        if (newValue >= this.d1_BillCard.getItemValue("manaAllotEndTime")) {
          this.d1_BillCard.setItemValue(thisItem, "");
          this.$xutils.showMsgBox("提示", '"管理员分配起始时间"不能大于等于"管理员分配终止时间"');
        }
      }

      if (thisItem == "manaAllotEndTime" && this.d1_BillCard.getBillCardItemValue("manaAllotStartTime") != "") {
        if (this.d1_BillCard.getItemValue("manaAllotStartTime") >= newValue) {
          this.d1_BillCard.setItemValue(thisItem, "");
          this.$xutils.showMsgBox("提示", '"管理员分配起始时间"不能大于等于"管理员分配终止时间"');
        }
      }
    },

    //设置有权人POP框多选后，点击修改、查看时的返显值
    //暂时不确定是否有更好的解决办法
    setAllotPriv() {
      //获取有权人分配岗位ID
      let allot_priv_duty = this.d1_BillCard.getBillCardItemValue("allotPrivDuty");

      //获取有权人用户ID
      let allot_priv = this.d1_BillCard.getBillCardItemValue("allotPriv");
      console.log(allot_priv);

      let allot_priv_arr = allot_priv.split(";");

      //根据岗位查询对应的用户编码和用户名称
      let rtData = this.$xutils.doClassMethodCall("yuxpservice", "cn.com.yusys.yusp.yubao.core.service.AdminSmUserDutyService", "getDutyUsers", {
        dutyId: allot_priv_duty
      });

      let users = rtData.data;

      //定义用于存放用户姓名的字符串，以;分隔
      let userNames = "";

      if (users) {
        //遍历数组
        for (let i = 0; i < allot_priv_arr.length; i++) {
          for (let j = 0; j < users.length; j++) {
            if (allot_priv_arr[i] == users[j].m_hData.user_id) {
              userNames = userNames + users[j].m_hData.user_name;
              break;
            }
          }

          if (i != allot_priv_arr.length - 1) {
            userNames = userNames + ";";
          }
        }
      }

      //设置有权人分配的中文显示值
      this.d1_BillCard.setBillCardItemValue("allotPrivName", userNames);
    }
  }
};
</script>
