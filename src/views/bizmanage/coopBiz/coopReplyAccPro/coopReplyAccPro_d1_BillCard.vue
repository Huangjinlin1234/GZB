<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="160px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden ></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="合作方案编号" ctype="input" placeholder="合作方案编号" name="coopPlanNo" disabled hidden ></yu-xform-item>
          <yu-xform-item label="项目名称" ctype="input" name="proName" placeholder="项目名称" :on-icon-click="selectCoopReplyAccPro" icon="search"></yu-xform-item>
          <yu-xform-item label="项目编号" ctype="input" name="proNo" placeholder="项目编号" disabled  width="480" height="480" ></yu-xform-item>
          <yu-xform-item label="项目类型" ctype="select" placeholder="项目类型" name="proType" data-code="STD_COOP_PRO_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="项目额度(元)" ctype="yu-num" number-formatter="0,000.00" name="proLmt" placeholder="项目额度(元)" disabled></yu-xform-item>
          <yu-xform-item label="本次签订金额" ctype="yu-num" name="signAmt" placeholder="本次签订金额" ></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden ></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden ></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden ></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden ></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden ></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden ></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden ></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden ></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden ></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">保存</yu-button>
      <yu-button type="primary" @click="customClick('back')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_PRD_TYPE_PROP_COOP');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopreplyagrpro/update',
      addUrl: this.$backend.cmisBiz + '/api/coopreplyagrpro/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      updateFlag: false,
      filter: '',
      cpDataCode: 'STD_PRD_TYPE_PROP',
      formatter: function (money, num) {
        num = num && num > 0 && num <= 20 ? num : 2;
        money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
        let l = money.split('.')[0].split('').reverse();
        let r = money.split('.')[1];
        let t = '';
        for (let i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
        }
        return t.split('').reverse().join('') + '.' + r;
      }
    };
  },
  mounted () {
    let operate = this.pageParams.operate;
    this.updateFlag = operate === 'UPDATE';
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.createTime = new Date();
    },
    prdChangeFn: function (prdId) {
      const _this = this;
      _this.$xutils.request({
        // 同步请求
        // async: false,
        type: 'GET',
        url: this.$backend.cmisCfg + '/api/cfgprdtypeproperties/',
        data: {prdId: prdId},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // _this.prdNo = response.data.exit;
            _this.filter = response.data.rtnData;
            _this.$nextTick(() => {
              _this.cpDataCode = 'STD_PRD_TYPE_PROP';
            });
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 批复台账-项目信息
    selectCoopReplyAccPro () {
      var _this = this;
      let params = {};
      params['coopPlanNo'] = _this.formdata.coopPlanNo;
      this.$dialog.open('项目信息', 'bizmanage/coopBiz/coopReplyAccPro/coopReplyAccProSelectIndex', 1000, 600, params, function (rowData) {
        // yufp.clone(rowData, _this.formdata);
        _this.formdata.proName = rowData.proName;
        _this.formdata.proNo = rowData.proNo;
        _this.formdata.proType = rowData.proType;
        _this.formdata.proLmt = rowData.proLmt;
        _this.formdata.replyNo = rowData.replyNo;
      });
    }
  }
};
</script>
