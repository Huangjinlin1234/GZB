<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata">
        <yu-xform-group :column="3">
          <yu-xform-item label="展期协议编号" ctype="input" placeholder="展期协议编号" name="extCtrNo"></yu-xform-item>
          <yu-xform-item label="展期申请流水号" ctype="input" placeholder="展期申请流水号" name="extSerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="oldContNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="" name="contAmt" placeholder="合同金额"></yu-xform-item>
          <yu-xform-item label="合同起始日" ctype="input" placeholder="合同起始日" name="contStartDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同到期日" ctype="input" placeholder="合同到期日" name="contEndDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="贷款合同类型" ctype="select" name="contType" data-code="STD_ZB_CONT_TYPE" placeholder="贷款合同类型"></yu-xform-item>
          <yu-xform-item label="是否使用授信额度" ctype="input" placeholder="是否使用授信额度" name="isUtilLmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="signDate" value-format="yyyy-MM-dd" placeholder="纸质合同签订日期" @change="dataChange"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" name="remark" placeholder="备注" colspan="24"></yu-xform-item>
          <yu-xform-item label="撤销日期" ctype="input" placeholder="撤销日期" name="logoutDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="展期协议状态" ctype="select" name="extCtrStatus" disabled hidden data-code=" std_zb_ct" placeholder="展期协议状态"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
   <yu-panel title="展期业务协议" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="展期协议号" ctype="input" placeholder="展期协议号" name="extCtrNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doSign" @click="doSign">签订</yu-button>
          <yu-button ref="btn_doInvalid" @click="doInvalid">作废</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'a.extCtrStatus':'001'}" :default-load="true">
        <yu-xtable-column label="展期申请流水号" prop="extSerno"></yu-xtable-column>
        <yu-xtable-column label="展期协议号" prop="extCtrNo"></yu-xtable-column>
        <yu-xtable-column label="原借据编号" prop="oldBillNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="原币种" prop="fountCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="展期金额" prop="extAmt"></yu-xtable-column>
        <yu-xtable-column label="展期到期日期" prop="extEndDate"></yu-xtable-column>
        <yu-xtable-column label="展期执行利率（年）" prop="extRealityIrY"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="展期协议状态" prop="extCtrStatus" width="100" data-code="STD_ZB_CTR_ST"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      searchFormdata: {},
      updateUrl: this.$backend.cmisBiz + '/api/ctrcontext/update',
      addUrl: this.$backend.cmisBiz + '/api/ctrcontext/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      dialogTitle: '新增',
      dialogVisible: false,
      dataUrl: this.$backend.cmisBiz + '/api/ctrloanext/',
      baseParams: {}

    };
  },
  mounted () {
    this.setCardValue();
  },
  methods: {
    // 初始化数据
    setCardValue () {},
    // 监听事件
    dataChange (oldValue, newValue) {
      // 签订日期校验
      const date = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      const indivDtOfBirth = this.formdata.signDate;
      if (date < indivDtOfBirth) {
        this.$xutils.showMsgBox('提示', '签订日期不能晚于当前日期');
        return;
      }
    },
    // 保存
    doSave () {
      const data = this.formdata;
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/iqpcontext/save',
        data: data,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data > 0) {
              this.$xutils.showMsgBox('提示', '保存成功');
            } else {
              this.$xutils.showMsgBox('提示', '保存失败');
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            // bol = false;
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          // bol = false;
        }
      });
    },

    // 提交
    submit () {
      var validate = false;
      this.$refs.refForm(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      this.doSave();
    },

    // 返回
    back () {
      this.getFactory().back();
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
    doSign: function () {

    },
    doInvalid: function () {

    },
    doView: function () {

    }
  }
};
</script>
