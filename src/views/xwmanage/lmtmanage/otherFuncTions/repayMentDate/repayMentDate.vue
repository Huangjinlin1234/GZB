<template>
 <yu-tabs v-model="activeName" >
    <yu-tab-pane label="还款日配置" name="first">

    <yu-panel title="还款日维护" panel-type="simple"  collapse-title>
        <yu-xform ref="dayForm" label-width="120px" v-model="customForm">
        <yu-row>
        <yu-col :span="6">
        <yu-xform-item label="还款日" ctype="yu-num" precision="0" name="repayDate"   :rules="dayRule"  placeholder="请输入1号到28号之间日期" ></yu-xform-item>

        </yu-col>

        </yu-row>
            <div class="button-group" style="text-align:center">
            <yu-button type="primary" @click="validate">保存</yu-button>
            </div>
          </yu-xform>
        </yu-panel>
    </yu-tab-pane>


    <yu-tab-pane label="更新记录" name="second">
    <yu-xform v-model="dialogformdata"  related-table-name="dialogtable" form-type="search"  :remove-empty="true">
        <yu-xform-group :column="2">
          <yu-xform-item placeholder="登记人" label="登记人" ctype="input" name="inputId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="登记机构" label="登记机构" ctype="input" name="inputBrId" fuzzy-query="both"></yu-xform-item>

        </yu-xform-group>
      </yu-xform>

      <yu-xtable  selection-type="radio" row-number ref="dialogtable" @loaded="selectday" :data-url="dataUrl" v-model="tabledata" :base-params="params" request-type="POST" style="width: 100%" condition-key="condition" >
        <yu-xtable-column prop="cfgSerno" label="配置流水号" width="180px" v-if="show"></yu-xtable-column>
        <yu-xtable-column prop="repayDate" label="还款日" ></yu-xtable-column>
        <yu-xtable-column prop="inputId" label="登记人" ></yu-xtable-column>
        <yu-xtable-column prop="inputBrId" label="登记机构"></yu-xtable-column>
        <yu-xtable-column prop="inputDate" label="登记时间" v-if="show"></yu-xtable-column>
        <yu-xtable-column prop="createTime" label="登记时间">
          <template slot-scope="scope">
            {{ dateFormat(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </template>
        </yu-xtable-column>
        <yu-xtable-column prop="cfgStatus" label="配置状态" data-code="STD_CFG_STATUS"></yu-xtable-column>

      </yu-xtable>


  </yu-tab-pane>
</yu-tabs></template>
<script>
import { lookup, dateFormat } from '@/utils';
lookup.reg('STD_CFG_STATUS');
export default {

  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    var checkAge = function (rule, value, callback) {
      setTimeout(function () {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value > 28 || value < 1) {
            callback(new Error('请输入1号到28号之间的数字'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      dataUrl: backend.cmisBiz + '/api/repaydayrecordinfo/selectbymodel',
      params: {sort: 'createTime desc'},
      activeName: 'first',
      customForm: {repayDate: 1},
      tabledata: [],
      dayRule: [
        { required: true, message: '日期不能为空' },
        { validator: checkAge }
      ],
      dateFormat: dateFormat
    };
  },
  mounted () {

  },
  methods: {
    /* 初始方法*/
    AfterInit () {

    },
    selectday (data) {
      if (data != null) {
        this.customForm.repayDate = data[0].repayDate;
      }
    },
    validate () {
      var validate = false, _this = this;

      _this.$refs.dayForm.validate(function (valid) {
        validate = valid;
        if (validate) {
          _this.saveData();
        } else {
          _this.$message({message: '请输入正确日期', type: 'error'});
          return;
        }
      });
    },
    saveData () {
      // 发请求 保存数据
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/repaydayrecordinfo/adddata',
        data: this.customForm
      }).then(({code, message, data}) => {
        if (code == 0) {
          // 请求成功
          if (data == 1) {
            // 操作成功
            this.$message({ message: message, type: 'success' });
            this.$refs.dialogtable.remoteData();
          } else {
            // 操作失败
            this.$message({ message: message, type: 'warning' });
            this.$refs.dialogtable.remoteData();
          }
        }
      });
    }

  }
};
</script>
