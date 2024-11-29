import "./style.css";

$(document).ready(function () {
  const apiUrl =
    "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
  const selectedCard = [];
  const pairs = 6;
  var moves = 0;
  var pairCount = 0;
  var canSelectCard = true;
  function createCard(pokemon) {
    return `
    <div class="card" data-id="${pokemon.id}">
      <div class="pokeball"></div>
      <img src="${pokemon.img}" class="pokemon-img">
    </div>
  `;
  }

  function win() {
    console.log($("confetti"));
    $.confetti.start();
    return `
    <h2>Congratulations you matched all pairs!</h2>
  `;
  }

  function handleCardClick(card) {
    if (!canSelectCard) return;
    const $card = $(card);
    if ($card.hasClass("card-green")) return;
    $card.removeClass("card-rotate-reverse");
    $card.toggleClass("card-rotate");
    $card.find(".pokeball").fadeOut("slow", function () {
      $card.find(".pokemon-img").fadeIn("slow");
    });

    selectedCard.push($card);

    if (selectedCard.length === 2) {
      checkForMatch();
    }
  }

  function checkForMatch() {
    canSelectCard = false;
    const firstCard = selectedCard[0];
    const secondCard = selectedCard[1];
    moves++;
    $("#moves").text("Moves: " + moves);
    const firstCardImg = firstCard.find("img").attr("src");
    const secondCardImg = secondCard.find("img").attr("src");

    if (firstCardImg === secondCardImg) {
      selectedCard.length = 0;
      canSelectCard = true;
      pairCount++;
      setTimeout(() => {
        firstCard.addClass("card-green");
        secondCard.addClass("card-green");
      }, 1000);
      console.log(pairCount);
      if (pairCount == 6) {
        $("#win-text").prepend(win());
      }
    } else {
      setTimeout(() => {
        selectedCard.forEach((card) => {
          card.shake(20, 2, 0.5, function () {
            card.removeClass("card-rotate");
            card.toggleClass("card-rotate-reverse");
            card.find(".pokemon-img").fadeOut("slow", function () {
              card.find(".pokeball").fadeIn("slow");
              selectedCard.length = 0;
              canSelectCard = true;
            });
          });
        });
      }, 1000);
    }
  }

  $.getJSON(apiUrl, function (data) {
    const shuffledPokemon = data.pokemon
      .sort(() => 0.5 - Math.random())
      .slice(0, pairs);
    const duplicated = [...shuffledPokemon, ...shuffledPokemon];
    const cardsHtml = duplicated
      .map((pokemon) => createCard(pokemon))
      .join("");
    $(".main-container").html(cardsHtml);
    $(".pokemon-img").hide();
    $(".card").on("click", function () {
      handleCardClick(this);
    });
  }).fail(function () {
    alert("Failed to load the API! Please reload the page.");
  });
});