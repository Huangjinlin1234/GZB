<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cobInfo_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /* 小微-合同审请-共同借款人*/
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      // 共同借款人信息列表
      if (this.getFactory().contextData.op == 'VIEW') {
        // 通过查看按钮
        // 隐藏共同借款人按钮
        this.d1_BillList.setBillListButtonVisable('doAddCob', false, 1);
        this.d1_BillList.setBillListButtonVisable('$update', false, 2);
        this.d1_BillList.setBillListButtonVisable('$delete', false, 3);
      }
    },
    doAddCob () {
      this.d1_BillList.dialogFormVisible = true;
      this.d1_BillList.$refs.refForm.resetFields();
    },
    /* 保存按钮*/
    doNextStep () {
      var validate = false, _this = this;
      _this.d1_BillList.$refs.refForm.validate(function (valid) {
        validate = valid;
        valid ? console.log('验证通过') : _this.$message({message: '验证失败', type: 'error'});
      });
      if (!validate) {
        return;
      }
      if (_this.d1_BillList.formdata.cobDataSource == '01') {
        _this.$message({message: '只能修改数据来源为本合同申请单的共借人'});
        return;
      }
      _this.d1_BillList.formdata.surveySerno = this.$route.meta.params.surveySerno;
      _this.d1_BillList.formdata.cobDataSource = '00';
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtcobinfo/saveandupdate',
        data: _this.d1_BillList.formdata
      }).then((res) => {
        if (res.code == 0) {
          // 操作成功
          _this.$message({ message: '保存成功', type: 'success' });
          _this.d1_BillList.$refs.refTable.remoteData();
          _this.d1_BillList.$refs.refForm.resetFields();
          _this.d1_BillList.dialogFormVisible = false;
        } else if (res.code == 9999) {
          _this.$message({ message: res.message, type: 'warning' });
        }
      });
    },
    /** 返回
     */
    cancel () {
      this.d1_BillList.$refs.refForm.resetFields();
      // this.dialogFormVisible = false;
      this.d1_BillList.dialogFormVisible = false;
    },
    // 查询客户
    doselectCob () {
      var _this = this;
      var certType = 'A';
      if (_this.d1_BillList.formdata.commonDebitName == null ||
        _this.d1_BillList.formdata.commonDebitName.toString().length == 0 ||
       _this.d1_BillList.formdata.commonDebitCertCode == null ||
        _this.d1_BillList.formdata.commonDebitCertCode.toString().length == 0) {
        this.$message({message: '请补姓名或证件号码'});
        return;
      }
      var certCode = _this.d1_BillList.formdata.commonDebitCertCode;
      var cusName = _this.d1_BillList.formdata.commonDebitName;
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
            _this.d1_BillList.formdata.cusId = response.data.cusId;
            _this.d1_BillList.formdata.commonDebitName = response.data.cusName;
          } else {
          // 去快速创建
            _this.d1_BillList.visiableCus = true;
            this.$nextTick(function () {
              _this.d1_BillList.dialogData.cusName = cusName;
              _this.d1_BillList.dialogData.certCode = certCode;
              _this.d1_BillList.dialogData.certType = 'A';
            //   };
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
      _this.d1_BillList.$refs.dialogKH.validate(function (valid) {
        validate = valid;
        valid ? console.log('验证通过') : _this.$message({message: '请输入正确的身份证号码', type: 'error'});
      });
      if (!validate) {
        return;
      }
      var rqData = _this.d1_BillList.dialogData;
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindivsocial/createCus',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          // 创建成功之后 把客户编号带过去
          this.$message({message: '创建成功'});
          _this.d1_BillList.formdata.cusId = response.data.cusId;
          _this.d1_BillList.formdata.commonDebitName = response.data.cusName;
          _this.d1_BillList.formdata.commonDebitCertCode = response.data.certCode;
          _this.d1_BillList.visiableCus = false;
        } else {
          this.$message({message: response.message});
        }
      });
    },
    back () {
      this.d1_BillList.dialogKH.resetFields();
      this.visiableCus = false;
    },
    /** 修改
     */
    updateCob () {
      if (this.d1_BillList.$refs.refTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.d1_BillList.dialogFormVisible = true;
      this.$nextTick(function () {
        this.d1_BillList.$refs.refForm.resetFields();
        yufp.clone(this.d1_BillList.$refs.refTable.selections[0], this.d1_BillList.formdata);
      }

      );
    },
    /** 共借人删除 */
    deleteCob () {
      var _this = this;
      if (_this.d1_BillList.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (_this.d1_BillList.$refs.refTable.selections[0].cobDataSource == '01') {
        _this.$message({message: '只能删除数据来源为本合同申请单的共借人'});
        return;
      }
      var data = _this.d1_BillList.$refs.refTable.selections[0];
      data.oprType = '02';
      _this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtcobinfo/saveandupdate',
        data: data
      }).then((res) => {
        // 请求成功
        if (res.data == 1) {
          // 操作成功
          _this.$message({ message: '删除成功', type: 'success' });
          _this.d1_BillList.$refs.refTable.remoteData();
        } else {
          // 操作失败
          _this.$message({ message: '删除失败，请重试  ', type: 'warning' });
        }
      });
    },

    showAction () {}
  }
};
</script>
