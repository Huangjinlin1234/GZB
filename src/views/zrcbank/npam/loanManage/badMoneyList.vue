
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" label-width="80px">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户名称" placeholder="模糊匹配" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户编号" placeholder="精确匹配" name="cusId" ></yu-xform-item>
            <yu-xform-item label="交易编号"  name="tranId" ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="非信贷不良资产台账列表" :hideFilter="false" :collapseHide="false">
      <div>
        <yu-button type="primary" @click="addFn" style="float:left" v-if="checkCtrl('add')">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" style="float:left" v-if="checkCtrl('edit')">修改</yu-button>
        <yu-button type="primary" @click="deleteFn" style="float:left" v-if="checkCtrl('delete')">删除</yu-button>
        <yu-button type="primary" @click="infoFn" style="float:left" v-if="checkCtrl('view')">查看</yu-button>
        <yufp-excel-import type="primary" :import-url="excelImportUrl" :biz-data-params="bizDataParams" title="Excel导入" :async="false" max-file-size="10" @import-success="doAutoQuery" v-if="checkCtrl('import')"></yufp-excel-import>
        <yufp-excel-export type="primary" :export-url="exportTemplateUrl" title="模板下载"  v-if="checkCtrl('donwload')"></yufp-excel-export>
      </div>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="{sort:'createTime desc'}" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="关联流水号" prop="pubaalSerno" v-if="false"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="交易编号" prop="tranId"></yu-xtable-column>
        <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column align="center" label="交易金额" prop="tranAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="投资资产名称" prop="investAssetName"></yu-xtable-column>
        <yu-xtable-column align="center" label="交易品种名称" prop="tranBizName"></yu-xtable-column>
        <yu-xtable-column align="center" label="交易成交日期" prop="tranDealDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="交易到期日期" prop="tranEndDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="处置方式" prop="dispMode" data-code="STD_DISP_TYPE"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_DISP_TYPE');
// 获取仓库数据
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  components: { YufpExcelExport, YufpExcelImport },
  data: function () {
    return {
      dataUrl: backend.cmisNpam + '/api/plauncretbadassetacclist/queryAll',
      exportTemplateUrl: backend.cmisNpam + '/api/plauncretbadassetacclist/exportPlaUncretBad',
      excelImportUrl: backend.cmisNpam + '/api/plauncretbadassetacclist/importPlaUncretBad',
      // bizDataParams: {pubaalSerno: this.$route.meta.params.pubaalSerno},
      viewType: ''
    };
  },
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  methods: {
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/loanManage/badMoneyListShow',
        // 自定义唯一页签key
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '非信贷不良资产新增',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'ADD',
          pubaalSerno: this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ')
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      var pubaalSerno = selectionsAry[0].pubaalSerno;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/loanManage/badMoneyListShow',
        // 自定义唯一页签key
        key: 'cfgAssistantUpdate' + new Date().getTime(), // 必传
        // 页签名称
        title: '维护页面',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'EDIT',
          pubaalSerno: pubaalSerno
        }
      });
    },

    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      var pubaalSerno = selectionsAry[0].pubaalSerno;
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/loanManage/badMoneyListShow',
        // 自定义唯一页签key
        key: 'cfgAssistant' + new Date().getTime(), // 必传
        // 页签名称
        title: '查看页面',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          pubaalSerno: pubaalSerno
        }
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      var pubaalSerno = selectionsAry[0].pubaalSerno;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plauncretbadassetacclist/delete/' + pubaalSerno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message.success('操作成功');
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    },
    // 导入成功 重新刷新列表
    doAutoQuery () {
      this.$refs.refTable.remoteData();
    }
  }
};
</script>
