<template>
  <!--
    @created by 周晓宙
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 委托贷款出账待发起申请列表   委托贷款出账已处理申请列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待发起" name="messageTip">
        <yu-panel title="输入查询条件">
          <yu-xform related-table-name="refTable" form-type="search">
            <yu-xform-group :column="3">
              <yu-xform-item label="出账流水号" placeholder="出账流水号" ctype="input" name="pvpSerno"></yu-xform-item>
              <yu-xform-item label="合同编号" placeholder="合同编号" ctype="input" name="contNo"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="资料全否" placeholder="资料全否" ctype="select" name="fileSufFlag"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFn"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
            <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
            <yu-button type="primary" @click="invalidFn" v-if="checkCtrl('cancel')">手工作废</yu-button>
            <yu-button type="primary" @click="start" hidden>提交</yu-button>
            <yu-button type="primary" @click="startAndSubmit" hidden>发起并提交</yu-button>
            <yu-button type="primary" @click="accloanFn" v-if="checkCtrl('printbill')">打印借款借据</yu-button>
            <yu-button type="primary" @click="accloanFn2" v-if="checkCtrl('printapp')">打印额度借款支用申请书</yu-button>
          </yu-toolbar>

          <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" request-type="POST"  selection-type="radio">
            <yu-xtable-column label="业务流水号" prop="pvpSerno" width="200"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width="220"></yu-xtable-column>
            <yu-xtable-column label="出账金额" prop="pvpAmt"  :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"  width="220" ></yu-xtable-column>
            <yu-xtable-column label="产品编号" prop="prdId" ></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode"  data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="资料全否" prop="fileSufFlag" ></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerIdName" hidden="true"></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrIdName" hidden="true" width="220"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="已处理" name="deal">
        <yu-panel title="输入查询条件">
            <yu-xform related-table-name="refDealTable" form-type="search">
              <yu-xform-group :column="3">
                <yu-xform-item label="出账流水号" placeholder="出账流水号" ctype="input" name="pvpSerno"></yu-xform-item>
                <yu-xform-item label="合同编号" placeholder="合同编号" ctype="input" name="contNo"></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
                <yu-xform-item label="资料全否" placeholder="资料全否" ctype="select" name="fileSufFlag"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFn"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          <yu-toolbar>
            <yu-button type="primary" @click="infoFnHis" v-if="checkCtrl('hisview')">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refDealTable" condition-key="condition" row-number :data-url="dataHisUrl" request-type="POST" selection-type="radio">
            <yu-xtable-column label="业务流水号" prop="pvpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="出账金额" prop="pvpAmt" width="120" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
            <yu-xtable-column label="产品编号" prop="prdId" width="120"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" width="120" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="资料全否" prop="fileSufFlag" width="120"></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerIdName" width="120" hidden="true"></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrIdName" width="120" hidden="true"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group :column="1">
          <!--<yu-xform-item label="合同编号" name="contNo" ctype="YufpZrcSelector" :params="contParms" :rules="{ required: true, message: '字段不能为空' }" @select-fn="selectCont"></yu-xform-item>-->
          <yu-xform-item label="合同编号" name="contNo" rules="required" icon="search" disabled:triger-click="false" :on-icon-click="handleIconClick"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled></yu-xform-item><br />
          <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled></yu-xform-item><br />
          <yu-xform-item label="出账金额" ctype="input" name="pvpAmt"></yu-xform-item><br />
          <!--<yu-xform-item label="点评" ctype="textarea" name="remark" :rows="3" :colspan="24" placeholder="2000个字符以内"></yu-xform-item>-->
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveFn">下一步</yu-button>
          <yu-button type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <yufpNwfInit ref="yufpNwfInit"  @success-click="afterCommitCallBack"></yufpNwfInit>
  </div>
</template>
<script>
yufp.lookup.reg('YESNO,STD_ZB_APPR_STATUS,DATA_STS,STD_ZB_GUAR_WAY');
import { clone, extend, lookup } from '@/utils';
import { validator } from '@/utils/validate';
import { getUrl, checkBelongToChooseNode } from '@/utils/util';
import { mapGetters } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  data: function () {
    return {
      urls: {
        flow: backend.workflowService + '/api/biz/',
        start: backend.workflowService + '/api/core/start'
      },
      dataUrl: backend.cmisBiz + '/api/pvpentrustloanapp/tosignlist',
      dataHisUrl: backend.cmisBiz + '/api/pvpentrustloanapp/donesignlist',
      activeName: 'messageTip',
      formdata: {},
      contParms: {
        title: '选择合同',
        queryFields: [
          {
            placeholder: '合同编号',
            field: 'contNo',
            type: 'input',
            fuzzyQuery: 'both'
          },
          {
            placeholder: '客户号',
            field: 'cusId',
            type: 'input',
            fuzzyQuery: 'both'
          },
          {
            placeholder: '客户名称',
            field: 'cusName',
            type: 'input',
            fuzzyQuery: 'both'
          }
        ],
        dataUrl: backend.cmisBiz + '/api/ctrentrustloancont/selectctrloan',
        tableColumns: [
          { label: '合同编号', prop: 'contNo' },
          { label: '客户号', prop: 'cusId' },
          { label: '客户名称', prop: 'cusName' },
          { label: '产品编号 ', prop: 'prdId' },
          { label: '产品名称 ', prop: 'prdName' },
          { label: '合同金额', prop: 'contAmt' },
          { label: '合同余额', prop: 'contHighAvlAmt' },
          {
            label: '担保方式',
            prop: 'guarMode',
            dataCode: 'STD_ZB_GUAR_WAY'
          }
        ]
      },
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
      dialogVisible: false,
      formDisabled: false,
      required: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      topOutsystemCode: 'WTDKCZJB;WTDKDYHT;WTDKZYHT;WTDKBZDBHT;WTDKDCCZ;',
      topOutsystemCodeCopy: 'DKDY;'
    };
  },
  methods: {
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;

      _this.dialogVisible = false;
    },

    /**
     * 流程提交
     */
    start: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = obj.managerBrId;
      startdto.userId = obj.managerId;
      startdto.bizType = 'WFI_IQP_LOAN';
      startdto.bizId = obj.pvpSerno;
      startdto.bizUserName = obj.cusName;
      startdto.bizUserId = obj.cusId;
      startdto.param = {
        money: obj.pvpAmt,
        topOutsystemCode: this.topOutsystemCode,
        topOutsystemCodeCopy: this.topOutsystemCodeCopy,
        imageParams: {
          contid: obj.contNo,
          businessid: obj.pvpSerno,
          docid: obj.pvpSerno
        },
        imageCopyParams: {
          contid: obj.contNo,
          businessid: obj.pvpSerno,
          docid: obj.pvpSerno
        }
      };
      startdto.bizParam4 = obj.pvpSerno;
      yufp.service.request({
        method: 'POST',
        data: startdto,
        url: _this.urls.start,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data.flowStarterName) {
              _this.$message({
                message: response.data.flowStarterName + '成功发起@' + response.data.flowName,
                type: 'success',
                duration: 6000
              });
            }
          } else {
            _this.$message({
              duration: 6000,
              message: '流程发起异常:' + response.message.substring(0, 100),
              type: 'warning'
            });

            return false;
          }
        }
      });
    },

    /**
     * 流程提交节点选择框
     */
    startAndSubmit: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = obj.managerBrId;
      startdto.userId = obj.managerId;
      startdto.bizType = 'WFI_IQP_LOAN';
      startdto.bizId = obj.pvpSerno;
      startdto.bizUserName = obj.cusName;
      startdto.bizUserId = obj.cusId;
      startdto.param = {
        money: obj.pvpAmt,
        startOrgId: obj.managerBrId,
        topOutsystemCode: this.topOutsystemCode,
        topOutsystemCodeCopy: this.topOutsystemCodeCopy,
        imageParams: {
          contid: obj.contNo,
          businessid: obj.pvpSerno,
          docid: obj.pvpSerno
        },
        imageCopyParams: {
          contid: obj.contNo,
          businessid: obj.pvpSerno,
          docid: obj.pvpSerno
        },
        contNo: obj.contNo
      };
      startdto.bizParam4 = obj.pvpSerno;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    /*
     * 参数说明：
     * money：要格式化的数字
     * num：保留几位小数
     * */
    toPercent: function (money) {
      // num = num > 0 && num <= 20 ? num : 2;
      money = parseFloat(money + '') + '%';
      return money;
    },

    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '000') {
          return true;
        }
        return false;
      });
    },

    // 字典项过滤
    datacodeFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key !== '000') {
          return true;
        }
        return false;
      });
    },

    /**
     * 选择合同方法
     */
    selectCont: function (arr) {
      this.formdata.contNo = arr[0].contNo;
      this.formdata.cusId = arr[0].cusId;
      this.formdata.cusName = arr[0].cusName;
    },

    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;
      var model = {};
      let obj = {};
      yufp.clone(_this.$refs.refForm.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = '';
      if (_this.viewType == 'ADD') {
        url = backend.cmisBiz + '/api/pvpentrustloanapp/saveentrustloanapp';
      } else {
        url = backend.cmisBiz + '/api/pvpentrustloanapp/commonupdateentrustloanapp';
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.dialogVisible = false;
              // _this.$router.addTab({
              //   // 路由名称,菜单路径
              //   name: 'zrcbank/biz/pvpEntrustApp/pvpEntrustAppUpdateInfo',
              //   // 自定义唯一页签key,请统一使用custom_前缀开头
              //   key: '1', // 必传
              //   // 页签名称
              //   title: '委托贷款出账申请详情',
              //   // 传递的业务数据，可选配置
              //   data: {
              //     pvpSerno: response.data.pvpSerno,
              //     op: 'EDIT'
              //   }
              // });
              obj['pvpSerno'] = response.data.pvpSerno;
              obj['model_group_no'] = 'CMG000656';
              obj['op'] = 'EDIT';
              obj['topOutsystemCode'] = _this.topOutsystemCode;
              obj['topOutsystemCodeCopy'] = _this.topOutsystemCodeCopy; // 他项权证影像
              obj['imageCopyParams'] = {
                contid: model.contNo,
                businessid: model.pvpSerno,
                docid: model.pvpSerno
              };
              obj['imageParams'] = {
                contid: model.contNo,
                businessid: model.pvpSerno,
                docid: model.pvpSerno
              };
              let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
              _this.$router.addTab({
                name: path,
                key: obj.pvpSerno + obj.op,
                title: '委托贷款出账申请详情',
                data: obj
              });
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

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;

      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;

      _this.switchStatus('ADD', true);

      // _this.$nextTick(function() {
      //   _this.$refs.refForm.formdata.createTime = this.format(
      //     new Date(),
      //     "yyyy-MM-dd HH:mm:ss"
      //   );
      // _this.required = true;
      // });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
        _this.$message({
          message: '审批中的数据不允许修改',
          type: 'warning'
        });
        return;
      }


      jsoPar['model_group_no'] = 'CMG000656';
      jsoPar['op'] = 'EDIT';
      jsoPar['topOutsystemCode'] = _this.topOutsystemCode;
      jsoPar['topOutsystemCodeCopy'] = _this.topOutsystemCodeCopy; // 他项权证影像
      jsoPar['imageType'] = '2';
      jsoPar['imageCopyParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.pvpSerno,
        docid: jsoPar.pvpSerno
      };
      jsoPar['imageParams'] = {
        contid: jsoPar.contNo,
        businessid: jsoPar.pvpSerno,
        docid: jsoPar.pvpSerno
      };
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.pvpSerno + jsoPar.op,
        title: '委托贷款出账申请详情',
        data: jsoPar
      });
      this.$refs.refTable.remoteData();
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称,菜单路径
          name: 'zrcbank/biz/pvpentrustApp/pvpentrustAppBasicInfo',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: '1', // 必传
          // 页签名称
          title: '委托贷款出账申请详情',
          // 传递的业务数据，可选配置
          data: {
            serno: _this.$refs.refTable.selections[0].serno
          }
        });

        this.$router.addTab({
          // 路由名称,菜单路径
          name: 'zrcbank/biz/pvpentrustApp/pvpentrustAppBasicInfo',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: '1', // 必传
          // 页签名称
          title: '委托贷款出账申请详情',
          // 传递的业务数据，可选配置
          data: {
            serno: _this.$refs.refTable.selections[0].serno
          }
        });

        var obj = _this.$refs.refTable.selections[0];
        // this.$router.addTab({
        //   // 路由名称,菜单路径
        //   name: "zrcbank/biz/pvpEntrustApp/pvpEntrustAppBasicInfo",
        //   // 自定义唯一页签key,请统一使用custom_前缀开头
        //   key: "1", // 必传
        //   // 页签名称
        //   title: "委托贷款出账申请详情",
        //   // 传递的业务数据，可选配置
        //   data: {
        //     serno: _this.$refs.refTable.selections[0].serno
        //   }
        // });
        obj['model_group_no'] = 'CMG000656';
        obj['op'] = 'VIEW';
        obj['imageType'] = '2';
        obj['topOutsystemCode'] = _this.topOutsystemCode;
        obj['topOutsystemCodeCopy'] = _this.topOutsystemCodeCopy; // 他项权证影像
        obj['imageCopyParams'] = {
          contid: obj.contNo,
          businessid: obj.pvpSerno,
          docid: obj.pvpSerno
        };
        obj['imageParams'] = {
          contid: obj.contNo,
          businessid: obj.pvpSerno,
          docid: obj.pvpSerno
        };
        // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, obj, () => {
        //   this.$refs.refTable.remoteData();
        // }, true, true);
        let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
        _this.$router.addTab({
          name: path,
          key: obj.pvpSerno + obj.op,
          title: '委托贷款出账申请详情',
          data: obj
        });
        this.$refs.refTable.remoteData();
      });
    },

    /**
     * 详情
     */
    infoFnHis: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refDealTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$nextTick(function () {
        // this.$router.addTab({
        //   // 路由名称,菜单路径
        //   name: "zrcbank/biz/pvpEntrustApp/pvpEntrustAppBasicInfo",
        //   // 自定义唯一页签key,请统一使用custom_前缀开头
        //   key: "1", // 必传
        //   // 页签名称
        //   title: "委托贷款出账申请详情",
        //   // 传递的业务数据，可选配置
        //   data: {
        //     serno: _this.$refs.refDealTable.selections[0].serno
        //   }
        // });
        var obj = _this.$refs.refDealTable.selections[0];
        obj['model_group_no'] = 'CMG000656';
        obj['op'] = 'VIEW';
        obj['imageType'] = '2';
        obj['topOutsystemCode'] = _this.topOutsystemCode;
        obj['topOutsystemCodeCopy'] = _this.topOutsystemCodeCopy; // 他项权证影像
        obj['imageCopyParams'] = {
          contid: obj.contNo,
          businessid: obj.pvpSerno,
          docid: obj.pvpSerno
        };
        obj['imageParams'] = {
          contid: obj.contNo,
          businessid: obj.pvpSerno,
          docid: obj.pvpSerno
        };
        // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, obj, () => {
        //   this.$refs.refDealTable.remoteData();
        // }, true, true);
        let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
        _this.$router.addTab({
          name: path,
          key: obj.pvpSerno + obj.op,
          title: '委托贷款出账申请详情',
          data: obj
        });
        this.$refs.refTable.remoteData();
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus != '000') {
        // _this.$message({ message: '"审批中"状态的申请记录不能进行修改操作！', type: 'warning' });
        _this.$xutils.showMsgBox('提示', '只有"待发起"状态的申请记录不能进行删除操作！', 350, 150);
        return;
      }
      _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/pvpentrustloanapp/delete/' + selections[0].pkId,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({ message: '删除成功', type: 'success' });
                } else {
                  _this.$message({ message: '删除失败', type: 'error' });
                }
              }
            });
          }
        }
      });
    },

    // 作废操作
    invalidFn () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus != '992') {
        // _this.$message({ message: '"审批中"状态的申请记录不能进行修改操作！', type: 'warning' });
        _this.$xutils.showMsgBox('提示', '只有"退回"状态的申请记录才能进行手工作废操作！', 350, 150);
        return;
      }
      _this.$confirm('此操作将永久作废该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/pvpentrustloanapp/invalid',
              data: { pvpSerno: selections[0].pvpSerno },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({ message: '作废成功', type: 'success' });
                } else {
                  _this.$message({
                    message: response.data.rtnMsg,
                    type: 'error'
                  });
                }
              }
            });
          }
        }
      });
    },

    // // 借据打印
    // accloanFn () {
    //   var _this = this;
    //   var selections = _this.$refs.refTable.selections;
    //   if (selections.length < 1) {
    //     _this.$message({ message: '请先选择一条记录', type: 'warning' });
    //     return;
    //   }
    //   yufp.service.request({
    //     method: 'POST',
    //     url: backend.cmisBiz + '/api/pvpentrustloanapp/entrustprint',
    //     data: { serno: selections[0].serno },
    //     callback: function (code, message, response) {
    //       if (code == 0) {
    //         _this.$refs.refTable.remoteData();
    //         _this.$message({ message: '作废成功', type: 'success' });
    //       } else {
    //         _this.$message({
    //           message: response.data.rtnMsg,
    //           type: 'error'
    //         });
    //       }
    //     }
    //   });
    // },

    // 打印借款借据
    accloanFn: function () {
      var _this = this;
      var params = _this.$refs.refTable.selections[0];
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemojkjjwtd';
      debugger;
      params.src = _this.$backend.frptRptService + 'JKJJ_WTDK.cpt&pvpSerno=' + params.pvpSerno + '&contNo=' + params.contNo;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '委托出账借款借据',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    // 打印额度借款支用申请书
    accloanFn2: function () {
      var _this = this;
      var params = _this.$refs.refTable.selections[0];
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      var contPageType = '';// 合同版面标识
      var isESeal = '';// 是否电子用印
      var cptName = '';// 报表名
      const userInfo = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      var paramList = [];
      // 根据合同号获取合同表内的电子用印标识
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrentrustloancont/queryCtrEntrustContDataByMap',
        data: {
          contNo: params.contNo
        },
        callback: function (code, message, response) {
          if (response.code == '0') {
            isESeal = response.data.isESeal;
            if (isESeal !== '0') {
              let managerId = params.managerId;
              let loginCode = userInfo.loginCode;
              if (managerId == loginCode) {
                contPageType = '2';
                cptName = 'EDJKZYSQS_WTDK_p1.cpt';
              } else {
                contPageType = '3';
                cptName = 'EDJKZYSQS_WTDK_p2.cpt';
              }
            } else {
              contPageType = '1';
              cptName = 'EDJKZYSQS_WTDK.cpt';
            }
            // 参数
            paramList = {
              cusId: params.cusId,
              serno: params.pvpSerno,
              contPageType: contPageType,
              cptName: cptName,
              tempName: '额度支用申请书'
            };
            _this.$dialog.open(
              '额度支用申请书打印',
              'printManage/indexPvpPrint',
              800,
              500,
              paramList
            );
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },

    /**
     * 导出操作
     */
    exportFn: function () {
      var _this = this;
      yufp.util.exportExcelByTable({
        fileName: '导出',
        importType: 'service',
        ref: _this.$refs.refTable,
        url: '/trade/example/list'
      });
    },

    handleIconClick: function () {
      // console.log(this.formdata.cusId);
      var data = { cusId: '', instuCde: '' };
      this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleCtrEntrustSelectApp', 1000, 800, data, params => {
        // console.log(params);
        this.formdata.contNo = params.contNo;
        this.formdata.cusId = params.cusId;
        this.formdata.prdId = params.prdId;
        this.formdata.cusName = params.cusName;
        this.formdata.prdName = params.prdName;
        this.formdata.curType = params.curType;
      });
    },

    afterCommitCallBack () {
      this.$refs.refTable.remoteData();
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
