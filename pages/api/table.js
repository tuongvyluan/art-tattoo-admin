import namor from "namor";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: capitalize(namor.generate({ words: 1, numbers: 0, separator: ' ', saltLength: 0 })),
    lastName: capitalize(namor.generate({ words: 1, numbers: 0, separator: ' ', saltLength: 0 })),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "Relationship"
        : statusChance > 0.33
        ? "Complicated"
        : "Single",
  };
};

function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export default (req, res) => {
  if (req.query.lens) {
    res.json(makeData(req.query.lens));
  }
};
