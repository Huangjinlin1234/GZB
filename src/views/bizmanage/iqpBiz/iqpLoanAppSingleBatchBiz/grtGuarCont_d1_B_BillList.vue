<template>
  <div>
    <yu-panel title="保证人列表" panel-type="normal">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_OnImport" type="primary" @click="customClick('onAddBZ')" :hidden="btnflag">新增</yu-button>
          <!-- 
            <yu-button ref="btn_OnImport" @click="customClick('OnImportGuar')" :hidden="btnflag">引入</yu-button>
          -->
          <!-- 
            <yu-button ref="btn_OnImport2" @click="customClick('doUpdateGuarantee')" :hidden="btnflag">修改</yu-button>
          --> 
          <yu-button ref="btn_OnImport3" type="primary" @click="customClick('doViewGuarantee')" >查看</yu-button>
          <yu-button ref="btn_delete" type="primary" @click="customClick('delete')" :hidden="btnflag">删除</yu-button>
          <yu-button type="primary" @click="customClick('freshList')">刷新</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable v-if="btnflag" ref="refTable" row-number condition-key="condition" :default-sort="{prop:'guarantyId',order:'descending'}" selection-type="radio"  :base-params="searchData" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :default-load="true" request-type="POST" :data-url="dataUrl">
        <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
        <yu-xtable-column label="担保编号" prop="guarantyId" sortable></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="保证人客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="保证人名称" prop="assureName"></yu-xtable-column>
        <yu-xtable-column label="保证人证件类型" prop="cerType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="保证人证件号码" prop="assureCertCode"></yu-xtable-column>
        <yu-xtable-column label="保证方式" prop="guarantyType" data-code="STD_ZB_GUARANTY_TYPE" ></yu-xtable-column>
        <yu-xtable-column label="担保金额(元)" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="担保标识" prop="isAddGuar" data-code="STD_GUAR_TYPE"></yu-xtable-column>
      </yu-xtable>
      <yu-xtable v-else ref="refTable" row-number condition-key="condition" :default-sort="{prop:'guarantyId',order:'descending'}" selection-type="radio"  :base-params="searchData" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :default-load="true" request-type="POST" :data-url="dataUrl">
        <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
        <yu-xtable-column label="担保编号" prop="guarantyId" sortable></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="保证人客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="保证人名称" prop="assureName"></yu-xtable-column>
        <yu-xtable-column label="保证人证件类型" prop="cerType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="保证人证件号码" prop="assureCertCode"></yu-xtable-column>
        <yu-xtable-column label="保证方式" ctype="select" prop="guarantyType" data-code="STD_ZB_GUARANTY_TYPE" ></yu-xtable-column>
        <yu-xtable-column label="担保金额(元)" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="担保标识" ctype="select" prop="isAddGuar" data-code="STD_GUAR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="操作">
            <template slot-scope="scope">
                <el-link type="primary" @click="save(scope.row)">保存</el-link>
            </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BBillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    iqpSerno: null,
    dialogId: String,
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
      searchData: {condition: {
        serno: this.$route.params.hasOwnProperty('iqpSerno') ? this.$route.params.iqpSerno : this.node.iqpSerno
      }},
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      btnflag: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarguarantee/querguaranteerel',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarguarantee/deleteGuaranteefoSell/'
    };
  },
  mounted () {
    var _this = this;
    var op = _this.$route.params.hasOwnProperty('op') ? _this.$route.params.op : 'VIEW';
    if (op != 'EDIT') {
      this.btnflag = true;
    }
  },
  methods: {
    // 保证人保存
    save (row) {
      var _this = this;
      var model = {};
      yufp.clone(row, model);
      _this.$xutils.request({
        type: 'POST',
        url: _this.$backend.cmisBiz + '/api/guarbizrel/updateguarinforelGuarantee',
        data: model,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            _this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              _this.$refs.refTable.remoteData();
            });
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>