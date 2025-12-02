// import type { ListType, RevenueType } from './type'
// import type { RowType } from '@/types/station/index'
import {post } from '@/utils/http'

const Api = {
  List: '/stationList',
  // EditOrAdd: '/station/edit',
  // Delete: 'station/delete',
  // RevenueChart: '/revenueChart',
  // RevenueList: '/revenueList',
  // ChargingPileList: '/currentList',
} as const

export const listApi = (data: ListType) => post(Api.List, data)
// export const editOrAddApi = (data: RowType) => post(Api.EditOrAdd, data)
// export const deleteApi = (id: string) => post(Api.Delete, { id })
// export const revenueChartApi = () => get(Api.RevenueChart) // 不需要携带参数的，一般用get请求
// export const revenueListApi = (data: RevenueType) => post(Api.RevenueList, data)
// export const ChargingPileListApi = () => post(Api.ChargingPileList)

export interface ListType {
  page: number
  pageSize: number
  status: number
  id?: string
  name?: string
}

export interface RevenueType {
  page: number
  pageSize: number
  name: string
}
