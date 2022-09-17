<template>
  <!--
    @created by 张亮 2021/08/02
    @description 省心快贷利率信息修改
  -->
  <div>
    <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="isDisabled">
      <yu-panel title="利率信息修改" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="流水号" name="serno" ctype="input" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="利率调整方式" name="irAdjustType" ctype="select" data-code="STD_IR_ADJUST_TYPE" :rules="rule[0]" @change="onChangeYearRate" placeholder="利率调整方式"></yu-xform-item>
          <yu-xform-item label="LPR定价区间" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL" :rules="rule[0]" placeholder="LPR定价区间"  @change="getLprRate"></yu-xform-item>
          <yu-xform-item label="当前lpr利率" ctype="yu-num" sign="%" :multiple="100" placeholder="当前lpr利率"  name="curtLprRate" rules="required"></yu-xform-item>
          <yu-xform-item label="浮动点数(BP)" name="rateFloatPoint" ctype="input" :rules="rule[0]" placeholder="浮动点数" @blur="rateFloatPointChange"></yu-xform-item>
          <yu-xform-item label="执行年利率" ctype="yu-num" sign="%" :multiple="100" placeholder="执行年利率" name="execRateYear" :hidden="YearRateShow" :rules="{ required: isRateFloatPointRequired, message: '字段不能为空' }"></yu-xform-item>
        </yu-xform-group>
    </yu-panel></yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submitFn" v-if="isButShow">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
           <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_IR_ADJUST_TYPE,STD_LPR_RATE_INTVAL');
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  mponents: {yufpNwfInit },
  data: function () {
    return {
      isDisabled: false,
      isButShow: false,
      YearRateShow: false,
      isRateFloatPointRequired: false,
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      topOutsystemCode: 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ'
    };
  },
  mounted () {
    var _this = this;
    let data = {};
    var serno = '';
    var op = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
      op = data.param.op;
      _this.isShowBtn = true;
    } else {
      data = _this.getFactory().contextData;
      serno = data.sxkdSerno;
      op = data.op;
    }
    // let data = _this.$route.meta.params;
    // let data = _this.getFactory().contextData;
    // 进入初始化
    if (op == 'VIEW') {
      this.isDisabled = true;
      this.isButShow = false;
    } else if (op == 'EDIT') {
      this.isDisabled = false;
      this.isButShow = true;
    }
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/sxkdloanratechange/showdetial',
      data: { serno: serno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },

  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    // 输入浮动点数反显执行年利率
    rateFloatPointChange () {
      var _this = this;
      // 利率调整方式01固定利率 02浮动利率 固定利率显示执行年利率且必输,浮动利率不展示且非必输
      let irAdjustType = _this.formdata.irAdjustType;
      if (irAdjustType == '01') {
        let rateFloatPoint = this.formdata.rateFloatPoint;
        this.formdata.execRateYear = (parseFloat(rateFloatPoint) / 10000) + parseFloat(this.formdata.curtLprRate);
      }
    },
    onChangeYearRate () {
      var _this = this;
      // 利率调整方式01固定利率 02浮动利率 固定利率显示执行年利率且必输,浮动利率不展示且非必输
      let irAdjustType = _this.formdata.irAdjustType;
      if (irAdjustType == '01') {
        _this.YearRateShow = false;
        _this.isRateFloatPointRequired = true;
      } else if (irAdjustType == '02') {
        _this.YearRateShow = true;
        _this.isRateFloatPointRequired = false;
      }
    },
    // 根据LPR定价区间获取lpr利率与执行年利率
    getLprRate: function () {
      var lprRateIntval = this.formdata.lprRateIntval;
      if (lprRateIntval == 'A1' || lprRateIntval == 'A2') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getlprrate';
        let rqData = {};
        rqData['lprRate'] = lprRateIntval;
        this.$request({
          url: url,
          method: 'post',
          data: rqData
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.curtLprRate = response.data.rate;
              // 利率调整方式01固定利率 02浮动利率 固定利率显示执行年利率且必输,浮动利率不展示且非必输
              let irAdjustType = this.formdata.irAdjustType;
              if (irAdjustType == '01') {
                let rateFloatPoint = this.formdata.rateFloatPoint;
                this.formdata.execRateYear = (parseFloat(rateFloatPoint) / 10000) + parseFloat(response.data.rate);
              }
            } else {
              this.$xutils.showMsgBox('提示', response.message, 350, 150);
              return;
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message, 350, 150);
            return;
          }
        });
      }
    },
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
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
    },

    // 取消
    cancelFn: function () {
      // yufp.router.removeTab(this.$route.path);
      this.getFactory().back();
    },
    // 保存
    saveFn: function () {
      return new Promise((resolve, reject) => {
        var validate = false,
          _this = this;
        _this.$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }
        var model = {};
        yufp.clone(_this.formdata, model);
        // 向后台发送保存请求
        var updateurl =
          backend.cmisBiz + '/api/sxkdloanratechange/update';
        _this
          .$request({
            method: 'POST',
            url: updateurl,
            data: model
          })
          .then((data) => {
            if (data.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
              resolve();
            } else {
              _this.$message({ message: '保存失败', type: 'error' });
            }
          });
      });
    },
    // 保存后流程提交
    submitFn () {
      let _this = this;
      _this.saveFn().then(res => {
        var obj = _this.formdata;
        const loginUser = _this.$xutils.getLoginUserInfo();
        let dutysArry = []; //  loginUser.dutys
        for (let i = 0; i < loginUser.dutys.length; i++) {
          dutysArry.push(loginUser.dutys[i].code);
        }
        let startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = _this.$store.state.oauth.org.code;
        startdto.userId = _this.$store.state.oauth.loginCode;
        startdto.bizType = 'YX020';
        startdto.bizId = obj.serno;
        startdto.bizUserName = loginUser.userName;
        startdto.bizUserId = loginUser.loginCode;
        startdto.bizPkId = obj.serno;
        startdto.param = {
          topOutsystemCode: _this.topOutsystemCode,
          imageParams: {
            docid: obj.serno,
            cusId: obj.serno,
            businessid: obj.serno
          }
        };
        startdto.param = obj;
        startdto.param.dutyOrgType = loginUser.org.orgType;
        startdto.param.dutys = dutysArry.join(',');
        _this.$refs.yufpNwfInit.wfInit(startdto);
      });
    },
    // 流程回调
    onBack () {
      if (this.isShowBtn) {
        this.$dialog.close(this.dialogId);
      } else {
        yufp.router.removeTab(this.$route.path);
      }
    }
  }
};
</script>
