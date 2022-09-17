<template>
  <!--
    @created by 张亮
    @description 房抵e点贷授信押品详情
  -->
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="是否预授信额度" ctype="select" name="isPreLmt" disabled data-code="STD_ZB_YES_NO" placeholder="是否预授信额度" :colspan="12"></yu-xform-item>
          <yu-xform-item label="是否循环额度" ctype="select" name="isRevolvLimit" disabled data-code="STD_ZB_YES_NO" placeholder="是否循环额度" :colspan="12"></yu-xform-item>
          <yu-xform-item label="授信额度(元)" ctype="yu-num" number-formatter="0,000.00" name="lmtAmt" rules="required" placeholder="授信金额" disabled></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarMode" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" :colspan="12"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onBack">返回</yu-button>
    </yu-form-buttons>
    </div>
    <div>
        <yu-button-drop>
          <yu-button @click="viewSubPrd">查看</yu-button>
        </yu-button-drop>
      <yu-xtable :data="lmtAppSubPrdList" ref="refPrdTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :default-load="true">
        <yu-xtable-column label="授信分项流水号" prop="subPrdSerno"></yu-xtable-column>
        <yu-xtable-column label="授信品种" prop="lmtBizTypeName"></yu-xtable-column>
        <yu-xtable-column label="授信品种类型属性" prop="lmtBizTypeProp" data-code="STD_PRD_TYPE_PROP" ></yu-xtable-column>
        <yu-xtable-column label="分项流水号" prop="subSerno" hide-column></yu-xtable-column>
        <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
        <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="授信额度（元）" prop="lmtAmt" :formatter="Currency" ></yu-xtable-column>
        <yu-xtable-column label="额度期限（月）" prop="lmtTerm"></yu-xtable-column>
      </yu-xtable>
    </div>
  </div>
</template>

<script>
yufp.lookup.reg('STD_PRD_TYPE_PROP,STD_ZB_YES_NO,STD_ZB_GUAR_WAY,STD_ZB_GUAR_WAY');
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixin from '@/utils/mixin';
export default {
  components: { YufpDemoSelector},
  mixins: [mixin],
  data: function () {
    return {
      isDisabled: false,
      isButShow: false,
      lmtAppSubPrdList: [],
      subSerno: '',
      formdata: {}
    };
  },
  mounted () {
    var _this = this;
    let data = {};
    // var subSerno = '';
    var op = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      _this.subSerno = data.bizId;
      op = data.param.op;
      _this.isShowBtn = true;
    } else {
      data = _this.$route.meta.params;
      _this.subSerno = data.subSerno;
      op = data.op;
    }
    // 进入初始化
    if (op == 'VIEW') {
      this.isDisabled = true;
      this.isButShow = false;
    } else if (op == 'EDIT') {
      this.isDisabled = false;
      this.isButShow = true;
    }
    this.innitFrom(_this.subSerno);
    this.innitSubPrdTable(_this.subSerno);
  },
  methods: {
    innitFrom: function (subSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtappsub/getbysubserno',
        data: subSerno,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata);
            _this.lmtAmt = response.data.lmtAmt;
            _this.getFactory().triggerAction({
              'guarModel': response.data.guarMode
            });
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    /**
     * 初始化授信适用产品列表
     */
    innitSubPrdTable: function (subSerno) {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtappsubprd/selectbysubserno',
        data: _this.formdata.subSerno,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.lmtAppSubPrdList = response.data;
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    /**
     * 跳转到授信适用产品查看页面
     */
    viewSubPrd: function () {
      var _this = this;
      var rowData = _this.$refs.refPrdTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      rowData['op'] = 'VIEW';
      rowData['subPrdSerno'] = rowData[0].subPrdSerno;
      rowData['editAble'] = true;
      rowData['model_group_no'] = 'CMG000700';
      rowData['isPreLmt'] = rowData[0].isPreLmt;
      rowData['subSerno'] = _this.subSerno;
      this.$dialog.open(
        '单一客户授信申报',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1600,
        800,
        rowData,
        null,
        true,
        true
      );
    },

    /**
     * 关闭当前页面
     */
    onBack: function () {
      yufp.router.removeTab(this.$route.path);
    }
  }

};

</script>
