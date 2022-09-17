<template>
<div></div>
</template>
<script>
/**
 * 查询规则结果信息
 */
const par = {};

let resultAry = [];

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var par = this.pageParams;

      // 定义按钮
      let buttonStr = '确认提交/confirm';

      // 查询执行结果
      resultAry = par.result;

      let basicConfList = [];

      resultAry.forEach(d => {
        // 判断是否进行拦截
        if (d.notiType == '01' && d.OUT_RETURNCODE == 'FAIL') {
          // 拦截类型
          buttonStr = '校验不通过点击关闭/confail';
        }

        // 添加返回参数
        const basicConf = {};

        basicConf['noti_type'] = d.notiType;
        basicConf['rule_item_name'] = d.ruleItemName;
        basicConf['out_return_info'] = d.OUT_CHECKINFO;

        if (d.notiType == '02' && d.OUT_RETURNCODE == 'FAIL') {
          // 预警
          basicConf['out_return_code'] = 'WARNING';
        } else {
          basicConf['out_return_code'] = d.OUT_RETURNCODE;
        }

        basicConfList.push(basicConf);
      });

      // 列表加载
      this.d1_BillList = this.$refs.d1_BillList;

      this.d1_BillList.setBillListData(basicConfList);
    },

    confirm (params) {
      // 校验通过,可以正常提交流程
      const data = {
        'code': '1'
      };

      // 数据回调
      this.$dialog.close(this.dialogId, data);
    },

    confail (params) {
      // 校验失败，流程不允许提交
      const data = {
        'code': '0'
      };

      // 数据回调
      this.$dialog.close(this.dialogId, data);
    }
  }
};
</script>
