<template>
  <!--
    @created by 合同申请列表
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->

  <div>
    <yu-panel title="" :hideFilter="false" :collapseHide="false">
  <yu-tabs @tab-click="tabClick" value="1">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="100px">
        <yu-xform-group :column="2">
          <yu-xform-item label="申请流水号" name="iqpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="custom">
            <yu-date-picker label="登记日期" type="daterange" v-model="searchFormdata.inputDate"></yu-date-picker>
          </yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop show-length="5">
        <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('modifyFn')">修改</yu-button>
        <yu-button type="primary" @click="view" v-if="checkCtrl('view')">查看</yu-button>
      </yu-button-drop>
  </yu-tabs>

    <yu-xtable ref="refTable" :default-sort="{prop:'contNo',order:'descending'}" condition-key="condition" row-number :data-url="dataUrl" :base-params="params" selection-type="radio" request-type="POST">
        <yu-xtable-column label="申请流水号" prop="iqpSerno" width="120" hide-column></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="200" sortable></yu-xtable-column>
        <yu-xtable-column label="合同模式" prop="contMode" width="120" data-code="STD_CONT_MODE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="证件编号" prop="certCode" width="200"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" width="120" data-code="STD_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt" width="120"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay"  data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="是否在线抵押" prop="isOlPld" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>


  </div>


</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_CONT_TYPE,STD_CONT_MODE,STD_ZB_YES_NO,STD_ZB_APPR_STATUS');

export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/ctrloancont/retail/qyeryCtrLoanContList',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      value6: '',
      loginCode: null,
      params: { condition: {flag: '1', oprType: '01', belgLine: '02'}}, // 申请列表固定查询条件
      iscontStatus: false
    };
  },

  mounted () {
    const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
    this.loginCode = userInfo.loginCode;
  },

  methods: {

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      let managerId = _this.$refs.refTable.selections[0].managerId;
      if (_this.loginCode != managerId) {
        _this.$message({ message: '只能对客户经理是自己本人的合同进行修改', type: 'warning' });
        return;
      }
      var replyid;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoretail',
        data: {iqpSerno: _this.$refs.refTable.selections[0].iqpSerno},
        callback: function (code, message, response) {
          if (response.code == '0') {
            replyid = response.data.replyNo;
          }
        }
      });


      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '合同申请',
        data: {
          model_group_no: 'CMG000022',
          contNo: _this.$refs.refTable.selections[0].contNo,
          iqpSerno: _this.$refs.refTable.selections[0].iqpSerno,
          contMode: _this.$refs.refTable.selections[0].contMode,
          approveStatus: _this.$refs.refTable.selections[0].approveStatus,
          isOlPld: _this.$refs.refTable.selections[0].isOlPld,
          PageType: 'UPDATE',
          prdId: _this.$refs.refTable.selections[0].prdId,


          // 担保传参
          contType: _this.$refs.refTable.selections[0].contType,
          belgLine: '02',
          guarWay: _this.$refs.refTable.selections[0].guarWay,
          cusId: _this.$refs.refTable.selections[0].cusName,
          cusName: _this.$refs.refTable.selections[0].cusName,
          replyNo: replyid,
          isOnlinePld: _this.$refs.refTable.selections[0].isOlPld,
          contAmt: _this.$refs.refTable.selections[0].contAmt,
          contTerm: _this.$refs.refTable.selections[0].appTerm,
          startDate: _this.$refs.refTable.selections[0].contStartDate,
          endDate: _this.$refs.refTable.selections[0].contEndDate,

          // 征信传参
          period: '02',
          borrowerCusId: _this.$refs.refTable.selections[0].cusId,
          borrowerCusName: _this.$refs.refTable.selections[0].cusName,
          borrowerCertCode: _this.$refs.refTable.selections[0].certCode,
          oprType: '02', // 修改
          op: 'UPDATE',
          topOutsystemCode: 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;'


        }
      });
      // _this.$router.addTab({// 修改跳转
      //   name: 'zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrLoanContEdit',
      //   key: _this.$refs.refTable.selections[0].contNo,
      //   title: '合同申请修改',
      //   data: {
      //     contNo: _this.$refs.refTable.selections[0].contNo,
      //     cnContNo: _this.$refs.refTable.selections[0].cnContNo,
      //     iqpSerno: _this.$refs.refTable.selections[0].iqpSerno,
      //     serno: _this.$refs.refTable.selections[0].iqpSerno,
      //     contMode: _this.$refs.refTable.selections[0].contMode,
      //     guarWay: _this.$refs.refTable.selections[0].guarWay,
      //     oprType: '02' // 修改
      //   }
      // });
    },

    // 刷新页面数据
    refresh () {
      this.$refs.refTable.remoteData();
    },

    /**
     * 查看
     */
    view: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var replyid;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoretail',
        data: {iqpSerno: _this.$refs.refTable.selections[0].iqpSerno},
        callback: function (code, message, response) {
          if (response.code == '0') {
            replyid = response.data.replyNo;
          }
        }
      });


      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '合同申请',
        data: {
          model_group_no: 'CMG000022',
          contNo: _this.$refs.refTable.selections[0].contNo,
          iqpSerno: _this.$refs.refTable.selections[0].iqpSerno,
          PageType: 'LOOK',
          prdId: _this.$refs.refTable.selections[0].prdId,


          // 担保传参
          contType: _this.$refs.refTable.selections[0].contType,
          belgLine: '02',
          guarWay: _this.$refs.refTable.selections[0].guarWay,
          cusId: _this.$refs.refTable.selections[0].cusName,
          cusName: _this.$refs.refTable.selections[0].cusName,
          replyNo: replyid,
          contAmt: _this.$refs.refTable.selections[0].contAmt,
          contTerm: _this.$refs.refTable.selections[0].appTerm,
          startDate: _this.$refs.refTable.selections[0].contStartDate,
          endDate: _this.$refs.refTable.selections[0].contEndDate,

          // 征信传参
          period: '02',
          borrowerCusId: _this.$refs.refTable.selections[0].cusId,
          borrowerCusName: _this.$refs.refTable.selections[0].cusName,
          borrowerCertCode: _this.$refs.refTable.selections[0].certCode,
          oprType: '03', // 查看
          op: 'VIEW',
          topOutsystemCode: 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;'
        },
        afterTabClose: () => {
          _this.refresh();
        }
      });
    }


  }
};
</script>
