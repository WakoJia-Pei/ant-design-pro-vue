<template>
  <a-card title="动态表头">
    <!--表格-->
    <div id="table">
      <a-table
        class="table-stripe"
        bordered
        :rowKey="record => record.word"
        :columns="columns"
        :dataSource="tableData"
        :pagination="false"
        :loading="loading"
        :scroll="tbScroll">
      </a-table>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'AntDtableHeaderDemo',
  data () {
    return {
      columns: [],
      loading: false,
      tableData: [],
      tbScroll: { x: 0 }
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData () {
      this.loading = true
      const data = [{
        word: '呼入次数',
        '00:00-02:00': parseInt(Math.random() * 100 + 1),
        '02:00-04:00': parseInt(Math.random() * 100 + 1),
        '04:00-06:00': parseInt(Math.random() * 100 + 1),
        '06:00-08:00': parseInt(Math.random() * 100 + 1),
        '08:00-10:00': parseInt(Math.random() * 100 + 1),
        '10:00-12:00': parseInt(Math.random() * 100 + 1),
        '12:00-14:00': parseInt(Math.random() * 100 + 1),
        '14:00-16:00': parseInt(Math.random() * 100 + 1),
        '16:00-18:00': parseInt(Math.random() * 100 + 1),
        '18:00-20:00': parseInt(Math.random() * 100 + 1),
        '20:00-22:00': parseInt(Math.random() * 100 + 1),
        '22:00-00:00': parseInt(Math.random() * 100 + 1),
        '22:00-00:01': parseInt(Math.random() * 100 + 1),
        '22:00-00:03': parseInt(Math.random() * 100 + 1),
        '22:00-00:04': parseInt(Math.random() * 100 + 1),
        '22:00-00:05': parseInt(Math.random() * 100 + 1),
        '22:00-00:06': parseInt(Math.random() * 100 + 1),
        '22:00-00:07': parseInt(Math.random() * 100 + 1),
        '22:00-00:08': parseInt(Math.random() * 100 + 1),
        '22:00-00:09': parseInt(Math.random() * 100 + 1),
        '22:00-00:10': parseInt(Math.random() * 100 + 1),
        '22:00-00:11': parseInt(Math.random() * 100 + 1),
        '22:00-00:12': parseInt(Math.random() * 100 + 1),
        '22:00-00:13': parseInt(Math.random() * 100 + 1),
        total: parseInt(Math.random() * 100 + 1) * 4
      }, {
        word: '呼入接起次数',
        '00:00-03:00': parseInt(Math.random() * 100 + 1),
        '03:00-06:00': parseInt(Math.random() * 100 + 1),
        '06:00-09:00': parseInt(Math.random() * 100 + 1),
        '09:00-12:00': parseInt(Math.random() * 100 + 1),
        total: parseInt(Math.random() * 100 + 1) * 4
      }, {
        word: '呼出次数',
        '00:00-03:00': parseInt(Math.random() * 100 + 1),
        '03:00-06:00': parseInt(Math.random() * 100 + 1),
        '06:00-09:00': parseInt(Math.random() * 100 + 1),
        '09:00-12:00': parseInt(Math.random() * 100 + 1),
        total: parseInt(Math.random() * 100 + 1) * 4
      }, {
        word: '呼出接起次数',
        '00:00-03:00': parseInt(Math.random() * 100 + 1),
        '03:00-06:00': parseInt(Math.random() * 100 + 1),
        '06:00-09:00': parseInt(Math.random() * 100 + 1),
        '09:00-12:00': parseInt(Math.random() * 100 + 1),
        total: parseInt(Math.random() * 100 + 1) * 4
      }]

      setTimeout(() => {
        const colLen = Object.keys(data[0]).length - 2
        const width = colLen > 13 ? 108 : ((document.getElementById('table').clientWidth - 180) / colLen)
        this.tbScroll = {
          x: colLen * width + 180
        }
        this.columns = [
          {
            title: '栏目',
            dataIndex: 'word',
            width: 120,
            fixed: 'left'
          },
          {
            title: '总计',
            dataIndex: 'total',
            width: 60,
            fixed: 'left'
          }
        ]

        // for (let i in data) {
        for (const k in data[0]) {
          if (k !== 'word' && k !== 'total') {
            this.columns.push({
              title: k,
              dataIndex: k,
              width: width,
              align: 'center'
            })
          }
        }
        // }
      }, 0)
      setTimeout(() => {
        this.loading = false
        this.tableData = data
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
