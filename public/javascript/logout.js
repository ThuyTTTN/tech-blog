async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  //logout after 30 min. of idling
  function resetTimer() {
    let time;
    clearTimeout(time);
    time = setTimeout(logout, (1000 * 60 *30));
  };

  function idleTimer() {
    window.onmousemove = resetTimer;
    window.onclick = resetTimer;
    window.onscroll = resetTimer;
    window.onkeypress = resetTimer;
  }

  idleTimer();

  document.querySelector('#logout').addEventListener('click', logout);