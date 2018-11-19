function getListBulletins() {
    // fetch("publications.json", {
            fetch("https://www.ons.gov.uk/publications/data?sortBy=release_date&query=&filter=bulletin&size=250", {
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


function getBulletinWordCountHistory(value) {
    timeseries = []
    let selectedBulletin = document.getElementById("listOfBulletins");
    let parts = selectedBulletin.value.split('/');
    let lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
    selectedBulletin = selectedBulletin.value.split(lastSegment)[0];
    fetch(domain + selectedBulletin + "previousReleases/data?size=250", {
        mode: "cors"
    }).then((data) => data.json()).then(function (data) {
        // console.log(data)

        data.result.results.map(function (data) {
            fetch(domain + data.uri + "/data", {
                mode: "cors"
            }).then((data) => data.json()).then(function (data) {
                wordCount(data)

                timeseries = timeseries.sort(orderByDate);
                Highcharts.chart('chart', {
                    series: [{
                        //add the data to the chart
                        data: timeseries,
                    }],
                    navigation: {
                        buttonOptions: {
                            enabled: false
                        }
                    },
                    title: {
                        text: data.description.title
                    },
                    yAxis: {
                        title: {
                            enabled: false
                        },
                        min: 0
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            color: '#3B7A9E'
                        }
                    },
                    xAxis: {
                        type: "category",
                        crosshair: true,
                    }
                });
            })
        })
    })
}

function wordCount(data) {
    let bulletinData = data;
    let sections = data.sections.length;
    let totalWords = 0;
    for (var i = 0; i < sections; i++) {
        bulletinWords = bulletinData.sections[i].markdown.split(" ").length;
        totalWords = totalWords + bulletinWords
        releaseDate = data.description.releaseDate
    }
    let chartdata = [data.description.edition, parseFloat(totalWords), releaseDate]
    //add these arrays to the timeseries array
    timeseries.push(chartdata)
    return;
}