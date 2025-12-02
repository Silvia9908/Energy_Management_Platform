//封装useChart自定义组合式函数
import { onBeforeUnmount, onMounted, Ref,ref,markRaw} from "vue";
import * as echarts from "echarts";
//ref数据类型比较复杂的时候用Ref

//用 Ref<HTMLElement | null> 类型约束 chartRef：确保是 DOM 容器的 ref
export function useChart(chartRef:Ref<HTMLElement|null>,setChartData:any){
  const chartInstance=ref<echarts.ECharts|null>(null)//存实例
  //初识化容器
  const initChart=async ()=>{
    if(chartRef.value){// DOM 已经挂载
      //第二步
      //这边需要取消vue的chart响应式，因为vue和chart的窗口响应式有冲突
      chartInstance.value=markRaw(echarts.init(chartRef.value))
      const options = await setChartData()
      //第三步
      chartInstance.value.setOption(options)
    }
  }
  //echarts.init(chartRef.value)：在这个 DOM 上创建 ECharts 实例
//markRaw(...)：告诉 Vue「不要把这个实例变成响应式」，避免 Vue 的响应式和 echarts 自己的内部响应冲突，减少性能问题
//await setChartData()：等待外部传进来的异步数据函数执行完，拿到配置后再 setOption
//👉 这里正好解决你注释里说的“then 外部的代码不等 then 执行结束”的问题：通过 async/await 把异步流程写成同步顺序。
  

//resize
  const resizeChart = () => {
    chartInstance.value?.resize();
  };
  //在onMounted阶段调用
  onMounted(()=>{
    initChart()
    window.addEventListener("resize",resizeChart)
  })
  //组件卸载之前移除事件，避免内存泄漏
  onBeforeUnmount(()=>{
    window.removeEventListener("resize",resizeChart)
    if(chartInstance.value){
      chartInstance.value.dispose()//释放图标占用的资源
    }
  })
}
