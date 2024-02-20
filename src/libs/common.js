export const vueWebSocketIO = (url) => {
    return new Promise((resolve) => {
        let ws = new WebSocket(url)
        ws.onopen = () => {
            console.log("%c SOCKET CONNECT NORMAL", "color:#19be6b;")
        }
        resolve(ws)
    })
}

export const solvedList = [{
        name: "所有分类",
        id: null,
    },
    {
        name: "未解决",
        id: "wrong",
    },
    {
        name: "已解决",
        id: "right",
    },
]
export const difficultyList = [{
        name: "所有难度",
        id: null,
    },
    {
        name: "简单",
        id: "easy",
    },
    {
        name: "中等",
        id: "middle",
    },
    {
        name: "困难",
        id: "hard",
    },
]

export const upLoadStatusText = {
  success: '上传成功',
  error: '上传失败',
  uploading: '上传中',
  paused: '暂停中',
  waiting: '等待中'
}

export const handleStateColor=(state)=> {
  let test = "";
  switch (state) {
    case "null":
      test = "";
      break;
    case "not_start":
      test = "default";
      break;
    case "not_finish":
      test = "warning";
      break;
    case "finish":
      test = "success";
      break;
    default:
      test = "";
  }
  return test;
}

export const  handleLabState = (member_count, learn_count)=>{
  let test = {
    name: "",
    color: "",
  };
  switch (member_count) {
    case 0:
      test.name = "未加入";
      test.color = "default";
      break;
    case 1:
      test.name = "未开始";
      test.color = "default";
      break;
    default:
      test.name = "";
      test.color = "";
  }
  if (member_count > 0) {
    switch (learn_count) {
      case 0:
        test.name = "未完成";
        test.color = "warning";
        break;
      case 1:
        test.name = "完成";
        test.color = "success";
        break;
      default:
        test.name = "";
        test.color = "";
    }
  }

  return test;
}

