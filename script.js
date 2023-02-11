const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleButton() {
  // Ako je button.disabled sa leve strane true onda ce biti jednako false
  // Ako je button.disabled sa leve strane false onda ce biti jednako true
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  // console.log("tell me", joke);
  VoiceRSS.speech({
    key: "8b739c4a3b7049ac8cb5be1554ba612d",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Programming";

  try {
    // Cekamo da ucitamo API
    const response = await fetch(apiUrl);
    // Cekamo da se API prebaci u JSON format
    const data = await response.json();
    // Ako postoji setup (to ce se desiti kada imamo salu iz dva dela)
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    // Disable Button
    toggleButton();
    tellMe(joke);
  } catch (error) {
    // Catch Errors Here
    console.log("whoops", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
// Ovde pozivamo toggleButton funkciju jedanput tj prvi put kada dodje audio do kraja
// i onda ce button ostati disabled
// Ali mi zelimo da bude disabled dok se sala izgovara ali da ponovo bude enabled
// kada se sala zavrsi
// Zato moramo da ponovo pozovemo funkciju kada se klikne na dugme a to se desava unutar
// funkcije getJokes
audioElement.addEventListener("ended", toggleButton);
