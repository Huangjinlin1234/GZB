<template>
  <!--
    @created by zhuly6 2020-05-06
    @updated by 詹煜彪
    @description 授信保证人担保额度测算表
  -->
  <div>
    <yu-panel title="授信保证人担保额度测算表" :hideFilter="false" :collapseHide="false">
    <span algin="right">单位：万元</span>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" request-type="POST" :base-params="baseParams" style="margin-top: 10px">
        <yu-xtable-column label="主键" prop="pkId" sortable hide-column></yu-xtable-column>
        <yu-xtable-column label="担保人客户编号" prop="guarCusId" width=""></yu-xtable-column>
        <yu-xtable-column label="担保人客户名称" prop="guarCusName" width=""></yu-xtable-column>
        <yu-xtable-column label="企业规模" prop="corpScale" data-code="STD_CORP_SCALE" width=""></yu-xtable-column>
        <yu-xtable-column label="可担保额度" prop="evalGuarLmtAmt" width="">
        <template slot-scope="scope">
                <span>{{ parseFloat(parseFloat(scope.row.evalGuarLmtAmt / 10000).toFixed(2)) }}</span>
              </template>
        </yu-xtable-column>
        <yu-xtable-column label="净资产值" prop="pureAssetValue" width="">
        <template slot-scope="scope">
                <span>{{ parseFloat(parseFloat(scope.row.pureAssetValue / 10000).toFixed(2)) }}</span>
              </template></yu-xtable-column>
        <yu-xtable-column label="放大倍数" prop="enalrgeTimes" width=""></yu-xtable-column>
        <yu-xtable-column label="或有负债"  width="120">
        <template slot-scope="scope">
          <span>{{ parseFloat(parseFloat(scope.row.cntgDebtGuar+scope.row.cntgDebtOther)/10000).toFixed(2)?parseFloat(parseFloat(scope.row.cntgDebtGuar+scope.row.cntgDebtOther)/10000).toFixed(2):0.00 }}</span>
        </template>
        </yu-xtable-column>
        <yu-xtable-column label="已存在的对外保证担保" prop="cntgDebtGuar" width="">
         <template slot-scope="scope">
                <span>{{ parseFloat(parseFloat(scope.row.cntgDebtGuar / 10000).toFixed(2)) }}</span>
              </template>
        </yu-xtable-column>
        <yu-xtable-column label="其它可确认的或有负债" prop="cntgDebtOther" width="">
        <template slot-scope="scope">
                <span>{{ parseFloat(parseFloat(scope.row.cntgDebtOther / 10000).toFixed(2)) }}</span>
              </template></yu-xtable-column>
        <yu-xtable-column label="备注" prop="remark" width=""></yu-xtable-column>
        <yu-xtable-column prop="todo" label="操作">
          <template slot-scope="scope">
            <yu-button-drop set-index="0" :show-length="3" type="text">
              <yu-button @click="modifyFn(scope.row)" type="text" v-show="btnShow">修改</yu-button>
              <yu-button @click="viewFn(scope.row)" type="text" >查看</yu-button>
              <yu-button @click="deleteFn(scope.row)" type="text" v-show="btnShow">删除</yu-button>
            </yu-button-drop>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="printFn">打印</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_CORP_SCALE,STD_ZB_OPR_TYPE,STD_ZB_OPR_TYPE');
export default {
  components: { YufpDemoSelector },
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: '',
      formdata: {},
      baseParams: {},
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
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      op: '',
      btnShow: true,
      serno: '',
      isGrp: false
    };
  },

  mounted () {
    var _this = this;
    _this.init();
  },

  methods: {
    init: function () {
      var _this = this;
      if (this.pageParams) {
        _this.serno = this.pageParams.singleSerno;
        _this.btnShow = this.pageParams.btnShow;
        _this.isGrp = this.pageParams.isGrp;
      } else if (this.$route.meta.params) {
        _this.serno = this.$route.meta.params.serno;
      } else if (this.getFactory().contextData) {
        _this.serno = this.getFactory().contextData.singleSerno;
        _this.btnShow = this.getFactory().contextData.btnShow;
      }
      if (!_this.serno || _this.serno == null || _this.serno == '') {
        _this.$message({ message: '该成员未申报信息', type: 'warning' });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url:
            _this.$backend.cmisBiz + '/api/lmtgrrlimiteval/initLmtGrrLimitEval',
        data: _this.serno,
        callback: function (code, message, response) {
          _this.dataUrl =
              _this.$backend.cmisBiz +
              '/api/lmtgrrlimiteval/queryLmtgrrlimiteval';
          _this.baseParams = { condition: { serno: _this.serno } };
        }
      });
    },
    // 修改
    modifyFn: function (data) {
      var _this = this;
      // if (_this.$refs.refTable.selections.length != 1) {
      //   _this.$message({ message: '请先选择一条记录', type: 'warning' });
      //   return;
      // }
      _this.$nextTick(function () {
        this.$dialog.open(
          '授信保证人担保额度测算表',
          'bizmanage/lmtBiz/lmtGrrLimitEvalBiz/lmtGrrLimitEvalInfo',
          -1,
          -1,
          {
            // pkId: _this.$refs.refTable.selections[0].pkId
            pkId: data.pkId
          },
          () => {
            this.$refs.refTable.remoteData();
          }
        );
      });
    },
    // 查看
    viewFn: function (data) {
      var _this = this;
      // if (_this.$refs.refTable.selections.length != 1) {
      //   _this.$message({ message: '请先选择一条记录', type: 'warning' });
      //   return;
      // }
      _this.$nextTick(function () {
        this.$dialog.open(
          '授信保证人担保额度测算表',
          'bizmanage/lmtBiz/lmtGrrLimitEvalBiz/lmtGrrLimitEvalView',
          -1,
          -1,
          {
            pkId: data.pkId
          }
        );
      });
    },
    // 打印
    printFn: function () {
      var _this = this;
      var params = {};
      params.serno = _this.serno;
      if (_this.serno == null || _this.serno == '') {
        _this.$xutils.showMsgBox(
          '提示',
          '流水号为空!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      if (!_this.isGrp) {
        let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
        let keydemo = 'frptdemobzrdbedcsb';
        params.src =
        _this.$backend.frptRptService +
        'DGSX-BZRDBEDCSB.cpt&op=view&serno=' +
        params.serno;
        _this.$router.addTab({
        // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: keydemo, // 必传
          // 页签名称
          title: '保证人担保额度测算表',
          // 传递的业务数据，可选配置
          data: params
        });
      } else {
        let jsoPar = params;
        jsoPar['src'] = _this.$backend.frptRptService +
        'DGSX-BZRDBEDCSB.cpt&op=view&serno=' +
        params.serno;
        this.$dialog.open(
          '成员保证人担保额度测算表',
          'zrcbank/biz/pvpLoanApp/frptdemo',
          -1,
          -1,
          jsoPar
        );
      }
    },
    // 删除
    deleteFn: function (data) {
      var _this = this;
      // var selections = _this.$refs.refTable.selections;
      // if (selections.length < 1) {
      //   _this.$message({ message: '请先选择一条记录', type: 'warning' });
      //   return;
      // }
      _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtgrrlimiteval/delete/' + data.pkId,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({ message: '删除成功', type: 'success' });
                } else {
                  _this.$message({ message: '删除失败', type: 'error' });
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