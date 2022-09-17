<template>
  <div>
    <yu-panel title="授信批复分项明细" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-toolbar>
          <yu-button type="primary" @click="addSub">新增分项</yu-button>
        </yu-toolbar>
      </template>
      <yu-xtable :data="lmtAppSubList" style="width: 100%;margin-bottom: 20px;" row-key="subPrdSerno" border
                 :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false">
        <yu-xtable-column prop="subPrdSerno" label="授信分项流水号" sortable width="220"></yu-xtable-column>
        <yu-xtable-column prop="pkId" label="主键" sortable hide-column></yu-xtable-column>
        <yu-xtable-column prop="origiLmtAccSubPrdNo" label="授信分项额度编号" sortable width="180"></yu-xtable-column>
        <yu-xtable-column prop="lmyBizTypeName" label="授信品种" sortable width="180"></yu-xtable-column>
        <yu-xtable-column prop="isRevolvLimit" label="是否循环额度"></yu-xtable-column>
        <yu-xtable-column prop="isPreLmt" label="是否预授信额度"></yu-xtable-column>
        <yu-xtable-column prop="guarMode" label="担保方式"></yu-xtable-column>
        <yu-xtable-column prop="origiLmtAccSubPrdAmt" label="原授信额度"></yu-xtable-column>
        <yu-xtable-column prop="lmtAmt" label="变更后授信额度"></yu-xtable-column>
        <yu-xtable-column prop="origiLmtAccSubPrdTerm" label="原额度期限（月）"></yu-xtable-column>
        <yu-xtable-column prop="lmtTerm" label="变更后额度期限（月）"></yu-xtable-column>
        <yu-xtable-column prop="chgFlag" label="变更标识"></yu-xtable-column>
        <yu-xtable-column prop="todo" label="操作" width="100">
          <template slot-scope="scope">
            <a class="underline" @click="editSub(scope.row)">修改</a>
            <a class="underline" @click="viewSub(scope.row)">查看</a>
          </template>
        </yu-xtable-column>
      </yu-xtable>
      <yu-xdialog title="授信分项新增" :visible.sync="dialogVisibleSelected" width="800px">
            <yu-xform ref="subForm" label-width="160px" v-model="formdata">
              <yu-xform-group column="2">
                <yu-xform-item label="客户编号" rules="required" ctype="input" name="cusId" disabled colspan="10"></yu-xform-item>
                <yu-xform-item label="客户名称" rules="required" ctype="input" name="cusName" disabled colspan="10"></yu-xform-item>
                <yu-xform-item label="授信额度(元)" rules="required" ctype="yu-currency" name="lmtAmt" :min="0" colspan="10"></yu-xform-item>
                <yu-xform-item label="担保方式" rules="required" ctype="select" name="guarMode" data-code="STD_ZB_ASSURE_MEANS" colspan="10"></yu-xform-item>
                <yu-xform-item label="是否预授信额度" rules="required" ctype="select" name="isPreLmt" data-code="STD_ZB_YES_NO" colspan="10"></yu-xform-item>
                <yu-xform-item label="主键" ctype="input" name="pkId" hidden></yu-xform-item>
                <yu-xform-item label="分项流水号" ctype="input" name="subSerno" hidden></yu-xform-item>
                <yu-xform-item label="分项名称" ctype="input" name="subName" hidden></yu-xform-item>
                <yu-xform-item label="流水号" ctype="input" name="serno" hidden></yu-xform-item>
                <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" hidden></yu-xform-item>
                <yu-xform-item label="预授信品种编号" ctype="input" name="preLmtBizType" hidden></yu-xform-item>
                <yu-xform-item label="授信期限" ctype="input" name="lmtTerm" hidden></yu-xform-item>
                <yu-xform-item label="原额度分项编号" ctype="input" name="origiLmtAccSubNo" hidden></yu-xform-item>
                <yu-xform-item label="原额度分项金额" ctype="input" name="origiLmtAccSubAmt" hidden></yu-xform-item>
                <yu-xform-item label="原额度分项期限" ctype="input" name="origiLmtAccSubTerm" hidden></yu-xform-item>
                <yu-xform-item label="操作类型" ctype="input" name="oprType" hidden></yu-xform-item>
                <yu-xform-item label="登记人" ctype="input" name="inputId" hidden></yu-xform-item>
                <yu-xform-item label="登记机构" ctype="input" name="inputBrId" hidden></yu-xform-item>
                <yu-xform-item label="登记日期" ctype="input" name="inputDate" hidden></yu-xform-item>
                <yu-xform-item label="最近修改人" ctype="input" name="updId" hidden></yu-xform-item>
                <yu-xform-item label="最近修改机构" ctype="input" name="updBrId" hidden></yu-xform-item>
                <yu-xform-item label="最近修改日期" ctype="input" name="updDate" hidden></yu-xform-item>
                <yu-xform-item label="创建时间" ctype="input" name="createTime" hidden></yu-xform-item>
                <yu-xform-item label="修改时间" ctype="input" name="updateTime" hidden></yu-xform-item>
              </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button @click="onNextStep">下一步</yu-button>
              <yu-button @click="cancelFn">取消</yu-button>
            </div>
            </yu-xform>
          </yu-xdialog>
    </yu-panel>
  </div>

</template>

<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';

export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      lmtAppSubList: [],
      formDisabled: false,
      dialogVisibleSelected: false,
      formdata: {},
      tempData: {}
    };
  },
  mounted () {
    this.getSubAndPrd(this.getFactory().contextData.serno);
    this.tempData.cusId = this.getFactory().contextData[0].cusId;
    this.tempData.cusName = this.getFactory().contextData[0].cusName;
    this.tempData.serno = this.getFactory().contextData[0].serno;
  },
  methods: {
    addFn: function () {
      var _this = this;
      _this.dialogVisible = true;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreply/getchangeablereplyno',
        callback: function (code, message, response) {
          _this.replies = response.data.lmtReplies;
        }
      });
    },
    getSubAndPrd: function (serno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappsub/getsubandprd',
        data: serno,
        callback: function (code, message, response) {
          _this.lmtAppSubList = response.data.subList;
        }
      });
    },
    addSub: function () {
      var _this = this;
      _this.dialogVisibleSelected = true;
      this.$nextTick(function () {
        yufp.extend(this.formdata, this.tempData);
      });
    },

    /**
      *修改分项信息
      */
    editSub: function (data) {
      data['model_group_no'] = 'CMG000696';
      data['op'] = 'EDIT';
      data['disAble'] = false;
      data['subSerno'] = data.subPrdSerno;
      data['guarModel'] = data.guarMode;
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1200,
        600,
        data,
        null,
        true,
        true
      );
    },
    /**
      *查看分项信息
      */
    viewSub: function (data) {
      data['model_group_no'] = 'CMG000696';
      data['op'] = 'VIEW';
      data['subSerno'] = data.subPrdSerno;
      data['disAble'] = true;
      data['disAble'] = true;
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1200,
        600,
        data,
        null,
        true,
        true
      );
    },
    // 点击下一步，后台新增授信分项信息,并进入分项详情页面
    onNextStep () {
      const jsoPar = this.formdata;
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtappsub/savelmtappsub',
        data: jsoPar,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.rtnData = response.data;
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (JSON.stringify(this.rtnData) == '{}') {
        return;
      }
      if (this.rtnData.rtnCode != '0000') {
        this.$xutils.showMsgBox('提示', '错误代码：' + this.rtnData.rtnCode + '；错误信息：' + this.rtnData.rtnMsg); // 弹出提示
        return;
      }
      this.$message('保存成功');
      jsoPar['model_group_no'] = 'CMG000696';
      jsoPar['op'] = 'ADD';
      jsoPar['flag'] = 'add';
      jsoPar['subSerno'] = this.rtnData.subSerno;
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        null,
        true,
        true
      );
    }
  }
};
</script>
