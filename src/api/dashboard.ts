import { get } from '@/utils/http'

const Api = {
  // equipmentData: '/dashboard/equipment',
  // commonFunction: '/dashboard/commonFunction',
  ChartData: '/chartData',
  ChartData2: '/chartData2',
  ChartData3: '/chartData3',
} as const

// export const equipmentDataApi = () => get(Api.equipmentData)
// export const commonFunctionApi = () => get(Api.commonFunction)
export const chartDataApi = () => get(Api.ChartData)
export const chartDataApi2 = () => get(Api.ChartData2)
export const chartDataApi3 = () => get(Api.ChartData3)
