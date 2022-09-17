
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 调额申请信息-列表
  -->
  <div>
    <yu-panel panel-type="simple">
      <yu-xform related-table-name="largeLoanApplyListTable" form-type="search" ref="searchForm" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="证件号码" placeholder="证件号码" name="certCode" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="卡号" placeholder="卡号 " name="cardNo" ctype="input" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button type="primary"  v-if="checkCtrl('add')"  @click="addFn">新增</yu-button>
        <yu-button type="primary"  v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
        <yu-button type="primary"  v-if="checkCtrl('revert')" @click="deleteFn">撤销申请</yu-button>
        <yu-button type="primary"  v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="largeLoanApplyListTable" condition-key="condition" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" :base-params="baseParams">
        <yu-xtable-column label="业务流水号" prop="serno">
          <template slot-scope="scope">
            <a class="underline" @click="showFuncDetail(scope.row)">{{ scope.row.serno }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="卡号" prop="cardNo"></yu-xtable-column>
        <yu-xtable-column label="分期金额" prop="loanAmount"></yu-xtable-column>
        <yu-xtable-column label="分期期数" prop="loanTerm"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="申请渠道" prop="appChnl" data-code="STD_CARD_APP_CHNL"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="征信授权日期" prop="creditAuthDate"  hide-column></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import {lookup} from '@/utils';
lookup.reg('STD_CARD_APP_CHNL,STD_ZB_APPR_STATUS,STD_ZB_CERT_TYP');
export default {
  name: 'LargeLoanApplyList',
  components: {},
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/querymodel',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/cut',
      searchFormdata: {
        cusName: '',
        certCode: '',
        cardNo: ''
      },
      baseParams: {
        condition: {applyExistsStatus: '000,992'
        }
      }
    };
  },
  mounted: function () {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshLargeLoanApplyListTable', this.refreshLargeLoanApplyListTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshLargeLoanApplyListTable');
  },
  methods: {
    /**
     * 表格刷新
     */
    refreshLargeLoanApplyListTable: function () {
      let _this = this;
      _this.$refs.largeLoanApplyListTable.remoteData();
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      let _this = this;
      let path = 'zrcbank/biz/creditcardmanage/largeloan/largeloanapplyadd/LargeLoanApplyAddIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '新增大额分期申请信息',
        meta: {
          name: _this.$route.name,
          actionType: 'ADD', // 操作类型
          data: {}
        },
        data: {
          name: _this.$route.name,
          actionType: 'ADD', // 操作类型
          data: {}
        }
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      let _this = this;
      let selData = _this.$refs.largeLoanApplyListTable.selections;
      if (selData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let statusFlag = selData[0].approveStatus === '000' || selData[0].approveStatus === '992'; // 000为待发起,992为打回
      if (!statusFlag) { // 判断是否为待发起
        _this.$message({
          message: '请选择审批状态为待发起或打回的申请',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditcardmanage/largeloan/largeloanapplyadd/LargeLoanApplyAddIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '修改大额分期申请信息',
        data: {
          name: this.$route.name,
          actionType: 'EDIT', // 操作类型
          data: selData[0]
        }
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.largeLoanApplyListTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditcardmanage/largeloan/largeloanapplyadd/LargeLoanApplyAddIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看大额分期申请信息',
        data: {
          actionType: 'DETAIL', // 操作类型
          data: selectionsAry[0],
          name: this.$route.name
        }
      });
    },

    /**
     * 表格点击查看详情
     */
    showFuncDetail (row) {
      let _this = this;
      let path = 'zrcbank/biz/creditcardmanage/largeloan/largeloanapplyadd/LargeLoanApplyAddIndex';
      let actionType = 'DETAIL';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看大额分期申请信息',
        data: {
          actionType: actionType, // 操作类型
          data: row,
          name: this.$route.name
        }
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.largeLoanApplyListTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let statusFlag = selections[0].approveStatus === '000' || selections[0].approveStatus === '992'; // 000为待发起,992为打回
      if (!statusFlag) { // 判断是否为待发起
        _this.$message({
          message: '请选择审批状态为待发起或打回的申请',
          type: 'warning'
        });
        return;
      }

      let arr = [];
      for (let i = 0; i < selections.length; i++) {
        arr.push(selections[i].serno);
      }

      _this.$confirm('此操作将删除该申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              data: {serno: arr.join(',')},
              url: _this.batchDeleteUrl,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info'});
                  _this.$refs.largeLoanApplyListTable.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error'});
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>
