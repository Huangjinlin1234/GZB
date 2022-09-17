<template>
  <div>
    <div>
      <d1-a-billcard ref="bRightsaarEditCard" :operate="formType"></d1-a-billcard>
    </div>
    <div>
      <d1-b-billlist ref="bRightsaarEditList" :operate="formType"></d1-b-billlist>
    </div>
    <div style="display:flex;justify-content:center;">
      <yu-button type="primary" v-if="formType!='details'" @click="save">暂存</yu-button>
      <yu-button type="primary" v-if="formType!='details'" @click="onSubmit">提交</yu-button>
      <yu-button type="primary" @click="onBack" v-if="backStatus">返回</yu-button>
    </div>
     <yufpNwfInit ref="yufpNwfInit" @success-click="onBack"></yufpNwfInit>
  </div>
</template>
<script>
import d1ABillcard from './bRightsaarEdit_d1_A_BillCard.vue';
import d1BBilllist from './bRightsaarEdit_d1_B_BillList.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { request } from 'xy-utils';
import {dateFormat } from '@/utils';
import { mapState } from 'vuex';
export default {
  components: {d1ABillcard, d1BBilllist, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      bRightsaarEditCard: null,
      bRightsaarEditList: null,
      formType: '',
      serno: '',
      backStatus: true,
      pageData: {}
    };
  },
  mounted () {
    this.afterInit();
  },
  computed: {
    ...mapState({
      userCode: state => state.oauth.userCode,
      userInfo: state => state.oauth.userName,
      org: state => state.oauth.org
    })
  },
  methods: {
    /**
       业务权申领修改页面
       */
    afterInit () {
      const bizPageData = this.bizPageData || {};
      const instanceInfo = bizPageData.instanceInfo;
      // 如果流程实例存在，则说明是从流程中打开的页面
      if (instanceInfo) {
        this.backStatus = false;
        this.formType = 'details';
        this.initBizData();
      } else {
        this.pageData = this.pageParams;
        this.formType = this.pageData.operate;
        this.initData();
      }
    },
    initData () {
      this.bRightsaarEditCard = this.$refs.bRightsaarEditCard;
      this.bRightsaarEditList = this.$refs.bRightsaarEditList;
      if (this.formType != 'add') {
        this.bRightsaarEditCard.setBillCardValue(this.pageData);
        // 查询客户经理对应的公司客户
        const model = {aarAppSerno: this.pageData.aarAppSerno };
        const params = { condition: JSON.stringify(model) };
        this.bRightsaarEditList.$refs.refTable.remoteData(params);
      } else {
        // 获取业务流水号
        this.serno = this.$xutils.getSEQWithParamFromServer('ASSIGN_APP_SERNO');
        this.bRightsaarEditCard.setItemValue('aarAppSerno', this.serno);
        this.bRightsaarEditCard.setItemValue('appDate', this.$xutils.dateFormat('yyyy-MM-dd', new Date()));
        this.bRightsaarEditCard.setItemValue('bizRightsAarBrId', this.$xutils.getLoginUserInfo().loginCode);// 业务权申领人
        this.bRightsaarEditCard.setItemValue('bizRightsAarBrIdOrg', this.$xutils.getLoginUserInfo().orgCode);// 业务权申领机构
        this.bRightsaarEditCard.setItemValue('bizRightsAarBrIdName', this.$xutils.getLoginUserInfo().userName);// 业务权申领机构
        this.bRightsaarEditCard.setItemValue('bizRightsAarBrIdOrgName', this.$xutils.getLoginUserInfo().org.name);// 业务权申领机构
        this.bRightsaarEditCard.addEditChangeAction(this.onChange);
      }
    },
    initBizData () {
      const _this = this;
      this.queryData().then(res => {
        if (res.code == 0) {
          _this.pageData = res.data[0] || {};
          _this.initData();
        } else {
          _this.$xutils.showMsgBox('提示', '系统异常', 400, 300);
        }
      });
    },
    queryData () {
      return request({
        url: this.$backend.cmisCus + '/api/cusbizaarapp/query',
        method: 'POST',
        data: {condition: JSON.stringify({aarAppSerno: this.bizPageData.instanceInfo.bizId})}
      });
    },
    onChange (thisCard, itemKey, oldValue, newValue) {
      // 获得业务申领人机构号
      if (itemKey == 'accountManagerBrName') {
        // 改变
        const acc = this.bRightsaarEditCard.getBillCardItemValue('accountManagerBr');
        if (acc == '100000000') {
          this.bRightsaarEditCard.setBillCardItemValue('accountManagerBrAarOrgRela', 21);
        } else {
          this.bRightsaarEditCard.setBillCardItemValue('accountManagerBrSarOrgRela', 10);
        }
      }
    },
    onSubmit () {
      // 校验必输
      const _this = this;
      const saveFlag = _this.bRightsaarEditCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const listData = _this.bRightsaarEditList.getBillListData();
      if (listData.length == 0) {
        this.$xutils.showMsgBox('提示', '请添加业务权申领客户!');
        return false;
      }
      var bizUserId = '';
      var bizUserName = '';
      bizUserId = listData[0].cusId;
      bizUserName = listData[0].cusName;
      for (var i = 1; i < listData.length; i++) {
        bizUserId += ',' + listData[i].cusId;
        bizUserName += ',' + listData[i].cusName;
      }
      const data = _this.getPageData();
      _this.saveData(data).then(res => {
        if (res.code == 0) {
          _this.formType == 'edit';
          _this.bRightsaarEditCard.setBillCardValue(res.data.cusBizAarApp);
          // 获取表格数据
          this.bRightsaarEditList.$refs.refTable.tabledata = res.data.list; ;
          // 提交流程
          let wfInitData = {};
          wfInitData.systemId = 'cmis';
          wfInitData.orgId = this.org.code;
          wfInitData.bizId = data.cusBizAarApp.aarAppSerno;
          if (wfInitData.orgId.substring(0, 2) == '80') {
            wfInitData.bizType = 'SGA02';
          } else if (wfInitData.orgId.substring(0, 2) == '81') {
            wfInitData.bizType = 'DHA02';
          } else{
            wfInitData.bizType = 'KH013';
          }
          wfInitData.userId = this.userCode;
          wfInitData.bizUserName = bizUserName;
          wfInitData.bizUserId = bizUserId;
          wfInitData.bizParam1 = data.cusBizAarApp.managerId; // 管护客户经理  据此确定下一节点办理人

          this.$refs.yufpNwfInit.wfInit(wfInitData);
        } else {
          _this.$xutils.showMsgBox('提示', '数据保存失败！请核查数据', 400, 300);
        }
      }).catch(res => {
        _this.$xutils.showMsgBox('提示', '系统异常', 400, 300);
      });
    },
    // 业务权申领客户列表新增
    onAdd () {
      // 获取管户客户经理ID
      const managerId = this.bRightsaarEditCard.getBillCardItemValue('managerId');
      if (managerId == null || managerId == '') {
        this.$xutils.showMsgBox('提示', '请添加管户客户经理!');
        return;
      }
      // 获取表格页面信息，给客户新增页面做不重复判断
      const data = this.bRightsaarEditList.getBillListData();
      const obj = {
        data: data,
        managerId: managerId
      };
      const _this = this;
      this.$dialog.open(
        '业务权申领客户列表',
        'cusmanage/biz_rights_aar/bRightsaarinfoaddIndex',
        900,
        600,
        obj,
        _this.reloadtemplet
      );
    },
    // 将新增的客户信息展示到申领表格中
    reloadtemplet (data) {
      var _this = this;
      // 获得主键流水号
      if (data.cusId) {
        var param = {condition: {cusId: data.cusId, status: '01', shareUser: _this.$xutils.getLoginUserInfo().userCode}};
        _this.$request({
          url: this.$backend.cmisCus + '/api/cusprivcorrerel/',
          method: 'GET',
          data: param
        }).then((response) => {
          if (response.code == '0' && response.data && response.data.length > 0) {
            _this.$xutils.showMsgBox('提示', '已有客户:\"' + data.cusId + '\"的业务权！', 400, 300);
          } else {
            const jsonData = {
              'cusId': data.cusId,
              'cusName': data.cusName,
              'cusType': data.cusType,
              'certType': data.certType,
              'certCode': data.certCode,
              'aarAppSerno': this.serno
            };
            this.bRightsaarEditList.addRowData(1, jsonData);
          }
        });
      }
    },
    // 将选中客户信息删除
    ondelete () {
      this.bRightsaarEditList.removeCurrRow();
    },
    // 暂存
    save () {
      // 调用下方的函数
      const _this = this;
      let data = _this.getPageData();
      _this.saveData(data).then(res => {
        if (res.code == 0) {
          _this.$xutils.showMsgBox('提示', '暂存成功', 400, 200, () => {
            _this.$dialog.close(_this.dialogId);
          });
        }
      }).catch(res => {
        this.$xutils.showMsgBox('提示', '系统异常', 400, 300);
      });
    },
    getPageData () {
      // 获得当前时间
      const nowDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      this.bRightsaarEditCard.setItemValue('updId', userInfo.loginCode);// 更新人
      this.bRightsaarEditCard.setItemValue('updBrId', userInfo.orgCode);// 更新机构
      this.bRightsaarEditCard.setItemValue('updDate', nowDate);// 更新日期
      this.bRightsaarEditCard.setItemValue('approveStatus', '000');
      this.bRightsaarEditCard.setItemValue('updateTime', nowDate);
      // 获得卡片数据
      const cardData = this.bRightsaarEditCard.getBillCardValue();
      // 从表单数据中拿到业务流水号
      let aarAppSerno;
      if (this.formType == 'add') {
        aarAppSerno = this.serno;
        cardData.createTime = nowDate;
      } else {
        aarAppSerno = cardData.aarAppSerno;
        cardData.createTime = dateFormat(cardData.createTime, '{y}-{m}-{d} {h}:{i}:{s}');
        cardData.updateTime = dateFormat(cardData.updateTime, '{y}-{m}-{d} {h}:{i}:{s}');
      }
      // 获取表格数据
      const listData = this.bRightsaarEditList.getBillListData();
      // 创建一个数组仓库
      const jsonData = [];
      for (let i = 0; i < listData.length; i++) {
        // 塞入业务流水号，主键流水号，创建和修改时间
        listData[i].aarAppSerno = aarAppSerno;
        listData[i].createTime = nowDate;
        listData[i].updateTime = nowDate;
        jsonData.push(listData[i]);
      }
      if (this.formType == 'add') {
        cardData.createTime = nowDate;
      }
      // 包装成一个dto对象
      const json = {
        list: jsonData,
        cusBizAarApp: cardData
      };
      return json;
    },
    // 保存数据
    saveData (param) {
      let url;
      if (this.formType == 'add') {
        url = this.$backend.cmisCus + '/api/cusbizaarapp/insertmore';
      } else {
        url = this.$backend.cmisCus + '/api/cusbizaarapp/updatemore';
      }
      return request({
        url: url,
        method: 'POST',
        data: param
      });
    },
    saveBrData () {
      // 获得当前时间
      const nowDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      // 获取表格数据
      const listData = this.bRightsaarEditList.getBillListData();
      const managerId = this.bRightsaarEditCard.getItemValue('managerId');
      const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      const jsonData = [];// 创建一个数组仓库
      for (let i = 0; i < listData.length; i++) {
        const bRJsonData = {
          'cusId': listData[i].cusId,
          'shareUser': managerId,
          'status': '1',
          'createTime': nowDate,
          'updateTime': nowDate,
          'inputId': userInfo.loginCode,
          'inputBrId': userInfo.orgCode,
          'inputDate': nowDate,
          'updId': userInfo.loginCode,
          'updBrId': userInfo.orgCode,
          'updDate': nowDate,
          'oprType': '生效'
        };
        const rowData = this.$xutils.toUpperCase(bRJsonData, true);
        jsonData.push(rowData);
      }
      return request({
        url: this.$backend.cmisCus + '/api/cusprivcorrerel/insertmore',
        method: 'POST',
        data: jsonData
      });
    },
    // 返回操作
    onBack () {
      this.$dialog.close(this.dialogId);
    },
    clearData () {
      this.$refs.bRightsaarEditCard.formdata.userName = '';
      this.$refs.bRightsaarEditCard.formdata.managerId = '';
    }
  }
};
</script>
