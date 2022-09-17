<template>
<div>
  <d1-billcard ref="d1_BillCard" :operate="operate"></d1-billcard>
  <yufp-nwf-init ref="yufpNwfInit"></yufp-nwf-init>
</div>
</template>
<script>
import d1Billcard from './cusYXDLoanListAppUpdate_d1_BillCard.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {d1Billcard, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      isDialogOpen: false,
      operate: ''
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 刘愿 优享贷客户名单申请修改
       *
       */
    AfterInit () {
      var _this = this;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.operate = this.getFactory().contextData.opType;
      let serno = this.getFactory().contextData.serno;
      if (serno == null || serno == '') {
        serno = (this.pageParams && this.pageParams.serno) || (this.getFactory().contextData.instanceInfo && this.getFactory().contextData.instanceInfo.bizId);
        this.isDialogOpen = true;
      }
      if (this.operate == 'add') {

        let cusId = this.getFactory().contextData.cusId;
        this.$xutils.request({
          // 同步请求
          async: false,
          // 新增
          url: this.$backend.cmisCus + '/api/cusindiv/cusinit/' + cusId,
          success: (response, status, xhr) => {
            if (response.code === '0') {
              this.getFactory().contextData.workUnit = response.data.workunit;
              this.getFactory().contextData.edu = response.data.edu;
              this.getFactory().contextData.yearn = response.data.yearn;
              this.getFactory().contextData.resiAddr = response.data.resiaddr;
              this.getFactory().contextData.sex = response.data.sex;
              this.getFactory().contextData.marStatus = response.data.marstatus;
              this.getFactory().contextData.mobileNo = response.data.mobileno;
              this.getFactory().contextData.duty = response.data.duty;
              this.getFactory().contextData.resiYears = response.data.resiyears;
            } else {
              _this.$message({message: response.message});
            }
          }
        });
        this.d1_BillCard.execBillCardDefaultValueFormula();
        this.d1_BillCard.setBillCardValue(this.getFactory().contextData);
      }else{
        if (this.operate == 'view') {
          this.d1_BillCard.changeStatus();
        }
        this.d1_BillCard.queryDataByCondition({serno:serno});
      }
    },

    // 保存，提交通用的方法
    commonSave (func) {
      var _this = this;
      var dataTable = this.d1_BillCard.formdata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCus + '/api/cuslstyxdjbxxapp/tempSave',
        data: dataTable,
        callback: function (code, message, response) {
          if (code === '0') {
            if (response.data == '1') {
              func && func();
            } else {
              _this.$message('暂存失败!');
            }
          } else {
            this.$message({
              message: message,
              type: 'error'
            });
          }
        }
      });
    },

    // 暂存
    doSave () {
      this.commonSave(() => {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 200, () => {
          // 当前页面中的数据放入frameContext中，后续子页面可以使用
          this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());
        });
      });
    },


    // 提交按钮
    doSubmit () {
      // 必输校验
      let validateFlag = this.d1_BillCard.validateBillCardValue();
      if (!validateFlag) {
        return;
      }

      this.commonSave(() => {
        // 刷新列表页面
        this.afterSaveCommit();
      })
      this.doBack ()
      ;
    },

    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      var _this = this;
      var dataTable = this.d1_BillCard.formdata;
      var startdto = {};
      const loginUser = _this.$xutils.getLoginUserInfo();
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.code;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'KH020';
      startdto.bizId = dataTable.serno;
      startdto.bizUserName = dataTable.cusName;
      startdto.bizUserId = dataTable.cusId;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 返回
    doBack () {
      if (this.isDialogOpen) {
        this.$dialog.close(this.dialogId);
      } else {
        this.getFactory().back();
      }
    }
  }
};
</script>
