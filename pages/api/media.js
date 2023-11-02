const data = Array(24)
  .fill(0)
  .map((_, i) => {
    return i + 1;
  });

export default (req, res) => res.json(data);
