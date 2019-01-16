import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";

import data from "../../mocks/MOCK_DATA.js";

class PrimeReact extends Component {
  constructor() {
    super();
    this.state = {
      rows: data,
      groupBy: ["car_make"],
      expandedRows: {}
    };
  }

  render() {
    // TODO: format the value of key to use as a column header
    let columnNames = Object.keys(data[0]).map(key => {
      key: key;
    });

    return (
      <div>
        <Select
          multiple
          value={this.state.groupBy}
          onChange={this.onGroupByChanged}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.join(", ")}
        >
          {columns.map(column => (
            <MenuItem key={column.name} value={column.key}>
              <Checkbox checked={this.state.groupBy.includes(column.key)} />
              <ListItemText primary={column.name} />
            </MenuItem>
          ))}
        </Select>

        <DataTable value={this.state.data}>
          <Column field="x" header="X" />
        </DataTable>
      </div>
    );
  }
}

export default PrimeReact;
