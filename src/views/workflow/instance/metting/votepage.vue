
<template>
  <div>
    <el-tabs v-model="tabValue" tab-position="top">
      <el-tab-pane label="业务信息" name="first">
        <div :id="nwfbiztypePage">
          <component :is="bizPage" :biz-page-data="bizPageData"></component>
        </div>
      </el-tab-pane>
      <el-tab-pane label="投票页面" name="vote">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>会议投票</span>
          </div>
          <el-form-x ref="voteform" :group-fields="updateFields" label-width="100px" height="400px"></el-form-x>
          <div align="center">
            <el-button type="primary" @click="cancel">返回</el-button>
            <el-button type="primary" @click="nwfVoteFn" v-show="isShowCfmBtn">确定</el-button>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>审批历史</span>
          </div>
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
    </el-tabs>
  </div>
</template>
<script>
const data = {};
import { mapGetters } from 'vuex';
import { validator } from '@/utils/validate';
export default {
  data: function () {
    var ResultOptions = [
      {
        key: 'Y',
        value: '同意'
      },
      {
        key: 'N',
        value: '否决'
      },
      {
        key: 'G',
        value: '再议'
      }
    ];
    let _this = this;
    for (let i = 0; i < yufp.session.dutys.length; i++) {
      if (yufp.session.dutys[i].code === 'ZHT14') {
        // 总行信贷审批委员会岗位
        ResultOptions = [
          {
            key: 'Y',
            value: '同意'
          },
          {
            key: 'N',
            value: '否决'
          },
          {
            key: 'G',
            value: '再议'
          }
        ];
      }
    }
    var MeetTypes = [
      {
        key: '05',
        value: '贷审会模式'
      },
      {
        key: '04',
        value: '三人会商模式'
      },
      {
        key: '06',
        value: '投委会模式'
      }
    ];
    return {
      urls: {
        userUrl: backend.workflowService + '/api/metting/user',
        getComments: backend.workflowService + '/api/core/getAllComments/',
        opUrl: backend.workflowService + '/api/metting/op'
      },
      requestType: 'GET',
      dataParams: {},
      updateFields: [
        {
          columnCount: 4,
          fields: [
            {
              label: '会议号',
              filed: 'meetId',
              type: 'input',
              disabled: true,
              hidden: true
            },
            {
              label: '投票号',
              filed: 'voteId',
              type: 'input',
              disabled: true,
              hidden: true
            },
            {
              label: '流程实例号',
              field: 'instanceId',
              type: 'input',
              disabled: true,
              rules: [
                {
                  required: false,
                  message: '必填项'
                }
              ]
            },
            {
              label: '业务流水号',
              field: 'bizId',
              type: 'input',
              disabled: true,
              rules: [
                {
                  required: false,
                  message: '必填项'
                }
              ]
            },
            {
              label: '参会人',
              field: 'userId',
              type: 'input',
              disabled: true,
              hidden: true,
              rules: [
                {
                  required: false,
                  message: '必填项'
                }
              ]
            },
            {
              label: '参会人',
              field: 'userName',
              type: 'input',
              disabled: true,
              rules: [
                {
                  required: false,
                  message: '必填项'
                }
              ],
              value: this.$xutils.getDefaultformulaData("$LoginUserName")
            },
            {
              label: '审批模式',
              field: 'meetType',
              type: 'select',
              disabled: true,
              options: MeetTypes,
              rules: [
                {
                  required: false,
                  message: '必填项'
                }
              ]
            },
            {
              label: '开始时间',
              field: 'startTime',
              type: 'input',
              disabled: true,
              rules: [
                {
                  required: false,
                  message: '必填项'
                }
              ]
            },
            {
              label: '结束时间',
              field: 'endTime',
              type: 'input',
              hidden: true,
              rules: [
                {
                  required: false,
                  message: '必填项'
                }
              ]
            },
            {
              label: '会议主题',
              field: 'mettingSub',
              type: 'input',
              disabled: true,
              rules: [
                {
                  required: false,
                  message: '必填项'
                }
              ]
            },
            {
              label: '会议年份',
              field: 'mettingYear',
              type: 'input',
              disabled: true,
              rules: [
                {
                  required: false,
                  message: '必填项'
                }
              ]
            },
            {
              label: '会议期数',
              field: 'mettingNo',
              type: 'input',
              disabled: true,
              rules: [
                {
                  required: false,
                  message: '必填项'
                }
              ]
            }
          ]
        },
        {
          columnCount: 1,
          fields: [
            {
              field: 'mettingSts',
              label: '投票结果',
              type: 'select',
              // dataCode: 'VOTE_RESULT',
              options: ResultOptions,
              rules: [
                {
                  required: true,
                  message: '必填项',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '意见详情',
              field: 'mettingComment',
              type: 'textarea',
              autosize: { minRows: 5 },
              rules: [
                {
                  required: true,
                  message: '必填项',
                  trigger: 'blur'
                },
                // { validator: validator.speChar }
              ]
            }
          ]
        }
      ],
      meetForm: {
        meetId: '',
        voteId: '',
        mettingSts: '',
        mettingComment: ''
      },
      baseParams: {
        meetId: '',
        orgId: ''
      },
      nodeHistory: [],
      meetId: '',
      currentOrgId: '',
      currentUserId: '',
      returnBackFuncId: '',
      tabValue: 'vote',
      nwfbiztypePage: 'nwfbiztypePage' + Date.now(),
      bizPage: '',
      bizPageData: null,
      bizParam: {},
      isShowCfmBtn: true, //是否展示投票按钮
    };
  },
  computed: {
    ...mapGetters(['userCode', 'org'])
  },
  created () {
    this.currentOrgId = this.org.id;
    this.currentUserId = this.userCode;
    this.baseParams.orgId = this.org.id;
    if(this.$route.params && this.$route.params.mettingSts === 'S') {
      this.isShowCfmBtn = false
      this.updateFields[1].fields[0].disabled = true
      this.updateFields[1].fields[1].disabled = true
    }
  },
  mounted: function () {
    // 路由参数处理
    const params =
      this.bizPageData == null ? this.$route.params : this.bizPageData;
    if (params != null) {
      this.dataParams = {
        condition: JSON.stringify({
          instanceId: params.instanceId
        })
      };
      this.baseParams.meetId = params.meetId;
      this.meetId = params.meetId;
      this.getComment(params.instanceId);
      this.initData(params);
    }
  },
  methods: {
    initData: function (data) {
      yufp.extend(this.$refs.voteform.formModel, data);
      this.$refs.voteform.formModel.mettingSts = data.voteSts;
      var bizPage = data.bizPage;
      if (bizPage == null ? false : bizPage.includes('?')) {
        var str = bizPage.split('?');
        bizPage = str[0];
        this.convertParam(str[1]);
      }
      var paramT = {
        instanceInfo: data,
        flowParam: this.bizParam,
        optypeOptions: []
      };
      this.$nextTick(function () {
        try {
          this.bizPageData = paramT;
          this.bizPage = () =>
            Promise.resolve(require('@/views/' + bizPage).default);
        } catch (e) {}
      });
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
        }
      } else {
        var paramf = {};
        paramf.key = params.split('=')[0];
        paramf.value = params.split('=')[1];
        this.bizParam[paramf.key] = paramf.value;
      }
    },
    getComment: function (val) {
      var _this = this;
      yufp.service.request({
        method: 'GET',
        url: _this.urls.getComments,
        data: { mainInstanceId: val },
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null ? response.data.length > 0 : false) {
              var nodeHistory = response.data;
              // commentSign翻译
              for (var i = 0, length = nodeHistory.length; i < length; i++) {
                nodeHistory[i].commentSign = yufp.lookup.convertKey(
                  'OP_TYPE',
                  nodeHistory[i].commentSign
                );
              }
              _this.nodeHistory = nodeHistory;
            }
          }
        }
      });
    },
    nwfVoteFn: function () {
      var _this = this;
      var isValid = true;
      _this.$refs.voteform.validate(function (valid) {
        isValid = valid;
      });
      if (!isValid) {
        _this.$message({ message: '请检查输入项是否符合', type: 'warning' });
        return false;
      }
      var model = _this.$refs.voteform.formModel;
      var param = {
        voteId: model.voteId,
        meetId: model.meetId,
        instanceId: model.instanceId,
        userId: _this.currentUserId,
        mettingComment: model.mettingComment,
        mettingSts: model.mettingSts
      };
      yufp.service.request({
        method: 'POST',
        url: _this.urls.opUrl,
        data: param,
        callback: function (code, message, response) {
          if (response.code == 0 && response.data) {
            _this.$message({ message: '投票成功', type: 'success' });
            yufp.router.removeTab(_this.$route.path);
          }
        }
      });
    },
    cancel: function () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
