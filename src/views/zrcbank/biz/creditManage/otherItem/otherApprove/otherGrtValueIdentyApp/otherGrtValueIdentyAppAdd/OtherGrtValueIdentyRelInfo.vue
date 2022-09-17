<template>
<!--
    @created by lixm 2021-06-11
    @description 抵押物信息
  -->
  <div>
    <yu-xform ref="refForm" form-type="search" v-model="formdata" label-width="120px" >
    <yu-panel title="抵押物情况" panel-type="simple">
    <yu-xform-group :column="2">
      <yu-xform-item label="押品编号" ctype="yu-xcltrl-base1" name="guarNo" rules="required" placeholder="押品编号" @select-fn="commonSelectFn" :mapping="{'guarCusName':'cusName','guarNo':'guarNo'}" width="730" height="480" ></yu-xform-item>
      <yu-xform-item label="抵押人名称" placeholder="抵押人名称" name="cusName" ctype="input" rules="required" disabled></yu-xform-item>
    </yu-xform-group>
    <yu-xform-group :column="2">
      <yu-xform-item label="房屋坐落位置" placeholder="房屋坐落位置" name="housePlace" ctype="input" rules="required"  ></yu-xform-item>
      <yu-xform-item label="房屋建筑面积（平方米）" placeholder="房屋建筑面积（平方米）" name="houseBuildSqu" ctype="input" rules="required"  ></yu-xform-item>
      <yu-xform-item label="土地使用权面积（平方米）" placeholder="土地使用权面积（平方米）" name="landUtilSqu" ctype="input" rules="required"  ></yu-xform-item>
      <yu-xform-item label="房产类型" placeholder="房产类型" name="houseType" ctype="select" data-code="STD_ZB_HOUSE_PROPERTY_CLS"></yu-xform-item>
      <yu-xform-item label="土地用途" placeholder="土地用途" name="landUse" ctype="select" data-code="STD_ZB_LANDYT" ></yu-xform-item>
      <yu-xform-item label="土地使用权性质" placeholder="土地使用权性质" name="evalSource" ctype="select" data-code="STD_ZB_LAND_TYPE"></yu-xform-item>
      <yu-xform-item label="分项流水号" placeholder="分项流水号" name="serno"  ctype="input"  hidden></yu-xform-item>
      <yu-xform-item label="主键" placeholder="主键" name="pkId"  ctype="input" hidden ></yu-xform-item>
    </yu-xform-group>
    </yu-panel>

    <yu-panel title="评估情况" panel-type="simple">
    <yu-xform-group :column="2">
      <yu-xform-item label="房产评估价值（万元）" placeholder="房产评估价值（万元）" name="realproEvalValue" ctype="num" maxlength="10" number-formatter="0,000.00"  ></yu-xform-item>
      <yu-xform-item label="土地评估价值（万元）" placeholder="土地评估价值（万元）" name="landEvalValue" ctype="num" maxlength="10" number-formatter="0,000.00" ></yu-xform-item>
      <yu-xform-item label="房地产评估总价（万元）" placeholder="房地产评估总价（万元）" name="realproEvalTotalValue" ctype="num" maxlength="10" number-formatter="0,000.00" rules="required"  ></yu-xform-item>
      <yu-xform-item label="评估机构名称" placeholder="评估机构名称" name="evalOrgName" ctype="input" rules="required"  ></yu-xform-item>
      <yu-xform-item label="评估报告出具时间" placeholder="评估报告出具时间" name="evalReportTime"  ctype="datepicker"  ></yu-xform-item>
    </yu-xform-group>
    </yu-panel>

    <yu-panel title="支行认定意见" panel-type="simple">
    <yu-xform-group :column="2">
      <yu-xform-item label="房产确认价值（万元）" placeholder="房产确认价值（万元）" name="realproCfirmValue" ctype="num" maxlength="10" number-formatter="0,000.00" ></yu-xform-item>
      <yu-xform-item label="土地确认价值（万元）" placeholder="土地确认价值（万元）" name="landCfirmValue" ctype="num" maxlength="10" number-formatter="0,000.00" ></yu-xform-item>
      <yu-xform-item label="房地产确认总价（万元）" placeholder="房地产确认总价（万元）" name="realproCfirmTotalValue" ctype="num" maxlength="10" number-formatter="0,000.00" rules="required"  ></yu-xform-item>
      <yu-xform-item label="该抵押物项下申请的融资金额（万元）" placeholder="该抵押物项下申请的融资金额（万元）" name="pldAppFinPrice" ctype="num" maxlength="10" number-formatter="0,000.00" rules="required"  ></yu-xform-item>
      <yu-xform-item label="房地产抵押情况" placeholder="房地产抵押情况" name="realproPldCase" ctype="select" data-code="STD_REALPRO_PLD_CASE"  @change="isRealproPldCaseChange"></yu-xform-item>
      <yu-xform-item label="抵押到期日" placeholder="抵押到期日" name="pldEndDate"  ctype="datepicker" :disabled="dateDisabled"></yu-xform-item>
    </yu-xform-group>
    </yu-panel>

    <div class="yu-grpButton">
        <yu-button type="primary"  @click="saveFn" >保存</yu-button>
        <yu-button icon="yx-undo2" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
  </div>
</template>
<script>
import {clone, lookup, dateFormat} from '@/utils';
yufp.lookup.reg('STD_ZB_HOUSE_PROPERTY_CLS,STD_ZB_LANDYT,STD_ZB_LAND_TYPE,STD_REALPRO_PLD_CASE');
export default {
  props: {
    pageParams: Object,
    operate: String,
    dialogId: String
  },
  data: function () {
    return {
      formDisabled: false,
      dateDisabled: true
    };
  },
  mounted () {
    var _this = this;
    yufp.clone(_this.pageParams, _this.formdata);
    if (_this.pageParams.op == 'ADD') {
      _this.formdata.pkId = new Date().getTime();
    } else {
      let reqData = {
        condition: JSON.stringify({pkId: _this.formdata.pkId})
      };
      this.$request({// 获取评估情况
        url: this.$backend.cmisBiz + '/api/othergrtvaluecadaidentysub/',
        method: 'GET',
        data: reqData
      }).then(({code, message, data}) => {
        if (code == '0') {
          /*
              //房产评估价值（万元）
              var realproEvalValue = data[0].realproEvalValue ;
              data[0].realproEvalValue = parseFloat(parseFloat(realproEvalValue / 10000).toFixed(6));
              //土地评估价值
              var landEvalValue = data[0].landEvalValue ;
              data[0].landEvalValue = parseFloat(parseFloat(landEvalValue / 10000).toFixed(6));
              //房地产评估总价
              var realproEvalTotalValue = data[0].realproEvalTotalValue ;
              data[0].realproEvalTotalValue = parseFloat(parseFloat(realproEvalTotalValue / 10000).toFixed(6));
              */
          clone(data[0], _this.formdata);
        } else {
          this.$message({message: message || '操作失败', type: 'error'});
        }
      });

      this.$request({// 获取支行意见
        url: this.$backend.cmisBiz + '/api/othergrtvaluebranchidentysub/',
        method: 'GET',
        data: reqData
      }).then(({code, message, data}) => {
        if (code == '0') {
          /*
              //房产确认价值
              var realproCfirmValue = data[0].realproCfirmValue ;
              data[0].realproCfirmValue = parseFloat(parseFloat(realproCfirmValue / 10000).toFixed(6));
              //土地确认价值
              var landCfirmValue = data[0].landCfirmValue ;
              data[0].landCfirmValue = parseFloat(parseFloat(landCfirmValue / 10000).toFixed(6));
              //房地产确认总价
              var realproCfirmTotalValue = data[0].realproCfirmTotalValue ;
              data[0].realproCfirmTotalValue = parseFloat(parseFloat(realproCfirmTotalValue / 10000).toFixed(6));
              //该抵押物项下申请的融资金额
              var pldAppFinPrice = data[0].pldAppFinPrice ;
              data[0].pldAppFinPrice = parseFloat(parseFloat(pldAppFinPrice / 10000).toFixed(6));
              */
          clone(data[0], _this.formdata);
        } else {
          this.$message({message: message || '操作失败', type: 'error'});
        }
      });
    }
  },
  methods: {
    saveFn () {
      var _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = this.$backend.cmisBiz + '/api/othergrtvalueidentyrel';
      if (_this.pageParams.op == 'ADD') {
        url = url + '/addothergrtvalueidentyrel';
      } else if (_this.pageParams.op == 'EDIT') {
        url = url + '/updateothergrtvalueidentyrel';
      }
      var data = _this.formdata;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: url,
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.$message('保存成功');
            if (_this.pageParams.op == 'ADD') {
              _this.pageParams.op = 'EDIT';
            }
          } else {
            _this.$message('保存失败');
          }
        },
        error: (result, b) => {
          _this.$message('保存失败');
        }
      });
    },
    isRealproPldCaseChange () {
      var _this = this;
      if (_this.formdata.realproPldCase == '01' || _this.formdata.realproPldCase == '02') {
        _this.dateDisabled = true;
        _this.formdata.pldEndDate = '';
      } else if (_this.formdata.realproPldCase == '03') {
        _this.dateDisabled = false;
      }
    },
    commonSelectFn (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
      this.formdata.pldimnMemo = data.label;
    },
    // 返回信息页面
    cancelFn () {
      this.$dialog.close(this.dialogId);
      yufp.globalEventBus.$emit('refreshGrtTable');
    }
  }
};
</script>