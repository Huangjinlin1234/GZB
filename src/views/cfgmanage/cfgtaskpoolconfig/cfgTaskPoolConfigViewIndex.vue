<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cfgTaskPoolConfigView_d1_BillCard.vue";
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

      //加载列表选中行带过来的数据
      this.d1_BillCard.setBillCardValue(this.pageParams);

      //设置不可编辑
      this.d1_BillCard.setBillCardItemEditable("*", false);

      //页面初始化
      this.cardInit();
    },

    // 直接关闭
    onClose() {
      this.$dialog.close(this.dialogId, {
        CloseType: "Cancel"
      });
    },

    cardInit() {
      let allot_way = this.pageParams.allotWay;

      // 当分配方式为系统分配时，无需展示系统分配时间及管理员分配时间
      if (allot_way == "00") {
        this.d1_BillCard.setBillCardItemVisible("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;", false);

        this.d1_BillCard.setBillCardItemVisible("allot_time_interval", true);

        this.d1_BillCard.setBillCardItemRequired("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;", false);

        this.d1_BillCard.setBillCardItemRequired("allot_time_interval", true);

        //this.d1_BillCard.setBillCardItemClearValue("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;");
      }

      //当分配方式为管理员分配时，无需展示系统分配时间及管理员分配时间
      if (allot_way == "01") {
        this.d1_BillCard.setBillCardItemVisible("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;", false);

        this.d1_BillCard.setBillCardItemRequired("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;", false);

        //this.d1_BillCard.setBillCardItemClearValue("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;");
      }

      //当分配方式为系统自动分配+管理员分配时，都需展示且必填
      if (allot_way == "02") {
        this.d1_BillCard.setBillCardItemVisible("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;", true);

        this.d1_BillCard.setBillCardItemRequired("syatem_allot_start_time;syatem_allot_end_time;mana_allot_start_time;mana_allot_end_time;allot_time_interval;", true);
      }

      //设置有权人POP框多选后，点击修改、查看时的返显值
      this.setAllotPriv();
    },

    //设置有权人POP框多选后，点击修改、查看时的返显值
    //暂时不确定是否有更好的解决办法
    setAllotPriv() {
      //获取有权人分配岗位ID
      let allot_priv_duty = this.d1_BillCard.getBillCardItemValue("allot_priv_duty");

      //获取有权人用户ID
      let allot_priv = this.d1_BillCard.getBillCardItemValue("allot_priv");

      let allot_priv_arr = allot_priv.split(";");

      //根据岗位查询对应的用户编码和用户名称
      let rtData = this.$xutils.doClassMethodCall("yuxpservice", "cn.com.yusys.yusp.yubao.core.service.AdminSmUserDutyService", "getDutyUsers", {
        dutyId: allot_priv_duty
      });

      // console.log(rtData3);
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
      this.d1_BillCard.setBillCardItemValue("allot_priv_name", userNames);
    }
  }
};
</script>
