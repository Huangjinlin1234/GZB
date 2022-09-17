<template>
  <div>
          <yu-panel title="催收基本信息" :hideFilter="false" :collapseHide="false">
              <yu-xform v-model="searchFormdata" label-width="140px">
                 <yu-xform-group :column="2">
                   <yu-xform-item label="任务编号" name="taskNo" disabled></yu-xform-item>
                   <yu-xform-item label="客户编号" name="cusId" disabled></yu-xform-item>
                   <yu-xform-item label="客户名称" name="cusName" disabled></yu-xform-item>
                   <yu-xform-item label="正常本金(元)" name="zcbjAmt" disabled ctype="num" number-formatter="0,000.00"></yu-xform-item>
                   <yu-xform-item label="逾期本金(元)" name="overdueCapAmt" disabled ctype="num" number-formatter="0,000.00"></yu-xform-item>
                   <yu-xform-item label="拖欠利息总额(元)" name="totalTqlxAmt" disabled ctype="num" number-formatter="0,000.00"></yu-xform-item>
                   <yu-xform-item label="任务标识" name="taskFlag" ctype="select" data-code="STD_TASK_FLAG" disabled></yu-xform-item>
                   <yu-xform-item label="任务生成日期" name="createDate" disabled></yu-xform-item>
                   <yu-xform-item label="任务要求完成日期" name="finishDate" disabled ></yu-xform-item>
                   <yu-xform-item label="催收责任人" name="managerIdName" disabled></yu-xform-item>
                   <yu-xform-item label="催收责任机构" name="managerBrIdName" disabled></yu-xform-item>
                 </yu-xform-group>
              </yu-xform>
         </yu-panel>
         <yu-panel title="催收业务清单" :hideFilter="false" :collapseHide="false" >
            <yu-button-drop>
              <yu-button type="primary" @click="doView">查看</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl1" selection-type="radio" requestType="POST" :base-params="baseParams">
              <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
              <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
              <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
              <yu-xtable-column align="center" label="正常本金(元)" prop="zcbjAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column align="center" label="逾期本金(元)" prop="overdueCapAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column align="center" label="拖欠利息总额(元)" prop="totalTqlxAmt" width="150px" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column align="center" label="欠息(元)" prop="debitInt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column align="center" label="罚息(元)" prop="penalInt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column align="center" label="复息(元)" prop="compoundInt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column align="center" label="逾期天数" prop="overdueDay"></yu-xtable-column>
              <yu-xtable-column align="center" label="五级分类" prop="fiveClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
            </yu-xtable>
         </yu-panel>

         <yu-panel title="催收结果登记" :hideFilter="false" :collapseHide="false">
            <yu-button-drop>
               <yu-button type="primary" @click="addFn" :hidden="viewType=='DETAIL'">新增</yu-button>
               <yu-button type="primary" @click="modifyFn" :hidden="viewType=='DETAIL'">修改</yu-button>
               <yu-button type="primary" @click="deleteFn" :hidden="viewType=='DETAIL'">删除</yu-button>
               <yu-button type="primary" @click="infoFn">查看</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refBaseTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl2" selection-type="radio" requestType="POST" :base-params="baseParams">
              <yu-xtable-column align="center" label="登记编号" prop="pbreiSerno"></yu-xtable-column>
              <yu-xtable-column align="center" label="催收方式" prop="bcmMode"></yu-xtable-column>
              <yu-xtable-column align="center" label="催收日期" prop="bcmDate"></yu-xtable-column>
              <yu-xtable-column align="center" label="催收对象类型" prop="bcmObjType" data-code="STD_BCM_OBJ_TYPE"></yu-xtable-column>
              <yu-xtable-column align="center" label="催收对象名称" prop="cusName"></yu-xtable-column>
              <yu-xtable-column align="center" label="联系方式" prop="tel"></yu-xtable-column>
              <yu-xtable-column align="center" label="催收结果" prop="bcmResult" data-code="STD_BCM_RESULT"></yu-xtable-column>
              <yu-xtable-column align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
            </yu-xtable>
         </yu-panel>
          <div style="text-align:center">
               <yu-button type="primary" @click="overFn" :hidden="viewType=='DETAIL'">完成</yu-button>
               <yu-button type="primary" @click="backFn">返回</yu-button>
          </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_BCM_OBJ_TYPE,STD_BCM_RESULT,STD_FIVE_CLASS');
import mixin from '@/utils/mixin';
export default {
  props: {bizPageData: Object},
  mixins: [mixin],
  data: function () {
    return {
      searchFormdata: {},
      activeName: 'first',
      dataUrl1: backend.cmisNpam + '/api/plabcmrel/queryAll',
      dataUrl2: backend.cmisNpam + '/api/plabcmreceiptinfo/queryAll',
      viewType: '',
      baseParams: {condition: JSON.stringify({ taskNo: this.$route.meta.params.taskNo})}
    };
  },
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.refBaseTable.remoteData();
    }
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      var taskNo = _this.$route.meta.params.taskNo;
      _this.viewType = _this.$route.meta.params.viewType;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plabcmtaskinfo/showBytaskNo',
        data: {taskNo: taskNo},
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.searchFormdata);
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    /*
      查看按钮-----催收业务清单
      */
    doView () {
      const params = this.$refs.refTable.selections[0];
      if (!params) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 贷款台账模块
      var billNo = params.billNo;
      this.$router.addTab({
        name: 'zrcbank/npam/plaTokeOver/plaTokeOverBillCard',
        key: new Date().getTime(),
        title: '贷款台账页面',
        data: {
          billNo: billNo, // 借据编号
          viewType: 'DETAIL'
        }
      });
    },
    /*
     * 新增按钮---催收结果登记
     */
    addFn: function () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/bcmRule/plaBcmReceiptInfoFoot',
        // 自定义唯一页签key
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '催收登记详情',
        // 传递的业务数据，可选配置
        data: {
          taskNo: this.searchFormdata.taskNo,
          pbreiSerno: this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ'),
          viewType: 'ADD'
        }
      });
    },

    /*
   修改---催收结果登记
   */
    modifyFn: function () {
      var _this = this;
      // 选取的表格数据
      var selectionsAry = _this.$refs.refBaseTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let pbreiSerno = selectionsAry[0].pbreiSerno;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/bcmRule/plaBcmReceiptInfoFoot',
        // 自定义唯一页签key
        key: pbreiSerno, // 必传
        // 页签名称
        title: '维护页面',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'EDIT',
          pbreiSerno: pbreiSerno
        }
      });
    },

    /*
   删除---催收结果登记
    */
    deleteFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refBaseTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var pbreiSerno = selectionsAry[0].pbreiSerno;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plabcmreceiptinfo/delete',
              data: {pbreiSerno: pbreiSerno},
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message.success('操作成功');
                  _this.$refs.refBaseTable.remoteData();
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    },

    /*
   查看---催收结果登记
    */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refBaseTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let pbreiSerno = selectionsAry[0].pbreiSerno;
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/bcmRule/plaBcmReceiptInfoFoot',
        // 自定义唯一页签key
        key: new Date().getTime() + 3, // 必传
        // 页签名称
        title: '查看页面',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          pbreiSerno: pbreiSerno
        }
      });
    },

    /*
  返回按钮
  */
    backFn () {
      yufp.router.removeTab(this.$route.path);
    },
    /*
  完成
   */
    overFn () {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plabcmtaskinfo/update',
        data: _this.searchFormdata,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('操作成功');
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    }
  }
};
</script>
