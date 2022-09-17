<template>
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="授信分项信息" name="messageTip">
        <yu-panel title="输入查询条件">
          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
              <yu-xform-group :column="2">
                <yu-xform-item label="集团编号" placeholder="集团编号" label-width="120px" ctype="input" name="grpCusName"></yu-xform-item>
                <yu-xform-item label="客户名称" placeholder="客户名称" label-width="120px" ctype="input" name="serno"></yu-xform-item>
                <yu-xform-item label="授信额度" placeholder="授信额度" label-width="120px" ctype="select" name="apprStatus"></yu-xform-item>
                <yu-xform-item label="担保方式" placeholder="担保方式" label-width="120px" ctype="input" name="grpCusId" data-code="NATIONALITY"></yu-xform-item>
                <yu-xform-item label="是否预授信额度" placeholder="担保方式" label-width="120px" ctype="input" name="grpCusId" data-code="NATIONALITY"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          <yu-toolbar>
            <yu-button type="primary" @click="addFn">新增</yu-button>
            <yu-button type="primary" @click="modifyFn">修改</yu-button>
            <yu-button type="primary" @click="infoFn">详情</yu-button>
            <yu-button type="primary" @click="deleteFn">删除</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" selection-type="radio">
            <yu-xtable-column label="授信分项流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="授信品种" prop="lmtType" sortable></yu-xtable-column>
            <yu-xtable-column label="是否循环额度" prop="cusType" data-code="NATIONALITY"></yu-xtable-column>
            <yu-xtable-column label="是否预授信额度" prop="openTotalLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="低风险额度合计（元）" prop="lowRiskTotalLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="授信额度" prop="updId" data-code="PUBLISH_STATUS"></yu-xtable-column>
            <yu-xtable-column label="额度期限" prop="inputBrId"> </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisibleNext" width="650px">
          <yu-xform ref="refFormNext" label-width="120px" v-model="formdata" :disabled="formDisabled">
            <yu-xform-group column="1">
              <yu-xform-item label="编码" ctype="num" name="id" :hidden="true"></yu-xform-item>
              <yu-xform-item label="集团客户编号" rules="required" ctype="input" name="grpCusId"></yu-xform-item>
              <yu-xform-item label="集团客户名称" rules="required" ctype="input" name="grpCusName"></yu-xform-item>
              <yu-xform-item label="授信类型" rules="required" ctype="select" name="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" v-show="saveBtnShow" @click="nextFn">下一步</yu-button>
              <yu-button type="primary" @click="cancelFn">取消</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
        <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="650px">
          <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
            <yu-xform-group column="1">
              <yu-xform-item label="编码" ctype="num" name="id" :hidden="true"></yu-xform-item>
              <yu-xform-item label="业务流水号" rules="required" ctype="input" name="serno"></yu-xform-item>
              <yu-xform-item label="业务类型" rules="required" ctype="input" name="lmtType"></yu-xform-item>
              <yu-xform-item label="集团客户编号" rules="required" ctype="input" name="grpCusId"></yu-xform-item>
              <yu-xform-item label="集团客户名称" rules="required" ctype="input" name="grpCusName"></yu-xform-item>
              <yu-xform-item label="客户类型" rules="required" ctype="input" name="cusType"></yu-xform-item>
              <yu-xform-item label="敞口额度合计（元）" rules="required" ctype="input" name="openTotalLmtAmt"></yu-xform-item>
              <yu-xform-item label="低风险额度合计（元）" rules="required" ctype="input" name="lowRiskTotalLmtAmt"></yu-xform-item>
              <yu-xform-item label="登记日期" rules="required" ctype="input" name="inputDate"></yu-xform-item>
              <yu-xform-item label="登记人" rules="required" ctype="input" name="inputId"></yu-xform-item>
              <yu-xform-item label="登记机构" rules="required" ctype="input" name="inputBrId"></yu-xform-item>
              <yu-xform-item label="申请状态" rules="required" ctype="select" name="apprStatus"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" v-show="saveBtnShow" @click="ok">确定</yu-button>
              <yu-button type="primary" @click="cancelFn">取消</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
        <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisibleSelected" width="650px">
          <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="formDisabled">
            <yu-xform-group column="1">
              <yu-xform-item label="编码" ctype="num" name="id" :hidden="true"></yu-xform-item>
              <yu-xform-item label="集团客户编号" rules="required" ctype="input" name="grpCusId"></yu-xform-item>
              <yu-xform-item label="集团客户名称" rules="required" ctype="input" name="grpCusName"></yu-xform-item>
              <yu-xform-item label="授信类型" rules="required" ctype="select" name="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" v-show="saveBtnShow" @click="nextFn">下一步</yu-button>
              <yu-button type="primary" @click="cancelFn">取消</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
        <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisibleSelectedDialog" width="1050px">
          <reply-selected parentText="aaa" @callbackFun="test"></reply-selected>
        </yu-xdialog>
      </yu-tab-pane>
      <yu-tab-pane label="担保信息" name="deal">

      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { sessionStore } from 'xy-utils';
import ReplySelected from './replySelected/replySelected';
import { defer } from 'q';

yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS');

export default {
  components: { YufpDemoSelector, ReplySelected },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/lmtgrpapp/query',
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      dialogVisibleNext: false,
      dialogVisibleSelected: false,
      formDisabled: false,
      dialogVisibleSelectedDialog: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  activated () {
    // this.$refs.refForm1.setFormData(this.$route.params.formData || {});
    // debugger;
  },
  methods: {
    test (a) {
      debugger; // 1.在这里关闭当前标签
      this.dialogVisibleSelectedDialog = false;
      // 2.获取数据给赋值
      //  this.$refs.refFormNext.setFormData(a);
      this.formdata.grpCusId = a.grpCusId;
      this.formdata.grpCusName = a.grpCusName;
    },

    openDialog: function (a) {
      var _this = this;
      _this.$message('跳转到对工信息界面');
    },
    /**
     * 批复选取
     */
    selectdata: function () {
      var _this = this;
      // 使用dilog 显示
      // _this.dialogVisible = true;
      _this.dialogVisibleSelectedDialog = true;
    // 2.
    },

    onSelected: function (row, event, column, index) {
      // alert("选择并跳转");
      console.log('************************');
      // 1.关闭当前界面
      // this.$store.dispatch("tagsView/delVisitedView", {
      //   path: "/zrcbank/biz/lmtGrpApp/replySelected/replySelected/1"
      // });
      // //2.选择传送参数并跳转,换成dialog
      // this.$router.addTab({
      //   name: "zrcbank/biz/lmtGrpApp/lmtAppDetail/lmtAppDetail",
      //   title: "授信细化",
      //   key: "1",
      //   data: {
      //     userId: "121",
      //     keyId: 12324
      //     formData: {
      //       name: 'ST0001',
      //       gender: '4'
      //     }
      //   }
      // });
      yufp.router.removeTab(
        '/zrcbank/biz/lmtGrpApp/replySelected/replySelected/1'
      );
      // 2.关闭当前diaglog
      var _this = this;
      _this.dialogVisibleSelectedDialog = false;
      sessionStore.set('name', {
        name: 'ST0001',
        gender: '4'
      });
    },
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;

      _this.dialogVisible = false;
    },

    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;

      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      } // 向后台发送保存请求

      yufp.service.request({
        method: 'POST',
        url: '/trade/example/save',
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();

          _this.$message('操作成功');

          _this.dialogVisible = false;
        }
      });
    },

    /**
     * 下一步
     */
    nextFn: function () {
      this.dialogVisibleNext = false;
      var _this = this;
      // 1.获取model 数据,封装对象
      var LmtGrpApp;
      // LmtGrpApp = {pkId:'',
      // serno:'',
      // lmtType:'',
      // grpCusId:'11111',
      // cusType:'',
      // grpCusName:'2222',
      // origiLmtReplySerno:'',
      // origiLmtTerm:'',
      // curType:'01',
      // openTotalLmtAmt:0,
      // lowRiskTotalLmtAmt:0,
      // lmtTerm:0,
      // lmtGraperTerm:0,
      // oprType:'01',
      // apprStatus:'01',
      // inputId:'',
      // inputBrId:'',
      // inputDate:'',
      // updId:'',
      // updBrId:'',
      // updDate:'',
      // managerId:'',
      // managerBrId:'',
      // createTime:  new Date(),
      // updateTime:new Date()
      // };
      LmtGrpApp = this.searchFormdata;
      // 2.根据主从表插入申请数据
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/guidesave',
        data: LmtGrpApp,
        callback: function (code, message, response) {
          _this.$message('插入主从记录成功');
          _this.dialogVisible = false;
        }
      });

      // 3.END

      // 4.页面跳转
      this.$router.addTab({
        name: 'zrcbank/biz/lmtGrpApp/lmtAppDetail/lmtAppDetail',
        title: '授信细化',
        key: '1',
        data: {
          userId: '11'
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;

      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;

      // _this.switchStatus("ADD", true);

      // _this.$nextTick(function() {
      //   _this.$refs.refForm.resetFields();
      // });
      _this.dialogVisibleNext = true; // 新增弹出框显示
      _this.dialogVisible = false; //
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;

      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      _this.switchStatus('EDIT', true);

      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();

        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
      });
    },

    ok: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      console.log('==================');
      console.log(_this.formdata);
      console.log('==================');
      // 发送修改请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/update/',
        data: _this.formdata,
        callback: function (code, message, response) {
          // todo 增加返回码判断
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
        }
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      _this.switchStatus('DETAIL', false);

      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();

        yufp.clone(selectionsAry[0], _this.formdata);
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;

      var selections = _this.$refs.refTable.selections;

      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      var len = selections.length,
        arr = [];

      for (var i = 0; i < len; i++) {
        arr.push(selections[i].id);
      }

      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                backend.cmisBiz + '/api/lmtgrpapp/delete/' + selections[0].pkId,
              data: {
                ids: arr.join(',')
              },
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();

                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },

    /**
     * 导出操作
     */
    exportFn: function () {
      var _this = this;

      yufp.util.exportExcelByTable({
        fileName: '导出',
        importType: 'service',
        ref: _this.$refs.refTable,
        url: '/trade/example/list'
      });
    }, // 历史界面
    /**
     * 详情
     */
    viewFn: function () {
      //  alert('--------------');
      var _this = this;
      var selectionsAry = _this.$refs.refTableHis.selections;

      // 校验
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }


      // 进入到
      _this.$message('集团客户预授信细化历史详情查看界面');
    }

  }
};
</script>
