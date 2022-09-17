<template>
  <div>
  <yu-xform ref="refForm" v-model="formdata" :disabled="isDisable">
    <yu-panel title="担保人检查" panel-type="simple">
      <yu-xtable ref="GuarntrTable" :data="pspGuarntrList" :data-url="guarntrTableUrl" :default-load="false" selection-type="radio" :show-hidden-menu="true">
        <yu-xtable-column prop="pkId" label="主键" hide-column></yu-xtable-column>
        <yu-xtable-column prop="taskNo" label="任务编号" hide-column></yu-xtable-column>
        <yu-xtable-column prop="guarName" label="担保人名称"></yu-xtable-column>
        <yu-xtable-column prop="guarType" label="担保标志"></yu-xtable-column>
        <yu-xtable-column prop="guarAmt" label="担保金额"></yu-xtable-column>
        <yu-xtable-column prop="curtGuarAmt" label="已对外担保金额" ctype="input" :disabled="isDisable"></yu-xtable-column>
        <yu-xtable-column prop="guarAbi" label="是否具担保能力" ctype="select" data-code="STD_ZB_YES_NO" :disabled="isDisable" ></yu-xtable-column>
        <yu-xtable-column prop="guarAbiExpl" label="担保人说明" ctype="textarea" :disabled="isDisable">
        <template slot-scope="scope">
              <yu-xform-item :name="scope.row.pkId" v-model="scope.row.guarAbiExpl" ctype="textarea" :rules="{required: scope.row.guarAbi == '0', message: '必输项不允许为空'}"></yu-xform-item>
        </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="抵/质押物检查" panel-type="simple">
      <yu-xtable ref="PldimnTable" :data="pspPldimnList" :data-url="pldimnTableUrl" :default-load="false" selection-type="radio" :show-hidden-menu="true">
        <yu-xtable-column prop="pkId" label="主键" hide-column></yu-xtable-column>
        <yu-xtable-column prop="taskNo" label="任务编号" hide-column></yu-xtable-column>
        <yu-xtable-column prop="pldimnMemo" label="抵/质押物名称"></yu-xtable-column>
        <yu-xtable-column prop="guarAddr" label="抵/质押物位置"></yu-xtable-column>
        <yu-xtable-column prop="confirmAmt" label="权利金额"></yu-xtable-column>
        <yu-xtable-column prop="evalAmt" label="评估金额"></yu-xtable-column>
        <yu-xtable-column prop="guarType" label="担保标志"></yu-xtable-column>
        <yu-xtable-column prop="pldimnRemainValue" label="抵/质押物余值" ctype="input" :disabled="isDisable"></yu-xtable-column>
        <yu-xtable-column prop="isClose" label="是否被有关机关查封、冻结、抵押" ctype="select" data-code="STD_ZB_YES_NO" :disabled="isDisable" width="240px"></yu-xtable-column>
        <yu-xtable-column prop="guarRemark" label="抵/质押物说明">
          <template slot-scope="scope">
              <yu-xform-item :name="scope.row.pkId" v-model="scope.row.guarRemark" ctype="textarea" :rules="{required: scope.row.isClose == '1', message: '必输项不允许为空'}"></yu-xform-item>
          </template>

        </yu-xtable-column>
        <yu-xtable-column prop="guarStsRemark" label="押品状态说明" ctype="textarea" :disabled="isDisable"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </yu-xform>
  </div>
</template>

<script>
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  props: {
    taskNo: String,
    formType: String
  },

  data: function () {
    // var isDisable = this.formType != 'edit';
    return {
      pldimnTableUrl: backend.cmisPsp + '/api/psppldimnlist/',
      guarntrTableUrl: backend.cmisPsp + '/api/pspguarntrlist/',
      pspGuarntrList: [],
      pspPldimnList: [],
      formdata: {},
      isDisable: ''
    };
  },

  created: function () {
    var _this = this;
    _this.isDisable = _this.$route.params.opType === 'view';
    _this.taskNo = _this.$parent.$route.params.pspTask.taskNo;
    _this.$request({
      url: _this.pldimnTableUrl,
      method: 'get',
      data: {condition: {taskNo: _this.taskNo}}
    }).then((response) => {
      _this.pspPldimnList = response.data;

      for (var i = 0; i < _this.pspPldimnList.length; i++) {
        _this.formdata[_this.pspPldimnList[i].pkId] = _this.pspPldimnList[i].guarRemark;
      }

      return _this.$request({
        url: _this.guarntrTableUrl,
        method: 'get',
        data: {condition: {taskNo: _this.taskNo}}
      });
    }
    ).then((response) => {
      _this.pspGuarntrList = response.data;
      /*
          for(var i=0; i<response.data.length; i++){
          _this.pspGuarntrList.push(response.data[i]);
        }
        */
    }
    ).catch(() => {
      _this.$message({
        message: '请求失败'
      });
    });
  },

  methods: {

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    save: function () {
      var _this = this;
      if (!_this.validate()) {
        _this.$message.warning('录入信息不完整');
        return;
      }
      return _this.$request({
        url: _this.pldimnTableUrl + 'updateList',
        method: 'post',
        data: _this.pspPldimnList
      }).then((response) => {
        if (response.code == '0') {
          console.log('保存pspPldimnList');

          return _this.$request({
            url: _this.guarntrTableUrl + 'updateList',
            method: 'post',
            data: _this.pspGuarntrList
          });
        }
      }).then((response) => {
        if (response.code == '0') {
          console.log('保存pspGuarntrList');

          return new Promise((resolve, reject) => {
            var response = {};
            response.code = 0;
            resolve(response);
            _this.$message.success('保存成功！');
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