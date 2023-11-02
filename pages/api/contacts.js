const data = Array(12)
  .fill(0)
  .map((_, i) => {
    return {
      status: [
        "launched a new application",
        "removed event from calendar",
        "has joined your mailing list",
        "created a new task list",
        "added event to calendar",
        "opened a new ticket",
        "closed a ticket",
        "paid pending invoice",
      ][Math.floor(Math.random() * 8)],
      name: [
        "Megan Hanson",
        "Jeffrey Freeman",
        "Amber McCoy",
        "Megan Gibson",
        "Melissa Sanders",
        "Danielle Perkins",
        "Roy Matthews",
        "Samantha West",
      ][Math.floor(Math.random() * 8)],
      avatar: `images/face${Math.floor(Math.random() * 7) + 1}.jpg`,
      id: i,
    };
  });

export default (req, res) => res.json(data);
