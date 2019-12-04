let nextToken = '';
window.nextData = '';

export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractData(receivedData) {
    const tData = {};
    tData.clipNames = receivedData.items.map(clip => clip.snippet.title);
    tData.description = receivedData.items.map(clip => clip.snippet.description);
    tData.publishedAt = receivedData.items.map(clip => clip.snippet.publishedAt.slice(0, -14));
    tData.channelTitle = receivedData.items.map(clip => clip.snippet.channelTitle);
    tData.preview = receivedData.items.map(clip => clip.snippet.thumbnails.high.url);
    tData.viewCount = receivedData.viewCount;
    tData.videoId = receivedData.videoId;
    tData.likeCount = receivedData.likeCount;
    return AppModel.refactorData(tData);
  }

  static refactorData(tData) {
    const data = Object.keys(tData).map((val, key) => [tData.clipNames[key],
      tData.description[key],
      tData.publishedAt[key],
      tData.channelTitle[key],
      tData.preview[key],
      tData.viewCount[key],
      tData.videoId[key]]);
    window.nextData = data;
    return data;
  }

  async getInfo() {
    const {
      link, getViewCountLink, apiKey, type, part, maxResult, q,
    } = this.state;

    const url = `${link}${apiKey}${type}${part}${maxResult}${q}`;
    const responce = await fetch(url);
    const receivedData = await responce.json();

    nextToken = receivedData.nextPageToken;
    const videoId = receivedData.items.map(clip => clip.id.videoId);

    const viewCountURL = `${getViewCountLink}${apiKey}&id=${videoId}${part},statistics`;
    const viewCountResponce = await fetch(viewCountURL);
    const receivedViewCount = await viewCountResponce.json();

    receivedData.videoId = videoId;
    receivedData.viewCount = receivedViewCount.items.map(items => items.statistics.viewCount);
    receivedData.likeCount = receivedViewCount.items.map(items => items.statistics.likeCount);

    return AppModel.extractData(receivedData);
  }

  static secondQuery(state) {
    const {
      link, getViewCountLink, apiKey, type, part, maxResult, q,
    } = state;

    let receivedDataNextQuery = {};

    const url = `${link}${apiKey}${type}${part}${maxResult}${q}&pageToken=${nextToken}`;
    const getCountFromFetch = (data) => {
      let nextViewCount = {};
      nextViewCount = data;
      // eslint-disable-next-line max-len
      receivedDataNextQuery.viewCount = nextViewCount.items.map(items => items.statistics.viewCount);
      return AppModel.extractData(receivedDataNextQuery);
    };

    const getCountNextQuery = (videoId) => {
      const viewCountURL = `${getViewCountLink}${apiKey}&id=${videoId}${part},statistics`;
      fetch(viewCountURL)
        .then(responce => responce.json())
        .then(data => getCountFromFetch(data));
    };

    const getDataFromfetch = (data) => {
      nextToken = data.nextPageToken;
      receivedDataNextQuery = data;
      const videoId = receivedDataNextQuery.items.map(clip => clip.id.videoId);
      receivedDataNextQuery.videoId = videoId;
      getCountNextQuery(videoId);
    };

    fetch(url)
      .then(responce => responce.json())
      .then(data => getDataFromfetch(data));
  }
}
