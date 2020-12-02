const url = {
  education:
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
  county:
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",
};

let countyData, educationData;

const canvas = d3.select("#canvas");

const drawMap = () => {
  canvas
    .selectAll("path")
    .data(countyData)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (countyDataItem) => {
      let id = countyDataItem.id;
      let county = educationData.find((item) => {
        return item.fips === id;
      });
      let percentage = county.bachelorsOrHigher;
      if (percentage <= 15) {
        return "#0094B2";
      } else if (percentage <= 30) {
        return "#0044B2";
      } else if (percentage <= 45) {
        return "#000BB2";
      } else {
        return "#8E00B2";
      }
    })
    .attr("data-fips", (countyDataItem) => {
      return countyDataItem.id;
    })
    .attr("data-education", (countyDataItem) => {
      let id = countyDataItem.id;
      let county = educationData.find((item) => {
        return item.fips === id;
      });
      let percentage = county.bachelorsOrHigher;
      return percentage;
    });
};

d3.json(url.county).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    countyData = topojson.feature(data, data.objects.counties).features;
    console.log(countyData);

    d3.json(url.education).then((data, error) => {
      if (error) {
        console.log(error);
      } else {
        educationData = data;
        console.log(educationData);
        drawMap();
      }
    });
  }
});
