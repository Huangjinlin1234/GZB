<template>
    <yu-xform ref="refForm" label-width="120px" v-model="formData" :disabled="formType != 'edit' ? true : false">
      <yu-panel title="固定资产贷款、项目贷款检查" panel-type="simple">
        <yu-xform-group>
          <yu-xform-item name="pkId" label="主键" :hidden="true"></yu-xform-item>
          <yu-xform-item name="taskNo" label="任务编号" :hidden="true"></yu-xform-item>
          <yu-xform-item name="isAcct" label="是否在我行开立专户" ctype="radio" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item name="acctExpl" label="专户说明" ctype="textarea" colspan="24" :rules="{required: isAcct, message: '必输项不允许为空'}"></yu-xform-item>
          <yu-xform-item name="acctNo" label="账号"></yu-xform-item>
          <yu-xform-item name="acctName" label="账户名称"></yu-xform-item>
          <yu-xform-item name="acctSeqNo" label="账户序号"></yu-xform-item>
          <yu-xform-item name="acctb" label="开户行"></yu-xform-item>
          <yu-xform-item name="totalAmt" label="项目预计总投入（万元）" rules="required"></yu-xform-item>
          <yu-xform-item name="otherAmt" label="他行贷款已投入（万元）" rules="required"></yu-xform-item>
          <yu-xform-item name="useAmt" label="项目实际累计总投入（万元）" rules="required"></yu-xform-item>
          <yu-xform-item name="localityAmt" label="借款人自有资金已投入（万元）" rules="required"></yu-xform-item>
          <yu-xform-item name="bankAmt" label="其中：我行贷款已投入（万元）" rules="required"></yu-xform-item>
          <yu-xform-item name="otherLocalityAmt" label="其中：借款人资本金已投入（万元）" rules="required"></yu-xform-item>
        </yu-xform-group>

        <yu-xtable ref="refTable" :data="tableData" :default-load="false" :pageable="false" :span-method="objectSpanMethod">
          <yu-xtable-column prop="stage" label="项目阶段"/>
          <yu-xtable-column prop="item" label="检查项目"/>
          <yu-xtable-column prop="option" label="选项">
            <template slot-scope="scope">
              <yu-xform-item :name="scope.row.optname" v-model="scope.row.option" ctype="radio" data-code="STD_PSP_YES_NO" :rules="{required: scope.row.option == scope.row.required, message: '必输项不允许为空'}" v-if="scope.row.optname=='isCompletion'||scope.row.optname=='isCertificate'"/>
              <yu-xform-item :name="scope.row.optname" v-model="scope.row.option" ctype="radio" data-code="STD_ZB_YES_NO" :rules="{required: scope.row.option == scope.row.required, message: '必输项不允许为空'}" v-else/>
            </template>
          </yu-xtable-column>
          <yu-xtable-column prop="description" label="说明">
            <template slot-scope="scope">
              <yu-xform-item :name="scope.row.desname" v-model="scope.row.description" ctype="textarea" :rules="{required: scope.row.option == scope.row.required, message: '必输项不允许为空'}"/>
            </template>
          </yu-xtable-column>
        </yu-xtable>
      </yu-panel>

    </yu-xform>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_PSP_YES_NO');
export default {
  props: {
    taskNo: String,
    cusId: String,
    formType: String
  },
  data: function () {
    return {
      updateUrl: backend.cmisPsp + '/api/psppropertycheck/update',
      queryUrl: backend.cmisPsp + '/api/psppropertycheck/',
      formData: { isAcct: '' },
      tableData: [],
      cusData: {}

    };
  },

  computed: {

    isAcct: function () {
      return this.formData.isAcct == '0';
    }
  },

  watch: {

    'formData.isAcct': function (val) {
      var _this = this;

      if (_this.cusId != '') {
        if (val == '1') {
          _this.$request({
            url: _this.$backend.cmisCus + '/api/cuscorp/queryCusCropDtoByCusId',
            method: 'post',
            data: _this.cusId
          }).then((response) => {
            if (response.code == '0') {
              yufp.clone(response.data, _this.cusData);
              // 账号
              _this.formData.acctNo = _this.cusData.basicDepAccNo;
              // 开户行
              _this.formData.acctb = _this.cusData.basicDepAccob;

              _this.$refs.refForm.setItemDisabled('acctNo', true);
              _this.$refs.refForm.setItemDisabled('acctb', true);
            }
          }).catch(() => {
            _this.$message({
              message: '请求失败'
            });
          });
          _this.$request({
            url: _this.$backend.cmisPsp + '/api/psppropertycheck/sendToIb1253',
            method: 'post',
            data: _this.formData.acctNo
          }).then((response) => {
            if (response.code == '0') {
              // 账户名称
              _this.formData.acctName = response.data.zhhuzwmc;
              // 账户序号
              _this.formData.acctSeqNo = response.data.zhaoxhao;
              _this.$refs.refForm.setItemDisabled('acctNo', true);
              _this.$refs.refForm.setItemDisabled('acctb', true);
            }
          }).catch(() => {
            _this.$message({
              message: '请求失败'
            });
          });
        } else {
          _this.formData.acctNo = '';
          _this.formData.acctb = '';
          _this.$refs.refForm.setItemDisabled('acctNo', false);
          _this.$refs.refForm.setItemDisabled('acctb', false);
        }
      }
    }
  },

  created: function () {
    var _this = this;

    this.$request({
      url: this.queryUrl,
      method: 'get',
      data: {condition: {taskNo: this.taskNo}}
    }).then((response) => {
      yufp.clone(response.data[0], _this.formData);
      // form数据转table
      _this.transForm2Table(_this.formData);
    }).catch(() => {
      _this.$message({
        message: '请求失败'
      });
    });
  },

  methods: {

    transForm2Table: function (formData) {
      this.tableData = [{
        stage: '项目建设阶段',
        item: '目前项目进度是否与可研报告一致',
        option: formData.isIdentical,
        optname: 'isIdentical',
        description: formData.identicalExpl,
        desname: 'identicalExpl',
        required: '0'
      }, {
        stage: '',
        item: '自筹资金是否能按期、足额到位',
        option: formData.isOntimeAmt,
        optname: 'isOntimeAmt',
        description: formData.ontimeAmtExpl,
        desname: 'ontimeAmtExpl',
        required: '0'
      }, {
        stage: '项目竣工验证阶段',
        item: '是否按时竣工',
        option: formData.isCompletion,
        optname: 'isCompletion',
        description: formData.completionExpl,
        desname: 'completionExpl',
        required: '0'
      }, {
        stage: '',
        item: '消防是否验收合格',
        option: formData.isCertificate,
        optname: 'isCertificate',
        description: formData.certificateExpl,
        desname: 'certificateExpl',
        required: '0'
      }, {
        stage: '',
        item: '实际投资与预期投资是否存在差异',
        option: formData.isDiscrepancy,
        optname: 'isDiscrepancy',
        description: formData.discrepancyExpl,
        desname: 'discrepancyExpl',
        required: '0'
      }, {
        stage: '项目投产阶段',
        item: '项目实际生产能力是否达到预期要求',
        option: formData.isArriveNeed,
        optname: 'isArriveNeed',
        description: formData.arriveNeedExpl,
        desname: 'arriveNeedExpl',
        required: '0'
      }, {
        stage: '',
        item: '产品质量是否有问题',
        option: formData.isQuality,
        optname: 'isQuality',
        description: formData.qualityExpl,
        desname: 'qualityExpl',
        required: '0'
      }, {
        stage: '',
        item: '生产许可证等相关证书是否齐全',
        option: formData.isComp,
        optname: 'isComp',
        description: formData.compExpl,
        desname: 'compExpl',
        required: '0'
      }, {
        stage: '',
        item: '排污许可证是否取得',
        option: formData.isRowLice,
        optname: 'isRowLice',
        description: formData.rowLiceExpl,
        desname: 'rowLiceExpl',
        required: '0'
      }, {
        stage: '项目达产期阶段',
        item: '是否能按计划进入批量生产',
        option: formData.isBatchProduce,
        optname: 'isBatchProduce',
        description: formData.batchProduceExpl,
        desname: 'batchProduceExpl',
        required: '0'
      }, {
        stage: '',
        item: '能否按预期及时回笼货款',
        option: formData.isAmtBack,
        optname: 'isAmtBack',
        description: formData.amtBackExpl,
        desname: 'amtBackExpl',
        required: '0'
      }, {
        stage: '',
        item: '是否按我行还款计划按时足额还款',
        option: formData.isRepayOntime,
        optname: 'isRepayOntime',
        description: formData.repayOntimeExpl,
        desname: 'repayOntimeExpl',
        required: '0'
      }, {
        stage: '',
        item: '贷款使用是否与项目进度相匹配',
        option: formData.isScheduleMatching,
        optname: 'isScheduleMatching',
        description: formData.scheduleExpl,
        desname: 'scheduleExpl',
        required: '0'
      }

      ];
    },

    objectSpanMethod: function (obj) {
      if (obj.columnIndex === 0) {
        var rowIndex = obj.rowIndex;

        if (rowIndex == 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else if (rowIndex == 2) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (rowIndex == 5) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else if (rowIndex == 9) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (rowIndex == 12) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    save: function () {
      return this.$request({
        url: this.updateUrl,
        method: 'post',
        data: this.formData
      });
    }

  }

};
</script>