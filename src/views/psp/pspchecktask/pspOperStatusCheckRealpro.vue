<template>
    <yu-xform ref="refForm" label-width="120px" v-model="formData" :disabled="formType != 'edit' ? true : false">
      <yu-panel title="经营状况检查(房地产开发贷)" panel-type="simple">
        <yu-xform-group :column="2">
            <yu-xform-item name="pkId" label="主键" :hidden="true"/>
            <yu-xform-item name="taskNo" label="任务编号" :hidden="true"/>
            <yu-xform-item name="isOverInvest" label="项目总投资是否超预算" ctype="radio" data-code="STD_ZB_YES_NO" rules="required"/>
            <yu-xform-item name="overExpl" label="预算超支说明" ctype="textarea" colspan="12" :rules="{required: isOverInvest, message: '必输项不允许为空'}"/>
            <yu-xform-item name="isNormalDelay" label="房地产开发进展是否存在非正常延期情况" ctype="radio" data-code="STD_ZB_YES_NO" rules="required"/>
            <yu-xform-item name="delayExpl" label="非正常延期说明" ctype="textarea" colspan="12" :rules="{required: isNormalDelay, message: '必输项不允许为空'}"/>
            <yu-xform-item name="isAptiTerm" label="房地产开发资质是否过期" ctype="radio" data-code="STD_ZB_YES_NO" rules="required"/>
            <yu-xform-item name="overTermExpl" label="开发资质过期说明" ctype="textarea" colspan="12" :rules="{required: isAptiTerm, message: '必输项不允许为空'}"/>
            <yu-xform-item name="presellLic" label="是否取得预售许可证" ctype="radio" data-code="STD_ZB_YES_NO" rules="required"/>
            <yu-xform-item name="presellExpl" label="预售许可证说明" ctype="textarea" colspan="12" :rules="{required: presellLic, message: '必输项不允许为空'}"/>
            <yu-xform-item name="isSaleNormal" label="房产销售是否正常" ctype="radio" data-code="STD_ZB_YES_NO" rules="required"/>
            <yu-xform-item name="saleNormalExpl" label="销售情况说明" ctype="textarea" colspan="12" :rules="{required: isSaleNormal, message: '必输项不允许为空'}"/>
            <yu-xform-item name="isScheduleMatching" label="贷款使用是否与项目进度相匹配" ctype="radio" data-code="STD_ZB_YES_NO" rules="required"/>
            <yu-xform-item name="scheduleExpl" label="贷款匹配说明" ctype="textarea" colspan="12" :rules="{required: isScheduleMatching, message: '必输项不允许为空'}"/>
            <yu-xform-item name="isDelayCap" label="是否拖欠工程款" ctype="radio" data-code="STD_ZB_YES_NO" rules="required"/>
            <yu-xform-item name="delayRemark" label="拖欠工程款说明" ctype="textarea" colspan="12" :rules="{required: isDelayCap, message: '必输项不允许为空'}"/>
            <yu-xform-item name="isRepay" label="是否按我行还款计划按时足额还款" ctype="radio" data-code="STD_ZB_YES_NO" rules="required"/>
            <yu-xform-item name="repayExpl" label="按时还款说明" ctype="textarea" colspan="12" :rules="{required: isRepay, message: '必输项不允许为空'}"/>
            <yu-xform-item name="isAcct" label="是否在我行开立专户" ctype="radio" colspan="12" data-code="STD_ZB_YES_NO" rules="required"/>
            <yu-xform-item name="acctNo" label="账号" colspan="10"/>
            <yu-xform-item label="" ctype="custom" name="custom" v-if="custom" colspan="2">
              <yu-button @click="checkFn" type="primary">获取</yu-button>
            </yu-xform-item>
            <yu-xform-item name="acctName" label="账户名称"/>
            <yu-xform-item name="acctSeqNo" label="账户序号"/>
            <yu-xform-item name="acctb" label="开户行"/>

            <yu-xform-item name="noAcctExpl" label="说明" ctype="textarea" colspan="24" :rules="{required: isAcct, message: '必输项不允许为空'}"/>
        </yu-xform-group>

        <yu-xtable ref="refTable" :data="tableData" :default-load="false" selection-type="radio" :pageable="false">
          <yu-xtable-column prop="item" label="检查项目"/>
          <yu-xtable-column prop="preRst" label="上期结果">
            <template slot-scope="scope">
              <yu-xform-item :name="scope.row.preRstName" v-model="scope.row.preRst" :rules="{required: true, message: '必输项不允许为空'}"/>
            </template>
          </yu-xtable-column>
          <yu-xtable-column prop="curtRst" label="本期结果">
            <template slot-scope="scope">
              <yu-xform-item :name="scope.row.curtRstName" v-model="scope.row.curtRst" ctype="input" :rules="{required: true, message: '必输项不允许为空'}"/>
            </template>
          </yu-xtable-column>
          <yu-xtable-column prop="remark" label="说明">
            <template slot-scope="scope">
              <yu-xform-item :name="scope.row.remarkName" v-model="scope.row.remark" ctype="textarea" :rules="{required: true, message: '必输项不允许为空'}"/>
            </template>
          </yu-xtable-column>
        </yu-xtable>
      </yu-panel>

    <yu-panel>
        <yu-xform-item name="remark14" label="请对房地产开发进度及销售情况进行简单描述" ctype="textarea" rules="required"/>
    </yu-panel>

    </yu-xform>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  props: {
    taskNo: String,
    cusId: String,
    formType: String
  },
  data: function () {
    return {
      updateUrl: backend.cmisPsp + '/api/pspoperstatuscheckrealpro/update',
      queryUrl: backend.cmisPsp + '/api/pspoperstatuscheckrealpro/',
      formData: { 'isAcct': '' },
      tableData: [],
      cusData: {},
      custom: false
    };
  },

  computed: {
    isOverInvest: function () {
      return this.formData.isOverInvest == '1';
    },
    isNormalDelay: function () {
      return this.formData.isNormalDelay == '1';
    },
    isAptiTerm: function () {
      return this.formData.isAptiTerm == '1';
    },
    presellLic: function () {
      return this.formData.presellLic == '0';
    },
    isSaleNormal: function () {
      return this.formData.isSaleNormal == '0';
    },
    isScheduleMatching: function () {
      return this.formData.isScheduleMatching == '0';
    },
    isDelayCap: function () {
      return this.formData.isDelayCap == '1';
    },
    isRepay: function () {
      return this.formData.isRepay == '0';
    },
    isAcct: function () {
      return this.formData.isAcct == '0';
    }

  },
  watch: {

    'formData.isAcct': function (val) {
      if (this.cusId != '') {
        if (val == '1') {
          this.custom = true;
        } else {
          this.custom = false;
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
    // 获取开户行
    checkFn () {
      var _this = this;
      _this.$request({
        url: _this.$backend.cmisPsp + '/api/psppropertycheck/sendToIb1253',
        method: 'post',
        data: _this.formData.acctNo
      }).then((response) => {
        if (response.code == '0') {
          // yufp.clone(response.data, _this.cusData);
          // 账号
          // _this.formData.acctNo = response.data.zhhuzwmc;
          // 开户行
          _this.formData.acctb = response.data.zhhuzwmc;

          // _this.$refs.refForm.setItemDisabled('acctNo', true);
          // _this.$refs.refForm.setItemDisabled('acctb', true);
        }
      }).catch(() => {
        _this.$message({
          message: '请求失败'
        });
      });
    },

    transForm2Table: function (formData) {
      this.tableData = [{
        item: '项目预计总投入（万元）',
        preRst: formData.preRst1,
        preRstName: 'preRst1',
        curtRst: formData.curtRst1,
        curtRstName: 'curtRst1',
        remark: formData.remark1,
        remarkName: 'remark1'
      }, {
        item: '实际累计总投入（万元）',
        preRst: formData.preRst2,
        preRstName: 'preRst2',
        curtRst: formData.curtRst2,
        curtRstName: 'curtRst2',
        remark: formData.remark2,
        remarkName: 'remark2'
      }, {
        item: '我行已投入贷款（万元）',
        preRst: formData.preRst3,
        preRstName: 'preRst3',
        curtRst: formData.curtRst3,
        curtRstName: 'curtRst3',
        remark: formData.remark3,
        remarkName: 'remark3'
      }, {
        item: '他行已投入贷款（万元）',
        preRst: formData.preRst4,
        preRstName: 'preRst4',
        curtRst: formData.curtRst4,
        curtRstName: 'curtRst4',
        remark: formData.remark4,
        remarkName: 'remark4'
      }, {
        item: '借款人已投入自有资金（万元）',
        preRst: formData.preRst5,
        preRstName: 'preRst5',
        curtRst: formData.curtRst5,
        curtRstName: 'curtRst5',
        remark: formData.remark5,
        remarkName: 'remark5'
      }, {
        item: '项目开发进度',
        preRst: formData.preRst6,
        preRstName: 'preRst6',
        curtRst: formData.curtRst6,
        curtRstName: 'curtRst6',
        remark: formData.remark6,
        remarkName: 'remark6'
      }, {
        item: '可销售面积（平方米）',
        preRst: formData.preRst7,
        preRstName: 'preRst7',
        curtRst: formData.curtRst7,
        curtRstName: 'curtRst7',
        remark: formData.remark7,
        remarkName: 'remark7'
      }, {
        item: '已销售面积（平方米）',
        preRst: formData.preRst8,
        preRstName: 'preRst8',
        curtRst: formData.curtRst8,
        curtRstName: 'curtRst8',
        remark: formData.remark8,
        remarkName: 'remark8'
      }, {
        item: '已销售总价（万元）',
        preRst: formData.preRst9,
        preRstName: 'preRst9',
        curtRst: formData.curtRst9,
        curtRstName: 'curtRst9',
        remark: formData.remark9,
        remarkName: 'remark9'
      }, {
        item: '已预售面积（平方米）',
        preRst: formData.preRst10,
        preRstName: 'preRst10',
        curtRst: formData.curtRst10,
        curtRstName: 'curtRst10',
        remark: formData.remark10,
        remarkName: 'remark10'
      }, {
        item: '已预售总价（万元）',
        preRst: formData.preRst11,
        preRstName: 'preRst11',
        curtRst: formData.curtRst11,
        curtRstName: 'curtRst11',
        remark: formData.remark11,
        remarkName: 'remark11'
      }, {
        item: '销售均价（万元）',
        preRst: formData.preRst12,
        preRstName: 'preRst12',
        curtRst: formData.curtRst12,
        curtRstName: 'curtRst12',
        remark: formData.remark12,
        remarkName: 'remark12'
      }, {
        item: '回笼我行资金（万元）',
        preRst: formData.preRst13,
        preRstName: 'preRst13',
        curtRst: formData.curtRst13,
        curtRstName: 'curtRst13',
        remark: formData.remark13,
        remarkName: 'remark13'
      }

      ];
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