<template>
  <div>
    <div >
      <brightsassign-edit-card ref="brightsassignEditCard" :operate="formType"></brightsassign-edit-card>
    </div>
    <div >
      <brightsassign-edit-list ref="brightsassignEditList" :operate="formType"></brightsassign-edit-list>
    </div>
    <div style="text-align:center;margin-top:20px">
      <yu-button type="primary" v-if="formType!='details'" @click="save">暂存</yu-button>
      <yu-button type="primary" v-if="formType!='details'" @click="onSubmit">提交</yu-button>
      <yu-button type="primary" @click="back">返回</yu-button>
    </div>
  </div>

</template>
<script>
import brightsassignEditCard from './brightsassignEditCard.vue';
import brightsassignEditList from './brightsassignEditList.vue';
export default {
  components: {brightsassignEditCard, brightsassignEditList},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      brightsassignEditCard: null,
      brightsassignEditList: null,
      formType: '',
      assignAppSerno: ''
    };
  },
  created () {
    const param = this.pageParams;
    this.formType = param.operate;
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /**
       业务权分配页面数据初始化
       */
    afterInit () {
      const param = this.pageParams || [];
      // 表单数据
      this.brightsassignEditCard = this.$refs.brightsassignEditCard;
      // 列表数据
      this.brightsassignEditList = this.$refs.brightsassignEditList;
      // 页面参数赋值给表单
      this.$xutils.clone(param, this.brightsassignEditCard.$refs.refForm.formdata);
      if (this.formType != 'add') {
        // 如果不是新增则需要查询对应的客户编号业务权分配情况
        const model = {assignAppSerno: param.assignAppSerno};
        const params = { condition: JSON.stringify(model) };
        this.brightsassignEditList.$refs.refTable.remoteData(params);
      }
      if (this.formType == 'add') {
        this.assignAppSerno = this.$xutils.getSEQWithParamFromServer('ASSIGN_APP_SERNO');
      } else {
        this.assignAppSerno = param.assignAppSerno;
      }
    },
    /**
       业务权人员添加
       */
    INSERT () {
      const _this = this;
      this.$dialog.open(
        '人员选取',
        'cusmanage/biz_rights_assign/brightsassignChooseIndex',
        900,
        500,
        null,
        _this.reloadtemplet
      );
    },
    /**
       业务权人员添加后回调函数，将选择的人员回填到列表中
       */
    reloadtemplet (data) {
      var _this = this;
      var param = {condition:{cusId:_this.brightsassignEditCard.formdata.cusId, status:'01', shareUser:data.bizRightsRecipientUser}}
      _this.$request({
        url: this.$backend.cmisCus + '/api/cusprivcorrerel/',
        method: 'GET',
        data: param
      }).then((response) => {
        if(response.code == '0' && response.data && response.data.length > 0){
          _this.$xutils.showMsgBox('提示', '该主管客户已有客户:\"' + data.cusId + '\"的业务权！', 400, 300);
        }else{
          // 获得主键流水号
          const jsonData = {
            'assignAppSerno': this.assignAppSerno,
            'bizRightsRecipientUser': data.bizRightsRecipientUser,
            'bizRightsRecipientUserName': data.bizRightsRecipientUserName,
            'bizRightsRecipientBelgOrg': data.bizRightsRecipientBelgOrg
          };
          this.brightsassignEditList.$refs.refTable.tabledata.push(jsonData);
        }
      });
    },
    /**
       提交操作，需要校验表单
       */
    onSubmit () {
      let validate = false;
      this.brightsassignEditCard.form.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return false;
      }
      // 获取表格数据
      const listData = this.brightsassignEditList.$refs.refTable.tabledata;
      if (listData.length == 0) {
        this.$xutils.showMsgBox('提示', '请添加业务权获取人员'); // 弹出提示
        return false;
      }
      // 获取当前时间
      const nowDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      // 获取卡片信息
      const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      this.brightsassignEditCard.form.formdata['updId'] = userInfo.loginCode;// 更新人
      this.brightsassignEditCard.form.formdata['updBrId'] = userInfo.orgCode;// 更新机构
      this.brightsassignEditCard.form.formdata['updDate'] = nowDate;// 更新日期
      this.brightsassignEditCard.form.formdata['updateTime'] = nowDate;
      const cardData = this.brightsassignEditCard.$refs.refForm.formdata;
      // 从卡片数据中拿到业务流水号
      if (this.formType == 'add') {
        cardData.assignAppSerno = this.assignAppSerno;
        cardData.appDate = nowDate;
      }
      cardData.divisState = '02';
      // 创建一个数组仓库
      const jsonData = [];
      for (let i = 0; i < listData.length; i++) {
        // 塞入业务流水号，创建和修改时间
        listData[i].assignAppSerno = this.assignAppSerno;
        listData[i].createTime = nowDate;
        listData[i].updateTime = nowDate;
        jsonData.push(listData[i]);
      }
      // 包装成一个dto对象
      const json = {
        list: jsonData,
        cusBizAssignApp: cardData
      };
      this.sendState(json, 'submit');
    },
    /**
      暂存操作，不需要校验表单直接保存
       */
    save () {
      // 获取当前时间
      const nowDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      // 获取卡片信息
      const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      this.brightsassignEditCard.form.formdata['updId'] = userInfo.loginCode;// 更新人
      this.brightsassignEditCard.form.formdata['updBrId'] = userInfo.orgCode;// 更新机构
      this.brightsassignEditCard.form.formdata['updDate'] = nowDate;// 更新日期
      this.brightsassignEditCard.form.formdata['updateTime'] = nowDate;
      const cardData = this.brightsassignEditCard.$refs.refForm.formdata;
      // 从卡片数据中拿到业务流水号
      if (this.formType == 'add') {
        cardData.assignAppSerno = this.assignAppSerno;
        cardData.appDate = nowDate;
      }
      cardData.divisState = '01';
      // 获取表格数据
      const listData = this.brightsassignEditList.$refs.refTable.tabledata;
      // 创建一个数组仓库
      const jsonData = [];
      for (let i = 0; i < listData.length; i++) {
        // 塞入业务流水号，创建和修改时间
        listData[i].assignAppSerno = this.assignAppSerno;
        listData[i].createTime = nowDate;
        listData[i].updateTime = nowDate;
        jsonData.push(listData[i]);
      }
      // 包装成一个dto对象
      const json = {
        list: jsonData,
        cusBizAssignApp: cardData
      };
      this.sendState(json, 'save');
    },
    // 返回按钮
    back () {
      const parentObj = this.$route.matched[this.$route.matched.length - 1].instances.default;
      parentObj.$refs.assignList.$refs.refTable.remoteData();
      this.$dialog.close(this.dialogId);
    },
    sendState (data, type) {
      const _this = this;
      let url = '';
      if (_this.formType == 'add') {
        url = _this.$backend.cmisCus + '/api/cusbizacquuserlst/insertmore';
      } else {
        url = _this.$backend.cmisCus + '/api/cusbizacquuserlst/updatemore';
      }
      const title = type == 'submit' ? '提交' : '暂存';
      _this.$xutils.request({
        // 同步请求
        async: true,
        url: url,
        data: JSON.stringify(data),
        success: (response, status, xhr) => {
          debugger;
          if (response) {
            if (response.code == 0) {
              const parentObj = _this.$route.matched[_this.$route.matched.length - 1].instances.default;
              parentObj.$refs.assignList.$refs.refTable.remoteData();
              _this.$xutils.showMsgBox('提示', '信息' + title + '成功', 400, 300, () => {
                _this.$dialog.close(_this.dialogId);
              }); // 弹出提示
            } else {
              _this.$xutils.showMsgBox('提示', '信息' + title + '失败', 400, 300, () => {
                _this.$dialog.close(_this.dialogId);
              }); // 弹出提示
            }
          }
        },
        error: (result, status, errorThrown) => {
          _this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息：' + result.message); // 弹出提示
        }
      });
    }
  }
};
</script>
