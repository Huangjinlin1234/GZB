<template>
  <!--
    @created by wangyouhong
    @updated by 2018-8-16 修改代码规范
    @updated by 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
  <yu-tabs v-model="activeName" @tab-click="handleClick">
   <yu-tab-pane label="破产案件信息详情" name="base">
    <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="190px" :disabled="viewType == 'DETAIL'" v-model="formdata" :rules="formRules" style="text-align: center;">
        <yu-xform-group>
          <yu-xform-item label="破产案件编号" name="caseNo" rules="required"></yu-xform-item>
          <yu-xform-item label="破产公司名称" name="brokeComName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="法院裁定书落款日期" name="courtDcmntsInscribeDate" rules="required"  ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="破产类型" name="brokeType" ctype="select" data-code="STD_BROKE_TYPE" rules="required"></yu-xform-item>
          <yu-xform-item label="破产对象性质" name="brokeObjCha" ctype="select" data-code="STD_BROKE_OBJ_CHA" rules="required"></yu-xform-item>
          <yu-xform-item label="受理法院" name="acceptCourt" rules="required"></yu-xform-item>
          <yu-xform-item label="破产管理人" name="brokeManager" rules="required" ></yu-xform-item>
          <yu-xform-item label="破产管理人联系方式" name="brokeManagerTelNo" ctype="input" rules="required" ></yu-xform-item>

          <yu-xform-item label="代理方式"  name="agcyMode" ctype="select" rules="required" data-code="STD_AGT_MODE" @change="lawyerSelectFn"></yu-xform-item>

          <yu-xform-item label="代理律师姓名" rules="required" name="lawyerName" icon="search" @click.native="openDialog(0)" :hidden="isView == '01' || isView == '02' || isView == ''"></yu-xform-item>
          <yu-xform-item label="律师联系方式" rules="required" name="lawyerTel" ctype="input" :hidden="isView == '01' || isView == '02' || isView == ''"></yu-xform-item>
          <yu-xform-item label="所属律师事务所名称" rules="required" name="lawOfficeName" :hidden="isView == '01' || isView == '02' || isView == ''"></yu-xform-item>

           <yu-xform-item label="内部代理人姓名" rules="required" name="agcyName" icon="search" @click.native="openDialog(1)" :hidden="isView == '03' || isView == ''"></yu-xform-item>
          <yu-xform-item label="内部代理人联系方式" rules="required" name="agcyTelNo" ctype="input" :hidden="isView == '03' || isView == ''"></yu-xform-item>

          <yu-xform-item label="债权申报截止日期" name="claimsDeclareEndDate" rules="required" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="我行申报日期" name="bankDeclareDate" rules="required" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="我行申报债权金额" name="declareClaimsAmt"  rules="required" ctype="yu-num" number-formatter="0,000.00" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="管理人确认我行债权金额" name="cfirmClaimsAmt" rules="required" ctype="yu-num" number-formatter="0,000.00" :disabled="viewType == 'DETAIL'"></yu-xform-item>
          <yu-xform-item label="第一次债权人会议时间" name="firMeetDate" rules="required" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="第二次债权人会议时间" name="secMeetDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="案件进程" name="caseProcess" ctype="select" data-code="STD_BROKE_CASE_PROCESS" rules="required"></yu-xform-item>
          <yu-xform-item label="破产终结裁定书落款日期" name="dcmntsInscribeDate" ctype="datepicker"></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="doSave" v-if="viewType == 'EDIT' || viewType == 'ADD'">保存</yu-button>
          <yu-button  type="primary" @click="doBack">返回</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>
    <yu-panel title="受偿清单" :hideFilter="false" :collapseHide="false">
      <yu-button-drop :hidden="viewType == 'DETAIL'">
        <yu-button type="primary" @click="addFn" >新增</yu-button>
        <yu-button type="primary" @click="deleteFn" >删除</yu-button>
        <yu-button type="primary" @click="saveFn" >保存</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :pageable="false" selection-type="radio"
        :data-url="paymentUrl"  :base-params="baseParams"  @loaded="addFn1" align="center">
        <yu-xtable-column align="center" label="受偿金额(元)" ctype="input" prop="paymentAmt" ></yu-xtable-column>
        <yu-xtable-column align="center" label="受偿日期" ctype="datepicker" prop="paymentDate" ></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="债权类型" prop="claimType" data-code="STD_CLAIM_TYPE" ></yu-xtable-column>
      </yu-xtable>
      <yu-xform ref="refSumForm" v-model="sumFormdata"  style="margin:40px;">
        <yu-xform-group >
          <yu-xform-item label="总受偿金额(元)" name="paymentTotalAmt"  rules="required" disabled></yu-xform-item>
          <yu-xform-item label="受偿比率(%)" name="paymentRate" rules="required" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm1" v-model="baseFormdata">
        <yu-xform-group>
          <yu-xform-item label="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName"  rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
   </yu-tab-pane>
   <yu-tab-pane label="影像资料" name="forth">
      <imageSystem ref="imageSystemRef" authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
   </yu-tab-pane>
  </yu-tabs>
                                      <!-- -------------外聘律所信息弹框----------------- -->
    <yu-dialog title="律师信息" :visible.sync="dialogTableVisible" :min-height="800" center="true">
        <yu-xform v-model="dialogformdata"  related-table-name="dialogtable" form-type="search"  :remove-empty="true">
            <yu-xform-group :column="2">
              <yu-xform-item placeholder="律所名称" label="律所名称" ctype="input" name="lawOfficeName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item placeholder="律师姓名" label="律师姓名" ctype="input" name="lawyerName" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
        </yu-xform>
        <yu-xtable index row-number selection-type="radio" ref="dialogtable" :data-url="dataUrl" request-type="POST" style="width: 100%" condition-key="condition">
              <yu-xtable-column prop="lawOfficeName" label="律所名称"></yu-xtable-column>
              <yu-xtable-column prop="lawyerName" label="律师姓名" ></yu-xtable-column>
              <yu-xtable-column prop="lawyerNo" label="律师编号" ></yu-xtable-column>
              <yu-xtable-column prop="lawyerTelNo" label="联系电话" ></yu-xtable-column>
            </yu-xtable>
        <div class="button-group" style="text-align:center">
            <yu-button type="primary" @click="selectReturn('dialogtable')" >选取</yu-button>
       </div>
    </yu-dialog>
    <!-- 内部员工信息弹框 -->
     <yu-xdialog :visible.sync="visiable" :width="width" title="员工信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="100px" related-table-name="cusTableRefName">
          <yu-xform-group :column="4">
            <yu-xform-item label="员工编号" ctype="input" placeholder="员工编号" name="loginCode"></yu-xform-item>
            <yu-xform-item label="员工名称" ctype="input" placeholder="员工名称" name="userName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="cusTableRefName" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl1" :default-load="true" :base-params="baseParams">
          <yu-xtable-column label="员工所在机构名称" prop="orgName" width="160px"></yu-xtable-column>
          <yu-xtable-column label="员工编号" prop="loginCode" width="150px"></yu-xtable-column>
          <yu-xtable-column label="员工名称" prop="userName" width="150px"></yu-xtable-column>
          <yu-xtable-column label="联系电话" prop="userMobilephone" width="160px" ></yu-xtable-column>
        </yu-xtable>
        <div class="button-group" style="text-align:center">
            <yu-button type="primary" @click="selectReturn('cusTableRefName')" >选取</yu-button>
       </div>
    </yu-xdialog>

  </div>
</template>
<script>

import imageSystem from '@/views/imageManage/imageSystem';
import { validator } from '@/utils/validate';
// 注册字典项
yufp.lookup.reg('STD_BROKE_TYPE,STD_BROKE_OBJ_CHA,STD_AGT_MODE,STD_BROKE_CASE_PROCESS,STD_CLAIM_TYPE');
export default {
  components: {
    imageSystem
  },
  data: function () {
    return {
      // paymentAmt:[
      //   { required: true, message: '必填', trigger: 'blur' }
      // ],
      // paymentDate:[
      //   { required: true, message: '必填', trigger: 'blur' }
      // ],
      // claimType:[
      //   { required: true, message: '必填', trigger: 'blur' }
      // ],
      count: false,
      credata: {},
      isView: '',
      image: '1',
      dialogTableVisible: false,
      visiable: false,
      dialogformdata: {},
      dataUrl: backend.cmisNpam + '/api/plalawyerinfo/queryAll',
      dataUrl1: backend.appOcaService + '/api/adminsmuser/page',
      sumFormdata: {},
      baseParams: {condition: JSON.stringify({ brokeCaseNo: this.$route.meta.params.brokeCaseNo})},
      formdata: {},
      paymentUrl: backend.cmisNpam + '/api/plalawpaymentinfo/',
      baseFormdata: {},
      formRules: { brokeManagerTelNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}],
        lawyerTel: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}],
        agcyTelNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}]
      },
      activeName: 'base',
      viewType: '',
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ01',
          'index': {
            'businessid': this.$route.meta.params.brokeCaseNo
          }
        }
      ]
    };
  },
  watch: {
    'count': function (newValue) {
      this.formdata.lawyerName = this.credata.lawyerName;
      this.formdata.lawyerTel = this.credata.lawyerTel;
      this.formdata.lawOfficeName = this.credata.lawOfficeName;
      this.formdata.agcyName = this.credata.agcyName;
      this.formdata.agcyTelNo = this.credata.agcyTelNo;
    }
  },

  created () {
    const _this = this;
    // 主键，查看修改回显的查询主键
    var brokeCaseNo = _this.$route.meta.params.brokeCaseNo;
    var data = {};
    data.brokeCaseNo = brokeCaseNo;
    _this.viewType = _this.$route.meta.params.viewType;
    if (_this.viewType == 'ADD') {
      _this.isView = true;
    }
    if (_this.viewType == 'DETAIL') {
      _this.image = '2';
    }
    // 发送请求，回显基本信息
    yufp.service.request({
      method: 'POST',
      url: backend.cmisNpam + '/api/plalawbrokecaseinfo/queryPlaLawBrokeCaseInfo',
      data: data,
      callback: function (code, message, response) {
        if (response.code == 0) {
          _this.credata = response.data; // 初始化数据
          yufp.clone(response.data, _this.formdata);
          yufp.clone(response.data, _this.baseFormdata);
        } else {
          _this.$message({
            message: response.message,
            type: 'error'
          });
        }
      }
    });
  },
  methods: {
    handleClick (tab) {
      if (tab.name == 'forth') {
        this.$refs.imageSystemRef.getImageSrc();
      }
    },
    addFn1 (data) {
      var sum = 0;
      for (var i = 0; i < data.length; i++) {
        sum = sum + data[i].paymentAmt;
      }
      if (!sum) {
        this.sumFormdata.paymentRate = '';
      }
      this.sumFormdata.paymentTotalAmt = sum;
      this.sumFormdata.paymentRate = (sum / this.formdata.cfirmClaimsAmt * 100).toFixed(2);
    },

    /*
    保存
     */
    saveFn () {
      var _this = this;
      var modal = {};
      // yufp.clone(_this.formdata, modal);
      yufp.clone(_this.baseFormdata, modal);
      modal.brokeCaseNo = _this.formdata.brokeCaseNo;
      modal.plaLawPaymentInfo = this.$refs.refTable.tabledata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plalawpaymentinfo/batchInsert',
        data: JSON.stringify(modal),
        callback: function (code, message, response) {
          if(code == '0') {
             _this.$message.success('操作成功');
             _this.$refs['refTable'].remoteData();
          } else {
             _this.$message.error(response.message);
          }
        }
      });
    },
    /*
    删除
     */
    deleteFn () {
      var _this = this
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      const brokeCaseNo = selections[0].brokeCaseNo;
      if (brokeCaseNo) {
        const url = this.$backend.cmisNpam + '/api/plalawpaymentinfo/deleteByBrokeCaseNo/' + brokeCaseNo;
        _this.$confirm('是否删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: function (action) {
           if (action === 'confirm') {
              _this.$xutils.request({
              // 同步请求
                async: true,
                url: url,
                type: 'post',
                success: (response, status, xhr) => {
                  if (response.code == 0) {
                    // this.$xutils.showMsgBox('提示', '删除成功！');
                    _this.$refs.refTable.tabledata.splice(selections, 1);
                    _this.saveFn();
                  }
                },
                error: (result, status, errorThrown) => {
                  _this.$xutils.showMsgBox('提示', '操作失败！'); // 弹出提示
                }
              }, _this);
           } else {
             console.log('取消引入')
           }
          }
        })
      }
    },
    // 代理律师的控制方法
    lawyerSelectFn (value) {
      console.log('res类型', value);
      this.isView = value;
      this.formdata.lawyerName = '';
      this.formdata.lawyerTel = '';
      this.formdata.lawOfficeName = '';
      this.formdata.agcyName = '';
      this.formdata.agcyTelNo = '';
      this.count = true;
    },
    /* 弹出框显示： */
    openDialog (info) {
      if (info == 0) {
        this.flag = false;
        this.dialogTableVisible = true;
      } else {
        this.flag = true;
        this.visiable = true;
      }
    },
    /*  选取处理： */
    selectReturn (dialog) {
      var _this = this;
      if (this.$refs[`${dialog}`].selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      };
      if (this.flag == false) {
        this.formdata.lawyerName = this.$refs.dialogtable.selections[0].lawyerName;
        this.formdata.lawyerTel = this.$refs.dialogtable.selections[0].lawyerTelNo;
        this.formdata.lawOfficeName = this.$refs.dialogtable.selections[0].lawOfficeName;
        this.dialogTableVisible = false;
      } else {
        this.formdata.agcyName = this.$refs.cusTableRefName.selections[0].userName;
        this.formdata.agcyTelNo = this.$refs.cusTableRefName.selections[0].userMobilephone;
        this.visiable = false;
      };
    },


    // 添加数据 添加一条空白数据
    addFn: function () {
      var _this = this;
      // var flag = false
      // this.$refs.refTable.validate(function (fields) {
      //   if(!fields){
      //     flag = true;
      //   }
      // });
      // if(flag) {
        let inputDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
        this.$refs.refTable.clearValidateMessage();
        let serno = this.$xutils.getUUID();
        let brokeCaseNo = _this.$route.meta.params.brokeCaseNo;
        let row = {plpiSerno: serno, paymentAmt: '', paymentDate: '', oprSymbol: '', claimType: '', brokeCaseNo: brokeCaseNo, inputDate: inputDate};
        this.$refs.refTable.tabledata.push(row);
        this.$refs.refTable.setCurrentRow(row);
      // }
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 保存
    doSave () {
      var _this = this;
      var back = _this.$route.meta.params.back;
      // 业务类型
      var viewType = _this.$route.meta.params.viewType;
      _this.$refs.refForm.validate(volid => {
        if (!volid) {
          return this.$message.error('请填写必填项');
        };
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plalawbrokecaseinfo/update',
          async: false,
          data: _this.formdata,
          callback: function (code, message, response) {
            if (response.code == 0) {
              _this.$message.success('操作成功');
            } else {
              _this.$message({
                message: response.message,
                type: 'error'
              });
            }
          }
        });
      });
    }
  }
};
</script>
