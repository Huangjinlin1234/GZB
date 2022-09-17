<template>
  <div>
    <div id="d1_BillCard">
      <div id="d1_BillCardContent">
        <yu-panel title="基本信息"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm1" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
            <yu-xform-group :column="2">
              <yu-xform-item label="业务流水号" rules="required" name="serno" ctype="input"  disabled></yu-xform-item>
              <yu-xform-item label="权证出入库申请类型" placeholder="请选择" rules="required" name="warrantAppType" ctype="select" data-code="STD_WARRANT_APP_TYPE" disabled></yu-xform-item>
              <!-- <yu-xform-item label="押品编号" rules="required" name="guarNo" ctype="input" disabled></yu-xform-item> -->
              <yu-xform-item label="抵质押分类" placeholder="抵质押分类" name="grtFlag" ctype="select" data-code="STD_GRT_FLAG" disabled ></yu-xform-item>
              <!-- <yu-xform-item label="押品所有权人编号" rules="required" name="guarCusId"  ctype="input" hidden></yu-xform-item> -->
              <!-- <yu-xform-item label="押品所有权人" rules="required" name="guarCusName"  ctype="input" disabled></yu-xform-item> -->
              <yu-xform-item label="核心担保编号" rules="required" name="coreGuarantyNo"  ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="权证入库模式" placeholder="请选择" rules="required" ctype="select"  name="warrantInType"  data-code="STD_WARRANT_IN_TYPE" disabled></yu-xform-item>
              <yu-xform-item label="权证编号" rules="required" name="warrantNo" ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="权证出库原因大类" placeholder="请选择" rules="required" name="warrantOutType" ctype="select" hidden></yu-xform-item>
              <yu-xform-item label="权证出库原因细类" placeholder="请选择" rules="required" name="warrantOutTypeSub" ctype="select" hidden></yu-xform-item>
              <yu-xform-item label="是否出库到集中作业" placeholder="请选择" rules="required" name="isZhblzx" ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="权证预计归还时间"  rules="required" name="preBackDate" ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="请选择" rules="required" name="approveStatus"  ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="核心抵质押品出入库返回交易流水" rules="required" name="hxSerno" ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="核心抵质押品出入库返回交易日期" rules="required" name="hxDate" ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="核心担保品序号" rules="required" name="coreGuarantySeq"  ctype="select" hidden></yu-xform-item>
              <yu-xform-item label="担保合同编号"  name="guarContNo" ctype="input" rules="required" disabled></yu-xform-item>
              <yu-xform-item label="抵质押物类型"  name="gagTyp" ctype="select" rules="required" data-code="STD_ZB_GUAR_TYPE_CD" @change="onChangeGagTyp"  :datacode-filter="datacodeFilterFn"></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="1">
              <yu-xform-item label="备注" placeholder="备注" name="remark" ctype="textarea" ></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="权证信息" :hideFilter="false" :collapseHide="false" v-if="quanzhengShow">
          <yu-xform ref="refForm2" label-width="120px" :form-type="formType" v-model="formdata2">
            <yu-xform-group :column="2">
              <yu-xform-item label="权证编号" rules="required" name="warrantNo" ctype="input" :label-suffix="warrantNoMsg"></yu-xform-item>
              <yu-xform-item label="权证名称" rules="required" name="warrantName" ctype="input" ></yu-xform-item>
              <yu-xform-item label="权证类别" placeholder="请选择"  rules="required" name="certiCatalog" data-code="STD_ZB_CERTI_CATALOG" ctype="select"></yu-xform-item>
              <yu-xform-item label="权证类型" placeholder="请选择"  rules="required" name="certiTypeCd" data-code="STD_ZB_CERTI_TYPE_CD" ctype="select"></yu-xform-item>
              <yu-xform-item label="权证发证机关" rules="required" name="certiOrgName" ctype="input"></yu-xform-item>
              <yu-xform-item label="权证登记日期" rules="required" name="warrantInputDate" ctype="datepicker" value-format="yyyy-MM-dd"></yu-xform-item>
              <yu-xform-item label="权证发证日期" rules="required" name="certiStartDate" ctype="datepicker" value-format="yyyy-MM-dd"></yu-xform-item>
              <yu-xform-item label="权证到期日期" rules="required" name="certiEndDate" ctype="datepicker" value-format="yyyy-MM-dd"></yu-xform-item>
              <yu-xform-item label="权利价值" rules="required" name="certiAmt" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
              <yu-xform-item label="是否集中作业打印" placeholder="请选择" rules="required" name="isFocusWorkPrint" @change="isPrintFn" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>
              <yu-xform-item label="权利凭证号"  name="certiRecordId" ctype="input" :rules="isRequired"></yu-xform-item>
              <yu-xform-item label="账务机构" name="finaBrId" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="是否电子权证" placeholder="请选择" rules="required" name="isEWarrant" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>
              <yu-xform-item label="权证状态"  name="certiState" ctype="input" hidden></yu-xform-item>
              <yu-xform-item label="证明权利或事项" rules="required" name="proCertiItem" data-code="STD_ZB_PRO_CERTI_ITEM" ctype="select"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="押品信息" :hideFilter="false" :collapseHide="false">
          <yu-xtable ref="refTable" :data="tableData" request-type="POST" row-number condition-key="condition" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="true" :default-load="false">
            <yu-xtable-column label="押品统一编号" prop="guarNo" >
              <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewGuar(scope.row.guarNo)">{{ scope.row.guarNo }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="抵质押标识" prop="grtFlag" data-code="STD_GRT_FLAG"></yu-xtable-column>
            <yu-xtable-column label="担保分类名称" prop="guarTypeCd" :formatter="guarTypeCdFormatter"></yu-xtable-column>
            <yu-xtable-column label="抵质押物名称" prop="pldimnMemo"></yu-xtable-column>
            <yu-xtable-column label="所有权人" prop="guarCusName"></yu-xtable-column>
            <yu-xtable-column label="押品评估价值" prop="evalAmt"></yu-xtable-column>
            <yu-xtable-column label="担保分类代码" prop="guarTypeCd" hide-column></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm3" label-width="120px" :form-type="formType" v-model="formdata3">
            <yu-xform-group :column="2">
              <yu-xform-item  label="登记人"  rules="required" name="inputId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="登记人"  rules="required" name="inputIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item  label="登记机构"  rules="required" name="inputBrId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="登记机构"  rules="required" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item  label="登记日期"  rules="required" name="inputDate" ctype="input" disabled></yu-xform-item>
              <yu-xform-item  label="最近修改人"  rules="required" name="updId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="最近修改机构"  rules="required" name="updBrId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="最后修改日期"  rules="required" name="updDate" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="操作类型"  rules="required" name="oprType" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="创建时间"  rules="required" name="createTime" ctype="datepicker" hidden></yu-xform-item>
              <yu-xform-item  label="主管客户经理"  rules="required" name="managerId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="主管客户经理"  rules="required" name="managerIdName" ctype="input" disabled></yu-xform-item>
              <yu-xform-item  label="主管机构"  rules="required" name="managerBrId" ctype="input" hidden></yu-xform-item>
              <yu-xform-item  label="主管机构"  rules="required" name="managerBrIdName" ctype="input" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </div>
    </div>
    <guarBaseInfoView ref="guarBaseInfoView"></guarBaseInfoView>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import guarBaseInfoView from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoView';
yufp.lookup.reg('STD_WARRANT_IN_TYPE,STD_ZB_APPR_STATUS,STD_CERTI_CATALOG,STD_CERTI_TYPE_CD,STD_ZB_YES_NO,STD_ZB_GUAR_TYPE_CD');
export default{
  components: {guarBaseInfoView},
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      warrantNoMsg: '',
      tableData: [],
      quanzhengShow: true,
      formdata: {},
      formdata2: {},
      formdata3: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      pkField: 'serno',
      baseParams: {},
      baseDYParams: {},
      // warrantNoRequired: [{
      //   required: true,
      //   message: '权证编号不能有中文！',
      //   validator: validator.numberAndLetter
      // }],
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
      DZDataObject: {},
      isRequired: false,
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      if (!(this.formdata.hasOwnProperty('serno') && this.formdata.serno != '' && this.formdata.serno != null)) {
        this.formdata.serno = this.$xutils.getSEQWithParamFromServer('SERNO');
      }
      this.formdata.coreGuarantyNo = this.$xutils.getSEQWithParamFromServer('YP_SERNO');
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      var orgId = this.$xutils.getDefaultformulaData('$LoginOrgCode');

      if (orgId.substring(0, 2) == '80') {
        //寿光村镇，账务机构默认800100--寿光村镇银行营业部
        this.formdata.finaBrId = '800100'
      } else if (orgId.substring(0, 2) == '81') {
        //东海村镇，账务机构默认810100--东海村镇银行营业部
        this.formdata.finaBrId = '810100'; 
      } else {
        this.formdata.finaBrId = orgId;
      }

      this.formdata2.certiState = '01';// 待入库
      this.formdata3.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata3.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata3.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata3.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata3.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata3.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata3.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata3.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata3.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata3.managerIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata3.managerBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
    },
    // 抵质押物类型切换
    onChangeGagTyp (value) {
      // 如果类型为存单则权证编号后面提示 *如果质押品为存单，押品权证编号应该录入质押的存单帐号
      // 如果类型为本行理财产品，则权证编号后面提示 *质押品类型为本行理财质押，请输入委托流水号
      if (value == '17') {
        this.warrantNoMsg = '(*如果质押品为存单，押品权证编号应该录入质押的存单帐号) ';
      } else if (value == '28') {
        this.warrantNoMsg = '(*质押品类型为本行理财质押，请输入委托流水号)';
      } else {
        this.warrantNoMsg = '';
      }
    },
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      if (typeof this.$parent.params != 'undefined') {
        if (this.$parent.params.grtFlag == '01') {
          return opts.filter(function (op) {
          // 担保合同是抵押，抵质押物类型要过滤掉质押的
            if (op.key != '06' && op.key != '46' && op.key != '18' && op.key != '13' && op.key != '26' && op.key != '11' && op.key != '14' && op.key != '12') {
              return true;
            }
            return false;
          });
        } else {
          return opts.filter(function (op) {
            return true;
          });
        }
      } else {
        return opts.filter(function (op) {
          return true;
        });
      }
    },
    guarTypeCdFormatter (row, column, cellValue) {
      if (cellValue && this.DZData.length > 0) {
        if (Object.prototype.hasOwnProperty.call(this.DZDataObject, cellValue)) {
          return this.DZDataObject[cellValue];
        }
        const node = this.findTreeNode(this.DZData, cellValue);
        if (node) {
          this.DZDataObject[cellValue] = node.label;
          return node.label;
        }
        return cellValue;
      }
      return cellValue;
    },
    findTreeNode (tree, id) {
      if (tree.length > 0) {
        let node;
        for (let i = 0; i < tree.length; i++) {
          const element = tree[i];
          if (element.id == id) {
            return element;
          }
          if (element.children && element.children.length > 0) {
            node = this.findTreeNode(element.children, id);
            if (node) {
              return node;
            }
          }
        }
      }
    },
    isPrintFn () {
      if(this.formdata2.isFocusWorkPrint && this.formdata2.isFocusWorkPrint === '1') {
        this.isRequired = [{
          required: true,
          message: '必填项',
        }];
      } else {
        this.isRequired = false
      }
    },
    viewGuar: function (data) {
      this.$refs.guarBaseInfoView.guarBaseinfoView(data);
    }
  },
  created () {
    this.$request({
      url: this.$backend.cmisCfg + '/api/adminsmtreedic/tree',
      method: 'post',
      async: false,
      data: {
        optType: 'STD_DZY_TYPE',
        root: ''
      }
    }).then(res => {
      if (res.code == '0') {
        this.DZData = [];
        this.$utils.clone(res.data.data, this.DZData);
        console.log("res.data------------->", res.data);
      }
    });
  }
};
</script>