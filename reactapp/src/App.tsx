import { Component } from "react";
import { Container, Button } from "@mui/material";
import Header from "./components/global/Header.js";
import InventoryTable from "./components/Table/InventoryTable/InventoryTable.js";
import "./assets/scss/Global.scss";
import "./assets/scss/Home.scss";

export default class App extends Component {
  render() {
    return (
      <>
        <Header title={"Inventory"} />
        <div id="inventory-add-btn" className="create-button">
          <a className="crud-btn" href="/inventory/add">
            <Button variant="contained">Update Inventory</Button>
          </a>
        </div>
        <div className="page-container">
          <Container maxWidth="xl">
            <InventoryTable />
          </Container>
        </div>
      </>
    );
  }
}
