<template>
  <div>
    <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
  </div>
</template>
<script>
import d1ABillcard from './noRepayGuaranteeUpdatePage_d1_A_BillCard.vue';
import d1BBilllist from './noRepayGuaranteeUpdatePage_d1_B_BillList.vue';
yufp.lookup.reg('STD_LAND_CHA');
export default {
  components: {d1ABillcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      card: null,
      list: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 无还本续贷-抵押物新增修改界面 */
    afterInit () {
      this.card = this.$refs.d1_A_BillCard;
      this.list = this.$refs.d1_B_BillList;
      const surveySerno = this.pageParams.surveySerno; // 调查流水号
      const PageType = this.pageParams.PageType; // 页面展示逻辑判断
      const surveyType = this.pageParams.surveyType; // 是否为无还本续贷-展示勘验列表
      // 根据流水号查询表单信息
      if (PageType == '01') { // 查看逻辑
        const pkId = this.pageParams.pkId;
        this.getData(pkId);
        this.list.baseParams = {condition: { pldimnNo: pkId}, sort: 'createTime desc'};
        if (surveyType == '7' || surveyType == '14') {
          this.list.hiddenFlg = true;
          this.list.inspectData = {condition: { cloudEvalNo: pkId}};
        }
      } else if (PageType == '02') { // 新增逻辑
        this.card.formType = 'edit';
        const pkId = this.$xutils.getSEQWithParamFromServer('PK_VALUE');
        this.card.setBillCardItemValue('pkId', pkId);
        this.card.setBillCardItemValue('surveySerno', surveySerno);
        this.card.isView = false;
        this.list.isView = false;
        if (surveyType == '7' || surveyType == '14') {
          this.list.hiddenFlg = true;
          this.list.inspectData = {condition: { cloudEvalNo: pkId}};
        }
      } else if (PageType == '03') { // 修改逻辑
        this.card.formType = 'edit';
        const pkId = this.pageParams.pkId;
        this.getData(pkId);
        this.list.baseParams = {condition: { pldimnNo: pkId}, sort: 'createTime desc'};
        this.card.isView = false;
        this.list.isView = false;
        if (surveyType == '7' || surveyType == '14') {
          this.list.hiddenFlg = true;
          this.list.inspectData = {condition: { cloudEvalNo: pkId}};
        }
      }
      this.card.addEditChangeAction(this.onChange);
    },

    showAction () {},

    // 共有人新增按钮
    add () {
      const surveySerno = this.pageParams.surveySerno;
      const pkId = this.card.formdata.pkId;
      this.$dialog.open(
        '共有人信息录入',
        'xwmanage/lmtmanage/indgtLMT/norepayinfo/noRepayGuaranteeOwnerInfoIndex',
        600,
        300,
        {
          pkId,
          surveySerno
        },
        () => {
          this.card.queryDataByCondition('surveySerno = ' + surveySerno);
          this.list.queryDataByCondition('pldimnNo = ' + pkId);
        }
      );
    },

    /* 保存按钮*/
    save () {
      var _this = this;
      const saveFlag = this.card.getBillCardValue();
      if (!saveFlag) {
        return;
      }
      var validate = false;
      this.card.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({ message: '尚有必输项未录入！', type: 'warning' });
        return;
      }
      _this.$request({
        url: _this.$backend.cmisBiz + '/api/lmtguareinfo/saveguareinfogu',
        method: 'post',
        data: _this.card.formdata
      }).then((response) => {
        if (response.code === '0') {
          _this.$message({ message: '保存成功', type: 'success' });
          _this.$dialog.close(this.dialogId);
        } else {
          _this.$message({message: response.message, type: 'warning'});
        }
      });
    },
    /* 勘验信息选取返回 - 》 无还本续贷*/
    selectReturnData () {
      var _this = this;
      var saveData = _this.list.$refs.refTable3.selections;
      if (saveData.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      saveData[0].surveySerno = this.card.formdata.surveySerno;
      saveData[0].cloudEvalNo = this.card.formdata.pkId;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtinspectinfo/update',
        data: saveData[0],
        callback: function (code, message, response) {
          _this.list.$refs.refInspectTable.remoteData();
        }
      });
      this.list.dialogTableVisible = false;
    },
    onChange (thisCard, itemKey, oldValue, newValue) {
      if (itemKey == 'isLevel1Sdr') {
        if (newValue == '1') {
          this.card.setBillCardItemRequired('sdr_name', true);
          this.card.setBillCardItemRequired('sdr_addr_name', true);
        } else {
          this.card.setBillCardItemRequired('sdr_name', false);
          this.card.setBillCardItemRequired('sdr_addr_name', false);
        }
      }
    },
    // 查询客户
    selectCusInfo () {
      var _this = this;
      var certType = 'A';
      if (_this.card.formdata.owner == null ||
        _this.card.formdata.owner.toString().length == 0 ||
       _this.card.formdata.ownerCertNo == null ||
        _this.card.formdata.ownerCertNo.toString().length == 0) {
        this.$message({message: '请补所有权人或所有权人证件号码'});
        return;
      }
      var certCode = _this.card.formdata.ownerCertNo;
      var cusName = _this.card.formdata.owner;
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
            _this.card.formdata.ownerCusNo = response.data.cusId;
            _this.card.formdata.owner = response.data.cusName;
          } else {
          // 去快速创建
            _this.card.visiableCus = true;
            this.$nextTick(function () {
              _this.card.dialogData.cusName = cusName;
              _this.card.dialogData.certCode = certCode;
              _this.card.dialogData.certType = 'A';
            });
          }
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },

    /** 快捷创建
     */
    creat () {
      var validate = false, _this = this;
      _this.card.$refs.dialogKH.validate(function (valid) {
        validate = valid;
        valid ? console.log('验证通过') : _this.$message({message: '请输入正确的身份证号码', type: 'error'});
      });
      if (!validate) {
        return;
      }
      var rqData = _this.card.dialogData;
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindivsocial/createCus',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          // 创建成功之后 把客户编号带过去
          this.$message({message: '创建成功', type: 'success'});
          _this.card.formdata.ownerCusNo = response.data.cusId;
          _this.card.formdata.owner = response.data.cusName;
          _this.card.formdata.ownerCertNo = response.data.certCode;
          _this.card.visiableCus = false;
        } else {
          this.$message({message: response.message, type: 'warning'});
        }
      });
    },

    /* 返回按钮 */
    back () {
      this.card.dialogKH.resetFields();
      this.visiableCus = false;
    },

    /* 修改和查看时，载入页面数据 */
    getData (pkId) {
      var _this = this;
      this.$request({
        url: this.$backend.cmisBiz + '/api/lmtguareinfo/selectbypkid',
        method: 'post',
        data: {pkId: pkId}
      }).then((response) => {
        if (response.code === '0') {
          yufp.clone(response.data, _this.card.formdata);
          this.$nextTick(function () {
            _this.card.formdata.pldimnRate = response.data.pldimnRate;
          });
        }
      });
    },
    /* 勘验信息删除 - 》 无还本续贷*/
    deleteInspect () {
      var _this = this;
      var saveData = _this.list.$refs.refInspectTable.selections;
      if (saveData.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      saveData[0].cloudEvalNo = '';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtinspectinfo/update',
        data: saveData[0],
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '删除成功', type: 'success' });
            _this.list.$refs.refInspectTable.remoteData();
          } else {
            _this.$message({ message: '删除失败', type: 'warning' });
          }
        }
      });
    },
    /* 删除共有人信息 */
    deletebypkid () {
      var _this = this;
      var saveData = _this.list.$refs.refTable.selections;
      if (saveData.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtguarecommenownerinfo/deletebypkid',
        data: saveData[0],
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '删除成功', type: 'success' });
            _this.list.$refs.refTable.remoteData();
          } else {
            _this.$message({ message: '删除失败', type: 'warning' });
          }
        }
      });
    }
  }
};
</script>
