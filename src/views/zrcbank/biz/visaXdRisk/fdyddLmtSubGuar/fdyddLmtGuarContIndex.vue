<template>
  <div>
    <yu-panel title="抵质押物信息" panel-type="normal">
        <yu-button-drop>
          <yu-button @click="OnImport" v-if="type!='VIEW'">引入押品</yu-button>
          <yu-button @click="deleteGuar" v-if="type!='VIEW'">取消引入</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition"  request-type="post" selection-type="radio" :base-params="searchData" :pageable="true" :data-url="dataUrl">
        <yu-xtable-column label="押品编号" prop="guarNo">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewGuar(scope.row.guarNo)">{{ scope.row.guarNo }}</a>
            </template>
        </yu-xtable-column>
        <yu-xtable-column label="担保分类名称" prop="guarTypeCd"></yu-xtable-column>
        <yu-xtable-column label="抵质押品所有编号" prop="guarCusId"></yu-xtable-column>
        <yu-xtable-column label="抵质押品所有人" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="评估价值" prop="evalAmt"></yu-xtable-column>
        <yu-xtable-column label="抵押物总价" prop="maxMortagageAmt" ></yu-xtable-column>
        <yu-xtable-column label="抵/质押率" prop="mortagageRate" ></yu-xtable-column>
        <yu-xtable-column label="流水号" prop="serno" hide-column></yu-xtable-column>
        <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
     <guarBaseInfoView ref="guarBaseInfoView"></guarBaseInfoView>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submitFn" v-if="type!='VIEW'">提交</yu-button>
    </yu-form-buttons>
        <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import guarBaseInfoView from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoView';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default {
  components: {guarBaseInfoView, yufpNwfInit},
  mponents: {},
  mixins: [mixinList],
  data: function () {
    return {
      searchData: {condition: {}},
      dialogTitle: '新增',
      params: {},
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/querFddGuarinforel',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/guarguarantee/delete/',
      type: '',
      subSerno: '',
      fddSerno: ''
    };
  },
  created () {
    var _this = this;
    let data = {};
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      _this.subSerno = data.bizId;
      _this.type = data.param.op;
      _this.isShowBtn = true;
    } else {
      data = _this.$route.meta.params;
      _this.subSerno = this.$route.meta.params.subSerno;
      _this.fddSerno = this.$route.meta.params.fddSerno;
      _this.type = data.op;
    }
    _this.searchData.condition = _this.subSerno;
    this.params['iqp_Serno'] = _this.subSerno;
    this.searchData = {
      condition: {
        serno: _this.subSerno
      }
    };
  },
  methods: {
    viewGuar: function (data) {
      this.$refs.guarBaseInfoView.guarBaseinfoView(data);
    },
    // 保存后流程提交
    submitFn: function () {
      let _this = this;
      const loginUser = _this.$xutils.getLoginUserInfo();
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'YX016';
      startdto.bizId = _this.subSerno; // 流水号
      startdto.bizUserName = this.$route.meta.params.cusName;
      startdto.bizUserId = this.$route.meta.params.cusId;
      startdto.param = {
        orgType: loginUser.org.orgType
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    // 流程回调
    onBack () {
      if (this.isShowBtn) {
        this.$dialog.close(this.dialogId);
      } else {
        yufp.router.removeTab(this.$route.path);
      }
    },
    // 点击引入，进入抵质押引入页面
    OnImport: function () {
      this.$dialog.open(
        '引入抵质押物列表',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/guarBaseInfoPop',
        1100,
        650,
        this.params,
        () => {
          //  自动刷新列表数据
          this.$refs.refTable.remoteData();
        }
      );
    },
    /**
      * 抵质押删除申请
      */
    deleteGuar: function () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/guarbizrel/deleteByPrimaryKey',
              data: selections[0],
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$refs.refTable.remoteData();
                  _this.$xutils.showMsgBox('提示', '删除成功!', 350, 150);
                } else {
                  _this.$xutils.showMsgBox('提示', '错误代码：' + response.data.rtnCode + ',错误信息：' + response.data.rtnMsg);
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>
