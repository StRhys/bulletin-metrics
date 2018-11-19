function getListBulletins() {
    fetch("publications.json", {
            // fetch("https://www.ons.gov.uk/publications/data?sortBy=release_date&query=&filter=bulletin&size=250", {
            mode: 'cors'
        })
        .then(data => data.json())
        .then(function (data) {
            data.result.results.map(function (data) {
                bulletinTitle = data.description.title
                if (bulletinTitle == "2011 Census") {
                    //ignore census ones
                    console.log ("Ignoring census bulletin")
                } else {
                    let node = document.createElement("option");
                    let textnode = document.createTextNode(bulletinTitle);
                    node.appendChild(textnode);
                    node.value = data.uri
                    document.getElementById("listOfBulletins").appendChild(node);

                }

            })

            sortlist()
        })

}