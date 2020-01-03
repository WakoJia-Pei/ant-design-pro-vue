/**
 * @Description:
 * @Author: Wan.Jiang
 * @Date: 2020-01-03
 **/
import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

// const totalCount = 5701

const lineChart = (options) => {
  const parameters = getQueryParameters(options)
  console.log('参数', parameters)
  const result = []
  const num = () => {
    return parseInt(Math.random() * 100 + 1)
  }
  for (let i = 0; i < 24; i++) {
    result.push({
      span: `${i < 10 ? '0' + i : i}:00-${i < 10 ? '0' + (i + 1) : (i + 1) === 24 ? '00' : (i + 1)}:00`,
      outTotal: num(),
      outAnswer: num(),
      inTotal: num(),
      inAnswer: num(),
      total: num()
    })
  }

  return builder({
    code: 0,
    data: result
  })
}

Mock.mock(/\/lineChart/, 'get', lineChart)
