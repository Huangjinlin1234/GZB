<template>
  <!--
    @created by ywl
    @updated by
    @description 集团客户额度冻结/解冻/终止申请修改页面
  -->
  <div class="blank_template">
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="申请信息" name="base">
        <yu-panel title="申请基本信息">
          <yu-xform related-table-name="refForm" label-width="60px" v-model="baseFormdata">
            <yu-xform-group :column="4">
              <yu-xform-item label="业务流水号" ctype="input" name="grpSerno" disabled="true"></yu-xform-item>
              <yu-xform-item label="业务类型" ctype="select" name="lmtAccOperType" disabled="true" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xform-item>
              <yu-xform-item label="集团客户编号" ctype="input" name="grpCusId" disabled="true"></yu-xform-item>
              <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled="true"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="授信成员信息">
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" request-type="post" :base-params="queryParams">
            <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="成员客户名称" prop="cusName" width="200"></yu-xtable-column>
            <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
            <yu-xtable-column label="敞口额度" prop="openLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="低风险额度" prop="lowRiskLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="管护客户经理" prop="managerId" width="100" hide-column></yu-xtable-column>
            <yu-xtable-column label="所属机构" prop="managerBrId" width="100" hide-column></yu-xtable-column>
            <yu-xtable-column label="管护客户经理" prop="managerIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="所属机构" prop="managerBrIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="授信额度是否可调剂" prop="isAdjustFlag" width="100" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="额度分项品种列表">
          <yu-xtable :data="lmtAppSubList" style="width: 100%;margin-bottom: 20px;" row-key="pkId" border
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :pageable="false">
            <yu-xtable-column label="所属成员名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="授信分项申请编号" prop="subSerno" width="200"></yu-xtable-column>
            <yu-xtable-column label="授信分项产品申请编号" prop="subPrdSerno" width="200" hide-column></yu-xtable-column>
            <yu-xtable-column label="授信品种" prop="lmtBizTypeName"></yu-xtable-column>
            <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="授信额度" prop="lmtAmt" width="100"></yu-xtable-column>
            <yu-xtable-column label="额度期限" prop="lmtTerm" width="100"></yu-xtable-column>
            <yu-xtable-column label="额度起始日" prop="startDate" width="100" hide-column></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="endDate" width="100" hide-column></yu-xtable-column>
            <yu-xtable-column label="原额度状态" prop="origiLmtStatus"  data-code="STD_ZB_APPR_ST" width="100"></yu-xtable-column>
            <yu-xtable-column label="操作类型" ctype="select"  data-code="STD_LMT_ACC_OPER_TYPE"  :datacode-filter="datacodeFilterFn" prop="afterLmtStatus" width="100"></yu-xtable-column>
            <yu-xtable-column label="操作" width="120">
            <template slot-scope="scope">
              <a class="underline" v-if="scope.row.origiLmtStatus !=''" @click="saveLmtStatus(scope.row)">保存</a>
            </template>
          </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <div class="yu-toolBar" v-if="saveBtnShow" style="text-align:center">
          <yu-button-group>
            <yu-button type="primary" :v-if="disabled" @click="saveFn">暂存</yu-button>
            <yu-button type="primary" :v-if="disabled" @click="commitFn">提交</yu-button>
            <yu-button type="primary" :v-if="disabled" @click="cancelFn">返回</yu-button>
          </yu-button-group>
        </div>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史" name="hisBase">
        <div style="height: 20px" align="center" v-if="pagedata">{{ commentinfo }}</div>
        <el-collapse accordion v-model="activeNames">
          <el-collapse-item v-for="(node, index1) in nodeHistory" :title="node.startTime + '  ' + node.nodeName" :key="index1" :name="index1">
            <el-card class="box-card">
              <yu-xform ref="refFormDemo" label-width="120px" form-type="details" disabled>
                <yu-xform-group :column="3">
                  <yu-xform-item label="审批节点名称" ctype="input" name="type" :value="node.nodeName"></yu-xform-item>
                  <yu-xform-item label="办理人员名称" ctype="input" name="author" :value="node.userName"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aa7f" value="同意" v-if="node.commentSign == 'O-12'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff0000" value="打回" v-if="node.commentSign == 'O-1'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff5500" value="退回" v-if="node.commentSign == 'O-2'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ffaa00" value="拿回" v-if="node.commentSign == 'O-0'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff0000" value="催办" v-if="node.commentSign == 'O-5'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aaff" value="协办" v-if="node.commentSign == 'O-7'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aaff" value="转办" v-if="node.commentSign == 'O-6'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aa7f" value="跳转" v-if="node.commentSign == 'O-9'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff5500" value="否决" v-if="node.commentSign == 'O-8'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #000000" value="自动提交" v-if="node.commentSign == 'O-13'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff5500" value="撤回" v-if="node.commentSign == 'O-15'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #55aa00" value="发起" v-if="node.commentSign == 'O-16'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aaff" value="正常结束" v-if="node.commentSign == 'O-14'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ffaa00" value="抄送" v-if="node.commentSign == 'O-11'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ffaa00" value="委托" v-if="node.commentSign == 'O-10'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #55aa00" value="唤醒" v-if="node.commentSign == 'O-4'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff5500" value="挂起" v-if="node.commentSign == 'O-3'"></yu-xform-item>
                  <yu-xform-item label="审批时间" name="time" :value="node.startTime"></yu-xform-item>
                  <yu-xform-item label="办理人员" ctype="input" name="status" :value="node.userId"></yu-xform-item>
                  <yu-xform-item label="审批节点编号" ctype="input" name="nodeID" :value="node.nodeId"></yu-xform-item>
                  <yu-xform-item label="审批意见" colspan="24" name="content" ctype="textarea" :value="node.userComment"></yu-xform-item>
                  <yu-xform-item label="扩展意见" colspan="24" name="ext" ctype="textarea" :value="node.ext"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </yu-tab-pane>
    </yu-tabs>
    <yufp-nwf-init ref="yufpNwfInit"></yufp-nwf-init>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_LMT_ACC_OPER_TYPE,STD_ZB_APPR_STATUS,STD_ZB_ASSURE_MEANS,STD_ZB_YES_NO,STD_ZB_CUS_TYP,STD_ZB_GUAR_WAY,STD_ZB_APPR_ST');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      tabName: 'base',
      disabled: false,
      saveBtnShow: this.$route.meta.params.saveBtnShow,
      lmtAppSubList: [],
      dataUrl: backend.cmisBiz + '/api/lmtgrpreplyaccoperapp/showdetial',
      queryParams: {'serno': this.$route.meta.params.grpSerno || this.getFactory().contextData.instanceInfo.bizId},
      lmtReplyAccOperApp: {},
      pagedata: false,
      nodeHistory: [],
      activeNames: [],
      getComments: backend.workflowService + '/api/core/getAllCommentsByBizId/',
      commentinfo: ''
    };
  },
  mounted () {
    this.afterInit();
    var _this = this;
    let data = {};
    var grpSerno = '';
    // 待办流程进入
    if (_this.getFactory().contextData) {
      data = _this.getFactory().contextData.instanceInfo;
      grpSerno = data.bizId;
    } else {
      data = _this.$route.meta.params;
      grpSerno = data.grpSerno;
      let op = data.viewType;
      if (op == 'EDIT') {
        _this.disabled = true;
      }
    }
    _this.getFormdata(grpSerno);
    _this.getSubAndPrd(grpSerno);
  },
  methods: {
    afterInit () {
      var _this = this;
      // yufp.service.request({
      //   method: 'GET',
      //   url: _this.getComments,
      //   data: {
      //     // bizId: 'LMT202105060000565'
      //     bizId: this.$route.params.grpSerno
      //   },
      //   callback: function (code, message, response) {
      //     if (response.code == 0) {
      //       if (response.data != null ? response.data.length > 0 : false) {
      //         _this.commentinfo = '';
      //         var nodeHistory = response.data;
      //         // commentSign翻译
      //         for (var i = 0, length = nodeHistory.length; i < length; i++) {
      //           // _this.activeNames[i] = (i + 1).toString();
      //           nodeHistory[i].commentSign = yufp.lookup.convertKey('OP_TYPE', nodeHistory[i].commentSign);
      //           // 时间格式化
      //           // nodeHistory[i].startTime = yufp.util.dateFormat(nodeHistory[i].startTime, '{y}-{m}-{d}');
      //         }
      //         _this.nodeHistory = nodeHistory;
      //       } else {
      //         _this.commentinfo = '暂无审批历史数据';
      //         _this.pagedata = true;
      //       }
      //     }
      //   }
      // });
    },

    getSubAndPrd: function (grpSerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccoperappsub/getsubandprdbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          _this.lmtAppSubList = response.data.lmtReplyAccOperAppSubDtoList;
        }
      });
    },
    // 给基本信息赋值
    getFormdata: function (grpSerno) {
      var _this = this;
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpreplyaccoperapp/selectlmtgrpreplyaccoperappbygrpserno',
        data: grpSerno,
        callback: function (code, message, response) {
          if (code == 0) {
            // _this.baseFormdata = response.data;
            yufp.clone(response.data, _this.baseFormdata);
          } else {
            _this.$message('保存失败');
            return;
          }
        }
      });
    },
    // 返回按钮
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
    },
    // 暂存
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.baseFormdata, model);
      var url = backend.cmisBiz + '/api/lmtgrpreplyaccoperapp/updateoperapp';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.erorcd == '0000') {
              _this.$message({ message: '保存成功', type: 'success' });
              // _this.$refs.refTable.remoteData();
              _this.dialogVisible = false;
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
        }
      });
    },
    // 提交
    commitFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.baseFormdata, model);
      // SX019集团客户额度冻结
      // SX020集团客户额度解冻
      // SX021集团客户额度终止
      let bizType = '';
      let flowName = '';
      if (model.lmtAccOperType == '01') {
        bizType = 'SX019';
        flowName = '集团客户额度冻结审批流程';
      } else if (model.lmtAccOperType == '02') {
        bizType = 'SX020';
        flowName = '集团客户额度解冻审批流程';
      } else if (model.lmtAccOperType == '03') {
        bizType = 'SX021';
        flowName = '集团客户额度终止审批流程';
      } else {
        _this.$message('未识别的业务类型!');
        return;
      }
      // 流程传入参数  isXDGLBHCG 是否信贷管理部核查岗
      let loginUser = _this.$xutils.getLoginUserInfo();
      var isXDGLBHCG = '0';
      var dutysArr = loginUser.dutys;
      if (dutysArr != null && dutysArr.length > 0) {
        dutysArr.forEach(function (item) {
          if (item.id == 'XDB13') {
            isXDGLBHCG = '1';
          }
        });
      }
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.id;
      startdto.userId = loginUser.loginCode;
      startdto.flowName = flowName;
      startdto.bizType = bizType;
      startdto.bizId = model.grpSerno;
      startdto.bizUserName = model.grpCusName;
      startdto.bizUserId = model.grpCusId;
      startdto.param = {
        startOrgId: model.managerBrId,
        isXDGLBHCG: isXDGLBHCG,
        orgType: loginUser.org.orgType
      };
      startdto.bizParam4 = model.serno;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    // 授信额度是否可调剂
    saveLmtStatus (data) {
      var _this = this;
      if (data.origiLmtStatus == null || data.origiLmtStatus == '') {
        _this.$message('原额度状态为空!');
        return;
      }
      _this.$confirm('确认保存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtreplyaccoperappsubprd/updatesubprd',
              data: data,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  // 保存成功后 不需任何处理
                  _this.$message('保存成功');
                } else {
                  _this.$message('保存失败');
                  return;
                }
              }
            });
          }
        }
      });
    },
    /**
     *  字典项过滤
     */
    datacodeFilterFn (opts, datacode, name) {
      let operType = this.baseFormdata.lmtAccOperType;
      return opts.filter(function (op) {
        if (op.key == operType) {
          return true;
        }
        return false;
      });
    }
  }
};
</script>
