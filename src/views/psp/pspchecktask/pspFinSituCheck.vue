<template>
  <div>
  <yu-panel title="财务状况检查" panel-type="simple">
    <yu-xform ref="refForm" v-model="formdata" :disabled="formType != 'edit' ? true : false">
      <yu-xtable ref="refTable" row-number :data="tableData" selection-type="radio" :pageable="false">
        <yu-xtable-column label="科目" prop="idxName" width="120"></yu-xtable-column>
        <yu-xtable-column label="上年末数据" prop="l1yEndValue" ctype="input" :disabled="formType != 'edit' ? true : false"></yu-xtable-column>
        <yu-xtable-column label="本期数据" prop="curtValue" ctype="input" :disabled="formType != 'edit' ? true : false"></yu-xtable-column>
        <yu-xtable-column label="上年同期数据" prop="l1yCurtValue" ctype="input" :disabled="formType != 'edit' ? true : false"></yu-xtable-column>
        <yu-xtable-column label="本期数据与上年同期数据变化%" prop="l1yRiseRate">
          <template slot-scope="scope">
            <yu-xform-item :name="scope.row.l1yRiseRateName" v-model="scope.row.l1yRiseRate" ctype="yu-num" number-formatter="0,000.00" :format-rate="true" sign="%" :multiple="100" disabled/>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="说明" prop="idxRemark" align="center">
          <template slot-scope="scope">
            <yu-xform-item :name="scope.row.idxRemarkName" v-model="scope.row.idxRemark" :disabled="!scope.row.curtValue" :rules="{required: scope.row.hintValue == '1', message: '必输项不允许为空'}"/>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="提示信息" prop="hintInfo"></yu-xtable-column>
      </yu-xtable>
    </yu-xform>
  </yu-panel>

  <yu-panel title="借款人综合财务情况评价:" panel-type="simple">
    <yu-xform ref="refCusForm" v-model="cusBaseData" :disabled="formType != 'edit' ? true : false">
      <yu-xform-item label="主键" name="pkId" hidden></yu-xform-item>
      <yu-xform-item label="任务编号" name="taskNo" hidden></yu-xform-item>
      <yu-xform-item label="" type="textarea" placeholder="借款人综合财务情况评价" name="finaAnaly" rules="required" :key="21"></yu-xform-item>
    </yu-xform>
  </yu-panel>

  </div>
</template>

<script>
import mixinForm from '@/utils/mixins/mixin-form';

export default {
  mixins: [mixinForm],

  data: function () {
    return {
      updateUrl: this.$backend.cmisPsp + '/api/pspfinsitucheck/updateList',
      queryUrl: this.$backend.cmisPsp + '/api/pspfinsitucheck/selectByTaskNo',
      formdata: {},
      tableData: [],
      cusBaseData: {},
      curtValue: false
    };
  },
  props: {
    formDataCus: Object,
    taskNo: String,
    formType: String
  },
  watch: {
    formDataCus: function () {
      for (var item in this.formDataCus) {
        this.cusBaseData[item] = this.formDataCus[item];
      }
    }
  },
  mounted () {
    var _this = this;
    if (!_this.cusBaseData.pkId) {
      _this.cusBaseData.pkId = _this.$xutils.getUUID();
      _this.cusBaseData.taskNo = _this.taskNo;
    }

    console.log('formDataCushahahhah', this.cusBaseData);

    this.$request({
      url: this.queryUrl,
      method: 'post',
      data: {condition: JSON.stringify({taskNo: _this.taskNo, cusType: '2'})}
    }).then(response => {
      _this.tableData = response.data;
      for (var i = 0; i < _this.tableData.length; i++) {
        _this.tableData[i].l1yRiseRateName = 'l1yRiseRate' + i;
        _this.tableData[i].idxRemarkName = 'idxRemark' + i;

        _this.formdata['l1yRiseRate' + i] = _this.tableData[i].l1yRiseRate;
        _this.formdata['idxRemark' + i] = _this.tableData[i].idxRemark;
        // if (!_this.tableData[i].curtValue) {
        //   _this.curtValue = true;
        // }
        // _this.curtValue = _this.tableData[i].curtValue;
        // 计算l1yRiseRate
        if (Number(_this.tableData[i].l1yCurtValue) != 0) {
          var curtValue = Number(_this.tableData[i].curtValue);
          var l1yCurtValue = Number(_this.tableData[i].l1yCurtValue);

          var l1yRiseRate = ((curtValue - l1yCurtValue) / Math.abs(l1yCurtValue)).toFixed(4);
          _this.tableData[i].l1yRiseRate = l1yRiseRate;
        }
      }
    }).catch(res => {
      _this.$message({
        message: res.message
      });
    });
  },
  // mounted () {
  //   if (!this.formDataCus) {
  //     this.cusBaseData.pkId = this.$xutils.getUUID();
  //     this.cusBaseData.taskNo = this.taskNo;
  //   }
  // },
  methods: {

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      this.$refs.refCusForm.validate(function (valid) {
        validate = validate ? valid : validate;
      });

      return validate;
    },

    save: function () {
      var _this = this;
      return this.$request({
        url: this.updateUrl,
        method: 'post',
        // data: this.tableData
        data: this.$refs.refTable.tabledata
      }).then((response) => {
        if (response.code == '0') {
          return _this.$request({
            url: _this.$backend.cmisPsp + '/api/pspcusbasecase/updateSelective',
            method: 'post',
            data: _this.cusBaseData
          });
        };
      });
    }

  }
};
</script>