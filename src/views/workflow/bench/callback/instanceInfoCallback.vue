<template>
  <div>
    <el-tabs v-model="tabValue" @tab-click="tabClick" tab-position="top">
      <el-tab-pane label="业务信息" name="first">
        <div :id="nwfbiztypePage">
          <component :is="bizPage" :biz-page-data="bizPageData" @updateBizParam="updateBizParam"></component>
        </div>
      </el-tab-pane>
      <el-tab-pane label="流程审批" name="second" v-if="showApproveTab">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>审批操作</span>
          </div>
          <el-form ref="commentForm" label-width="160px" :model="commentInfo" :rules="commentRules" style="margin-top:20px">
            <el-form-item label="审批结论" prop="commentSign">
              <el-select v-model="commentInfo.commentSign" :disabled="button.signIn == '1'">
                <el-option v-for="item1 in optypeOptions" :key="item1.value" :label="item1.label" :value="item1.value"> </el-option>
              </el-select>
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
                  <yu-col :span="24"><span>扩展意见:</span><span>{{ node.ext }}</span></yu-col>
                </yu-row>
              </el-card>
            </el-collapse-item>
          </el-collapse-->
          <el-table ref="hisTable" :data="nodeHistory" border style="width: 100%">
            <el-table-column prop="nodeName" label="审批节点名称"> </el-table-column>
            <el-table-column prop="userName" label="办理人员名称"> </el-table-column>
            <el-table-column prop="startTime" label="审批时间"> </el-table-column>
            <el-table-column prop="userId" label="办理人员"> </el-table-column>
            <el-table-column prop="nodeId" label="审批节点编号"> </el-table-column>
            <el-table-column prop="userComment" label="审批意见"> </el-table-column>
            <el-table-column prop="ext" label="扩展意见"> </el-table-column>
            <el-table-column prop="commentSign" label="审批结果"> </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="会办详情" name="4" v-if="button['gather'] != '0'">
        <div :id="nwfgatherPage">
          <component :is="gatherPage" :biz-page-data="gatherPageData"></component>
        </div>
      </el-tab-pane>
      <el-tab-pane label="会办发起" name="meetstart" v-if="button['gather'] != '0' && meetPageShow">
        <div :id="nwfmeetPage">
          <component :is="meetPage" :biz-page-data="gatherPageData"></component>
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { validator } from '@/utils/validate';
let data = {};
export default {
  name: 'InstanceInfo',
  data: function () {
    var _this = this;
    return {
      showApproveTab: true,
      urls: {
        index: backend.workflowService + '/api/bench/todo',
        instanceInfo: backend.workflowService + '/api/core/instanceInfo',
        saveComment: backend.workflowService + '/api/core/saveComment/',
        signIn: backend.workflowService + '/api/core/signIn/',
        unSignIn: backend.workflowService + '/api/core/unSignIn/',
        getComments: backend.workflowService + '/api/core/getAllComments/',
        getNextNodeInfos:
          backend.workflowService + '/api/core/getNextNodeInfos/',
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
          },
          { validator: validator.speChar }
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
          label: '打回',
          value: 'O-1'
        },
        returnBack: {
          key: 'returnBack',
          label: '退回',
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
      bizPageData: null,
      nwfgatherPage: 'nwfgatherPage' + Date.now(),
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
      tabValue: 'first'
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org'])
  },
  created () {
    this.currentOrgId = this.org.id;
    this.currentOrgName = this.org.name;
    this.currentUserId = this.userCode;
  },
  mounted: function () {
    data = this.$route.params;
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
    setApproveTabVisiable: function (visible) {
      this.showApproveTab = visible;
    },
    // 详情页Tab页点击事件
    tabClick: function (tab, event) {
      var _this = this;
      if (tab.name == 'second') {
        // 获取流程历史数据
        yufp.service.request({
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
        if (_this.button['gather'] != '0') {
          _this.$nextTick(function () {
            try {
              _this.gatherPage = function () {
                return Promise.resolve(
                  require('@/views/workflow/instance/metting/mettingPage.vue')
                    .default
                );
              };
              _this.gatherPageData = params;
            } catch (e) {}
          });
        }
      }
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
            // if (response.data.comment != null) {
            //   // 设置评论反显
            //   _this.commentInfo = response.data.comment;
            //   if (_this.commentInfo.commentSign !== null && _this.commentInfo.commentSign !== '') {
            //     _this.commentInfo.commentId = '';
            //   }
            // }
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
      // 功能方法实现接口
      var _this = this;
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
            _this.agreeDialogOpen();
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
        data: _this.instanceIdInfo,
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
        data: _this.instanceIdInfo,
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
          param.orgId = _this.currentOrgId;
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
      param.orgId = _this.currentOrgId;
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
            _this.agreeCheckBox.push(data[i].nodeId);
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
          param.orgId = _this.currentOrgId;
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
    // takeBackToFirstFn: function () {
    //   var _this = this;
    //   _this
    //     .$confirm('确定要将本条流程撤回到起始节点吗？', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning',
    //       center: true
    //     })
    //     .then(function () {
    //       var param = {};
    //       _this.commentInfo.commentSign = 'O-15';
    //       if (_this.commentInfo.userComment == '') {
    //         _this.commentInfo.userComment = '[撤回]';
    //       }
    //       param.comment = _this.commentInfo;
    //       param.orgId = _this.currentOrgId;
    //       yufp.service.request({
    //         method: 'POST',
    //         data: param,
    //         url: backend.workflowService + '/api/core/tackbackToFirst',
    //         callback: function (code, message, response) {
    //           if (response.code == 0) {
    //             // 跳转到之前的页面
    //             _this.$message({
    //               message: response.data.tip + ';',
    //               type: 'success',
    //               duration: 6000
    //             });
    //             _this.$router.replace({ name: _this.returnBackFuncId });
    //           } else {
    //             _this.$message({
    //               message: response.message + ';',
    //               type: 'error',
    //               duration: 6000
    //             });
    //           }
    //         }
    //       });
    //     })
    //     .catch(function () { });
    // },
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
<style lang="scss" scoped>
@import "../../instance/common/instanceInfo.css";
</style>
