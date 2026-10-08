const prefix = "/requester";

export const requesterRoutes = [
  {
    title: "My Requests",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "My Payments",
        url: `${prefix}`,
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
