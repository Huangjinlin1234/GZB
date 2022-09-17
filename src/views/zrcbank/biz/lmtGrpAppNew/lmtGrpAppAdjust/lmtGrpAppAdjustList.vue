<template>
  <!--
    @created by 屈文
    @description 集团客户额度调剂列表、历史列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="集团客户额度调剂申请" name="messageTip">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
              <yu-xform-group :column="3">
                <yu-xform-item label="集团客户名称" placeholder="集团客户名称" ctype="input" name="grpCusName"></yu-xform-item>
                <!--<yu-xform-item label="业务类型" placeholder="业务类型" ctype="input" name="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xform-item>-->
                <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="grpSerno"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFnStatus"></yu-xform-item>
                <yu-xform-item label="集团客户编号" placeholder="集团客户编号" ctype="input" name="grpCusId" ></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          <yu-toolbar>
            <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
            <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
          </yu-toolbar>
          <!--<yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" selection-type="radio" request-type="POST" @row-click="onSelected">-->
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" selection-type="radio" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="grpSerno"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="lmtType" sortable data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="集团客户编号">
              <template slot-scope="scope">
                <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.grpCusId }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="集团客户名称">
              <template slot-scope="scope">
                <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.grpCusName }}</span>
              </template>
            </yu-xtable-column>
            <!--<yu-xtable-column label="客户类型" prop="cusType" data-code="NATIONALITY"></yu-xtable-column>-->
            <yu-xtable-column label="敞口额度合计（元）" prop="openTotalLmtAmt" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="低风险额度合计（元）" prop="lowRiskTotalLmtAmt" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName"> </yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"> </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="集团客户额度调剂历史" name="deal">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTableHis" form-type="search" v-model="searchHisFormdata" label-width="60px">
              <yu-xform-group :column="3">
                <yu-xform-item label="集团客户名称" placeholder="集团客户名称" label-width="120px" ctype="input" name="grpCusName"></yu-xform-item>
                <!--<yu-xform-item label="业务类型" placeholder="业务类型" label-width="120px" ctype="input" name="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xform-item>-->
                <yu-xform-item label="业务流水号" placeholder="业务流水号" label-width="120px" ctype="input" name="grpSerno"></yu-xform-item>
                <yu-xform-item label="集团客户编号" placeholder="集团客户编号" label-width="120px" ctype="input" name="grpCusId"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" label-width="120px" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFnStatusHis"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          <yu-toolbar>
            <yu-button type="primary" @click="viewFn" v-if="checkCtrl('view')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTableHis" row-number :data-url="dataHisUrl" condition-key="condition" selection-type="radio" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="grpSerno"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="lmtType" sortable data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="集团客户编号">
              <template slot-scope="scope">
                <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.grpCusId }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="集团客户名称">
              <template slot-scope="scope">
                <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.grpCusName }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="敞口额度合计（元）" prop="openTotalLmtAmt" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column >
            <yu-xtable-column label="低风险额度合计（元）" prop="lowRiskTotalLmtAmt" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column >
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName"> </yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"> </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <!--集团客户额度调剂向导-->
      <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisibleGuide" width="650px">
        <yu-xform ref="refForm" label-width="140px" v-model="formdata" :disabled="formDisabled">
          <yu-xform-group column="1">
            <yu-xform-item label="编码" ctype="num" name="id" :hidden="true"></yu-xform-item>
            <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" colspan="19" name="grpCusId"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="grpCusId" colspan="1">
                  <yu-button type="primary" @click="selectLmtAcc">选取</yu-button>
            </yu-xform-item>
            <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" rules="required" placeholder="集团客户名称" colspan="22"></yu-xform-item>
            <yu-xform-item label="授信类型" rules="required" ctype="select" placeholder="授信类型" name="lmtType" data-code="STD_SX_LMT_TYPE" disabled colspan="22"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="nextFn">下一步</yu-button>
            <yu-button type="primary" @click="cancelFn">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
      <!--集团客户授信批复选取-->
      <yu-xdialog title="授信台账列表" ref="refLmtAccDialog" :visible.sync="dialogVisibleReply" width="1000px" height="400px">
        <yu-xform related-table-name="refLmtAccTable" form-type="search" v-model="searchReplyFormdata" label-width="60px">
          <yu-xform-group :column="4">
            <yu-xform-item placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
            <yu-xform-item placeholder="批复编号" name="accNo" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refLmtAccTable" row-number condition-key="condition" :data-url="dataReplyAccForRefineList" :default-load="true" request-type="POST" size="full">
          <yu-xtable-column label="批复编号" prop="grpReplySerno" width="100"></yu-xtable-column>
           <yu-xtable-column label="集团客户编号">
              <template slot-scope="scope">
                <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.grpCusId }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="集团客户名称">
              <template slot-scope="scope">
                <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.grpCusName }}</span>
              </template>
            </yu-xtable-column>
          <yu-xtable-column label="审批模式" prop="apprMode" data-code="STD_APPR_MODE" width="100"></yu-xtable-column>
          <yu-xtable-column label="终审机构" prop="finalApprBrType" data-code="STD_FINAL_APPR_BR_TYPE" width="100"></yu-xtable-column>
          <yu-xtable-column label="审批结论" prop="apprResult" width="100" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          <yu-xtable-column label="批复生效日期" prop="replyInureDate" width="100"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="批复状态" prop="replyStatus" width="100" data-code="STD_XD_REPLY_STATUS"></yu-xtable-column>
        </yu-xtable>
        <yu-form-buttons align="center">
          <yu-button type="primary" @click="makeSure">确认</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </yu-form-buttons>
       </yu-xdialog>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_APPR_MODE,STD_FINAL_APPR_BR_TYPE,STD_XD_REPLY_STATUS,STD_SX_LMT_TYPE,STD_ZB_APPR_STATUS');
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  mixins: [mixinForm],
  data: function () {
    return {
      activeName: 'messageTip',
      searchFormdata: {},
      searchHisFormdata: {},
      formdata: {},
      searchReplyFormdata: {},
      formdataNext: {},
      dialogVisibleGuide: false,
      dialogVisibleReply: false,
      dataUrl: backend.cmisBiz + '/api/lmtgrpapp/queryadjustlist',
      dataHisUrl: backend.cmisBiz + '/api/lmtgrpapp/queryadjusthislist',
      dataReplyAccForRefineList: backend.cmisBiz + '/api/lmtgrpreplyacc/queryall',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      replySerno: '',
      lmtTerm: ''
    };
  },
  methods: {
    // 字典项过滤
    datacodeFilterFnStatus: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '000' || op.key === '111' || op.key === '992') {
          return true;
        }
        return false;
      });
    },
    datacodeFilterFnStatusHis: function (opts, datacode, name) { // 990,991,993,997,998,996
      return opts.filter(function (op) {
        if (op.key === '990' || op.key === '991' || op.key === '993' || op.key === '996' || op.key === '997' || op.key === '998') {
          return true;
        }
        return false;
      });
    },
    // list集团客户编号
    openDialog: function (a) {
      var _this = this;

      if (a.grpCusId == null || a.grpCusId == '') {
        _this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['grpNo'] = a.grpCusId;
      // 集团认定详情展示组合模板
      json['model_group_no'] = 'CMG000311';
      json['op'] = 'view';
      this.$dialog.open(
        '集团客户',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        json,
        null,
        true,
        true
      );
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.dialogVisibleGuide = true;
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
        _this.$message({
          message: '只有待发起或者打回的数据可以执行修改操作!',
          type: 'warning'
        });
        return;
      }
      _this.jumpFactoryOrAdd(jsoPar);
    },

    jumpFactoryOrAdd: function (jsoPar) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/judgeisafterinitlmtgrpmemrelstatus',
        data: jsoPar.grpSerno,
        callback: function (code, message, response) {
          if (response.data == 'true') {
            _this.jumpFactory(jsoPar);
          } else {
            _this.addTab(jsoPar);
          }
        }
      });
    },

    // 调模版工厂
    jumpFactory: function (jsoPar) {
      var _this = this;
      var modelGroupNo = 'CMG000695';
      jsoPar['model_group_no'] = modelGroupNo;
      jsoPar['op'] = 'EDIT';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.grpSerno + '_' + new Date().getTime(),
        title: '集团客户授信调剂',
        data: {
          model_group_no: modelGroupNo,
          op: 'EDIT',
          grpSerno: jsoPar.grpSerno,
          serno: jsoPar.grpSerno,
          grpCusId: jsoPar.grpCusId,
          cusId: jsoPar.grpCusId,
          origiLmtSerno: jsoPar.origiLmtSerno,
          imageParams: {
            docid: jsoPar.grpSerno,
            contid: jsoPar.grpSerno,
            businessid: jsoPar.origiLmtSerno
          }
        }
      });
    },

    // 打开tab页签
    addTab: function (jsoPar) {
      var _this = this;
      var name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppAdjust/lmtGrpAppAdjustAdd';
      _this.$router.addTab({
        name: name,
        title: '集团客户授信额度调剂发起',
        key: 'key',
        data: {
          data: jsoPar
        }
      });
    },

    /**
     * 刪除按钮
     */
    deleteFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      if (obj.approveStatus != '000' && obj.approveStatus != '992') {
        _this.$message({
          message: '只有待发起或者打回的数据可以执行删除操作!',
          type: 'warning'
        });
        return;
      }
      var grpSerno = obj.grpSerno;
      _this.$confirm('确认删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            // 调用删除方法
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtgrpapp/logicdelete',
              data: grpSerno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message('删除成功');
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message('删除失败');
                  _this.$refs.refTable.remoteData();
                  return;
                }
              }
            });
          }
        }
      });
    },

    /**
     * 列表详情
     */
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      var modelGroupNo = 'CMG000695';
      jsoPar['model_group_no'] = modelGroupNo;
      jsoPar['op'] = 'VIEW';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.grpSerno,
        title: '集团客户授信调剂详情',
        data: {
          model_group_no: modelGroupNo,
          op: 'VIEW',
          grpSerno: jsoPar.grpSerno,
          serno: jsoPar.grpSerno,
          grpCusId: jsoPar.grpCusId,
          cusId: jsoPar.grpCusId,
          imageParams: {
            docid: jsoPar.grpSerno,
            contid: jsoPar.grpSerno,
            businessid: jsoPar.origiLmtSerno
          }
        }
      });
    },

    /**
     * 历史列表详情
     */
    viewFn: function () {
      var _this = this;
      if (_this.$refs.refTableHis.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var jsoPar = _this.$refs.refTableHis.selections[0];
      var modelGroupNo = 'CMG000695';
      jsoPar['model_group_no'] = modelGroupNo;
      jsoPar['op'] = 'VIEW';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.grpSerno,
        title: '集团客户授信调剂详情',
        data: {
          model_group_no: modelGroupNo,
          op: 'VIEW',
          grpSerno: jsoPar.grpSerno,
          serno: jsoPar.grpSerno,
          grpCusId: jsoPar.grpCusId,
          cusId: jsoPar.grpCusId,
          imageParams: {
            docid: jsoPar.grpSerno,
            contid: jsoPar.grpSerno,
            businessid: jsoPar.origiLmtSerno
          }
        }
      });
    },

    /**
     * 批复选取dialog
     */
    selectLmtAcc: function () {
      var _this = this;
      _this.dialogVisibleReply = true;
    },

    /**
     * 确认
     */
    makeSure: function () {
      var _this = this;
      var selections = _this.$refs.refLmtAccTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogVisibleReply = false;
      yufp.clone(selections[0], _this.formdata);
      _this.formdata.lmtType = '08';
    },

    /**
     * 下一步
     */
    // nextFn: function () {
    //   var _this = this;
    //   var jsoPar = _this.formdata;
    //   var grpCusId = jsoPar.grpCusId;
    //   // todo 校验参数提示信息
    //   if (grpCusId == null || grpCusId == '') {
    //     _this.$message('提交参数为空');
    //     return;
    //   }
    //   // 根据客户号进行查询判断客户号是否存在台账表中 aizhag todo 先复用,不存在默认是新增，存在是细化
    //   yufp.service.request({
    //     method: 'POST',
    //     url: backend.cmisBiz + '/api/lmtgrpapp/judgeisexistonwayapp',
    //     data: grpCusId,
    //     callback: function (code, message, response) {
    //       // 在向后台返回数值,如果不存在，提示错误信息，可以进行细化操作
    //       if (response.data == 'false') {
    //         _this.$message('交易成功');
    //         _this.guideSave(jsoPar);
    //       } else {
    //         // 弹出提示:已存在...
    //         _this.$message('已存在在途的授信申请');
    //         return;
    //       }
    //     }
    //   });
    // },

    // 根据主从表插入申请数据，调保存方法，返回grpSerno
    nextFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var jsoPar = _this.formdata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/guidesave',
        data: jsoPar,
        callback: function (code, message, response) {
          var retvalue = response.code;
          var grpSerno = response.data;
          if (retvalue == '0') {
            var idList = '';
            var pageList = '';
            idList = 'jtedtjsqb';
            pageList = '集团额度调剂申请表';
            _this.insertMustCheck(grpSerno, '08', idList, pageList);
            _this.$message('保存成功');
            // 返回对应的流水号去查询
            _this.addNewTab(grpSerno);
          } else {
            _this.$message(response.message);
            return;
          }
        }
      });
    },
    insertMustCheck: function (serno, lmtType, idList, pageList) {
      var _this = this;
      let obj = {};
      obj.serno = serno;
      obj.bizType = lmtType;
      obj.idList = idList;
      obj.pageList = pageList;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.$backend.cmisBiz + '/api/bizmustcheckdetails/insertMustCheck',
        data: obj,
        callback: function (code, message, response) {
          if (response.data == '0') {
            _this.$xutils.showMsgBox('系统异常');
          }
        }});
    },
    // 打开新的tab页签
    addNewTab: function (grpSerno) {
      var _this = this;
      _this.dialogVisibleGuide = false;
      _this.$router.addTab({
        name: 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppAdjust/lmtGrpAppAdjustAdd',
        title: '集团客户授信申报发起',
        key: 'key',
        data: {
          data: grpSerno
        }
      });
    },

    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleGuide = false;
    },

    /**
     * 返回
     */
    back: function () {
      var _this = this;
      _this.dialogVisibleReply = false;
    },
    // 表格金额字段处理
    formatNumber: function (format, sort) {
      let _this = this;
      sort = sort === undefined ? 2 : sort;
      return function (r, c, v) {
        var val;
        switch (sort) {
        case 0:
          val = r;
          break;
        case 1:
          val = c;
          break;
        case 2:
          val = v;
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('未找到分类');
          break;
        }

        if (val == undefined) {
          return '';
        }
        if (val != 0 && !parseFloat(val)) {
          return val;
        }
        return _this.number(val, format);
      };
    },
    /**
   * Formats the number according to the format string.
   * examples (123456.789):
   * 0 - (123456) show only digits, no precision<br>
   * 0.00 - (123456.78) show only digits, 2 precision<br>
   * 0.0000 - (123456.7890) show only digits, 4 precision<br>
   * 0,000 - (123,456) show comma and digits, no precision<br>
   * 0,000.00 - (123,456.78) show comma and digits, 2 precision<br>
   * 0,0.00 - (123,456.78) shortcut method, show comma and digits, 2 precision<br>
   * To reverse the grouping (,) and decimal (.) for international numbers, add /i to the end.
   * For example: 0.000,00/i
   * @param {Number} v The number to format.
   * @param {String} format The way you would like to format this text.
   * @return {String} The formatted number.
   */
    number: function (v, format) {
      if (!format) {
        return v;
      }
      if (isNaN(v)) {
        return '';
      }
      var comma = ',',
        dec = '.',
        i18n = false,
        neg = v < 0;

      v = Math.abs(v);
      if (format.substr(format.length - 2) == '/i') {
        format = format.substr(0, format.length - 2);
        i18n = true;
        comma = '.';
        dec = ',';
      }

      var hasComma = format.indexOf(comma) != -1,
        psplit = (i18n ? format.replace(/[^\d,]/g, '') : format.replace(/[^\d.]/g, '')).split(dec);

      if (psplit.length > 1) {
        v = v.toFixed(psplit[1].length);
      } else if (psplit.length > 2) {
        throw new Error('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
      } else {
        v = v.toFixed(0);
      }

      var fnum = v.toString();

      psplit = fnum.split('.');

      if (hasComma) {
        let cnum = psplit[0],
          parr = [],
          j = cnum.length,
          // m = Math.floor(j / 3),
          n = cnum.length % 3 || 3,
          i;

        for (i = 0; i < j; i += n) {
          if (i != 0) {
            n = 3;
          }

          parr[parr.length] = cnum.substr(i, n);
          // m -= 1;
        }
        fnum = parr.join(comma);
        if (psplit[1]) {
          fnum += dec + psplit[1];
        }
      } else {
        if (psplit[1]) {
          fnum = psplit[0] + dec + psplit[1];
        }
      }

      return (neg ? '-' : '') + format.replace(/[\d,?.?]+/, fnum);
    }
  }
};
</script>
