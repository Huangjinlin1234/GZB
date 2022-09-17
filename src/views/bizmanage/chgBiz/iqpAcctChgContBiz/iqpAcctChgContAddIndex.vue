<template>
  <div>
    <yu-panel title=""  panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="合同编号" ctype="yu-xloan-cont" placeholder="合同编号" name="contNo"  @select-fn="commonSelectFn" :mapping="{'contNo':'contNo'}" width="730" height="480" :parms="{'belgLine':'bl300','oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-xproduct" placeholder="产品编号" name="prdId"  @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" :parms="{'belgLine':'bl300','cusState':'20','oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="select" data-code="STD_ZB_CONT_TYP" placeholder="合同状态" name="contStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="中文合同编号" prop="cnContNo"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="合同余额" prop="contBalance"></yu-xtable-column>
        <yu-xtable-column label="合同起始日期" prop="contStartDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日期" prop="contEndDate"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" width="50" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" width="50" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="主办人" prop="managerId" width="50"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doNextStep">下一步</yu-button>
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_ZB_CONT_TYP');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      pkField: 'iqpSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/ctrloancont/',
      baseParams: {condition: {contStatus: '200'}},
      deleteUrl: this.$backend.cmisBiz + '/api/ctrloancont/delete/',
      searchFormdata: {}
    };
  },
  mounted () {
  },
  methods: {

    doNextStep () {
      // 创建要保存的表单
      // 选择合同提示
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      jsoPar = yufp.clone(this.$refs.refTable.selections[0], {});
      this.$refs.refTable.remoteData({contNo: jsoPar.contNo});
      // 非生效合同不允许合同帐号变更(根据实际逻辑此处不需要加，因为列表展示只能展示有效的合同)
      if (jsoPar.contStatus != '200') {
        this.$xutils.showMsgBox('提示', '该合同不允许进行账号变更');
        return;
      }
      // 获取当前登录信息
      const iqpSerno = this.$xutils.getSEQWithParamFromServer('IQP_ACCT_SERNO');

      // 插入数据
      const jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      jsoPar.managerId = jsoUser['loginCode'];// 主办人
      jsoPar.managerBrId = jsoUser['orgCode'];// 主办机构
      jsoPar.inputId = jsoUser['loginCode'];// 登记人
      jsoPar.inputBrId = jsoUser['orgCode'];// 登记机构
      jsoPar.updId = jsoUser['loginCode'];// 最后修改人
      jsoPar.updBrId = jsoUser['orgCode'];// 最后修改机构
      jsoPar.approveStatus = '000';// 审批状态 000--待发起
      jsoPar.iqpSerno = iqpSerno;// 业务流水号
      jsoPar.oprType = '01';// 操作类型 01--新增
      jsoPar.inputDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());// 登记日期
      jsoPar.updDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());// 最后修改日期
      this.$xutils.request({
        // 新增
        url: this.$backend.cmisBiz + '/api/iqpacctchgcont/insertIqpAcctChgCont',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),
        success: (response, status, xhr) => {
          if (response.data) {
            jsoPar['model_group_no'] = 'IQP_ACCT_CHG_CONT';
            jsoPar['op'] = 'EDIT';
            this.$dialog.open(
              '合同帐号变更申请-修改',
              'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              -1,
              -1,
              jsoPar,
              null,
              true,
              true
            );
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', '错误信息：' + result.responseJSON.message); // 弹出提示
        }
      });

      // var jsopar1 = {'templetcode': 'iqp_acct_chg_cont_list', 'ds': 'cmis_biz', 'carddata': jsoPar};
      // YuXP.doClassMethodCall2('yuxpservice', 'cn.com.yusys.yusp.yubao.base.service3.YuBaoBillDMO', 'insertBillCardData', jsopar1,doReturnFn); // 保存数据
    },

    // 保存成功后回调
    doReturnFn () {
      let jsoPar = {};
      jsoPar['model_group_no'] = 'IQP_ACCT_CHG_CONT';// 合同帐号变更申请-修改模板组
      jsoPar['op'] = 'EDIT';
      // 绘制修改页面
      this.$dialog.open(
        '合同帐号变更申请-修改',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        '1200',
        '800',
        jsoPar,
        null,
        true,
        true
      );// 回调函数close原本就没定义，所以传null
    },
    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.searchFormdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
