<template>
  <div>
    <yu-panel title="担保合同信息(对公)">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_OnImport" @click="customClick('OnImport')">引入</yu-button>
          <yu-button ref="btn_offImport" @click="customClick('offImport')">取消引入</yu-button>
          <yu-button ref="btn_insert" @click="customClick('insert')">新增</yu-button>
          <yu-button ref="btn_update" @click="customClick('update')">修改</yu-button>
          <yu-button ref="btn_Ondelete" @click="customClick('Ondelete')">删除</yu-button>
          <yu-button ref="btn_check" @click="customClick('check')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true" :page-params="pageParams" request-type="POST">
        <yu-xtable-column label="担保合同编号 " prop="guarContNo"></yu-xtable-column>
        <yu-xtable-column label="是否授信项下" prop="isUnderLmt" width="110"></yu-xtable-column>
        <yu-xtable-column label="是否追加担保" prop="isSuperaddGuar"></yu-xtable-column>
        <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="担保合同金额" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="担保起始日" prop="guarStartDate"></yu-xtable-column>
        <yu-xtable-column label="担保到期日" prop="guarEndDate"></yu-xtable-column>
        <yu-xtable-column label="担保合同状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
        <yu-xtable-column label="纸质合同签订日期" prop="signDate" ctype="datepicker" value-format="yyyy-MM-dd" :disabled="viewType=='VIEW'" @change="saveSignDate"></yu-xtable-column>
      </yu-xtable>
      <yu-form-buttons class="yubfp-button-group" style="text-align: center">
        <yu-button ref="btn_sign" @click="customClick('sign')" v-show="showAble">签订</yu-button>
      </yu-form-buttons>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pkField: 'guarPkId',
      dialogTitle: '新增',
      dialogVisible: false,
      showAble: false,
      formType: 'ADD',
      serno: '',
      dataUrl: this.$backend.cmisBiz + '/api/grtguarbizrstrel/querygrtguarcontbycontno',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/grtguarcont/delete/'
    };
  },
  created () {
    var _this = this;
    let obj = _this.getFactory().contextData;
    if (_this.pageParams) {
      _this.serno = _this.pageParams.serno;
    } else if (_this.getFactory().contextData.serno) {
      _this.serno = _this.getFactory().contextData.serno;
    } else if (_this.$route.meta.params) {
      _this.serno = _this.$route.meta.params.serno;
    } else if (obj.pvpSerno) {
      // 出账申请流水号
      _this.serno = obj.pvpSerno;
    } else if (obj.grpSerno) {
      // 集团授信申请流水号
      _this.serno = obj.grpSerno;
    } else if (obj.biz_serno) {
      _this.serno = obj.biz_serno;
    } else if (obj.bizSerno) {
      _this.serno = obj.bizSerno;
    }
    this.baseParams = {
      serno: _this.serno
    };
    _this.showAble = _this.pageParams.showable;
  },
  mounted () {

  },
  methods: {
    saveSignDate () {
      let jsoRt = null;
      var jsoCardData = this.$refs.refTable.selections[0]; // 先取得表单的数据
      this.$request({
        url: `${backend.cmisBiz}/api/grtguarcont/update1`,
        method: 'post',
        data: jsoCardData,
        async: false,
        success: (response) => {
          if (response.code == '0') {
            jsoRt = response;
            this.$message('更新成功!');
            // 回调数据
            this.pageParams.callback && this.pageParams.callback();
          }
        },
        error: () => {
          // 处理请求失败的情况
          this.$message({ message: '更新失败', type: 'error' });
        }
      });
      return jsoRt;
    }
  }
};
</script>
