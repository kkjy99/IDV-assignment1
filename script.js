fetch("https://api.data.gov.sg/v1/environment/psi")
.then(response => response.json())
// .then(data => console.log(data))
.then(data => {
    // get timestamp 
    let timestamp = data.items[0].update_timestamp;
    console.log(timestamp)
    var datetime = new Date(timestamp)
    console.log(datetime)
    // Update timestamp
    document.getElementById("timestamp").innerHTML = "Data Last Updated: " + datetime.toString();
    document.getElementById("timestamp").style.color = "red";
    // get PSI readings
    var psi_readings = data.items[0].readings;
    console.log(psi_readings)

    // order metric names
    const metric_list = [
        'psi_twenty_four_hourly',
        'pm25_sub_index', 'pm25_twenty_four_hourly', 'pm10_sub_index', 'pm10_twenty_four_hourly',
        'so2_sub_index', 'so2_twenty_four_hourly', 'o3_sub_index', 'o3_eight_hour_max',
        'co_sub_index', 'co_eight_hour_max', 'no2_one_hour_max'
    ]

    var table = document.getElementById("psi_table");
    // For each metric element
    for (var metric in metric_list) {
        if (psi_readings[metric_list[metric]]) {
            let row = table.insertRow(table.rows.length);
            let data_cell = row.insertCell(0);
            // insert metric name into first column
            let metric_name = metric_list[metric].replaceAll("_", " ").toUpperCase().replace(/PM25/, "PM2.5").replace(/(\d\.\d+)/g, '<sub>$1</sub>')
            
            // find first whitespace
            let regex = /\s/;
            // insert "("
            let new_name = metric_name.replace(regex, " (")
            data_cell.innerHTML = new_name + ")"

            col_names = ['central', 'east', 'north', 'south', 'west']
            // For each column (region)
            for (i = 0; i < col_names.length; i++) {
                var value = row.insertCell(i + 1)
                value.innerHTML = psi_readings[metric_list[metric]][col_names[i]]
        }
        }
        
    }

    document.getElementById("psi_status").innerHTML = "Status: " + data.api_info.status.toUpperCase();
}
)