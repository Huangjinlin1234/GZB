<template>
  <!--
    @created by ywl
    @updated by
    @description 集团客户额度冻结/解冻/终止申请修改页面
  -->
  <div class="blank_template">
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="申请信息" name="base">
        <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refForm" label-width="60px" v-model="baseFormdata">
            <yu-xform-group :column="2">
              <yu-xform-item label="业务流水号" ctype="input" name="serno" disabled="true"></yu-xform-item>
              <yu-xform-item label="业务类型" ctype="select" name="lmtAccOperType" disabled="true" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled="true"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" name="inputId" disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled="true"></yu-xform-item>
              <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled="true"></yu-xform-item>
              <yu-xform-item label="主管客户经理" ctype="input" name="manageId" hidden="true"></yu-xform-item>
              <yu-xform-item label="主管客户机构" ctype="input" name="manageBrId" hidden="true"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="额度分项品种列表" :hideFilter="false" :collapseHide="false">
          <yu-xtable :data="lmtAppSubList" style="width: 100%;margin-bottom: 20px;" row-key="pkId" border
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :pageable="false">
            <yu-xtable-column label="授信分项额度编号" prop="accSubNo" width="200"></yu-xtable-column>
            <yu-xtable-column label="授信品种" prop="lmtBizTypeName"></yu-xtable-column>
            <yu-xtable-column label="授信分项编号" prop="subPrdSerno" hide-column></yu-xtable-column>
            <yu-xtable-column label="授信品种类型属性" prop="lmtBizTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="授信额度" prop="lmtAmt" width="100"></yu-xtable-column>
            <yu-xtable-column label="额度期限" prop="lmtTerm" width="100"></yu-xtable-column>
            <yu-xtable-column label="额度起始日" prop="startDate" width="100" hide-column></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="endDate" width="100" hide-column></yu-xtable-column>
            <yu-xtable-column label="原额度状态" prop="origiLmtStatus" width="100" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
            <yu-xtable-column label="修改后额度状态" prop="afterLmtStatus" width="200" ctype="select" data-code="STD_LMT_ACC_OPER_TYPE" :datacode-filter="datacodeFilterFn"></yu-xtable-column>
            <yu-xtable-column label="操作" width="120">
            <template slot-scope="scope">
              <a class="underline" v-if="scope.row.origiLmtStatus != null" @click="saveLmtStatus(scope.row)">保存</a>
            </template>
          </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <div class="yu-toolBar" style="text-align:center">
          <yu-button-group>
            <yu-button type="primary" @click="saveFn" :hidden="!isShowBtn">暂存</yu-button>
            <yu-button type="primary" @click="commitFn" :hidden="!isShowBtn">提交</yu-button>
            <yu-button type="primary" @click="cancelFn">返回</yu-button>
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
yufp.lookup.reg('STD_LMT_ACC_OPER_TYPE,STD_ZB_APPR_STATUS,STD_ZB_ASSURE_MEANS,STD_ZB_YES_NO,STD_CUS_TYPE,STD_ZB_GUAR_WAY,STD_ZB_APPR_ST,STD_PRD_TYPE_PROP');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      tabName: 'base',
      isShowBtn: false,
      lmtAppSubList: [],
      lmtReplyAccOperApp: {},
      baseFormdata: {},
      pagedata: false,
      nodeHistory: [],
      activeNames: [],
      getComments: backend.workflowService + '/api/core/getAllCommentsByBizId/',
      commentinfo: ''
    };
  },
  mounted () {
    this.AfterInit();
    var _this = this;
    var op = this.$route.params.saveBtnShow;
    if (op) {
      this.isShowBtn = true;
    }
    var serno = this.$route.params.serno;
    _this.getFormdata(serno);
    _this.getSubAndPrd(serno);
  },
  methods: {
    AfterInit () {
      var _this = this;
      yufp.service.request({
        method: 'GET',
        url: _this.getComments,
        data: {
          bizId: this.$route.params.serno
        },
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null ? response.data.length > 0 : false) {
              _this.commentinfo = '';
              var nodeHistory = response.data;
              // commentSign翻译
              for (var i = 0, length = nodeHistory.length; i < length; i++) {
                // _this.activeNames[i] = (i + 1).toString();
                nodeHistory[i].commentSign = yufp.lookup.convertKey('OP_TYPE', nodeHistory[i].commentSign);
                // 时间格式化
                // nodeHistory[i].startTime = yufp.util.dateFormat(nodeHistory[i].startTime, '{y}-{m}-{d}');
              }
              _this.nodeHistory = nodeHistory;
            } else {
              _this.commentinfo = '暂无审批历史数据';
              _this.pagedata = true;
            }
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
    },

    getSubAndPrd: function (serno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccoperappsub/getsubandprd',
        data: serno,
        callback: function (code, message, response) {
          _this.lmtAppSubList = response.data.lmtReplyAccOperAppSubDtoList;
        }
      });
    },

    // 给基本信息赋值
    getFormdata: function (serno) {
      var _this = this;
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccoperapp/selectlmtreplyaccoperappbyserno',
        data: serno,
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.baseFormdata);
            // datacodeFilterFn;
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
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccoperapp/updateoperapp',
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.erorcd == '0000') {
              _this.$message({ message: '保存成功', type: 'success' });
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
    commitFn () {
      var _this = this;
      var model = {};
      yufp.clone(_this.baseFormdata, model);
      var startdto = {};
      if (_this.baseFormdata.lmtAccOperType == '01') {
        startdto.bizType = 'SX016';
      } else if (_this.baseFormdata.lmtAccOperType == '02') {
        startdto.bizType = 'SX017';
      } else if (_this.baseFormdata.lmtAccOperType == '03') {
        startdto.bizType = 'SX018';
      }
      startdto.systemId = 'cmis';
      startdto.orgId = model.managerBrId;
      startdto.userId = model.managerId;
      startdto.bizId = model.serno;
      startdto.bizUserName = model.cusName;
      startdto.bizUserId = model.cusId;
      startdto.param = {'': ''};
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
      startdto.param = {
        isXDGLBHCG: isXDGLBHCG
      };
      startdto.bizParam4 = model.serno;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 授信额度保存
    saveLmtStatus (data) {
      var _this = this;
      if (data.origiLmtStatus == '' || data.origiLmtStatus == null) {
        _this.$message({
          showClose: true,
          message: '原额度状态为空，请重新选择！',
          type: 'error'
        });
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
    }
  }


};
</script>
