<template>
<div>
<yu-panel title="非信贷不良资产台账详情" :hideFilter="false" :collapseHide="false">
    <yu-xform v-model="baseFormdata" label-width="140px" ref="refForm" :disabled="disabled">
       <yu-xform-group :column="2">
         <yu-xform-item label="关联流水号" name="pubaalSerno" rules="required" hidden></yu-xform-item>
         <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" rules="required" ctype="input"></yu-xform-item>
         <yu-xform-item label="客户名称" name="cusName" rules="required" ctype="input"></yu-xform-item>
         <yu-xform-item label="交易编号" name="tranId" rules="required" ></yu-xform-item>
         <yu-xform-item label="币种" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP" rules="required" ></yu-xform-item>
         <yu-xform-item label="交易金额(元)" name="tranAmt" rules="required" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
         <yu-xform-item label="投资资产名称" name="investAssetName" rules="required"></yu-xform-item>
         <yu-xform-item label="交易品种名称" name="tranBizName"  rules="required" ></yu-xform-item>
         <yu-xform-item label="交易成交日期" name="tranDealDate" ctype="datepicker" rules="required" ></yu-xform-item>
         <yu-xform-item label="交易到期日期" name="tranEndDate" ctype="datepicker" rules="required"></yu-xform-item>
         <yu-xform-item label="处置方式" name="dispMode"  rules="required"></yu-xform-item>
         <yu-xform-item label="进展描述" name="prgrDec" ctype="textarea" colspan="24"></yu-xform-item>
         <yu-xform-item label="登记人" name="inputIdName" disabled></yu-xform-item>
         <yu-xform-item label="登记机构" name="inputBrIdName" disabled></yu-xform-item>
         <yu-xform-item label="登记日期" name="inputDate" disabled></yu-xform-item>
       </yu-xform-group>
    </yu-xform>
    <div style="text-align:center">
        <yu-button type="primary" @click="doSave" :hidden="viewType=='DETAIL'">保存</yu-button>
        <yu-button type="primary" @click="doBack">返回</yu-button>
    </div>
</yu-panel>
<!--
pop弹框
    <yu-xdialog title="客户信息" :visible.sync="dialogTableVisible" width="1200px">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="公司客户" name="company"></yu-tab-pane>
        <yu-tab-pane label="个人客户" name="person"></yu-tab-pane>
      </yu-tabs>
      <yu-panel :title="title" panel-type="simple">
        <yu-xform ref="refForm" related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px" >
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
         <yu-toolbar>
          <yu-button type="primary" @click="confimBtn">选取</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :pageable="true" :data-url="dataUrl"
         :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP" ></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
          <yu-xtable-column label="客户分类" prop="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-xdialog>-->
</div>
</template>
<script>
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
yufp.lookup.reg(' STD_ZB_CUR_TYP,STD_ZB_CUS_TYP,STD_ZB_CERT_TYP,STD_ZB_CUS_CLS,STD_CUS_STATE');
export default {
  data: function () {
    return {
      dialogTableVisible: false,
      dataUrl: this.$backend.cmisCus + '/api/cusbase/queryCusBaseList',
      searchFormdata: {},
      activeName: 'company',
      title: '公司客户',
      baseParams: {condition: {cusCatalog: '2', roleList: this.$xutils.getLoginUserInfo().roles}},
      baseFormdata: {},
      // flag: true,
      viewType: '',
      disabled: true
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
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
      var pubaalSerno = _this.$route.meta.params.pubaalSerno;// 回显参数
      _this.viewType = _this.$route.meta.params.viewType;// 业务类型
      if (_this.viewType !== 'ADD') {
        // 修改或者查看回显
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plauncretbadassetacclist/showByPubaalSerno',
          data: pubaalSerno,
          callback: function (code, message, response) {
            if (response.code == '0') {
              yufp.clone(response.data, _this.baseFormdata);
            } else {
              _this.$message.error(response.message);
            }
          }
        });
      } else {
        _this.baseFormdata['pubaalSerno'] = pubaalSerno;
      };
      _this.baseFormdata['inputId'] = _this.userId;
      // _this.baseFormdata['inputId'] = _this.userName;
      _this.baseFormdata['inputIdName'] = _this.userName;

      _this.baseFormdata['inputBrId'] = _this.orgCode;
      // _this.baseFormdata['inputBrId'] = _this.orgName;
      _this.baseFormdata['inputBrIdName'] = _this.orgName;
      _this.baseFormdata['inputDate'] = _this.formatTime();

      if (_this.viewType !== 'DETAIL') {
        _this.disabled = false;
      } else {
        _this.disabled = true;
      }
    },
    /* 保存 */
    doSave () {
      var _this = this;
      var validate = false;
      // 表单校验
      _this.$refs.refForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return;
      };
      var dealDate = new Date(_this.baseFormdata.tranDealDate).getTime(); // 交易成交日期
      var endDate = new Date(_this.baseFormdata.tranEndDate).getTime(); // 交易到期日期
      if (dealDate > endDate) {
        _this.$message({ message: '交易到期日期不得小于交易成立日期', type: 'warning' });
        return;
      }
      // 新增保存
      if (_this.viewType == 'ADD') {
        this.$request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plauncretbadassetacclist/insert',
          data: _this.baseFormdata
        }).then(({code, message}) => {
          if (code == '0') {
            _this.$message.success('保存成功');
          } else {
            _this.$message.error(message);
          }
        });
      };
      // 修改保存
      if (_this.viewType == 'EDIT') {
        this.$request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plauncretbadassetacclist/updateByPubaalSerno',
          data: _this.baseFormdata
        }).then(({code, message}) => {
          if (code == '0') {
            _this.$message.success('保存成功');
          } else {
            _this.$message.error(message);
          }
        });
      }
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    /*
     格式化日期
     */
    formatTime () {
      var dt = new Date();
      return dateFormat(dt, '{y}-{m}-{d}');
    },
    /* 弹出pop框 */
    showPop () {
      this.dialogTableVisible = true;
    },
    /* 选取客户数据赋值给表单 */
    confimBtn () {
      this.baseFormdata.cusId = this.$refs.refTable.selections[0].cusId;
      this.baseFormdata.cusName = this.$refs.refTable.selections[0].cusName;
      this.dialogTableVisible = false;
    },
    /* pop框影藏 */
    back () {
      this.dialogTableVisible = false;
    },
    /* tab栏切换处理 */
    handleClick (tab, event) {
      console.log('tab', tab.name);
      var userInfo = this.$xutils.getLoginUserInfo();
      var roleList = userInfo.roles;
      console.log('roleList', roleList);
      if (tab.name == 'company') {
        this.title = '公司客户';
        this.baseParams = {condition: {cusCatalog: '2', roleList: roleList}};
      }
      if (tab.name == 'person') {
        this.title = '个人客户';
        this.baseParams = {condition: {cusCatalog: '1', roleList: roleList}};
      }
    }

  }
};


</script>
