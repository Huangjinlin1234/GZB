<template>
  <!--
    @created by yangwl
    @time  2021/5/5
    @description 单一客户额度冻结/解冻/终止
  -->
  <div>
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="单一客户额度冻结/解冻/终止申请" name="base">
        <yu-panel title="单一客户额度冻结/解冻/终止申请" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refTable" form-type="search" label-width="60px">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户名称" placeholder="名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFnStatus"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="yu-toolBar">
            <yu-button-group>
              <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')" >新增</yu-button>
              <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
              <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
              <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
            </yu-button-group>
          </div>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" request-type="post" condition-key="condition" :base-params="queryParams">
            <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="lmtAccOperType" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId">
              <template slot-scope="scope">
                  <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName">
              <template slot-scope="scope">
                  <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" ></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="客户额度冻结/解冻/终止历史" name="asset">
        <yu-panel title="客户额度冻结/解冻/终止历史" :hideFilter="false" :collapseHide="false">
          <yu-xform related-table-name="refTableHis" form-type="search" label-width="60px">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户名称" placeholder="名称" ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFnStatusHis"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="yu-toolBar">
            <yu-button-group>
              <yu-button type="primary" @click="viewFn" v-if="checkCtrl('view')">查看</yu-button>
            </yu-button-group>
          </div>
          <yu-xtable ref="refTableHis" :data-url="dataUrl2" request-type="post" condition-key="condition" :base-params="param">
            <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="lmtAccOperType" width="200" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" hidden></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" hidden></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="100"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" width="100" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog title="查看" :visible.sync="dialogVisible">
      <yu-xform ref="refForm" label-width="100px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" ctype="input" name="serno"></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="input" name="lmtAccOperType" data-code="STD_LMT_ACC_OPER_TYPE"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" name="inputIdName"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_LMT_ACC_OPER_TYPE');

export default {
  data: function () {
    return {
      tabName: 'base',
      dataUrl: backend.cmisBiz + '/api/lmtreplyaccoperapp/queryAll',
      queryParams: {},
      param: {},
      dataUrl2: backend.cmisBiz + '/api/lmtreplyaccoperapp/queryHis',
      dialogVisible: false,
      formDisabled: true,
      formdata: {}
    };
  },
  methods: {
    // 字典项过滤
    datacodeFilterFnStatus: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '000' || op.key === '111' || op.key === '992') {
          return true;
        }
        return false;
      });
    },
    datacodeFilterFnStatusHis: function (opts, datacode, name) { // 990,991,993,997,998,996
      return opts.filter(function (op) {
        if (op.key === '990' || op.key === '991' || op.key === '993' || op.key === '996' || op.key === '997' || op.key === '998') {
          return true;
        }
        return false;
      });
    },
    /**
     * 新增
     */
    addFn: function () {
      // this.$dialog.open('单一客户额度冻结申请向导', 'zrcbank/biz/lmtReplyAccOperApp/lmtReplyOperVie', 1000, 800, {
      //   saveBtnShow: true,
      //   viewType: 'ADD'
      // });
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtReplyAccOperApp/lmtReplyOperVie',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyOperDetai', // 必传
        // 页签名称
        title: '单一客户额度冻结申请向导',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'ADD'
        }
      });
    },
    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var serno = selectionAry[0].serno;
      // 判断审批状态为审批中
      if (selectionAry[0].approveStatus == '111') {
        _this.$message({
          message: '审批中的数据不允许修改',
          type: 'warning'
        });
        return;
      }
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtReplyAccOperApp/lmtReplyOperDetai',

        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyOperDetai_' + new Date().getTime(), // 必传
        // 页签名称
        title: '客户授信额度冻结/解冻/终止修改',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'DETAIL',
          serno: serno
        }
      });
    },

    // 查看
    viewFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTableHis.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var serno = selectionAry[0].serno;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtReplyAccOperApp/lmtReplyOperDetai',

        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyOperDetai_' + new Date().getTime(), // 必传
        // 页签名称
        title: '客户授信额度冻结/解冻/终止修改',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: false,
          viewType: 'DETAIL',
          serno: serno
        }
      });
    },

    // 取消
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var serno = selectionAry[0].serno;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtReplyAccOperApp/lmtReplyOperDetai',

        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyOperView_' + new Date().getTime(), // 必传
        // 页签名称
        title: '客户授信额度冻结/解冻/终止详情',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: false,
          viewType: 'edit',
          serno: serno
        }
      });
    },

    deleteFn: function () {
      var _this = this;
      var model = {};
      // 获得选中的表格数据
      var selections = _this.$refs.refTable.selections;
      yufp.clone(selections[0], model);
      // 如果未选中表格数据，则弹出提示
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      var approve = selections[0].approveStatus;
      if (approve != '000' && approve != '992') {
        _this.$message({
          message: '审批中的数据不允许删除',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            // 操作类型，01--可展示   02--不可展示
            model.oprType = '02';
            // 向后台发送删除请求
            // method: 请求方式
            // url: 接口路径
            // data: 向后端传递的数据
            // callback: 服务请求后执行的回调函数
            // 逻辑删除，修改状态OPR_TYPE 01变为02
            yufp.service.request({
              method: 'POST',
              data: model,
              url: backend.cmisBiz + '/api/lmtreplyaccoperapp/updateSelective',
              callback: function (code, message, response) {
                // 删除后刷新表格数据
                _this.$refs.refTable.remoteData();
                // 弹出提示
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },

    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      const params = data;
      var _this = this;
      let json = {};
      let cusCatalog = '';
      let name = '';
      let title = '';
      // 判断客户属于个人还是公司（1.对私;2.对公）
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisCus + '/api/cusbase/cusBaseInfo',
        data: params.cusId,
        callback: function (code, message, response) {
          if (response.code == 0) {
            cusCatalog = response.data.cusCatalog;
          }
        }
      });
      if (cusCatalog == '1') {
        name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
        title = '个人客户查看';
      } else if (cusCatalog == '2') {
        name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
        title = '公司客户查看';
      } else {
        _this.$xutils.showMsgBox('提示', '当前客户大类未识别,请确认客户信息是否完整!');
      }
      let key = '';
      json['op'] = 'VIEW';
      json['viewType'] = 'VIEW';
      json['cusId'] = params.cusId;
      // 个人正式客户创建 B01
      key = params.cusId + new Date().getTime();
      json.key = `/${name}/${key}`;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key,
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: json
      });
    }
  }
};
</script>
