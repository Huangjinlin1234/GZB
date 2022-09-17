<template>
  <div>
    <yu-panel title="保证人检查" panel-type="simple" v-show="guarntrFlag">
      <yu-xtable ref="GuarntrTable" :data-url="guarntrTableUrl" :default-load="false" selection-type="radio" @loaded="guarntrTableUrlShow">
        <yu-xtable-column prop="taskNo" label="任务编号"></yu-xtable-column>
        <yu-xtable-column prop="guarName" label="担保人名称"></yu-xtable-column>
        <yu-xtable-column prop="guarType" label="担保标志"></yu-xtable-column>
        <yu-xtable-column prop="guarAmt" label="担保金额"></yu-xtable-column>
      </yu-xtable>
      <yu-xform ref="GuarntrForm" label-width="130px" v-model="pspGuarntrCheck" :disabled="formType != 'edit' ? true : false">
        <yu-xform-group>
          <yu-xform-item name="pkId" label="主键" :hidden="true"></yu-xform-item>
          <yu-xform-item name="taskNo" label="任务编号" :hidden="true"></yu-xform-item>

          <yu-xform-item name="isOperNormal" label="目前保证人经营是否正常" ctype="radio"
                        label-width="1" data-code="STD_ZB_YES_NO" rules="required">
          </yu-xform-item>
          <yu-xform-item name="operExpl" label="说明" ctype="textarea" colspan="24" :rules="{required: isOperNormal, message: '必输项不允许为空'}"></yu-xform-item>

          <yu-xform-item name="guarAbi" label="保证人担保能力" ctype="radio"
                        label-width="1" data-code="STD_ZB_GUAR_ABI" rules="required">
          </yu-xform-item>
          <yu-xform-item name="guarAbiExpl" label="说明" ctype="textarea" colspan="24" rules="required"></yu-xform-item>

          <yu-xform-item name="guarWish" label="保证人担保意愿" ctype="radio"
                        label-width="1" data-code="STD_ZB_GUAR_WISH" rules="required">
          </yu-xform-item>
          <yu-xform-item name="guarWishExpl" label="说明" ctype="textarea" colspan="24" rules="required"></yu-xform-item>

          <yu-xform-item name="isOtherRiskEvent" label="是否有其他重要风险事项" ctype="radio"
                        label-width="1" data-code="STD_ZB_YES_NO" rules="required">
          </yu-xform-item>
          <yu-xform-item name="riskEventExpl" label="说明" ctype="textarea" colspan="24" :rules="{required: isOtherRiskEvent, message: '必输项不允许为空'}"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="抵/质押物检查" panel-type="simple" v-show="pldimnFlag">
      <yu-xtable ref="PldimnTable" :data-url="pldimnTableUrl" :default-load="false" selection-type="radio" @loaded="pldimnTableUrlShow">
        <yu-xtable-column prop="taskNo" label="任务编号"></yu-xtable-column>
        <yu-xtable-column prop="pldimnMemo" label="抵/质押物名称"></yu-xtable-column>
        <yu-xtable-column prop="guarAddr" label="抵/质押物位置"></yu-xtable-column>
        <yu-xtable-column prop="confirmAmt" label="权利金额"></yu-xtable-column>
        <yu-xtable-column prop="evalAmt" label="评估金额"></yu-xtable-column>
      </yu-xtable>
      <yu-xform ref="PldimnForm" label-width="120px" v-model="pspPldimnCheck" :disabled="formType != 'edit' ? true : false">
        <yu-xform-group :column="1">
          <yu-xform-item name="pkId" label="主键" :hidden="true"></yu-xform-item>
          <yu-xform-item name="taskNo" label="任务编号" :hidden="true"></yu-xform-item>

          <yu-xform-item name="isPhotograph" label="是否对抵（质）押物进行核实并拍照确认。如因特殊原因无法拍照的，说明合理理由"
                        label-width="1" ctype="radio" data-code="STD_ZB_YES_NO" rules="required">
          </yu-xform-item>
          <yu-xform-item name="noPhotoExpl" label="未拍照说明" ctype="textarea" colspan="24" :rules="{required: isPhotograph, message: '必输项不允许为空'}"></yu-xform-item>

          <yu-xform-item name="guarWishCase" label="抵（质）押人的担保意愿情况"
                        label-width="1" ctype="radio" data-code="STD_ZB_GUAR_WISH" rules="required">
          </yu-xform-item>
          <yu-xform-item name="wishCaseExpl" label="情况说明" ctype="textarea" colspan="24" rules="required"></yu-xform-item>

          <yu-xform-item name="isClose" label="抵/质押物是否被有关机关查封、冻结、再次抵押"
                        label-width="1" ctype="radio" data-code="STD_ZB_YES_NO" rules="required">
          </yu-xform-item>
          <yu-xform-item name="closeExpl" label="情况说明" ctype="textarea" colspan="24" :rules="{required: isClose, message: '必输项不允许为空'}"></yu-xform-item>

          <yu-xform-item name="isPriRent" label="是否书面承诺放弃优先购买权及优先租赁权"
                        label-width="1" ctype="radio" data-code="STD_ZB_YES_NO" rules="required">
          </yu-xform-item>
          <yu-xform-item name="rentExpl" label="情况说明" ctype="textarea" colspan="24" :rules="{required: isPriRent, message: '必输项不允许为空'}"></yu-xform-item>

          <yu-xform-item name="isOtherRiskEvent" label="是否有其他重要风险事项"
                        label-width="1" ctype="radio" data-code="STD_ZB_YES_NO" rules="required">
          </yu-xform-item>
          <yu-xform-item name="riskEventExpl" label="风险事项说明" ctype="textarea" colspan="24" :rules="{required: isOtherRiskEvent2, message: '必输项不允许为空'}"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>

<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_GUAR_ABI,STD_ZB_GUAR_WISH');
export default {
  props: {
    taskNo: String,
    formType: String
  },

  data: function () {
    return {
      pldimnTableUrl: backend.cmisPsp + '/api/psppldimnlist/',
      guarntrTableUrl: backend.cmisPsp + '/api/pspguarntrlist/',
      pldimnCheckUrl: backend.cmisPsp + '/api/psppldimncheck/',
      guarntrCheckUrl: backend.cmisPsp + '/api/pspguarntrcheck/',

      pspGuarntrCheck: {},
      pspPldimnCheck: {},
      
      guarntrFlag: true, //控制检查项的展示状态
      pldimnFlag: true
    };
  },

  mounted: function () {
    var form = {taskNo: this.taskNo};
    this.$refs.PldimnTable.remoteData({ condition: JSON.stringify(form) });
    this.$refs.GuarntrTable.remoteData({ condition: JSON.stringify(form) });
  },

  created: function () {
    var _this = this;
    _this.$request({
      url: _this.pldimnCheckUrl,
      method: 'get',
      data: {condition: {taskNo: _this.taskNo}}
    }).then((response) => {
      yufp.clone(response.data[0], _this.pspPldimnCheck);
      if (response.data.length <= 0) {
        _this.pspPldimnCheck.pkId = _this.$xutils.getUUID();
        _this.pspPldimnCheck.taskNo = _this.taskNo;
      }
      return _this.$request({
        url: _this.guarntrCheckUrl,
        method: 'get',
        data: {condition: {taskNo: _this.taskNo}}
      });
    }
    ).then((response) => {
      yufp.clone(response.data[0], _this.pspGuarntrCheck);
      if (response.data.length <= 0) {
        _this.pspGuarntrCheck.pkId = _this.$xutils.getUUID();
        _this.pspGuarntrCheck.taskNo = _this.taskNo;
      }
    }
    ).catch(() => {
      _this.$message({
        message: '请求失败'
      });
    });
  },

  computed: {
    isOperNormal: function () {
      return this.pspGuarntrCheck.isOperNormal == '0';
    },
    isOtherRiskEvent: function () {
      return this.pspGuarntrCheck.isOtherRiskEvent == '1';
    },
    isPhotograph: function () {
      return this.pspPldimnCheck.isPhotograph == '0';
    },
    isClose: function () {
      return this.pspPldimnCheck.isClose == '1';
    },
    isPriRent: function () {
      return this.pspPldimnCheck.isPriRent == '0';
    },
    isOtherRiskEvent2: function () {
      return this.pspPldimnCheck.isOtherRiskEvent == '1';
    }

  },

  methods: {

    validate1: function () {
      var validateGuarntr = false;
      this.$refs.GuarntrForm.validate(function (valid) {
        validateGuarntr = valid;
      });
      if (this.$refs.GuarntrTable.length == '0') {
        validateGuarntr = true;
      }
      var validatePldimn = false;
      this.$refs.PldimnForm.validate(function (valid) {
        validatePldimn = valid;
      });
      if (this.$refs.PldimnTable.length == '0') {
        validatePldimn = true;
      }
      return validateGuarntr && validatePldimn;
    },

    validate () {
      var validateGuarntr = false;
      var validatePldimn = false;
      if (this.$refs.GuarntrTable.tabledata.length == '0') {
        validateGuarntr = true;
      } else {
        this.$refs.GuarntrForm.validate(function (valid) {
          validateGuarntr = valid;
        });
      }

      if (this.$refs.PldimnTable.tabledata.length == '0') {
        validatePldimn = true;
      } else {
        this.$refs.PldimnForm.validate(function (valid) {
          validatePldimn = valid;
        });
      }
      return validateGuarntr && validatePldimn;
    },
    /* 当表格无数据时，则该项检查表格不显示 */
    guarntrTableUrlShow(data){
      if(data.length == '0') {
        this.guarntrFlag = false
      }
    },
    pldimnTableUrlShow(data){
      if(data.length == '0') {
        this.pldimnFlag = false
      }
    },
    save: function () {
      var _this = this;
      // _this.pspGuarntrCheck.taskNo = _this.taskNo;
      // _this.pspPldimnCheck.taskNo = _this.taskNo;
      return _this.$request({
        url: _this.pldimnCheckUrl + 'update',
        method: 'post',
        data: _this.pspPldimnCheck
      }).then((response) => {
        if (response.code == '0') {
          console.log('保存pspPldimnCheck');

          return _this.$request({
            url: _this.guarntrCheckUrl + 'update',
            method: 'post',
            data: _this.pspGuarntrCheck
          });
        };
      }).then((response) => {
        if (response.code == '0') {
          console.log('保存pspGuarntrCheck');

          return new Promise((resolve, reject) => {
            var response = {};
            response.code = 0;
            resolve(response);
          });
        }
      }).catch(() => {
        _this.$message({
          message: '保存失败'
        });
      });
    }
  }
};
</script>