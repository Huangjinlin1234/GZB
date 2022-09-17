<template>
  <div>
    <yu-panel title="" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata">
        <yu-xform-group :column="2">
          <yu-xform-item label="合同编号" ctype="input" name="contNo"></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="select" name="bizType" data-code="STD_BUSI_TYPE" :datacode-filter="datacodeFilterFn"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" request-type="POST" :base-params="baseParams" :pageable="true">
        <yu-xtable-column label="申请流水号" prop="serno" width="100" hide-column></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" width="100" data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="100"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" width="100" data-code="STD_DISCCONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同币种" prop="curType" width="100" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="bizType" width="100" data-code="STD_BUSI_TYPE"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="contStartDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="contEndDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="批复编号" prop="replyNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerId" width="100"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrId" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onContinue">下一步</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_CONT_STATUS,STD_CONT_TYPE,STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_BUSI_TYPE,STD_DISCCONT_TYPE');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/ctrloancont/selectimagectrloan',
      baseParams: {},
      topOutsystemCode: ''
    };
  },
  created () {
    this.baseParams = {condition: {ctrBeginFlag: '0'}};
  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '05') {
          return false;
        }
        return true;
      });
    },
    // 下一步
    onContinue () {
      var _this = this;
      var op = 'ADD';
      // console.log(_this);
      const selPars = _this.$refs.refTable.selections;
      if (selPars.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      // 不支持多条数据
      if (selPars.length != 1) {
        _this.$message('仅支持操作单条数据！');
        return;
      }

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrcontimageauditapp/savectrLoancontdtodata',
        data: selPars[0]
      }).then(({ code, message, data }) => {
        if (code == 0) {
          if (data == true) {
            this.$message({ message: '操作成功', type: 'success' });
            this.$dialog.close(this.dialogId);
            this.goToDetailFn(selPars[0], op);
          } else {
            this.$message({ message: message, type: 'warning' });
          }
        }
      });
    },
    // 根据合同业务类型设置影像参数
    setImageParam (bizType) {
      let _this = this;
      if (bizType == '01') {
        _this.topOutsystemCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;';
      } else if (bizType == '02') {
        _this.topOutsystemCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;';
      } else if (bizType == '03') {
        _this.topOutsystemCode = 'DGYX;XDTXYWYX;';
      } else if (bizType == '04') {
        _this.topOutsystemCode = 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWMYRZ;GJYWMYRZ;GJYWBH;GJYWDCCZ;GJYWSQSQT;';
      } else if (bizType == '06') {
        _this.topOutsystemCode = 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWMYRZ;GJYWDCCZ;GJYWSQSQT;';
      } else if (bizType == '07') {
        _this.topOutsystemCode = 'CDHPDY;CDHPZY;';
      } else if (bizType == '08') {
        _this.topOutsystemCode = 'GJYWHTJB;GJYWDY;GJYWZY;GJYWBZDB;GJYWBH;GJYWDCCZ;GJYWSQSQT;';
      } else if (bizType == '09') {
        _this.topOutsystemCode = 'WTDKCZJB;WTDKDYHT;WTDKZYHT;WTDKBZDBHT;WTDKDCCZ;';
      }
    },
    // 调用模板工厂配置的详情界面
    goToDetailFn (data, op) {
      debugger;
      var _this = this;
      _this.setImageParam(data.bizType);
      data['model_group_no'] = 'CMG000712';
      data['op'] = op;
      data['topOutsystemCode'] = this.topOutsystemCode;
      data['imageParams'] = {
        contid: data.contNo,
        businessid: data.serno,
        docid: data.serno
      };
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$nextTick(function () {
        // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', 1500, 800, data, true, true);
        this.$router.addTab({
          name: path,
          key: data.contNo + data.op,
          title: '合同信息',
          data: data
        });
      });
    },
    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
