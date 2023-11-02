export default async (req, res) => {
  await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${req.query.city},${req.query.country}&appid=${process.env.WEATHERAPI}&cnt=${req.query.days}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch(console.error);

  return;
};
