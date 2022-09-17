<template>
  <!--
    @created by wangyouhong
    @updated by youhong 2018-8-16 修改代码规范
    @updated by youhong 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="催收任务人工指派" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="160px" v-model="baseFormdata" style="text-align: center;">
        <yu-xform-group>
          <yu-xform-item label="任务编号" name="taskNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="任务生成日期" name="createDate"  rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" rules="required" icon="search" @click.native="showPop" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="资产类型" disabled name="assetType" rules="required" ctype="select" data-code="STD_ASSET_TYPE" ></yu-xform-item>
          <yu-xform-item label="任务要求完成日期" :disabled="viewType == 'DETAIL'" name="finishDate" rules="required" ctype="datepicker" @blur="timePicke"></yu-xform-item>
         <!-- <yu-xform-item label="催收责任人" :disabled="viewType == 'DETAIL'" ctype="yu-xuser" name="managerId" rules="required" placeholder="催收责任人" @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId','userName':'managerIdName','orgName':'managerBrIdName','orgId':'managerBrId'}"></yu-xform-item>-->
          <yu-xform-item label="催收责任人" :disabled="viewType == 'DETAIL'" name="managerIdName" rules="required" icon="search" @click.native="showPop1"></yu-xform-item>
          <yu-xform-item label="催收责任人" :disabled="viewType == 'DETAIL'" name="managerId" hidden></yu-xform-item>
          <yu-xform-item label="催收责任机构" name="managerBrId" hidden></yu-xform-item>
          <yu-xform-item label="催收责任机构" name="managerBrIdName" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doAllocation" :hidden="viewType == 'DETAIL'">分配</yu-button>
          <yu-button  type="primary" @click="doSave" :hidden="viewType == 'DETAIL'" >保存</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>

<!------------------------------------------------------客户pop弹框---------------------------------------------------->
    <yu-xdialog title="客户信息" :visible.sync="dialogTableVisible" width="1200px">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="公司客户" name="company"></yu-tab-pane>
        <yu-tab-pane label="个人客户" name="person"></yu-tab-pane>
      </yu-tabs>
      <yu-panel :title="title" panel-type="simple">
        <yu-xform ref="refForm" related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px" >
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
         <yu-toolbar>
          <yu-button type="primary" @click="confimBtn">选取</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :pageable="true" :data-url="dataUrl"
         :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP" ></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
          <yu-xtable-column label="客户分类" prop="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-xdialog>
    <!------------------------------------------------------催收责任人pop弹框---------------------------------------------------->
     <yu-xdialog :visible.sync="dialogTableVisible1" width="1000px" title="用户信息">
        <yu-xform form-type="search" v-model="searchFormdata1" label-width="100px" related-table-name="refTable1">
          <yu-xform-group :column="4">
            <yu-xform-item label="用户编号" ctype="input" placeholder="用户编号" name="loginCode"></yu-xform-item>
            <yu-xform-item label="用户名称" ctype="input" placeholder="用户名称" name="userName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable1" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl1" :default-load="true">
          <yu-xtable-column label="用户编号" prop="loginCode" width="150px"></yu-xtable-column>
          <yu-xtable-column label="用户名称" prop="userName" width="150px"></yu-xtable-column>
          <yu-xtable-column label="所在机构编号" prop="orgId" width="150px"></yu-xtable-column>
          <yu-xtable-column label="所在机构名称" prop="orgName" width="160px"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_CUS_TYP,STD_ZB_CERT_TYP,STD_ZB_CUS_CLS,STD_CUS_STATE');
import { dateFormat } from '@/utils';
export default {
  data: function () {
    return {
      dialogTableVisible: false,
      dataUrl: this.$backend.cmisCus + '/api/cusbase/queryCusBaseList',
      activeName: 'company',
      title:'公司客户',
      searchFormdata: {},
      baseParams: {condition: {cusCatalog: '2', roleList: this.$xutils.getLoginUserInfo().roles}},
      baseFormdata: {},
      viewType: '',

      dataUrl1: backend.appOcaService + '/api/adminsmuser/page',
      searchFormdata1:{},
      dialogTableVisible1:false,

    };
  },

  mounted () {
    this.afterInit();
  },

  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      var taskNo = _this.$route.meta.params.taskNo;
      this.viewType = _this.$route.meta.params.viewType;
      if (_this.viewType !== 'ADD') {
        // 非新增时回显
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plabcmassigntask/showByTaskNo',
          data: {taskNo: taskNo},
          callback: function (code, message, response) {
            if (response.code == '0') {
              yufp.clone(response.data, _this.baseFormdata);
            } else {
              _this.$message.error(response.message);
            }
          }
        });
      } else {
        // 新增时初始化赋值
        _this.baseFormdata['taskNo'] = taskNo;
        _this.baseFormdata['createDate'] = _this.formatTime();
      }
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    timePicke () {
      var nowTime = dateFormat(new Date(), '{y}-{m}-{d}');
      var finishTime = dateFormat(new Date(this.baseFormdata.finishDate), '{y}-{m}-{d}');
      if (finishTime < nowTime) {
        this.$message.warning('任务要求完成日期不得小于当前日期');
        this.baseFormdata.finishDate = '';
        return;
      }
    },
    /* 保存 */
    doSave () {
      var _this = this;
      _this.$refs.refForm.validate(volid => {
        if (volid) {
          if (_this.viewType === 'ADD') {
            // 新增时。。。。保存
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plabcmassigntask/save',
              data: _this.baseFormdata,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  yufp.clone(response.data, _this.baseFormdata);
                  _this.$message.success('操作成功');

                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          } else {
            // 修改时。。。。保存
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plabcmassigntask/updateByTaskNo/',
              data: _this.baseFormdata,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message.success('操作成功');
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        };
      });
    },

    /*
     将表格的数据，赋值给表单字段
    */
    commonSelectFn: function (row, mapping) {
      for (let item in mapping) {
        this.baseFormdata[mapping[item]] = row[item];
      }
    },
    // 格式化日期
    formatTime () {
      let _this = this;
      var timeDt = new Date();
      var dt = dateFormat(timeDt, '{y}-{m}-{d}');
      return dt;
    },
    openDialog () {
      this.dialogTableVisible = true;
    },

    /* 分配 */
    doAllocation () {
      var _this = this;
      _this.$refs.refForm.validate(volid => {
        // 校验
        if (volid) {
          if (_this.viewType === 'ADD') {
            // 新增保存
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plabcmassigntask/save',
              data: _this.baseFormdata,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  yufp.clone(response.data, _this.baseFormdata);
                // 新增分配
                  yufp.service.request({
                    method: 'POST',
                    url: backend.cmisNpam + '/api/plabcmassigntask/doAllocation',
                    data: _this.baseFormdata,
                    callback: function (code, message, response) {
                      if (response.code == '0') {
                        _this.$message.success('操作成功');
                      } else {
                        // 分配失败提示
                        _this.$message.error(response.message);
                      };
                    }
                  });
                } else {
                // 保存失败提示
                  _this.$message.error(response.message);
                }
              }
            });
          } else {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plabcmassigntask/updateByTaskNo/',
              data: _this.baseFormdata,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  yufp.service.request({
                    method: 'POST',
                    url: backend.cmisNpam + '/api/plabcmassigntask/doAllocation',
                    data: _this.baseFormdata,
                    callback: function (code, message, response) {
                      if (response.code == '0') {
                        _this.$message('分配成功');
                      } else {
                        _this.$message.error(response.message);
                      }
                    }
                  });
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    },

    /* 弹出pop框 */
    showPop () {
      this.dialogTableVisible = true;
    },
    /* 选取客户数据赋值给表单 */
    confimBtn () {
      this.baseFormdata.cusId = this.$refs.refTable.selections[0].cusId;
      this.baseFormdata.cusName = this.$refs.refTable.selections[0].cusName;

      this.baseFormdata.managerBrIdName = this.$refs.refTable.selections[0].managerBrIdName;
      this.baseFormdata.managerBrId = this.$refs.refTable.selections[0].managerBrId;

      this.baseFormdata.managerId = this.$refs.refTable.selections[0].managerId;
      this.baseFormdata.managerIdName = this.$refs.refTable.selections[0].managerIdName;
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/accloan/selectFiveClassByCusId',
        data: _this.baseFormdata.cusId,
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data.fiveClass == '10' || response.data.fiveClass == '20') {
              _this.baseFormdata.assetType = '01';
            } else if (response.data.fiveClass == '30' || response.data.fiveClass == '40' || response.data.fiveClass == '50') {
              _this.baseFormdata.assetType = '02';
            }
          } else {
            _this.$message.error(response.message);
          }
        }
      });
      this.dialogTableVisible = false;
    },
    /* pop框影藏 */
    back () {
      this.dialogTableVisible = false;
    },
    /* tab栏切换处理 */
    handleClick (tab, event) {
      console.log('tab', tab.name);
      var userInfo = this.$xutils.getLoginUserInfo();
      var roleList = userInfo.roles;
      console.log('roleList', roleList);
      if (tab.name == 'company') {
        this.title = "公司客户"
        this.baseParams = {condition: {cusCatalog: '2', roleList: roleList}};
      }
      if (tab.name == 'person') {
        this.title = "个人客户"
        this.baseParams = {condition: {cusCatalog: '1', roleList: roleList}};
      }
    },
    showPop1 () {
      this.dialogTableVisible1 = true;
    },
    confirmFn(){
      this.baseFormdata.managerBrIdName = this.$refs.refTable1.selections[0].orgName;//责任机构
      this.baseFormdata.managerBrId = this.$refs.refTable1.selections[0].orgId;

      this.baseFormdata.managerId = this.$refs.refTable1.selections[0].loginCode;//责任人
      this.baseFormdata.managerIdName = this.$refs.refTable1.selections[0].userName;
      this.dialogTableVisible1 = false;
    },
    clearFn(){
      this.dialogTableVisible1 = false;
    }
  }
};

</script>
