<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="200px" v-model="formdata" :disabled="formDisabled">
        <yu-tabs v-model="activeName" @tab-click="handleClick">
          <yu-tab-pane label="申请信息" name="basicTab">
            <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="审批编号" ctype="input" name="serno" disabled ></yu-xform-item>
                <yu-xform-item label="申请日期" ctype="input" name="appDate" disabled></yu-xform-item>
                <yu-xform-item label="客户经理" ctype="input" name="managerId" disabled></yu-xform-item>
                <yu-xform-item label="分支机构" ctype="input" name="managerBrId" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="客户信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="客户编号" ctype="input" name="cusId" rules="required" disabled ></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" name="cusName" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="证件号码" ctype="input" name="certCode" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="所属行业" ctype="input" name="tradeClass" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="产品编号" ctype="input" name="prdId" rules="required" disabled ></yu-xform-item>
                <yu-xform-item label="产品名称" ctype="input" name="prdName" rules="required" disabled ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="是否关联第三方" :hideFilter="false" :collapseHide="false">
             <yu-xform-group :column="2">
               <yu-xform-item label="是否关联信息" ctype="input" name="tradeClass"  disabled></yu-xform-item>
            </yu-xform-group>
            </yu-panel>
            <yu-panel title="申请信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请金额" ctype="num" unit="元" name="appAmt" rules="required" disabled ></yu-xform-item>
                <yu-xform-item label="申请期限" ctype="input" unit="月" name="appTerm" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="报价利率"  name="offerRate" ctype="yu-num" rules="required"   placeholder="报价利率" sign="%" :multiple="100" disabled></yu-xform-item>
                <yu-xform-item label="申请执行利率"  name="appRate" ctype="yu-num" rules="required"   placeholder="申请执行利率" sign="%" :multiple="100" disabled></yu-xform-item>
                <yu-xform-item label="担保方式" ctype="select" name="guarMode" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" disabled ></yu-xform-item>
                <yu-xform-item label="担保方式说明" ctype="textarea" rules="required" name="guarDetailMode" :rows="3" :colspan="24" disabled></yu-xform-item>
                <yu-xform-item label="申请原因" ctype="textarea" rules="required" name="appReason" :rows="3" :colspan="24" disabled></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-tab-pane>

          <yu-tab-pane label="审批信息" name="basicTab1" v-if="flag">
          <yu-xform ref="refForm2" label-width="200px" v-model="formdata2" :disabled="formDisabled">
            <yu-panel title="客户信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="审批编号" ctype="input" name="serno" disabled ></yu-xform-item>
                <yu-xform-item label="客户编号" ctype="input" name="cusId" rules="required" disabled ></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" name="cusName" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="证件号码" ctype="input" name="certCode" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="所属行业" ctype="input" name="tradeClass" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="产品编号" ctype="input" name="prdId" rules="required" disabled ></yu-xform-item>
                <yu-xform-item label="产品名称" ctype="input" name="prdName" rules="required" disabled ></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="审批信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请金额" ctype="num" unit="元" name="appAmt" rules="required" disabled ></yu-xform-item>
                <yu-xform-item label="申请期限" ctype="input" unit="月" name="appTerm" rules="required" disabled></yu-xform-item>
                <yu-xform-item label="报价利率"  name="offerRate" ctype="yu-num" rules="required"   placeholder="报价利率" sign="%" :multiple="100" disabled></yu-xform-item>
                <yu-xform-item label="申请执行利率"  name="appRate" ctype="yu-num" rules="required"   placeholder="申请执行利率" sign="%" :multiple="100" disabled></yu-xform-item>
                <yu-xform-item label="担保方式" ctype="select" name="guarMode" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" disabled></yu-xform-item>
                <yu-xform-item label="批复利率" name="replyRate" ctype="yu-num" rules="required"   placeholder="批复利率" sign="%" :multiple="100" :disabled="isDisabled"></yu-xform-item>
                <yu-xform-item label="审批节点" name="approvePost" ctype="input" disabled hidden></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-xform>
            <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
           <yu-button type="primary" @click="onSave" v-show="saveBtnShow">保存</yu-button>
        </yu-form-buttons>
          </yu-tab-pane>
        </yu-tabs>
      </yu-xform>
      <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
    </div>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import mixinForm from '@/utils/mixins/mixin-list';
import imageSystem from '@/views/imageManage/imageSystem';
import { validator } from '@/utils/validate';
yufp.lookup.reg('STD_ZB_GUAR_WAY');
export default {
  mixins: [mixinForm],
  components: { yufpNwfInit, imageSystem },
  props: {
    bizPageData: Object,
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {

      activeName: 'basicTab',
      isDisabled: true,
      flag: true,
      saveBtnShow: true,
      cancelBtnShow: true,
      showPrint: true,
      formatter: function (money, num) {
        var num = num && num > 0 && num <= 20 ? num : 2;
        var money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
        var l = money.split('.')[0].split('').reverse();
        var r = money.split('.')[1];
        var t = '';
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
        }
        return t.split('').reverse().join('') + '.' + r;
      }


    };
  },
  mounted () {
    var _this = this;
    let instanceInfo = this.bizPageData.instanceInfo;
    _this.type = false;
    let op = 'VIEW';
    _this.serno = instanceInfo.bizId;
    _this.cusId = instanceInfo.bizUserId;
    _this.bizType = instanceInfo.bizType;
    _this.nodeId = instanceInfo.nodeId;
    // TODO
    _this.pageParams = {
      serno: _this.serno,
      op: op
    };
    _this.$request({
      url: _this.$backend.cmisBiz + '/api/retailprimerateapp/' + _this.serno,
      method: 'post'
    }).then(({code, message, data}) => {
      if (data) {
        yufp.clone(data, _this.formdata);
        yufp.clone(data, _this.formdata2);
        _this.formdata.approvePost = instanceInfo.nodeId;
        _this.$request({
          url: _this.$backend.cmisBiz + '/api/retailprimerateappr/selectbysernonew',
          method: 'post',
          data: {serno: _this.serno}
        }).then(({code, message, data}) => {
          if (data != null) {
            _this.formdata2.replyRate = data.replyRate;
          }
        });
      }
    });

    if (_this.nodeId == '193_7' || _this.nodeId == '193_8') {
      _this.isDisabled = false;
    }

    if (_this.nodeId == '193_7') {
      _this.formdata.replyRate = _this.formdata.appRate;
    }

    if (_this.nodeId == '193_5' || _this.nodeId == '193_6') {
      _this.flag = false;
    }
  },
  methods: {
    onSave: function (actionType) {
      var _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      this.formdata2.approvePost = this.nodeId;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/retailprimerateappr/saveinfo',
        data: this.formdata2,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.$message('保存成功');
            if (_this.$route.meta.params.op == 'ADD') {
              _this.$route.meta.params.op = 'EDIT';
            }
          } else {
            _this.$message('保存失败');
          }
        },
        error: (result, b) => {
          _this.$message('保存失败');
        }
      });
    }


  }

};
</script>