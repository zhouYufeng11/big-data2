import { defineStore } from "pinia";

export const mainStore = defineStore('main', {
  state: () => {
    return {
      showFilePage: false, // 文件弹框
      pageFileTitle: '', // 文件弹框标题
      showPage: false, // 弹框
      pageTitle: '', // 弹框标题
      pageType: '', // 弹框内容
      pageMsg: {},
      showDetailPage: false, //  弹窗
      pageDetailTitle: '', // 弹框标题
      pageDetailType: '', // 弹框内容
      mapCenter: [],
      caseId: '',
      jqDate: 2,  //  警情 日周月
      ajDate: 2,  //  案件 日周月
      fkDate: 3, // 风控
      yqDate: 3,  //  舆情 日周月
      chooseIndex: []
    }
  },
  getters: {},
  actions: {
    setFilePage(showPage: boolean) {
      this.showFilePage = showPage;
    },
    setFilePageTitle(pageTitle: string) {
      this.pageFileTitle = pageTitle;
    },
    setPage(showPage: boolean) {
      this.showPage = showPage;
    },
    setPageTitle(pageTitle: string) {
      this.pageTitle = pageTitle;
    },
    setPageType(pageType: string) {
      this.pageType = pageType;
    },
    setpageMsg(obj: any) {
      this.pageMsg = obj;
    },
    setDetailPage(showPage: boolean) {
      this.showDetailPage = showPage;
    },
    setDetailPageTitle(pageTitle: string) {
      this.pageDetailTitle = pageTitle;
    },
    setDetailPageType(pageType: string) {
      this.pageDetailType = pageType;
    },
    setMapCenter1(mapCenter: []) {
      this.mapCenter = mapCenter;
    },
    setMapCenter2(mapCenter: []) {
      this.mapCenter = mapCenter;
    },
    setCaseId(caseId: string) {
      this.caseId = caseId;
    },
    setjqDate(date: any) {
      this.jqDate = date;
    },
    setajDate(date: any) {
      this.ajDate = date;
    },
    setfkDate(date: any) {
      this.fkDate = date;
    },
    setyqDate(date: any) {
      this.yqDate = date;
    },
    getChooseIndex() {
      try {
          let arr: any = JSON.parse(localStorage.getItem('chooseIndex'));
          
          if(arr === null) {
            arr = ['jjxxResult', 'ajxxResult', 'yqResult'];
            localStorage.setItem('chooseIndex', JSON.stringify(arr));
          }
          
          this.chooseIndex = arr;
      } catch(ev) {}

      return this.chooseIndex;
    },
    setChooseIndex(arr: any) {
      console.log(this.chooseIndex);
      localStorage.setItem('chooseIndex', JSON.stringify(arr));
    },
    clearChooseIndex() {
      localStorage.removeItem('chooseIndex');
    }
  },
});

/**
 * 公共方法 - 监听 actions 方法
 * @param actionFnName actions方法名
 * @param callback 回调函数
 */
export const watchStore = (actionFnName: string, callback: any) => {
  const store = mainStore();
  store.$onAction(({
    name, // action 的名字
    store, // store 实例
    args, // 调用这个 action 的参数
    after, // 在这个 action 执行完毕之后，执行这个函数
    onError, // 在这个 action 抛出异常的时候，执行这个函数
  }) => {
    if (name === actionFnName) {
      after((reject) => {
        //这里可以执行一些操作
        callback(store)
      })
    }
    onError((error) => {
      console.log(error)
    })
  })
}

