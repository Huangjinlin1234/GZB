<template>
  <div>
    <yu-panel title="交易对手信息" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onAdd" @click="selectDataByModel">刷新</yu-button>
          <yu-button ref="btn_onAdd" @click="onAdd" v-if="lookPage">新增</yu-button>
          <yu-button ref="btn_onDelete" @click="onDelete" v-if="lookPage">删除</yu-button>
          <yu-button ref="btn_onUpdate" @click="onUpdate" v-if="lookPage">修改</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable1" request-type="POST"  :base-params="baseParams" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="业务主键号" prop="bizSerno" v-if="show"></yu-xtable-column>
        <yu-xtable-column label="是否线上" prop="isOnline" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="交易对手账号" prop="toppAcctNo"></yu-xtable-column>
        <yu-xtable-column label="交易对手名称" prop="toppName"></yu-xtable-column>
        <yu-xtable-column label="交易对手金额" prop="toppAmt"></yu-xtable-column>
        <yu-xtable-column label="是否本行账户" prop="isBankAcct" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="开户行行号" prop="acctsvcrNo"></yu-xtable-column>
        <yu-xtable-column label="开户行名称" prop="acctsvcrName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog title="提示"  size="tiny" :visible.sync="dialogVisible">

    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="业务主键号" ctype="input" placeholder="业务主键号" name="bizSerno" rules="required" disabled :colspan="24" hidden></yu-xform-item>
          <yu-xform-item label="业务场景" ctype="input" placeholder="业务场景" name="bizSence" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="是否本行账户" ctype="select" name="isBankAcct" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否本行账户" :colspan="24" @change="isBankAcctOnChange" ></yu-xform-item>
          <yu-xform-item label="是否线上" ctype="select" name="isOnline" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否线上" :colspan="24" hidden></yu-xform-item>
          <yu-xform-item label="交易对手账号" ctype="input" placeholder="交易对手账号" name="toppAcctNo" rules="required" :colspan="24" :hidden="isOnlineFlg"></yu-xform-item>
            <yu-xform-item label="交易对手账号" rules="required" placeholder="交易对手账号" name="toppAcctNo" ctype="input" :hidden="!isOnlineFlg"  suffix-icon="el-icon-search" :colspan="24"  @suffix-click="searchToppAcctNo" > </yu-xform-item>
          <yu-xform-item label="交易对手名称" ctype="input" placeholder="交易对手名称" name="toppName" rules="required" :disabled="isOnlineFlg" :colspan="24"></yu-xform-item>
          <yu-xform-item label="交易对手金额" ctype="input" placeholder="交易对手金额" name="toppAmt" rules="required" :colspan="24"></yu-xform-item>

          <yu-xform-item label="开户行行号" ctype="input" placeholder="开户行行号" name="acctsvcrNo" rules="required" :hidden="formdata.isBankAcct == 1" :colspan="24"></yu-xform-item>
          <yu-xform-item label="开户行名称" ctype="input" placeholder="开户行名称" name="acctsvcrName" rules="required" :hidden="formdata.isBankAcct == 1" :colspan="24"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden :colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="savedata" v-norepeat.loading>确定</yu-button>
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>

</yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formdata: {},
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/toppacctsub/selectbymodel',
      baseParams: {condition: { oprType: '01'}},
      deleteUrl: this.$backend.cmisBiz + '/api/toppacctsub/delete/',
      lookPage: false,
      isOnlineFlg: false
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      try {
        if (this.$route.meta.params.PageType != null && this.$route.meta.params.PageType != 'LOOK') {
          this.lookPage = true;
        }
      } catch (e) {
      }
      if (this.bizPageData != null) {
        // 这个时候判断是从审批流进来的  直接查数据就行了
        // 单页面 跳审批的时候 是这个
        // 审批走单一页面
        this.baseParams = {condition: {bizSerno: this.bizPageData.instanceInfo.bizId, oprType: '01'}};
      } else if (this.$route.params.hasOwnProperty('pvpSerno')) {
        // 走路由
        this.baseParams = {condition: {bizSerno: this.$route.meta.params.pvpSerno, oprType: '01'}};
      } else {
        // 走审批模版工厂
        this.baseParams = {condition: {bizSerno: this.getFactory().bizPageData.instanceInfo.bizId, oprType: '01'}};
      }
    },
    selectDataByModel () {
      this.$refs.refTable1.remoteData();
    },
    onAdd () {
      this.dialogVisible = true;

      let params = {
        bizSerno: this.$route.meta.params.pvpSerno
      };
      this.formdata.bizSerno = this.$route.meta.params.pvpSerno;
      this.$nextTick(function () {
        this.$refs.refForm.resetFields();
        yufp.clone(params, this.formdata);
      });
    },
    onDelete () {
      const params = this.$refs.refTable1.selections[0];
      if (params == null) {
        this.$message({message: '必须选择一条记录进行操作'});
        return;
      }
      this.$xutils.showConfirmBox('提示', '是否确认删除？', 350, 150, confirmFlag => {
        if (confirmFlag) {
          // 调用后端的删除逻辑，删除相关的关系表数据
          this.$xutils.request({
            // 同步请求
            async: false,
            url: this.$backend.cmisBiz + '/api/toppacctsub/deleteByPkId',
            data: params,
            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.$message({message: '删除成功', type: 'success' });

                // 列表刷新
                this.$refs.refTable1.remoteData();
              } else {
                this.$message({message: response.message});
              }
            },

            error: (result, b) => {
              this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
            }
          });
        }
      });
    },
    onUpdate () {
      // console.log(this);
      if (this.$refs.refTable1.selections.length != 1) {
        this.$message({message: '必须选择一条记录进行操作'});

        return;
      }
      let params = this.$refs.refTable1.selections[0];
      this.dialogVisible = true;
      this.$nextTick(function () {
        yufp.clone(params, this.formdata);
      });
    },
    savedata () {
      // 先暂时不做校验
      var validate = false, _this = this;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
        valid ? true : _this.$message({message: '请补全数据', type: 'error'});
      });
      if (!validate) {
        return;
      }
      var index = this.formdata.toppName.indexOf('基金');
      // 校验 交易对手名称不能带有基金
      if (index != -1) {
        this.$message({message: '交易对手名称不能含有基金等字段'});
        return;
      }
      // 如果是本行账户，默认赋值张家港农商银行
      if (this.formdata.isBankAcct == '1') {
        this.formdata.acctsvcrNo = 'C1115632000023';
        this.formdata.acctsvcrName = '张家港农商银行';
      }
      this.formdata.isOnline == '1';
      // 保存方法
      if (this.formdata.pkId == null || this.formdata.pkId == '') {
        // 插入
        this.formdata.oprType = '01';
        this.formdata.pkId = null;
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/toppacctsub/insert',
          data: this.formdata
        }).then(({code, message, data}) => {
          if (code == 0) {
            if (data != null) {
              this.$message({message: '保存成功', type: 'success'});
              this.dialogVisible = false;
              this.$refs.refForm.resetFields();
              this.selectDataByModel();
            } else {
              this.$message({message: '出了点小差错,请关闭页签重试', type: 'warning'});
            }
          }
        });
      } else {
        // 修改

        // 插入
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/toppacctsub/update',
          data: this.formdata
        }).then(({code, message, data}) => {
          if (code == 0) {
            if (data == 1) {
              this.$message({message: '保存成功', type: 'success'});
              this.dialogVisible = false;
              this.$refs.refForm.resetFields();
              this.selectDataByModel();
            } else {
              this.$message({message: '出了点小差错,请关闭页签重试', type: 'warning'});
            }
          }
        });
      };
    },
    // 是否本行账户 做控制
    isBankAcctOnChange (isBankAcct) {
      if (isBankAcct == '1') {
      // 是本行账户的时候 查询数据 反显
        this.isOnlineFlg = true;
        this.formdata.toppName = '';
      } else {
        // 不是本行账户的时候 手输
        this.isOnlineFlg = false;
      }
    },
    /** 交易对手账号查询 searchToppAcctNo */
    searchToppAcctNo () {
      if (this.formdata.toppAcctNo == '' || this.formdata.toppAcctNo == null) {
        this.$message({message: '交易对手账号不可为空！', type: 'warning'});
        return;
      }

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/opanorgname',
        data: {loanPayoutAccno: this.formdata.toppAcctNo}
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data != null) {
            if (data.zhhuztai == 'A') {
              // 子序号
              this.formdata.toppName = data.zhhuzwmc;
              // this.formdata.toppAcctNo = data.zhaoxhao;
            } else {
              this.$message({message: '该账户状态非 正常状态 ,不可使用此账户', type: 'warning'});
            }
          } else {
            this.$message({message: '未查询到相关数据', type: 'warning'});
          }
        } else {
          this.$message({message: '未查询到客户信息', type: 'warning'});
        }
      });
    },


    cancel () {
      this.$refs.refForm.resetFields();
      this.dialogVisible = false;
    }

  }
};
</script>