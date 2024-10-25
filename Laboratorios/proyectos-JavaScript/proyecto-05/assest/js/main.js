/* Archivo JS*/
$(document).ready(function () {
  $("#search").on("input", function () {
    var query = $(this).val();
    if (query.length > 2) {
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/find",
        method: "GET",
        data: {
          q: query,
          type: "like",
          sort: "population",
          cnt: 5,
          appid: "YOUR_API_KEY", //Aqui coloca tu API KEY
        },

        success: function (data) {
          var suggestions = $("#suggestions");
          suggestions.empty();

          if (data.list.length > 0) {
            suggestions.css("display", "block");
            $.each(data.list, function (index, city) {
              suggestions.append(
                `<div class="suggestion-item" data-city="${city.name}">
                    ${city.name}, ${city.sys.country}
                  </div>`
              );
            });
          } else {
            suggestions.css("display", "block");
            suggestions.append("<p>No se encontraron resultados</p>");
          }
        },

        error: function (xhr, status, error) {
          $("#suggestions")
            .css("display", "block")
            .html(
              `<p>Error: ${
                xhr.status === 404 ? "Ciudad no encontrada" : error
              }</p>`
            );
        },
      });
    } else {
      $("#suggestions").empty().css("display", "none");
      $("#weather-info").empty().css("display", "none"); // Ocultar información del clima
    }
  });

  $(document).on("click", ".suggestion-item", function () {
    var cityName = $(this).data("city");
    $("#search").val(cityName);
    $("#suggestions").empty().css("display", "none");
    fetchWeather(cityName);
  });

  function fetchWeather(cityName) {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather",
      method: "GET",
      data: {
        q: cityName,
        appid: "YOUR_API_KEY", //Aqui coloca tu API KEY
        units: "metric",
      },

      success: function (data) {
        $("#weather-info")
          .html(
            `
            <h3>Clima en ${data.name}, ${data.sys.country}</h3>
            <p>Temperatura: ${data.main.temp} °C</p>
            <p>Humedad: ${data.main.humidity}%</p>
            <p>Velocidad del viento: ${data.wind.speed} m/s</p>
            <p>Descripción: ${data.weather[0].description}</p>
          `
          )
          .css("display", "block"); // Mostrar clima
      },
      error: function () {
        $("#weather-info")
          .html("<p>Error al obtener datos del clima.</p>")
          .css("display", "block");
      },
    });
  }
});

$("#get-current-weather").on("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather",
        method: "GET",
        data: {
          lat: lat,
          lon: lon,
          appid: "YOUR_API_KEY", //Aqui coloca tu API KEY
          units: "metric",
        },
        success: function (data) {
          $("#weather-info")
            .html(
              `
              <h3>Clima Actual en ${data.name}, ${data.sys.country}</h3>
              <p>Temperatura: ${data.main.temp} °C</p>
              <p>Descripción: ${data.weather[0].description}</p>
            `
            )
            .css("display", "block");
        },
        error: function () {
          $("#weather-info")
            .html("<p>Error al obtener datos del clima.</p>")
            .css("display", "block");
        },
      });
    });
  } else {
    alert("Geolocalización no es soportada por este navegador.");
  }
});
