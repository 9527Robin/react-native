import * as WebBrowser from "expo-web-browser";
import React from "react";

import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
  Button,
  ImageBackground,
  Modal,
} from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import _ from "lodash";
import Swiper from "react-native-swiper";
// import RequestController from "../api/service";

export default function EditScreenInfo(props: any) {
  const numbers: number = 84;
  const [viewData, setViewData] = React.useState([""]);
  // const [inputValue, setInputValue] = React.useState("BOY");
  const [tableOne, setTableOne] = React.useState<Array<string>>([]);
  const [tableTwo, setTableTwo] = React.useState([[""]]);
  const [tableThree, setTableThree] = React.useState<Array<Array<string>>>([]);
  const [result, setResult] = React.useState<Array<string>>([]);
  const [tips, setTips] = React.useState<any>(null);
  // const [modalVisible, setModalVisible] = React.useState(false);
  // React.useEffect(() => {
  //   checkCode();
  // }, []);

  // async function checkCode() {
  //   const result = await RequestController.checkCode({ code: "667" });
  //   const serverTime = _.get(result, ["data", "data", "timeStamp"]);
  //   if (_.get(result, ["data", "returnCode"]) === 0) {
  //     if (serverTime) {
  //       const localTime = new Date().getTime();
  //       const time = new Date(serverTime).getTime();
  //       if (localTime > time) {
  //         setModalVisible(true);
  //       } else {
  //         setModalVisible(false);
  //       }
  //     }
  //   }
  // }

  function renderFunction() {
    const el = [];
    const enableIcon = styles.enableIcon;
    const disabledIcon = styles.disabledIcon;

    for (let i = 0; i < numbers; i++) {
      el.push(
        <TouchableOpacity key={`watch${i}`} style={handleStatus(i) ? enableIcon : disabledIcon}>
          <View>
            {_.get(tableOne, i, "") ? (
              <Image style={styles.imageContainer} source={handleIcon(i)} />
            ) : undefined}
          </View>
        </TouchableOpacity>
      );
    }
    return el;
  }

  function handleTableTwo(value: string, index: number) {
    const temp = _.cloneDeep(tableTwo);
    if (index === 0) {
      _.set(temp, 0, [value]);
      setTableTwo(temp);
      return;
    }
    const table1 = _.cloneDeep(viewData);
    const preValue = _.get(viewData, index - 1);
    if (preValue === value) {
      temp[temp.length - 1].push(value);
    } else {
      _.set(temp, temp.length, [value]);
    }
    const temp3 = _.cloneDeep(tableThree);
    if (temp.length >= 3) {
      const len = temp.length; // 当前的数据长度
      const currentIndex3 = _.get(temp, [len - 1, "length"], 0); // 当前的数据位置
      const preValue3 = _.get(temp, [len - 2, currentIndex3 - 1], ""); // 获取前一个相同位置的值
      let currentThree = ""; // 表格三当前计算出来的值
      if ((preValue3 === "BOY" && value === "GIRL") || (preValue3 === "GIRL" && value === "BOY")) {
        currentThree = "CAT";
        // temp3.push("CAT");
      } else {
        currentThree = "DOG";
        // temp3.push("DOG");
      }
      // if (temp3.length === 0) {
      //   _.set(temp3, 0, [currentThree]);
      // } else {
      //   const pre = _.get(temp3, [temp3.length - 1, 0], "");
      //   if (pre === currentThree) {
      //     temp3[temp3.length - 1].push(currentThree);
      //   } else {
      //     _.set(temp3, temp3.length, [currentThree]);
      //   }
      // }
      // console.log(temp3);
      // setTableThree(temp3);
    }
    setTableTwo(temp);
    handleResult(value, index, table1, temp);

    // console.log(temp);
  }

  // const a: Array<Array<string>> = [["B", "B"], ["G"], ["B"]];

  function handleResult(
    value: string,
    index: number,
    one: Array<string>,
    two: Array<Array<string>>,
    three?: Array<string>,
    flag?: Boolean
  ) {
    const res = _.cloneDeep(three || result);
    const preValue = _.get(one, one.length - 2); // 前一个值
    let temp = "";
    //const len = two.length - 1; // 当前界面二的长度,旧版
    const len = two.length;
    //const len1 = two[len - 1].length - 1; //
    //const cur_len = two[len].length - 1;//表格二当前列的长度 旧
    const cur_len = two[len - 1].length; //表格二当前长度
    // 当性别变化
    if ((len > 2 && two[2].length > 1) || len > 3) {
      //现在要去从第二界面第三列第二个开始

      const compareValue = _.get(two, [len - 3, cur_len - 1]); // 表格二的当前值的对应位置的前两列的值
      const len1 = two[len - 2]["length"]; // 上一列的长度
      const len2 = two[len - 3]["length"]; // 上一列的上一列的长度
      const len4 = cur_len - len2; //当前列与对应列的差

      let len3;
      if (len > 3) {
        len3 = two[len - 4]["length"]; // 上一列的上一列的上一列的长度;
      }

      //const compareValue = _.get(two, [len - 1, cur_len-1]); // 表格二的当前值
      //const cur_len1 = two[len-3].length;//

      //const compareValue2 = _.get(two, [len - 1, cur_len - 1]); // 前1个的值
      //const compareValue3 = _.get(two, [len - 1, cur_len - 2]); // 前1个的值
      if (cur_len > 1) {
        if (compareValue) {
          temp = "CAT";
        } else {
          if (len4 == 1) {
            temp = "DOG";
          } else {
            temp = "CAT";
          }
        }
      } else {
        if (len1 == len3) {
          temp = "CAT";
        } else {
          temp = "DOG";
        }
      }

      if (flag) return temp;
      res.push(temp);
      setResult(res);
      const temp3 = _.cloneDeep(tableThree);
      const pre = _.get(temp3, [temp3.length - 1, 0], "");
      if (pre === temp) {
        temp3[temp3.length - 1].push(temp);
      } else {
        _.set(temp3, temp3.length, [temp]);
      }
      setTableThree(temp3);
      if (temp3.length > 1 && _.get(temp3, [2, "length"]) > 0) {
        handleViewFour(value, index, one, two, temp3, res);
      }
    }
  }

  function handleChange(index: number, inputValue: string, empty?: Boolean) {
    // 屏蔽之后的方格
    // if (index === -1) {
    //   index = 0;
    // }
    if (!handleStatus(index)) return;
    const data = _.cloneDeep(viewData);
    if (empty) {
      _.set(data, index, "");
    } else {
      const value = _.get(viewData, index + 1, "");
      if (value) return; // 当前输入的前一个有值的时候，不允许修改
      if (inputValue === "XIN") return;
      _.set(data, index, inputValue);
      if (!_.get(data, index + 1, "")) {
        _.set(data, index + 1, "");
      }
    }
    handleTableTwo(inputValue, index);
    setViewData(data);
  }

  function handleViewFour(
    value: string,
    index: number,
    viewOne: Array<string>,
    viewTwo: Array<Array<string>>,
    viewThree: Array<Array<string>>,
    res: Array<string>
  ) {
    const table1 = _.cloneDeep(viewOne);
    const table2 = _.cloneDeep(viewTwo);
    // table1.push(value);
    _.set(table1, table1.length - 1, value);
    _.set(table1, table1.length, "BOY");
    // table1.push("");
    let temp = null;
    if ("BOY" === value) {
      table2[table2.length - 1].push("BOY");
    } else {
      _.set(table2, table2.length, ["BOY"]);
    }
    if (viewThree.length > 2 && viewThree[2].length > 0) {
      const curlen = viewThree.length - 1;
      const currentLen = viewThree[viewThree.length - 1].length; // 当前的第几排；
      const lastLen = viewThree[curlen - 2].length; // 需要对称的排

      const current3Value = _.get(viewThree, [curlen, 0]); // 当前的table3的值
      const figureValue = handleResult("BOY", index + 1, table1, table2, res, true); // 计算出当前值对应的猫或狗
      if (lastLen === currentLen) {
        if (current3Value == figureValue) {
          temp = (
            <View style={styles.tipContainer}>
              <Text style={styles.textStyle}>{tableOne.length + 2}</Text>
              <Image style={styles.imageContainer1} source={require("../assets/images/girl.png")} />
            </View>
          );
        } else {
          temp = (
            <View style={styles.tipContainer}>
              <Text style={styles.textStyle}>{tableOne.length + 2}</Text>
              <Image style={styles.imageContainer1} source={require("../assets/images/boy.png")} />
            </View>
          );
        }
      } else {
        if (current3Value == figureValue) {
          temp = (
            <View style={styles.tipContainer}>
              <Text style={styles.textStyle}>{tableOne.length + 2}</Text>
              <Image style={styles.imageContainer1} source={require("../assets/images/boy.png")} />
            </View>
          );
        } else {
          temp = (
            <View style={styles.tipContainer}>
              <Text style={styles.textStyle}>{tableOne.length + 2}</Text>
              <Image style={styles.imageContainer1} source={require("../assets/images/girl.png")} />
            </View>
          );
        }
      }
    }
    setTips(temp);
  }

  function handleStatus(index: number) {
    if (index === 0) {
      return true;
    }
    if (_.get(tableOne, index - 1, "")) {
      return true;
    } else {
      return false;
    }
  }

  function handleInput(inputValue: string) {
    if (tableOne.length === 84) return;
    const one = _.cloneDeep(tableOne);
    one.push(inputValue);
    setTableOne(one);
    const index = viewData.length - 1;
    handleChange(index, inputValue);
  }

  function handleIcon(index: number) {
    const boyIcon = require("../assets/images/boy.png");
    const girlIcon = require("../assets/images/girl.png");
    const xinIcon = require("../assets/images/xin.png");
    const status = _.get(tableOne, index);
    switch (status) {
      case "BOY":
        return boyIcon;
      case "GIRL":
        return girlIcon;
      case "XIN":
        return xinIcon;
      default:
        break;
    }
    return boyIcon;
  }

  function clearAll() {
    setViewData([""]);
    setTableOne([]);
    setTableTwo([]);
    setTableThree([]);
    setResult([]);
    setTips(null);
  }

  function backOne() {
    let table1 = _.cloneDeep(tableOne);
    if (!table1.length) return;
    if (_.get(table1, table1.length - 1) === "XIN") {
      table1.splice(table1.length - 1, 1);
      setTableOne(table1);
      return;
    } else {
      table1.splice(table1.length - 1, 1);
      setTableOne(table1);
    }
    let table2 = _.cloneDeep(tableTwo);
    let table3 = _.cloneDeep(tableThree);
    let res = _.cloneDeep(result);
    if (res.length) {
      res.length = res.length - 1;
    }

    const table2Data = _.get(table2, [table2.length - 1]);
    if (_.get(table2Data, "length")) {
      table2Data.length = table2Data.length - 1;
      if (!table2Data.length) {
        table2.splice(table2.length - 1, 1);
      }
    }

    const table3Data = _.get(table3, [table3.length - 1]);
    if (_.get(table3Data, "length", 0)) {
      table3Data.length = table3Data.length - 1;
      if (!table3Data.length) {
        table3.splice(table3.length - 1, 1);
      }
    }

    let view = _.cloneDeep(viewData);
    if (!view.length) return;
    view.splice(view.length - 2, 1);
    setViewData(view);
    setTableTwo(table2);
    setTableThree(table3);
    setResult(res);
    setTips(null);
    // setTableTwo(table1.splice(table1.length - 1, 1));
    // setTableThree(table1.splice(table1.length - 1, 1));
  }

  return (
    <Swiper
      loop={false}
      // showsButtons={true}
      // index={1}
    >
      <ImageBackground style={{ flex: 1 }} source={require("../assets/images/bg.jpg")}>
        {/* <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>使用时间到期</Text>
              </View>
            </View>
          </Modal>
        </View> */}
        <View style={styles.operateContainer}>
          <View style={styles.inputStyle1}>
            <TouchableOpacity onPress={() => clearAll()}>
              <Image style={styles.weixinImage} source={require("../assets/images/bili.png")} />
            </TouchableOpacity>
            {/* <Button title="重开" onPress={() => clearAll()}>
              重开
            </Button> */}
          </View>
          <View style={styles.inputStyle1}>
            {/* <TouchableOpacity onPress={() => backOne()}>
              <Image
                style={styles.imageContainer}
                source={require("../assets/images/back.png")}
              />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => backOne()}>
              <Image style={styles.weixinImage} source={require("../assets/images/dingding.png")} />
            </TouchableOpacity>
            {/* <Button title="回退" onPress={() => backOne()}>
              回退
            </Button> */}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputContainer1}></View>
          <View style={styles.inputContainer2}>
            <View style={styles.inputStyle}>
              <Text>{tips}</Text>
            </View>
            <View style={styles.inputStyle}>
              {/* <Button title="清除" onPress={() => clearAll()}>
              清除
            </Button> */}
              <TouchableOpacity onPress={() => handleInput("XIN")}>
                <Image style={styles.weixinImage} source={require("../assets/images/xin2.png")} />
              </TouchableOpacity>
            </View>
            {/* <View
          style={{
            width: "100%",
            height: "20%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>{tableOne.length + 1}</Text>
        </View> */}
            <View style={styles.inputStyle}>
              {/* <Text>BOY</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={inputValue === "BOY" ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setInputValue("BOY")}
              value={inputValue === "BOY"}
            /> */}
              <TouchableOpacity onPress={() => handleInput("BOY")}>
                <Image style={styles.zhifuImage} source={require("../assets/images/boy1.png")} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputStyle}>
              {/* <Text>GIRL</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={inputValue === "GIRL" ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setInputValue("GIRL")}
              value={inputValue === "GIRL"}
            /> */}
              <TouchableOpacity onPress={() => handleInput("GIRL")}>
                <View style={styles.tipContainer}>
                  <Text style={styles.textStyle}>{tableOne.length + 1}</Text>
                  <Image
                    style={styles.imageContainer1}
                    source={require("../assets/images/girl1.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* <ScrollView
        style={{
          height: "100%",
        }}
      > */}
      {/* <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => {
            //   // Alert.alert("Modal has been closed.");
            //   setModalVisible(!modalVisible);
            // }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>使用时间到期</Text>

                {/* <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: "#2196F3",
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle1}>Hide Modal</Text>
              </TouchableHighlight> */}
      {/* </View>
            </View>
          </Modal>
        </View> */}
      {/* <View style={styles.container}>{renderFunction()}</View>
        <View
          style={{
            flexDirection: "column",
            flexWrap: "wrap",
            height: 80,
            width: "100%",
            paddingTop: 30,
          }}
        >
          <View style={styles.inputStyle1}>
            <Text>{tips}</Text>
          </View>
          <View style={styles.inputStyle1}> */}
      {/* <Button title="清除" onPress={() => clearAll()}>
              清除
            </Button> */}
      {/* <TouchableOpacity style={{ borderRadius: 16 }} onPress={() => handleInput("XIN")}>
              <Image style={styles.imageContainer1} source={require("../assets/images/xin1.png")} />
            </TouchableOpacity>
          </View> */}
      {/* <View style={styles.inputStyle1}> */}
      {/* <Text>BOY</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={inputValue === "BOY" ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setInputValue("BOY")}
              value={inputValue === "BOY"}
            /> */}
      {/* <TouchableOpacity onPress={() => handleInput("BOY")}>
              <Image style={styles.zhifuImage} source={require("../assets/images/boy1.png")} />
            </TouchableOpacity>
          </View> */}

      {/* <View style={styles.inputStyle1}> */}
      {/* <Text>GIRL</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={inputValue === "GIRL" ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setInputValue("GIRL")}
              value={inputValue === "GIRL"}
            /> */}
      {/* <TouchableOpacity onPress={() => handleInput("GIRL")}>
              <View style={styles.tipContainer}>
                <Text style={styles.textStyle}>{tableOne.length + 1}</Text>
                <Image
                  style={styles.imageContainer1}
                  source={require("../assets/images/girl1.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View> */}

      {/* <View>
          <Text>{tips}</Text>
        </View>
        <Text>界面二</Text>
        <ScrollView horizontal={true}>
          <TableTwo tableData={tableTwo} />
        </ScrollView>

        <Text>界面三</Text>
        <ScrollView horizontal={true}>
          <TableThree tableData={tableThree} />
        </ScrollView> */}
      {/* </ScrollView> */}
    </Swiper>
  );
}

function TableTwo(props: { tableData: Array<Array<string>> }) {
  const { tableData } = props;

  function renderFunction(temp: Array<string>) {
    const boyIcon = require("../assets/images/boy.png");
    const girlIcon = require("../assets/images/girl.png");
    return temp.map((data, index) => {
      return (
        <View style={styles.tableTwoItem} key={`TableTwo${index}`}>
          {data ? (
            <Image style={{ width: 32, height: 32 }} source={data === "BOY" ? boyIcon : girlIcon} />
          ) : null}
        </View>
      );
    });
  }

  return (
    <View style={styles.tableTwoContainer}>
      {tableData.map((data, index) => {
        return <View key={`Table${index}`}>{renderFunction(data)}</View>;
      })}
    </View>
  );
}

function TableThree(props: { tableData: Array<Array<string>> }) {
  const { tableData } = props;

  function renderFunction(temp: Array<string>) {
    const boyIcon = require("../assets/images/cat.png");
    const girlIcon = require("../assets/images/dog.png");
    return temp.map((data, index) => {
      return (
        <View style={styles.tableTwoItem} key={`TableThree${index}`}>
          {data ? (
            <Image style={styles.imageContainer} source={data === "CAT" ? boyIcon : girlIcon} />
          ) : null}
        </View>
      );
    });
  }
  return (
    <View style={styles.tableTwoContainer}>
      {tableData.map((data, index) => {
        return <View key={`TableThreeRender${index}`}>{renderFunction(data)}</View>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },

  operateContainer: {
    position: "absolute",
    width: "100%",
    top: "20%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    display: "flex",
    zIndex: 99,
    justifyContent: "space-around",
    flexDirection: "row",
  },

  inputStyle1: {
    width: "16.667%",
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0)",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    position: "absolute",
    top: -20,
    color: "#0f0",
  },
  mainContainer: {
    maxHeight: "100%",
    overflow: "scroll",
  },
  imageContainer: {
    width: 32,
    height: 32,
  },
  imageContainer1: {
    width: 48,
    height: 48,
  },
  weixinImage: {
    width: 48,
    height: 48,
    borderRadius: 25,
    backgroundColor: "#ffffff",
  },
  zhifuImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  tipContainer: {
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-around",
    // padding: 20,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  inputContainer1: {
    flexDirection: "column",
    flexWrap: "wrap",
    // justifyContent: "space-around",
    // padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: "80%",
    width: "100%",
  },
  inputContainer2: {
    flexDirection: "column",
    flexWrap: "wrap",
    // justifyContent: "space-around",
    // padding: 20,
    height: "20%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    width: "100%",
  },
  tableTwoContainer: {
    flexDirection: "row",
    // height: 200,
    // overflow: "scroll",
  },
  container: {
    // flex: 1,
    flexDirection: "column",
    height: 560,
    display: "flex",
    flexWrap: "wrap",
    paddingTop: 40,
  },
  enableIcon: {
    height: 40,
    width: "16.667%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  tableTwoItem: {
    borderColor: "#000",
    borderWidth: 1,
  },
  disabledIcon: {
    height: 40,
    width: "16.667%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    backgroundColor: "#999",
    borderWidth: 1,
  },
  abledIcon: {
    backgroundColor: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 13.84,
    // elevation: 15,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle1: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    // marginBottom: 50,
    fontSize: 48,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
