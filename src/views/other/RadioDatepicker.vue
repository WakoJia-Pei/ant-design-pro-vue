<template>
  <div class="card-head">
    <a-card
      style="min-height: calc(100vh - 355px);"
      :tabList="tabList"
      :activeTabKey="modal"
      @tabChange="modal => onTabChange(modal, 'modal')">
      <!--头部操作栏-->
      <template slot="extra">
        <div class="extra-wrapper">
          <div class="form-header">
            <div class="form-header-search" style="display: flex">
              <a-select v-model="taskItem" class="form-header-item select" placeholder="选择任务">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option v-for="(item, index) in selectOpts1" :key="index" :value="item.taskId">{{ item.taskName }}</a-select-option>
              </a-select>
              <a-select v-model="seatItem" class="form-header-item select" placeholder="选择坐席">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option v-for="(item, index) in selectOpts3" :key="index" :value="item.seatId">{{ item.seatName }}</a-select-option>
              </a-select>

              <radio-group-picker :yearList="yearList" @onPickerChange="onRadioPickerChange"/>

              <a-range-picker size="default" @change="onPickerChange" class="form-header-item picker"/>
              <a-select v-model="interval" class="form-header-item select" style="width: 94px">
                <a-select-option value="1h">按小时</a-select-option>
                <a-select-option value="30m">按半小时</a-select-option>
              </a-select>
            </div>
            <div class="form-header-action">
              <a-button type="primary" class="form-action-item" @click="exportRecords"><a-icon type="cloud-download" />导出</a-button>
            </div>
          </div>
        </div>
      </template>

      <!--图表-->
      <div style="height: 400px;margin-bottom: 50px">
        <a-skeleton active :paragraph="{rows: 9}" v-if="chartLoading"/>
        <div v-else-if="totalCount.length !== 0">
          <div style="text-align: center; font-size: 20px; padding-bottom: 16px;">{{ chartTitle }}</div>
          <div id="chartLine" class="echartsbox"></div>
        </div>
        <div v-else class="nodata" style="height: 400px"></div>
      </div>
    </a-card>
  </div>
</template>

<script>
import '@/components/CustomerComponent/customer_style.less'
import G2 from '@antv/g2'
import { GetReportTaskList } from '@/api/manage'
import { formatDateParams } from '@/utils/util'
import RadioGroupPicker from '@/components/CustomerComponent/RadioGroupPicker'
const DataSet = require('@antv/data-set')

export default {
  name: 'RadioDatepicker',
  components: {
    RadioGroupPicker
  },
  data () {
    return {
      modal: 'call',
      tabList: [
        { key: 'call', tab: '呼叫次数' },
        { key: 'duration', tab: '通话时长' },
        { key: 'contactRate', tab: '通话接通率' }
      ],
      taskItem: '0',
      skillItem: '0',
      seatItem: '0',
      selectOpts1: [],
      selectOpts3: [],
      timeSpan: '', // 传给后台的日期参数
      dateRange: '', // 图表标题显示日期
      interval: '1h',
      totalCount: [],
      chartLoading: false,

      yearList: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
    }
  },

  created () {
    this.getTask()
  },
  mounted () {
    this.dateRange = formatDateParams('day')
    // this.getChartData(this.taskItem, this.skillItem, this.seatItem, this.timeSpan, this.interval);
  },
  computed: {
    chartTitle () {
      // this.timeSpan = val; // 'YYYY' 年报
      return this.dateRange + ' ' + this.tabList.filter(item => item.key === this.modal)[0].tab + ' 统计图'
    }
  },
  watch: {
    taskItem (val) {
      console.log('第一个下拉菜单', val)
    },
    seatItem (val) {
      console.log('第三个下拉菜单', val)
    },

    dateRange (val) {
      const reg = /-+/g
      this.timeSpan = reg.test(val) ? val.replace(/-/g, '').replace(/~/g, '-') : val
      this.getChartData(this.taskItem, this.skillItem, this.seatItem, this.timeSpan, this.interval)
      console.log('时间选择器变化', this.timeSpan, val)
    },
    interval (val) {
      console.log('小时分类', val)
      this.getChartData(this.taskItem, this.skillItem, this.seatItem, this.timeSpan, val)
    }
  },
  methods: {
    onTabChange (key, type) {
      console.log(key, type)
      this[type] = key
      this.getChartData(this.taskItem, this.skillItem, this.seatItem, this.timeSpan, this.interval)
    },
    // 日报/月报/年报 切换
    onRadioPickerChange (str) {
      this.dateRange = str
      console.log('日报/月报/年报', str)
    },

    // 选择时间段
    onPickerChange (date, dateString) {
      this.dateRange = dateString[0] + '~' + dateString[1]
    },
    getTask () {
      // 获取任务列表
      // GetTaskFilter().then(res => {
      //   if (res.data.code === 0) {
      //     this.selectOpts1 = res.data.data
      //   }
      // })

      // 获取坐席列表
      // GetSeatFilter().then(res => {
      //   if (res.data.code === 0) {
      //     this.selectOpts3 = res.data.data
      //   }
      // })
    },

    // 导出统计报告
    exportRecords () {
      // ExportReportTask(this.taskId, this.skillId, this.seatId, this.timeSpan, this.interval, this.modal).then(res => {
      //   console.log(`导出${this.modal}统计信息`)
      // }).catch(() => {
      //   console.log(`导出${this.modal}统计信息`)
      // })
    },

    // 获取图表数据
    getChartData (taskId, skillId, seatId, timeSpan, interval) {
      // let reg = /-+/g;
      // this.timeSpan = reg.test(timeSpan) ? timeSpan.replace(/-/g, '') : timeSpan;
      this.chartLoading = true
      GetReportTaskList(taskId, skillId, seatId, this.timeSpan, interval, this.modal).then(res => {
        this.chartLoading = false
        if (res.result.code === 0 && res.result.data) {
          this.totalCount = res.result.data
          setTimeout(() => {
            this.chartLoading = false
            this.$nextTick(() => {
              this.chartGroupedLine(res.result.data, 'chartLine')
            })
          }, 0)
        }
      })
    },
    chartGroupedLine (data, id) {
      const ds = new DataSet()
      const dv = ds.createView().source(data)
      dv.transform({
        type: 'rename',
        map: {
          outTotal: '呼出总次数',
          outAnswer: '呼出接听次数',
          inTotal: '呼入总次数', // row.xxx 会被替换成 row.yyy
          inAnswer: '呼入接听次数' // row.xxx 会被替换成 row.yyy
        }
      })
      const lineMap = Object.keys(dv.rows[0]).filter(item => item !== 'span' && item !== 'total')
      // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
      dv.transform({
        type: 'fold',
        fields: lineMap, // 展开字段集
        key: 'name', // key字段
        value: 'value' // value字段
      })
      const chart = new G2.Chart({
        container: id,
        forceFit: true,
        height: 400,
        padding: ['auto', 80]
      })

      chart.source(dv, {
        span: {
          type: 'cat',
          range: [0, 1],
          alias: '时间范围'
        }
      })
      chart.axis('span', {
        label: {
          // offset: 60,
          offsetX: -50, // 在 offset 的基础上 x 方向的偏移量
          offsetY: 30, // 在 offset 的基础上 y 方向的偏移量
          // autoRotate: false,
          rotate: -60,
          textStyle: {
            textAlign: 'start', // 文本对齐方向，可取值为： start center end
            fill: '#404040', // 文本的颜色
            fontSize: '12', // 文本大小
            fontWeight: 'bold', // 文本粗细
            textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
          }
          // formatter(text, item, index) {},
        }
      })
      chart.legend({
        position: 'top'
      })
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      chart.line()
        .position('span*value')
        .color('name')
        .shape('circle') // smooth  circle
      chart
        .point()
        .position('span*value')
        .color('name')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
      chart.render()
    }
  }
}
</script>
<style lang="less" scoped>
  .card-head /deep/ .ant-tabs {
    margin: -42px 0 -17px;
    width: 20%;
  }
</style>
