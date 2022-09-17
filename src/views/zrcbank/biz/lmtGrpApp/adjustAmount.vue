 <!--
    @created by xiamc
    @description 集团客户授信额度调剂申请
  -->
<template>

  <div class="tab-search">
        <yu-panel title="输入查询条件">
          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
              <yu-xform-group :column="3">
                <yu-xform-item label="集团客户名称" placeholder="集团客户名称" label-width="120px" ctype="input" name="grpCusName"></yu-xform-item>
                <yu-xform-item label="业务流水号" placeholder="业务流水号" label-width="120px" ctype="input" name="serno"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" label-width="120px" ctype="select" name="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
                <yu-xform-item label="集团客户编号" placeholder="集团客户编号" label-width="120px" ctype="input" name="grpCusId" data-code="NATIONALITY"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          <!--<yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" selection-type="radio" request-type="POST" @row-click="onSelected">-->
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" selection-type="radio" request-type="POST" >
            <yu-xtable-column label="成员客户编号" prop="cusid"></yu-xtable-column>
            <yu-xtable-column label="成员客户名称" prop="cusname" sortable></yu-xtable-column>
            <yu-xtable-column label="敞口额度（元）" prop="openTotalLmtAmt"></yu-xtable-column>
            <yu-xtable-column label="调剂后敞口额度" prop="adjustopenlmtAmt"></yu-xtable-column>
            <yu-xtable-column label="低风险额度" prop="lowrisklmtamt"></yu-xtable-column>
            <yu-xtable-column label="调剂后低风险额度" prop="AdjustLowRiskLmtAmt" data-code="PUBLISH_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { sessionStore } from 'xy-utils';
import ReplySelected from './replySelected/replySelected';
import { defer, delay } from 'q';
import { validate } from 'json-schema';

yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS');

export default {
  components: { YufpDemoSelector, ReplySelected },
  data: function () {
    return {
      activeName: 'messageTip',
      searchFormdata: {},
      formdataNext: {},
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
      saveBtnShow: true,
      dialogVisibleTwo: false,
      replySerno: '',
      lmtTerm: ''
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

      // 3.获取隐藏数值 ，原授信批复编号和原授信期限
      this.replySerno = a.grpReplySerno;
      this.lmtTerm = a.lmtTerm;
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
      // 2.选择传送参数并跳转,换成dialog
      this.$router.addTab({
        name: 'zrcbank/biz/lmtGrpApp/lmtAppDetail/lmtAppDetail',
        title: '授信细化',
        key: '1',
        data: {
          serno: row.serno,
          pkId: row.pkId
          // formData: {
          //   name: 'ST0001',
          //   gender: '4'
          // }
        }
      });
      // yufp.router.removeTab(
      //   "/zrcbank/biz/lmtGrpApp/replySelected/replySelected/1"
      // );
      // 2.关闭当前diaglog
      var _this = this;
      // _this.dialogVisibleSelectedDialog = false;
      //  sessionStore.set("name", {
      //       name: "ST0001",
      //       gender: "4"
      //     });
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
      console.log('================');
      this.dialogVisibleNext = false;
      var _this = this;
      console.log('***********');
      console.log(this.formdata);
      console.log(this.formdata.grpCusName);
      console.log('***********');

      // todo 校验参数提示信息
      if (this.formdata.grpCusName.length == 0 || this.formdata.grpCusId == 0) {
        _this.$message('提交参数为空');
        return;
      }

      // 1.获取model 数据,封装对象
      var LmtGrpApp;
      LmtGrpApp = {
        pkId: '',
        serno: this.formdata.serno,
        lmtType: this.formdata.lmtType,
        grpCusId: this.formdata.grpCusId,
        cusType: this.formdata.cusType,
        grpCusName: this.formdata.grpCusName,
        origiLmtReplySerno: this.replySerno,
        origiLmtTerm: this.lmtTerm,
        curType: this.formdata.curType,
        openTotalLmtAmt: 0,
        lowRiskTotalLmtAmt: 0,
        lmtTerm: 0,
        lmtGraperTerm: 0,
        oprType: '01',
        apprStatus: '01',
        inputId: '',
        inputBrId: '',
        inputDate: '',
        updId: '',
        updBrId: '',
        updDate: '',
        managerId: '',
        managerBrId: '',
        createTime: new Date(),
        updateTime: new Date()
      };

      // LmtGrpApp = this.formdataNext;

      // 1.1 根据客户号进行查询判断客户号是否存在台账表中 aizhag todo 先复用,不存在默认是新增，存在是细化
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpreplyacc/getlmttypebycusid' + this.formdata.grpCusId,
        callback: function (code, message, response) {
          // 在向后台返回数值,如果不存在，提示错误信息，可以进行细化操作
          debugger;
          console.log('================');
          console.log(response);
          console.log('================');
          var retvalue = response.data.lmtType;
          if (retvalue == '0') {
            _this.$message('批复列表不存在');
            return;
          }
        }
      });

      // 2.根据主从表插入申请数据
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/guidesaveDetail',
        data: LmtGrpApp,
        callback: function (code, message, response) {
          _this.$message('插入主从记录成功');
          // 返回对应的流水号去查询
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
          serno: this.formdata.serno
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

      // _this.switchStatus("EDIT", true);

      _this.$nextTick(function () {
        // _this.$refs.refForm.resetFields();
        var obj = _this.$refs.refTable.selections[0];
        // yufp.clone(obj, _this.formdata);

        // 发送到修改界面：
        // 2.选择传送参数并跳转,换成dialog
        debugger;
        this.$router.addTab({
          name: 'zrcbank/biz/lmtGrpApp/lmtAppDetail/lmtAdjustAmountDetail',
          title: '基本信息修改',
          key: '1',
          data: {
            serno: obj.serno,
            pkId: obj.pkId
          }
        });
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
      // yufp.service.request({
      //   method: "POST",
      //   url: backend.cmisBiz + "/api/lmtgrpapp/update/",
      //   data: _this.formdata,
      //   callback: function(code, message, response) {
      //     //todo 增加返回码判断
      //     _this.$refs.refTable.remoteData();
      //     _this.$message("操作成功");
      //   }
      // });

      // 调用明细界面更改
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;

      // 关闭标签
      _this.dialogVisibleSelectedDialog = false;

      var selectionsAry = _this.$refs.refTable.selections;

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      var _this = this;
      var rowData = _this.$refs.refTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      rowData['model_group_no'] = 'CMG000695';
      rowData['pk_id'] = rowData[0].pkId;
      rowData['scene'] = '01';
      rowData['op'] = 'EDIT'; '';
      rowData['serno'] = rowData[0].serno;
      // debugger;
      this.$dialog.open(
        '集团客户授信额度调剂',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1400,
        600,
        rowData,
        () => {},
        true,
        true
      );
    },


    /**
     * 详情2,在成员客户中使用
     */
    infoFn2: function () {
      var _this = this;

      // 关闭标签
      _this.dialogVisibleSelectedDialog = false;

      var selectionsAry = _this.$refs.refTable.selections;

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      var _this = this;
      var rowData = _this.$refs.refTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      rowData['model_group_no'] = 'CMG000692';
      rowData['pk_id'] = rowData[0].pkId;
      rowData['scene'] = '01';// 授信场景
      rowData['op'] = 'EDIT'; '';
      rowData['serno'] = rowData[0].serno;
      // debugger;
      this.$dialog.open(
        '成员客户授信信息列表',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1400,
        600,
        rowData,
        () => {},
        true,
        true
      );
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
              url: backend.cmisBiz + '/api/lmtgrpapp/delete/' + selections[0].pkId,
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
      _this.$message('集团客户授信额度调剂历史查看界面');
    }
  }
};
</script>
