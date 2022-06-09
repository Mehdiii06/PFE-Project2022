export const TASK_TYPE = "TASK";

export const statusColor = [{
    status: "UNASSIGNED",
    color: "#EB5A46",
    borderImage: "linear-gradient(to right, #EB5A46, #00C2E0) 1"
}, {
    status: "WAITING",
    color: "#00C2E0",
    borderImage: "linear-gradient(to right, #00C2E0, #C377E0) 1"
}, {
    status: "INPROGRESS",
    color: "#C377E0",
    borderImage: "linear-gradient(to left, orange, #C377E0) 1"
}, {
    status: "INREVIEW",
    color: "orange",
    borderImage: "linear-gradient(to right, orange, #3981DE) 1"
}, {
    status: "DONE",
    color: "#3981DE",
    borderImage: "linear-gradient(to left, #3981DE, #3981DE) 1"
}, {
    status: "ARCHIVED",
    color: "grey",
    borderImage: "linear-gradient(to left, grey, grey) 1"
}];