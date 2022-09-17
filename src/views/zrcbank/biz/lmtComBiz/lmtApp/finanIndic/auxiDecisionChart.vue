<template>
  <div>
    <yu-container>
        <el-main>
            <yu-panel title="主要财务数据" :hideFilter="false" :collapseHide="false" >
                <yu-echarts ref="echarts1" :option="option1" width="600px" height="300px" ></yu-echarts>
            </yu-panel>
        </el-main>
        <el-main>
            <yu-panel title="销售融资" :hideFilter="false" :collapseHide="false" >
                <yu-echarts ref="echarts2" :option="option2" width="600px" height="300px" ></yu-echarts>
            </yu-panel>
        </el-main>
    </yu-container>
    <yu-container>
        <el-main>
            <yu-panel title="我行授用信分布" align="center" :hideFilter="false" :collapseHide="false" >
                <yu-echarts ref="echarts3" :option="option3" width="880px" height="400px"></yu-echarts>
            </yu-panel>
        </el-main>
    </yu-container>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      option1: {
        title: {
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: [],
          padding: [15, 0, 0, 10],
          textStyle: {
            color: '#666'
          }
        },
        grid: {
          top: '40',
          left: '0',
          right: '30',
          bottom: '15',
          containLabel: true
        },
        textStyle: {
          color: '#888'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          }
        },
        yAxis: {
          type: 'value',
          // min: 'dataMin',
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        series: []

      },
      option2: {
        color: ['#687AEE'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 8,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        textStyle: {
          color: '#949494'
        },
        legend: {
          data: [],
          padding: [15, 0, 0, 10],
          textStyle: {
            color: '#666'
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        series: []
      },
      option3: {
        color: ['#687AEE'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 8,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        textStyle: {
          color: '#949494'
        },
        legend: {
          data: ['我行授信金额', '我行用信余额'],
          padding: [15, 0, 0, 10],
          textStyle: {
            color: '#666'
          }
        },
        xAxis: {
          type: 'category',
          data: ['202101', '202102', '202103', '202104', '202105', '202106', '202107', '202108', '202109', '202110', '202111', '202112'],
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        series: [
          {
            name: '我行授信金额',
            type: 'line',
            // smooth: true,
            data: [],
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3
                },
                color: '#' + (Math.random() * 0xffffff << 0).toString(16)
              }
            }
          },
          {
            name: '我行用信余额',
            type: 'line',
            // smooth: true,
            data: [14410, 16452, 15090, 20843, 23390, 21330, 22020, 15410, 14452, 28200, 26043, 11090],
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3
                },
                color: '#' + (Math.random() * 0xffffff << 0).toString(16)
              }
            }
          }
        ]
      }
    };
  },

  created () {
    var _this = this;
    let data = {};
    var serno = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
    } else if (_this.getFactory().contextData.serno) {
      data = _this.getFactory().contextData;
      serno = data.serno;
    } else {
      data = _this.$route.meta.params;
      serno = data.serno;
    }
    // 获取财务报表年份信息
    _this.getCusIdBySerno(serno);
    // 当前年月
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    _this.option2.xAxis.data = [year - 2 + '年', year - 1 + '年', year + '年1-' + month + '月'];
    // 财务报表、调查报告折线图 数据加载
    yufp.service.request({
      async: false,
      method: 'POST',
      url: backend.cmisBiz + '/api/finanindicanaly/selectfinanindicanalyforoption',
      data: {serno: serno},
      callback: function (code, message, response) {
        // 财报折线图
        _this.option1.legend.data = response.data.option1LegendData;
        _this.option1.series = response.data.option1Series;
        for (let i = 0; i < response.data.option1Series.length; i++) {
          _this.option1.series[i].type = 'line';
          _this.option1.series[i].barWidth = '10';
          _this.option1.series[i].itemStyle = {
            normal: {
              color: '#' + (Math.random() * 0xffffff << 0).toString(16)
            }
          };
        }
        // 调查报告折线图
        _this.option2.legend.data = response.data.option2LegendData;
        _this.option2.series = response.data.option2Series;
        for (let i = 0; i < response.data.option2Series.length; i++) {
          _this.option2.series[i].type = 'line';
          _this.option2.series[i].barWidth = '10';
          _this.option2.series[i].itemStyle = {
            normal: {
              lineStyle: {
                width: 3
              },
              color: '#' + (Math.random() * 0xffffff << 0).toString(16)
            }
          };
        }
        debugger;
        // 授用信折线图
        _this.option3.xAxis.data = response.data.xValueData;
        _this.option3.series = [
          {
            name: '我行授信金额',
            type: 'line',
            // smooth: true,
            data: response.data.sxValueData,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3
                },
                color: '#' + (Math.random() * 0xffffff << 0).toString(16)
              }
            }
          },
          {
            name: '我行用信余额',
            type: 'line',
            // smooth: true,
            data: response.data.yxValueData,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3
                },
                color: '#' + (Math.random() * 0xffffff << 0).toString(16)
              }
            }
          }
        ];
      }
    });
  },

  mounted: function () {
    let _this = this;
    _this.$refs.echarts1.echartsInstance.on('click', function (params) {

    });
    _this.$refs.echarts2.echartsInstance.on('click', function (params) {

    });
    _this.$refs.echarts3.echartsInstance.on('click', function (params) {

    });
  },
  methods: {
    getCusIdBySerno (serno) {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: {serno: serno},
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            _this.getLastReportInfo(response.data.cusId);
          } else {
            // 当前年月
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            _this.option2.xAxis.data = [year - 2 + '年', year - 1 + '年', year + '年1-' + month + '月'];
          }
        }
      });
    },
    // 获取最近一期完成的财报
    getLastReportInfo: function (cusId) {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisCus + '/api/nrcs-cms/fncstatbase/q/fncstatbase/last',
        data: {cusId: cusId},
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            _this.option1.xAxis.data = [response.data.statPrd.substring(0, 4) - 2 + '年', response.data.statPrd.substring(0, 4) - 1 + '年', response.data.statPrd.substring(0, 4) + '年1-' + response.data.statPrd.substring(4, 6) + '月'];
          } else if (!response.data) {
            // 无财报信息  // 当前年月
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            _this.option2.xAxis.data = [year - 2 + '年', year - 1 + '年', year + '年1-' + month + '月'];
          } else {
            _this.$message({message: response.message, type: 'error'});
          }
        }
      });
    }
  }
};
</script>