<template>
  <div>
    <div style="height:40%">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 40%)">
      <div>
        <div style="height:65%">
          <d1-b-a-billlist ref="d1_B_A_BillList"></d1-b-a-billlist>
        </div>
        <div style="height:calc(100% - 65%)">
          <d1-b-b-billcard ref="d1_B_B_BillCard"></d1-b-b-billcard>
        </div>
      </div>
      <div class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="dotempSave">暂存</yu-button>
        <yu-button type="primary" @click="doCommit">提交</yu-button>
        <yu-button @click="doBack">返回</yu-button>
      </div>
    </div>
    <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
  </div>

</template>
<script>
import d1ABillcard from './lmtGroupApp_d1_A_BillCard.vue';
import d1BBBillcard from './lmtGroupApp_d1_B_B_BillCard.vue';
import d1BABilllist from './lmtGroupApp_d1_B_A_BillList.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
/**
 * title 主界面
 * author xiamc
 * date 2021-04-02
 * */
let _data;
var param = {};

export default {
  components: { d1ABillcard, d1BBBillcard, d1BABilllist },
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
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;
      this.d1_B_B_BillCard = this.$refs.d1_B_B_BillCard;
      if (param.op == 'ADD') {
        this.d1_A_BillCard.execBillCardDefaultValueFormula();
        this.d1_B_B_BillCard.execBillCardDefaultValueFormula();
      }
      this.d1_A_BillCard.queryDataByCondition({ serno: this.pageParams.serno }, 'POST');
      this.d1_B_A_BillList.queryDataByCondition({ grpSerno: this.pageParams.serno });
      this.d1_B_B_BillCard.queryDataByCondition({ serno: this.pageParams.serno }, 'POST');
    },

    dotempSave () {
      const info = this.d1_A_BillCard.getBillCardValue();
      // 提交
      const loginUser = this.$xutils.getLoginUserInfo();

      var _this = this;
      // 提交流程
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.code;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'SX008-gbt';
      startdto.bizId = 'sq0100100101011';
      startdto.bizUserName = info.grpCusName;
      startdto.bizUserId = info.grpCusId;
      startdto.param = {};

      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 手写commit 数据
    doCommit () {
      // 得到主表的数值
      const params = this.d1_A_BillCard.getBillCardValue();

      // 得到中间表格的数值
      const list = this.d1_B_A_BillList.getBillListData();

      // 必输校验
      const validateFlag = this.d1_A_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      const validateFlagB = this.d1_B_B_BillCard.validateBillCardValue();

      if (!validateFlagB) {
        return;
      }

      // 3.全量提交判断：
      //  Juage(params);
      this.sendSavePost(params);
    },

    doBack () {
      this.$dialog.close(this.dialogId);
    },

    // 封装发送后台的逻辑，保存，暂存通用的方法
    sendSavePost (params) {
      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // url: YuXPUtil.getTopWindow().backend.cmisBiz + '/api/iqpwriteoffapp/update',
        url: this.$backend.cmisBiz + '/api/lmtgrpapp/save',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '保存成功', 200, 200, () => {
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
    },

    Juage (params) {
      const zzz = JSON.stringify(this.$xutils.toUpperCase(params, true));
      const saveFlag = true;
      const rtnData = {};

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        // url: YuXPUtil.getTopWindow().backend.cmisBiz + '/api/iqpwriteoffapp/update',
        url: this.$backend.cmisBiz + '/api/lmtgrpapp/juadestate',

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
    },

    sendUpdatePost (params) {
      const saveFlag = true;
      let rtnData = {};

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtgrpapp/update',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', ' 更新成功', null, null, () => {
              this.$dialog.close(this.dialogId);
            });

            // 关闭编辑界面：

            rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      return saveFlag;
    }
  }
};
</script>
