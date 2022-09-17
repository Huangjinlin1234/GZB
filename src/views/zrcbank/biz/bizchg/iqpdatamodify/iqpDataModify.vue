<template>
   <div>
   <yu-tabs v-model="activeName">
    <yu-tab-pane label="数据修改列表" name="first">
    <yu-panel  panel-type="normal">
      <yu-xform ref="refForm" form-type="search" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
         <yu-xform-item  label="业务流水号" placeholder="业务流水号" name="serno" ctype="input"></yu-xform-item>
          <yu-xform-item label="修改类型" placeholder="修改类型" name="modifyType" ctype="select" data-code="STD_MODIFY_TYPE"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary"  @click="addFn">新增</yu-button>
          <yu-button type="primary"  @click="onUpdate(true)">修改</yu-button>
          <yu-button type="primary"  @click="onDelete">删除</yu-button>
          <yu-button type="primary"  @click="onUpdate(false)">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="{'condition':{'apply': 'Y'},'sort':'inputDate desc'}" :default-load="false" request-type="post">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="修改类型" prop="modifyType" data-code="STD_MODIFY_TYPE"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" ></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
    <yu-xdialog :visible.sync="visiable" width="400px" title="数据修改引导界面">
          <yu-xform ref="refForm" label-width="120px" v-model="formdata">
            <yu-xform-group :column="3">
              <yu-xform-item label="修改内容" colspan="24" ctype="select" name="modifyType" rules="required" data-code="STD_MODIFY_TYPE"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
           <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
            <yu-button type="primary" @click="doNextStep">下一步</yu-button>
            <yu-button type="primary" @click="visiable = !visiable">返回</yu-button>
          </yu-form-buttons>
    </yu-xdialog>
  </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_MODIFY_TYPE');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dialogVisible: false,
      dataUrl: this.$backend.cmisBiz + '/api/datamodify/',
      visiable: false,
      formdata: {},
      activeName: 'first'
    };
  },
  mounted(){
    this.$refs.refTable.remoteData();
  },
  methods: {
    /**
     * 新增按钮
     */
    addFn: function () {
      let _this = this;
      _this.visiable = true;
    },

    doNextStep () {
      let _this = this;
      let row = {};
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      const selPars = this.formdata;
      // 调用序列号生成的规则，生成数据修改申请序列号
      const rateCHGSerno = this.$xutils.getSEQWithParamFromServer('RATE_CHG_SERNO');
      const data = {
        'modifyType': selPars.modifyType,
        'serno': rateCHGSerno
      };
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/datamodify/create',
        data: data,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            row = yufp.clone(response.data);
            row['opType'] = 'ADD';
            row['serno'] = rateCHGSerno;
            row.callback = function () {
              _this.$refs.refTable.remoteData();
            };
            this.opendTab(row, '数据修改申请', row.serno);
            _this.visiable = false;
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    opendTab (params, title, key) {
      this.$router.addTab({
        name: 'zrcbank/biz/bizchg/iqpdatamodify/iqpDataModifyInfo',
        key: 'custom_view_' + key + '_' + new Date().getTime(),
        title: title,
        data: params
      });
    },
    /**
       * 修改
       */
    onUpdate (updateFlag) {
      let _this = this;
      let row = this.$refs.refTable.selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      if(updateFlag){
        if (row.approveStatus == '000' || row.approveStatus == '992') {
          row['opType'] = 'EDIT' ;
          row.callback = function () {
            _this.$refs.refTable.remoteData();
          };
          this.opendTab(row, '数据修改', row.serno);
        } else {
          this.$xutils.showMsgBox('提示', '只有待发起和打回状态才能进行修改！');
          return;
        }
      }else{
         row['opType'] = 'VIEW';
          row.callback = function () {
            _this.$refs.refTable.remoteData();
          };
          this.opendTab(row, '数据修改申请查看', row.serno);
      }
    },
    onUpdate2 (updateFlag) {
      let _this = this;
      let row = this.$refs.refTableOld.selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      row['opType'] = updateFlag ? 'EDIT' : 'VIEW';
      row.callback = function () {
        _this.$refs.refTableOld.remoteData();
      };
      this.opendTab(row, updateFlag ? '数据修改申请修改' : '数据修改申请查看', row.serno);
    },
    onDelete () {
      var selectionsAry = this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let row = this.$refs.refTable.selections[0];
      if (row.approveStatus != '000') {
        this.$message({type: 'warning', message: '仅有待发起状态可以删除！'});
        return;
      }
      // 进行逻辑删除
      this.delete(row.serno);
    },
    delete: function (id) {
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            _this.$request({
              url: this.$backend.cmisBiz + '/api/datamodify/batchdelete/' + id,
              method: 'post'
            }).then((response) => {
              if (response.code == '0') {
                _this.$refs.refTable.remoteData();
                _this.$message('删除成功!');
              }
            }).catch(() => {
              // 处理请求失败的情况
              _this.$message({ message: '删除失败!', type: 'error' });
            });
          }
        }
      });
    }
  }
};
</script>
