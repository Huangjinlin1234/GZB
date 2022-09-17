<template>
  <div>
    <yu-panel title="合同生效列表">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata">
        <yu-xform-group :column="3">
          <yu-xform-item label="合同编号" ctype="input" name="contNo"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="{ condition: { contStatus: '200',prdId:'022028',isOnlineDraw:'1',managerId:this.$xutils.getLoginUserInfo().loginCode} }" request-type="POST" selection-type="radio">
        <yu-xtable-column label="申请流水号" prop="iqpSerno" width="120" hide-column></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" width="120" data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" width="120"   data-code="STD_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt" width="120"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" width="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" width="120" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onContinue">下一步</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CONT_TYP,STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_CONT_TYPE');

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/ctrloancont/'
    };
  },
  methods: {
    // 下一步
    onContinue () {
      var _this = this;
      // console.log(_this);
      const selPars = _this.$refs.refTable.selections;
      if (selPars.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      const loginUser = this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      if (selPars.guarWay == '10' && (orgType != '1' || orgType != '2' || orgType != '3')) {
        this.$message({ message: '本地抵押可以不做线上提款启用', type: 'warning' });
      }

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrcontimageauditapp/donextstep',
        data: selPars[0]
      }).then(({ code, message, data }) => {
        if (code == '0') {
          _this.$router.addTab({
            // 修改跳转
            name: 'bizmanage/ctrBiz/ctrContImageAppList/ctrLoanContEdit',
            key: data.contNo,
            title: '合同信息完善',
            data: {
              contNo: data.contNo,
              serno: data.serno,
              oprType: '02' // 修改
            }
          });
          _this.$dialog.close(this.dialogId);
        } else {
          _this.$message({ message: message, type: 'warning' });
        }
      });

      // if (selPars == null || selPars == "") {
      //   this.$xutils.showMsgBox("提示", "请选择一条数据", 350, 150);
      //   return;
      // }

      // if (selPars.chnl_sour == "15") {
      //   this.$xutils.showMsgBox("提示", "网银端借据不允许变更还款方式！", 350, 150);
      //   return;
      // }

      // // 获取当前登录信息
      // const userInfo = this.$xutils.getLoginUserInfo();

      // const iqpSerno = this.$xutils.getSEQWithParamFromServer("IQP_REPAY_SERNO");

      // const iqpRepayWayChg = {
      //   iqp_serno: iqpSerno,
      //   bill_no: selPars.billNo,
      //   input_id: userInfo.loginCode,
      //   input_br_id: userInfo.orgCode,
      //   input_date: this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date()),
      //   upd_id: userInfo.loginCode,
      //   upd_br_id: userInfo.orgCode,
      //   upd_date: this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date())
      // };

      // this.$xutils.request({
      //   // 同步请求
      //   async: false,

      //   // 新增
      //   url: this.$backend.cmisBiz + "/api/iqprepaywaychg/insertIqpRepayWayChgByBillNo",

      //   data: JSON.stringify(this.$xutils.toUpperCase(iqpRepayWayChg, true)),

      //   success: (response, status, xhr) => {
      //     if (response.data != null && response.data > 0) {
      //       iqpRepayWayChg["model_group_no"] = "CMG000033";
      //       iqpRepayWayChg["op"] = "EDIT";

      //       this.$dialog.open("还款方式变更申请", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, iqpRepayWayChg, null, true, true);
      //     } else {
      //       this.$xutils.showMsgBox("提示", response.message);
      //     }
      //   },

      //   error: (result, b) => {
      //     this.$xutils.showMsgBox("提示", "错误信息：" + result.responseJSON.message); // 弹出提示
      //   }
      // });
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
