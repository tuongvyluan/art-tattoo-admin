const data = {
  id: 45789,
  sender: {
    company: "Mazvita LLC",
    name: "Francine Miles",
    email: "frank.miles98@example.com",
    location: {
      street: {
        number: 9502,
        name: "Rue de L'Abbé-Patureau",
      },
      city: "Montcherand",
      state: "Basel-Landschaft",
      country: "Switzerland",
      postcode: 6873,
    },
  },
  receiver: {
    company: "Mufaro PVT (LTD)",
    name: "Austin Walker",
    email: "austin.walker94@example.com",
    location: {
      street: {
        number: 4147,
        name: "Calle de Toledo",
      },
      city: "Parla",
      state: "Castilla la Mancha",
      country: "Spain",
      postcode: 94329,
    },
  },
  items: [
    {
      title: "Maintanance",
      subtitle: "Monthly web updates for http://www.themeforest.net",
      price: 250.0,
      quantity: 1,
    },
    {
      title: "Recurring Bill (Hosting)",
      subtitle: "Monthly dedicated VPN web hosting (1 Jan - 30 Jan, 2014)",
      price: 652.87,
      quantity: 3,
    },
    {
      title: "Recurring Bill (Domain)",
      subtitle: "2 year domain name purchase",
      price: 239.0,
      quantity: 3,
    },
    {
      title: "Web design",
      subtitle: "PSD to HTML Conversion (3 pages)",
      price: 958.0,
      quantity: 1,
    },
  ],
  createdAt: Date.now(),
};

export default (req, res) => res.json(data);
