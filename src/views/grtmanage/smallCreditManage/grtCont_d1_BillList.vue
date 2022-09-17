<template>
  <div>
    <yu-panel title="担保合同列表信息" padding-top :collapseHide="false">
        <yu-button-drop show-length="8">
          <yu-button type="primary" ref="btn_OnImport" @click="customClick('OnImport')"  v-show="showAble">引入</yu-button>
          <yu-button type="primary" ref="btn_offImport" @click="customClick('offImport')" v-show="showAble">取消引入</yu-button>
          <yu-button type="primary" ref="btn_insert" @click="customClick('insert')" v-show="showAble">新增</yu-button>
          <yu-button type="primary" ref="btn_update" @click="customClick('update')" v-show="showAble">修改</yu-button>
          <yu-button type="primary" ref="btn_Ondelete" @click="customClick('Ondelete')" v-show="showAble">删除</yu-button>
          <yu-button type="primary" ref="btn_check" @click="customClick('check')">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" :default-sort="{prop:'guarContNo,guarContType,guarWay,guarAmt,guarContState,guarType',order:'descending'}" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="searchData" request-type="post" :default-load="false">
        <yu-xtable-column label="担保合同编号" prop="guarContNo" sortable></yu-xtable-column>
        <yu-xtable-column label="是否授信项下" prop="isUnderLmt" data-code="STD_ZB_YES_NO" sortable></yu-xtable-column>
        <yu-xtable-column label="是否追加担保" prop="isSuperaddGuar" data-code="STD_ZB_YES_NO" sortable></yu-xtable-column>
        <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE" sortable></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY" sortable></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="guarAmt" width="100" sortable></yu-xtable-column>
        <yu-xtable-column label="担保起始日" prop="guarStartDate" sortable></yu-xtable-column>
        <yu-xtable-column label="担保到期日" prop="guarEndDate" sortable></yu-xtable-column>
        <yu-xtable-column label="担保合同状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE" sortable></yu-xtable-column>
        <yu-xtable-column label="纸质合同签订日期" prop="signDate" ctype="datepicker" value-format="yyyy-MM-dd" :disabled="viewType=='VIEW'" @change="saveSignDate"></yu-xtable-column>
      </yu-xtable>
      <yu-form-buttons class="yubfp-button-group" style="text-align: center">
      <yu-button type="primary" ref="btn_sign" @click="customClick('sign')" v-show="showAble2">签订</yu-button>
      </yu-form-buttons>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import { lookup} from '@/utils';
lookup.reg('STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_GUAR_CONT_STATE,STD_GUAR_TYPE');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      searchData: {},
      showAble: false,
      showAble1: false,
      showAble2: false,
      dataUrl: this.$backend.cmisBiz + '/api/grtguarcont/selectguarcontbycontNo',
      baseParams: {}
    };
  },
  mounted () {
    var data = {};
    if (this.pageParams) {
      data = this.pageParams;
      data.iqpSerno = this.pageParams.iqpSerno;
    }
    if (!data.iqpSerno && this.$route.meta.params) {
      data = this.$route.meta.params;
      // 页签打开的时候，iqpSerno不存在的话取serno，借款合同可能传值为serno
      if (!data.iqpSerno) {
        data.iqpSerno = data.serno;
      }
    }
    if (!data.iqpSerno && this.getFactory().contextData.instanceInfo) {
      data = this.getFactory().contextData.instanceInfo;
      data.iqpSerno = data.bizId;
    }
    if (!data.iqpSerno && this.getFactory().contextData) {
      data = this.getFactory().contextData;
    }
    if (data.op == 'UPDATE' || data.op == 'EDIT' || data.op == 'ADD') {
      this.showAble = true;
    }
    // 刷新数据//查询条件改变时,会默认刷新页面

    this.searchData = {condition: {
      serno: data.iqpSerno ? data.iqpSerno : data.biz_serno
    }};
    this.showAble2 = this.pageParams ? this.pageParams.showable : false;
  },

  methods: {
    // 隐藏最高额按钮
    setHidden (data) {
      this.showAble1 = data;
    },
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
