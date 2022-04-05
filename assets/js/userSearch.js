// Проверка наличия ссылок профиля
function linkCheck(value) {
  const link = {
    class: '',
    argument: ''
  }

  if (value == null || value == '') {
    link.class = 'disabled';
    link.argument = 'Not Available';
    return link
  }

  if (!(value == null)) {
    link.class = '';
    link.argument = value;
    return link
  }
  
}

// Определение даты (дата поступает в виде '2021-02-09T19:58:33Z')
function getDate(date) {
  let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const obj = {
    day: date.slice(8, 10),
    month: parseInt(date.slice(5, 7)),
    year: date.slice(0, 4)
  }

  return `Joined ${obj.day} ${month[obj.month - 1]} ${obj.year}`
}

// Проверка на наличие результата
function removeResult() {
  const searchResult = document.querySelector('.result__container');

  if (searchResult == null) {
    return
  } else {
    searchResult.remove();
  }
}

// Рендер результата
function renderResult(name, avatar, date, bio, repos, followers, following, location, twitter, mail, blog) {
  const resultSection = document.querySelector('.result');
  const newElement = document.createElement('div');
  newElement.classList.add('result__container');
  newElement.classList.add('shadow');

  newElement.innerHTML = `
    <div class="result__profile">
      <img src="${avatar}" alt="" class="result__profile-img">

      <div class="result__profile-info">
        <h2 class="result__profile-title">${name}</h2>
        <a href="https://github.com/${name}" class="result__profile-link">@${name}</a>
        <span class="result__profile-date">${getDate(date)}</span>
      </div>
    </div>

    <div class="result__info">
      <p class="result__description ${linkCheck(bio).class}">
        ${linkCheck(bio).argument}
      </p>

      <div class="result__stats">
        <div class="result__stats-card">
          <h3 class="result__stats-title">Repos</h3>
          <span class="result__stats-count">${repos}</span>
        </div>
        
        <div class="result__stats-card">
          <h3 class="result__stats-title">Followers</h3>
          <span class="result__stats-count">${followers}</span>
        </div>

        <div class="result__stats-card">
          <h3 class="result__stats-title">Following</h3>
          <span class="result__stats-count">${following}</span>
        </div>
      </div>

      <div class="result__links">
        <div class="result__links-card">
          <i class="ri-map-pin-2-fill result__links-icon ${linkCheck(location).class}"></i>
          <span class="result__links-text ${linkCheck(location).class}">${linkCheck(location).argument}</span>
        </div>

        <div class="result__links-card">
          <i class="ri-links-fill result__links-icon ${linkCheck(blog).class}"></i>
          <a href="" class="result__links-text ${linkCheck(blog).class}">${linkCheck(blog).argument}</a>
        </div>

        <div class="result__links-card">
          <i class="ri-twitter-fill result__links-icon ${linkCheck(twitter).class}"></i>
          <span class="result__links-text ${linkCheck(twitter).class}">${linkCheck(twitter).argument}</span>
        </div>

        <div class="result__links-card">
          <i class="ri-mail-line result__links-icon ${linkCheck(mail).class}"></i>
          <span class="result__links-text ${linkCheck(mail).class}">${linkCheck(mail).argument}</span>
        </div>
      </div>
    </div>
  `;

  resultSection.appendChild(newElement);
}

function renderNotFound() {
  const resultSection = document.querySelector('.result');
  const newElement = document.createElement('div');
  newElement.classList.add('result__container');
  newElement.classList.add('shadow');

  newElement.innerHTML = `
    <div class="result__notFound">
      <i class="ri-user-search-fill result__notFound-icon"></i>
      <span class="result__notFound-text">User not found</span>
    </div>
  `;

  resultSection.appendChild(newElement);
}

// Запрос
async function userSearch(userName) {

  await fetch(`https://api.github.com/users/${userName}`)
  .then(response => response.json())
  .then(data => {

    if (data.message == 'Not Found') {
      removeResult();
      renderNotFound();
    } else {
      removeResult();
      renderResult(
        data.login,
        data.avatar_url,
        data.created_at,
        data.bio,
        data.public_repos,
        data.followers,
        data.following,
        data.location,
        data.twitter_username,
        data.email,
        data.blog
      );
    }

  })
  .catch(err => {
    console.log('Error', err.message);
  })
}

export {userSearch};