<template>
  <div>
    <yu-panel title="共同借款人" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
     <!--     <yu-button ref="btn_addCob" @click="customClick('addCob')">新增</yu-button>
          <yu-button ref="btn_$update" @click="customClick('updateCob')">修改</yu-button> -->
           <yu-button type="primary" ref="btn_addCob" @click="addCob" v-if="lookPage">新增</yu-button>
          <yu-button type="primary" ref="btn_$update" @click="updateCob" v-if="lookPage">修改</yu-button>
          <yu-button type="primary" ref="btn_$delete" @click="deleteCob" v-if="lookPage">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick"  :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="共借人客户编号" prop="cusId" width="150" disabled>
          <template slot-scope="scope">
            <a class="underline" @click="lookCobPage(scope.row)">{{ scope.row.cusId }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="共借人姓名" prop="commonDebitName"></yu-xtable-column>
        <yu-xtable-column label="共借人证件号码" prop="commonDebitCertCode"></yu-xtable-column>
        <yu-xtable-column label="共借人手机" prop="commonDebitPhone"></yu-xtable-column>
        <yu-xtable-column label="共借人地址" prop="commonDebitAddr"></yu-xtable-column>
        <yu-xtable-column label="共借人关系" prop="commonDebitCorre" data-code="STD_ZB_SELFPER_REL_TYP"></yu-xtable-column>
      </yu-xtable>

    </yu-panel>
      <yu-xdialog title="共借人信息" :visible.sync="dialogFormVisible">
      <div ref="sadsd">

      <yu-xform ref="refForm" label-width="140px" :form-type="formType" v-model="formdata" :rules="formRules" >
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>

          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="共借人客户编号" ctype="input" placeholder="共借人客户编号" name="cusId" rules="required" disabled></yu-xform-item>

          <yu-xform-item label="共借人姓名" ctype="input" placeholder="共借人姓名" name="commonDebitName" rules="required"></yu-xform-item>
          <yu-xform-item label="共借人证件号码" ctype="input" placeholder="共借人证件号码" name="commonDebitCertCode" rules="required"></yu-xform-item>
          <yu-xform-item label="" ctype="yu-button" name="Button1" label-width="1" @click="doselectCob">查询</yu-xform-item>
          <yu-xform-item label="共借人手机" ctype="input" placeholder="共借人手机" name="commonDebitPhone" rules="required"></yu-xform-item>
          <yu-xform-item label="共借人关系" ctype="select" name="commonDebitCorre" rules="required" data-code="STD_ZB_SELFPER_REL_TYP" placeholder="共借人关系"></yu-xform-item>
          <yu-xform-item label="共借人地址" ctype="textarea" name="commonDebitAddr" placeholder="共借人地址" :colspan="24"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>

        </yu-xform-group>
      </yu-xform>

    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary"  @click="doNextStep" v-norepeat.loading>保存</yu-button>
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>
    </div></yu-xdialog>
<yu-xdialog title="共借人信息详情" :visible.sync="dialogFormVisible2">
      <div ref="sadsd">

      <yu-xform ref="refForm2" label-width="140px" form-type="details" v-model="formdata2"  >
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="共借人客户编号" ctype="input" placeholder="共借人客户编号" name="cusId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="共借人姓名" ctype="input" placeholder="共借人姓名" name="commonDebitName" rules="required"></yu-xform-item>
          <yu-xform-item label="共借人证件号码" ctype="input" placeholder="共借人证件号码" name="commonDebitCertCode" rules="required"></yu-xform-item>
          <yu-xform-item label="共借人手机" ctype="input" placeholder="共借人手机" name="commonDebitPhone" rules="required"></yu-xform-item>
          <yu-xform-item label="共借人关系" ctype="select" name="commonDebitCorre" rules="required" data-code="STD_ZB_SELFPER_REL_TYP" placeholder="共借人关系"></yu-xform-item>
          <yu-xform-item label="共借人地址" ctype="textarea" name="commonDebitAddr" placeholder="共借人地址" :colspan="24"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>

        </yu-xform-group>
      </yu-xform>
    </div></yu-xdialog>

      <!--  <yu-xdialog title="个人客户创建" :visible.sync="dialogCus">
      <yu-xform ref="cusForm" label-width="120px" :form-type="formType" v-model="cusdata" :rules="cusRules" >
          <yu-xform-group :column="1" style="text-aglin:center;padding:0 20%">
            <yu-xform-item label="客户分类" ctype="select" rules="required" data-code="STD_ZB_CUS_CLS"  disabled placeholder="客户分类" name="cusRankCls" ></yu-xform-item>
            <yu-xform-item label="证件类型 " ctype="select" rules="required" data-code="STD_ZB_CERT_TYP"  disabled placeholder="证件类型 " name="certType" ></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled rules="required"></yu-xform-item>

            <yu-xform-item label="开户日期" ctype="input" placeholder="开户日期" name="openDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" rules="required" disabled data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType"></yu-xform-item>
          </yu-xform-group>

      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doNext">创建</yu-button>
      <yu-button type="primary" @click="doBack">返回</yu-button>
    </yu-form-buttons>
    </yu-xdialog> -->
     <yu-xdialog :visible.sync="visiableCus" width="500px" title="个人客户快捷创建">
        <yu-xform v-model="dialogData" ref="dialogKH" label-width="120px" related-table-name="refTable" :rules="dialogFormRules" >
          <yu-xform-group :column="1">
            <yu-xform-item label="证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"   disabled></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
            <yu-xform-item label="姓名" ctype="input" placeholder="姓名" name="cusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div style="text-align:center;">
          <el-button type="primary" @click="creat" size="small">创建</el-button>
          <el-button type="primary" @click="back" size="small">返回</el-button>
        </div>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import { validator } from '@/utils/validate';
export default {
  name: 'D1ABillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'edit',
      dataUrl: this.$backend.cmisBiz + '/api/lmtcobinfo/selectbymodel',
      baseParams: {condition: {cobDataSource: '00', oprType: '01', surveySerno: this.surveySerno}},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtcobinfo/delete/',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formdata: {},
      formdata2: {},
      dialogCus: false,
      cusdata: {},
      lookPage: false,
      visiableCus: false,
      formRules: {
        commonDebitPhone: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}],
        commonDebitCertCode: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}]
      },
      dialogData: {},
      dialogFormRules: {
        certCode: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}]

      },
      surveySerno: ''
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {


    afterInit () {
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
        this.baseParams.condition.surveySerno = this.surveySerno;
        this.$refs.refTable.remoteData();
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
        this.baseParams.condition.surveySerno = this.surveySerno;
        this.$refs.refTable.remoteData();
      }


      if (this.$route.meta.params.PageType != null && this.$route.meta.params.PageType != '01') {
        this.lookPage = true;
      }
    },
    addCob () {
      this.dialogFormVisible = true;
      var serno = this.$route.meta.params.surveySerno;


      this.$nextTick(function () {
        this.$refs.refForm.resetFields();
        this.formdata.surveySerno = serno;
      });
    },
    updateCob () {
      if (this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      this.dialogFormVisible = true;

      this.$nextTick(function () {
        this.$refs.refForm.resetFields();
        yufp.clone(this.$refs.refTable.selections[0], this.formdata);
      }

      );
    },
    lookCobPage (data) {
      this.dialogFormVisible2 = true;
      this.$nextTick(function () {
        this.$refs.refForm2.resetFields();
        yufp.clone(data, this.formdata2);
      });
    },

    /* 保存按钮*/
    doNextStep () {
      var validate = false, _this = this;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
        valid ? true : _this.$message({message: '验证失败', type: 'error'});
      });
      if (!validate) {
        return;
      }
      // if (!this.formdata.oprType) {
      // this.formdata.oprType = '01';
      // }
      this.formdata.cobDataSource = '00';
      this.formdata.commonDebitCertType = 'A';
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtcobinfo/saveandupdatehxd',
        data: this.formdata
      }).then((res) => {
        // 请求成功
        if (res.data == 1) {
          // 操作成功
          this.$message({ message: '保存成功', type: 'success' });
          this.$refs.refTable.remoteData();
          this.$refs.refForm.resetFields();
          this.dialogFormVisible = false;
        } else {
          // 操作失败
          this.$message({ message: '保存失败，请重试  ', type: 'warning' });
        }
      });
    },
    deleteCob () {
      if (this.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var data = this.$refs.refTable.selections[0];
      data.oprType = '02';
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtcobinfo/deletehxd',
        data: data
      }).then((res) => {
        // 请求成功
        if (res.data == 1) {
          // 操作成功
          this.$message({ message: '删除成功', type: 'success' });
          this.$refs.refTable.remoteData();
        } else {
          // 操作失败
          this.$message({ message: '删除失败，请重试  ', type: 'warning' });
        }
      });
    },
    cancel () {
      this.$refs.refForm.resetFields();
      this.dialogFormVisible = false;
    },

    // 证件类型选择校验
    ChangeCertType: function (certType) {
      // 身份证校验

      // this.dialogFormRules.certCode = [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}];
    },
    // 查询客户
    doselectCob () {
      // 校验
      if (this.formdata.commonDebitName == null ||
        this.formdata.commonDebitName.toString().length == 0 ||
       this.formdata.commonDebitCertCode == null ||
        this.formdata.commonDebitCertCode.toString().length == 0) {
        this.$message({message: '请补全共借人姓名或证件号码'});
        return;
      }
      // 2021年5月29日22:00:01  修改
      var certType = 'A';
      var certCode = this.formdata.commonDebitCertCode;
      var cusName = this.formdata.commonDebitName;
      if (!certType || !certCode) {
        this.$message({message: '请先填写：证件号码、证件类型！'});
        return;
      }
      var rqData = {};
      rqData['certType'] = certType;
      rqData['certCode'] = certCode;
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindivsocial/getCusMsg',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          if (response.data) {
            // yufp.extend(this.formdata, response.data);
            this.formdata.cusId = response.data.cusId;
            this.formdata.commonDebitName = response.data.cusName;
          } else {
          // 去快速创建
            this.visiableCus = true;

            this.$nextTick(function () {
            //   this.dialogData = {
              this.dialogData.cusName = cusName;
              this.dialogData.certCode = this.formdata.commonDebitCertCode;
              this.dialogData.certType = 'A';
            //   };
            });


            // yufp.clone({certType: 'A', certCode: certCode}, this.dialogData);
          }
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });


      // 取后台查询客户 如果无 则弹出新的创建框
      // this.$request({
      //   method: 'POST',
      //   url: backend.cmisCus + '/api/cusbase/queryCusInfo',
      //   data: this.formdata.commonDebitCertCode
      // }).then((data) => {
      //   // 请求成功
      //   if (data.cusId != null) {
      //     // 操作成功
      //     this.formdata.commonDebitName = data.cusName;
      //     this.formdata.cusId = data.cusId;

      //     this.$message({ message: '查询到配偶客户编号为' + data.cusId, type: 'success' });
      //     // this.$refs.refTable.remoteData();
      //   } else {
      //     // 操作失败
      //     this.$message({ message: '没有查询到该客户，进行快速创建', type: 'warning' });
      //     this.dialogCus = true;
      //     this.$nextTick(function () {
      //       this.addCubData();
      //     });
      //     // this.$refs.refForm.resetFields();
      //     // this.$refs.refTable.remoteData();
      //   }
      // });
    },

    creat () {
      var validate = false, _this = this;
      _this.$refs.dialogKH.validate(function (valid) {
        validate = valid;
        valid ? true : _this.$message({message: '请输入正确的身份证号码', type: 'error'});
      });
      if (!validate) {
        return;
      }


      var rqData = this.dialogData;
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindivsocial/createCus',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          // 创建成功之后 把客户编号带过去
          this.$message({message: '创建成功'});
          this.formdata.cusId = response.data.cusId;
          this.formdata.commonDebitName = response.data.cusName;
          this.formdata.commonDebitCertCode = response.data.certCode;
          this.visiableCus = false;
        } else {
          this.$message({message: response.message});
        }
      });
    },
    back () {
      this.$refs.dialogKH.resetFields();
      this.visiableCus = false;
    },

    addCubData () {
      // this.$nextTick(function () {
      // Required request body is missing: protected cn.com.yusys.yusp.commons.module.adapter.web.rest.ResultDto<cn.com.yusys.yusp.dto.CusIndivDto> cn.com.yusys.yusp.web.rest.CusIndivResource.sendEcif(cn.com.yusys.yusp.dto.CusIndivDto)
      // 临时客户
      this.cusdata.cusRankCls = '02';
      // 证件类型
      this.cusdata.certType = 'A';
      // 姓名
      this.cusdata.cusName = this.formdata.commonDebitName;
      // 证件号
      this.cusdata.certCode = this.formdata.commonDebitCertCode;
      // 业务类型
      this.cusdata.bizType = 'B02';
      // });
    },
    doBack () {
      this.$refs.cusForm.resetFields();
      this.dialogCus = false;
    },
    doNext () {
      this.$request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusindiv/sendEcif',
        data: this.cusdata
      }).then(({data}) => {
        // 请求成功
        if (data.cusId != null) {
          // 操作成功
          this.$message({message: '创建成功,客户编号为' + data.cusId, type: 'success'});
          this.formdata.cusId = data.cusId;
          this.$refs.cusForm.resetFields();
          this.dialogCus = false;
        } else {
          // 操作失败
          this.$message({ message: '创建失败，请重试', type: 'warning' });
          this.$refs.cusForm.resetFields();
          this.dialogCus = false;
        }
      });
    }
  }
};
</script>