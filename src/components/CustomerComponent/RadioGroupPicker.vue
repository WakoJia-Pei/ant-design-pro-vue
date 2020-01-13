<template>
  <div class="form-header">
    <a-radio-group v-model="reportType" class="form-header-item radio-group" @change="onChange">
      <a-radio-button value="day" @click="showDayCalendar = true">日报</a-radio-button>
      <a-radio-button value="month" @click="showMonthCalendar = true">月报</a-radio-button>
      <a-radio-button value="year" @click="showYearCalendar = true">年报</a-radio-button>
    </a-radio-group>
    <a-date-picker @change="onPickerDayChange" v-show="showDayCalendar" :open="showDayCalendar" class="timeSpanPup"/>
    <a-month-picker @change="onPickerMonthChange" v-show="showMonthCalendar" :open="showMonthCalendar" class="timeSpanPup"/>
    <div v-show="showYearCalendar" class="timeSpanPup calendar-wrap">
      <div class="ant-calendar-month-panel-body">
        <div
          class="ant-calendar-month-panel-cell"
          :class="item === dateRange ? 'ant-calendar-month-panel-selected-cell': ''"
          v-for="(item, index) in yearList"
          :key="index"
          @click="onPickerYearChange(item)">
          <a class="ant-calendar-month-panel-month">{{ item }}年</a>
        </div>
      </div>
    </div>
    <div class="maskCalendar" v-show="showDayCalendar || showMonthCalendar || showYearCalendar" @click="onHideCalendar"></div>

    <a-range-picker size="default" @change="onPickerChange" class="form-header-item picker"/>
  </div>
</template>

<script>
import { formatDateParams } from '@/utils/util'
export default {
  name: 'RadioGroupPicker',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    yearList: {
      type: Array
    }
  },
  data () {
    return {
      reportType: 'day',
      lastReportType: 'day',
      dateRange: '',
      showDayCalendar: false,
      showMonthCalendar: false,
      showYearCalendar: false,
      showMaskCalendar: false
    }
  },
  beforeDestroy: function () {
    document.body.removeAttribute('class', 'cus-calendar-body')
  },
  mounted () {
    document.getElementsByTagName('body')[0].className = 'cus-calendar-body'
  },
  methods: {
    onChange (e) {
      this.showMaskCalendar = true
      if (['day', 'month', 'year'].includes(e.target.value)) {
        this.showDayCalendar = e.target.value === 'day'
        this.showMonthCalendar = e.target.value === 'month'
        this.showYearCalendar = e.target.value === 'year'
        if (e.target.value === 'year') {
          this.dateRange = formatDateParams(e.target.value)
        }
      }
    },

    // 选择日报-日期
    onPickerDayChange (date, dateString) {
      this.dateRange = dateString
      this.lastReportType = this.reportType
      this.$emit('onPickerChange', dateString)
      this.onHideCalendar('C')
    },

    // 选择月报-月份
    onPickerMonthChange (date, dateString) {
      this.dateRange = dateString
      this.lastReportType = this.reportType
      this.$emit('onPickerChange', dateString)
      this.onHideCalendar('C')
    },

    // 选择年报-年份
    onPickerYearChange (val) {
      this.dateRange = val
      this.lastReportType = this.reportType
      this.$emit('onPickerChange', val)
      this.onHideCalendar('C')
    },
    // 隐藏或关闭日报，月报，年报下拉框
    onHideCalendar (mode) {
      if (mode !== 'C') {
        this.reportType = this.lastReportType
      }
      this.showMaskCalendar = false
      this.showDayCalendar = false
      this.showMonthCalendar = false
      this.showYearCalendar = false
    },
    // 选择时间段
    onPickerChange (date, dateString) {
      if (dateString[0] && dateString[1]) {
        this.reportType = ''
        this.lastReportType = ''
        this.dateRange = dateString[0] + '~' + dateString[1]
        this.$emit('onPickerChange', this.dateRange)
      }
    }
  }
}
</script>

<style lang="less">
  .form-header{
    position: relative;
  }
  .timeSpanPup{
    position: absolute;
    top: 36px;
    right: 80px;
    z-index: 999;
    width: 278px;
  }
  .maskCalendar{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top:0;
    z-index: 880;
  }
  .calendar-wrap{
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    .ant-calendar-month-panel-body{
      display: flex;
      flex-wrap: wrap;
      padding: 16px 0;
    }
    .ant-calendar-month-panel-cell{
      width: 33.3%;
      padding: 10px 0;
    }
  }
  .echartsbox{
    width: 100%;
    height: 400px;
  }
  .cus-calendar-body{
    .ant-calendar-input-wrap{
      display: none;
    }
  }
</style>
