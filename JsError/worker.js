export default function worker() {
  const list = [];
  onmessage = function (e) {
    const action = e.data;
    console.log('接收到消息', action);
    const data = action.data;
    console.log(data);
    list.push(action);
    console.log(list);
  };
}
