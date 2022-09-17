<template>
  <div>
    <div style="height:40%">
        <div>
    <div style="height:70%">
        <d1-b-b-billcard ref="d1_B_B_BillCard"></d1-b-b-billcard>
    </div>
    <div style="height:calc(100% - 70%)">
        <d1-b-a-billlist ref="d1_B_A_BillList"></d1-b-a-billlist>
    </div>
  </div>
    </div>
    <div style="height:calc(100% - 40%)">
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './lmtGroupAppChg_d1_A_BillCard.vue';
import d1BBBillcard from './lmtGroupAppChg_d1_B_B_BillCard.vue';
import d1BABilllist from './lmtGroupAppChg_d1_B_A_BillList.vue';
/**
 * title 主界面
 * author xiamc
 * date 2021-04-19
 * */
var param = {};

let _data;
var param = {};

export default {
  components: {d1ABillcard, d1BBBillcard, d1BABilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_B_BillCard: null,
      d1_B_A_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      param = this.pageParams;
      param = this.pageParams;

      // 复用代码模板
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;

      // 更新代码模板
      this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;

      // 新建一个模板，主要界面放到一个模板中，把批复信息放到下一个组中
      this.d1_B_B_BillCard = this.$refs.d1_B_B_BillCard;

      this.d1_A_BillCard.execBillCardDefaultValueFormula();
      this.d1_B_B_BillCard.execBillCardDefaultValueFormula();
      this.d1_A_BillCard.queryDataByCondition({'serno': this.pageParams.serno}, 'post');
      this.d1_B_A_BillList.queryDataByCondition({'grpSerno': this.pageParams.serno});
      this.d1_B_B_BillCard.queryDataByCondition({'serno': this.pageParams.serno}, 'post');
    },

    /**
       * 执行暂存
       */
    dotempSave () {
      this.$xutils.showMsgBox('提示', '执行暂存');
    },

    /**
       * 手写commit 数据
       */
    doCommit () {
      // 得到主表的数值
      const params = this.d1_A_BillCard.getBillCardValue();

      // 1. 得到中间表格的数值
      const list = this.d1_B_A_BillList.getBillListData();

      // 2. 主表上半必输校验
      const validateFlag = this.d1_A_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      // 2.1 主表下半部分校验
      const validateFlagB = this.d1_B_B_BillCard.validateBillCardValue();

      if (!validateFlagB) {
        return;
      }

      // 3.提交之后保存到主从关系表中
      this.sendSavePost(params);
    },

    doBack () {},

    // 封装发送后台的逻辑，保存，暂存通用的方法
    sendSavePost (params) {
      const zzz = JSON.stringify(this.$xutils.toUpperCase(params, true));
      const saveFlag = true;
      const rtnData = {};

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        // url: YuXPUtil.getTopWindow().backend.cmisBiz + '/api/iqpwriteoffapp/update',
        url: this.$backend.cmisBiz + '/api/lmtgrpapp/save',

        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', ' 插入成功', 200, 200, () => {
              this.$dialog.close(this.dialogId);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
