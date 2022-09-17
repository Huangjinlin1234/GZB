<template>
  <yu-xform ref="refForm" label-width="200px" v-model="formdata" related-table-name="refTable" :rules="formRules">
    <yu-panel title="基本信息" panel-type="simple">
      <yu-xform-group :column="2" v-if="showCus">
        <yu-xform-item label="委托人/原始权益人名称" placeholder="委托人/原始权益人名称" name="cusName" ctype="input" disabled :rules="rule[0]">></yu-xform-item>
        <yu-xform-item label="委托人/原始权益人编号" placeholder="委托人/原始权益人编号" name="cusId" ctype="input" disabled :rules="rule[0]">></yu-xform-item>
      </yu-xform-group>
      <yu-xform-group :column="2" v-else>
        <yu-xform-item label="机构名称" placeholder="机构名称" name="cusName" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" disabled></yu-xform-item>
      </yu-xform-group>
      <yu-xform-group :column="2">
        <yu-xform-item label="企业性质" name="regiType" width="120" ctype="select" data-code="STD_ZB_REG_TYPE" disabled></yu-xform-item>
        <yu-xform-item label="注册登记地" ctype="yu-xdic-tree-addr" placeholder="注册登记地" name="regiAreaCode" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '3'}" :selectionType="radio" disabled></yu-xform-item>
        <yu-xform-item label="实际控制人" placeholder="实际控制人" name="realOperCusName" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="是否城投" placeholder="是否城投" name="isCtinve" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]" :disabled="!saveBtnShow"></yu-xform-item>
      </yu-xform-group>
    </yu-panel>

    <yu-panel title="外部评级" panel-type="simple">
      <yu-xform-group :column="2">
        <yu-xform-item label="评级结果" placeholder="评级结果" name="evalResultOuter" ctype="select" disabled data-code="STD_ZB_EVAL_RST"></yu-xform-item>
        <yu-xform-item label="评级时间" placeholder="评级时间" name="evalTimOuter" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="评级机构" placeholder="评级机构" name="evalOrgOuter" ctype="select" data-code="STD_ZB_OUT_APPR_ORG" disabled></yu-xform-item>
      </yu-xform-group>
    </yu-panel>

    <yu-panel title="内部评级" panel-type="simple">
      <yu-xform-group :column="2">
        <yu-xform-item label="评级结果" placeholder="评级结果" name="evalResultInner" ctype="select" data-code="STD_ZB_GRADE_RANK" disabled></yu-xform-item>
        <yu-xform-item label="评级时间" placeholder="评级时间" name="evalTimeInner" ctype="datepicker" disabled></yu-xform-item>
      </yu-xform-group>
    </yu-panel>
    <yu-panel title="城投评级（城投必填）" panel-type="simple">
      <yu-xform-group :column="2">
        <yu-xform-item label="评级结果" placeholder="评级结果" name="evalResultCtinve" ctype="input" :disabled="isCtinve"></yu-xform-item>
        <yu-xform-item label="评级时间" placeholder="评级时间" name="evalTimeCtinve" ctype="datepicker" :disabled="isCtinve"></yu-xform-item>
      </yu-xform-group>
      <div style="margin-left:200px;">城投评级信息请到影像资料中查看</div>
    </yu-panel>
    <yu-panel title="股权情况" panel-type="simple">
      <yu-xtable ref="refTable" condition-key="condition" selection-type="radio" row-number :data-url="dataUrl" :base-params="Param" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
        <yu-xtable-column label="客户名称" prop="shdCusName" width=""></yu-xtable-column>
        <yu-xtable-column label="持股比例" prop="shdPerc" width="180">
          <template slot-scope="scope">
            <span>{{ parseFloat(parseFloat(scope.row.shdPerc * 100).toFixed(2)) }}%</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="企业性质" prop="corpCha" width="120" data-code="STD_ZB_INVT_TYP" ></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="shdCusId" width="200"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
      <yu-button  type="primary" @click="cancelFn">返回</yu-button>
    </div>
  </yu-xform>

</template>
<script>
yufp.lookup.reg(
  'STD_ZB_CUR_TYP,STD_ZB_REG_TYPE,STD_ZB_EVAL_RST,STD_ZB_GRADE_RANK,STD_ZB_CUS_TYP,STD_ZB_YES_NO,STD_ZB_CORP_QLTY,STD_ZB_LEVEL_ORG,STD_ZB_INVT_TYP,STD_ZB_CORP_OWNERS'
);
import mixinForm from '@/utils/mixins/mixin-form';
// 企业法人信息
export default {
  mixins: [mixinForm],
  props: {
    children: Object,
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dataUrl: '',
      Param: {},
      formdata: {},
      isCtinve: true,
      showCus: false,
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
      ]
    };
  },
  created () {
    console.log('=========bussiness', this.children);
    let serno, cusId, op;
    if (this.children) {
      let basicSernoFlag = this.children.basicSernoFlag;
      if (basicSernoFlag) {
        this.serno = serno = this.children.basicSerno;
        this.cusId = cusId = this.children.basicCusId;
      } else {
        this.serno = serno = this.children.serno;
        this.cusId = cusId = this.children.cusId;
      }
      op = this.children.op;
    } else if (this.pageParams.serno) {
      this.serno = serno = this.pageParams.serno;
      this.cusId = cusId = this.pageParams.cusId;
      op = this.pageParams.op;
    } else if (this.$route.meta.params) {
      this.serno = serno = this.$route.meta.params.serno;
      this.cusId = cusId = this.$route.meta.params.cusId;
      op = this.$route.meta.params.op;
    }
    this.dataUrl = backend.cmisBiz + '/api/lmtappcorreshd/selectByModel';
    this.Param = {
      condition: JSON.stringify({
        serno: serno,
        cusId: cusId
      })
    };
    op == 'EDIT' ? this.saveBtnShow = true : this.saveBtnShow = false;
    try {
      this.children.showCus ? this.showCus = true : this.showCus = false;
    } catch (e) {}
    this.getDetails(serno, cusId);
  },
  watch: {
    'formdata.isCtinve': function (val) {
      console.log('=========', val);
      if (val == '1') {
        this.isCtinve = false;
        this.formRules = {
          evalResultCtinve: [
            {
              required: true,
              message: '请输入评级结果',
              trigger: 'blur'
            }
          ],
          evalTimeCtinve: [
            {
              required: true,
              message: '请输入评级时间',
              trigger: 'blur'
            }
          ]
        };
      } else {
        this.isCtinve = true;
        this.formRules = {};
      }
    }
  },
  mounted () {},
  methods: {
    getDetails (serno, cusId) {
      var _this = this;
      _this
        .$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtapprelcusinfo/selectBySerno',
          data: {
            serno: serno,
            cusId: cusId
          }
        })
        .then((data) => {
          if (data.code == '0') {
            yufp.clone(data.data, _this.formdata);
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        });
    },
    saveFn: function () {
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
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      model.serno = this.serno;
      var updateurl = backend.cmisBiz + '/api/lmtapprelcusinfo/updateQyxx';
      yufp.service.request({
        method: 'POST',
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (code == '0') {
            // _this.$refs.refTable.remoteData();
            _this.$message('修改成功');
          } else {
            _this.$message({ message: '修改失败', type: 'error' });
          }
        }
      });
    },
    // 返回
    cancelFn () {
      this.$emit('changed', false);

      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
