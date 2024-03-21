const profilecontainer = document.querySelector(".profile-container")
const searchbar = document.querySelector(".searchbar-container")
const root = document.documentElement.style;
const get = (parse) => document.getElementById(`${parse}`);
const url = "https://api.github.com/users/";
const btnMode = get("btn-mode");
const modeText = get("mode-text");
const modeIcon = get("mode-icon");
const input = get("input");
const noresults = get("no-results");
const btnSubmit = get("submit");
const avtar = get("avtar");
const userName = get("name");
const user = get("user");
const date = get("date");
const month = ["Jan","Feb","Mar","Apr","May","Jun","jul","Aug","Sep","Oct","Nov","Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;


btnSubmit.addEventListener("click", function(){
    if(input.value !== ""){
        getUserData(url + input.value)
    }
});

input.addEventListener(
    "keydown", 
    function (e){
        if(!e){
            var e = window.event;
        }
        if(e.key == "Enter"){
            if(input.value !== ""){
                getUserData(url + input.value);
            }
        }
    }
)

input.addEventListener("input" , function() {
    noresults.style.display = "none";
    profilecontainer.classList.remove("active");
    searchbar.classList.add("active");
})

btnMode.addEventListener("click" , function(){
    if(darkMode === false){
        darkModeProperties();
    }else{
        lightModeProperties();
    }
})

function getUserData(gitUrl) {
    try{
        fetch(gitUrl)
            .then( (response) => response.json())
            .then( (data) => {
                console.log(data);
                updateProfile(data);
            })
    }
    catch(error){
        throw(error);
    }
}


function updateProfile(data){
    if(data.message !== "Not Found"){
        noresults.style.display = "none";
        function checkNull(param1 , param2){
            if(param1 === null || param1 === ""){
                param2.style.opacity = 0.5;
                param2.previousElementSibling.style.opacity = 0.5;
                return false;
            }
            else{
                param2.style.opacity = 1;
                param2.previousElementSibling.style.opacity = 1;
                return true;
            }
        }
        avtar.src = data.avatar_url;
        userName.innerText = data.name;
        user.innerText = `@${data.login}`;
        user.href = data.html_url;
        bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
        dateSegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${dateSegments[2]} ${month[dateSegments[1] - 1]} ${dateSegments[0]}`;
        repos.innerText = data.public_repos;
        followers.innerText = data.followers;
        following.innerText = data.following;
        user_location.innerText = checkNull(data.location , page) ? data.location : "Not Available";
        page.innerText = checkNull(data.blog , page) ? data.blog : "Not Available";
        page.href = checkNull(data.blog , page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username , twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username , twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company , company) ? data.company : "Not Available";
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
    }
    else{
        noresults.style.display = "block";
    }
}

function darkModeProperties(){
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white"); 
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modeText.textContent = "LIGHT";
    modeIcon.src = "./assests/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
}

function lightModeProperties(){  
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modeText.textContent = "DARK";
    modeIcon.src = "./assests/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
}

profilecontainer.classList.toggle("active");
searchbar.classList.toggle("active");
getUserData(url + "aniketitankar-03");