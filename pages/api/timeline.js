const data = Array(10)
  .fill(0)
  .map((_, i) => {
    return {
      text: [
        "Maecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus.",
        "Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Aenean lacinia bibendum nulla sed consectetur.",
        "Cras mattis consectetur purus sit amet fermentum.",
        "Aenean lacinia bibendum nulla sed consectetur.",
        "Donec sed odio dui.",
      ][Math.floor(Math.random() * 8)],
      date: new Date(+new Date() - Math.floor(Math.random() * 10000000000)),
      id: i,
    };
  });

export default (req, res) => res.json(data);
