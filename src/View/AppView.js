export default class AppView {
  constructor(data) {
    this.data = data;
  }

  render() {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://use.fontawesome.com/releases/v5.8.2/css/all.css';
    fontAwesome.integrity = 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay';
    fontAwesome.crossOrigin = 'anonymous';
    document.head.appendChild(fontAwesome);

    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1, shrink-to-fit=no';
    document.head.appendChild(viewport);

    this.data.forEach((item) => {
      const container = document.createElement('div');
      container.classList.add('wrapper');
      document.getElementById('sliderContainer').appendChild(container);

      const img = document.createElement('img');
      img.setAttribute('src', item[4]);

      const clipName = document.createElement('p');
      clipName.innerHTML = `${item[0]}`;
      clipName.setAttribute('href', `https://www.youtube.com/watch?v=${item[6]}`);

      const authorContainer = document.createElement('div');
      authorContainer.classList.add('author', 'wrapper__info');
      const authorIcon = document.createElement('i');
      authorIcon.classList.add('fas', 'fa-male');
      const author = document.createElement('p');
      author.innerHTML = `${item[3]}`;
      authorContainer.appendChild(authorIcon);
      authorContainer.appendChild(author);

      const dateContainer = document.createElement('div');
      dateContainer.classList.add('date', 'wrapper__info');
      const dateIcon = document.createElement('i');
      dateIcon.classList.add('fas', 'fa-calendar-alt');
      const date = document.createElement('p');
      date.innerHTML = `${item[2]}`;
      dateContainer.appendChild(dateIcon);
      dateContainer.appendChild(date);

      const viewsContainer = document.createElement('div');
      viewsContainer.classList.add('views', 'wrapper__info');
      const viewsIcon = document.createElement('i');
      viewsIcon.classList.add('fas', 'fa-eye');
      const views = document.createElement('p');
      views.innerHTML = `${item[5]}`;
      viewsContainer.appendChild(viewsIcon);
      viewsContainer.appendChild(views);

      const descriptionContainer = document.createElement('div');
      descriptionContainer.classList.add('description');
      const description = document.createElement('p');
      description.innerHTML = `${item[1]}`;
      descriptionContainer.appendChild(description);

      container.appendChild(img);
      container.appendChild(clipName);
      container.appendChild(authorContainer);
      container.appendChild(dateContainer);
      container.appendChild(viewsContainer);
      container.appendChild(descriptionContainer);
    });
  }

  slider() {
    console.log(this);
    const slider = document.querySelector('.slider');
    const width = document.querySelector('.slider').offsetWidth;
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (event) => {
      isDown = true;
      slider.classList.add('active');
      startX = event.pageX - slider.offsetLeft;
      // eslint-disable-next-line prefer-destructuring
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (event) => {
      if (!isDown) return;

      event.preventDefault();
      const x = event.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      if (walk < -100) {
        slider.scrollLeft = scrollLeft + width;
      } else if (walk > 100) {
        slider.scrollLeft = scrollLeft - width;
      }
    });
  }
}
