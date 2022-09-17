/**
 * @Created by  hujun on 2021/6/17下午2:58:08.
 * @updated by
 * @description 档案调阅申请新增
 */
<template>
  <div>
    <yu-panel title="档案调阅申请信息" panel-type="simple" is-collapse :collapse-title="collapseTitle">
      <yu-xform ref="applyBaseForm" label-width="140px" v-model="applyBaseData">
        <yu-xform-group :column="2">
        <yu-xform-item ctype="input" name="draiSerno" label="调阅流水号" rules="required" :disabled="true"></yu-xform-item>
        <yu-xform-item ctype="datepicker" name="readRqstrDate" label="调阅申请日期" rules="required" :disabled="true" value-format="yyyy-MM-dd"></yu-xform-item>
        <yu-xform-item ctype="YuXuser"  name="readName"  label="实际调阅人" rules="required" @select-fn="selectedUserFn"></yu-xform-item>
        <yu-xform-item ctype="input" name="readOrgName"  label="实际调阅人机构" :disabled="true" rules="required"></yu-xform-item>
        <yu-xform-item ctype="input"  name="readId"  label="实际调阅人" :hidden="true"></yu-xform-item>
        <yu-xform-item ctype="input" name="readOrg"  label="实际调阅人机构" :hidden="true"></yu-xform-item>
        <yu-xform-item ctype="select" name="readMode"  label="调阅形式"  data-code="STD_READ_MODE" rules="required"></yu-xform-item>
        <yu-xform-item ctype="select" name="readType"  label="调阅类型"  data-code="STD_READ_TYPE" rules="required"></yu-xform-item>
        <yu-xform-item ctype="select" name="readReason"  label="调阅原因"  data-code="STD_READ_REASON" rules="required"></yu-xform-item>
        <yu-xform-item ctype="datepicker" name="backDate"  label="归还日期" rules="required" value-format="yyyy-MM-dd" :picker-options="pickerOptions"></yu-xform-item>
        <yu-xform-item ctype="textarea" name="reasonMome"  label="原因描述" row="4"  colspan="24" placeholder="2000个字符以内" :rules="rules.reasonMome"></yu-xform-item>
        <yu-xform-item ctype="input" name="readRqstrName"  label="调阅申请人"  :disabled="true"></yu-xform-item>
        <yu-xform-item ctype="input" name="readRqstrOrgName"  label="调阅申请机构" :disabled="true"></yu-xform-item>
        <yu-xform-item ctype="input" name="readRqstrId"  label="调阅申请人"  :disabled="true" :hidden="true"></yu-xform-item>
        <yu-xform-item ctype="input" name="readRqstrOrg"  label="调阅申请机构" :disabled="true" :hidden="true"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="档案信息列表" panel-type="simple" is-collapse :collapse-title="collapseTitle">
      <div class="yu-toolBar">
        <yu-button-group>
          <yu-button @click="addDebtFn"  v-show="ifSave">引入</yu-button>
          <yu-button @click="deleteDebtFn"  v-show="ifSave">删除</yu-button>
        </yu-button-group>
      </div>
      <yu-xtable ref="applyBussTable" row-number :data-url="applyBussDataUrl" request-type="POST" :base-params="baseBussParams">
        <yu-xtable-column label="档案编号" prop="docNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="档案分类" prop="docClass" width="150" data-code="STD_DOC_CLASS"></yu-xtable-column>
        <yu-xtable-column label="档案类型" prop="docType" width="150" data-code="STD_DOC_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="200" ></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="200" ></yu-xtable-column>
        <yu-xtable-column label="关联业务编号" prop="bizSerno" width="150" ></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName" width="150" ></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName" width="150" ></yu-xtable-column>
        <yu-xtable-column label="入库操作人" prop="optUsrName" width="150" ></yu-xtable-column>
        <yu-xtable-column label="入库操作机构" prop="optOrgName" width="150"></yu-xtable-column>
        <yu-xtable-column label="入库操作时间" prop="optDate" width="150"></yu-xtable-column>
        <yu-xtable-column label="档案入现金库时间" prop="storageCashDate" width="160"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="submitApplyFn" v-show="ifSave">提交</yu-button>
      <yu-button  type="primary" @click="saveApplyFn" >保存</yu-button>
      <yu-button  type="primary" @click="cancelFn">返回</yu-button>
    </div>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
    <yu-xdialog :visible.sync="dialogVisibleDebt" width="1200px" title="档案信息列表">
      <yu-xform form-type="search" v-model="searchFormdata" label-width="100px" related-table-name="refDebtTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户名称" ctype="input" placeholder="请输入客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="请输入客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="档案编号" ctype="input" placeholder="请输入档案编号" name="docNo"></yu-xform-item>
          <yu-xform-item label="档案类型" ctype="select" placeholder="请选择档案类型" name="docType" data-code="STD_DOC_TYPE"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refDebtTable" :row-number="true" selection-type="checkbox" request-type="POST" :pageable="true" :data-url="dataDebtUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
        <yu-xtable-column label="档案编号" prop="docNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="档案分类" prop="docClass" width="150" data-code="STD_DOC_CLASS"></yu-xtable-column>
        <yu-xtable-column label="档案类型" prop="docType" width="150" data-code="STD_DOC_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="200" ></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="200" ></yu-xtable-column>
        <yu-xtable-column label="关联业务编号" prop="bizSerno" width="150" ></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName" width="150" ></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName" width="150" ></yu-xtable-column>
        <yu-xtable-column label="入库操作人" prop="optUsrName" width="150" ></yu-xtable-column>
        <yu-xtable-column label="入库操作机构" prop="optOrgName" width="150"></yu-xtable-column>
        <yu-xtable-column label="入库操作时间" prop="storageOptDate" width="150"></yu-xtable-column>
        <yu-xtable-column label="档案入现金库时间" prop="storageCashDate" width="160"></yu-xtable-column>
        <yu-xtable-column label="档案状态" prop="docStauts" data-code="STD_DOC_STAUTS"></yu-xtable-column>
      </yu-xtable>
      <div style="text-align:center;">
        <el-button type="primary" @click="selectedDebtFn" size="small">确认</el-button>
        <el-button @click="clearDebtFn" size="small">取消</el-button>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('YESNO,STD_DOC_CLASS,STD_DOC_TYPE,STD_READ_REASON,STD_READ_MODE,STD_DOC_STAUTS,STD_READ_TYPE');
export default {
  mixins: [mixin],
  components: { yufpNwfInit },
  data: function () {
    return {
      viewType: '',
      dialogVisible: false,
      dialogVisibleDebt: false,
      applyBaseData: null,
      baseParams: {condition: JSON.stringify({ docStauts: '03', docClass: '03', isCanAdd: 'true'})},
      baseBussParams: {condition: JSON.stringify({ draiSerno: '999999'}) },
      ifSave: false, // 是否已保存
      applyBussDataUrl: this.$backend.cmisBiz + '/api/docreaddetailinfo/query',
      dataDebtUrl: this.$backend.cmisBiz + '/api/docAccList/query/pageList',
      formdata: null,
      collapseTitle: ['收起', '展开'],
      pickerOptions: {
        disabledDate: function (time) {
          return time.getTime() < Date.now() - 8.64e7;
        } // 用户有效期禁用当前之前的日期
      },
      treeParams: {
        dataId: 'orgId',
        dataLabel: 'orgName',
        dataPid: 'updptId',
        dataUrl: backend.appOcaService + '/api/adminsmorg/orgtreequery',
        placeholder: this.$t('sysUserManager.qxz'),
        searchKey: 'orgName', // 树过滤关键字
        dataParams: {
          orgSts: 'A'
        } // 额外请求参数 默认查询生效的机构
      }, // 机构树选择
      rules: {
        readPurposeDesc: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符' }
        ],
        reasonMome: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ]
      }
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
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      _this.viewType = _this.$route.meta.params.viewType;
      _this.applyBaseData.draiSerno = _this.$xutils.getSEQWithParamFromServer('DOC_SERNO');
      _this.applyBaseData.readRqstrDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      _this.applyBaseData.readRqstrId = this.loginCode;
      _this.applyBaseData.readRqstrName = this.userName;
      _this.applyBaseData.readRqstrOrg = this.orgCode;
      _this.applyBaseData.readRqstrOrgName = this.orgName;
      _this.baseBussParams = {condition: JSON.stringify({ draiSerno: _this.applyBaseData.draiSerno}) };
    },
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    /** 选择申请人后的处理方法 */
    selectedUserFn (model) {
      var _this = this;
      // debugger;
      _this.applyBaseData.readId = model.loginCode;
      _this.applyBaseData.readName = model.userName;
      _this.applyBaseData.readOrgName = model.orgName;
      _this.applyBaseData.readOrg = model.orgId;
    },
    /**
    * 选择申请人机构
    * @param value 当前输入信息
    * @param nodeData 当前节点属性信息
    * @param node 当前节点信息
    */
    changeOrgFn: function (node) {
      this.applyBaseData.readOrg = node.orgId;
    },
    /**
     *保存
     */
    saveApplyFn () {
      var _this = this;
      var model = {};
      yufp.clone(_this.applyBaseData, model);
      var validate = false;
      _this.$refs.applyBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let url = this.$backend.cmisBiz + '/api/docreadappinfo/save';
      if (_this.ifSave) {
        url = this.$backend.cmisBiz + '/api/docreadappinfo/update';
      }
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.ifSave = true;
            _this.$message('操作成功');
          }
        }
      });
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      this.cancelFn();
    },
    /**
     *提交
     */
    submitApplyFn () {
      var _this = this;
      var bizType = '';
      if (_this.$refs.applyBussTable.total < 1) {
        _this.$message({
          message: '请添加需要调阅的文档记录!',
          type: 'warning'
        });
        return false;
      } else {
        let dutyType = '01';// 发起人岗位 01客户经理 02档案岗
        const loginUser = _this.$xutils.getLoginUserInfo();
        const orgType = loginUser.org.orgType;
        const dutysList = loginUser.dutys;
        let zcbqFlag = '0';// 是否资产保全客户经理
        if (orgType == 'A') {
          if (loginUser.orgCode.startsWith('80')) {
            bizType = 'SGJ01';// 档案调阅审批流程（寿光）
          } else if (loginUser.orgCode.startsWith('81')) {
            bizType = 'DHJ01';// 档案调阅审批流程（东海）
          }
          if (dutysList != undefined) {
            for (let i = 0; i < dutysList.length; i++) {
              let item = dutysList[i];
              if (item.code === 'DHH21' || item.code === 'SGH21') { // 资产保全客户经理（东海）DHH21；资产保全客户经理（寿光）SGH21
                zcbqFlag = '1';
                break;
              }
            };
          }
        } else {
          bizType = 'DA001'; // 档案调阅审批流程-分支机构
          if (dutysList != undefined) {
            for (let i = 0; i < dutysList.length; i++) {
              let item = dutysList[i];
              if (item.code === 'ZYB16') { // 集中作业中心-档案岗
                bizType = 'DA002';
                break;
              } else if (item.code === 'XWB13') { // 小微内勤岗
                bizType = 'DA003';
                break;
              } else if (item.code === 'FZH16') { // 分支机构档案岗
                bizType = 'DA001';
                dutyType = '02';
                break;
              }
            };
          }
          if (bizType == 'DA001' && _this.applyBaseData.readType == '04') {
            _this.$message({
              message: '调阅类型与流程不匹配,请重新选择!',
              type: 'warning'
            });
            return false;
          } else if (bizType == 'DA002' && _this.applyBaseData.readType == '04') {
            _this.$message({
              message: '调阅类型与流程不匹配,请重新选择!',
              type: 'warning'
            });
            return false;
          } else if (bizType == 'DA003' && (_this.applyBaseData.readType == '01' || _this.applyBaseData.readType == '02')) {
            _this.$message({
              message: '调阅类型与流程不匹配,请重新选择!',
              type: 'warning'
            });
            return false;
          }
        }

        // 提交流程
        let startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.org.code;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = bizType;
        startdto.bizId = _this.applyBaseData.draiSerno;
        startdto.bizUserName = _this.applyBaseData.readName;
        startdto.bizUserId = _this.applyBaseData.readId;
        startdto.param = {readType: _this.applyBaseData.readType, dutyType: dutyType, zcbqFlag: zcbqFlag};
        _this.$refs.yufpNwfInit.wfInit(startdto);
      }
    },
    /** 引入档案记录 */
    addDebtFn () {
      var _this = this;
      _this.dialogVisibleDebt = true;
    },
    /** 选择档案信息后添加到数据库，并刷新列表 */
    selectedDebtFn () {
      var _this = this;
      if (_this.$refs.refDebtTable.selections.length < 1) {
        _this.$message({
          message: '请先选择至少一条记录',
          type: 'warning'
        });
        return;
      }
      var model = _this.$refs.refDebtTable.selections;
      var newArray = [];
      model.forEach(function (item) {
        item.draiSerno = _this.applyBaseData.draiSerno;
        item.optDate = item.storageOptDate;
        newArray.push(item);
      });
      yufp.service.request({
        method: 'POST',
        data: JSON.stringify(newArray),
        url: this.$backend.cmisBiz + '/api/docreaddetailinfo/savelist',
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.dialogVisibleDebt = false;
            _this.$refs.applyBussTable.remoteData();
            _this.$message('操作成功');
          }
        }
      });
    },
    /** 关闭档案信息选择窗口 */
    clearDebtFn () {
      this.dialogVisibleDebt = false;
    },
    /** 删除引入 */
    deleteDebtFn () {
      var _this = this;
      if (_this.$refs.applyBussTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      yufp.service.request({
        method: 'POST',
        data: JSON.stringify({ 'drdiSerno': _this.$refs.applyBussTable.selections[0].drdiSerno}),
        url: this.$backend.cmisBiz + '/api/docreaddetailinfo/delete',
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.applyBussTable.remoteData();
            _this.$message('操作成功');
          }
        }
      });
    }
  }
};
</script>
