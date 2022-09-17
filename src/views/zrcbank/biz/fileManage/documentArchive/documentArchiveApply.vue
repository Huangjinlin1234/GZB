/**
 * @Created by  jijian on 2021/6/19
 * @updated by
 * @description 档案归档
 */
<template>
  <div>
  <yu-tabs v-model="activeName">
  <yu-tab-pane label="档案归档列表" name="readOffApply">
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="riskTaskTable" ref="searchForm" v-model="searchFormdata" form-type="search" >
          <yu-xform-group :column="3">
            <yu-xform-item label="客户名称" fuzzy-query="both" placeholder="模糊查询" name="cusName" ></yu-xform-item>
            <yu-xform-item label="档案编号" placeholder="" name="docNo" ></yu-xform-item>
            <yu-xform-item label="责任人" name="managerId"  ctype="YuXuser" @select-fn="commonSelectFn" :mapping="{'managerId':'managerId'}" ></yu-xform-item>
            <yu-xform-item label="客户编号" placeholder="" name="cusId" ></yu-xform-item>
            <yu-xform-item label="档案状态" placeholder="" name="docStauts" ctype="select" :options="dicOptions.TypeOption"></yu-xform-item>
            <yu-xform-item label="责任机构" name="managerBrId"  ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'managerBrId':'managerBrId'}"  ></yu-xform-item>
            <yu-xform-item label="关联业务编号" placeholder="" name="bizSerno" ></yu-xform-item>
            <yu-xform-item label="档案分类" placeholder="" name="docClass" ctype="select" data-code="STD_DOC_CLASS" ></yu-xform-item>
            <yu-xform-item label="档案类型" placeholder="" name="docType" ctype="select" data-code="STD_DOC_TYPE" ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>

      </template>
    </yu-panel>
    <yu-panel title="档案归档管理" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <yu-button-drop show-length="7">
        <yu-button type="primary" @click="addFn" v-if="checkCtrl('addFn')">新增</yu-button>
        <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('modifyFn')">修改</yu-button>
        <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('deleteFn')">删除</yu-button>
        <yu-button type="primary" @click="infoFn(1)" v-if="checkCtrl('infoFn')">查看</yu-button>
        <yu-button type="primary" @click="receiveFn" v-if="checkCtrl('receiveFn')">接收</yu-button>
        <yu-button type="primary" @click="optFn" v-if="checkCtrl('optFn')">入库查询</yu-button>
      </yu-button-drop>
      <yu-xtable ref="riskTaskTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseApplyParams" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="档案流水号" prop="docSerno" width="100" ></yu-xtable-column>
        <yu-xtable-column align="center" label="档案编号" prop="docNo" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="归档模式" prop="archiveMode" data-code="STD_ARCHIVE_MODE" width="80"></yu-xtable-column>
        <yu-xtable-column align="center" label="档案分类" prop="docClass" data-code="STD_DOC_CLASS" width="80"></yu-xtable-column>
        <yu-xtable-column align="center" label="档案类型" prop="docType" data-code="STD_DOC_TYPE" width="80"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="关联业务编号" prop="bizSerno" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="合同编号" prop="contNo" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="借据编号" prop="billNo" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="产品名称" prop="prdName" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="金额" prop="loanAmt" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="起始时间" prop="startDate" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="到期时间" prop="endDate" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人" prop="managerIdName" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="任务标识" prop="taskFlag" data-code="STD_TASK_FLAG" width="80"></yu-xtable-column>
        <yu-xtable-column align="center" label="生成日期" prop="createDate" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="完成日期" prop="finishDate" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="入库操作人" prop="optUsrName" width="100" :formatter="Formatter1"></yu-xtable-column>
        <yu-xtable-column align="center" label="入库操作机构" prop="optOrgName" width="120" :formatter="Formatter"></yu-xtable-column>
        <yu-xtable-column align="center" label="档案状态" prop="docStauts" data-code="STD_DOC_STAUTS" width="80"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
    <yu-tab-pane label="档案归档历史" name="readApplyHist">
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="riskTaskTable1" ref="searchForm1" v-model="searchFormdata1" form-type="search" label-width="80px">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户名称" fuzzy-query="both" placeholder="模糊查询" name="cusName" ></yu-xform-item>
            <yu-xform-item label="档案编号" placeholder="" name="docNo" ></yu-xform-item>
            <yu-xform-item label="责任人" name="managerId" :colspan="8" ctype="YuXuser" @select-fn="commonSelectFn1" :mapping="{'managerId':'managerId'}" label-width="80px" ></yu-xform-item>
            <yu-xform-item label="客户编号" placeholder="" name="cusId" ></yu-xform-item>
            <yu-xform-item label="档案状态" placeholder="" name="docStauts" ctype="select" :options="dicOptions.docTypeOptions"></yu-xform-item>
            <yu-xform-item label="责任机构" name="managerBrId" :colspan="8" ctype="YuXorg" @select-fn="commonSelectFn1" :mapping="{'managerBrId':'managerBrId'}"  label-width="80px"></yu-xform-item>
            <yu-xform-item label="关联业务编号" placeholder="" name="bizSerno" ></yu-xform-item>
            <yu-xform-item label="档案分类" placeholder="" name="docClass" ctype="select" data-code="STD_DOC_CLASS" ></yu-xform-item>
            <yu-xform-item label="档案类型" placeholder="" name="docType" ctype="select" data-code="STD_DOC_TYPE" ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>

      </template>
    </yu-panel>
    <yu-panel title="档案归档管理" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
        <yu-button type="primary" @click="infoFn(2)" v-if="checkCtrl('infoFn')">查看</yu-button>
      <yu-xtable ref="riskTaskTable1" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseHistParams" selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="档案流水号" prop="docSerno" width="100" ></yu-xtable-column>
        <yu-xtable-column align="center" label="档案编号" prop="docNo" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="归档模式" prop="archiveMode" data-code="STD_ARCHIVE_MODE" width="80"></yu-xtable-column>
        <yu-xtable-column align="center" label="档案分类" prop="docClass" data-code="STD_DOC_CLASS" width="80"></yu-xtable-column>
        <yu-xtable-column align="center" label="档案类型" prop="docType" data-code="STD_DOC_TYPE" width="80"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="关联业务编号" prop="bizSerno" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="合同编号" prop="contNo" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="借据编号" prop="billNo" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="产品名称" prop="prdName" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="金额" prop="loanAmt" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="起始时间" prop="startDate" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="到期时间" prop="endDate" width="120" ></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人" prop="managerIdName" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName" width="120"></yu-xtable-column>
        <yu-xtable-column align="center" label="任务标识" prop="taskFlag" data-code="STD_TASK_FLAG" width="80"></yu-xtable-column>
        <yu-xtable-column align="center" label="生成日期" prop="createDate" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="完成日期" prop="finishDate" width="100"></yu-xtable-column>
        <yu-xtable-column align="center" label="入库操作人" prop="optUsrName" width="100" :formatter="Formatter1"></yu-xtable-column>
        <yu-xtable-column align="center" label="入库操作机构" prop="optOrgName" width="120" :formatter="Formatter"></yu-xtable-column>
        <yu-xtable-column align="center" label="档案状态" prop="docStauts" data-code="STD_DOC_STAUTS" width="80"></yu-xtable-column>
        <yu-xtable-column align="center" label="库位号" prop="location" width="120"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_DOC_STAUTS,STD_DOC_CLASS,STD_DOC_TYPE,STD_ARCHIVE_MODE,STD_TASK_FLAG');
export default {
  mixins: [mixin],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/docarchiveinfo/query',
      viewType: 'DETAIL',
      searchFormdata: {},
      searchFormdata1: {},
      dicOptions: {docTypeOptions: [{key: '03', value: '已入库'}, {key: '06', value: '作废'}], TypeOption: [{key: '01', value: '等待入库'}, {key: '02', value: '入库在途'}, {key: '04', value: '退回在途'}, {key: '05', value: '已退回'}]},
      activeName: 'readOffApply',
      baseApplyParams: {condition: JSON.stringify({ queryFlag: 'applyTable'// , 'inputId': this.$xutils.getLoginUserInfo().loginCode
      }) },
      baseHistParams: {condition: JSON.stringify({ queryFlag: 'applyTableHis'// , 'inputId': this.$xutils.getLoginUserInfo().loginCode
      }) }
    };
  },
  // watch: {
  //   // 监视路由，切换页面，页面数据自动刷新。
  //   '$route.path': function () {
  //     console.log(new Date());
  //     this.$refs.riskTaskTable.remoteData();
  //   }
  // },
  methods: {

    /**
     *入库操作机构格式化
     */
    Formatter: function (row, column) {
      var Dt = row.optOrgName;

      if (row.docStauts == '01') {
        Dt = '';
      }
      return Dt;
    },

    /**
     *入库操作人格式化
     */
    Formatter1: function (row, column) {
      var Dt = row.optUsrName;

      if (row.docStauts == '01') {
        Dt = '';
      }
      return Dt;
    },

    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'managerId') {
            this.searchFormdata[mapping[item]] = data.loginCode;
          } else if (item === 'managerBrId') {
            this.searchFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'managerId') {
            this.searchFormdata[item] = data.loginCode;
          } else if (item === 'managerBrId') {
            this.searchFormdata[item] = data.orgCode;
          }
        }
      }
    },
    /**
       * 参照公共的确认事件
     */
    commonSelectFn1: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'managerId') {
            this.searchFormdata1[mapping[item]] = data.loginCode;
          } else if (item === 'managerBrId') {
            this.searchFormdata1[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'managerId') {
            this.searchFormdata1[item] = data.loginCode;
          } else if (item === 'managerBrId') {
            this.searchFormdata1[item] = data.orgCode;
          }
        }
      }
    },


    /*
    *新增档案归档
    */
    addFn () {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/fileManage/documentArchive/documentArchiveApplyNext',
        // 自定义唯一页签key
        key: 1 + new Date().getTime(), // 必传
        // 页签名称
        title: '档案归档申请向导',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'ADD'
        }
      });
    },
    /*
    *修改档案归档
    */

    modifyFn () {
      var _this = this;
      var selections = _this.$refs.riskTaskTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var docStauts = selections[0].docStauts;
      if (docStauts == '01' || docStauts == '05' || docStauts == '02') {
        let data = selections[0];
        let iqpSerno = data.bizSerno;
        let jsonData = {};
        jsonData.bizSerno = data.bizSerno;
        // if (selections[0].docType == '17') {
        //   iqpSerno = _this.getLSIqpserno(iqpSerno);
        // }
        data.iqpSerno = iqpSerno;
        _this.$router.addTab({
        // 路由名称
          name: 'zrcbank/biz/fileManage/documentArchive/documentArchiveApplyEdit',
          // 自定义唯一页签key
          key: 'documentArchiveApplyEdit' + new Date().getTime(), // 必传
          // 页签名称
          title: '档案归档详情',
          // 传递的业务数据，可选配置
          data: {
            viewType: 'EDIT',
            jsonData: data,
            serno: iqpSerno
          }
        });
      } else {
        _this.$message.warning('只有等待入库、入库在途、已退回的才可以修改');
      }
    },
    /*
    *查看档案归档
    */
    infoFn (op) {
      var _this = this;
      var selections = '';
      if (op == '1') {
        selections = _this.$refs.riskTaskTable.selections;
      } else {
        selections = _this.$refs.riskTaskTable1.selections;
      }

      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var data = selections[0];
      var iqpSerno = data.bizSerno;
      // if (selections[0].docType == '17') {
      //   iqpSerno = _this.getLSIqpserno(iqpSerno);
      // }
      data.iqpSerno = iqpSerno;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/fileManage/documentArchive/documentArchiveApplyDetail',
        // 自定义唯一页签key
        key: 'documentArchiveApplyDetail' + new Date().getTime(), // 必传
        // 页签名称
        title: '档案归档详情',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          jsonData: data,
          serno: iqpSerno
        }
      });
    },
    /*
    *删除档案归档
    */
    deleteFn () {
      var _this = this;
      var selections = _this.$refs.riskTaskTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      };
      var docStauts = selections[0].docStauts;
      var taskFlag = selections[0].taskFlag;
      if (docStauts === '06') {
        _this.$message.warning('档案状态已作废,请勿重复操作!');
        return;
      }
      if (docStauts !== '01' && docStauts !== '05') {
        _this.$message.warning('只有在等待入库和已退回状态下才可删除');
        return;
      }
      let flag1 = false;
      let flag2 = false;
      const loginUser = _this.$xutils.getLoginUserInfo();
      const dutysList = loginUser.dutys;
      const rolesList = loginUser.roles;

      if (rolesList != undefined) {
        for (let i = 0; i < rolesList.length; i++) { // 后期根据实际的岗位编号修改-2021-06-12 huujn
          let item = rolesList[i];
          if (item.code === 'R001') {
            flag2 = true;
            break;
          }
        }
      }

      if (flag2) {
        _this.delet();
        return;
      }

      if (dutysList != undefined) {
        for (let i = 0; i < dutysList.length; i++) { // 后期根据实际的岗位编号修改-2021-06-12 huujn
          let item = dutysList[i];
          if (item.code === 'ZYB16' || item.code !== 'FZH16') {
            flag1 = true;
            break;
          }
        }
      }


      if (flag1 && taskFlag === '02') {
        _this.delet();
        return;
      } else {
        _this.$message.warning('对不起，您无权删除！');
      }
    },

    // 删除
    delet () {
      var _this = this;
      var selections = _this.$refs.riskTaskTable.selections;
      _this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            let taskFlag = selections[0].taskFlag;
            if (taskFlag === '01') {
              // 系统发起
              // 系统管理员删除时填写删除原因
              let dialogData = {
                docSerno: selections[0].docSerno
              };
              _this.$dialog.open(
                '请输入归档任务删除原因',
                'zrcbank/biz/fileManage/documentArchive/documentArchiveApplyDelete',
                500,
                300,
                dialogData,
                (retVal) => {
                  _this.$refs.riskTaskTable.remoteData();
                }
              );
            } else if (taskFlag === '02') {
              // 人工发起
              // 分支机构档案管理岗、集中作业档案岗，只能删除人工新增的档案归档任务
              yufp.service.request({
                method: 'POST',
                url: backend.cmisBiz + '/api/docarchiveinfo/invalid',
                data: JSON.stringify(selections[0]),
                callback: function (code, message, response) {
                  if (response.data.rtnCode == '000000') {
                    _this.$refs.riskTaskTable.remoteData();
                    _this.$message.success(response.data.rtnMsg);
                  } else {
                    _this.$message.error(response.data.rtnMsg);
                  }
                }
              });
            } else {
              _this.$message.error('对不起，您无权删除！');
            }
          }
        }
      });
    },
    /*
    *接收
    */
    receiveFn () {
      var _this = this;
      var selections = _this.$refs.riskTaskTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      };
      var docStauts = selections[0].docStauts;
      if (docStauts != '04') {
        _this.$message.warning('退回在途的档案才能接受');
        return;
      }
      _this.$confirm('是否确认接受?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.$backend.cmisBiz + '/api/docarchiveinfo/receive',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.data.rtnCode === '000000') {
                  _this.$refs.riskTaskTable.remoteData();
                  _this.$message.success(response.data.rtnMsg);
                } else {
                  _this.$message.error(response.data.rtnMsg);
                }
              }
            });
          }
        }
      });
    },
    /** 入库查询 **/
    optFn () {
      var _this = this;
      var selections = _this.$refs.riskTaskTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      };
      var docStauts = selections[0].docStauts;
      if (docStauts != '02') {
        _this.$message.warning('非入库在途的档案不可操作');
        return;
      }
      _this.$confirm('是否去档案系统查询?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.$backend.cmisBiz + '/api/docarchiveinfo/searchstatus',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.data.rtnCode === '000000') {
                  _this.$refs.riskTaskTable.remoteData();
                  _this.$message.success(response.data.rtnMsg);
                } else {
                  _this.$message.error(response.data.rtnMsg);
                }
              }
            });
          }
        }
      });
    },
    /** 获取档案池关联零售业务申请流水号 **/
    getLSIqpserno (bizSerno) {
      var iqpSerno = '';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/docarchiveinfo/getLSIqpserno',
        data: bizSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            iqpSerno = response.data;
          }
        }
      });
      return iqpSerno;
    }
  }
};
</script>
