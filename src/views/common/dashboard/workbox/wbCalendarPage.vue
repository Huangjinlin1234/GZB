<template>
  <!--
    @created by tangxun 2021-06-11
    @updated by
    @description 工作日历
  -->
  <yu-row class="my-work-calendar">
    <yu-col :span="16">
      <el-calendar v-model="value">
        <template slot="dateCell" slot-scope="{ date, data }">
          <div @click="changeDate(date, data)">
            <i class="el-icon-plus"  @click="addPage"></i>
            <!--<span></span>-->
            <div>{{ date.getDate() }}</div>
            <div :class="{showPoint: monthData[getDateStr(date)]&&monthData[getDateStr(date)].length>0}">{{ monthData[getDateStr(date)]&&monthData[getDateStr(date)].length>0?monthData[getDateStr(date)][0].desc:'' }}</div>
            <div :class="{showPoint: monthData[getDateStr(date)]&&monthData[getDateStr(date)].length>1}">{{ monthData[getDateStr(date)]&&monthData[getDateStr(date)].length>1?monthData[getDateStr(date)][1].desc:'' }}</div>
            <div v-if="monthData[getDateStr(date)]&&monthData[getDateStr(date)].length>0">共{{  monthData[getDateStr(date)]&&monthData[getDateStr(date)].length>0?monthData[getDateStr(date)].length:'0'  }}条<i>></i></div>
          </div>
        </template>
      </el-calendar>
    </yu-col>
    <yu-col :span="8" class="todo-list">
      <div>{{ curDatestr.substr(5) }}</div>
      <div>共{{ wbworkcal.length }}条</div>
      <yu-button icon="plus" @click="addPage">新增</yu-button>
      <div v-for="(item, i) in wbworkcal" :key="i" class="date-item">
        <div>待办提醒</div>
        <i class="el-icon-delete2"  @click="delWbworkcal(item)"></i>
        <div> {{ showTime(item.calendarDate) }}   {{ item.content }}</div>

      </div>
    </yu-col>
    <yu-xdialog title="新增工作日历" :visible.sync="addcalendardialogVisible"  :close-on-press-escape="true">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="日期" placeholder="日期" name="calendarDate" @change="saveTemeDate" ctype="yu-date-picker" time-arrow-control type="datetime" value-format="yyyy-MM-dd HH:mm"></yu-xform-item>
          <yu-xform-item label="提醒类型" placeholder="提醒类型" name="remindType" ctype="select" data-code="STD_WB_REMIND_TYPE"></yu-xform-item>
          <yu-xform-item label="内容" placeholder="内容" name="content" ctype="textarea" :autosize="{ minRows: 3}" maxlength="500" :colspan="24"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="saveFn">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="addcalendardialogVisible = !addcalendardialogVisible">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </yu-row>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      addcalendardialogVisible: false,
      value: new Date(),
      wbworkcal: [],
      addUrl: `${backend.cmisCfg}/api/wbworkcal/create`,
      selectDate: '',
      curDatestr: '',
      monthData: {}
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  created () {
    // 此处，可根据用户角色信息，动态绑定对应的组件
    // this.currentRole = 'DefaultDashboard'
    this.queryMonthData(yufp.util.dateFormat(new Date()));
  },
  mounted () {
    // 默认展示当前日期
    this.changeDate(new Date());
    // 日历按钮绑定事件
    this.$nextTick(() => {
      let prevBtn = document.querySelector('.my-work-calendar .el-calendar__button-group .el-button-group>button:nth-child(1)');
      prevBtn.addEventListener('click', () => {
        console.log('prevBtn');
      });
    });
    this.$nextTick(() => {
      let prevBtn = document.querySelector('.my-work-calendar .el-calendar__button-group .el-button-group>button:nth-child(2)');
      prevBtn.addEventListener('click', () => {
        this.changeDate(new Date());
      });
    });
    this.$nextTick(() => {
      let prevBtn = document.querySelector('.my-work-calendar .el-calendar__button-group .el-button-group>button:nth-child(3)');
      prevBtn.addEventListener('click', () => {
        console.log('prevBt333n');
      });
    });
  },
  methods: {
    // 查询啊整个月的数据
    queryMonthData (date) {
      this.$request({
        url: backend.cmisCfg + '/api/wbworkcal/query/all',
        data: JSON.stringify({condition: JSON.stringify({curMonth: date.substr(0, 7), inputId: this.loginCode}), sort: 'calendarDate'}),
        method: 'post'
      }).then(({ code, message, data }) => {
        if (data) {
          let monthData = {};
          for (let i = 0; i < data.length; i++) {
            let key = data[i].calendarDate.substr(0, 10);
            if (data[i].content.length > 5) {
              data[i].desc = data[i].content.substr(0, 5) + '...';
            } else {
              data[i].desc = data[i].content;
            }
            if (monthData[key]) {
              monthData[key].push(data[i]);
            } else {
              monthData[key] = [];
              monthData[key].push(data[i]);
            }
          }
          for (let key in monthData) {
            this.$set(this.monthData, key, monthData[key]);
          }
        }
      });
    },
    getView (date) {
      return this.monthData[yufp.util.dateFormat(date)];
    },
    getDateStr (date) {
      return yufp.util.dateFormat(date, '{y}-{m}-{d}');
    },
    /** 保存临时时间 */
    saveTemeDate (val) {
      this.selectDate = val;
    },
    /** 新增提醒事项 */
    saveFn () {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      model.calendarDate = yufp.util.dateFormat(this.selectDate);
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.addUrl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.wbworkcal.push(response.data);
            _this.$message({ message: '数据新增成功！', type: 'info'});
            _this.addcalendardialogVisible = false;
          } else {
            _this.$message({ message: '数据新增失败！', type: 'error'});
          }
        }
      });
    },
    delWbworkcal (item) {
      let _this = this;
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisCfg + '/api/wbworkcal/delete/' + item.serno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info'});
                  for (let i = 0; i < _this.wbworkcal.length; i++) {
                    if (_this.wbworkcal[i].serno == item.serno) {
                      _this.wbworkcal.splice(i, 1);
                    }
                  }
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error'});
                }
              }
            });
          }
        }
      });
    },
    showTime (date) {
      return yufp.util.dateFormat(date, '{h}:{i}');
    },
    /** 打开新增页面 */
    addPage: function () {
      let _this = this;
      this.addcalendardialogVisible = true;
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },
    /** 打开详情页面 */
    changeDate (date, data) {
      let datestr = yufp.util.dateFormat(date, '{y}-{m}-{d}');
      if (this.curDatestr && this.curDatestr.substr(0, 7) != datestr.substr(0, 7)) {
        this.queryMonthData(datestr);
      }
      this.curDatestr = datestr;
      let model = {
        calendarDate: datestr,
        inputId: this.loginCode
      };
      this.$request({
        url: backend.cmisCfg + '/api/wbworkcal/',
        data: JSON.stringify({condition: JSON.stringify(model), sort: 'calendarDate'}),
        method: 'post'
      })
        .then(({ code, message, data }) => {
          if (data) {
            this.wbworkcal = data;
          }
        });
    }
  }
};
</script>
<style>
#todoTitle{color: chartreuse;}
.todoDaycount{float: right;}
.my-work-calendar .el-calendar-day>div{height: 100%;}
.my-work-calendar .el-calendar-day .el-badge{float: right;    margin-right: 15px;    margin-top: 7px;}
/** 日历最后一行不显示 */
.el-calendar__body tbody .el-calendar-table__row:last-child {  display: none;}
</style>
