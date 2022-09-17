<template>
<div>
  <d1-billlist ref="d1_BillList"></d1-billlist>
    <yufpNwfInit ref="yufpNwfInit"></yufpNwfInit>
</div>

</template>
<script>
import d1Billlist from "./guarEvalBatchRevalAppList_d1_BillList.vue";
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: { d1Billlist, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  provide() {
    return {
      addTask: this.addTask,
      doView: this.doView,
      submit: this.submit,
    }
  },
  data() {
    return {
      d1_BillList: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_APP_ST");
    this.AfterInit();
  },
  methods: {
    /**
     *  批量重估申请信息--业务参数配置列表
     */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryData();
    },

    //新增任务
    addTask() {
      //新增重估任务页面
      this.$dialog.open("", "evalmanage/guarReevalApplyList/evalBatchImportIndex", -1, -1, null, () => {
        this.reloadTableFunc();
      });
    },

    doView() {
      //查看详情
      let _this = this;
      let selections = _this.d1_BillList.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let jsoPar = {};
      this.$xutils.clone(selections[0], jsoPar)//克隆数据
      jsoPar["model_group_no"] = "CMG000157"; //押品批量重估申请
      jsoPar["op"] = "VIEW";
      // 绘制修改页面
      this.$dialog.open("押品批量重估(查看)", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, jsoPar, null);
    },

    //流程提交
    submit() {
      let _this = this;
      let selections = _this.d1_BillList.$refs.refTable.selections;
      if (!selections.length) {
        _this.$message.warning(this.$store.state.oauth.messageObj.CM00001);
        return;
      }
      let jsoPar = {};
      this.$xutils.clone(selections[0], jsoPar)//克隆数据
      // 申请流水号
      let evalAppSerno = jsoPar.batchSerno;
      let loginUser = this.$xutils.getLoginUserInfo();

      //设置流程提交参数
      let rsPars = {
        systemId: "cmis",
        orgId: loginUser.orgCode,
        bizId: evalAppSerno,
        bizType: "WF_BATCH_REVAL",
        userId: loginUser.loginCode,
        bizUserName: jsoPar.inputName,
        bizUserId: jsoPar.inputId,
        callback: _this.afterCommitCallBack
      };
      //流程提交
      this.$refs.yufpNwfInit.wfInit(rsPars);
      //this.$xutils.wfInit(rsPars, afterCommitCallBack);
      //                  } else {
      //                      YuXP.showMsgBox('提示：', '存在项目信息未保存，不允许提交！', '500', '200', null);
      //                      return;
      //                  }
      //              }
      //          });
    },

    //流程提交成功的回调方法
    afterCommitCallBack() {
      //刷新列表页面
      this.d1_BillList.queryData();
    },

    recallOnBillListChange() {
      //重载列表数据
      this.reloadTableFunc();
    },

    //重新加载列表数据
    reloadTableFunc() {
      this.d1_BillList.queryData();
    }
  }
};
</script>
