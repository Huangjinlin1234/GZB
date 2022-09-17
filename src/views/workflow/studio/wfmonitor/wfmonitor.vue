
<template>
  <yu-panel title="全局监控" :collapse-hide="false">
    <el-row :gutter="4" style="padding-bottom: 15px;">
      <el-col :span="15" style="font-size:18px; padding-top:15px">
        <div>当前系统流程实例办理数量统计</div>
      </el-col>
    </el-row>
    <div id="myChart" style="width:500px; height:300px;"></div>
    <el-row :gutter="4" style="padding-bottom: 15px;">
      <el-col :span="15" style="font-size:18px; padding-top:15px">
        <div>用户待办数量统计</div>
      </el-col>
    </el-row>
    <el-table-x ref="reftable" :row-index="true" :base-params="baseParams" :data-url="urls.index" :table-columns="tableColumns"></el-table-x>
  </yu-panel>
</template>
<script>
export default {
  data: function () {
    return {
      urls: {
        index: backend.workflowService + '/api/monitor/getAllUserTodoNum',
        todo: backend.workflowService + '/api/monitor/getTodoNum',
        done: backend.workflowService + '/api/monitor/getDoneNum'
      },
      tableColumns: [{
        label: '办理人姓名',
        prop: 'userName',
        resizable: true
      }, {
        label: '办理人ID',
        prop: 'userId',
        resizable: true,
        hidden: false
      }, {
        label: '待办数量',
        prop: 'doNum',
        resizable: true,
        hidden: false
      }, {
        label: '系统id',
        prop: 'systemId',
        resizable: true,
        hidden: true
      }, {
        label: '统计月份',
        prop: 'flowState',
        resizable: true,
        hidden: true
      }, {
        label: '管理员机构id',
        prop: 'orgId',
        resizable: true,
        hidden: true
      }],
      baseParams: {
        condition: JSON.stringify({})
      },
      date: ['办理中流程实例数量', '已办结流程实例数量'],
      datedata: [],
      height: yufp.frame.size().height - 103
    };
  },
  created: function () {
    var _this = this;
    var param = {
      condition: JSON.stringify({})
    };
    yufp.service.request({
      method: 'GET',
      url: _this.urls.todo,
      data: param,
      callback: function (code, message, response) {
        if (response.code == 0) {
          if (response.data != null) {
            _this.datedata[0] = response.data;
            yufp.service.request({
              method: 'GET',
              url: _this.urls.done,
              data: param,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  if (response.data != null) {
                    _this.datedata[1] = response.data;
                    _this.$nextTick(() => {
                      _this.echart();
                    });
                  }
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '获取数据异常:' + response.message.substring(0, 100),
                    type: 'error'
                  });
                }
              }
            });
          }
        } else {
          _this.$message({
            duration: 4000,
            message: '获取数据异常:' + response.message.substring(0, 100),
            type: 'error'
          });
        }
      }
    });
  },
  methods: {
    echart: function () {
      var echartsWarp = document.getElementById('myChart'); // 获取dom

      var resizeWorldMapContainer = function () {
        // 用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
        echartsWarp.style.width = window.innerWidth * 3 / 4 + 'px';
        echartsWarp.style.height = window.innerheight / 3 + 'px';
      };

      resizeWorldMapContainer(); // 设置容器高宽*/

      var myChart = window.echarts.init(echartsWarp); // 基于准备好的dom，初始化echarts实例

      window.onresize = function () {
        // 用于使chart自适应高度和宽度
        resizeWorldMapContainer(); // 重置容器高宽

        myChart.resize();
      };

      var option = {
        color: ['#687aee'],
        toolbox: {
          show: true,
          feature: {// saveAsImage: {}
          }
        },
        tooltip: {
          // 提示信息
          trigger: 'axis'
        },
        xAxis: {
          // X项
          type: 'category',
          data: this.date,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          markPoint: {
            data: [{
              type: 'max',
              name: '最大值'
            }, {
              type: 'min',
              name: '最小值'
            }]
          },
          markLine: {
            data: [{
              type: 'average',
              name: '平均值'
            }]
          },
          data: this.datedata,
          // 没一X项的Y值数据
          type: 'bar'
        }]
      };
      myChart.setOption(option);
    }
  }

}
</script>
