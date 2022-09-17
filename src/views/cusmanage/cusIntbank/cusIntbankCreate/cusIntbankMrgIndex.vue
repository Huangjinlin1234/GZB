<template>
  <d1-billlist ref="d1_BillList" :formType="this.cusCorp.viewType && this.cusCorp.viewType === 'VIEW' ? 'VIEW' : 'ADD'"></d1-billlist>
</template>
<script>
import d1Billlist from './cusIntbankMrg_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    cusCorp: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null,
      classData: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 高管新增信息
       * @constructor
       */
    // 创建高管人员信息
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.setAppendSQLCondition({ 'intbankCusId': this.cusCorp.cusId });
      this.d1_BillList.queryDataByCondition();
    },

    // 新增
    doAdd () {
      var _this = this;
      var data = {};
      data['intbankCusId'] = this.cusCorp.cusId;
      _this.$dialog.open(
        '高管新增向导',
        'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankAddIndex',
        600,
        300,
        data,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },

    // 修改
    doUpdate () {
      var _this = this;
      var json = _this.$refs.d1_BillList.getSelectedRowData();
      if (!json) {
        _this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      _this.getClassUrl(json.mrgCls);
      // 业务条线
      json['op'] = 'edit';
      _this.$dialog.open(
        _this.classData.desc,
        _this.classData.url,
        1000,
        400,
        json,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },

    // 查看
    doView () {
      var json = this.$refs.d1_BillList.getSelectedRowData();
      if (!json) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      this.getClassUrl(json.mrgCls);
      // 业务条线
      json['op'] = 'details';
      this.$dialog.open(
        this.classData.desc,
        this.classData.url,
        1000,
        400,
        json,
        () => {}
      );
    },

    // 根据高管类别获取跳转路径
    getClassUrl (mrgCls) {
      var data = {};
      data['01'] = {'desc': '高管信息新增法人代表', 'url': 'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankAdd1Index'};
      data['02'] = {'desc': '高管信息新增控制人', 'url': 'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankAdd2Index'};
      data['03'] = {'desc': '高管信息新增经办人', 'url': 'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankAdd3Index'};
      data['04'] = {'desc': '高管信息新增受益人', 'url': 'cusmanage/cusIntbank/cusIntbankCreate/cusIntbankAdd4Index'};
      this.classData = data[mrgCls];
    }
  }
};
</script>
