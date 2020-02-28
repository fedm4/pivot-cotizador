const tabiques = [
  {
    label: "Bath 32",
    value: "bath32"
  },
  {
    label: "Bath 25",
    value: "bath25"
  }
];

export const getTabiqueLabel = (value) =>  tabiques.find(tabique => tabique.value === value).label || undefined; 

export default tabiques;