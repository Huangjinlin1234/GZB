<template>
  <!--
    @created by
    @updated by  2018-8-16 修改代码规范
    @updated by  2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="批量转让申请" name="base">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search" v-model="formdata" label-width="80px">
              <yu-xform-group :column="2">
                <yu-xform-item label="转让协议编号" placeholder="模糊查询" fuzzy-query="both" name="takeoverAgrNo" ></yu-xform-item>
                <yu-xform-item label="业务流水号" placeholder="" name="ptaiSerno"></yu-xform-item>
                <yu-xform-item label="登记日期" placeholder="" name="inputDate" ctype="datepicker"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel title="批量转让列表" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
          <yu-button-drop>
            <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
            <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
            <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button type="primary" @click="mainLogFn" v-if="checkCtrl('regiCharge')">核心登记</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams1" selection-type="radio" requestType="POST">
            <yu-xtable-column width="130" align="center" label="业务流水号" prop="ptaiSerno" ></yu-xtable-column>
            <yu-xtable-column align="center" label="转让协议编号" prop="takeoverAgrNo" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="受让人名称" prop="toppName" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让总对价" prop="takeoverTotalPrice" width="120"></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="转让方式" prop="takeoverMode" data-code="STD_TAKEOVER_MODE"></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="总户数" prop="totalTakeoverCus"></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="贷款余额合计" prop="loanBalance" :formatter="Currency" ></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="欠息金额合计" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="资产转让金额" prop="takeoverTotlAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="交易基准日期" prop="tranBaseDate"></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="登记状态" prop="regiStatus" data-code="STD_REGI_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="批量转让申请历史" name="two">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refHisTable" form-type="search" v-model="formdata" label-width="80px">
              <yu-xform-group :column="2">
                <yu-xform-item label="转让协议编号" placeholder="模糊查询" fuzzy-query="both" name="takeoverAgrNo" ></yu-xform-item>
                <yu-xform-item label="业务流水号" name="ptaiSerno"></yu-xform-item>
                <yu-xform-item label="登记日期" placeholder="" name="inputDate" ctype="datepicker"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel title="批量申请列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
          <yu-button-drop>
            <yu-button type="primary" @click="infoHisFn" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button type="primary" @click="rectFn" v-if="checkCtrl('rush')">登记冲正</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refHisTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams2" selection-type="radio" requestType="POST">
            <yu-xtable-column width="130"  align="center" label="业务流水号" prop="ptaiSerno"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让协议编号" prop="takeoverAgrNo" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="受让人名称" prop="toppName" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让总对价" prop="takeoverTotalPrice" width="120"></yu-xtable-column>
            <yu-xtable-column width="130"  align="center" label="转让方式" prop="takeoverMode" data-code="STD_TAKEOVER_MODE"></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="总户数" prop="totalTakeoverCus"></yu-xtable-column>
            <yu-xtable-column width="130"  align="center" label="币种" prop="curType"  data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column width="130"  align="center" label="贷款余额合计" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column width="130"  align="center" label="欠息金额合计" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column width="130"  align="center" label="资产转让金额" prop="takeoverTotlAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column width="130"  align="center" label="交易基准日期" prop="tranBaseDate"></yu-xtable-column>
            <yu-xtable-column width="130"  align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column width="130"  align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column width="130"  align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column width="130"  align="center" label="登记状态" prop="regiStatus" data-code="STD_REGI_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>

<script>
import mixinList from '@/utils/mixins/mixin-list';
import mixin from '@/utils/mixin';
// 注册字典项
yufp.lookup.reg('STD_REGI_STATUS,STD_ZB_CUR_TYP,STD_TAKEOVER_MODE,STD_RECORD_STATUS');
export default {
  mixins: [mixin, mixinList],
  data: function () {
    return {
      formdata: {},
      // docTypeOptions: [
      //   {key: '01', value: '未登记'},
      //   // {key:"03", value:"登记中"},
      //   {key: '04', value: '登记失败'}
      // ],
      // typeOptions: [
      //   {key: '02', value: '已登记'}
      // ],
      activeName: 'base',
      dataUrl: backend.cmisNpam + '/api/platakeoverappinfo/queryAll',
      baseParams1: {condition: { regiStatus: '01,03,04', transferType: '02'}, sort: 'createTime desc'},
      baseParams2: {condition: JSON.stringify({ regiStatus: '02', transferType: '02'}), sort: 'createTime desc'}
    };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  methods: {
    /**
    *登记冲正
     */
    rectFn () {
      var _this = this;
      if (!_this.$refs.refHisTable.selections.length) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var data = _this.$refs.refHisTable.selections[0];
      // 向后台发送核心
      yufp.service.request({
        method: 'POST',
        async: true,
        url: this.$backend.cmisNpam + '/api/platakeoverappinfo/DJCZ',
        data: data,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message(response.message);
            _this.$refs.refHisTable.remoteData();
          } else {
            _this.$message({ showClose: true, message: message, type: 'error' });
          }
        }
      });
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/plaTokeOvers/plaTokeOversGuide',
        // 自定义唯一页签key
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '批量转让新增向导',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          ptaiSerno: this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ'),
          viewType: 'ADD'
          // takeoverAgrNo: this.$xutils.getDefaultformulaData('SEQ:ZCBQ_XYBH')
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var ptaiSerno = _this.$refs.refTable.selections[0].ptaiSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/plaTokeOvers/plaTokeOversDetil',
        key: 'editplaLawBroke' + new Date().getTime(), // 必传
        title: '批量转让修改',
        data: {
          ptaiSerno: ptaiSerno,
          viewType: 'EDIT',
          getReturn: _this.getReturn
        }
      });
    },

    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var ptaiSerno = _this.$refs.refTable.selections[0].ptaiSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/plaTokeOvers/plaTokeOversDetil',
        key: 'plaTokeOversDetil' + new Date().getTime(), // 必传
        title: '批量转让详情',
        data: {
          ptaiSerno: ptaiSerno,
          viewType: 'DETAIL',
          getReturn: _this.getReturn
        }
      });
    },
    /* 历史查看 */
    infoHisFn () {
      var _this = this;
      if (_this.$refs.refHisTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var ptaiSerno = _this.$refs.refHisTable.selections[0].ptaiSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/plaTokeOvers/plaTokeOversDetil',
        key: 'detailplaLawBroke' + new Date().getTime(), // 必传
        title: '批量转让详情',
        data: {
          ptaiSerno: ptaiSerno,
          viewType: 'DETAIL',
          getReturn: _this.getReturn
        }
      });
    },

    /*
     核心登记
     */
    mainLogFn () {
      var _this = this;
      if (!_this.$refs.refTable.selections.length) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      // 选中的数据
      var select = _this.$refs.refTable.selections[0];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/platakeoverappinfo/transferReg',
        data: select,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message.success('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
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
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/platakeoverappinfo/delete/' + selectionsAry[0].ptaiSerno,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.getReturn;
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    }
  }
};
</script>
