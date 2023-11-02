const body = [
  "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod.",
  "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus.",
  "Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Etiam porta sem malesuada magna mollis euismod.",
  "Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
  "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla.",
  "Nullam quis risus eget urna mollis ornare vel eu leo. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue.",
];
const data = Array(8)
  .fill(0)
  .map((_, i) => {
    return {
      subtitle: [
        "Launched a new application",
        "Removed event from calendar",
        "Joined your mailing list",
        "Created a new task list",
        "Added event to calendar",
        "Opened a new ticket",
        "Closed a ticket",
        "Paid pending invoice",
      ][Math.floor(Math.random() * 8)],
      title: [
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
      body: body[Math.floor(Math.random() * 7)],
      id: i,
    };
  });

export default (req, res) => res.json(data);
