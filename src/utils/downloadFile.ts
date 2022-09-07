import { message } from 'antd';
var JSonToCSV = {
  /*
     * obj是一个对象，其中包含有：
     * ## data 是导出的具体数据
     * ## fileName 是导出时保存的文件名称 是string格式
     * ## showLabel 表示是否显示表头 默认显示 是布尔格式
     * ## columns 是表头对象，且title和key必须一一对应，包含有
          title:[], // 表头展示的文字
          key:[], // 获取数据的Key
          formatter: function() // 自定义设置当前数据的 传入(key, value)
     */
  setDataConver: function (obj: any) {
    var bw = this.browser();
    if (bw["ie"] < 9) return; // IE9以下的
    var data = obj["data"],
      ShowLabel =
        typeof obj["showLabel"] === "undefined" ? true : obj["showLabel"],
      fileName = (obj["fileName"] || "UserExport") + ".csv",
      columns = obj["columns"] || {
        title: [],
        key: [],
        formatter: undefined,
      };
    var ShowLabel = typeof ShowLabel === "undefined" ? true : ShowLabel;
    var row = "",
      CSV = "",
      key;
    // 如果要现实表头文字
    if (ShowLabel) {
      // 如果有传入自定义的表头文字
      if (columns.title.length) {
        columns.title.map(function (n: any) {
          row += n + ",";
        });
      } else {
        // 如果没有，就直接取数据第一条的对象的属性
        for (key in data[0]) row += key + ",";
      }
      row = row.slice(0, -1); // 删除最后一个,号，即a,b, => a,b
      CSV += row + "\r\n"; // 添加换行符号
    }
    // 具体的数据处理
    data.map(function (n: any) {
      row = "";
      // 如果存在自定义key值
      if (columns.key.length) {
        columns.key.map(function (m: any) {
          row +=
            '"' +
            (typeof columns.formatter === "function"
              ? columns.formatter(m, n[m]) || n[m]
              : n[m]) +
            '",';
        });
      } else {
        for (key in n) {
          row +=
            '"' +
            (typeof columns.formatter === "function"
              ? columns.formatter(key, n[key]) || n[key]
              : n[key]) +
            '",';
        }
      }
      row.slice(0, row.length - 1); // 删除最后一个,
      CSV += row + "\r\n"; // 添加换行符号
    });
    if (!CSV) return;
    this.SaveAs(fileName, CSV);
  },
  SaveAs: function (fileName: string, csvData: any) {
    var bw = this.browser();
    if (!bw["edge"] || !bw["ie"]) {
      var alink: any = document.createElement("a");
      alink.id = "linkDwnldLink";
      alink.href = this.getDownloadUrl(csvData);
      document.body.appendChild(alink);
      var linkDom: any = document.getElementById("linkDwnldLink");
      linkDom.setAttribute("download", fileName);
      linkDom.click();
      document.body.removeChild(linkDom);
    } else if (bw["ie"] >= 10 || bw["edge"] == "edge") {
      var _utf = "\uFEFF";
      var _csvData = new Blob([_utf + csvData], {
        type: "text/csv",
      });
      (navigator as any).msSaveBlob(_csvData, fileName);
    } else {
      var oWin: any = (window.top as Window).open("about:blank", "_blank");
      oWin.document.write("sep=,\r\n" + csvData);
      oWin.document.close();
      oWin.document.execCommand("SaveAs", true, fileName);
      oWin.close();
    }
  },
  getDownloadUrl: function (csvData: any) {
    var _utf = "\uFEFF"; // 为了使Excel以utf-8的编码模式，同时也是解决中文乱码的问题
    if (window.Blob && window.URL) {
      var csvFileData = new Blob([_utf + csvData], {
        type: "text/csv",
      });
      return URL.createObjectURL(csvFileData);
    }
    // return 'data:attachment/csv;charset=utf-8,' + _utf + encodeURIComponent(csvData);
  },
  browser: function () {
    var Sys: any = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s =
      ua.indexOf("edge") !== -1
        ? (Sys.edge = "edge")
        : ua.match(/rv:([\d.]+)\) like gecko/))
      ? (Sys.ie = s[1])
      : (s = ua.match(/msie ([\d.]+)/))
      ? (Sys.ie = s[1])
      : (s = ua.match(/firefox\/([\d.]+)/))
      ? (Sys.firefox = s[1])
      : (s = ua.match(/chrome\/([\d.]+)/))
      ? (Sys.chrome = s[1])
      : (s = ua.match(/opera.([\d.]+)/))
      ? (Sys.opera = s[1])
      : (s = ua.match(/version\/([\d.]+).*safari/))
      ? (Sys.safari = s[1])
      : 0;
    return Sys;
  },
};
/*
 * @param {data} 表格中的数据
 * @param {titleArr} title集合数组
 * @param {keyArr} key集合数组
 */
export const downloadCsv = (data: any, titleArr: any, keyArr: any) => {
  JSonToCSV.setDataConver({
    data: data,
    fileName: "CSVFile",
    columns: {
      title: titleArr,
      key: keyArr,
      formatter: function (n: any, v: any) {
        if (n === "amont" && !isNaN(Number(v))) {
          v = v + "";
          v = v.split(".");
          v[0] = v[0].replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 千分位的设置
          return v.join(".");
        }
        if (n === "proportion") return v + "%";
      },
    },
  });
};

// 假设只处理逗号列分隔符
const COLUMN_DELIMITER = ",";

export function csvToArray(csv: string): string[][] {
  const table = [] as string[][];
  let row: any[] = [];
  let cell = "";
  let openQuote = false;
  let i = 0;

  const pushCell = () => {
    row.push(cell);
    cell = "";
  };

  const pushRow = () => {
    pushCell();
    table.push(row);
    row = [];
  };
  // 处理行分隔符和列分隔符
  const handleSeparator = (i: number) => {
    const c = csv.charAt(i);
    if (c === COLUMN_DELIMITER) {
      pushCell();
    } else if (c === "\r") {
      if (csv.charAt(i + 1) === "\n") {
        i++;
      }
      pushRow();
    } else if (c === "\n") {
      pushRow();
    } else {
      return false;
    }
    return true;
  };

  while (i < csv.length) {
    const c = csv.charAt(i);
    const next = csv.charAt(i + 1);
    if (!openQuote && !cell && c === '"') {
      // 遇到单元第一个字符为双引号时假设整个单元都是被双引号括起来
      openQuote = true;
    } else if (openQuote) {
      // 双引号还未成对的时候
      if (c !== '"') {
        // 如非双引号，直接添加进单元内容
        cell += c;
      } else if (next === '"') {
        // 处理双引号转义
        cell += c;
        i++;
      } else {
        // 确认单元结束
        openQuote = false;
        if (!handleSeparator(++i)) {
          throw new Error("Wrong CSV format!");
        }
      }
    } else if (!handleSeparator(i)) {
      // 没有双引号包起来时，如非行列分隔符，一律直接加入单元内容
      cell += c;
    }
    i++;
  }
  if (cell) {
    pushRow();
  }
  return table;
}
function csvToObject(csvString: any) {
  var csvarry = csvString.split("\r\n");
  var datas = [];
  var headers = csvarry[0].split(",");
  for (var i = 1; i < csvarry.length; i++) {
    var data: any = {};
    var temp = csvarry[i].split(",");
    for (var j = 0; j < temp.length; j++) {
      data[headers[j]] = temp[j];
    }
    datas.push(data);
  }
  return datas;
}

export function readCSVFile(obj: any) {
  if(obj.type != 'text/csv'){
    message.warning('Please Upload csv file')
    return
  }
  var reader = new FileReader();

  reader.readAsText(obj[0]);
  reader.onload = function () {
    console.log(this);
    var data = csvToObject(this.result);
    return data;
  };
}
