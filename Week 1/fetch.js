function init() {
  const resultDiv = document.getElementById("results");
  fetch("/user.json")
    .then((data) => data.json())
    .then((users) => {
      resultDiv.innerHTML = JSON.stringify(users);
      return fetch(`https://api.github.com/users/${users[0].username}`);
    })
    .then((resp) => resp.json())
    .then((gitUser) => {
      console.log(gitUser);
      const img = document.createElement("img");
      img.src = gitUser.avatar_url;
      resultDiv.appendChild(img);
      return gitUser;
    });
}
