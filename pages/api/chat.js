import subDays from "date-fns/subDays";
import subHours from "date-fns/subHours";
import subMinutes from "date-fns/subMinutes";

const now = Date.now();
const data = [
  {
    id: 1,
    group: "team",
    from: "Social",
    date: now,
    subject:
      "Check out this weeks most popular website designs in the Milkyway!",
    status: "red"
  },
  {
    id: 2,
    group: "team",
    from: "Promotions",
    date: subMinutes(now, 12),
    subject:
      "eBook: The complete guide to creating Angularjs single page applications is here.",
    status: "green",
    avatar: `images/face1.jpg`
  },
  {
    id: 3,
    group: "team",
    from: "Updates",
    date: subMinutes(now, 25),
    subject:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    status: "indigo"
  },
  {
    id: 4,
    group: "personal",
    from: "Melissa Welch",
    date: subHours(now, 2),
    subject:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    status: "pink",
    avatar: `images/face2.jpg`
  },
  {
    id: 5,
    group: "team",
    from: "Vincent Peterson",
    date: subHours(now, 3),
    subject:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    status: "blue",
    avatar: `images/face3.jpg`
  },
  {
    id: 6,
    group: "personal",
    from: "Pamela Wood",
    date: subDays(now, 1),
    subject:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    status: "yellow"
  },
  {
    id: 7,
    group: "team",
    from: "Tammy Carpenter",
    date: subDays(now, 2),
    subject:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    status: "red",
    avatar: `images/face4.jpg`
  },
  {
    id: 8,
    group: "personal",
    from: "Emma Sullican",
    date: subDays(now, 3),
    subject:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    status: "green"
  },
  {
    id: 9,
    group: "team",
    from: "Andrea Brewer",
    date: subDays(now, 4),
    subject:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    status: "green",
    avatar: `images/face5.jpg`
  },
  {
    id: 10,
    group: "personal",
    from: "Sean Carpenter",
    date: subDays(now, 5),
    subject:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    status: "indigo",
    avatar: `images/face1.jpg`
  },
];

const singleChat = () =>
  Array(10)
    .fill(0)
    .map((_, i) => {
      return {
        from: ["them", "you"][Math.floor(Math.random() * 2)],
        message: [
          "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          "Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
          "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "Aenean lacinia bibendum nulla sed consectetur.",
          "Cras mattis consectetur purus sit amet fermentum.",
          "Aenean lacinia bibendum nulla sed consectetur.",
          "Donec sed odio dui.",
        ][Math.floor(Math.random() * 8)],
        id: i,
      };
    });

export default (req, res) => {
  if (req.query.id) {
    const user = data[req.query.id];
    res.json({ user, chat: singleChat() });

    return;
  }

  res.json(data);
};
