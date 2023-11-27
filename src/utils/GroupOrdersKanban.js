export function GroupKanbanList(orders) {
  let list = {
    OA: {
      id: "OA",
      name: "Open for Action",
      cardIds: [],
    },
    VRS: {
      id: "VRS",
      name: "Vehicle Recovered from the scene",
      cardIds: [],
    },
    P: {
      id: "P",
      name: "Parking",
      cardIds: [],
    },
    ReqR: {
      id: "ReqR",
      name: "Request Report",
      cardIds: [],
    },
    ReqRec: {
      id: "ReqRec",
      name: "Report Received",
      cardIds: [],
    },
    ReqA: {
      id: "ReqA",
      name: "Report Approved",
      cardIds: [],
    },
    G: {
      id: "G",
      name: "Garage",
      cardIds: [],
    },
    PC: {
      id: "PC",
      name: "Pre-Check",
      cardIds: [],
    },
    RFH: {
      id: "RFH",
      name: "Ready for Hire",
      cardIds: [],
    },
    RFS: {
      id: "RFS",
      name: "Removed from Fleet",
      cardIds: [],
    },
  };
  if (orders && orders.length !== 0) {
    orders.map((order) => {
      switch (order.status) {
        case "Open for Action":
          if (
            list.OA.cardIds.filter((idss) => idss === order.id.toString())
              .length === 0
          ) {
            list = {
              ...list,
              OA: {
                ...list.OA,
                cardIds: [...list.OA.cardIds, order.id.toString()],
              },
            };
          }
          break;
        case "Vehicle Recovered from the scene":
          if (
            list.VRS.cardIds.filter((idss) => idss === order.id.toString())
              .length === 0
          ) {
            list = {
              ...list,
              VRS: {
                ...list.VRS,
                cardIds: [...list.VRS.cardIds, order.id.toString()],
              },
            };
          }
          break;
        case "Parking":
          if (
            list.P.cardIds.filter((idss) => idss === order.id.toString())
              .length === 0
          ) {
            list = {
              ...list,
              P: {
                ...list.P,
                cardIds: [...list.P.cardIds, order.id.toString()],
              },
            };
          }
          break;
        case "Request Report":
          if (
            list.ReqR.cardIds.filter((idss) => idss === order.id.toString())
              .length === 0
          ) {
            list = {
              ...list,
              ReqR: {
                ...list.ReqR,
                cardIds: [...list.ReqR.cardIds, order.id.toString()],
              },
            };
          }
          break;
        case "Report Received":
          if (
            list.ReqRec.cardIds.filter((idss) => idss === order.id.toString())
              .length === 0
          ) {
            list = {
              ...list,
              ReqRec: {
                ...list.ReqRec,
                cardIds: [...list.ReqRec.cardIds, order.id.toString()],
              },
            };
          }
          break;
        case "Report Approved":
          if (
            list.ReqA.cardIds.filter((idss) => idss === order.id.toString())
              .length === 0
          ) {
            list = {
              ...list,
              ReqA: {
                ...list.ReqA,
                cardIds: [...list.ReqA.cardIds, order.id.toString()],
              },
            };
          }
          break;
        case "Garage":
          if (
            list.G.cardIds.filter((idss) => idss === order.id.toString())
              .length === 0
          ) {
            list = {
              ...list,
              G: {
                ...list.G,
                cardIds: [...list.G.cardIds, order.id.toString()],
              },
            };
          }
          break;
        case "Pre-Check":
          if (
            list.PC.cardIds.filter((idss) => idss === order.id.toString())
              .length === 0
          ) {
            list = {
              ...list,
              PC: {
                ...list.PC,
                cardIds: [...list.PC.cardIds, order.id.toString()],
              },
            };
          }
          break;
        case "Ready for Hire":
          if (
            list.RFH.cardIds.filter((idss) => idss === order.id.toString())
              .length === 0
          ) {
            list = {
              ...list,
              RFH: {
                ...list.RFH,
                cardIds: [...list.RFH.cardIds, order.id.toString()],
              },
            };
          }
          break;
        case "Removed from Fleet":
          if (
            list.RFS.cardIds.filter((idss) => idss === order.id.toString())
              .length === 0
          ) {
            list = {
              ...list,
              RFS: {
                ...list.RFS,
                cardIds: [...list.RFS.cardIds, order.id.toString()],
              },
            };
          }
          break;
        default:
          break;
      }
      return null;
    });

    return list;
  } else {
    return list;
  }
}

export function GroupKanbanCard(orders) {
  let cards = {};
  let listId = "OL";
  if (orders && orders.length !== 0) {
    orders.map((order) => {
      switch (order.status) {
        case "Open for Action":
          listId = "OA";
          break;
        case "Vehicle Recovered from the scene":
          listId = "VRS";
          break;
        case "Parking":
          listId = "P";
          break;
        case "Request Report":
          listId = "ReqR";
          break;
        case "Request Recovered":
          listId = "ReqRec";
          break;
        case "Request Approved":
          listId = "ReqA";
          break;
        case "Garage":
          listId = "G";
          break;
        case "Pre-Check":
          listId = "PC";
          break;
        case "Ready for Hire":
          listId = "RFH";
          break;
        case "Removed from Fleet":
          listId = "RFS";
          break;
        default:
          break;
      }
      let order_id = order.id;
      return (cards = {
        ...cards,
        [order_id.toString()]: {
          ...order,
          //   cover: '/static/images/projects/project_3.png',
          isSubscribed: false,
          name: order.vehicle.vehicle_reg_no,
          listId,
        },
      });
    });
    return cards;
  } else {
    return cards;
  }
}

export function GroupKanbanMembers(staff) {
  let members = {};
  if (staff.length !== 0) {
    staff.map((s) => {
      return (members = { ...members, [s.id]: s });
    });
    return members;
  } else {
    return members;
  }
}

export const list_kanaban = {
  OA: {
    id: "OA",
    name: "Open for Action",
    cardIds: [],
  },
  VRS: {
    id: "VRS",
    name: "Vehicle Recovered from the scene",
    cardIds: [],
  },
  P: {
    id: "P",
    name: "Parking",
    cardIds: [],
  },
  ReqR: {
    id: "ReqR",
    name: "Request Report",
    cardIds: [],
  },
  ReqRec: {
    id: "ReqRec",
    name: "Report Received",
    cardIds: [],
  },
  ReqA: {
    id: "ReqA",
    name: "Report Approved",
    cardIds: [],
  },
  G: {
    id: "G",
    name: "Garage",
    cardIds: [],
  },
  PC: {
    id: "PC",
    name: "Pre-Check",
    cardIds: [],
  },
  RFH: {
    id: "RFH",
    name: "Ready for Hire",
    cardIds: [],
  },
  RFS: {
    id: "RFS",
    name: "Removed from Fleet",
    cardIds: [],
  },
};
