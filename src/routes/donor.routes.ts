const prefix = "/donor";

export const donorRoutes = [
  {
    title: "Donations",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Make Donation",
        url: `${prefix}/donations`,
      },
    ],
  },
  {
    title: "App settings",

    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
        isActive: true,
      },
    ],
  },
];
