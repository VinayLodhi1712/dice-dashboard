// src/data/sidebar.js

export const sidebarItems = [
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Finance & Travel",
    path: "/finance-travel",
    children: [
      {
        name: "Travel",
        path: "/travel",
        children: [
          {
            name: "My Trips",
            path: "/travel/my-trips",
            children: [
              {
                name: "Upcoming Trips",
                path: "/travel/my-trips/upcoming",
                children: [
                  { name: "Domestic", path: "/travel/my-trips/upcoming/domestic" },
                  { name: "International", path: "/travel/my-trips/upcoming/international" },
                ],
              },
              { name: "Past Trips", path: "/travel/my-trips/past" },
              { name: "Cancelled Trips", path: "/travel/my-trips/cancelled" },
            ],
          },
          {
            name: "New Request",
            path: "/travel/new-request",
            children: [
              { name: "Flight Booking", path: "/travel/new-request/flight" },
              { name: "Hotel Booking", path: "/travel/new-request/hotel" },
              { name: "Cab Booking", path: "/travel/new-request/cab" },
            ],
          },
          { name: "Approvals", path: "/travel/approvals" },
        ],
      },
      {
        name: "Expenses",
        path: "/expenses",
        children: [
          {
            name: "My Expenses",
            path: "/expenses/my-expenses",
            children: [
              { name: "Pending", path: "/expenses/my-expenses/pending" },
              { name: "Approved", path: "/expenses/my-expenses/approved" },
              { name: "Rejected", path: "/expenses/my-expenses/rejected" },
            ],
          },
          { name: "Submit Expense", path: "/expenses/submit" },
          { name: "Reports", path: "/expenses/reports" },
        ],
      },
      {
        name: "Advances",
        path: "/advances",
        children: [
          { name: "Request Advance", path: "/advances/request" },
          {
            name: "My Advances",
            path: "/advances/my-advances",
            children: [
              { name: "Active", path: "/advances/my-advances/active" },
              { name: "Settled", path: "/advances/my-advances/settled" },
            ],
          },
          { name: "History", path: "/advances/history" },
        ],
      },
    ],
  },
];