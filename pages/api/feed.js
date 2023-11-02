const data = Array(3)
  .fill(0)
  .map((_, i) => {
    return {
      message: [
        "Launched a new application",
        "Removed event from calendar",
        "Has joined your mailing list",
        "Created a new task list",
        "Added event to calendar",
        "Opened a new ticket",
        "Closed a ticket",
        "Paid pending invoice",
      ][Math.floor(Math.random() * 8)],
      subject: [
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
