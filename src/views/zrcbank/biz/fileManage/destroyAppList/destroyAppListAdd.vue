<template>
  <!--
    @created by wcx
    @updated by  2021-6-17 修改代码规范
    @updated by  2021-6-17 更新组件内容及标签
    @description 模板示例——档案销毁新增基本信息
  -->
  <div>
        <yu-panel title=" 档案销毁基本信息" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refTable" ref="applyBaseForm" v-model="formdata" label-width="90px">
              <yu-xform-group :column="3">
                <yu-xform-item label="业务流水号"  name="ddalSerno" disabled></yu-xform-item>
                 <yu-xform-item label="销毁户数"  name="destroyCus" disabled></yu-xform-item>
                 <yu-xform-item label="销毁类型" ctype="select" name="destroyType"  data-code="STD_DESTROY_TYPE"  rules="required"></yu-xform-item>
                 <yu-xform-item label="登记人"  name="inputIdName" disabled ></yu-xform-item>
                 <yu-xform-item label="登记机构"  name="inputBrIdName" disabled></yu-xform-item>
                <yu-xform-item label="登记日期"  name="inputDate" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="登记日期" disabled></yu-xform-item>
                <yu-xform-item placeholder="销毁日期" ctype="datepicker" name="destroyDate"  label="销毁日期" value-format="yyyy-MM-dd" disabled ></yu-xform-item>
                <yu-xform-item label="登记机构"  name="inputBrId" disabled v-if="false"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel title="档案销毁列表信息" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
          <yu-button-drop >
            <yu-button type="primary" @click="addFn">引入</yu-button>
            <yu-button type="primary" @click="deleteFn">删除</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams"  selection-type="radio" requestType="POST">
            <yu-xtable-column align="center" label="档案流水号" prop="docSerno" width="180"></yu-xtable-column>
            <yu-xtable-column align="center" label="销毁明细流水号" prop="dddlSerno" v-if="false" width="180"></yu-xtable-column>
            <yu-xtable-column align="center" label="档案编号" prop="docNo" width="180"></yu-xtable-column>
            <yu-xtable-column align="center" label="归档模式" prop="archiveMode" data-code="STD_ARCHIVE_MODE" width="80"></yu-xtable-column>
            <yu-xtable-column align="center" label="档案分类" prop="docClass" data-code="STD_DOC_CLASS" width="150"></yu-xtable-column>
            <yu-xtable-column align="center" label="档案类型" prop="docType" data-code="STD_DOC_TYPE" width="150"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId" width="200"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName" width="200"></yu-xtable-column>
            <yu-xtable-column align="center" label="关联业务编号" prop="bizSerno" width="150"></yu-xtable-column>
            <yu-xtable-column align="center" label="资料总页数" prop="docNum" width="100" :formatter="Formatter2"></yu-xtable-column>
            <yu-xtable-column align="center" label="生成日期" prop="createDate" width="150" ></yu-xtable-column>
            <yu-xtable-column align="center" label="所属机构" prop="belgOrgName" width="150" :formatter="Formatter1"></yu-xtable-column>
            <yu-xtable-column align="center" label="已保管年限" prop="inKeepYears" width="150"></yu-xtable-column>
            <yu-xtable-column align="center" label="销毁日期" prop="destroyDate" width="150"></yu-xtable-column>
            <yu-xtable-column align="center" label="档案状态" prop="docStauts" data-code="STD_DOC_STAUTS" width="80"></yu-xtable-column>
            <yu-xtable-column align="center" label="审批状态" prop="approveStatus" v-if="false" width="80"></yu-xtable-column>
            <yu-xtable-column align="center" label="销毁状态" prop="destroyStatus" v-if="false" width="80"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
    <div style="text-align: center;">
          <yu-button-drop>
            <yu-button type="primary" @click="commit" v-if="viewType !=='VIEW'">提交</yu-button>
            <yu-button type="primary" @click="saveFn" v-if="viewType !=='VIEW'" >保存</yu-button>
            <yu-button type="primary" @click="doBack">返回</yu-button>
          </yu-button-drop>
        </div>
        <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
import mixin from '@/utils/mixin';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
// // 注册字典项
yufp.lookup.reg('STD_DOC_STAUTS,STD_DOC_CLASS,STD_DOC_TYPE,STD_ARCHIVE_MODE,STD_DESTROY_TYPE');
export default {
  mixins: [mixin],
  components: { yufpNwfInit },
  data: function () {
    return {

      dataUrl: backend.cmisBiz + '/api/docDestroyDetailList/query/pageList',
      baseParams: {condition: JSON.stringify({ ddalSerno: this.$route.meta.params.ddalSerno})},
      formdata: {destroyCus: 0},
      activeName: 'base',
      ddalSerno: '',
      rules: {
        readPurposeDesc: [{ required: true, message: '字段不能为空', trigger: 'blur' }
        ]
      }
      // baseParams: ,{
      //   condition: {regiStatus: '02'}
      // },
      // Params: {
      //   condition: {regiStatus: '02', recordStatus: '03' }
      // },
    };
  },

  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      loginCode: state => state.oauth.loginCode,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  // 监听路由,刷新页面
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.refTable.remoteData();
      this.afterInit();
    }
  },
  created () {
    this.afterInit();
  },

  methods: {
    /**
     *接收机构式化
     */
    Formatter1: function (row, column) {
      if (row.belgOrgName == 'null') {
        row.belgOrgName = '';
      }
      return row.belgOrgName;
    },


    /**
     *接收时间格式化
     */
    Formatter: function (row, column) {
      var timeDt = new Date(row.createTime);
      var dt = dateFormat(timeDt, '{y}-{m}-{d}');
      return dt;
    },
    // 刷新页面数据
    refresh () {
      this.$refs.refTable.remoteData();
    },
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      // let serno = _this.$xutils.getUUID();
      _this.ddalSerno = _this.$route.meta.params.ddalSerno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/docDestroyAppList/showDocDestroyApp',
        data: _this.ddalSerno,
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata);
            _this.refresh();
          }
        }
      });
    },

    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      this.doBack();
    },

    /*
     格式化日期
     */
    formatTime () {
      var dt = new Date();
      return dateFormat(dt, '{y}-{m}-{d}');
    },


    /**
     * 返回
     */
    doBack: function () {
      yufp.router.removeTab(this.$route.path);
    },
    /**
     * 流程提交
     */
    commit () {
      var _this = this;
      var validate = false;
      var data = _this.$refs.refTable.tabledata;
      _this.$refs.applyBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (!data.length) {
        _this.$message.error('该列表没有明细内容,无法提交');
        return;
      }
      _this.saveFn();
      // 提交流程
      var bizType = '';
      const userInfo = _this.$xutils.getLoginUserInfo();
      const orgType = userInfo.org.orgType;
      if (orgType == 'A') {
        if (userInfo.orgCode.startsWith('80')) {
          bizType = 'SGJ04';// 档案销毁审批流程（寿光）
        } else if (userInfo.orgCode.startsWith('81')) {
          bizType = 'DHJ04';// 档案销毁审批流程（东海）
        }
      } else {
        bizType = 'DA021';
      }
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = userInfo.orgCode;
      startdto.userId = userInfo.userCode;
      // 请绑定bizType
      startdto.bizType = bizType;
      startdto.bizId = _this.formdata.ddalSerno;
      startdto.bizUserName = _this.formdata.inputIdName;
      startdto.bizUserId = _this.formdata.inputId;
      startdto.param = {destroyType: _this.formdata.destroyType};
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.applyBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var DocDestroyAppList = _this.formdata;
      // console.log(DocDestroyAppList);
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docDestroyAppList/save',
        data: DocDestroyAppList,
        callback: function (code, message, response) {
          if (response.code == 0) {
            yufp.clone(response.data, _this.formdata);
            _this.$message('操作成功');
          } else {
            // _this.$message({ message: '操作失败：', type: 'error' });
            _this.$message.error(response.message);
          }
        }

      });
    },
    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      // var destroyStatus = selectionsAry[0].destroyStatus;
      // var dddlSerno = selectionsAry[0].dddlSerno;
      // var ddalSerno = _this.formdata.ddalSerno;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      var destroyCus = _this.formdata.destroyCus;
      var dddlSerno = selectionsAry[0].dddlSerno;
      var ddalSerno = _this.formdata.ddalSerno;
      if (!destroyCus) {
        _this.$message.error('该列表缺少销毁户数信息,无法删除');
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/docDestroyAppList/deleteDocDetail',
              data: {ddalSerno, dddlSerno},
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.afterInit();
                  _this.$message('操作成功');
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    },
    /**
     * 引入
     */
    addFn: function () {
      var _this = this;
      var ddalSerno = _this.formdata.ddalSerno;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/fileManage/destroyAppList/destroyList',
        // 自定义唯一页签key
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '档案销毁列表引入',
        // 传递的业务数据，可选配置
        data: {
          ddalSerno: ddalSerno
          // viewType: 'ADD'
        }
      });
    }


  }
};
</script>
