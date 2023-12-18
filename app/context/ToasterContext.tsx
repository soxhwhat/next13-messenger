'use client';

import { Toaster } from "react-hot-toast";
// 当你在应用中的某个位置使用 <ToasterContext /> 组件时，它就会在那个位置渲染一个 Toaster 组件。然后，你就可以使用 react-hot-toast 库的 toast 函数在应用的任何位置触发 toast 通知，这些通知会在 Toaster 组件的位置显示。
const ToasterContext = () => {
  return ( 
    <Toaster />
   );
}
 
export default ToasterContext;
