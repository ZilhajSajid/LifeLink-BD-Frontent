const prefix = "/requester";

export const requesterRoutes = [
  {
    title: "My Requests",
    items: [
      {
        title: "Request Blood",
        url: `${prefix}/create-request`,
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
