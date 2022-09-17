<template>
  <div>
    <div>
      <d1-a-billcard ref="d1_A_BillCard" :operate="operate"></d1-a-billcard>
    </div>
    <div>
      <div>
        <div>
          <yu-panel title="压降事项说明" panel-type="simple">
            <yu-toolBar>
                <yu-button ref="btn_insert" v-if="operate!='details'" @click="add">新增</yu-button>
                <yu-button ref="btn_deleted" v-if="operate!='details'"  @click="deleted">删除</yu-button>
            </yu-toolBar>
            <yu-xtable ref="refTable" row-number selection-type="radio" condition-key="condition" request-type="post" :data-url="dataUrl"  :pageable="false" :default-load="false">
              <yu-xtable-column label="主键" prop="serno" hide-column></yu-xtable-column>
              <yu-xtable-column label="名单流水号" prop="listSerno" hide-column></yu-xtable-column>
              <yu-xtable-column ctype="input" label="压降事项" prop="pressureDropItem" ></yu-xtable-column>
              <yu-xtable-column ctype="yu-num" label="压降金额(万元)" prop="pressureDropAmt"></yu-xtable-column>
              <yu-xtable-column ctype="datepicker" label="压降要求完成时间" prop="pressureDropFinishTime" ></yu-xtable-column>
              <yu-xtable-column label="实际压降金额(万元)" prop="actPdoAmt" hide-column></yu-xtable-column>
              <yu-xtable-column label="压降实际完成时间" prop="actPdoFinshDate" hide-column></yu-xtable-column>
              <yu-xtable-column label="压降落实情况说明" prop="pdoActCaseMemo" hide-column></yu-xtable-column>
              <yu-xtable-column label="操作类型" prop="oprType" hide-column></yu-xtable-column>
              <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
              <yu-xtable-column label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
              <yu-xtable-column label="登记日期" prop="inputDate" hide-column></yu-xtable-column>
              <yu-xtable-column label="最近修改人" prop="updId" hide-column></yu-xtable-column>
              <yu-xtable-column label="最近修改机构" prop="updBrId" hide-column></yu-xtable-column>
              <yu-xtable-column label="最近修改日期" prop="updDate" hide-column></yu-xtable-column>
              <yu-xtable-column label="创建时间" prop="createTime" hide-column></yu-xtable-column>
              <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
        </div>
        <div style="display:flex;justify-content:center;margin-top:15px;">
          <yu-button type="primary" v-if="operate!='details'" @click="tempSave">暂存</yu-button>
          <yu-button type="primary" v-if="operate!='details'" @click="save">提交</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './dedkkhInfoAdd_d1_A_BillCard.vue';
/**
 大额贷款客户名单新增页面
 */
export default {
  components: {d1ABillcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      operate: '',
      param: {},
      listSerno: '',
      dataUrl: this.$backend.cmisCus + '/api/cuslstdedkkhyjsx/querylistdatabylistserno',
      opType: ''
    };
  },
  mounted () {
    this.operate = this.pageParams.op;
    this.param = this.pageParams;
    this.afterInit();
    this.opType = this.pageParams.opType;
  },
  methods: {
    afterInit () {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      // 登录信息
      // setItemValue('inputId', userInfo.loginCode);// 登记人
      // this.d1_A_BillCard.setItemValue('inputBrId', userInfo.orgCode);// 登记机构
      // this.d1_A_BillCard.setItemValue('inputDate', date);// 登记日期
      if (this.operate != 'add') {
        this.listSerno = this.param.listSerno;
        this.d1_A_BillCard.setBillCardValue(this.param);
        this.reloadListData();
      } else {
        let date = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());// 获取当前时间
        let userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
        this.listSerno = this.$xutils.getSEQWithParamFromServer('LIST_SERNO');// 获取名单流水号
        this.d1_A_BillCard.formdata.inputId = userInfo.loginCode;
        this.d1_A_BillCard.formdata.inputIdName = userInfo.userName;

        this.d1_A_BillCard.formdata.inputBrId = userInfo.orgCode;
        this.d1_A_BillCard.formdata.inputBrIdName = userInfo.org.name;

        this.d1_A_BillCard.formdata.inputDate = date;
        this.d1_A_BillCard.formdata.listSerno = this.listSerno;
        // this.d1_A_BillCard.setItemValue('listSerno', this.listSerno);// 登记机构

        //获取客户号及客户名称并通过api获取管护机构及管护客户经理
        this.d1_A_BillCard.formdata.cusId = this.pageParams.cusId;
        this.d1_A_BillCard.formdata.cusName = this.pageParams.cusName;
        this.d1_A_BillCard.formdata.managerId = this.pageParams.managerId;
        this.d1_A_BillCard.formdata.managerIdName = this.pageParams.managerIdName;
        this.d1_A_BillCard.formdata.belgOrg = this.pageParams.managerBrId;
        this.d1_A_BillCard.formdata.belgOrgName = this.pageParams.managerBrIdName;

      }
    },
    reloadListData () {
      const dt = {
        listSerno: this.listSerno
      };
      this.$refs.refTable.remoteData({condition: JSON.stringify(dt)});
    },
    // 保存
    save () {
      let saveFlag = this.d1_A_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      let date = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());// 获取当前时间
      this.d1_A_BillCard.setItemValue('createTime', date);
      this.d1_A_BillCard.setItemValue('updateTime', date);
      if (this.opType == 'approve') {
        this.d1_A_BillCard.setItemValue('enterListFlag', '02');// 01手工导入02评审自动添加
        this.d1_A_BillCard.setItemValue('status', '2');// 1生效2暂存
      } else {
        this.d1_A_BillCard.setItemValue('enterListFlag', '01');// 01手工导入02评审自动添加
        this.d1_A_BillCard.setItemValue('status', '1');// 1生效2暂存
      }

      // 获取card数据
      let cusLstDedkkhData = this.d1_A_BillCard.getBillCardValue();
      // 获取表格数据
      let cusLstDedkkhYjsxData = this.$refs.refTable.tabledata;
      // 包装成一个dto对象
      let json = {
        cusLstDedkkhData: cusLstDedkkhData,
        cusLstDedkkhYjsxData: cusLstDedkkhYjsxData
      };
      const url = this.$backend.cmisCus + '/api/cuslstdedkkh/insertorupdatedata';
      this.$xutils.request({
        // 同步请求
        async: true,
        url: url,
        data: JSON.stringify(json),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data.rtCode == '0000') {
              this.$xutils.showMsgBox('提示', '保存成功！');
              this.$dialog.close(this.dialogId);
            } else {
              this.$xutils.showMsgBox('提示', response.data.rtMessage);
              return;
            }
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '保存失败！请核查数据', 400, 300);
        }
      }, this);
    },

    // 暂存
    tempSave () {
      let date = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());// 获取当前时间
      this.d1_A_BillCard.setItemValue('createTime', date);
      this.d1_A_BillCard.setItemValue('updateTime', date);
      if (this.opType == 'approve') {
        this.d1_A_BillCard.setItemValue('enterListFlag', '02');// 01手工导入02评审自动添加
      } else {
        this.d1_A_BillCard.setItemValue('enterListFlag', '01');// 01手工导入02评审自动添加
      }
      this.d1_A_BillCard.setItemValue('status', '2');// 1生效2暂存
      // 获取card数据
      let cusLstDedkkhData = this.d1_A_BillCard.getBillCardValue();
      if(cusLstDedkkhData.cusId == null || cusLstDedkkhData.cusId == ""){
        this.$xutils.showMsgBox('提示', '请先选择客户编号！');
        return;
      }
      // 获取表格数据
      let cusLstDedkkhYjsxData = this.$refs.refTable.tabledata;
      // 包装成一个dto对象
      let json = {
        cusLstDedkkhData: cusLstDedkkhData,
        cusLstDedkkhYjsxData: cusLstDedkkhYjsxData
      };
      const url = this.$backend.cmisCus + '/api/cuslstdedkkh/insertorupdatedata';
      this.$xutils.request({
        // 同步请求
        async: true,
        url: url,
        data: JSON.stringify(json),
        success: (response, status, xhr) => {
          if (response.code == 0) {
            if (response.data.rtCode == '0000') {
              this.d1_A_BillCard.setBillCardValue(response.data.cusLstDedkkhData);
              this.$refs.refTable.tabledata = response.data.cusLstDedkkhYjsxData;
              this.$xutils.showMsgBox('提示', '保存成功！');
              this.$dialog.close(this.dialogId);
            } else {
              this.$xutils.showMsgBox('提示', response.data.rtMessage);
              return;
            }
          }
        },
        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '操作失败！'); // 弹出提示
        }
      }, this);
    },
    // 返回
    back () {
      this.$dialog.close(this.dialogId);
    },
    // 新增
    add () {
      this.$refs.refTable.clearValidateMessage();
      this.pushRefTableRow();
    },
    // 添加数据 添加一条空白数据
    pushRefTableRow: function () {
      let isRefTableValidateOk = false;
      this.$refs.refTable.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isRefTableValidateOk = true;
        }
      });
      if (isRefTableValidateOk) {
        let userInfo = this.$xutils.getLoginUserInfo();
        let serno = this.$xutils.getUUID();
        let row = {serno: serno, listSerno: '', pressureDropItem: '', pressureDropAmt: '', pressureDropFinishTime: '', actPdoAmt: '', actPdoFinshDate: '', pdoActCaseMemo: '', oprType: '01', inputId: userInfo.loginCode, inputBrId: userInfo.orgCode, inputDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), updId: userInfo.loginCode, updBrId: userInfo.orgCode, updDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), createTime: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
        // this.currentDrawTableRow.push(row);
        this.$refs.refTable.tabledata.push(row);
        this.$refs.refTable.setCurrentRow(row);
      }
    },
    // 删除 表格数据
    deleted () {
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      const serno = selections[0].serno;
      if (!serno) {
        this.$refs.refTable.tabledata.splice(this.$refs.refTable.tabledata.indexOf(selections[0]), 1);
      } else {
        const url = this.$backend.cmisCus + '/api/cuslstdedkkhyjsx/delete/' + serno;
        this.$xutils.request({
        // 同步请求
          async: true,
          url: url,
          type: 'post',
          success: (response, status, xhr) => {
            if (response.code == 0) {
              this.$xutils.showMsgBox('提示', '删除成功！');
              this.reloadListData();
            }
          },
          error: (result, status, errorThrown) => {
            this.$xutils.showMsgBox('提示', '操作失败！'); // 弹出提示
          }
        }, this);
      }
    }

  }
};
</script>
