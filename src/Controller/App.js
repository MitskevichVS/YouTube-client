import '../style.css';
import AppModel from '../Model/AppModel';
import AppView from '../View/AppView';
import '../View/AppView.css';

window.UserInputText = '';

const input = () => {
  const startInput = `
  <header>
    <div class="header_search">
      <input type="submit" value="" id="input_submit">
      <input type="search" name="p" id="input_text">
    </div>
  </header>
  <main>
    <div class="mainDiv" id="mainContainer">
      <div class="slider" id="sliderContainer">
      </div>
    </div>
  </main>
  `;
  document.body.innerHTML = startInput;
};

window.onload = input();

export default class App {
  constructor() {
    this.state = {
      link: 'https://www.googleapis.com/youtube/v3/search?',
      getViewCountLink: 'https://www.googleapis.com/youtube/v3/videos?',
      apiKey: 'key=AIzaSyCWgSlcl2nty4YsU60qq2jhKj5N1xZqfCw',
      type: '&type=video',
      part: '&part=snippet',
      maxResult: '&maxResults=8',
      q: `&q=${window.UserInputText}`,
    };
  }

  async start() {
    const model = new AppModel(this.state);
    let data = await model.getInfo();
    let view = new AppView(data);

    view.render();
    view.slider();

    AppModel.secondQuery(this.state);
    data = window.nextData;
    view = new AppView(data);

    let count = 0;
    const slider = document.getElementById('sliderContainer');
    slider.addEventListener('click', () => {
      count += 1;
      if (count % 2 !== 0) {
        AppModel.secondQuery(this.state);
        data = window.nextData;
        const nextView = new AppView(data);
        nextView.render(data);
        nextView.slider();
      }
    });
  }
}

const button = document.getElementById('input_submit');
const submitKey = document.getElementById('input_text');

submitKey.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    button.click();
  }
});

button.addEventListener('click', () => {
  window.UserInputText = document.getElementById('input_text').value;
  const app = new App(window.UserInputText);
  const sliderContainer = document.getElementById('sliderContainer');
  if (sliderContainer.firstChild) {
    while (sliderContainer.firstChild) {
      sliderContainer.removeChild(sliderContainer.firstChild);
    }
  }
  app.start();
});
