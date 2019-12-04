import AppModel from './AppModel';

describe('AppModel.getInfo', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.prototype.getInfo).toBeInstanceOf(Function);
  });
});

describe('AppModel.extractData', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.extractData).toBeInstanceOf(Function);
  });
});

describe('AppModel.refactorData', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.refactorData).toBeInstanceOf(Function);
  });

  it('Should return array', () => {
    const tData = {};
    tData.clipNames = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9'];
    tData.description = ['2item1', '2item2', '2item3', '2item4', '2item5', '2item6', '2item7', '2item8', '2item9'];
    tData.publishedAt = ['3item1', '3item2', '3item3', '3item4', '3item5', '3item6', '3item7', '3item8', '3item9'];
    tData.channelTitle = ['4item1', '4item2', '4item3', '4item4', '4item5', '4item6', '4item7', '4item8', '4item9'];
    tData.preview = ['5item1', '5item2', '5item3', '5item4', '5item5', '5item6', '5item7', '5item8', '5item9'];
    tData.viewCount = ['6item1', '6item2', '6item3', '6item4', '6item5', '6item6', '6item7', '6item8', '6item9'];
    tData.videoId = ['7item1', '7item2', '7item3', '7item4', '7item5', '7item6', '7item7', '7item8', '7item9'];
    tData.key7 = ['8item1', '8item2', '8item3', '8item4', '8item5', '8item6', '8item7', '8item8', '8item9'];
    tData.key8 = ['9item1', '9item2', '9item3', '9item4', '9item5', '9item6', '9item7', '9item8', '9item9'];


    const result = AppModel.refactorData(tData);

    expect(result).toEqual([
      ['item1', '2item1', '3item1', '4item1', '5item1', '6item1', '7item1'],
      ['item2', '2item2', '3item2', '4item2', '5item2', '6item2', '7item2'],
      ['item3', '2item3', '3item3', '4item3', '5item3', '6item3', '7item3'],
      ['item4', '2item4', '3item4', '4item4', '5item4', '6item4', '7item4'],
      ['item5', '2item5', '3item5', '4item5', '5item5', '6item5', '7item5'],
      ['item6', '2item6', '3item6', '4item6', '5item6', '6item6', '7item6'],
      ['item7', '2item7', '3item7', '4item7', '5item7', '6item7', '7item7'],
      ['item8', '2item8', '3item8', '4item8', '5item8', '6item8', '7item8'],
      ['item9', '2item9', '3item9', '4item9', '5item9', '6item9', '7item9']]);
  });
});
