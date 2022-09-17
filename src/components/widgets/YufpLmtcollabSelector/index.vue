<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width">
      <yu-panel title="合作方分项/项目额度">
        <yu-xform related-table-name="cusLmtTable" form-type="search" v-model="searchForInfo" label-width="100px">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
            <yu-xform-item label="合作方类型" name="copType" ctype="select" data-code="STD_PARTNER_TYPE"></yu-xform-item>
            <yu-xform-item label="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="cusLmtTable" row-number condition-key="condition" row-key="pkId" :data-url="urls.coopSubInfoUrl" :base-params="Param" request-type="POST">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="合作方类型" prop="copType" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="分项编号" prop="apprSubSerno"></yu-xtable-column>
          <yu-xtable-column label="项目名称" prop="limitSubName"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="lmtBizTyprProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
          <yu-xtable-column label="批复编号" prop="apprSerno"></yu-xtable-column>
          <yu-xtable-column label="额度起始日" prop="startDate" width="100"></yu-xtable-column>
          <yu-xtable-column label="额度到期日" prop="endDate" width="120"></yu-xtable-column>
          <yu-xtable-column label="额度状态" prop="status" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
          <yu-xtable-column label="是否可循环" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column label="单户限额" prop="sigAmt" width="110"></yu-xtable-column>
          <yu-xtable-column label="单笔业务限额" prop="sigBussAmt" width="110"></yu-xtable-column>
          <yu-xtable-column label="授信总额" prop="avlAmt"></yu-xtable-column>
          <yu-xtable-column label="授信总额已用" prop="outstndAmt"></yu-xtable-column>
          <yu-xtable-column label="授信总额可用" prop="createAt">
            <template slot-scope="scope">
              <span>{{ scope.row.avlAmt - scope.row.outstndAmt }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerId"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrId"></yu-xtable-column>
        </yu-xtable>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="backToAdd">选取返回</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancel">取消</yu-button>
        </div>
      </yu-panel>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" request-type="post" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import * as xutil from '@/utils/xutils';
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
export default {
  name: 'YufpLmtcollabSelector',
  componentName: 'YufpLmtcollabSelector',
  mixins: [popList],
  data: function () {
    return {
      searchFormdata: {},
      searchForInfo: {},
      urls: {
        coopSubInfoUrl: backend.cmisLmt + '/api/apprcoopsubinfo/queryListByCusIdAndCopType'
      },
      formdata: {},
      saveBtnShow: true
    };
  },
  mounted: function () {
    debugger;
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      debugger;
      _this.data = this.dataParams;
      _this.cusId = this.data.cusId;
      _this.instuCde = this.data.instuCde;
      _this.copType = this.data.copType;
      _this.cusName = this.data.cusName;
      _this.urls.coopSubInfoUrl =
        backend.cmisLmt + '/api/apprcoopsubinfo/queryListByCusIdAndCopType';
      _this.Param = { condition: JSON.stringify({ cusId: _this.cusId, copType: _this.copType, instuCde: _this.instuCde, cusName: _this.cusName }) };
    },
    /**
     * 选取返回
     */
    backToAdd () {
      var _this = this;
      if (_this.$refs.cusLmtTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const params = _this.$refs.cusLmtTable.selections[0];
      this.$emit('select-fn', params);
      this.visiable = false;
    },
    /**
     * 取消
     */
    cancel () {
      this.visiable = false;
    }
  }
};
</script>
