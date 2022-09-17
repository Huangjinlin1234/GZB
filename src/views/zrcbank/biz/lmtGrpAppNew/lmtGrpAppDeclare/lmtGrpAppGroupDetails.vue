<template>
  <!--
    @created by 屈文
    @description 集团客户授信明细
  -->
  <div>
    <yu-xform ref="refForm" label-width="100px" v-model="formdata" disabled>
      <yu-panel title="授信成员信息" :hideFilter="false" :collapseHide="false">
        <yu-xtable ref="refTable" row-number :data="lmtMemberList" request-type="POST" selection-type="checkbox" :pageable="false">
          <yu-xtable-column label="主键" prop="pkId" sortable hide-column></yu-xtable-column>
          <yu-xtable-column label="单一流水号" prop="singleSerno" hide-column></yu-xtable-column>
          <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
          <yu-xtable-column label="敞口额度合计（元）" prop="openLmtAmt"></yu-xtable-column>
          <yu-xtable-column label="低风险额度合计（元）" prop="lowRiskLmtAmt"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
          <yu-xtable-column label="客户经理提交状态" prop="managerIdSubmitStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          <yu-xtable-column label="是否参与本次申报" prop="isPrtcptCurtDeclare" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column label="授信额度是否可调剂" prop="isAdjustFlag" ctype="select" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column label="操作">
            <template slot-scope="scope">
              <a class="underline" @click="isAdjustFlagSave(scope.row)" :hidden="isShowBtn">保存</a>
              <a class="underline" @click="viewFn(scope.row)">查看</a>
              <a class="underline" @click="cancelFn(scope.row)" :hidden="isShowBtn">退回</a>
            </template>
          </yu-xtable-column>
        </yu-xtable>
        <yu-form-buttons align="left">
          <yu-button type="primary" @click="adjustSet" :hidden="isShowBtn">成员额度调剂设定</yu-button>
        </yu-form-buttons>
      </yu-panel>
      <yu-panel title="授信分项明细" :hideFilter="false" :collapseHide="false">
        <yu-xtable :data="lmtAppSubList" style="width: 100%;margin-bottom: 20px;" row-key="subPrdSerno" border :tree-props="{children: 'childrenLmtGrpAppSubDtoList', hasChildren: 'hasChildren'}" :pageable="false">
          <yu-xtable-column prop="cusName" label="所属成员名称" sortable width="220"></yu-xtable-column>
          <yu-xtable-column prop="subPrdSerno" label="授信分项流水号" sortable width="200">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewSubOrPrd(scope.row)">{{ scope.row.subPrdSerno }}</a>
            </template>
          </yu-xtable-column>
          <yu-xtable-column prop="lmtBizTypeName" label="授信品种" sortable width="180"></yu-xtable-column>
          <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column prop="lmtAmt" label="授信额度（元）"></yu-xtable-column>
          <yu-xtable-column prop="lmtTerm" label="授信期限（月）" ></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-xform>
    <!--<yu-form-buttons align="center">
      <yu-button type="primary" @click="tempSave">暂存</yu-button>
      <yu-button type="primary" @click="commit">提交 </yu-button>
      <yu-button type="primary" @click="back">返回</yu-button>
    </yu-form-buttons>-->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisibleAdjust" width="1200px" height="400px">
      <yu-xtable ref="lmtAdjustSet" row-number :data="adjustLmtList" condition-key="condition" selection-type="radio" request-type="POST">
        <yu-xtable-column label="主键" prop="pkId" sortable hide-column></yu-xtable-column>
        <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="敞口额度（元）" prop="openLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="调剂后敞口额度（元）" prop="adjustOpenLmtAmt" ctype="input"></yu-xtable-column>
        <yu-xtable-column label="低风险额度（元）" prop="lowRiskLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="调剂后低风险额度（元）" prop="adjustLowRiskLmtAmt" ctype="input"></yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="confirm" :hidden="isShowBtn">确定</yu-button>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_GUAR_WAY,STD_ZB_CUS_TYP,STD_ZB_APPR_STATUS');
// import { sessionStore } from 'xy-utils';
export default {
  data: function () {
    return {
      lmtMemberList: [],
      lmtAppSubList: [],
      adjustLmtList: [],
      expandCollapseName: ['base'],
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          type: 'date',
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }
      ],
      dialogVisibleAdjust: false,
      isShowBtn: false,
      grpSerno: ''
    };
  },

  mounted () {
    var _this = this;
    let data = {};
    var grpSerno = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      grpSerno = data.bizId;
      _this.isShowBtn = true;
      _this.grpSerno = grpSerno;
    } else {
      data = _this.$route.meta.params;
      grpSerno = data.grpSerno;
      _this.grpSerno = grpSerno;
      if (data.op == 'VIEW') {
        _this.isShowBtn = true;
      }
    }
    // 初始化授信分项明细列表
    _this.initSubAndPrdList(grpSerno);
    // 初始化授信成员信息列表
    _this.initMemberList(grpSerno);
  },

  methods: {
    /**
     *通过分项或产品流水号查看对应详情
     */
    viewSubOrPrd: function (data) {
      var _this = this;
      if (data.isRevolvLimit != '1' && data.isRevolvLimit != '0') {
        _this.viewSub(data);
      } else {
        var json = {};
        json['op'] = 'VIEW';
        json['subPrdSerno'] = data.subPrdSerno;
        json['model_group_no'] = 'CMG000700';
        this.$dialog.open(
          '单一客户授信申报',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          1600,
          800,
          json,
          null,
          true,
          true
        );
      }
    },
    /**
      *查看分项信息
      */
    viewSub: function (data) {
      data['model_group_no'] = 'CMG000696';
      data['op'] = 'VIEW';
      data['subSerno'] = data.subPrdSerno;
      data['disAble'] = true;
      data['disAble'] = true;
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1600,
        800,
        data,
        null,
        true,
        true
      );
    },
    // 授信分项明细列表
    initSubAndPrdList: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappsubprd/querylmtgrpappsubsumbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          _this.lmtAppSubList = response.data;
        }
      });
    },
    // 客户成员列表信息
    initMemberList: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/querylmtgrpmemrelbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          _this.lmtMemberList = response.data;
        }
      });
    },

    // 授信额度是否可调剂 保存
    isAdjustFlagSave (data) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/update',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            // 保存成功后 不需任何处理
            _this.$message('保存成功');
          } else {
            _this.$message('保存失败');
            return;
          }
        }
      });
    },

    // 成员额度调剂设定
    adjustSet: function () {
      var _this = this;
      var jsoPar = _this.$refs.refTable.selections;
      var grpSerno = _this.getFactory().contextData.grpSerno;
      // 成员额度是否可调剂设定  判断
      let num = 0;
      var cusIds = '';
      jsoPar.forEach(item => {
        if (item.isAdjustFlag == '1') {
          num = num + 1;
          cusIds = cusIds + item.cusId + ',';
        }
      });
      if (num < 2) {
        _this.$message({
          message: '请先选择至少两条可调剂的数据',
          type: 'warning'
        });
        return;
      }

      let params = {
        cusIds: cusIds.substring(0, cusIds.length - 1),
        grpSerno: grpSerno
      };

      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpsubprdadjustrel/createlmtgrpsubprdadjustrellistinfo',
        data: params,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.initDialogData(grpSerno);
          } else {
            _this.$message(response.message);
            return;
          }
        }
      });
    },

    // 跳转成员额度调剂设定
    initDialogData: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpsubprdadjustrel/querylmtgrpsubprdadjustrelbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.dialogVisibleAdjust = true;
            _this.adjustLmtList = response.data;
          } else {
            return;
          }
        }
      });
    },

    /**
      *查看分项信息
      */
    viewFn: function (data) {
      // data['model_group_no'] = 'CMG000702';
      // data['op'] = 'VIEW';
      // data['serno'] = data.singleSerno;
      // this.$dialog.open(
      //   '',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1400,
      //   800,
      //   data,
      //   null,
      //   true,
      //   true
      // );
      var _this = this;
      var ogrigiLmtSerno = '';
      var topOutsystemCode = '';
      var params = {
        serno: data.singleSerno
      };
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: params,
        callback: function (code, message, response) {
          ogrigiLmtSerno = response.data.ogrigiLmtSerno;
          if (response.data.lmtType == '05') {
            topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;SXFYSQZL;SXFYDBZL;XD_FZHYXCL;ZHSXPF';
          } else if (response.data.lmtType == '02') {
            topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;SXBGJBZL;XD_FZHYXCL;ZHSXPF';
          } else {
            topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;XD_FZHYXCL;ZHSXPF';
          }
        }
      });
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: data.pkId,
        title: '成员客户授信申报',
        data: {
          model_group_no: 'CMG000702',
          pk_id: data.pkId,
          scene: '01',
          op: 'VIEW',
          serno: data.singleSerno,
          period: '01',
          biz_serno: data.singleSerno,
          cusId: data.cusId,
          borrowerCusId: data.cusId,
          borrowerCusName: data.cusName,
          ogrigiLmtSerno: ogrigiLmtSerno,
          topOutsystemCode: topOutsystemCode
        }
      });
    },

    // 退回
    cancelFn: function (data) {
      var _this = this;
      if (data.managerIdSubmitStatus == null || data.managerIdSubmitStatus == '') {
        _this.$message('客户经理提交状态未识别!');
        return;
      }
      if (data.isPrtcptCurtDeclare != '0' && data.managerIdSubmitStatus != '997') {
        _this.$message('当前数据状态不可以进行退回操作!');
        return;
      }

      // var pkID = data.pkId;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/returnbacklmtgrpappsingle',
        data: data.pkId,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('退回成功');
            _this.initMemberList(_this.grpSerno);
          } else {
            _this.$message('退回失败');
            return;
          }
        }
      });
    },

    // 确定
    confirm: function () {
      var _this = this;
      var data = _this.$refs.lmtAdjustSet.tabledata;
      if (data.length == 0) {
        _this.$message('列表无数据,无需调剂!');
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpsubprdadjustrel/updateAllListData',
        data: {lmtGrpSubPrdAdjustRel: data},
        callback: function (code, message, response) {
          if (response.code == '0000' || response.code == '0') {
            _this.$message('调剂成功');
            _this.dialogVisibleAdjust = false;
          } else {
            _this.$message('调剂失败');
            return;
          }
        }
      });
    },

    // 返回上一页面
    back: function () {
      this.getFactory().back();
    }
  }
};
</script>
