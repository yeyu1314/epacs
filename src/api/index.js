import net from "../assets/js/public";

export const getlistData = (param,data) => net.request("admin/order/queryListPage", "post", param, data)
export const getOpaction = ({id}) => net.request("admin/order/queryOrderById", "post", {id})

export const getRemarkData = ({id}) => net.request("admin/order/queryProductInfoList","post",{id})

