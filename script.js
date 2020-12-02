const url = {
  education:
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
  county:
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",
};

let countyData, educationData;

const canvas = d3.select("#canvas");

const drawMap = () => {};

d3.json(url.county).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    countyData = data;
    console.log(countyData);

    d3.json(url.education).then((data, error) => {
      if (error) {
        console.log(error);
      } else {
        educationData = data;
        console.log(educationData);
      }
    });
  }
});
