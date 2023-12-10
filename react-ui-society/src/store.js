import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./store/reducers/ticketsReducer";
export default configureStore({
    ticketReducer:{ticketReducer}
})