<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="isFormDisabled">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" disabled data-code="STD_CONT_TYPE" placeholder="合同类型"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
             <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewCusDataByCusId')">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled colspan="24"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>
            <yu-xform-item label="产品类型属性" ctype="select" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP" placeholder="产品类型属性" :colspan="12"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="签发类型" ctype="select" name="signissueType" rules="required" placeholder="签发类型" disabled data-code="STD_SIGNISSUE_TYPE"></yu-xform-item>
            <yu-xform-item label="是否电子票据" ctype="select" name="isEDrft" data-code="STD_ZB_YES_NO" placeholder="是否电子票据" rules="required" v-if="isEDrftShow"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押" rules="required"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" data-code="STD_ZB_YES_NO" placeholder="是否电子用印" rules="required"></yu-xform-item>
            <yu-xform-item label="是否续签合同" ctype="select" name="isRenew" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否续签合同"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled id="origi"  v-if="ocnHidden"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="合同信息" :hideFilter="false" :collapseHide="false">
          <div v-show="formdata.guarMode == '40'||formdata.guarMode == '21'||formdata.guarMode == '60'">
            <div id="heartMsg"><yu-col :offset="3">温馨提示：该合同金额为敞口金额!</yu-col></div>
          </div>
          <yu-xform-group :column="2">
            <yu-xform-item label="合同币种" ctype="select" name="curType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="合同币种" disabled></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-num" number-formatter="0,000.00" name="contAmt" rules="required" placeholder="合同金额" :min="0" @blur="changeAmt"></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="yu-num" number-formatter="0,000.00" name="contHighAvlAmt" rules="required" placeholder="本合同项下最高可用信金额" :min="0"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同起始日"  @change="termChange"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同到期日"  @change="termChange"></yu-xform-item>
            <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate" value-format="yyyy-MM-dd" placeholder="纸质合同签订日期"></yu-xform-item>
            <yu-xform-item label="保证金比例（%）" ctype="yu-num" sign="%" :multiple="100" placeholder="保证金比例（%）" name="bailPerc" :rules="{ required: isBail, message: '字段不能为空' }" @blur="changeAmt"></yu-xform-item>
            <yu-xform-item label="保证金金额" ctype="yu-num" number-formatter="0,000.00" placeholder="保证金金额" name="bailAmt" :rules="{ required: isBail, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="手续费率（‰）" ctype="yu-num" sign="‰" :multiple="1000" placeholder="手续费率（‰）" name="chrgRate" rules="required" @blur="changeAmt"></yu-xform-item>
            <yu-xform-item label="手续费金额" ctype="yu-num" number-formatter="0,000.00" placeholder="手续费金额" name="chrgAmt" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="保证金信息" :hideFilter="false" :collapseHide="false" v-if="contTypeSign">
          <yu-toolbar>
            <yu-button @click="addFn" :hidden="isHidden">新增</yu-button>
            <yu-button @click="deleteFn" :hidden="isHidden">删除</yu-button>
            <yu-button @click="saveFn" :hidden="isHidden">保存</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number border :data="bailaccinfo" :pageable="false">
            <yu-xtable-column label="保证金账号" prop="bailAccNo" ctype="input" icon="search" :triger-click="false" :on-icon-click="initBail" :data="bailAccNoData"></yu-xtable-column>
            <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSub"></yu-xtable-column>
            <yu-xtable-column label="开户行号" prop="acctsvcrName"></yu-xtable-column>
            <yu-xtable-column label="保证金计息方式" prop="bailInterestMode" ctype="select" data-code="STD_BAIL_INTEREST_MODE" :disabled="isDisabled"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <!--<div :hidden="isPanelHidden">
          <yu-panel title="承兑行信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group :column="2">
              <yu-xform-item label="承兑行类型" ctype="select" name="aorgType" placeholder="承兑行类型"  data-code="STD_AORG_TYPE" disabled></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="承兑行行号" ctype="input" placeholder="承兑行行号" name="aorgNo" :rules="{ required: !isPanelHidden, message: '字段不能为空' }">
                <yu-input v-model="customTitle"></yu-input>
              </yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="get" >
                <yu-button type="primary" @click="getAccpOrg">选择</yu-button>
              </yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="承兑行名称" ctype="input" placeholder="承兑行名称" name="aorgName" :rules="{ required: !isPanelHidden, message: '字段不能为空' }"></yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="出票人开户行账号" ctype="input" placeholder="出票人开户行账号" name="daorgNo" :rules="{ required: !isPanelHidden, message: '字段不能为空' }">
                <yu-input v-model="customTitle"></yu-input>
              </yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="get" >
                <yu-button type="primary" @click="getAccpDaorg">选择</yu-button>
              </yu-xform-item>
            </yu-xform-group>
            <yu-xform-group :column="2">
              <yu-xform-item label="出票人开户户名" ctype="input" placeholder="出票人开户户名" name="daorgName" :rules="{ required: !isPanelHidden, message: '字段不能为空' }"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </div>-->
        <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度"></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" :rules="{ required: isLmtAccNoRequired, message: '字段不能为空' }" disabled></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" :rules="{ required: isReplyNoRequired, message: '字段不能为空' }" disabled>
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewReplyNo')">查看</yu-button>
            </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他约定" ctype="textarea" name="otherAgreed" placeholder="其他约定"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman" rules="required"></yu-xform-item>
            <yu-xform-item label="电话" ctype="input" placeholder="电话" name="phone" rules="required"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email"></yu-xform-item>
            <yu-xform-item label="QQ" ctype="input" placeholder="QQ" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="deliveryAddr" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="债项信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="债项等级" ctype="input" placeholder="债项等级" name="debtLevel" disabled></yu-xform-item>
            <yu-xform-item label="违约风险暴露EAD" ctype="" name="ead" disabled placeholder="违约风险暴露EAD"></yu-xform-item>
            <yu-xform-item label="违约损失率LGD" ctype="" name="lgd" disabled placeholder="违约损失率LGD"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="isShowButton">
          <yu-button type="primary" @click="customClick('tempSave')">暂存</yu-button>
          <yu-button type="primary" @click="customClick('save')">保存</yu-button>
          <yu-button type="primary" @click="customClick('commit')">提交</yu-button>
          <yu-button type="primary" @click="customClick('back')">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
// 注册字典项
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_SIGNISSUE_TYPE,STD_CONT_TYPE,STD_BAIL_INTEREST_MODE,STD_ZB_YES_NO,STD_PRD_TYPE_PROP');
import mixinForm from '@/utils/mixins/mixin-form';
import mixinList from '@/utils/mixins/mixin-list';
import { validator } from '@/utils/validate';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default {
  name: 'D1ABillCard',
  mixins: [mixinForm, mixinList],
  components: { cfgAssistantTip },
  data: function () {
    return {
      serno: '',
      ocnHidden: true,
      bizType: '01',
      updateUrl: this.$backend.cmisBiz + '/api/iqpaccpapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpaccpapp/',
      formdata: {},
      formRules: { phone: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}], email: [{validator: validator.email, message: '不是正确的邮件格式', trigger: 'blur'}] },
      formType: 'edit',
      isOlPldHidden: true,
      isOlPldRequired: false,
      imageUrls: {},
      File: {},
      prdCode: '',
      isShow: false,
      bailaccinfo: [],
      isBail: true,
      isPanelHidden: false,
      isLmtAccNoRequired: true,
      isReplyNoRequired: true,
      contTypeSign: true,
      isShowButton: true,
      tableParams: {},
      isFormDisabled: false,
      isEDrftShow: true
    };
  },
  mounted () {
    var _this = this;
    let data = {};
    var serno = '';
    var op = '';
    // 进入初始化
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
      op = 'VIEW';
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
      serno = data.biz_serno;
      op = data.op;
    } else {
      data = _this._this.getFactory().contextData;
      serno = data.biz_serno;
      op = data.op;
    }
    _this.serno = serno;
    _this.op = op;
    if (_this.op == 'VIEW' || _this.op == 'view') {
      this.isHidden = true;
      this.isShowButton = false;
      this.isFormDisabled = true;
    }
    this.tableParams = { serno: _this.serno };
    this.getAllBailData(this.tableParams);
  },
  methods: {
    getAllBailData: function (tableParams) {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/bailaccinfo/getList/',
        data: tableParams,
        callback: function (code, message, response) {
          _this.bailaccinfo = response.data || [];
        }
      });
    },
    // 选取保证金
    initBail: function (value) {
      var _this = this;
      let jsoPar = _this.$refs.refTable.selections[0];
      let serno = _this.getFactory().contextData.serno;
      let zhshuxin = '';
      if (!jsoPar.bailAccNo) {
        _this.$message({
          message: '请先输入保证金帐号！',
          type: 'warning'
        });
        return;
      }
      var data = { bailAccNo: jsoPar.bailAccNo, zhshuxin: zhshuxin };
      this.$dialog.open('', 'zrcbank/biz/common/commonBailSelect', 1000, 800, data, params => {
        _this.$refs.refTable.selections[0].bailAccNoSub = params.bailAccNoSub;
        _this.$refs.refTable.selections[0].acctsvcrName = params.acctsvcrName;
      });
    },

    termChange (value) { // 校验合同期限
      let startDate = this.formdata.startDate;
      let endDate = this.formdata.endDate;

      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate < startDate) {
        this.$xutils.showMsgBox('提示', '合同到期日：' + endDate + '需大于合同起始日：' + startDate); // 弹出提示
        this.formdata.startDate = '';
        this.formdata.endDate = '';
        return;
      }
    },

    changeAmt (amt) {
      // 担保方式
      let guarMode = this.formdata.guarMode;
      // 全额保证金时，手续费金额= 合同金额 * 手续费率；担保方式为其他时，手续费金额 = (合同金额/(1-保证金比例))* 手续费率
      // 保证金金额=（合同金额/1-保证金比例）* 保证金比例；其中：合同金额/(1-保证金比例)  = 合同总金额（含风险敞口金额+保证金金额）
      if (guarMode == '40') {
        // 手续费金额
        this.formdata.chrgAmt = this.formdata.contAmt * this.formdata.chrgRate;
        // 保证金金额
        this.formdata.bailAmt = this.formdata.contAmt * this.formdata.bailPerc;
      } else {
        if (guarMode == '21') {
          // 如果是低风险
          if (this.formdata.bailPerc > 100) {
            this.$xutils.showMsgBox('提示', '非全额保证担保方式，保证金比例不得大于100'); // 弹出提示
            this.formdata.bailPerc = 0;
          }
        } else {
          if (this.formdata.bailPerc >= 100) {
            this.$xutils.showMsgBox('提示', '非全额保证担保方式，保证金比例不得大于等于100'); // 弹出提示
            this.formdata.bailPerc = 0;
          }
        }
        if (this.formdata.bailPerc == '100.00') {
          // 手续费金额
          this.formdata.chrgAmt = this.formdata.contAmt * this.formdata.chrgRate;
          // 保证金金额
          this.formdata.bailAmt = this.formdata.contAmt * this.formdata.bailPerc;
        } else {
          this.formdata.chrgAmt = this.formdata.contAmt / (1 - this.formdata.bailPerc) * this.formdata.chrgRate;
          // 保证金金额
          this.formdata.bailAmt = this.formdata.contAmt / (1 - this.formdata.bailPerc) * this.formdata.bailPerc;
        }
      }
    },
    // 展示小助手
    show () {
      this.prdCode = this.formdata.prdId;
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    },

    getAccpOrg () {
      let jsoPar = this.formdata;
      // var _this = this;
      // let managerBrId = jsoPar.managerBrId;
      // if (managerBrId == null || managerBrId == '') {
      //   _this.$xutils.showMsgBox('提示', '责任机构不能为空!\r\n请重新操作!', 350, 150);
      //   return;
      // }

      let aorgNo = jsoPar.aorgNo;
      // if (aorgNo == null || aorgNo == '') {
      //   _this.$xutils.showMsgBox('提示', '承兑行行号不能为空!\r\n请重新操作!', 350, 150);
      //   return;
      // }

      var data = { aorgNo: aorgNo };
      this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleSorgAccpSelectApp', 1000, 800, data, params => {
        // console.log(params);
        this.$refs.refForm.formdata.aorgNo = params.bankNo;
        this.$refs.refForm.formdata.aorgName = params.bankName;
      });
    },
    // 选取开票人账户
    getAccpDaorg: function () {
      var _this = this;
      let jsoPar = this.formdata;
      if (!jsoPar.daorgNo) {
        _this.$message({
          message: '请先输入结算帐号！',
          type: 'warning'
        });
        return;
      }
      var data = { acctNo: jsoPar.daorgNo };
      this.$dialog.open('', 'zrcbank/biz/common/commonEndAccount', 1000, 800, data, params => {
        this.$refs.refForm.formdata.daorgNo = params.kehuzhao;
        this.$refs.refForm.formdata.daorgName = params.zhhuzwmc;
      });
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.bailaccinfo.push({
        serno: _this.serno
      });
    },

    // 保存
    saveFn: function () {
      var _this = this;
      var data = _this.$refs.refTable.tabledata;
      for (let i = 0; i < data.length; i++) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/bailaccinfo/savebailaccinfo',
          data: data[i],
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.data.rtnCode == '000000') {
                if (i == data.length - 1) {
                  _this.$message({ message: '保存成功', type: 'success' });
                  _this.getAllBailData(_this.tableParams);
                }
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
      }
    },

    // 删除
    deleteFn: function () {
      var _this = this;
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      var row = selections[0];
      row.oprType = '02';
      if (!row.pkId) {
        _this.bailaccinfo.splice(selections, 1);
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/bailaccinfo/batchdelete/' + row.pkId,
          callback: function (code, message, response) {
            if (code == 0) {
              _this.bailaccinfo.splice(selections, 1);
              _this.$message({ message: '删除成功！', type: 'success' });
              _this.getAllBailData(_this.tableParams);
            } else {
              _this.$message({ message: '删除失败！', type: 'error' });
            }
          }
        });
      }
    }
  }
};
</script>
