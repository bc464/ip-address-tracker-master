const inputText = document.querySelector(".inputText");
const submitArrow = document.querySelector(".arrow-icon");
const resultContainer = document.querySelector(".result-container")
let map;

window.onload = function () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://api.ipify.org?format=jsonp&callback=DisplayIP";
        document.getElementsByTagName("head")[0].appendChild(script);
};
    function DisplayIP(response) {
        let ipaddress = response.ip;
        inputText.value = ipaddress;
        let ip = inputText.value;

        containerDisplay();
}

submitArrow.addEventListener("click", function (e) {
        e.preventDefault();
    resultContainer.textContent = "";

    let value = inputText.value;
    const URL = "https://geo.ipify.org/api/v2/country,city?apiKey=at_jXYB9eaMvUwvaBkbKUjEwWxjDh1TR&ipAddress=?";

    containerDisplay();

});
    
const containerDisplay = function(){
    let ip = inputText.value
    let api_key = "at_jXYB9eaMvUwvaBkbKUjEwWxjDh1TR";
    
    $(function () {
       $.ajax({

           url: "https://geo.ipify.org/api/v2/country,city?",
           data: {apiKey: api_key, ipAddress: ip,
                },
           success: function(data) {
               $(".result-container")
               .append(`
                <div>
                    <p class="result-headings">IP Address</p>
                    <p class="ipAddress">${ip}</p>
                </div>
                <div>
                    <p class="result-headings">Location</p>
                    <div class="local-postal">
                        <p class="location">${data.location.region},${data.location.city}</p>
                        <p class="postalCode">${data.location.postalCode}</p>
                    </div>
                </div>
            <div>
                <p class="result-headings">Timezone</p>
                <p>UTC - <span class="timeZone">${data.location.timezone} </span></p>
            </div>
        <div>
            <p class="result-headings">ISP</p>
            <p class="isp">${data.isp}</p>
        </div>`);

        const {lat} = data.location;
        const {lng} = data.location;
        const coords = [lat, lng];
        if (map != undefined) map.remove();
         map = L.map('map').setView(coords, 13);
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        let myIcon = L.icon({
        iconUrl: "./images/icon-location.svg",
    
        })
        L.marker(coords, {icon: myIcon}).addTo(map);
        }, function(err){
            alert("could not get your position")
        }
        })
    })
}