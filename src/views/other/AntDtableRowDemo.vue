<template>
  <a-card title="行合并-示例" style="margin-top: 24px">
    <div style="min-height: 60px">
      <a-skeleton active :paragraph="{rows: 15}" v-if="loading"/>
      <div v-else-if="dataT.length !== 0">
        <a-table
          bordered
          size="small"
          class="table-stripe"
          :columns="columns"
          :rowKey="record => record.key"
          :dataSource="dataT"
          :pagination="false"/>
      </div>
      <div v-else class="nodata"></div>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'AntDtableDemo',
  data () {
    return {
      loading: false,
      columns: [{
        title: '场景名称',
        dataIndex: 'name',
        customRender: (value, row) => {
          return {
            children: value,
            attrs: {
              rowSpan: row.rowSpan,
              style: 'background-color: #fff;border-bottom: 1px solid #e8e8e8;'
            }
          }
        }
      }, {
        title: '场景详情',
        dataIndex: 'nameDetail',
        customRender: (value, row, index) => {
          return this.renderContent(value, row, index, this.dataT)
        }
      }, {
        title: '出场',
        dataIndex: 'count',
        customRender: (value, row, index) => {
          return this.renderContent(value, row, index, this.dataT)
        }
      }],
      dataT: []
    }
  },
  created () {
    const result = [{
      'name': '秦家大院',
      'scenes': [
        { 'scene': '秦家大院', 'total': '29' },
        { 'scene': '秦家大院1', 'total': '9' },
        { 'scene': '秦家大院2', 'total': '69' }
      ]
    }, {
      'name': '秦家大院1',
      'scenes': [{ 'scene': '秦家大院', 'total': '29' }, { 'scene': '秦家大院1', 'total': '9' }, {
        'scene': '秦家大院2',
        'total': '69'
      }]
    }]
    this.$nextTick(() => {
      let k = 0
      const data = []
      for (const i in result) {
        for (const s in result[i].scenes) {
          data.push({
            key: `No.${k + 1}`,
            name: result[i].name,
            nameDetail: result[i].scenes[s].scene,
            count: +(result[i].scenes[s].total)
          })
          k = k + 1
        }
      }
      this.$nextTick(() => {
        this.dataT = this.formatTableData(data)
      })
    })
  },
  mounted () {
    console.log('tableData', this.dataT)
  },
  methods: {
    formatTableData (data) {
      const objs = {}
      var k
      const arr1 = []
      for (let i = 0, len = data.length; i < len; i++) {
        k = data[i].name
        if (objs[k]) { objs[k]++ } else { objs[k] = 1 }
      }
      // 出现次数
      for (const o in objs) {
        for (let i = 0; i < objs[o]; i++) {
          if (i === 0) {
            arr1.push(objs[o])
          } else {
            arr1.push(0)
          }
        }
      }
      arr1.forEach((r, index) => {
        data[index]['rowSpan'] = r
        data[index]['key'] = index
      })
      return data
    },
    renderContent (value, row, index, data) {
      const obj = {
        children: value,
        attrs: {}
      }
      if (row.rowSpan > 0) {
        obj.attrs.style = 'border-top: 1px solid #e8e8e8;'
      }
      if (index === 0) {
        obj.attrs.style = 'border-top: none'
      }
      if (index === data.length - 1) {
        obj.attrs.style = 'border-bottom: 1px solid #e8e8e8;'
      }
      return obj
    }
  }
}
</script>

<style lang='less' scoped>

</style>
