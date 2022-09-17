<template>
  <div>
    <el-tabs v-model="tabValue" @tab-click="tabClick" tab-position="top">
      <yu-tab-pane label="合同信息" name="first" >
      <ctrLoanContView ref="ctrLoanContView" :bizPageData="childParams"></ctrLoanContView>
      </yu-tab-pane>

      <yu-tab-pane label="担保合同" name="gtrcont" >
      <grtContIndex ref="grtContIndex" :page-params="gtrContParams"></grtContIndex>
      </yu-tab-pane>

      <yu-tab-pane label="申请批复信息" name="ctrLoanContPiFu" >
      <ctrLoanContPiFu ref="ctrLoanContPiFu" :page-params="ctrLoanContPiFuParams"></ctrLoanContPiFu>
      </yu-tab-pane>

      <yu-tab-pane label="影像信息" name="imageSystem" v-if="flag">
        <yu-panel title="影像信息">
          <imageSystem :authority="authority" :s="1" :para="imageBizParam"></imageSystem>
        </yu-panel>
      </yu-tab-pane>

      <yu-tab-pane label="合同打印" name="contPrint"  v-if="flag">
      <contPrint ref="contPrint" :page-params="pageParams"></contPrint>
      </yu-tab-pane>

      <yu-tab-pane label="交易对手账号登记" name="ctrToppAcctSub" >
      <ctrToppAcctSub ref="ctrToppAcctSub" :page-params="ctrToppAcctSubParams"></ctrToppAcctSub>
      </yu-tab-pane>

      <el-tab-pane label="流程审批" name="second" v-if="showApproveTab">
        <el-card class="box-card" v-if="isSignUser">
          <div slot="header" class="clearfix" >
            <component :is="gatherPage" :biz-page-data="gatherPageData"></component>
          </div>
        </el-card>
        <el-card class="clearfix">
          <div slot="header" class="clearfix">
            <span>审批操作</span>
          </div>
          <el-form ref="commentForm" label-width="160px" :model="commentInfo" :rules="commentRules" style="margin-top:20px">
            <el-form-item label="是否提交其他部门审批" v-if="isCommotOtherGSBShow!=''" prop="isSubToOtherDeptCom">
                <yu-xselect v-model="isCommotOtherGSB" data-code="STD_ZB_YES_NO" placeholder="请选择" :rules="isCommotOtherGSBShow" @change="chooseIsCommotOtherGSB(isCommotOtherGSB)"></yu-xselect>
            </el-form-item>
            <el-form-item label="其他审批部门" v-if="commotOtherDeptGSBShow!=''" prop="subOtherDeptCom">
                <yu-xselect v-model="commotOtherDeptGSB" :options="subOtherDeptComOptions" placeholder="请选择" :rules="commotOtherDeptGSBShow"></yu-xselect>
            </el-form-item>
            <el-form-item label="是否提交其他部门审批" v-if="isCommotOtherSXBShow!=''" prop="isSubToOtherDeptXd">
                <yu-xselect v-model="isCommotOtherSXB" data-code="STD_ZB_YES_NO" placeholder="请选择" :rules="isCommotOtherSXBShow" @change="chooseIsCommotOtherSXB(isCommotOtherSXB)"></yu-xselect>
            </el-form-item>
            <el-form-item label="其他审批部门" v-if="commotOtherDeptSXBShow!=''" prop="subOtherDeptXd">
                <yu-xselect v-model="commotOtherDeptSXB" :options="subOtherDeptComOptions" placeholder="请选择" :rules="commotOtherDeptSXBShow"></yu-xselect>
            </el-form-item>
            <el-form-item label="是否上调权限" v-if="isUpperAuthShow!=''" prop="isUpperApprAuth">
                <yu-xselect v-model="isUpperAppr" data-code="STD_ZB_YES_NO" placeholder="请选择" :rules="isUpperAuthShow" @change="chooseIsUpperAppr(isUpperAppr)"></yu-xselect>
            </el-form-item>
            <el-form-item label="上调审批权限类型" v-if="upperApprAuthTypeShow!=''" prop="upperApprAuthType">
                <yu-xselect v-model="upperApprAuth" :options="upperApprAuthOptions" placeholder="请选择" :rules="upperApprAuthTypeShow"></yu-xselect>
            </el-form-item>
            <el-form-item label="是否下调权限" v-if="isLowerAuthShow!=''" prop="isLowerApprAuth">
                <yu-xselect v-model="isLowerAppr" data-code="STD_ZB_YES_NO" placeholder="请选择" :rules="isLowerAuthShow"></yu-xselect>
            </el-form-item>
            <!--hxl增加对资料是否齐全进行判断-->
            <el-form-item label="资料是否提交齐全"  v-if="rule5!=''" >
                <yu-xselect v-model="value5" data-code="STD_ZB_YES_NO" placeholder="请选择" :rules="rule5" ></yu-xselect>
            </el-form-item>
            <el-form-item label="是否用印"  v-if="rule6!=''" >
                <yu-xselect v-model="value6" data-code="STD_ZB_YES_NO" placeholder="请选择" :rules="rule6" ></yu-xselect>
            </el-form-item>
            <el-form-item label="审批结论" prop="commentSign">
              <el-select v-model="commentInfo.commentSign" :disabled="button.signIn == '1'" @change="chooseCommentSign(commentInfo.commentSign)" >
                <el-option v-for="item1 in optypeOptions" :key="item1.value" :label="item1.label" :value="item1.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审批退回原因" v-if="apprBackReasonShow!=''" prop="apprBackReasonType">
                <yu-xselect v-model="apprBackReason" :options="apprBackReasonTypeOptions" placeholder="请选择" :rules="apprBackReasonShow"></yu-xselect>
            </el-form-item>
            <el-form-item label="审批退回原因" v-if="showRoolReason" prop="ext" style="height: 70px;">
                <yu-xcheckbox v-model="roolReason" :options="roolBackReasonTypeOptions"></yu-xcheckbox>
            </el-form-item>
            <!--el-form-item label="打回原因大类" prop="optType" v-if="commentInfo.commentSign == 'O-1' ">
              <el-select v-model="commentInfo.optType" :disabled="button.signIn == 1">
                <el-option v-for="item in reasonOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item-->
            <el-form-item label="意见" prop="userComment">
              <el-input type="textarea" v-model="commentInfo.userComment" :disabled="button.signIn == 1"></el-input>
            </el-form-item>
            <el-form-item class="box-card">
              <el-button @click="cancel">返回</el-button>
              <el-button type="primary" @click="saveComment" :disabled="button.signIn == '1'">保存</el-button>
              <el-button type="primary" @click="submitFn(commentInfo.commentSign)" :disabled="button.signIn == '1'">提交</el-button>
              <el-button type="primary" @click="signIn" :disabled="button.signIn != '1'">签收</el-button>
              <el-button type="primary" @click="unSignIn" :disabled="button.unSignIn != '1'">撤销签收</el-button>
              <el-button type="primary" @click="wfGatherFn" :disabled="button.signIn != '0' || button.gather == '0'">发起会办</el-button>
              <el-button type="primary" @click="unSignInTaskPool" :disabled="button.taskPoolId == '0'" v-if="button.taskPoolId != '0'">放回项目池</el-button>
              <el-button type="primary" @click="subFlowStart" :disabled="button.subFlowId == '0'" v-if="button.subFlow == '0' || button.subFlow == '1'">发起子流程</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>流程审批历史</span>
          </div>
          <!--div style="height: 20px" align="center">{{ commentinfo }}</div>
          <el-collapse-- accordion>
            <el-collapse-item v-for="(node, index1) in nodeHistory" :title="node.startTime + '  ' + node.nodeName" :key="index1" :name="index1">
              <el-card class="box-card">
                <yu-row class="rowClass">
                  <yu-col :span="8"><span>审批节点名称:</span><span>{{ node.nodeName }}</span></yu-col>
                  <yu-col :span="8"><span>办理人员名称:</span><span>{{ node.userName }}</span></yu-col>
                  <yu-col :span="8"><span>审批结果:</span><span>{{ node.commentSign }}</span></yu-col>
                </yu-row>
                <yu-row class="rowClass">
                  <yu-col :span="8"><span>审批时间:</span><span>{{ node.startTime }}</span></yu-col>
                  <yu-col :span="8"><span>办理人员:</span><span>{{ node.userId }}</span></yu-col>
                  <yu-col :span="8"><span>审批节点编号:</span><span>{{ node.nodeId }}</span></yu-col>
                </yu-row>
                <yu-row class="rowClass">
                  <yu-col :span="24"><span>审批意见:</span><span>{{ node.userComment }}</span></yu-col>
                  <yu-col :span="24"><span>getAllCommentsByBizId:</span><span>{{ node.ext }}</span></yu-col>
                </yu-row>
              </el-card>
            </el-collapse-item>
          </el-collapse-->
          <yu-xtable ref="hisTable" :data="nodeHistory" border style="width: 100%">
            <yu-xtable-column prop="instanceId" label="实例号2" :hide-column="true"> </yu-xtable-column>
            <yu-xtable-column prop="nodeName" label="审批节点名称"> </yu-xtable-column>
            <yu-xtable-column prop="userName" label="办理人员名称"> </yu-xtable-column>
            <yu-xtable-column prop="startTime" label="审批时间"> </yu-xtable-column>
            <yu-xtable-column prop="userId" label="办理人员"> </yu-xtable-column>
            <yu-xtable-column prop="nodeId" label="审批节点编号"> </yu-xtable-column>
            <yu-xtable-column prop="userComment" label="审批意见"> </yu-xtable-column>
            <yu-xtable-column prop="ext" label="扩展意见" hide-column> </yu-xtable-column>
            <yu-xtable-column prop="commentSign" label="审批结果"> </yu-xtable-column>
          </yu-xtable>
        </el-card>
      </el-tab-pane>
      <!-- <el-tab-pane label="会办详情" name="4" v-if="button['gather'] != '0'">
        <div :id="nwfgatherPage">
          <component :is="gatherPage" :biz-page-data="gatherPageData"></component>
        </div>
      </el-tab-pane>-->
      <el-tab-pane label="会办发起" name="meetstart" v-if="button['gather'] != '0' && meetPageShow">
        <div :id="nwfmeetPage">
          <component :is="meetPage" :biz-page-data="gatherPageData"></component>
        </div>
      </el-tab-pane>
      <el-tab-pane label="授信资料质量考核" name="lmtDataQualityAss" v-if="isLmtDataQualityAssShow">
        <div :id="lmtDataQualityAssPage">
          <component :is="qualityAssPage" :biz-page-data="gatherPageData"></component>
        </div>
      </el-tab-pane>
      <!--审查报告-->
      <el-tab-pane label="审查报告" name="lmtReplyAppro" v-if="islmtReplyApproShow">
        <div :id="nwflmtReplyApproPage">
          <component :is="lmtReplyApproPage" :biz-page-data="gatherPageData"></component>
        </div>
      </el-tab-pane>
      <!--核查报告-->
      <el-tab-pane label="核查报告" name="inspectReport" v-if="isinspectReportShow">
        <div :id="nwfinspectReportPage">
          <component :is="inspectReportPage" :biz-page-data="gatherPageData"></component>
        </div>
      </el-tab-pane>
      <!--批复报告-->
      <el-tab-pane label="批复报告" name="lmtReplyApproMeeting" v-if="islmtReplyApproMeetingShow">
        <div :id="nwflmtReplyApproMeetingPage">
          <component :is="lmtReplyApproMeetingPage" :biz-page-data="gatherPageData"></component>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="agreeNodeSelect.title" :visible.sync="agreeNodeSelect.showDialog" @close="agreeDialogClose">
      <el-form ref="form" label-width="20px" align="center">
        <el-radio-group v-model="agreeRadio" @change="agreeRadioChange" style="width: auto; padding-left: 20px" v-show="agreeShowRadio">
          <el-form-item v-for="(node, index1) in agreeNextNodes" style="min-width: 380px" align="left" :key="index1">
            <el-col :span="8">
              <el-radio :label="node.nodeId">{{ node.nodeName }}</el-radio>
            </el-col>
            <el-col :span="9">
              <el-row :gutter="2">
                <el-col :span="14">
                  <el-input v-model="node.userSelected" type="textarea" readonly autosize></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button @click="agreeSelectNodeUser(node, index1)" v-if="node.isSysUser != true && node.selected == true">选择</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" v-show="node.nodeType != 'E' && node.copyUserShow == true && node.selected == true">
              <el-row :gutter="2">
                <el-col :span="12">
                  <el-input v-model="node.copyUser" type="input" readonly autosize></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button @click="agreeSelectCopyUser(node, index1)">抄送</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-form-item>
        </el-radio-group>
        <el-checkbox-group v-model="agreeCheckBox" v-show="!agreeShowRadio" @change="agreeRadioChange">
          <el-form-item v-for="(node, index1) in agreeNextNodes" style="min-width: 380px" align="left" :key="index1">
            <el-col :span="8">
              <el-checkbox :label="node.nodeId" :key="node.nodeId" :checked="node.selected == true">{{ node.nodeName }}</el-checkbox>
            </el-col>
            <el-col :span="9">
              <el-row :gutter="2">
                <el-col :span="14">
                  <el-input v-model="node.userSelected" type="input" readonly autosize></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button @click="agreeSelectNodeUser(node, index1)" v-if="node.isSysUser != true && node.selected == true">选择</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" v-show="node.nodeType != 'E' && node.copyUserShow == true && node.selected == true">
              <el-row :gutter="2">
                <el-col :span="12">
                  <el-input v-model="node.copyUser" type="input" readonly autosize></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button icon="message" @click="agreeSelectCopyUser(node, index1)">抄送</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-form-item>
        </el-checkbox-group>
        <el-checkbox-group>
          <el-form-item v-if=" instanceIdInfo.handleType == 5 || instanceIdInfo.handleType == 6 " style="min-width: 380px" align="left">
            <el-col style="width: auto; padding-left: 125px">
              <el-row>
                <el-radio v-model="agreeIsLastRadio" label="N">不提前提交</el-radio>
                <el-radio v-model="agreeIsLastRadio" label="Y">提前提交</el-radio>
              </el-row>
            </el-col>
          </el-form-item>
        </el-checkbox-group>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="agreeFn">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="agreeNodeSelect.userTitle" :visible.sync="agreeNodeSelect.showUserDialog">
      <el-card class="box-card" v-show="agreeNextNodes[agreeIndex] != undefined">
        <el-tag v-for="tag in agreeNextNodes[agreeIndex].userInfos" :key="tag.userId" type="success" closable @close="agreeTagClose(tag)">
          {{ tag.userName }}
        </el-tag>
      </el-card>
      <el-table ref="agreeUserTableRef" :data="agreeNodeSelect.userTableData.slice((currpage-1)*pagesize,(currpage)*pagesize)" @row-dblclick="agreeRowDbClick">
        <el-table-column prop="userId" label="用户ID" align="center"> </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center"> </el-table-column>
      </el-table>
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" :page-size="pagesize" :total="agreeNodeSelect.userTableData.length" @current-change="currpageChange" @size-change="pagesizeChange">
      </el-pagination>
      <div style="margin-top: 20px">
        <el-button @click="agreeUserClose">选取返回</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="callbackNodeSelect.title" :visible.sync="callbackNodeSelect.showDialog" height="300px" @open="backDialogOpen" @close="wfCallBackClose">
      <el-tabs v-model="backActiveName" type="card">
        <el-tab-pane label="打回节点" name="first" align="center">
          <el-row style="margin-top: 20px" align="center">
            <el-col>
              <el-radio-group v-model="backNodeModel" @change="radioChange" style="width: 600px" align="left">
                <el-row :gutter="10" v-for="item in backNodes" :key="item.nodeId">
                  <el-col :span="8" font-size="14px">
                    <el-radio :label="item.nodeId" :key="item.nodeName">{{ item.nodeName }}
                    </el-radio>
                  </el-col>
                    <el-col :span="16">
                    <el-radio-group v-model="userModel" v-show="item.selected">
                      <el-radio v-for="item1 in item.usersList" :label="item1.userId" :key="item1.userName" font-size="14px">{{ item1.userName }}</el-radio>
                    </el-radio-group>
                  </el-col>
                </el-row>
              </el-radio-group>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="打回后节点提交方式" name="second" align="center">
          <el-form ref="form" align="center">
            <el-form-item style="margin-bottom: 15px"></el-form-item>
            <el-form-item align="center">
              <el-radio-group v-model="backnode" align="center">
                <el-radio :label="0">直接提交到打回节点</el-radio>
                <el-radio :label="1">沿流程路径逐级提交</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" align="center">
        <el-button type="primary" @click="wfCallBack">确 定</el-button>
        <el-button type="primary" @click="wfCallBackClose">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="jumpNodeSelect.title" :visible.sync="jumpNodeSelect.showDialog" height="300px" @close="jumpClose">
      <el-form ref="form" label-width="120px">
        <el-radio-group v-model="jumpNodeModel" @change="jumpradioChange" style="width: 600px; margin-left: auto">
          <el-form-item v-for="(node, index1) in jumpNodes" style="margin: auto" :key="index1">
            <el-col :span="8">
              <el-radio :label="node.nodeId">{{ node.nodeId + "-" + node.nodeName }}
              </el-radio>
            </el-col>
            <el-col :span="12" v-show="node.selected">
              <el-input v-model="node.selectUser.userName" type="textarea" autosize></el-input>
            </el-col>
            <el-col :span="4" v-show="node.selected">
              <el-button @click="jumpSelectUser(node, index1)">选择</el-button>
            </el-col>
          </el-form-item>
        </el-radio-group>
      </el-form>
      <div slot="footer" align="center">
        <el-button type="primary" @click="jumpFn()">确 定</el-button>
        <el-button type="primary" @click="jumpClose">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="UserSelect[title]" :visible.sync="UserSelect.showUserDialog">
      <el-card class="box-card" v-show="true">
        <el-tag v-for="tag in UserSelect.SelectUsers" :key="tag.userId" type="success" closable @close="TagClose(tag)">
          {{ tag.userName }}
        </el-tag>
      </el-card>
      <el-table ref="UserTableRef" :data="UserSelect.Users.slice((currpage-1)*pagesize,(currpage)*pagesize)" @row-dblclick="RowDbClick">
        <el-table-column prop="userId" label="用户ID" align="center"> </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center"> </el-table-column>
      </el-table>
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="UserSelect.Users.length">
      </el-pagination>
      <div style="margin-top: 20px">
        <el-button v-if="title == 'jump' || title == 'copy'" @click="UserDialogClose">选取返回</el-button>
        <el-button type="primary" v-if="title == 'change'" @click="UserDialogClose">确定转办</el-button>
        <el-button type="primary" v-if="title == 'assist'" @click="UserDialogClose">确定协办</el-button>
      </div>
    </el-dialog>
    <yu-xdialog title="风险拦截" :visible.sync="riskdialogVisible" width="850px">
    <yu-xtable ref="refTablerisk" :pageable="false" :data="riskData" row-number>
      <yu-xtable-column label="风险拦截项目" width="300" prop="itemName"></yu-xtable-column>
      <yu-xtable-column label="拦截结果" prop="resultDesc"></yu-xtable-column>
      <yu-xtable-column label="是否通过" width="120" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.result==1" class="el-icon-yx-checkmark" style="margin-top: 7px;font-size: 30px;color: #13ce66;"></i>
          <i v-if="scope.row.result==2" class="el-icon-loading" style="margin-top: 7px;font-size: 28px;color:#20a0ff"></i>
          <i v-if="scope.row.result==3&&scope.row.riskLevel==1" class="el-icon-yx-info" style="margin-top: 7px;font-size: 30px;color:#20a0ff"></i>
          <i v-if="scope.row.result==3&&scope.row.riskLevel==2" class="el-icon-yx-warning" style="margin-top: 7px;font-size: 30px;color:#f7ba2a"></i>
          <i v-if="scope.row.result==3&&scope.row.riskLevel==3" class="el-icon-yx-cancel-circle" style="margin-top: 7px;font-size: 30px;color: #ff4949"></i>
        </template>
      </yu-xtable-column>
    </yu-xtable>
    <div class="yu-grpButton" style="margin-top:8px;">
      <yu-button icon="check" type="primary" @click="checkRiskFn(true)">确定</yu-button>
      <yu-button icon="yx-undo2" type="primary" @click="cancelRiskFn">取消</yu-button>
    </div>
  </yu-xdialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ctrLoanContView from '@/views/zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrLoanContAppr';
import imageSystem from '@/views/imageManage/imageSystem';
import contPrint from '@/views/zrcbank/biz/sellManagerBiz/ctrLoanCont/contPrint';
import grtContIndex from '@/views/grtmanage/smallCreditManage/grtContIndex';
import ctrLoanContPiFu from '@/views/zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrLoanContPiFu';
import ctrToppAcctSub from '@/views/zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrToppAcctSubView';
let data = {};
export default {
  components: {ctrLoanContView, imageSystem, contPrint, grtContIndex, ctrLoanContPiFu, ctrToppAcctSub},
  name: 'InstanceInfo',
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    var _this = this;
    return {
      flag: false,
      pageParams: {contNo: this.bizPageData.instanceInfo.bizId},
      isSignUser: false,
      isCommotOtherGSB: '',
      commotOtherDeptGSB: '',
      isCommotOtherSXB: '',
      commotOtherDeptSXB: '',
      isUpperAppr: '',
      upperApprAuth: '',
      isLowerAppr: '',
      apprBackReason: '',
      value5: '',
      value6: '',
      isCommotOtherGSBShow: '',
      commotOtherDeptGSBShow: '',
      isCommotOtherSXBShow: '',
      commotOtherDeptSXBShow: '',
      isUpperAuthShow: '',
      upperApprAuthTypeShow: '',
      isLowerAuthShow: '',
      apprBackReasonShow: '',
      rule5: '',
      rule6: '',
      showApproveTab: true,
      urls: {
        index: backend.workflowService + '/api/bench/todo',
        instanceInfo: backend.workflowService + '/api/core/instanceInfo',
        saveComment: backend.workflowService + '/api/core/saveComment/',
        signIn: backend.workflowService + '/api/core/signIn/',
        unSignIn: backend.workflowService + '/api/core/unSignIn/',
        getComments: backend.workflowService + '/api/core/getAllComments/',
        getNextNodeInfos: backend.workflowService + '/api/core/getNextNodeInfos/',
        submit: backend.workflowService + '/api/core/submit',
        returnBack: backend.workflowService + '/api/core/returnBack',
        refuse: backend.workflowService + '/api/core/refuse',
        callBack: backend.workflowService + '/api/core/callBack',
        jump: backend.workflowService + '/api/core/jump',
        assist: backend.workflowService + '/api/core/assist',
        change: backend.workflowService + '/api/core/change',
        getchangeUser: backend.workflowService + '/api/core/getChangeUsers',
        getassistUser: backend.workflowService + '/api/core/getAssistUsers',
        unSignInTaskPool: backend.workflowService + '/api/core/unsignTaskPool',
        subFlowStart: backend.workflowService + '/api/core/subFlowStart',
        nwfbiz: backend.workflowService + '/api/biz/',
        getCopyUser: backend.workflowService + '/api/core/getCopyUsers'
      },
      height: yufp.frame.size().height - 103,
      currentOrgId: '',
      currentUserId: '',
      returnBackFuncId: '',
      returnBackRootId: '',
      instanceIdInfo: {
        instanceId: '',
        mainInstanceId: '',
        flowName: '',
        flowId: '',
        flowStarter: '',
        flowStarterName: '',
        startTime: '',
        systemId: '',
        orgId: '',
        flowState: '',
        bizId: '',
        bizUserName: '',
        bizUserId: '',
        bizType: '',
        lastNodeId: '',
        lastNodeName: '',
        nodeId: '',
        nodeSign: '',
        nodeName: '',
        nodeState: '',
        nodeStateName: '',
        nodeType: '',
        handleType: '',
        opType: {},
        returnBackFuncId: ''
      },
      commentInfo: {
        instanceId: '',
        nodeId: '',
        userId: '',
        commentId: '',
        commentSign: '',
        userComment: '',
        ext: '无',
        optType: '',
        optReasTyp: ''
      },
      flowParam: [],
      bizParam: {},
      commentRules: {
        userComment: [
          {
            required: true,
            message: '请填写意见',
            trigger: 'blur'
          },
          {
            max: 2000,
            message: '长度不能超过2000个字符'
          }
          // { validator: validator.speChar }
        ],
        commentSign: [
          {
            required: true,
            message: '请选择',
            trigger: 'blur'
          }
          // { validator: validator.speChar }
        ]
      },
      opNames: {
      // 操作权限常量列表
        submit: {
          label: '同意',
          value: 'O-12'
        },
        takeBack: {
          key: 'takeBack',
          label: '拿回',
          value: 'O-0'
        },
        callBack: {
          key: 'callBack',
          label: '退回',
          value: 'O-1'
        },
        // 不使用
        returnBack: {
          key: 'returnBack',
          label: '退回(废弃)',
          value: 'O-2'
        },
        hangUp: {
          key: 'hangUp',
          label: '挂起',
          value: 'O-3'
        },
        wakeUp: {
          key: 'wakeUp',
          label: '唤醒',
          value: 'O-4'
        },
        urge: {
          key: 'urge',
          label: '催办',
          value: 'O-5'
        },
        change: {
          key: 'change',
          label: '转办',
          value: 'O-6'
        },
        assist: {
          key: 'assist',
          label: '协办',
          value: 'O-7'
        },
        refuse: {
          key: 'refuse',
          label: '否决',
          value: 'O-8'
        },
        jump: {
          key: 'jump',
          label: '跳转',
          value: 'O-9'
        },
        entrust: {
          key: 'entrust',
          label: '委托',
          value: 'O-10'
        },
        copy: {
          key: 'copy',
          label: '抄送',
          value: 'O-11'
        },
        auto: {
          key: 'auto',
          label: '自动提交',
          value: 'O-13'
        },
        end: {
          key: 'end',
          label: '正常结束',
          value: 'O-14'
        },
        takeBackFirst: {
          key: 'takeBackFirst',
          label: '撤回',
          value: 'O-15'
        },
        start: {
          key: 'start',
          label: '待发起',
          value: 'O-16'
        },
        cancel: {
          key: 'cancel',
          label: '废除',
          value: 'O-17'
        },
        reStart: {
          key: 'reStart',
          label: '再议',
          value: 'O-18'
        }
      },
      button: {
      // 按钮权限控制
        submit: '1',
        gather: '0',
        callBack: '0',
        entrust: '0',
        copy: '0',
        jump: '0',
        returnBack: '0',
        change: '0',
        unSignIn: '0',
        signIn: '0',
        assist: '0',
        refuse: '0',
        taskPoolId: '0',
        subFlowId: '0',
        subFlow: '',
        reStart: '0'
      },
      agreeNodeSelect: {
        title: '同意提交',
        showDialog: false,
        nodeUrl: backend.workflowService + '/api/core/getNextNodeInfos/',
        userTitle: '办理人员选择',
        showUserDialog: false,
        userUrl: backend.workflowService + '/api/core/getNodeUsers',
        userTableData: []
      },
      callbackNodeSelect: {
        title: '打回节点选择',
        showDialog: false,
        nodeUrl: backend.workflowService + '/api/core/getCallBackNodes'
      },
      jumpNodeSelect: {
        title: '跳转节点选择',
        showDialog: false,
        nodeUrl: backend.workflowService + '/api/core/getJumpNodes',
        userTitle: '跳转节点办理人员选择'
      },
      UserSelect: {
        jump: '跳转节点办理人员选择',
        assist: '协办人员选择',
        change: '转办人员选择',
        copy: '抄送人员选择',
        showUserDialog: false,
        userUrl: backend.workflowService + '/api/core/getNodeUsers',
        Users: [],
        SelectUsers: []
      },
      biztableColumns: [
        {
          label: '业务类型',
          prop: 'bizType',
          resizable: true,
          align: 'center'
        },
        {
          label: '描述',
          prop: 'ext',
          resizable: true,
          align: 'center'
        },
        {
          label: '流程名称',
          prop: 'flowName',
          resizable: true,
          align: 'center'
        }
      ],
      queryFields: [
        {
          placeholder: '业务类型',
          field: 'bizType',
          type: 'input'
        },
        {
          placeholder: '流程名称',
          field: 'flowName',
          type: 'input'
        }
      ],
      queryButtons: [
        {
          label: '搜索',
          op: 'submit',
          type: 'primary',
          icon: 'search',
          click: function (model, valid) {
            if (valid) {
              var params = {};
              if (model.bizType != '') {
                params.bizType = '%' + model.bizType + '%';
              }
              if (model.flowName != '') {
                params.flowName = '%' + model.flowName + '%';
              }
              var param = {
                condition: JSON.stringify(params)
              };
              _this.$refs.bizTypeTable.remoteData(param);
            }
          }
        },
        {
          label: '重置',
          op: 'reset',
          type: 'primary',
          icon: 'yx-loop2'
        }
      ],
      jumpNodeModel: '',
      jumpNodes: [],
      input: '',
      title: '',
      index: 0,
      agreeIndex: 0,
      agreeNextNodes: [{}],
      agreeShowRadio: false,
      agreeRadio: '',
      agreeCheckBox: [],
      agreeIsLastRadio: 'N',
      backActiveName: 'first',
      backNodeModel: '',
      userModel: '',
      // usersList: [],
      backNodes: [],
      historyValue: [],
      nodeHistory: [],
      pagesize: 10,
      currpage: 1,
      backnode: 1,
      nwfbiztypePage: 'nwfbiztypePage' + Date.now(),
      bizPage: '',
      nwfgatherPage: 'nwfgatherPage' + Date.now(),
      lmtDataQualityAssPage: 'lmtDataQualityAssPage' + Date.now(),
      nwflmtReplyApproPage: 'nwflmtReplyApproPage' + Date.now(),
      nwfinspectReportPage: 'nwfinspectReportPage' + Date.now(),
      nwflmtReplyApproMeetingPage: 'nwflmtReplyApproMeetingPage' + Date.now(),
      isLmtDataQualityAssShow: false,
      islmtReplyApproShow: false,
      isinspectReportShow: false,
      islmtReplyApproMeetingShow: false,
      gatherPage: '',
      gatherPageData: null,
      endNodeId: '',
      showbizTypeDialog: false,
      bizTypeTitle: '业务类型选取',
      bizTypeParam: {},
      isCopy: '1',
      copyUserName: '',
      commentinfo: '',
      // 打回添加操作分类及原因分类填写
      opDialog: {
        dialogTitle: '操作分类及操作原因分类填写',
        showDialog: false,
        formData: {},
        opDict: [], // 操作分类字典项
        opReasDict: [], // 操作原因分类字典项
        opType: '' // 否决或者打回的标志
      },
      optypeOptions: [],
      // 退回原因
      reasonOptions: [
        {
          value: '1',
          label: '材料缺失'
        },
        {
          value: '2',
          label: '调查报告问题'
        },
        {
          value: '3',
          label: '其他'
        }
      ],
      currentOrgName: '',
      nwfmeetPage: 'nwfmeetPage' + Date.now(),
      meetstart: '@/views/workflow/instance/metting/meetstart.vue',
      meetPageShow: false,
      meetData: null,
      tabValue: 'first',
      // 风险拦截相关
      riskData: [],
      riskParam: [],
      riskdialogVisible: false,
      subOtherDeptComOptions: [{
        key: '1',
        value: '合规部'
      }, {
        key: '2',
        value: '特资部'
      }, {
        key: '3',
        value: '合规部，特资部'
      }, {
        key: '4',
        value: '特资部，合规部'
      }],
      apprBackReasonTypeOptions: [{
        key: '1',
        value: '授信资料资料不全，不准确'
      }, {
        key: '2',
        value: '调查报告质量不全面、不合逻辑'
      }, {
        key: '3',
        value: '系统操作错误'
      }, {
        key: '4',
        value: '由于系统原因的非差错类退回'
      }, {
        key: '5',
        value: '总行要求修改授信方案'
      }, {
        key: '6',
        value: '客户经理要求退回'
      }, {
        key: '7',
        value: '其他不符合我行授信政策退回'
      }],
      upperApprAuthOptions: [{
        key: '03',
        value: '三签模式'
      }, {
        key: '04',
        value: '三人会商模式'
      }, {
        key: '05',
        value: '贷审会模式'
      }],
      roolReason: '', // 集中作业退回原因
      showRoolReason: false, // 展示13708bug变更需求退回原因
      roolBackReasonTypeOptions: [],
      roolBackReasonTypeOptionHT: [{
        key: 'HTR001',
        value: '合同要素录入有误'
      }, {
        key: 'HTR002',
        value: '授信条件未落实或不符'
      }, {
        key: 'HTR003',
        value: '合同使用不符合要求'
      }, {
        key: 'HTR004',
        value: '资料不全'
      }, {
        key: 'HTR005',
        value: '扫描的影像资料不符合要求'
      }, {
        key: 'HTR006',
        value: '其他'
      }], // 合同申请退回原因
      roolBackReasonTypeOptionFK: [{
        key: 'FKR001',
        value: '系统出账信息录入有误'
      }, {
        key: 'FKR002',
        value: '系统其他信息录入有误'
      }, {
        key: 'FKR003',
        value: '放款资料不全'
      }, {
        key: 'FKR004',
        value: '重要法律文本（合同、借据等）填写有误或不规范'
      }, {
        key: 'FKR005',
        value: '授信条件未落实'
      }, {
        key: 'FKR006',
        value: '受托支付资料不符合规定'
      }, {
        key: 'FKR007',
        value: '扫描的影像资料不符合要求'
      }, {
        key: 'FKR008',
        value: '由于信贷系统等原因非差错类退回'
      }, {
        key: 'FKR009',
        value: '其他资料填写有误或不规范'
      }], // 合同启用/放款环节退回
      roolBackReasonTypeOptionDY: [{
        key: 'DYR001',
        value: '合同要素录入有误'
      }, {
        key: 'DYR002',
        value: '资料不全'
      }, {
        key: 'DYR003',
        value: '抵押资料未按要求填写'
      }, {
        key: 'DYR004',
        value: '未双录影像'
      }, {
        key: 'DYR005',
        value: '信贷合同未按要求填写'
      }], // 抵押登记退回原因
      roolBackReasonTypeOptionYP: [{
        key: 'YPR001',
        value: '指令不符合要求'
      }, {
        key: 'YPR002',
        value: '系统信息录入有误'
      }, {
        key: 'YPR003',
        value: '扫描的影像资料缺失或不符合要求'
      }], // 新增押品退回原因
      roolBackReasonTypeOptionZX: [{
        key: 'ZXR001',
        value: '授权书上授权内容与系统中不一致'
      }, {
        key: 'ZXR002',
        value: '扫描的影像资料缺失或不符合要求'
      }], // 征信退回原因
      isAuthorizer: false, //仅集中作业人员操作退回原因roolReason
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org']),
    childParams: function () {
      let _this = this;
      const data = _this.bizPageData;
      let params = {data};
      return params;
    },
    authority () {
      return 'import;delImg;insert;scan;replace;copy;cut;download;setValidDate;approve;takePic;reuse;move';
    },
    imageBizParam () {
      let imageBizParam = [
        {
          'top_outsystem_code': 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;',
          'outsystem_code': '',
          'index': {
            'assuretype': '',
            'dzyid': '',
            'docid': '',
            'businessid': this.bizPageData.instanceInfo.bizId,
            'custconduct': '',
            'operid': '',
            'bzrid': '',
            'custconductname': '',
            'orgid': '',
            'custtype': '',
            'loadtype': '',
            'contid': this.bizPageData.instanceInfo.bizId,
            'orgname': '',
            'opername': '',
            'custid': '',
            'creditamount': '',
            'maintaindate': '',
            'billno': '',
            'custname': '',
            'credittype': ''
          }
        }
      ];
      return imageBizParam;
    },
    gtrContParams: function () {
      let _this = this;
      return {op: 'VIEW', iqpSerno: _this.bizPageData.instanceInfo.param.iqpSerno };
    },
    ctrLoanContPiFuParams: function () {
      let _this = this;
      return {iqpSerno: _this.bizPageData.instanceInfo.param.iqpSerno };
    },
    ctrToppAcctSubParams: function () {
      let _this = this;
      return {contNo: _this.bizPageData.instanceInfo.bizId };
    }
  },
  created () {
    this.currentOrgId = this.org.id;
    this.currentOrgName = this.org.name;
    this.currentUserId = this.userCode;
  },
  mounted: function () {
    data = this.$route.params;

    if (data.nodeId == '231_13' || data.nodeId == '231_7') {
      this.flag = true;
    }

    // 进入初始化
    var param = {
      instanceId: data.instanceId,
      nodeId: data.nodeId,
      userId: data.userId,
      flowEdit: data.flowEdit
    };
    this.instanceInfoFn(param);
    this.instanceIdInfo.instanceId = data.instanceId;
    this.instanceIdInfo.nodeId = data.nodeId;
    this.instanceIdInfo.returnBackFuncId = data.returnBackFuncId;
    this.returnBackFuncId = data.returnBackFuncId;
    this.returnBackRootId = data.returnBackRootId;
    this.currentUserId = data.userId;
  },
  methods: {
    // （公司部） 【是否提交其他部门审批控制】
    chooseIsCommotOtherGSB: function (data) {
      var _this = this;
      if (data == '1') {
        _this.commotOtherDeptGSBShow = [
          {
            required: true,
            message: '必填项',
            trigger: 'blur'
          }
        ];
      } else {
        _this.commotOtherDeptGSBShow = '';
        _this.commotOtherDeptGSB = '';
      }
    },
    // （授信部） 【是否提交其他部门审批控制】
    chooseIsCommotOtherSXB: function (data) {
      var _this = this;
      var bizType = this.instanceIdInfo.bizType;
      var nodeId = this.instanceIdInfo.nodeId;
      var serno = this.instanceIdInfo.bizId;
      // （授信部）【是否提交其他部门审批】选择为【是】， 显示【其他审批部门】
      if (data == '1') {
        _this.commotOtherDeptSXBShow = [
          {
            required: true,
            message: '必填项',
            trigger: 'blur'
          }
        ];
        // 判断如果是第一个信贷管理部核查岗A，【是否提交其他部门审批（授信部）】选择为【是】的情况下，【是否上调权限】选项隐藏
        if (nodeId == '256_91' && (bizType == 'SX001' || bizType == 'SX002' || bizType == 'SX003' || bizType == 'SX004' || bizType == 'SX005' || bizType == 'SX006' || bizType == 'SX007' || bizType == 'SX008' || bizType == 'SX009' || bizType == 'SX010' || bizType == 'SX011' || bizType == 'SX012' || bizType == 'SX013' || bizType == 'SX014' || bizType == 'SX015')) {
          _this.isUpperAuthShow = '';
          _this.isUpperAppr = '';
          _this.upperApprAuth = '';
          _this.upperApprAuthTypeShow = '';
          _this.upperApprAuth = '';
          _this.upperApprAuthType = '';
        }
      } else {
        // （授信部）【是否提交其他部门审批】选择为【否】， 显示【其他审批部门】
        _this.commotOtherDeptSXBShow = '';
        _this.commotOtherDeptSXB = '';
        _this.isUpperAuthShow = [
          {
            required: true,
            message: '必填项',
            trigger: 'blur'
          }
        ];
      }
    },
    // （授信部） 【是否上调权限控制】
    chooseIsUpperAppr: function (data) {
      var _this = this;
      if (data == '1') {
        _this.upperApprAuthTypeShow = [
          {
            required: true,
            message: '必填项',
            trigger: 'blur'
          }
        ];
      } else {
        _this.upperApprAuthTypeShow = '';
        _this.upperApprAuth = '';
      }
    },
    isInformationComplete: function (data) {
      var _this = this;
      _this.commotOtherDeptGSBShow = [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        }
      ];
    },
    chooseCommentSign: function (data) {
      var _this = this;
      var bizType = _this.instanceIdInfo.bizType;
      var flowId = _this.instanceIdInfo.flowId;
      var nodeId = _this.instanceIdInfo.nodeId;
      // 退回的时候 授信审批流程 不属于总行审批
      if (data == 'O-1') {
        if (bizType == 'SX001' || bizType == 'SX002' || bizType == 'SX003' || bizType == 'SX004' || bizType == 'SX005' || bizType == 'SX006' || bizType == 'SX007' || bizType == 'SX008' || bizType == 'SX009' || bizType == 'SX010' || bizType == 'SX011' || bizType == 'SX012' || bizType == 'SX013' || bizType == 'SX014' || bizType == 'SX015') {
          if (nodeId != '256_9' && nodeId != '256_30' && nodeId != '256_6' && nodeId != '256_280' && nodeId != '256_12' && nodeId != '256_13' && nodeId != '256_28' && nodeId != '256_5' && nodeId != '256_20' && nodeId != '256_144' && nodeId != '256_8' && nodeId != '256_39') {
            _this.apprBackReasonShow = [
              {
                required: true,
                message: '必填项',
                trigger: 'blur'
              }
            ];
          }
        }
        let isNeedRoolbackReason = false; //退回是否需要展示集中作业审批退回原因
        const dutys = this.$xutils.getLoginUserInfo().dutys;
        try {
          dutys.forEach((item) => {
            if (item.code.indexOf('ZYB') > -1) {
              this.isAuthorizer = true;
              return;
            }
          });
        } catch (e) {
          throw e;
        }
        if (bizType.indexOf('YX001') > -1 || bizType.indexOf('YX002') > -1 || bizType.indexOf('YX003') > -1 || bizType.indexOf('YX005') > -1 || bizType.indexOf('YX006') > -1 || bizType.indexOf('YX007') > -1 || bizType.indexOf('YX008') > -1 || bizType.indexOf('LS004') > -1) { // 合同申请退回
          _this.roolBackReasonTypeOptions = Object.assign([], this.roolBackReasonTypeOptionHT);
          isNeedRoolbackReason = true;
        } else if (bizType.indexOf('DB002') > -1 || bizType.indexOf('DB003') > -1) { // 抵押登记退回
          _this.roolBackReasonTypeOptions = Object.assign([], this.roolBackReasonTypeOptionDY);
          isNeedRoolbackReason = true;
        } else if (bizType.indexOf('DB001') > -1) { // 新增押品退回
          _this.roolBackReasonTypeOptions = Object.assign([], this.roolBackReasonTypeOptionYP);
          isNeedRoolbackReason = true;
        } else if (bizType.indexOf('ZX001') > -1 || bizType.indexOf('ZX003') > -1) { // 征信业务退回
          _this.roolBackReasonTypeOptions = Object.assign([], this.roolBackReasonTypeOptionZX);
          isNeedRoolbackReason = true;
        } else if (bizType.indexOf('BG026') > -1 || bizType.indexOf('BG027') > -1 || bizType.indexOf('HZ005') > -1 || bizType.indexOf('HZ006') > -1 || bizType.indexOf('HZ018') > -1 || bizType.indexOf('LS005') > -1 || bizType.indexOf('LS006') > -1 || bizType.indexOf('LS007') > -1 || bizType.indexOf('YX010') > -1 || bizType.indexOf('YX011') > -1 || bizType.indexOf('YX012') > -1 || bizType.indexOf('YX013') > -1) { // 合同启用退回原因同放款环节退回原因
          _this.roolBackReasonTypeOptions = Object.assign([], this.roolBackReasonTypeOptionFK);
          isNeedRoolbackReason = true;
        }
        if (this.isAuthorizer && isNeedRoolbackReason) {
          _this.showRoolReason = true;
          _this.commentRules.ext = [
            {
              required: true,
              message: '请选择',
              trigger: 'blur'
            }
          ]
        }
      } else {
        _this.showRoolReason = false;
        _this.apprBackReasonShow = [];
      }
      // 同意的时候
      if (data == 'O-12') {
        // TODO hxl待定
        if (bizType == 'HZ001' || bizType == 'HZ002' || bizType == 'HZ005' || bizType == 'HZ006' || bizType == 'BG005' || bizType == 'BG008' || bizType == 'BG015' || bizType == 'SX001' || bizType == 'SX002' || bizType == 'SX003' || bizType == 'SX004' || bizType == 'SX005' || bizType == 'SX006' || bizType == 'YX010' || bizType == 'YX011' || bizType == 'YX013' || bizType == 'YX012' || bizType == 'LS005' || bizType == 'LS006' || bizType == 'LS007' || bizType == 'XW002') {
          if (nodeId == '305_25' || nodeId == '307_14' || nodeId == '256_105' || nodeId == '256_91' || nodeId == '243_6' || nodeId == '243_7' || nodeId == '244_8' || nodeId == '244_9' || nodeId == '245_9' || nodeId == '245_11' || nodeId == '232_7' || nodeId == '232_8' || nodeId == '233_6' || nodeId == '229_5' || nodeId == '296_5' || nodeId == '233_7') {
            _this.rule5 = [
              {
                required: true,
                message: '必填项',
                trigger: 'blur'
              }
            ];
          }
        }
        if (bizType == 'YX011' || bizType == 'YX013' || bizType == 'YX012' || bizType == 'LS005' || bizType == 'LS006' || bizType == 'LS007' || bizType == 'XW002') {
          if (nodeId == '244_8' || nodeId == '244_9' || nodeId == '245_9' || nodeId == '245_11' || nodeId == '232_7' || nodeId == '232_8' || nodeId == '233_6' || nodeId == '229_5' || nodeId == '296_5' || nodeId == '233_7') {
            _this.rule6 = [
              {
                required: true,
                message: '必填项',
                trigger: 'blur'
              }
            ];
          }
        }
      } else {
        _this.rule5 = '';
        _this.rule6 = '';
      }
    },
    /** 风险拦截相关 --- 开始 */
    riskFn: function () {
      var _this = this;
      // 流程参数
      _this.riskData.splice(0, _this.riskData.length);
      let model = {condition: JSON.stringify({ 'sceneId': _this.instanceIdInfo.nodeId, 'bizType': _this.instanceIdInfo.bizType })};
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCfg + '/api/prdpvriskscene/getRiskItem',
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.data) {
            if (response.data.length == 0) {
              _this.agreeDialogOpen();
            } else {
              _this.riskStart(response.data, _this.instanceIdInfo);
            }
          } else {
            _this.$message({ message: '初始化风险拦截失败', type: 'error' });
            _this.beforeClose();
          }
        }
      });
    },
    // 发起风险拦截
    riskStart: function (data, wfInitData) {
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.itemName = data[i].itemName;
        obj.riskLevel = data[i].riskLevel;
        obj.result = '2';
        this.riskData.push(obj);
        arr.push(this.riskitem(data[i], wfInitData, i));
      }
      this.riskdialogVisible = true;
      Promise.all(arr).then(res => {
        console.log(res);
      });
    },
    /** 单项拦截 */
    riskitem (item, wfInitData, i) {
      return new Promise((resolve, reject) => {
        let _this = this;
        // model.inputId = _this.loginCode;
        _this.$request({
          url: this.evil(item.itemClass) + '?i=' + i,
          method: 'POST',
          data: JSON.stringify({ condition: JSON.stringify(wfInitData) })
        }).then(({ code, message, data }) => {
          if (data) {
            item.result = data.riskResultType;
            item.resultDesc = data.riskResultDesc;
            _this.$set(_this.riskData, i, item);
          } else {
            item.result = '3';
            item.resultDesc = '检查失败';
            _this.$set(_this.riskData, i, item);
          }
          resolve(data);
        });
      });
    },
    // 转义代码
    evil (fn) {
      let Fn = Function;
      return new Fn('return ' + fn)();
    },
    /** 检查拦截结果 */
    checkRiskFn (btn) {
      var _this = this;
      for (let i = 0; i < _this.riskData.length; i++) {
        let item = _this.riskData[i];
        // 检查未完成
        if (item.result == 2) {
          return;
        }
        // 检查不通过,且等级是拦截
        if (item.result == 3 && item.riskLevel == 3) {
          this.riskdialogVisible = false;
          return;
        }
      }
      this.riskdialogVisible = false;
      // 检查通过,继续发起流程
      this.agreeDialogOpen();
    },
    cancelRiskFn () {
      this.riskdialogVisible = false;
    },
    /** 风险拦截相关 --- 结束 */
    setApproveTabVisiable: function (visible) {
      this.showApproveTab = visible;
    },
    // 详情页Tab页点击事件
    tabClick: function (tab, event) {
      var _this = this;
      if (tab.name == 'second') {
        // 获取流程历史数据
        yufp.service.request({
          async: false,
          method: 'GET',
          url: _this.urls.getComments,
          data: {
            mainInstanceId: _this.instanceIdInfo.mainInstanceId
          },
          callback: function (code, message, response) {
            if (response.code == 0) {
              if (response.data != null ? response.data.length > 0 : false) {
                _this.commentinfo = '';
                var nodeHistory = response.data;
                // commentSign翻译
                for (var i = 0, length = nodeHistory.length; i < length; i++) {
                  nodeHistory[i].commentSign = yufp.lookup.convertKey(
                    'OP_TYPE',
                    nodeHistory[i].commentSign
                  );
                }
                _this.instanceIdInfo;
                // 判断是否为会办汇总后的节点
                if (nodeHistory[nodeHistory.length - 1].userId == 'sign_user') {
                  _this.isSignUser = true;
                  _this.voterAdvicesList(nodeHistory[nodeHistory.length - 1].instanceId, _this.instanceIdInfo.bizId);
                }
                _this.nodeHistory = nodeHistory;
              } else {
                _this.commentinfo = '暂无审批历史数据';
              }
            }
          }
        });
      } else if (tab.name == '4') {
        // 获取会办信息和页面
        var params = {
          bizId: _this.instanceIdInfo.bizId,
          instanceId: _this.instanceIdInfo.instanceId
        };
        // if (_this.button['gather'] != '0') {
        _this.$nextTick(function () {
          try {
            _this.gatherPageData = params;
            _this.gatherPage = function () {
              return Promise.resolve(
                require('@/views/workflow/instance/metting/mettingPage.vue')
                  .default
              );
            };
          } catch (e) {}
        });
        // }
      }
    },
    // 初始化投票人信息
    voterAdvicesList (data1, data2) {
      var _this = this;
      var params = {
        instanceId: data1,
        bizId: data2
      };
        // if (_this.button['gather'] != '0') {
      _this.$nextTick(function () {
        try {
          _this.gatherPageData = params;
          _this.gatherPage = function () {
            return Promise.resolve(
              require('@/views/workflow/instance/metting/mettingPage.vue')
                .default
            );
          };
        } catch (e) {}
      });
    },
    instanceInfoFn: function (param) {
      // 初始化实例信息
      var _this = this;
      yufp.service.request({
        method: 'GET',
        url: _this.urls.instanceInfo,
        data: param,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.instanceIdInfo = response.data;
            // yufp.clone(response.data, _this.instanceIdInfo);
            _this.instanceIdInfo.returnBackFuncId = _this.$route.params.returnBackFuncId;
            if (response.data.comment != null) {
              // 设置评论反显
              _this.commentInfo = response.data.comment;
              if (_this.commentInfo.commentSign !== null && _this.commentInfo.commentSign !== '') {
                _this.commentInfo.commentId = '';
              }
            }
            _this.commentInfo.instanceId = _this.instanceIdInfo.instanceId;
            _this.commentInfo.nodeId = _this.instanceIdInfo.nodeId;
            _this.commentInfo.userId = _this.currentUserId;
            // 按钮权限
            if (response.data.opType != null) {
              for (var key in _this.button) {
                var value = response.data.opType[key];
                if (value != null && value != '') {
                  _this.button[key] = value;
                }
              }
            }
            _this.getOptions();
            if (response.data.param != null) {
              _this.bizParam = response.data.param;
              // 流程参数初始化
              for (var key in response.data.param) {
                var paramTT = {};
                paramTT.key = key;
                paramTT.value = response.data.param[key];
                _this.flowParam.push(paramTT);
              }
            }
            var nodestate = _this.instanceIdInfo.nodeState;
            if (nodestate != '') {
              // 翻译节点状态
              _this.instanceIdInfo.nodeStateName = yufp.lookup.convertKey(
                'OP_TYPE',
                nodestate
              );
            }
            var bizPage = _this.instanceIdInfo.bizPage;
            if (bizPage == null ? false : bizPage.includes('?')) {
              var str = bizPage.split('?');
              bizPage = str[0];
              _this.convertParam(str[1]);
            }
            let tempParam = {};
            if (_this.flowParam && _this.flowParam.length > 0) {
              for (var i = 0; i < _this.flowParam.length; i++) {
                tempParam[_this.flowParam[i].key] = _this.flowParam[i].value;
              }
            }
            _this.instanceIdInfo.flowEdit = param.flowEdit;
            var paramT = {
              instanceInfo: _this.instanceIdInfo,
              flowParam: _this.bizParam,
              optypeOptions: _this.optypeOptions
            };
            _this.$nextTick(function () {
              try {
                var bizType = paramT.instanceInfo.bizType;
                var nodeId = paramT.instanceInfo.nodeId;
                var serno = paramT.instanceInfo.bizId;
                // 是否提交其他部门审批控制 如果是单一授信申请或者集团授信申请
                if (bizType == 'SX001' || bizType == 'SX002' || bizType == 'SX003' || bizType == 'SX004' || bizType == 'SX005' || bizType == 'SX006' || bizType == 'SX007' || bizType == 'SX008' || bizType == 'SX009' || bizType == 'SX010' || bizType == 'SX011' || bizType == 'SX012' || bizType == 'SX013' || bizType == 'SX014' || bizType == 'SX015') {
                  // 公司部是否提交其他部门审批
                  if (nodeId == '256_52') {
                    _this.isCommotOtherGSBShow = [
                      {
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                      }
                    ];
                  }
                  // 信贷部核查岗A 是否提交其他部门审批，是否上调权限
                  if (nodeId == '256_91') {
                    _this.isCommotOtherSXBShow = [
                      {
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                      }
                    ];
                    _this.isUpperApprShow = [
                      {
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                      }
                    ];
                  }
                  // 信贷部核查岗A 经过其他部门审批后 是否上调权限
                  if (nodeId == '256_105') {
                    var apprMode = paramT.flowParam.apprMode;
                    //
                    debugger;
                    if (apprMode == '03') {
                      _this.upperApprAuthOptions = [{
                        key: '04',
                        value: '三人会商模式'
                      }, {
                        key: '05',
                        value: '贷审会模式'
                      }];
                    }
                    if (apprMode == '04') {
                      _this.upperApprAuthOptions = [{
                        key: '05',
                        value: '贷审会模式'
                      }];
                    }
                    if (apprMode == '02' || apprMode == '03' || apprMode == '04') {
                      _this.isUpperApprShow = [
                        {
                          required: true,
                          message: '必填项',
                          trigger: 'blur'
                        }
                      ];
                    } else if (apprMode == '05' && (bizType == 'SX006' || bizType == 'SX013')) {
                      // 如果是贷审会模式，并且为授信变更的情况下
                      _this.isLowerAuthShow = [
                        {
                          required: true,
                          message: '必填项',
                          trigger: 'blur'
                        }
                      ];
                    }
                  }
                }
                if (bizType == 'SX001' || bizType == 'SX002' || bizType == 'SX003' || bizType == 'SX004' || bizType == 'SX005' || bizType == 'SX006' || bizType == 'SX007' || bizType == 'SX008' || bizType == 'SX009' || bizType == 'SX010' || bizType == 'SX011' || bizType == 'SX012' || bizType == 'SX013' || bizType == 'SX014' || bizType == 'SX015') {
                  if (nodeId != '256_9' && nodeId != '256_30' && nodeId != '256_6' && nodeId != '256_280' && nodeId != '256_12' && nodeId != '256_13' && nodeId != '256_28' && nodeId != '256_5' && nodeId != '256_20' && nodeId != '256_144' && nodeId != '256_8' && nodeId != '256_39') {
                    _this.isLmtDataQualityAssShow = true;
                    // 新增 授信资料质量考核
                    try {
                      // _this.qualityAssPage = response.data;
                      _this.qualityAssPage = function () {
                        return Promise.resolve(
                          require('@/views/workflow/instance/bizpage/lmtDataQualityAssPage.vue')
                            .default
                        );
                      };
                      _this.qualityAssPage.instanceInfo = _this.instanceIdInfo;
                      _this.gatherPageData = _this.qualityAssPage;
                    } catch (e) {}
                  }
                }
                // SX001-SX007  单一授信
                // 审查报告 授信批复  信贷管理部审查岗(原信贷管理部核查岗 91、105)、信贷管理部审查岗B（134、151）、信贷管理部审批人（2、167）、信贷管理部负责人（202、169）、三人会商秘书岗（汇总审批意见）（183）、信贷管理部分管行长（出终审意见）（187）、贷审会秘书岗（定制批复初稿）（205）、总行行长（208）
                if (bizType == 'SX001' || bizType == 'SX002' || bizType == 'SX003' || bizType == 'SX004' || bizType == 'SX005' || bizType == 'SX006' || bizType == 'SX007') {
                  if (nodeId == '256_91' || nodeId == '256_105' || nodeId == '256_134' || nodeId == '256_151' || nodeId == '256_2' || nodeId == '256_167' || nodeId == '256_202' || nodeId == '256_169' || nodeId == '256_183' || nodeId == '256_187' || nodeId == '256_205' || nodeId == '256_208') {
                    // 单一审查
                    _this.islmtReplyApproShow = true;
                    try {
                      _this.lmtReplyApproPage = function () {
                        return Promise.resolve(
                          require('@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/reviewReport.vue')
                            .default
                        );
                      };
                      _this.lmtReplyApproPage.instanceInfo = _this.instanceIdInfo;
                      _this.gatherPageData = _this.lmtReplyApproPage;
                    } catch (e) {}
                    // 单一批复
                    _this.islmtReplyApproMeetingShow = true;
                    try {
                      _this.lmtReplyApproMeetingPage = function () {
                        return Promise.resolve(
                          require('@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtReplyApproMeeting.vue')
                            .default
                        );
                      };
                      _this.lmtReplyApproMeetingPage.instanceInfo = _this.instanceIdInfo;
                      _this.gatherPageData = _this.lmtReplyApproMeetingPage;
                    } catch (e) {}
                  }
                  // 单一核查报告 公司部四个审批节
                  if (nodeId == '256_52' || nodeId == '256_82' || nodeId == '256_83' || nodeId == '256_84') {
                    _this.isinspectReportShow = true;
                    try {
                      _this.inspectReportPage = function () {
                        return Promise.resolve(
                          require('@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/inspectReport.vue')
                            .default
                        );
                      };
                      _this.inspectReportPage.instanceInfo = _this.instanceIdInfo;
                      _this.gatherPageData = _this.inspectReportPage;
                    } catch (e) {}
                  }
                }
                // sx008-sx015 集团授信  页面可能不对
                // 审查报告 授信批复  信贷管理部审查岗(原信贷管理部核查岗 91、105)、信贷管理部审查岗B（134、151）、信贷管理部审批人（2、167）、信贷管理部负责人（202、169）、三人会商秘书岗（汇总审批意见）（183）、信贷管理部分管行长（出终审意见）（187）、贷审会秘书岗（定制批复初稿）（205）、总行行长（208）
                if (bizType == 'SX008' || bizType == 'SX009' || bizType == 'SX010' || bizType == 'SX011' || bizType == 'SX012' || bizType == 'SX013' || bizType == 'SX014' || bizType == 'SX015') {
                  if (nodeId == '256_91' || nodeId == '256_105' || nodeId == '256_134' || nodeId == '256_151' || nodeId == '256_2' || nodeId == '256_167' || nodeId == '256_202' || nodeId == '256_169' || nodeId == '256_183' || nodeId == '256_187' || nodeId == '256_205' || nodeId == '256_208') {
                    // 集团审查
                    _this.islmtReplyApproShow = true;
                    try {
                      _this.lmtReplyApproPage = function () {
                        return Promise.resolve(
                          require('@/views/bizmanage/lmtBiz/lmtGrpApprBiz/lmtGrpApprInspect.vue')
                            .default
                        );
                      };
                      _this.lmtReplyApproPage.instanceInfo = _this.instanceIdInfo;
                      _this.gatherPageData = _this.lmtReplyApproPage;
                    } catch (e) {}
                    // 集团批复
                    _this.islmtReplyApproMeetingShow = true;
                    try {
                      _this.lmtReplyApproMeetingPage = function () {
                        return Promise.resolve(
                          require('@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtReplyApproMeeting.vue')
                            .default
                        );
                      };
                      _this.lmtReplyApproMeetingPage.instanceInfo = _this.instanceIdInfo;
                      _this.gatherPageData = _this.lmtReplyApproMeetingPage;
                    } catch (e) {}
                  }
                  // 集团核查报告 公司部四个审批节
                  if (nodeId == '256_52' || nodeId == '256_82' || nodeId == '256_83' || nodeId == '256_84') {
                    _this.isinspectReportShow = true;
                    try {
                      _this.inspectReportPage = function () {
                        return Promise.resolve(
                          require('@/views/zrcbank/biz/lmtGrpAppNew/lmtGrpAppDeclare/lmtGrpInspect.vue')
                            .default
                        );
                      };
                      _this.inspectReportPage.instanceInfo = _this.instanceIdInfo;
                      _this.gatherPageData = _this.inspectReportPage;
                    } catch (e) {}
                  }
                }
                _this.bizPageData = paramT;
                _this.bizPage = () =>
                  Promise.resolve(require('@/views/' + bizPage).default);
              } catch (e) {}
            });
            // 此节点有会办权限
            if (_this.button['gather'] !== '0') {
              _this.meetPageShow = true;
              _this.checkGatherData();
            }
            if ((_this.instanceIdInfo.nodeName === '贷审会秘书岗' && _this.meetPageShow) || (_this.instanceIdInfo.nodeName === '投委会秘书岗' && _this.meetPageShow)) {
              // 贷审会秘书岗组织会议页面，无流程审批
              _this.showApproveTab = false;
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '获取实例信息异常:' + response.message.substring(0, 100),
              type: 'error'
            });
          }
        }
      });
    },
    checkGatherData: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        data: { instanceId: _this.instanceIdInfo.instanceId },
        url: backend.workflowService + '/api/metting/checkMeet',
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              // 已发起会办
              _this.$nextTick(function () {
                try {
                  _this.meetData = response.data;
                  _this.meetPage = function () {
                    return Promise.resolve(
                      require('@/views/workflow/instance/metting/meetstart.vue')
                        .default
                    );
                  };
                  _this.meetData.instanceInfo = _this.instanceIdInfo;
                  _this.gatherPageData = _this.meetData;
                  _this.tabValue = 'meetstart';
                } catch (e) {}
              });
            } else {
              _this.gatherStartFn();
            }
          }
        }
      });
    },
    getOptions: function () {
      if (this.button['submit'] == '1') {
        this.optypeOptions.push(this.opNames['submit']);
      }
      if (this.button['callBack'] !== '0') {
        this.optypeOptions.push(this.opNames['callBack']);
      }
      if (this.button['returnBack'] !== '0') {
        this.optypeOptions.push(this.opNames['returnBack']);
      }
      if (this.button['refuse'] !== '0') {
        this.optypeOptions.push(this.opNames['refuse']);
      }
      if (this.button['signIn'] !== '0') {
        this.tabValue = 'third';
      }
      if (this.button['reStart'] !== '0') {
        this.optypeOptions.push(this.opNames['reStart']);
      }
    },
    convertParam: function (params) {
      if (params == null) {
        return;
      }
      if (params.includes(',')) {
        params = params.split(',');
        for (var k = 0; k < params.length; k++) {
          var paramf = {};
          var item = params[k];
          paramf.key = item.split('=')[0];
          paramf.value = item.split('=')[1];
          this.bizParam[paramf.key] = paramf.value;
          var isHave = false;
          for (var i = 0; i < this.flowParam.length; i++) {
            if (this.flowParam[i].key === paramf.key) {
              this.flowParam[i].value = paramf.value;
              isHave = true;
            }
          }
          if (!isHave) {
            this.flowParam.push(paramf);
          }
        }
      } else {
        var paramf = {};
        paramf.key = params.split('=')[0];
        paramf.value = params.split('=')[1];
        this.bizParam[paramf.key] = paramf.value;
        var isHave = false;
        for (var i = 0; i < this.flowParam.length; i++) {
          if (this.flowParam[i].key === paramf.key) {
            this.flowParam[i].value = paramf.value;
            isHave = true;
          }
        }
        if (!isHave) {
          this.flowParam.push(paramf);
        }
      }
    },
    submitFn: function (opType) {
      var bizType = this.bizPageData.instanceInfo.bizType;
      var nodeId = this.bizPageData.instanceInfo.nodeId;
      var serno = this.bizPageData.instanceInfo.bizId;
      var isinforcomplete = this.value5;
      var issignet = this.value6;
      var url;
      var _this = this;
      // 审批结论为 同意时
      if (opType == 'O-12') {
        // TYSX02  _31 信贷管理部负责人
        if (bizType == 'TY004' || bizType == 'TY005' || bizType == 'TY006') {
          if (nodeId == '137_31') {
            url = '/api/lmtintbankappr/updateAppr';
            messageBox(url, serno);
          } else {
            submitFun();
          }
        } else if (bizType == 'TY014' || bizType == 'TY015' || bizType == 'TY016') {
        // TYSX06  债券池
          if (nodeId == '161_31') {
            url = '/api/lmtsiginvestappr/updateAppr';
            messageBox(url, serno);
          } else {
            submitFun();
          }
        } else if (bizType == 'SX001' || bizType == 'SX002' || bizType == 'SX003' || bizType == 'SX004' || bizType == 'SX005' || bizType == 'SX006' || bizType == 'SX007') {
          // 单一授信流程处理
          if (nodeId == '256_52' || nodeId == '256_91' || nodeId == '256_105') {
            url = '/api/lmtappr/updatelmtapprchoose';
            updateApprChoose(url, serno);
          } else {
            submitFun();
          }
        } else if (bizType == 'SX008' || bizType == 'SX009' || bizType == 'SX010' || bizType == 'SX011' || bizType == 'SX012' || bizType == 'SX013' || bizType == 'SX014' || bizType == 'SX015') {
          // 集团授信流程处理
          if (nodeId == '256_52' || nodeId == '256_91' || nodeId == '256_105') {
            url = '/api/lmtgrpappr/updatelmtapprchoose';
            updateApprChoose(url, serno);
          } else {
            submitFun();
          }
        } else if (bizType == 'HZ001' || bizType == 'HZ002' || bizType == 'HZ005' || bizType == 'HZ006' || bizType == 'BG005' || bizType == 'BG008' || bizType == 'BG015' || bizType == 'SX001' || bizType == 'SX002' || bizType == 'SX003' || bizType == 'SX004' || bizType == 'SX005' || bizType == 'SX006' || bizType == 'YX010' || bizType == 'YX011' || bizType == 'YX013' || bizType == 'YX012' || bizType == 'LS005' || bizType == 'LS006' || bizType == 'LS007' || bizType == 'XW002') {
          if (nodeId == '305_25' || nodeId == '307_14' || nodeId == '256_105' || nodeId == '243_6' || nodeId == '243_7' || nodeId == '244_8' || nodeId == '245_9' || nodeId == '245_11' || nodeId == '232_7' || nodeId == '232_8' || nodeId == '233_6' || nodeId == '229_5' || nodeId == '296_5' || nodeId == '233_7') {
            url = '/api/businessinformation/updateinfComplete';
            toinfComplete(url, serno, bizType, isinforcomplete, issignet);
          } else {
            submitFun();
          }
        } else if (bizType == 'YX011' || bizType == 'YX013' || bizType == 'YX012' || bizType == 'LS005' || bizType == 'LS006' || bizType == 'LS007' || bizType == 'XW002') {
          if (nodeId == '244_8' || nodeId == '245_9' || nodeId == '245_11' || nodeId == '232_7' || nodeId == '232_8' || nodeId == '233_6' || nodeId == '229_5' || nodeId == '296_5' || nodeId == '233_7') {
            url = '/api/businessinformation/updatesignet';
            toissignet(url, serno, bizType, issignet);
          } else {
            submitFun();
          }
        } else if (bizType == 'QT004') {
          // 保证金存款特惠利率申请
          if (nodeId == '16_43') {
            // TODO
            url = '/api/otherbaildeppreferrateapp/upIsUpperApprAuth';
            messageBox(url, serno);
          } else {
            submitFun();
          }
        } else if (bizType == 'QT005') {
          // 银票手续费率优惠申请
          if (nodeId == '16_43') {
            // TODO
            url = '/api/otheraccpperferfeeapp/upIsUpperApprAuth';
            messageBox(url, serno);
          } else {
            submitFun();
          }
        } else if (bizType == 'QT006') {
          // 贴现优惠利率定价
          if (nodeId == '16_43') {
            // TODO
            url = '/api/otherdiscperferrateapp/upIsUpperApprAuth';
            messageBox(url, serno);
          } else {
            submitFun();
          }
        } else if (bizType == 'QT007') {
          // 银票签发及全资质押类业务备案申请
          if (nodeId == '16_43') {
            // TODO
            url = '/api/otherrecordaccpsignorallpldapp/upIsUpperApprAuth';
            messageBox(url, serno);
          } else {
            submitFun();
          }
        } else if (bizType == 'QT008') {
          // 银票签发业务每周计划表申请权限
          if (nodeId == '16_43') {
            // TODO
            url = '/api/otherrecordaccpsignplanapp/upIsUpperApprAuth';
            messageBox(url, serno);
          } else {
            submitFun();
          }
        } else if (bizType == 'QT009') {
          // 中行代签电票申请
          if (nodeId == '16_43') {
            // TODO
            url = '/api/otherrecordaccpsignofbocapp/upIsUpperApprAuth';
            messageBox(url, serno);
          } else {
            submitFun();
          }
        } else {
          submitFun();
        }
      } else {
        // 保存审批退回原因
        if (bizType == 'SX001' || bizType == 'SX002' || bizType == 'SX003' || bizType == 'SX004' || bizType == 'SX005' || bizType == 'SX006' || bizType == 'SX007') {
          if (nodeId != '256_9' || nodeId != '256_30' || nodeId != '256_6' || nodeId != '256_280' || nodeId != '256_12' || nodeId != '256_13' || nodeId != '256_28' || nodeId != '256_5' || nodeId != '256_20' || nodeId != '256_144' || nodeId != '256_8' || nodeId != '256_39') {
            url = '/api/lmtappr/updatelmtapprchoose';
            updateApprChoose(url, serno);
          }
        } else if (bizType == 'SX008' || bizType == 'SX009' || bizType == 'SX010' || bizType == 'SX011' || bizType == 'SX012' || bizType == 'SX013' || bizType == 'SX014' || bizType == 'SX015') {
          if (nodeId != '256_9' || nodeId != '256_30' || nodeId != '256_6' || nodeId != '256_280' || nodeId != '256_12' || nodeId != '256_13' || nodeId != '256_28' || nodeId != '256_5' || nodeId != '256_20' || nodeId != '256_144' || nodeId != '256_8' || nodeId != '256_39') {
            url = '/api/lmtgrpappr/updatelmtapprchoose';
            updateApprChoose(url, serno);
          }
        } else {
          submitFun();
        }
      }
      // 保存退回原因
      function saveApprBackReasonType (url, serno) {
        var params = {
          serno: serno,
          apprBackReasonType: _this.apprBackReasonType
        };
        yufp.service.request({
          method: 'POST',
          data: params,
          url: backend.cmisBiz + url,
          callback: function (code, message, response) {
            if (response.code == 0) {
              submitFun();
            } else {
              _this.$message({ message: '请求失败', type: 'error' });
            }
          }
        });
      }

      // 保存
      function updateApprChoose (url, serno) {
        var isSubToOtherDeptCom = _this.isCommotOtherGSB;
        var subOtherDeptCom = _this.commotOtherDeptGSB;
        var isSubToOtherDeptXd = _this.isCommotOtherSXB;
        var subOtherDeptXd = _this.commotOtherDeptSXB;
        var isUpperApprAuth = _this.isUpperAppr;
        var UpperApprAuthType = _this.upperApprAuth;
        var isLowerApprAuth = _this.isLowerAppr;
        var apprBackReasonType = _this.apprBackReason;
        var params = {
          serno: serno,
          isSubToOtherDeptCom: isSubToOtherDeptCom,
          subOtherDeptCom: subOtherDeptCom,
          isSubToOtherDeptXd: isSubToOtherDeptXd,
          subOtherDeptXd: subOtherDeptXd,
          isUpperApprAuth: isUpperApprAuth,
          UpperApprAuthType: UpperApprAuthType,
          isLowerApprAuth: isLowerApprAuth,
          apprBackReasonType: apprBackReasonType,
          instanceIdInfo: JSON.stringify(_this.instanceIdInfo)
        };
        yufp.service.request({
          method: 'POST',
          data: params,

          url: backend.cmisBiz + url,
          callback: function (code, message, response) {
            if (response.code == 0) {
              submitFun();
            } else {
              _this.$message({ message: '请求失败', type: 'error' });
            }
          }
        });
      }
      // 保存资料是否完整
      function toinfComplete (url, serno, bizType, isinforcomplete, issignet) {
        var _this = this;
        var params = {
          serno: serno,
          bizType: bizType,
          isinforcomplete: isinforcomplete,
          issignet: issignet
        };
        yufp.service.request({
          method: 'POST',
          data: params,
          url: backend.cmisBiz + url,
          callback: function (code, message, response) {
            if (response.code == 0) {
              submitFun();
            } else {
              _this.$message({ message: '请求失败', type: 'error' });
            }
          }
        });
      }

      // 是否用印
      function toissignet (url, serno, bizType, issignet) {
        var _this = this;
        var params = {
          serno: serno,
          bizType: bizType,
          issignet: issignet
        };
        yufp.service.request({
          method: 'POST',
          data: params,
          url: backend.cmisBiz + url,
          callback: function (code, message, response) {
            if (response.code == 0) {
              submitFun();
            } else {
              _this.$message({ message: '请求失败', type: 'error' });
            }
          }
        });
      }
      // 保存审批退回原因
      function saveApprBackResult (url, serno, isSubToOtherDeptCom, subOtherDeptCom) {
        var _this = this;
        var params = {
          serno: serno,
          isSubToOtherDeptCom: isSubToOtherDeptCom,
          subOtherDeptCom: subOtherDeptCom
        };
        yufp.service.request({
          method: 'POST',
          data: params,
          url: backend.cmisBiz + url,
          callback: function (code, message, response) {
            if (response.code == 0) {
              submitFun();
            } else {
              _this.$message({ message: '请求失败', type: 'error' });
            }
          }
        });
      }
      // 上调权限 弹层
      function messageBox (url, serno) {
        var params = {
          serno: serno
        };
        _this.$confirm('', '是否上调权限？', {
          distinguishCancelAndClose: true,
          confirmButtonText: '是',
          cancelButtonText: '否'
        })
          .then(() => {
            params.isUpperApprAuth = 1;
            limitAuthority(url, params);
            _this.$message({
              type: 'info',
              message: '修改成功'
            });
          })
          .catch(action => {
            params.isUpperApprAuth = 0;
            limitAuthority(url, params);
            // _this.$message({
            //   type: 'info',
            //   message: action === 'cancel'
            //     ? '放弃修改'
            //     : '停留在当前页面'
            // });
          });
      }
      // 上调权限 请求
      function limitAuthority (url, params) {
        yufp.service.request({
          method: 'POST',
          data: params,
          url: backend.cmisBiz + url,
          callback: function (code, message, response) {
            if (response.code == 0) {
              submitFun();
            } else {
              _this.$message({ message: '请求失败', type: 'error' });
            }
          }
        });
      }
      // 功能方法实现接口
      function submitFun () {
        _this.$refs.commentForm.validate(function (vaild) {
        // 校验规则
          if (vaild) {
            _this.submitbefore();
            if (opType == 'O-1') {
            // 打回
              _this.callBackFn();
            } else if (opType == 'O-2') {
            // 退回
              _this.returnBackFn();
            } else if (opType == 'O-6') {
            // 转办
              _this.title = 'change';
              _this.getChangeUser();
            } else if (opType == 'O-7') {
            // 协办
              _this.title = 'assist';
              _this.getAssistUser();
            } else if (opType == 'O-8') {
            // 否决
              _this.refuse();
            } else if (opType == 'O-9') {
            // 跳转
              _this.title = 'jump';
              _this.JumpDialogOpen();
              _this.jumpNodeSelect.showDialog = true;
            } else if (opType == 'O-12') {
            // 同意提交
              _this.riskFn();
            // _this.agreeDialogOpen();
            } else if (opType == 'O-18') {
            // 再议
              _this.reStartFn();
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '请检查输入项是否合法!',
              type: 'warning'
            });
          }
        });
      }
    },
    reStartFn: function () {
      var _this = this;
      _this
        .$confirm('确定再议此流程？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then(function () {
          var param = {};
          param.orgId = _this.currentOrgId;
          _this.commentInfo.commentSign = 'O-18';
          param.comment = _this.commentInfo;
          yufp.service.request({
            method: 'POST',
            data: param,
            url: backend.workflowService + '/api/core/reStart',
            callback: function (code, message, response) {
              if (response.code == 0 && response.data) {
                // 跳转到之前的页面
                _this.$message(response.data.tip + ';');
                _this.$router.replace({ name: _this.returnBackFuncId });
              } else {
                _this.$message({
                  message: '再议异常:' + response.message,
                  type: 'error'
                });
              }
            }
          });
        })
        .catch(function () {
          _this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    },
    cancel: function () {
      // 跳转到之前的页面
      this.$router.replace({
        name: this.returnBackFuncId
      });
    },
    saveComment: function () {
      if (!this.roolReason.toString() && this.showRoolReason) {
        this.$message({ message: '请选择退回原因', type: 'warning' });
        return;
      }
      // 保存评论
      var _this = this;
      this.$refs['commentForm'].validate(valid => {
        if (valid) {
          var data = {};
          yufp.extend(true, data, _this.commentInfo);
          data.instanceId = _this.instanceIdInfo.instanceId;
          data.userId = _this.currentUserId;
          data.nodeId = _this.instanceIdInfo.nodeId;
          var commentSign = _this.commentInfo.commentSign;
          data.commentSign = '';
          data.ext = this.roolReason.toString();
          yufp.service.request({
            method: 'POST',
            data: data,
            url: _this.urls.saveComment,
            callback: function (code, message, response) {
              if (response.code == 0) {
                if (response.data != null) {
                  _this.$message({
                    message: '保存成功',
                    type: 'success',
                    duration: 6000
                  });
                  _this.updatePageData();
                  _this.commentInfo = response.data;
                  _this.commentInfo.commentSign = commentSign;
                } else {
                  _this.$message({
                    duration: 6000,
                    message: '保存意见失败',
                    type: 'error'
                  });
                }
              } else {
                _this.$message({
                  duration: 6000,
                  message: '保存异常:' + response.message,
                  type: 'error'
                });
              }
            }
          });
        } else {
          _this.$message({
            duration: 6000,
            message: '请检查输入项是否合法!',
            type: 'warning'
          });
        }
      });
    },
    signIn: function () {
      // 签收
      var _this = this;
      _this.instanceIdInfo.userId = _this.currentUserId;
      yufp.service.request({
        method: 'GET',
        data: {
          instanceId: _this.instanceIdInfo.instanceId,
          nodeId: _this.instanceIdInfo.nodeId,
          userId: _this.currentUserId
        },
        url: _this.urls.signIn,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$message({
              duration: 6000,
              message: response.data.tip,
              type: 'success'
            });
            _this.$router.replace({ name: _this.returnBackFuncId });
          } else {
            _this.$message({
              duration: 6000,
              message: '签收异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    unSignIn: function () {
      var _this = this;
      _this.instanceIdInfo.userId = _this.currentUserId;
      yufp.service.request({
        method: 'GET',
        data: {
          instanceId: _this.instanceIdInfo.instanceId,
          nodeId: _this.instanceIdInfo.nodeId,
          userId: _this.currentUserId
        },
        url: _this.urls.unSignIn,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            _this.$message(response.data.tip);
            _this.$router.replace({ name: _this.returnBackFuncId });
          } else {
            _this.$message({
              duration: 6000,
              message: '撤销签收异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    isFill: function () {
      var _this = this;
      var isFill = false;

      var bizType = _this.instanceIdInfo.bizType;
      var flowId = _this.instanceIdInfo.flowId;
      var nodeId = _this.instanceIdInfo.nodeId;
      yufp.service.request({
        method: 'GET',
        async: false,
        url:
          backend.workflowService +
          '/api/biz/node/' +
          bizType +
          '/' +
          flowId +
          '/' +
          nodeId,
        callback: function (code, message, response) {
          if (response.code == '0') {
            if (response.data && response.data.isOptTyp == 'Y') {
              isFill = true;
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '查询节点配置异常:' + response.message,
              type: 'error'
            });
          }
        }
      });

      return isFill;
    },
    selectLookupItems: function (lookupType, keys) {
      var oriItems = yufp.lookup.find(lookupType);
      var resItems = [];
      for (var i = 0; i < oriItems.length; i++) {
        if (keys.indexOf(oriItems[i].key) != -1) {
          resItems.push(oriItems[i]);
        }
      }
      return resItems;
    },
    refuse: function () {
      var _this = this;
      _this.$refs.commentForm.validate(function (valid) {
        if (!valid) {
          _this.$message({
            duration: 6000,
            message: '请检查输入项是否合法!',
            type: 'warning'
          });
          return;
        }
      });
      _this.doRefuse();
    },
    doRefuse: function () {
      // 否决
      var _this = this;
      _this
        .$confirm('确定否决此流程？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then(function () {
          var param = {};
          param.orgId = _this.instanceIdInfo.orgId;
          _this.commentInfo.commentSign = 'O-8';
          param.comment = _this.commentInfo;
          yufp.service.request({
            method: 'POST',
            data: param,
            url: _this.urls.refuse,
            callback: function (code, message, response) {
              if (response.code == 0) {
                // 跳转到之前的页面
                _this.$message(response.data.tip + ';');
                _this.$router.replace({ name: _this.returnBackFuncId });
              } else {
                _this.$message({
                  duration: 6000,
                  message: '否决异常:' + response.message,
                  type: 'error'
                });
              }
            }
          });
        })
        .catch(function () {
          _this.$message({
            duration: 6000,
            type: 'info',
            message: '已取消'
          });
        });
    },
    changeFn: function (userId) {
      // 转办
      var _this = this;
      var param = {};
      param.orgId = _this.currentOrgId;
      _this.commentInfo.commentSign = 'O-6';
      if (_this.commentInfo.userComment == '') {
        _this.commentInfo.userComment = '[转办]';
      }
      param.comment = _this.commentInfo;
      param.changeUserId = userId;
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.change,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            _this.$message(response.data.tip + ';');
            _this.$router.replace({ name: _this.returnBackFuncId });
          } else {
            _this.$message({
              duration: 6000,
              message: '转办提交异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    getChangeUser: function () {
      // 获取转办可选的办理人员
      var _this = this;
      var param = {
        orgId: _this.currentOrgId,
        instanceId: _this.instanceIdInfo.instanceId,
        nodeId: _this.instanceIdInfo.nodeId,
        userId: _this.currentUserId
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.getchangeUser,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              // 跳转到之前的页面
              _this.UserSelect.Users = response.data;
              _this.UserSelect.showUserDialog = true;
            } else {
              _this.$message({
                duration: 6000,
                message: '未获取到可转办人员',
                type: 'warning'
              });
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '获取转办人员异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    assistFn: function (userId) {
      // 协办
      var _this = this;
      var param = {};
      param.orgId = _this.currentOrgId;
      _this.commentInfo.commentSign = 'O-7';
      if (_this.commentInfo.userComment == '') {
        _this.commentInfo.userComment = '[协助办理]';
      }
      param.comment = _this.commentInfo;
      param.assistUserId = userId;
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.assist,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            _this.$message(response.data.tip + ';');
            _this.$router.replace({ name: _this.returnBackFuncId });
          } else {
            _this.$message({
              duration: 6000,
              message: '协办提交异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    getAssistUser: function () {
      // 获取协办可选的办理人员
      var _this = this;
      var param = {
        orgId: _this.currentOrgId,
        instanceId: _this.instanceIdInfo.instanceId,
        nodeId: _this.instanceIdInfo.nodeId,
        userId: _this.currentUserId
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.getassistUser,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              // 跳转到之前的页面
              _this.UserSelect.Users = response.data;
              _this.UserSelect.showUserDialog = true;
            } else {
              _this.$message({
                duration: 6000,
                message: '未获取到可协助办理人员',
                type: 'warning'
              });
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '获取协助办理人员异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    agreeFn: function () {
      // 节点提交
      // 遍历选中节点
      var nodes = [];
      if (this.agreeRadio != '' && this.agreeShowRadio) {
        nodes.push(this.agreeRadio);
      }

      if (this.agreeCheckBox.length > 0 && !this.agreeShowRadio) {
        for (var i = 0; i < this.agreeCheckBox.length; i++) {
          nodes.push(this.agreeCheckBox[i]);
        }
      }
      // 处理选中的下一节点相关信息
      var nodeInfos = [];
      for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < this.agreeNextNodes.length; j++) {
          if (this.agreeNextNodes[j].nodeId == nodes[i]) {
            var nodeInfo = {};
            nodeInfo.nextNodeId = nodes[i];
            var nextUser = [];
            var nextCopyUser = [];
            if (
              this.agreeNextNodes[j].userInfos != null &&
              this.agreeNextNodes[j].userInfos != undefined
            ) {
              for (
                var k = 0;
                k < this.agreeNextNodes[j].userInfos.length;
                k++
              ) {
                // 去重
                nextUser.push(this.agreeNextNodes[j].userInfos[k].userId);
              }
            }
            if (
              this.agreeNextNodes[j].copyUserInfos != null &&
              this.agreeNextNodes[j].copyUserInfos != undefined
            ) {
              for (
                var m = 0;
                m < this.agreeNextNodes[j].copyUserInfos.length;
                m++
              ) {
                // 去重
                nextCopyUser.push(
                  this.agreeNextNodes[j].copyUserInfos[m].userId
                );
              }
            }
            nodeInfo.nextNodeUserIds = nextUser;
            nodeInfo.nextNodeCopyUserIds = nextCopyUser;
            nodeInfos.push(nodeInfo);
          }
        }
      }
      // 校验节点选择的处理人
      var _this = this;
      if (nodeInfos.length == 0) {
        _this.$message({ duration: 6000, message: '选择节点' });
        return;
      } else {
        for (var i = 0; i < nodeInfos.length; i++) {
          if (nodeInfos[i].nextNodeUserIds.length == 0) {
            _this.$message({ duration: 6000, message: '选择节点处理人' });
            return;
          }
        }
      }
      var param = {};
      if (_this.agreeIsLastRadio == 'Y') {
        // 是否直接提交， 一般【办理类型】是[多人顺序可结束]或[多人并行可结束]时生效，可以选择true和false;
        param.lastOne = true;
      }
      param.orgId = _this.instanceIdInfo.orgId;
      param.nextNodeInfos = nodeInfos;
      // 流程评论提交
      if (_this.commentInfo.userComment == '') {
        _this.commentInfo.userComment = '[同意]';
        _this.commentInfo.commentSign = 'O-12';
      }
      param.comment = _this.commentInfo;
      // var paramWF = {};
      // for (var i = 0; i < _this.flowParam.length; i++) {
      //   // 流程参数提交
      //   paramWF[_this.flowParam[i].key] = _this.flowParam[i].value;
      // }
      param.param = _this.bizParam;
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.submit,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].code === '1') {
                // 提交失败
                _this.$message({
                  message: response.data[i].tip,
                  type: 'warning'
                });
              } else if (response.data[i].code === 'E') {
                // 正常结束
                _this.$message({
                  message: response.data[i].tip,
                  type: 'success'
                });
              } else {
                var msg = response.data[i].tip + ';下一节点：' + response.data[i].nodeName + '@下一节点审批人：' + response.data[i].userNames;
                if (response.data[i].userNames.length == 0) {
                  msg = response.data[i].tip;
                }
                _this.$message({message: msg, type: 'success'});
              }
            }
            _this.agreeNodeSelect.showDialog = false;
            _this.$router.replace({ name: _this.returnBackFuncId });
          } else {
            if (response.message != null) {
              _this.$message({
                duration: 6000,
                message: '提交异常:' + response.message.substring(0, 80),
                type: 'error'
              });
            } else {
              _this.$message({
                duration: 6000,
                message: '提交异常!',
                type: 'error'
              });
            }
          }
        }
      });
    },
    agreeDialogOpen: function () {
      // 提交窗口打开事件
      var _this = this;
      var paramWF = {};
      for (var i = 0; i < _this.flowParam.length; i++) {
        // 流程参数提交
        paramWF[_this.flowParam[i].key] = _this.flowParam[i].value;
      }
      _this.bizParam['submitNodeId'] = _this.instanceIdInfo.nodeId;
      _this.bizParam['submitUserId'] = _this.currentUserId;
      var param = {
        instanceId: _this.instanceIdInfo.instanceId,
        nodeId: _this.instanceIdInfo.nodeId,
        param: _this.bizParam
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.agreeNodeSelect.nodeUrl,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            if (response.data != null) {
              _this.agreeNextNodes = response.data;
              var data = response.data;
              if (
                _this.instanceIdInfo.nodeType == '0' ||
                _this.instanceIdInfo.nodeType == '1' ||
                _this.instanceIdInfo.nodeType == '3'
              ) {
                _this.agreeShowRadio = true;
              } else {
                // 非单选节点
                _this.agreeShowRadio = false;
              }
              _this.agreeUserCheck(data);
            } else {
              _this.$message({
                duration: 6000,
                message: '未获取到下一提交节点信息!',
                type: 'warning'
              });
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '获取下一节点信息异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    checkCopyUser: function (data, index) {
      var _this = this;
      if (_this.agreeNextNodes[index].copyUserShow == undefined) {
        _this.$set(_this.agreeNextNodes[index], 'copyUserShow', false);
      }
      var param = {
        orgId: _this.currentOrgId,
        instanceId: _this.instanceIdInfo.instanceId,
        nodeId: _this.instanceIdInfo.nodeId,
        copyNodeId: data.nodeId
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.getCopyUser,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            if (response.data != null) {
              _this.copyUserShow = true;
              _this.agreeNextNodes[index].copyUserShow = true;
            }
          }
        }
      });
    },
    agreeUserCheck: function (data) {
      // 判断节点是否是系统指定,并对其进行处理
      var _this = this;
      var isSingle = true;
      for (var i = 0; i < data.length; i++) {
        var users = data[i].users;
        _this.checkCopyUser(data[i], i);
        if (_this.agreeNextNodes[i].isSysUser == undefined) {
          _this.$set(_this.agreeNextNodes[i], 'isSysUser', '');
        }
        if (_this.agreeNextNodes[i].selected == undefined) {
          _this.$set(_this.agreeNextNodes[i], 'selected', '');
        }
        if (_this.agreeNextNodes[i].userInfos == undefined) {
          _this.$set(_this.agreeNextNodes[i], 'userInfos', []);
        }
        // 节点办理人预处理，只有一个、系统指定、打回后提交情况直接选中；
        for (var j = 0; j < users.length; j++) {
          var user = {
            userId: users[j].userId,
            userName: users[j].userName
          };
          if (users[j].userId == 'system_user') {
            _this.agreeNextNodes[i].isSysUser = true;
            _this.agreeNextNodes[i].selected = false;
            _this.agreeNextNodes[i].userInfos.push(user);
          } else if (users.length == 1) {
            _this.agreeNextNodes[i].isSysUser = false;
            _this.agreeNextNodes[i].selected = true;
            _this.agreeNextNodes[i].userInfos.push(user);
          } else {
            isSingle = false;
          }
        }
        // 只有一个节点、节点办理人只有一个的情况，不需要弹窗选择
        // if (data.length == 1 && isSingle) {
        //   // 提交处理，不显示弹窗处理节点参数
        //   if (_this.agreeShowRadio) {
        //     _this.agreeRadio = data[i].nodeId;
        //   } else {
        //     _this.agreeCheckBox.push(data[i].nodeId);
        //   }
        //   _this.agreeRadioChange(data[i].nodeId);
        //   _this.agreeFn();
        //   return;
        // }
        _this.agreeNodeSelect.showDialog = true;
        if (data.length == 1) {
          // 只有一个节点直接选中
          if (_this.agreeShowRadio) {
            _this.agreeRadio = data[i].nodeId;
          } else {
            // modify by zhangjw 20210819 多选情况下只有一个节点直接选中会导致选择按钮没有，故此处注释掉
            // _this.agreeCheckBox.push(data[i].nodeId);
          }
          _this.agreeRadioChange(data[i].nodeId);
        }
      }
    },
    agreeRadioChange: function (val) {
      // 节点选择变化事件
      var _this = this;
      var nodeIds = [];
      var checked = false;
      if (_this.agreeShowRadio) {
        nodeIds.push(val);
      } else {
        nodeIds = val;
      }
      // 未被选择的节点以及选择的数据项进行处理
      for (var i = 0; i < _this.agreeNextNodes.length; i++) {
        checked = false;
        for (var k = 0; k < nodeIds.length; k++) {
          if (nodeIds[k] == _this.agreeNextNodes[i].nodeId) {
            checked = true;
            _this.agreeNextNodes[i].selected = true;
            _this.agreeIndex = i;
            _this.agreeUserClose();
          }
        }
        if (!checked) {
          _this.agreeNextNodes[i].userSelected = '';
          _this.agreeNextNodes[i].selected = false;
        }
      }
    },
    agreeSelectNodeUser: function (node, index) {
      // 选择按钮
      this.agreeIndex = index;
      this.agreeUserDialogOpen(node.nodeId);
    },
    agreeUserDialogOpen: function (nodeId) {
      // 选择节点办理人员窗口打开事件处理
      var _this = this;
      var nodeInfo = {};
      nodeInfo.instanceId = _this.instanceIdInfo.instanceId;
      nodeInfo.nodeId = nodeId;
      var param = {
        condition: JSON.stringify(nodeInfo)
      };
      yufp.service.request({
        method: 'GET',
        data: param,
        url: _this.agreeNodeSelect.userUrl,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              _this.agreeNodeSelect.userTableData = response.data;
              _this.agreeNodeSelect.showUserDialog = true;
            } else {
              _this.$message({
                duration: 6000,
                message: '未获取到办理人员信息!',
                type: 'warning'
              });
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '获取办理人员异常:' + response.message,
              type: 'warning'
            });
          }
        }
      });
    },
    agreeRowDbClick: function (row, event) {
      // tag双击事件
      var user = {};
      user.userId = row.userId;
      user.userName = row.userName;
      if (this.agreeNextNodes[this.agreeIndex].userInfos == undefined) {
        this.$set(this.agreeNextNodes[this.agreeIndex], 'userInfos', []);
      }
      var userInfosT = this.agreeNextNodes[this.agreeIndex].userInfos;
      for (var i = 0; i < userInfosT.length; i++) {
        // 去重
        if (userInfosT[i].userId == user.userId) {
          return;
        }
      }
      userInfosT.push(user);
    },
    agreeTagClose: function (tag) {
      // tag关闭事件
      if (this.agreeNextNodes[this.agreeIndex].userInfos == undefined) {
        this.$set(this.agreeNextNodes[this.agreeIndex], 'userInfos', []);
      }
      var userInfosT = this.agreeNextNodes[this.agreeIndex].userInfos;
      userInfosT.splice(userInfosT.indexOf(tag), 1);
    },
    agreeUserClose: function () {
      // 选取返回
      this.agreeNodeSelect.showUserDialog = false;
      var userName = '';
      if (this.agreeNextNodes[this.agreeIndex].userInfos == undefined) {
        this.$set(this.agreeNextNodes[this.agreeIndex], 'userInfos', []);
      }
      var userInfosT = this.agreeNextNodes[this.agreeIndex].userInfos;
      for (var i = 0; i < userInfosT.length; i++) {
        userName = userName + userInfosT[i].userName + ';';
      }
      this.agreeNextNodes[this.agreeIndex].userSelected = userName;
    },
    agreeDialogClose: function () {
      // 提交窗口关闭事件
      this.agreeRadio = '';
      this.agreeCheckBox = [];
      this.agreeIsLastRadio = 'N';
    },
    returnBackFn: function () {
      // 退回操作
      var _this = this;
      var param = {};
      _this.$refs.commentForm.validate(function (vaild) {
        // 校验规则
        if (vaild) {
          param.orgId = _this.instanceIdInfo.orgId;
          _this.commentInfo.commentSign = 'O-2';
          if (_this.commentInfo.userComment == '') {
            _this.commentInfo.userComment = '[退回]';
          }
          param.comment = _this.commentInfo;
          _this
            .$confirm('是否执行退回操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(function () {
              yufp.service.request({
                method: 'POST',
                data: param,
                url: _this.urls.returnBack,
                callback: function (code, message, response) {
                  if (response.code == 0) {
                    // 跳转到之前的页面
                    _this.$message(
                      response.data.tip +
                        ';' +
                        response.data.nodeName +
                        '@' +
                        response.data.userNames
                    );
                    _this.$router.replace({ name: _this.returnBackFuncId });
                  } else {
                    _this.$message({
                      duration: 6000,
                      message: '退回异常:' + response.message,
                      type: 'error'
                    });
                  }
                }
              });
            })
            .catch(function () {
              _this.$message({
                duration: 6000,
                type: 'info',
                message: '已取消'
              });
            });
        } else {
          _this.$message({
            duration: 6000,
            message: '请检查输入项是否合法!',
            type: 'warning'
          });
        }
      });
    },
    callBackFn: function () {
      // 打回操作
      var _this = this;
      _this.$refs.commentForm.validate(function (vaild) {
        // 校验规则
        if (!vaild) {
          _this.$message({
            duration: 6000,
            message: '请检查输入项是否合法!',
            type: 'warning'
          });
        }
      });
      if (!_this.roolReason.toString() && _this.showRoolReason) {
        _this.$message({ message: '请选择退回原因', type: 'warning' });
        return;
      }
      _this.doCallBack();
    },
    doCallBack: function () {
      var _this = this;
      _this.backNodeModel = '';
      _this.callbackNodeSelect.showDialog = true;
    },
    backDialogOpen: function () {
      // 获取可打回节点的信息
      var _this = this;
      var param = {
        orgId: _this.instanceIdInfo.orgId,
        instanceId: _this.instanceIdInfo.instanceId,
        nodeId: _this.instanceIdInfo.nodeId,
        userId: _this.currentUserId
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.callbackNodeSelect.nodeUrl,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              var nodes = response.data;
              for (var i = 0; i < nodes.length; i++) {
                var node = {
                  nodeId: nodes[i].nodeId,
                  nodeName: nodes[i].nodeName,
                  selected: false,
                  usersList: []
                };
                var users = nodes[i].users;
                if (users.length != 0) {
                  for (var k = 0; k < users.length; k++) {
                    var user = {
                      userId: users[k].userId,
                      userName: users[k].userName
                    };
                    node.usersList.push(user);
                  }
                }
                _this.backNodes.push(node);
              }
            } else {
              _this.$message({
                duration: 6000,
                message: '未获取到可打回节点!',
                type: 'warning'
              });
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '获取打回节点异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    radioChange: function (val) {
      // 打回节点选择
      this.userModel = '';
      for (var i = 0; i < this.backNodes.length; i++) {
        var id = this.backNodes[i].nodeId;
        this.backNodes[i].selected = false;
        if (id == val) {
          this.backNodes[i].selected = true;
        }
      }
    },
    wfCallBackClose: function () {
      // 打回界面关闭
      var _this = this;
      _this.backActiveName = 'first';
      _this.backnode = 1;
      _this.backNodes = [];
      // _this.usersList = [];
      _this.callbackNodeSelect.showDialog = false;
    },
    wfCallBack: function () {
      // 打回接口调用
      var _this = this;
      if (!_this.backNodeModel) {
        _this.$message({
          duration: 6000,
          message: '请选择打回节点!',
          type: 'error'
        });
        return false;
      }
      if (!_this.userModel) {
        _this.$message({
          duration: 6000,
          message: '请选择打回节点的办理人!',
          type: 'error'
        });
        return false;
      }
      _this.callbackNodeSelect.showDialog = false;
      var param = {
        callbackNodeId: _this.backNodeModel,
        callbackUserId: _this.userModel,
        callbackModel: _this.backnode + '', // 打回模式 【 0-打回后提交直接给我，1-打回后提交沿流程路径（默认）】
        orgId: _this.currentOrgId
      };
      _this.commentInfo.commentSign = 'O-1';
      if (_this.commentInfo.userComment == '') {
        _this.commentInfo.userComment = '[打回]';
      }
      param.comment = _this.commentInfo;
      param.ext = _this.roolReason.toString();
      // 打回接口调用
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.callBack,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            _this.$message({
              duration: 6000,
              message: response.data.tip,
              type: 'success'
            });
            _this.$router.replace({ name: _this.returnBackFuncId });
          } else {
            _this.$message({
              duration: 6000,
              message: '打回异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
      _this.wfCallBackClose();
    },
    // 跳转
    JumpDialogOpen: function () {
      // 获取可跳转节点
      var _this = this;
      var param = {
        orgId: _this.instanceIdInfo.orgId,
        instanceId: _this.instanceIdInfo.instanceId,
        nodeId: _this.instanceIdInfo.nodeId,
        userId: _this.currentUserId
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.jumpNodeSelect.nodeUrl,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              // 跳转到之前的页面
              var nodes = response.data;
              for (var i = 0; i < nodes.length; i++) {
                var n = {
                  nodeId: nodes[i].nodeId,
                  nodeName: nodes[i].nodeName,
                  selected: false,
                  selectUser: [],
                  usersList: nodes[i].users
                };
                _this.jumpNodes.push(n);
              }
            } else {
              _this.$message({
                duration: 6000,
                message: '未获取到可跳转节点!',
                type: 'warning'
              });
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '获取跳转节点异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    jumpSelectUser: function (node, index) {
      // 获取选择的节点的人员
      var _this = this;
      _this.index = index;
      if (node.usersList.length == 1) {
        _this.$nextTick(function () {
          _this.jumpNodes[index].selectUser = node.usersList[0];
        });
      } else {
        _this.UserSelect.Users = node.usersList;
        _this.UserSelect.showUserDialog = true;
      }
    },
    jumpradioChange: function (val) {
      // 跳转节点选择
      for (var i = 0; i < this.jumpNodes.length; i++) {
        this.jumpNodes[i].selected = false;
        var id = this.jumpNodes[i].nodeId;
        if (id == val) {
          this.jumpNodes[i].selected = true;
        }
        this.jumpNodes[i].selectUser = [];
      }
      this.UserSelect.SelectUsers = [];
    },
    jumpFn: function () {
      // 跳转接口调用
      var _this = this;
      var param = {
        jumpNodeId: _this.jumpNodeModel,
        jumpUserId: _this.jumpNodes[_this.index].selectUser.userId,
        orgId: _this.instanceIdInfo.orgId
      };
      _this.commentInfo.commentSign = 'O-9';
      if (_this.commentInfo.userComment == '') {
        _this.commentInfo.userComment = '[跳转]';
      }
      param.comment = _this.commentInfo;
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.jump,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            _this.$message({
              duration: 6000,
              message: response.data.tip + ';',
              type: 'success'
            });
            _this.$router.replace({ name: _this.returnBackFuncId });
          } else {
            _this.$message({
              duration: 6000,
              message: '跳转异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
      _this.jumpClose();
    },
    jumpClose: function () {
      // 跳转窗口 关闭
      this.jumpNodes = [];
      this.jumpNodeModel = '';
      this.jumpNodeSelect.showDialog = false;
    },

    // 人员选择弹框
    submitbefore: function () {
      // 弹框前处理
      this.UserSelect.Users = [];
      this.UserSelect.SelectUsers = [];
    },
    RowDbClick: function (row, event) {
      // 列表双击事件
      var user = {
        userId: row.userId,
        userName: row.userName
      };
      if (this.UserSelect.SelectUsers == undefined) {
        this.$set(this.UserSelect, 'SelectUsers', []);
      }
      var userInfosT = this.UserSelect.SelectUsers;
      for (var i = 0; i < userInfosT.length; i++) {
        // 去重
        if (userInfosT[i].userId == row.userId) {
          return;
        }
      }
      userInfosT.push(user);
    },
    TagClose: function (tag) {
      // tag页签关闭事件
      if (this.UserSelect.SelectUsers == undefined) {
        this.$set(this.UserSelect, 'SelectUsers', []);
      }
      var userInfosT = this.UserSelect.SelectUsers;
      userInfosT.splice(userInfosT.indexOf(tag), 1);
    },
    UserDialogClose: function () {
      // 弹框关闭
      this.UserSelect.showUserDialog = false;

      if (this.UserSelect.SelectUsers == undefined) {
        this.$set(this.UserSelect, 'SelectUsers', []);
      }
      var userInfosT = this.UserSelect.SelectUsers;
      if (
        this.title == 'jump' ||
        this.title == 'assist' ||
        this.title == 'change'
      ) {
        if (userInfosT.length > 1) {
          this.$message({
            message: '该功能只能选择一个办理人员!',
            type: 'warning',
            duration: 6000
          });
          return false;
        }
      }
      var userName = userInfosT[0].userName;
      var userId = userInfosT[0].userId;
      if (this.title == 'jump') {
        this.jumpNodes[this.index].selectUser.userName = userName;
        this.jumpNodes[this.index].selectUser.userId = userId;
      } else if (this.title == 'assist') {
        this.assistFn(userId);
      } else if (this.title == 'change') {
        this.changeFn(userId);
      } else if (this.title == 'copy') {
        for (var i = 0; i < userInfosT.length; i++) {
          userName = '';
          userName = userName + userInfosT[i].userName + ';';
        }
        this.agreeNextNodes[this.agreeIndex].copyUser = userName;
        this.agreeNextNodes[this.agreeIndex].copyUserInfos = userInfosT;
      }
    },
    wfGatherFn: function () {
      // 会办功能实现
      var _this = this;
      this.$confirm('确定要发起会办吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(function () {
          _this.gatherStartFn();
        })
        .catch(function () {
          _this.$message({ duration: 6000, type: 'info', message: '已取消' });
        });
    },
    gatherStartFn: function () {
      var _this = this;
      var param = {
        instanceId: _this.instanceIdInfo.instanceId,
        userId: _this.currentUserId,
        nodeId: _this.instanceIdInfo.nodeId,
        orgId: _this.currentOrgId,
        orgName: _this.currentOrgName
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: backend.workflowService + '/api/metting/start',
        callback: function (code, message, response) {
          if (response.data !== null) {
            _this.$message({
              duration: 6000,
              message: '初始化会办会议成功!',
              type: 'success'
            });
            _this.$nextTick(function () {
              try {
                _this.meetData = response.data;
                _this.meetPage = function () {
                  return Promise.resolve(
                    require('@/views/workflow/instance/metting/meetstart.vue')
                      .default
                  );
                };
                _this.meetData.instanceInfo = _this.instanceIdInfo;
                _this.gatherPageData = _this.meetData;
                _this.meetPageShow = true;
                _this.tabValue = 'meetstart';
              } catch (e) {}
            });
          } else {
            _this.$message({
              duration: 6000,
              message: '该流程已经进行过会办!',
              type: 'warning'
            });
          }
        }
      });
    },
    Select: function () {
      this.agreeNodeSelect.showUserDialog = true;
    },
    currpageChange: function (val) {
      this.currpage = val;
    },
    pagesizeChange: function (val) {
      this.pagesize = val;
    },
    unSignInTaskPool: function () {
      // 放回项目池
      var _this = this;
      var param = {
        instanceId: _this.instanceIdInfo.instanceId,
        nodeId: _this.instanceIdInfo.nodeId,
        userId: _this.userCode,
        poolId: _this.button.taskPoolId
      };
      _this
        .$confirm('确定要放回项目池吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then(function () {
          yufp.service.request({
            method: 'POST',
            data: param,
            url: _this.urls.unSignInTaskPool,
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.$message({
                  duration: 6000,
                  message: response.data.tip,
                  type: 'success'
                });
              } else {
                _this.$message({
                  duration: 6000,
                  message: '放回项目池异常:' + response.message,
                  type: 'warning'
                });
              }
              _this.$router.replace({ name: _this.returnBackFuncId });
            }
          });
        })
        .catch(function () {
          _this.$message({ duration: 6000, type: 'info', message: '已取消' });
        });
    },
    subFlowStart: function () {
      // 发起子流程功能
      var _this = this;
      _this.$refs.commentForm.validate(function (vaild) {
        // 校验规则
        if (vaild) {
          _this
            .$confirm('是否执行发起子流程操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(function () {
              var param = {};
              param.orgId = _this.currentOrgId;
              param.systemId = 'cmis';
              param.bizType = _this.button.subFlowId;
              _this.commentInfo.commentSign = '';
              if (_this.commentInfo.userComment == '') {
                _this.commentInfo.userComment = '[发起子流程]';
              }
              param.comment = _this.commentInfo;
              yufp.service.request({
                method: 'POST',
                data: param,
                url: _this.urls.subFlowStart,
                callback: function (code, message, response) {
                  if (response.code == 0) {
                    // 跳转到之前的页面
                    _this.$message(response.data.tip + ';');
                    _this.$router.replace({ name: _this.returnBackFuncId });
                  } else {
                    _this.$message({
                      duration: 6000,
                      message: '子流程发起异常:' + response.message + ';',
                      type: 'error'
                    });
                  }
                }
              });
            })
            .catch(function () {
              this.$message({
                duration: 6000,
                type: 'info',
                message: '已取消'
              });
            });
        } else {
          _this.$message({
            duration: 6000,
            message: '请检查输入项是否合法!',
            type: 'warning'
          });
        }
      });
    },
    agreeSelectCopyUser: function (node, index) {
      var _this = this;
      _this.agreeIndex = index;
      if (_this.agreeNextNodes[_this.agreeIndex].copyUserInfos == undefined) {
        _this.$set(_this.agreeNextNodes[_this.agreeIndex], 'copyUserInfos', []);
      }
      if (_this.agreeNextNodes[_this.agreeIndex].copyUser == undefined) {
        _this.$set(_this.agreeNextNodes[_this.agreeIndex], 'copyUser', '');
      }
      var param = {
        orgId: _this.currentOrgId,
        instanceId: _this.instanceIdInfo.instanceId,
        nodeId: _this.instanceIdInfo.nodeId,
        copyNodeId: node.nodeId
      };
      yufp.service.request({
        method: 'POST',
        data: param,
        url: _this.urls.getCopyUser,
        callback: function (code, message, response) {
          if (response.code == 0) {
            // 跳转到之前的页面
            if (response.data != null) {
              _this.UserSelect.Users = response.data;
              _this.title = 'copy';
              _this.UserSelect.showUserDialog = true;
            } else {
              _this.$message({
                duration: 6000,
                message: '没有抄送人员可以选择!',
                type: 'warning'
              });
            }
          } else {
            if (response.message != null) {
              _this.$message({
                duration: 6000,
                message: response.message,
                type: 'warning'
              });
            } else {
              _this.$message({
                duration: 6000,
                message: '获取可抄送人员异常:' + response.message,
                type: 'warning'
              });
            }
          }
        }
      });
    },
    updatePageData: function () {
      var comment = {
        opType: this.commentInfo.commentSign,
        userComment: this.commentInfo.userComment
      };
      this.$nextTick(function () {
        this.bizPageData.instanceInfo.comment = comment;
      });
    },
    updateBizParam: function (param) {
      for (var key in param) {
        this.bizParam[key] = param[key];
      }
    },
    afterSubmit: function (param) {
      console.log(param);
      this.cancel();
    }
  }
};
</script>