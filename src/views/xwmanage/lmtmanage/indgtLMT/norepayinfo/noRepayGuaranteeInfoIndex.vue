<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './noRepayGuaranteeInfo_d1_BillList.vue';
yufp.lookup.reg('STD_PAWN_TYPE');
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dywxx: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 无还本续贷抵押品基础信息页面
    /* 初始化页面*/
    afterInit () {
      this.dywxx = this.$refs.d1_BillList;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
        this.surveyType = this.$route.params.hasOwnProperty('surveyType') ? this.$route.meta.params.surveyType : this.getFactory().bizPageData.instanceInfo.param.surveyType;
        if (this.$route.meta.params.PageType != '01' && this.$route.meta.params.PageType != undefined) {
          this.dywxx.showBtn = true;
        }
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }
      // 编辑
      this.dywxx.baseParams = {condition: {surveySerno: this.surveySerno}};
    },

    /* 新增按钮*/
    doAdd () {
      const surveySerno = this.surveySerno;
      const PageType = '02';
      const hiddenType = this.$route.meta.params.hiddenType;
      const surveyType = this.surveyType;
      this.$dialog.open(
        '抵押信息录入',
        'xwmanage/lmtmanage/indgtLMT/norepayinfo/noRepayGuaranteeUpdatePageIndex',
        1500,
        1500,
        {
          surveySerno,
          PageType,
          hiddenType,
          surveyType
        },
        () => {
          this.dywxx.queryDataByCondition('surveySerno = ' + surveySerno);
        }
      );
    },

    // 修改
    update () {
      const jsoPar = this.dywxx.getSelectedRowData();
      if (jsoPar == null || jsoPar == '') {
        this.$message({message: '请选择一条数据!', type: 'warning'});
        return;
      }
      const hiddenType = this.$route.meta.params.hiddenType;
      jsoPar['surveySerno'] = this.surveySerno;
      jsoPar['PageType'] = '03';
      jsoPar['hiddenType'] = hiddenType;
      jsoPar['surveyType'] = this.surveyType;
      this.$dialog.open(
        '抵押信息录入',
        'xwmanage/lmtmanage/indgtLMT/norepayinfo/noRepayGuaranteeUpdatePageIndex',
        1500,
        1500,
        jsoPar,
        () => {
          this.dywxx.queryDataByCondition('surveySerno = ' + this.surveySerno);
        }
      );
    },
    // 查看
    view () {
      const jsoPar = this.dywxx.getSelectedRowData();
      const hiddenType = this.$route.meta.params.hiddenType;
      if (jsoPar == null || jsoPar == '') {
        this.$message({message: '请选择一条数据!', type: 'warning'});
        return;
      }
      jsoPar['surveySerno'] = this.surveySerno;
      jsoPar['PageType'] = '01';
      jsoPar['hiddenType'] = hiddenType;
      jsoPar['surveyType'] = this.surveyType;
      this.$dialog.open(
        '抵押信息录入',
        'xwmanage/lmtmanage/indgtLMT/norepayinfo/noRepayGuaranteeUpdatePageIndex',
        1500,
        1500,
        jsoPar,
        () => {
          this.dywxx.queryDataByCondition('surveySerno = ' + this.surveySerno);
        }
      );
    },

    viewReport () {
      var _this = this;
      const jsoPar = this.dywxx.getSelectedRowData();
      const hiddenType = this.$route.meta.params.hiddenType;
      if (jsoPar == null || jsoPar == '') {
        this.$message({message: '请选择一条数据!', type: 'warning'});
        return;
      }

      jsoPar['surveySerno'] = this.surveySerno;
      jsoPar['PageType'] = '01';
      jsoPar['hiddenType'] = hiddenType;
      jsoPar['surveyType'] = this.surveyType;
      this.$dialog.open(
        '报表打印呢',
        'xwmanage/lmtmanage/indgtLMT/norepayinfo/noRepayGuaranteeInfoPrintIndex',
        1000,
        1000,
        jsoPar,
        () => {
          this.dywxx.queryDataByCondition('surveySerno = ' + this.surveySerno);
        }
      );
    },
    /** 查看抵质押物评估信息 */
    viewGuar () {
      var _this = this;
      const jsoPar = _this.dywxx.getSelectedRowData();
      if (jsoPar == null || jsoPar == '') {
        this.$message({message: '请选择一条数据!', type: 'warning'});
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtguareinfo/selectguar',
        data: {pkId: jsoPar.pkId},
        callback: function (code, message, response) {
          if (response.code == 0) {
            /** 成功返回数据则填充 */
            _this.dywxx.visiableCus = true;
            _this.$nextTick(function () {
              yufp.clone(response.data, _this.dywxx.dialogData);
            });
          } else {
            _this.$message({ message: response.message, type: 'warning' });
          }
        }
      });
    },
    /** 通过主键PKID删除 */
    deleteByPkId () {
      var _this = this;
      const jsoPar = _this.dywxx.getSelectedRowData();
      if (jsoPar == null || jsoPar == '') {
        this.$message({message: '请选择一条数据!', type: 'warning'});
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtguareinfo/deletebypkid',
        data: {pkId: jsoPar.pkId},
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '删除成功', type: 'success' });
            _this.dywxx.$refs.refTable.remoteData();
          } else {
            _this.$message({ message: '删除失败', type: 'warning' });
          }
        }
      });
    }
  }
};
</script>
