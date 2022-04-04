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

// Остановился тут !!!!!
function getDate(date) {
  const obj = {
    day: '',
    month: '',
    year: ''
  }

}

function renderResult(name, avatar, date, bio, repos, followers, following, location, twitter, blog) {
  const resultSection = document.querySelector('.result');
  const newElement = document.createElement('div');
  newElement.classList.add('result__container')

  newElement.innerHTML = `
    <div class="result__profile">
      <img src="${avatar}" alt="" class="result__profile-img">

      <div class="result__profile-info">
        <h2 class="result__profile-title">${name}</h2>
        <a href="https://github.com/${name}" class="result__profile-link">@${name}</a>
        <span class="result__profile-date">Joined 25 Jan 2011</span>
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
          <i class="ri-community-fill result__links-icon"></i>
          <span class="result__links-text">@github</span>
        </div>
      </div>
    </div>
  `;

  resultSection.appendChild(newElement);
}

async function userSearch(userName) {

  await fetch(`https://api.github.com/users/${userName}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.created_at.slice(0, 2));
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
      data.blog
    );
  })
  .catch(err => {
    console.log('Error', err.message);
  })
}

export {userSearch};