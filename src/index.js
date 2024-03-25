function gitdata()
    {
        var url = 'https://api.github.com/users/'+document.getElementById('text_input').value;
         
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            console.log(data.avatar_url)
            var im = document.getElementById("image");
            im.setAttribute("src",data.avatar_url);

            var gi = document.getElementById('para');
            gi.innerHTML=JSON.stringify(data);

        })

        .catch(function(reponse){
            return response.status;
            //console.log(response.status);
        });;
    }

if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js").then(registration => {
        console.log("SW Registered");
        console.log(registration);
    }).catch(err=>{
        console.log("SW Registration Failed");
        console.log(err);
    });
}