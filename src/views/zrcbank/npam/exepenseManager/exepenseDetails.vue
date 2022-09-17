
<template>
  <!--
    @created by wangyouhong
    @updated by wangyouhong 2018-8-16 修改代码规范
    @updated by wangyouhong 2018-10-11 更新组件内容及标签
    @description 垫支回收明细
  -->
  <div>
    <yu-panel title="垫支回收明细" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
      <template slot="right">
        <div>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="addFn" >新增</yu-button>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="deleteFn">删除</yu-button>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="doSave">保存</yu-button>
        </div>
      </template>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :pageable="false" requestType="POST" selection-type="radio" :base-params="baseParams">
        <yu-xtable-column align="center" ctype="input" label="回收金额" prop="recoverAmt"  :disabled="viewType == 'DETAIL'" :rules="recoverAmtRules" @change="shenYuFn"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="datepicker" label="回收日期" prop="recoverDate" :disabled="viewType == 'DETAIL'" ></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="回收后剩余垫支金额" prop="reclaimAdvanceExpenAmt"  disabled ></yu-xtable-column>
      </yu-xtable>
      <div style="text-align:center;margin-top:10px">
        <yu-button type="primary"  @click="doBack">返回</yu-button>
      </div>
    </yu-panel>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
// 注册字典项

export default {
  data: function () {
    return {
      baseParams: {condition: { periSerno: this.$route.meta.params.pedSerno}},
      dataUrl: backend.cmisNpam + '/api/plaadvanceexpenrecoverdetail/selectByCondition',
      viewType: 'EDIT',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseTable: {},
      recoverAmtRules:{required: true, message:"必填", trigger:'blur'},
      fflg: true
      // reclaimAdvanceExpenAmtRules:{required: true, message:"必填", trigger:'blur'}
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  created () {
    this.viewType = this.$route.meta.params.viewType
  },

  methods: {
    shenYuFn(value){
      // console.log("value", value)
      var selections = this.$refs.refTable.selections
      var index = this.$refs.refTable.tabledata.indexOf(selections[0])
      var tableData = this.$refs.refTable.tabledata
      var huiShou = 0
      for(var i = 0; i <= index; i++){
        huiShou = huiShou + Number(tableData[i].recoverAmt)
      }
      if(Number(this.$route.meta.params.expenseAmt) < Number(huiShou)) {
        this.$message.warning('回收金额不能超过垫支金额')
        return this.$refs.refTable.selections[0].recoverAmt = ""
      }
      this.$refs.refTable.selections[0].reclaimAdvanceExpenAmt = Number(this.$route.meta.params.expenseAmt) - Number(huiShou)
      
    },
     /*
    添加
     */
    addFn: function () {
      // var tableData = this.$refs.refTable.tabledata
      // var huiShouSum = 0
      // tableData.forEach(item => {
      //   huiShouSum = huiShouSum + Number(item.recoverAmt)
      // })
      // if(huiShouSum > Number(this.$route.meta.params.expenseAmt)) {
      //   return this.$message.warning("回收金额不能大于垫支金额")
      // }
      // if(this.$refs.refTable.selections.length > 0){
      //   if(this.$refs.refTable.selections[0].reclaimAdvanceExpenAmt < 0) {
      //     this.$refs.refTable.selections[0].recoverAmt = ""
      //     return this.$message.warning("剩余垫支金额不能小于0")
      //   }
      // }
      var flag = false
      this.$refs.refTable.validate(function (fields) {
        if(!fields){
          flag = true;
        }
      });
      if (flag) {
        let serno = this.$xutils.getUUID();
        let row = {serno: serno, recoverAmt: '', recoverDate: '', reclaimAdvanceExpenAmt: ''};
        this.$refs.refTable.tabledata.push(row);
        this.$refs.refTable.setCurrentRow(row);
      }
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
      this.$refs.refTable.clearValidateMessage();
      var paerdSerno = _this.$refs.refTable.selections[0].paerdSerno;
      if(!paerdSerno){
        this.$refs.refTable.tabledata.splice(this.$refs.refTable.tabledata.indexOf(selectionsAry[0]), 1);
        return
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plaadvanceexpenrecoverdetail/delete/' + paerdSerno,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    /*
    保存
     */
    doSave () {
      var _this = this;
      var modal = {};
      yufp.clone(_this.baseTable, modal);
      var selections = _this.$refs.refTable.tabledata;
      var len = selections.length;
      var arr = [];
      for (var i = 0; i < len; i++) {
        let item = {};
        item.paerdSerno = selections[i].paerdSerno;
        item.recoverAmt = selections[i].recoverAmt;
        item.recoverDate = selections[i].recoverDate;
        item.reclaimAdvanceExpenAmt = selections[i].reclaimAdvanceExpenAmt;
        item.periSerno = this.$route.meta.params.pedSerno;
        arr.push(item);
      }
      // 校验都通过时，发送保存请求
      // 新增保存
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plaadvanceexpenrecoverdetail/insertReplyAdv',
        data: JSON.stringify(arr),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('保存成功');
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },

    /*
     返回上级页面
     */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    /*
     格式化日期
     */
    formatTime () {
      var dt = new Date();
      return dateFormat(dt, '{y}-{m}-{d}');
    }
  }
};
</script>
