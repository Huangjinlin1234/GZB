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
          <yu-xform-item label="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="custom">
            <yu-date-picker label="登记日期" type="daterange" v-model="searchFormdata.inputDate"></yu-date-picker>
          </yu-xform-item>
          <yu-xform-item label="合同状态" name="contStatus" ctype="select" data-code="STD_CONT_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop show-length="5">
        <yu-button type="primary" @click="view" v-if="checkCtrl('view')">查看</yu-button>
        <yu-button type="primary" @click="lcgjLook" v-if="checkCtrl('lcgjLook')">流程轨迹</yu-button>
      </yu-button-drop>
  </yu-tabs>

    <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="params" selection-type="radio" request-type="POST" :default-load="true">
        <yu-xtable-column label="申请流水号" prop="iqpSerno" width="120" hide-column></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" width="120" data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column label="合同模式" prop="contMode" width="120" data-code="STD_CONT_MODE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" width="120" data-code="STD_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt" width="120"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" width="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" width="120" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>


  </div>


</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_CONT_TYPE,STD_CONT_MODE');

export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/ctrloancont/selectbymodel',
      formdata: {},
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
      iscontStatus: false,
      params: { condition: {
        oprType: '01',
        belgLine: '02'},
      sort: 'input_date desc'} // 申请列表固定查询条件

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

      let inputId = _this.$refs.refTable.selections[0].inputId;
      if (_this.loginCode != inputId) {
        _this.$message({ message: '只能对客户经理是自己本人的合同进行修改', type: 'warning' });
        return;
      }
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: '1',
        title: '业务申请',
        data: {
          model_group_no: 'CMG000022',
          contNo: _this.$refs.refTable.selections[0].contNo,
          cnContNo: _this.$refs.refTable.selections[0].cnContNo,
          iqpSerno: _this.$refs.refTable.selections[0].iqpSerno,
          serno: _this.$refs.refTable.selections[0].iqpSerno,
          contMode: _this.$refs.refTable.selections[0].contMode,
          guarWay: _this.$refs.refTable.selections[0].guarWay,
          oprType: '02' // 修改
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
          serno: _this.$refs.refTable.selections[0].contNo,
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
    },

    // 流程轨迹查看
    lcgjLook () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      this.$dialog.open(
        '流程轨迹查看',
        'xwmanage/common/splsty',
        -1,
        -1,
        {lsh: selectionsAry[0].contNo}

      );
    }


  }
};
</script>
