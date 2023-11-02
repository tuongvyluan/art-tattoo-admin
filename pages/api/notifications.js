// an endpoint for getting projects data
export default (req, res) => {
  const offset = parseInt(req.query.page || 0);

  if (offset >= 9) return setTimeout(() => res.json([]), 1000);

  const data = Array(6)
    .fill(0)
    .map((_, i) => {
      return {
        subject: [
          "Launched a new application",
          "Removed event from calendar",
          "Has joined your mailing list",
          "Created a new task list",
          "Added event to calendar",
          "Opened a new ticket",
          "Closed a ticket",
          "Paid pending invoice",
        ][Math.floor(Math.random() * 8)],
        user: [
          "Megan Hanson",
          "Jeffrey Freeman",
          "Amber McCoy",
          "Megan Gibson",
          "Melissa Sanders",
          "Danielle Perkins",
          "Roy Matthews",
          "Samantha West",
        ][Math.floor(Math.random() * 8)],
        avatar: `images/face${Math.floor(Math.random() * 6) + 1}.jpg`,
        date: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
        id: i + offset,
      };
    });

  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  res.json(data);
};
