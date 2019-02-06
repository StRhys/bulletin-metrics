// let totalCounts = [];
// let rawReleaseCounts = [{
//     Date: "12-03-2001",
//     Count: 1
// }, {
//     Date: "12-03-2001",
//     Count: 2
// }, {
//     Date: "12-03-2001",
//     Count: 3
// }, {
//     Date: "13-03-2001",
//     Count: 4
// }]
// let rawReleaseCountsinArray = ""
// console.log(rawReleaseCounts)
// for (i = 0; i < rawReleaseCounts.length; i++) {
//     let rawReleaseCountsinArray = totalCounts.find(x => x.Date == rawReleaseCounts[i].Date);
//     if (rawReleaseCountsinArray != null) {
//         index = totalCounts.findIndex(x => x.Date == rawReleaseCounts[i].Date);
//         // var test = totalCounts.includes(Date);
//         totalCounts[index].Count = totalCounts[index].Count + rawReleaseCounts[i].Count
//     } else {
//         totalCounts.push({
//             Date: rawReleaseCounts[i].Date,
//             Count: rawReleaseCounts[i].Count
//         })
//     }

// }
// console.log(totalCounts)



    let totalCounts = [];
    let rawReleaseCounts = [];
    let rawReleaseCountsinArray = ""

    var promise1 = new Promise(function(resolve,reject) {
        
        // fetch(
        //     "https://www.ons.gov.uk/releasecalendar/data", {
        //         mode: "cors"
        //     }).then((data) => data.json()).then(function (data) {
        // for (i=1; i < data.result.paginator.numberOfPages+1; i++) {
        for (i = 1; i < 10; i++) {
            console.log("hello")
            fetch(
                "https://www.ons.gov.uk/releasecalendar/data?&size=10+&page=" + i, {
                    mode: "cors"
                }).then(data => data.json()).then(function (data) {
                data.result.results.map(function (data) {
                    console.log(data)
                    
                    
                    getCounts(data.uri)
                    // collateReleases()
                })
            })
        }
    })
    var promise2 = new Promise(function getCounts() {
    fetch(domain + data.uri + "/data", {
        mode: "cors"
    }).then((data,) => data.json()).then(function (data) {
        rawReleaseCounts.push({
            Date: data.description.releaseDate,
            Count: data.relatedDocuments.length                           
        })
        //console.log(rawReleaseCounts.length)
        console.log (rawReleaseCounts)
    })
    }) 


    console.log (rawReleaseCounts)

    Promise.all([promise]).then(function() {
        console.log(rawReleaseCounts.length)
        for (i = 0; i < rawReleaseCounts.length; i++) {
            let rawReleaseCountsinArray = totalCounts.find(x => x.Date == rawReleaseCounts[i].Date);
            // console.log(rawReleaseCountsinArray)
            if (rawReleaseCountsinArray != null) {
                index = totalCounts.findIndex(x => x.Date == rawReleaseCounts[i].Date);
                // var test = totalCounts.includes(Date);
                totalCounts[index].Count = totalCounts[index].Count + rawReleaseCounts[i].Count
            } else {
                totalCounts.push({
                    Date: rawReleaseCounts[i].Date,
                    Count: rawReleaseCounts[i].Count
                })
            }
            console.log(totalCounts)
        }
    })






    //https://github.com/d3/d3-fetch/issues/19
    //https://flaviocopes.com/javascript-promises/#orchestrating-promises