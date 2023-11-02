const data = Array(31)
  .fill(0)
  .map((_, i) => {
    return {
      category: [
        "Rock",
        "Electronic",
        "Pop Rock"
      ][Math.floor(Math.random() * 3)],
      title: [
        "Launched a new application",
        "Removed event from calendar",
        "Has joined your mailing list",
        "Created a new task list",
        "Added event to calendar",
        "Opened a new ticket",
        "Closed a ticket",
        "Paid pending invoice",
      ][Math.floor(Math.random() * 8)],
      subtitle: [
        "Megan",
        "Jeffrey",
        "Amber",
        "Megan",
        "Melissa",
        "Danielle",
        "Roy",
        "Samantha",
      ][Math.floor(Math.random() * 8)],
      id: i,
    };
  });

export default (req, res) => res.json(data);
